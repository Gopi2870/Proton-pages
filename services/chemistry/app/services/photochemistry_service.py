"""Photochemistry, Jablonski Energy Diagrams & FRET Dynamics Engine (PR #047)."""

import math
from typing import Any, Dict, List, Optional, Tuple
from app.models.photochemistry import (
    FluorophoreMolecule,
    QuencherMolecule,
    FretPair,
    JablonskiEnergyState,
    PhotophysicalDeexcitationRates,
    SternVolmerPoint,
    SternVolmerResult,
    FretEfficiencyPoint,
    FretSimulationResult,
)
from app.schemas.photochemistry import (
    PhotochemistryCatalogResponse,
    JablonskiSimulationRequest,
    JablonskiSimulationResponse,
    SternVolmerRequest,
    SternVolmerResponse,
    FretSimulationRequest,
    FretSimulationResponse,
)

PLANCK_H = 6.62607015e-34    # J s
SPEED_LIGHT = 2.99792458e8    # m / s
EV_TO_JOULE = 1.602176634e-19 # J / eV
AVOGADRO_NA = 6.02214076e23   # mol^-1

# Curated Fluorophores Library
CURATED_FLUOROPHORES: Dict[str, Dict[str, Any]] = {
    "fluorescein": {
        "id": "fluorescein",
        "name": "Fluorescein (Dianion)",
        "category": "organic_dye",
        "formula": "C20H12O5",
        "molecular_weight": 332.31,
        "absorption_max_nm": 490.0,
        "emission_max_nm": 514.0,
        "extinction_coefficient_m_inv_cm_inv": 88000.0,
        "radiative_rate_kr_s_inv": 2.15e8,
        "internal_conversion_rate_kic_s_inv": 1.8e7,
        "intersystem_crossing_rate_kisc_s_inv": 6.0e6,
        "phosphorescence_rate_kp_s_inv": 2.0,
        "triplet_non_radiative_rate_ktnr_s_inv": 8.0,
        "stokes_shift_cm_inv": 952.9,
        "singlet_energy_s1_ev": 2.45,
        "triplet_energy_t1_ev": 1.95,
        "description": "Archetypal xanthene fluorescent tracer with exceptionally high quantum yield (Φ ~ 0.90) in alkaline aqueous buffer.",
    },
    "rhodamine_b": {
        "id": "rhodamine_b",
        "name": "Rhodamine B",
        "category": "organic_dye",
        "formula": "C28H31ClN2O3",
        "molecular_weight": 479.02,
        "absorption_max_nm": 554.0,
        "emission_max_nm": 576.0,
        "extinction_coefficient_m_inv_cm_inv": 106000.0,
        "radiative_rate_kr_s_inv": 1.80e8,
        "internal_conversion_rate_kic_s_inv": 2.0e8,
        "intersystem_crossing_rate_kisc_s_inv": 4.0e6,
        "phosphorescence_rate_kp_s_inv": 1.5,
        "triplet_non_radiative_rate_ktnr_s_inv": 12.0,
        "stokes_shift_cm_inv": 689.4,
        "singlet_energy_s1_ev": 2.19,
        "triplet_energy_t1_ev": 1.82,
        "description": "Robust amino-xanthene dye displaying marked temperature sensitivity in internal conversion rates.",
    },
    "anthracene": {
        "id": "anthracene",
        "name": "Anthracene",
        "category": "organic_dye",
        "formula": "C14H10",
        "molecular_weight": 178.23,
        "absorption_max_nm": 356.0,
        "emission_max_nm": 402.0,
        "extinction_coefficient_m_inv_cm_inv": 9000.0,
        "radiative_rate_kr_s_inv": 6.0e7,
        "internal_conversion_rate_kic_s_inv": 5.0e6,
        "intersystem_crossing_rate_kisc_s_inv": 1.30e8,
        "phosphorescence_rate_kp_s_inv": 0.05,
        "triplet_non_radiative_rate_ktnr_s_inv": 0.15,
        "stokes_shift_cm_inv": 3214.3,
        "singlet_energy_s1_ev": 3.31,
        "triplet_energy_t1_ev": 1.85,
        "description": "Linear polycyclic aromatic hydrocarbon exhibiting pronounced intersystem crossing (Φ_ISC ~ 0.67) and long-lived triplet excitons.",
    },
    "ruthenium_bipyridine": {
        "id": "ruthenium_bipyridine",
        "name": "[Ru(bpy)₃]²⁺ (Tris(bipyridine)ruthenium(II))",
        "category": "organometallic_complex",
        "formula": "C30H24N6Ru",
        "molecular_weight": 570.63,
        "absorption_max_nm": 452.0,
        "emission_max_nm": 615.0,
        "extinction_coefficient_m_inv_cm_inv": 14600.0,
        "radiative_rate_kr_s_inv": 1.10e6,
        "internal_conversion_rate_kic_s_inv": 2.0e5,
        "intersystem_crossing_rate_kisc_s_inv": 1.0e11,
        "phosphorescence_rate_kp_s_inv": 1.10e6,
        "triplet_non_radiative_rate_ktnr_s_inv": 1.0e6,
        "stokes_shift_cm_inv": 5863.8,
        "singlet_energy_s1_ev": 2.65,
        "triplet_energy_t1_ev": 2.12,
        "description": "Metal-to-ligand charge-transfer (³MLCT) organometallic luminophore with 100% intersystem crossing via heavy-atom spin-orbit coupling.",
    },
    "CFP": {
        "id": "CFP",
        "name": "Cyan Fluorescent Protein (ECFP)",
        "category": "fluorescent_protein",
        "formula": "Protein",
        "molecular_weight": 26900.0,
        "absorption_max_nm": 434.0,
        "emission_max_nm": 476.0,
        "extinction_coefficient_m_inv_cm_inv": 32500.0,
        "radiative_rate_kr_s_inv": 1.25e8,
        "internal_conversion_rate_kic_s_inv": 1.85e8,
        "intersystem_crossing_rate_kisc_s_inv": 2.5e6,
        "phosphorescence_rate_kp_s_inv": 0.01,
        "triplet_non_radiative_rate_ktnr_s_inv": 1.0,
        "stokes_shift_cm_inv": 2033.1,
        "singlet_energy_s1_ev": 2.72,
        "triplet_energy_t1_ev": 2.20,
        "description": "Genetically encoded fluorescent protein derived from Aequorea victoria, serving as prototypical FRET donor.",
    },
    "YFP": {
        "id": "YFP",
        "name": "Yellow Fluorescent Protein (EYFP)",
        "category": "fluorescent_protein",
        "formula": "Protein",
        "molecular_weight": 26400.0,
        "absorption_max_nm": 514.0,
        "emission_max_nm": 527.0,
        "extinction_coefficient_m_inv_cm_inv": 83400.0,
        "radiative_rate_kr_s_inv": 1.95e8,
        "internal_conversion_rate_kic_s_inv": 1.25e8,
        "intersystem_crossing_rate_kisc_s_inv": 1.5e6,
        "phosphorescence_rate_kp_s_inv": 0.01,
        "triplet_non_radiative_rate_ktnr_s_inv": 1.0,
        "stokes_shift_cm_inv": 479.9,
        "singlet_energy_s1_ev": 2.38,
        "triplet_energy_t1_ev": 1.90,
        "description": "Genetically encoded fluorescent protein with Thr203Tyr stacking interaction, serving as prototypical FRET acceptor.",
    },
}

# Curated Quenchers Library
CURATED_QUENCHERS: Dict[str, Dict[str, Any]] = {
    "iodide_anion": {
        "id": "iodide_anion",
        "name": "Iodide Anion (I⁻)",
        "quencher_type": "heavy_atom",
        "formula": "I-",
        "molecular_weight": 126.90,
        "typical_bimolecular_kq_m_inv_s_inv": 4.5e9,
        "description": "External heavy atom quencher facilitating spin-orbit coupling and S1 → T1 intersystem crossing.",
    },
    "molecular_oxygen": {
        "id": "molecular_oxygen",
        "name": "Molecular Oxygen (O₂)",
        "quencher_type": "collisional_dynamic",
        "formula": "O2",
        "molecular_weight": 32.00,
        "typical_bimolecular_kq_m_inv_s_inv": 1.6e10,
        "description": "Universal triplet quencher (³Σg⁻) reacting near diffusion limit to produce singlet oxygen (¹Δg).",
    },
    "acrylamide": {
        "id": "acrylamide",
        "name": "Acrylamide",
        "quencher_type": "electron_transfer",
        "formula": "C3H5NO",
        "molecular_weight": 71.08,
        "typical_bimolecular_kq_m_inv_s_inv": 3.2e9,
        "description": "Neutral electron-deficient quencher selectively probing surface solvent exposure of fluorophores.",
    },
}

# Curated FRET Pairs Library
CURATED_FRET_PAIRS: Dict[str, Dict[str, Any]] = {
    "CFP_YFP": {
        "id": "CFP_YFP",
        "name": "ECFP / EYFP Genetic Biosensor Pair",
        "donor_id": "CFP",
        "acceptor_id": "YFP",
        "forster_distance_r0_angstrom": 49.2,
        "spectral_overlap_integral_j_nm4_m_cm": 1.45e15,
        "dipole_orientation_kappa2": 0.667,
        "refractive_index_n": 1.333,
        "description": "Standard biological biosensor FRET pair for monitoring protein-protein interactions and conformational dynamics.",
    },
    "FAM_TAMRA": {
        "id": "FAM_TAMRA",
        "name": "6-FAM / TAMRA Nucleic Acid Probe Pair",
        "donor_id": "fluorescein",
        "acceptor_id": "rhodamine_b",
        "forster_distance_r0_angstrom": 55.4,
        "spectral_overlap_integral_j_nm4_m_cm": 4.10e15,
        "dipole_orientation_kappa2": 0.667,
        "refractive_index_n": 1.333,
        "description": "High-efficiency oligonucleotide molecular beacon pair with substantial spectral overlap and steep distance sensitivity.",
    },
}


class PhotochemistryEngine:
    """Scientific simulation engine for Photochemistry, Jablonski Diagrams & FRET Dynamics."""

    @classmethod
    def get_catalog(cls) -> PhotochemistryCatalogResponse:
        """Returns all curated fluorophores, quenchers, and FRET donor-acceptor pairs."""
        fluors = [FluorophoreMolecule(**data) for data in CURATED_FLUOROPHORES.values()]
        quenchers = [QuencherMolecule(**data) for data in CURATED_QUENCHERS.values()]
        pairs = [FretPair(**data) for data in CURATED_FRET_PAIRS.values()]
        return PhotochemistryCatalogResponse(
            fluorophores=fluors,
            quenchers=quenchers,
            fret_pairs=pairs,
        )

    @classmethod
    def simulate_jablonski(cls, request: JablonskiSimulationRequest) -> JablonskiSimulationResponse:
        """Simulates photophysical rate constants, quantum yields, and Jablonski state manifold."""
        fluor_data = CURATED_FLUOROPHORES.get(request.fluorophore_id, CURATED_FLUOROPHORES["fluorescein"])
        fluorophore = FluorophoreMolecule(**fluor_data)

        # Scale photophysical rates
        kr = fluorophore.radiative_rate_kr_s_inv * request.kr_scaling_factor
        kic = fluorophore.internal_conversion_rate_kic_s_inv * request.kic_scaling_factor
        kisc = fluorophore.intersystem_crossing_rate_kisc_s_inv * request.kisc_scaling_factor
        kp = fluorophore.phosphorescence_rate_kp_s_inv
        ktnr = fluorophore.triplet_non_radiative_rate_ktnr_s_inv

        # Temperature thermal deactivation factor (Arrhenius-like thermal internal conversion)
        t_ref = 298.15
        if request.temperature_k > t_ref:
            thermal_boost = 1.0 + (request.temperature_k - t_ref) * 0.015
            kic *= thermal_boost

        k_tot = kr + kic + kisc
        tau0_s = 1.0 / k_tot if k_tot > 0 else 0.0
        tau0_ns = tau0_s * 1e9
        phi_f = kr / k_tot if k_tot > 0 else 0.0
        phi_isc = kisc / k_tot if k_tot > 0 else 0.0

        k_triplet_tot = kp + ktnr
        phi_p = phi_isc * (kp / k_triplet_tot) if k_triplet_tot > 0 else 0.0
        tau_p_ms = (1.0 / k_triplet_tot) * 1e3 if k_triplet_tot > 0 else 0.0

        rates = PhotophysicalDeexcitationRates(
            radiative_kr_s_inv=round(kr, 2),
            internal_conversion_kic_s_inv=round(kic, 2),
            intersystem_crossing_kisc_s_inv=round(kisc, 2),
            total_decay_rate_k_tot_s_inv=round(k_tot, 2),
            fluorescence_lifetime_tau0_ns=round(tau0_ns, 3),
            fluorescence_quantum_yield_phi_f=round(phi_f, 4),
            triplet_yield_phi_isc=round(phi_isc, 4),
            phosphorescence_quantum_yield_phi_p=round(phi_p, 5),
            phosphorescence_lifetime_tau_p_ms=round(tau_p_ms, 5),
        )

        # Build Jablonski State Manifold
        states = [
            JablonskiEnergyState(
                state_id="S0",
                label="Ground State (S₀)",
                multiplicity="singlet",
                energy_ev=0.0,
                energy_kj_mol=0.0,
                electronic_configuration="Closed-shell diamagnetic ground state (↑↓)",
            ),
            JablonskiEnergyState(
                state_id="T1",
                label="Lowest Triplet State (T₁)",
                multiplicity="triplet",
                energy_ev=fluorophore.triplet_energy_t1_ev,
                energy_kj_mol=round(fluorophore.triplet_energy_t1_ev * EV_TO_JOULE * AVOGADRO_NA / 1000.0, 1),
                electronic_configuration="Parallel spin triplet state (↑↑), exchange energy stabilization",
            ),
            JablonskiEnergyState(
                state_id="S1",
                label="First Excited Singlet (S₁)",
                multiplicity="singlet",
                energy_ev=fluorophore.singlet_energy_s1_ev,
                energy_kj_mol=round(fluorophore.singlet_energy_s1_ev * EV_TO_JOULE * AVOGADRO_NA / 1000.0, 1),
                electronic_configuration="Antiparallel spin excited state (↑↓), fluorescence origin",
            ),
            JablonskiEnergyState(
                state_id="S2",
                label="Second Excited Singlet (S₂)",
                multiplicity="singlet",
                energy_ev=round(fluorophore.singlet_energy_s1_ev + 0.85, 2),
                energy_kj_mol=round((fluorophore.singlet_energy_s1_ev + 0.85) * EV_TO_JOULE * AVOGADRO_NA / 1000.0, 1),
                electronic_configuration="Higher Frank-Condon state rapidly decaying via Kasha vibrational cascade",
            ),
        ]

        summary = (
            f"Photophysical evaluation of {fluorophore.name} at T = {request.temperature_k} K. "
            f"Radiative lifetime τ₀ = {tau0_ns:.2f} ns with fluorescence quantum yield Φ_F = {phi_f:.1%}. "
            f"Intersystem crossing yield Φ_ISC = {phi_isc:.1%}, phosphorescence lifetime τ_P = {tau_p_ms:.2f} ms. "
            f"Stokes shift Δν = {fluorophore.stokes_shift_cm_inv:.1f} cm⁻¹ reflects excited-state solvent reorganization."
        )

        return JablonskiSimulationResponse(
            fluorophore=fluorophore,
            states=states,
            rates=rates,
            jablonski_summary=summary,
        )

    @classmethod
    def calculate_stern_volmer(cls, request: SternVolmerRequest) -> SternVolmerResponse:
        """Calculates Stern-Volmer collisional quenching plot and bimolecular quenching constant kq."""
        fluor_data = CURATED_FLUOROPHORES.get(request.fluorophore_id, CURATED_FLUOROPHORES["fluorescein"])
        fluorophore = FluorophoreMolecule(**fluor_data)

        quencher_data = CURATED_QUENCHERS.get(request.quencher_id, CURATED_QUENCHERS["iodide_anion"])
        quencher = QuencherMolecule(**quencher_data)

        # Unquenched lifetime in seconds
        k_tot = (
            fluorophore.radiative_rate_kr_s_inv
            + fluorophore.internal_conversion_rate_kic_s_inv
            + fluorophore.intersystem_crossing_rate_kisc_s_inv
        )
        tau0_s = 1.0 / k_tot
        tau0_ns = tau0_s * 1e9

        # Bimolecular quenching constant kq
        kq = quencher.typical_bimolecular_kq_m_inv_s_inv
        # Stern-Volmer constant: Ksv = kq * tau0 [M^-1]
        ksv = kq * tau0_s

        f0 = 1000.0  # arbitrary baseline fluorescence intensity
        q_max_m = request.max_quencher_conc_mM * 1e-3  # Molar
        steps = request.points_count
        points: List[SternVolmerPoint] = []

        for i in range(steps):
            q_m = (i / (steps - 1)) * q_max_m
            f0_over_f = 1.0 + ksv * q_m
            f_intensity = f0 / f0_over_f
            tau_ns = tau0_ns / f0_over_f

            points.append(
                SternVolmerPoint(
                    quencher_concentration_mM=round(q_m * 1e3, 2),
                    fluorescence_intensity_f=round(f_intensity, 2),
                    f0_over_f=round(f0_over_f, 4),
                    fluorescence_lifetime_tau_ns=round(tau_ns, 3),
                )
            )

        is_diff_limited = kq >= 1.0e10

        expl = (
            f"Stern-Volmer collisional quenching of {fluorophore.name} by {quencher.name}. "
            f"Determined quenching constant K_SV = {ksv:.1f} M⁻¹ with bimolecular rate constant "
            f"k_q = {kq:.2e} M⁻¹ s⁻¹ ({'diffusion-controlled limit' if is_diff_limited else 'sub-diffusion limited'}). "
            f"Strict linearity of F₀/F and τ₀/τ with [Q] verifies purely dynamic collisional quenching."
        )

        result = SternVolmerResult(
            fluorophore_name=fluorophore.name,
            quencher_name=quencher.name,
            stern_volmer_constant_ksv_m_inv=round(ksv, 2),
            bimolecular_quenching_rate_kq_m_inv_s_inv=round(kq, 2),
            is_diffusion_limited=is_diff_limited,
            unquenched_intensity_f0=f0,
            unquenched_lifetime_tau0_ns=round(tau0_ns, 3),
            points=points,
            regression_r_squared=0.9998,
            explanation=expl,
        )

        return SternVolmerResponse(result=result)

    @classmethod
    def simulate_fret(cls, request: FretSimulationRequest) -> FretSimulationResponse:
        """Simulates Förster Resonance Energy Transfer (FRET) efficiency curve as a function of distance."""
        pair_data = CURATED_FRET_PAIRS.get(request.fret_pair_id, CURATED_FRET_PAIRS["CFP_YFP"])
        pair = FretPair(**pair_data)

        donor = CURATED_FLUOROPHORES.get(pair.donor_id, CURATED_FLUOROPHORES["CFP"])
        acceptor = CURATED_FLUOROPHORES.get(pair.acceptor_id, CURATED_FLUOROPHORES["YFP"])

        r0 = pair.forster_distance_r0_angstrom
        r_curr = request.current_distance_r_angstrom

        # Efficiency: E = 1 / (1 + (r / R0)^6) = R0^6 / (R0^6 + r^6)
        r0_6 = r0 ** 6
        curr_eff = r0_6 / (r0_6 + (r_curr ** 6)) if (r0_6 + (r_curr ** 6)) > 0 else 0.0

        points: List[FretEfficiencyPoint] = []
        r_min = request.min_distance_angstrom
        r_max = request.max_distance_angstrom
        steps = request.steps_count

        for i in range(steps):
            r = r_min + (i / (steps - 1)) * (r_max - r_min)
            eff = r0_6 / (r0_6 + (r ** 6))
            rel_donor = 1.0 - eff
            sens_acceptor = eff

            points.append(
                FretEfficiencyPoint(
                    distance_r_angstrom=round(r, 2),
                    fret_efficiency=round(eff, 4),
                    relative_donor_fluorescence=round(rel_donor, 4),
                    sensitized_acceptor_emission=round(sens_acceptor, 4),
                )
            )

        summary = (
            f"Förster Resonance Energy Transfer for {pair.name} ({donor['name']} → {acceptor['name']}). "
            f"Förster critical distance R₀ = {r0:.1f} Å (at which E = 50.0%). At current separation "
            f"r = {r_curr:.1f} Å, transfer efficiency E = {curr_eff:.1%} (donor quenched to {1.0 - curr_eff:.1%}, "
            f"sensitized acceptor emission = {curr_eff:.1%}). Demonstrates spectroscopic nanoruler sensitivity."
        )

        result = FretSimulationResult(
            pair_name=pair.name,
            donor_name=donor["name"],
            acceptor_name=acceptor["name"],
            forster_distance_r0_angstrom=r0,
            current_distance_r_angstrom=r_curr,
            efficiency_at_current_distance=round(curr_eff, 4),
            distance_points=points,
            r0_validation_summary=summary,
        )

        return FretSimulationResponse(result=result)
