"""Polymer Chemistry & Macromolecular Architecture Calculation Service.

Implements Carothers step-growth polycondensation kinetics,
Flory-Stockmayer gelation theory, free-radical polymerization (QSSA),
Flory-Schulz molecular weight distributions, and Flory-Huggins solution thermodynamics.
"""

import math
from typing import Dict, List, Optional
from app.models.polymer_chemistry import (
    PolymerizationMechanism,
    RadicalTerminationMode,
    CarothersAnalysis,
    RadicalKineticsAnalysis,
    MolecularWeightPoint,
    FloryHugginsPoint,
    FloryHugginsAnalysis,
    PolymerSimulationResult,
)
from app.schemas.polymer_chemistry import (
    CarothersRequest,
    RadicalKineticsRequest,
    FloryHugginsRequest,
    PolymerPresetSummary,
)


class PolymerService:
    """Scientific calculation service for polymer chemistry and macromolecules."""

    def __init__(self):
        self._presets: Dict[str, dict] = self._initialize_presets()

    def get_presets(self) -> List[PolymerPresetSummary]:
        """Return catalog of standard industrial and biological polymers."""
        summaries = []
        for pid, data in self._presets.items():
            summaries.append(
                PolymerPresetSummary(
                    id=pid,
                    name=data["name"],
                    classification=data["classification"],
                    mechanism=data["mechanism"],
                    repeat_unit_formula=data["repeat_unit_formula"],
                    repeat_unit_mw=data["repeat_unit_mw"],
                    typical_applications=data["typical_applications"],
                    description=data["description"],
                )
            )
        return summaries

    def get_preset_simulation(
        self,
        preset_id: str,
        custom_conversion: Optional[float] = None,
        custom_stoichiometry_r: Optional[float] = None,
        custom_chi: Optional[float] = None,
    ) -> PolymerSimulationResult:
        """Run complete polymerization simulation for a standard preset."""
        if preset_id not in self._presets:
            raise ValueError(f"Unknown polymer preset: {preset_id}")

        data = self._presets[preset_id]
        p = custom_conversion if custom_conversion is not None else data.get("default_conversion", 0.98)
        p = max(0.01, min(0.999, p))
        r = custom_stoichiometry_r if custom_stoichiometry_r is not None else data.get("stoichiometric_ratio_r", 1.0)
        chi = custom_chi if custom_chi is not None else data.get("default_chi", 0.45)

        mechanism = data["mechanism"]
        repeat_mw = data["repeat_unit_mw"]
        formula = data["repeat_unit_formula"]

        carothers: Optional[CarothersAnalysis] = None
        radical_kinetics: Optional[RadicalKineticsAnalysis] = None

        if mechanism == PolymerizationMechanism.STEP_GROWTH:
            fav = data.get("average_functionality", 2.0)
            carothers = self.evaluate_carothers(
                conversion_p=p,
                stoichiometric_ratio_r=r,
                average_functionality=fav,
                monomer_mw=repeat_mw,
            )
            xn = carothers.degree_of_polymerization_xn
            xw = carothers.weight_degree_of_polymerization_xw
            mn = xn * repeat_mw
            mw = xw * repeat_mw
            mz = mw * (1.0 + p)
            pdi = carothers.polydispersity_index

        else:
            # Chain-growth radical polymerization
            kp = data.get("kp", 500.0)
            kt = data.get("kt", 2.0e7)
            kd = data.get("kd", 1.0e-5)
            f_eff = data.get("f_eff", 0.65)
            c_monomer = data.get("c_monomer", 5.0) * (1.0 - p * 0.8)
            c_initiator = data.get("c_initiator", 0.01)
            term_mode = data.get("term_mode", RadicalTerminationMode.DISPROPORTIONATION)
            temp_c = data.get("temp_c", 60.0)

            radical_kinetics = self.evaluate_radical_kinetics(
                monomer_conc=c_monomer,
                initiator_conc=c_initiator,
                kd=kd,
                f_eff=f_eff,
                kp=kp,
                kt=kt,
                temp_c=temp_c,
                termination_mode=term_mode,
                conversion_p=p,
            )
            xn = radical_kinetics.predicted_xn
            pdi = 1.5 if term_mode == RadicalTerminationMode.COMBINATION else 2.0
            xw = xn * pdi
            mn = xn * repeat_mw
            mw = xw * repeat_mw
            mz = mw * 1.5

        # Generate molecular weight distribution curve
        dist_points = self.generate_distribution(p, repeat_mw, int(round(xn)), mechanism)

        # Flory-Huggins solution thermodynamics
        fh_analysis = self.evaluate_flory_huggins(
            degree_of_polymerization_n=max(10, int(round(xn))),
            chi_parameter=chi,
        )

        return PolymerSimulationResult(
            simulation_id=f"poly-{preset_id}-{int(p * 1000)}",
            polymer_name=data["name"],
            repeat_unit_formula=formula,
            repeat_unit_mw=round(repeat_mw, 2),
            mechanism=mechanism,
            conversion_p=round(p, 4),
            number_average_mn=round(mn, 1),
            weight_average_mw=round(mw, 1),
            z_average_mz=round(mz, 1),
            polydispersity_index=round(pdi, 3),
            carothers=carothers,
            radical_kinetics=radical_kinetics,
            flory_huggins=fh_analysis,
            distribution_curve=dist_points,
            pedagogical_notes=data["pedagogical_notes"],
        )

    def evaluate_carothers(
        self,
        conversion_p: float,
        stoichiometric_ratio_r: float,
        average_functionality: float,
        monomer_mw: float,
    ) -> CarothersAnalysis:
        """Solve Carothers equation for step-growth polycondensation and Flory gelation."""
        r = max(0.1, min(1.0, stoichiometric_ratio_r))
        p = max(0.0, min(0.9999, conversion_p))
        fav = max(1.5, average_functionality)

        # Gel point pc = 2 / fav (Flory-Stockmayer gelation threshold)
        gel_point_pc = (2.0 / fav) if fav > 2.0 else None
        is_gelled = (gel_point_pc is not None) and (p >= gel_point_pc)

        # Number-average degree of polymerization: Xn = (1 + r) / (1 + r - 2*r*p)
        denom = (1.0 + r) - (2.0 * r * p)
        if denom <= 0.0001:
            xn = 10000.0  # infinite network limit
        else:
            xn = (1.0 + r) / denom

        # Weight-average degree of polymerization: Xw = (1 + r*p) / (1 + r - 2*r*p)
        if r == 1.0:
            xw = (1.0 + p) / max(1.0 - p, 0.0001)
        else:
            xw = (1.0 + r * p) / max(denom, 0.0001)

        pdi = xw / max(xn, 1.0)

        return CarothersAnalysis(
            stoichiometric_ratio_r=round(r, 4),
            average_functionality_fav=round(fav, 2),
            conversion_p=round(p, 4),
            gel_point_pc=round(gel_point_pc, 4) if gel_point_pc is not None else None,
            is_gel_formed=is_gelled,
            degree_of_polymerization_xn=round(xn, 2),
            weight_degree_of_polymerization_xw=round(xw, 2),
            polydispersity_index=round(pdi, 3),
        )

    def evaluate_radical_kinetics(
        self,
        monomer_conc: float,
        initiator_conc: float,
        kd: float,
        f_eff: float,
        kp: float,
        kt: float,
        temp_c: float,
        termination_mode: RadicalTerminationMode,
        conversion_p: float,
    ) -> RadicalKineticsAnalysis:
        """Solve free-radical steady-state rate equations (QSSA) and kinetic chain length."""
        m_conc = max(0.05, monomer_conc)
        i_conc = max(1.0e-5, initiator_conc)

        # Trommsdorff-Norrish gel effect (autoacceleration at p > 0.40)
        autoaccel = conversion_p >= 0.40
        kt_eff = kt * (0.1 if autoaccel else 1.0)  # termination rate drops dramatically due to high viscosity

        # Radical concentration: [M*] = sqrt(f * kd * [I] / kt)
        r_conc = math.sqrt((f_eff * kd * i_conc) / max(kt_eff, 1.0))

        # Overall rate of polymerization: Rp = kp * [M] * [M*]
        rp = kp * m_conc * r_conc

        # Initiation rate: Ri = 2 * f * kd * [I]
        ri = 2.0 * f_eff * kd * i_conc

        # Kinetic chain length: nu = Rp / Ri
        nu = rp / max(ri, 1.0e-12)

        # Predicted Xn depending on termination mode
        if termination_mode == RadicalTerminationMode.COMBINATION:
            xn = 2.0 * nu
        elif termination_mode == RadicalTerminationMode.DISPROPORTIONATION:
            xn = nu
        else:
            xn = 1.5 * nu

        return RadicalKineticsAnalysis(
            temperature_c=round(temp_c, 1),
            monomer_concentration_m=round(m_conc, 3),
            initiator_concentration_m=round(i_conc, 5),
            propagation_kp_l_mol_s=round(kp, 1),
            termination_kt_l_mol_s=round(kt_eff, 1),
            radical_concentration_m=round(r_conc, 10),
            polymerization_rate_rp_mol_l_s=round(rp, 6),
            kinetic_chain_length_nu=round(nu, 2),
            predicted_xn=round(xn, 1),
            autoacceleration_trommsdorff=autoaccel,
        )

    def evaluate_flory_huggins(
        self,
        degree_of_polymerization_n: int,
        chi_parameter: float,
        points_count: int = 60,
    ) -> FloryHugginsAnalysis:
        """Calculate Flory-Huggins free energy of mixing curve and phase stability spinodal."""
        n = max(10, degree_of_polymerization_n)
        chi = chi_parameter

        # Critical Flory-Huggins interaction parameter: chi_c = 0.5 * (1 + 1/sqrt(N))^2
        sqrt_n = math.sqrt(n)
        chi_c = 0.5 * ((1.0 + 1.0 / sqrt_n) ** 2)
        phi_2c = 1.0 / (1.0 + sqrt_n)

        is_phase_sep = chi > chi_c

        curve: List[FloryHugginsPoint] = []
        d_phi = 0.98 / float(points_count - 1)

        for i in range(points_count):
            phi2 = 0.01 + i * d_phi
            phi1 = 1.0 - phi2

            # Delta G_mix / RT = phi1 * ln(phi1) + (phi2 / N) * ln(phi2) + chi * phi1 * phi2
            dg_rt = (
                phi1 * math.log(max(phi1, 1e-6))
                + (phi2 / float(n)) * math.log(max(phi2, 1e-6))
                + chi * phi1 * phi2
            )

            # Spinodal curve: chi_s(phi2) = 0.5 * (1 / (1 - phi2) + 1 / (N * phi2))
            chi_spinodal = 0.5 * ((1.0 / max(phi1, 1e-6)) + (1.0 / (n * max(phi2, 1e-6))))

            curve.append(
                FloryHugginsPoint(
                    phi_polymer=round(phi2, 3),
                    delta_g_mix_rt=round(dg_rt, 5),
                    spinodal_chi=round(chi_spinodal, 4),
                )
            )

        return FloryHugginsAnalysis(
            chi_parameter=round(chi, 4),
            critical_chi=round(chi_c, 4),
            critical_phi_polymer=round(phi_2c, 4),
            is_phase_separated=is_phase_sep,
            curve_points=curve,
        )

    def generate_distribution(
        self,
        conversion_p: float,
        repeat_mw: float,
        target_xn: int,
        mechanism: PolymerizationMechanism,
        points_count: int = 150,
    ) -> List[MolecularWeightPoint]:
        """Generate Flory-Schulz most probable molecular weight distribution."""
        points: List[MolecularWeightPoint] = []
        p = max(0.1, min(0.999, conversion_p))

        max_chain = max(100, int(target_xn * 3.5))
        step = max(1, max_chain // points_count)

        cum_weight = 0.0

        for i in range(1, max_chain + 1, step):
            # Mole fraction xi = (1 - p) * p^(i - 1)
            # Weight fraction wi = i * (1 - p)^2 * p^(i - 1)
            power_term = math.pow(p, max(0, i - 1))
            xi = (1.0 - p) * power_term
            wi = float(i) * ((1.0 - p) ** 2) * power_term

            mw = float(i) * repeat_mw
            cum_weight += wi * step
            cum_weight_clamped = min(1.0, cum_weight)

            points.append(
                MolecularWeightPoint(
                    chain_length_i=i,
                    molecular_weight=round(mw, 1),
                    mole_fraction=round(xi, 6),
                    weight_fraction=round(wi, 6),
                    cumulative_weight_fraction=round(cum_weight_clamped, 4),
                )
            )

        return points

    def _initialize_presets(self) -> Dict[str, dict]:
        """Catalog of standard step-growth and chain-growth polymers."""
        return {
            "nylon_6_6": {
                "name": "Nylon 6,6 (Polyhexamethylene Adipamide)",
                "classification": "Polyamide (Engineering Thermoplastic)",
                "mechanism": PolymerizationMechanism.STEP_GROWTH,
                "repeat_unit_formula": "[C12H22N2O2]n",
                "repeat_unit_mw": 226.32,
                "default_conversion": 0.985,
                "stoichiometric_ratio_r": 1.0,
                "average_functionality": 2.0,
                "default_chi": 0.42,
                "typical_applications": ["Textile fibers", "Automotive gears", "High-strength engineering plastics"],
                "description": "Synthesized via condensation of adipic acid and hexamethylenediamine. Requires high conversion (p > 0.98) to achieve fiber-forming molecular weights.",
                "pedagogical_notes": "Follows the Carothers equation Xn = 1/(1 - p). At p = 0.985, Xn = 66.7 and Mn ~ 15,100 g/mol with a theoretical Flory-Schulz PDI = 1 + p ~ 1.985.",
            },
            "pet": {
                "name": "Poly(ethylene terephthalate) (PET)",
                "classification": "Polyester (Packaging & Fibers)",
                "mechanism": PolymerizationMechanism.STEP_GROWTH,
                "repeat_unit_formula": "[C10H8O4]n",
                "repeat_unit_mw": 192.17,
                "default_conversion": 0.982,
                "stoichiometric_ratio_r": 1.0,
                "average_functionality": 2.0,
                "default_chi": 0.40,
                "typical_applications": ["Beverage bottles", "Dacron polyester fibers", "Mylar films"],
                "description": "Condensation copolymerization of terephthalic acid and ethylene glycol with transesterification under vacuum to eliminate ethylene glycol by-product.",
                "pedagogical_notes": "Stoichiometric balance is essential: even a 1% imbalance (r = 0.99) caps the maximum degree of polymerization at Xn = (1 + r)/(1 - r) = 199.",
            },
            "pmma": {
                "name": "Poly(methyl methacrylate) (PMMA / Plexiglas)",
                "classification": "Acrylic Thermoplastic",
                "mechanism": PolymerizationMechanism.CHAIN_GROWTH_RADICAL,
                "repeat_unit_formula": "[C5H8O2]n",
                "repeat_unit_mw": 100.12,
                "default_conversion": 0.80,
                "c_monomer": 7.0,
                "c_initiator": 0.008,
                "kd": 1.2e-5,
                "f_eff": 0.60,
                "kp": 515.0,
                "kt": 2.5e7,
                "temp_c": 60.0,
                "term_mode": RadicalTerminationMode.DISPROPORTIONATION,
                "default_chi": 0.38,
                "typical_applications": ["Optical lenses", "Aircraft canopies", "Shatterproof acrylic sheets"],
                "description": "Radical bulk or suspension polymerization initiated by AIBN. Demonstrates pronounced Trommsdorff autoacceleration (gel effect) at conversions above 40%.",
                "pedagogical_notes": "Termination in PMMA occurs predominantly via radical disproportionation (producing one saturated and one unsaturated chain end), resulting in Xn = nu and PDI ~ 2.0.",
            },
            "polystyrene": {
                "name": "Polystyrene (PS)",
                "classification": "General Purpose Aromatic Thermoplastic",
                "mechanism": PolymerizationMechanism.CHAIN_GROWTH_RADICAL,
                "repeat_unit_formula": "[C8H8]n",
                "repeat_unit_mw": 104.15,
                "default_conversion": 0.85,
                "c_monomer": 8.0,
                "c_initiator": 0.012,
                "kd": 1.5e-5,
                "f_eff": 0.70,
                "kp": 165.0,
                "kt": 4.0e7,
                "temp_c": 70.0,
                "term_mode": RadicalTerminationMode.COMBINATION,
                "default_chi": 0.35,
                "typical_applications": ["Disposable cutlery", "Insulating foam (EPS)", "Petri dishes"],
                "description": "Radical chain-growth polymerization of styrene initiated by benzoyl peroxide. Termination proceeds almost exclusively via combination of growing macroradicals.",
                "pedagogical_notes": "Because radical coupling couples two active chains, Xn = 2 * nu and the theoretical polydispersity index is narrower (PDI ~ 1.5) than disproportionation.",
            },
            "pla": {
                "name": "Poly(lactic acid) (PLA)",
                "classification": "Aliphatic Biodegradable Polyester",
                "mechanism": PolymerizationMechanism.STEP_GROWTH,
                "repeat_unit_formula": "[C3H4O2]n",
                "repeat_unit_mw": 72.06,
                "default_conversion": 0.990,
                "stoichiometric_ratio_r": 1.0,
                "average_functionality": 2.0,
                "default_chi": 0.46,
                "typical_applications": ["3D printing filament", "Biodegradable packaging", "Bioabsorbable medical sutures"],
                "description": "Produced from renewable agricultural feedstocks via ring-opening polymerization of lactide dimers or direct polycondensation of lactic acid.",
                "pedagogical_notes": "Direct polycondensation requires high vacuum to shift esterification equilibrium by continuous water removal; Xn = 100 yields Mn ~ 7,200 g/mol.",
            },
            "polyurethane_network": {
                "name": "Crosslinked Polyurethane Elastomer Network",
                "classification": "Thermoset Crosslinked Network",
                "mechanism": PolymerizationMechanism.STEP_GROWTH,
                "repeat_unit_formula": "[C15H22N2O5]n",
                "repeat_unit_mw": 310.35,
                "default_conversion": 0.88,
                "stoichiometric_ratio_r": 1.0,
                "average_functionality": 2.4,  # trifunctional crosslinker added
                "default_chi": 0.52,
                "typical_applications": ["Flexible foams", "Elastomeric wheel treads", "Structural adhesives"],
                "description": "Step-growth reaction between toluene diisocyanate (f=2) and a polyether triol (f=3). Demonstrates the Flory-Stockmayer gelation threshold.",
                "pedagogical_notes": "With an average functionality fav = 2.4, the gel point conversion is pc = 2 / fav = 0.833 (83.3%). Beyond this critical conversion, an infinite macroscopic gel network is formed.",
            },
        }


polymer_service = PolymerService()
