"""Supramolecular Chemistry & Host-Guest Complexation Engine (PR #045)."""

import math
from typing import Any, Dict, List, Optional, Tuple
from app.models.supramolecular import (
    HostMolecule,
    GuestMolecule,
    JobPlotPoint,
    JobPlotResult,
    BindingIsothermPoint,
    NonCovalentDecomposition,
    HostGuestComplexSystem,
)
from app.schemas.supramolecular import (
    HostsAndGuestsCatalogResponse,
    JobPlotRequest,
    JobPlotResponse,
    BindingSimulationRequest,
    BindingSimulationResponse,
)

R_GAS = 8.314462618  # J / (mol K)

# Curated Macrocyclic Host Library
CURATED_HOSTS: Dict[str, Dict[str, Any]] = {
    "18_crown_6": {
        "id": "18_crown_6",
        "name": "18-Crown-6",
        "category": "crown_ether",
        "formula": "C12H24O6",
        "molecular_weight": 264.32,
        "cavity_diameter_angstrom": 2.80,
        "donor_sites": 6,
        "donor_atom_type": "Ether Oxygen (sp³)",
        "description": "Prototypical macrocyclic polyether with peak size-complementary affinity for potassium (K⁺).",
    },
    "15_crown_5": {
        "id": "15_crown_5",
        "name": "15-Crown-5",
        "category": "crown_ether",
        "formula": "C10H20O5",
        "molecular_weight": 220.26,
        "cavity_diameter_angstrom": 1.95,
        "donor_sites": 5,
        "donor_atom_type": "Ether Oxygen (sp³)",
        "description": "Five-oxygen crown ether possessing ideal cavity diameter for coordinating sodium (Na⁺).",
    },
    "12_crown_4": {
        "id": "12_crown_4",
        "name": "12-Crown-4",
        "category": "crown_ether",
        "formula": "C8H16O4",
        "molecular_weight": 176.21,
        "cavity_diameter_angstrom": 1.40,
        "donor_sites": 4,
        "donor_atom_type": "Ether Oxygen (sp³)",
        "description": "Compact tetraoxa-macrocycle selective for the small lithium cation (Li⁺).",
    },
    "cryptand_222": {
        "id": "cryptand_222",
        "name": "Cryptand [2.2.2]",
        "category": "cryptand",
        "formula": "C18H36N2O6",
        "molecular_weight": 376.49,
        "cavity_diameter_angstrom": 2.80,
        "donor_sites": 8,
        "donor_atom_type": "6 Ether Oxygens + 2 Bridgehead Nitrogens",
        "description": "Three-dimensional bicyclic cage receptor exerting the macrobicyclic cryptate effect for K⁺.",
    },
    "beta_cyclodextrin": {
        "id": "beta_cyclodextrin",
        "name": "β-Cyclodextrin",
        "category": "cyclodextrin",
        "formula": "C42H70O35",
        "molecular_weight": 1134.98,
        "cavity_diameter_angstrom": 6.20,
        "depth_angstrom": 7.90,
        "donor_sites": 21,
        "donor_atom_type": "Secondary C2/C3 and Primary C6 Hydroxyls",
        "description": "Toroidal cyclic heptasaccharide hosting adamantyl, aromatic, and steroid pharmaceutical guests.",
    },
    "alpha_cyclodextrin": {
        "id": "alpha_cyclodextrin",
        "name": "α-Cyclodextrin",
        "category": "cyclodextrin",
        "formula": "C36H60O30",
        "molecular_weight": 972.84,
        "cavity_diameter_angstrom": 4.90,
        "depth_angstrom": 7.90,
        "donor_sites": 18,
        "donor_atom_type": "Secondary C2/C3 and Primary C6 Hydroxyls",
        "description": "Hexasaccharide macrocycle with compact cavity selective for unbranched aliphatic chains and monosubstituted benzenes.",
    },
}

# Curated Guest Substrates Library
CURATED_GUESTS: Dict[str, Dict[str, Any]] = {
    "potassium_cation": {
        "id": "potassium_cation",
        "name": "Potassium Cation (K⁺)",
        "category": "alkali_cation",
        "formula": "K⁺",
        "molecular_weight": 39.098,
        "effective_radius_angstrom": 1.38,  # Diameter 2.76 Å
        "charge": 1,
        "description": "Spherical hard alkali cation with Pauling ionic radius 1.38 Å.",
    },
    "sodium_cation": {
        "id": "sodium_cation",
        "name": "Sodium Cation (Na⁺)",
        "category": "alkali_cation",
        "formula": "Na⁺",
        "molecular_weight": 22.990,
        "effective_radius_angstrom": 1.02,  # Diameter 2.04 Å
        "charge": 1,
        "description": "Moderate-sized alkali cation with Pauling ionic radius 1.02 Å.",
    },
    "lithium_cation": {
        "id": "lithium_cation",
        "name": "Lithium Cation (Li⁺)",
        "category": "alkali_cation",
        "formula": "Li⁺",
        "molecular_weight": 6.941,
        "effective_radius_angstrom": 0.76,  # Diameter 1.52 Å
        "charge": 1,
        "description": "Small, high charge density alkali cation with Pauling radius 0.76 Å.",
    },
    "cesium_cation": {
        "id": "cesium_cation",
        "name": "Cesium Cation (Cs⁺)",
        "category": "alkali_cation",
        "formula": "Cs⁺",
        "molecular_weight": 132.905,
        "effective_radius_angstrom": 1.67,  # Diameter 3.34 Å
        "charge": 1,
        "description": "Large, polarizable soft alkali cation with Pauling radius 1.67 Å.",
    },
    "adamantanecarboxylate": {
        "id": "adamantanecarboxylate",
        "name": "1-Adamantanecarboxylate",
        "category": "aromatic_guest",
        "formula": "C11H15O2⁻",
        "molecular_weight": 179.24,
        "effective_radius_angstrom": 3.15,  # Diameter 6.30 Å
        "charge": -1,
        "description": "Rigid diamondoid cage substrate with optimal shape complementarity for β-cyclodextrin.",
    },
    "4_nitrophenol": {
        "id": "4_nitrophenol",
        "name": "4-Nitrophenol",
        "category": "aromatic_guest",
        "formula": "C6H5NO3",
        "molecular_weight": 139.11,
        "effective_radius_angstrom": 2.50,  # Diameter 5.00 Å
        "charge": 0,
        "description": "Planar aromatic guest exhibiting prominent UV-Vis absorption shifts upon cyclodextrin inclusion.",
    },
}

# Empirical Benchmark Association Constants (in standard reference conditions, e.g. MeOH / H2O)
BENCHMARK_COMPLEXES_DATABASE: Dict[Tuple[str, str], Dict[str, Any]] = {
    ("18_crown_6", "potassium_cation"): {
        "log_ka": 6.10,
        "delta_h_kj_mol": -56.0,
        "donor_interaction": -48.0,
        "h_bonding": 0.0,
        "pi_stacking": 0.0,
        "desolvation": 15.0,
    },
    ("18_crown_6", "sodium_cation"): {
        "log_ka": 4.32,
        "delta_h_kj_mol": -35.0,
        "donor_interaction": -32.0,
        "h_bonding": 0.0,
        "pi_stacking": 0.0,
        "desolvation": 12.0,
    },
    ("18_crown_6", "lithium_cation"): {
        "log_ka": 2.05,
        "delta_h_kj_mol": -14.0,
        "donor_interaction": -15.0,
        "h_bonding": 0.0,
        "pi_stacking": 0.0,
        "desolvation": 8.0,
    },
    ("18_crown_6", "cesium_cation"): {
        "log_ka": 4.62,
        "delta_h_kj_mol": -40.0,
        "donor_interaction": -34.0,
        "h_bonding": 0.0,
        "pi_stacking": 0.0,
        "desolvation": 10.0,
    },
    ("15_crown_5", "sodium_cation"): {
        "log_ka": 3.75,
        "delta_h_kj_mol": -29.0,
        "donor_interaction": -30.0,
        "h_bonding": 0.0,
        "pi_stacking": 0.0,
        "desolvation": 10.0,
    },
    ("15_crown_5", "potassium_cation"): {
        "log_ka": 3.20,
        "delta_h_kj_mol": -22.0,
        "donor_interaction": -24.0,
        "h_bonding": 0.0,
        "pi_stacking": 0.0,
        "desolvation": 8.0,
    },
    ("12_crown_4", "lithium_cation"): {
        "log_ka": 3.10,
        "delta_h_kj_mol": -24.0,
        "donor_interaction": -26.0,
        "h_bonding": 0.0,
        "pi_stacking": 0.0,
        "desolvation": 9.0,
    },
    ("cryptand_222", "potassium_cation"): {
        "log_ka": 9.75,
        "delta_h_kj_mol": -84.0,
        "donor_interaction": -78.0,
        "h_bonding": 0.0,
        "pi_stacking": 0.0,
        "desolvation": 22.0,
    },
    ("beta_cyclodextrin", "adamantanecarboxylate"): {
        "log_ka": 4.90,
        "delta_h_kj_mol": -22.5,
        "donor_interaction": 0.0,
        "h_bonding": -8.0,
        "pi_stacking": 0.0,
        "desolvation": -20.0,  # Strong hydrophobic effect driving inclusion
    },
    ("beta_cyclodextrin", "4_nitrophenol"): {
        "log_ka": 2.92,
        "delta_h_kj_mol": -15.0,
        "donor_interaction": 0.0,
        "h_bonding": -10.5,
        "pi_stacking": -4.0,
        "desolvation": -7.5,
    },
    ("alpha_cyclodextrin", "4_nitrophenol"): {
        "log_ka": 3.40,
        "delta_h_kj_mol": -18.2,
        "donor_interaction": 0.0,
        "h_bonding": -12.0,
        "pi_stacking": -3.5,
        "desolvation": -9.0,
    },
}


class SupramolecularEngine:
    """Scientific calculations for host-guest binding, Job's method, and supramolecular thermodynamics."""

    @classmethod
    def get_catalog(cls) -> HostsAndGuestsCatalogResponse:
        hosts = [HostMolecule(**h) for h in CURATED_HOSTS.values()]
        guests = [GuestMolecule(**g) for g in CURATED_GUESTS.values()]
        return HostsAndGuestsCatalogResponse(hosts=hosts, guests=guests)

    @classmethod
    def solve_quadratic_equilibrium(
        cls, h0_m: float, g0_m: float, ka_m_inv: float
    ) -> float:
        """Solves exact analytical quadratic equilibrium for 1:1 complex [HG]:

        [HG]^2 - ([H]0 + [G]0 + 1/Ka)[HG] + [H]0[G]0 = 0
        """
        if ka_m_inv <= 0.0:
            return 0.0
        kd = 1.0 / ka_m_inv
        b = h0_m + g0_m + kd
        discriminant = max(0.0, b * b - 4.0 * h0_m * g0_m)
        hg = 0.5 * (b - math.sqrt(discriminant))
        return max(0.0, min(min(h0_m, g0_m), hg))

    @classmethod
    def evaluate_host_guest_system(
        cls, host_id: str, guest_id: str, temp_k: float = 298.15
    ) -> Tuple[float, float, NonCovalentDecomposition]:
        """Calculates association constant Ka, ΔG°, ΔH°, and non-covalent force components."""
        host_info = CURATED_HOSTS.get(host_id, CURATED_HOSTS["18_crown_6"])
        guest_info = CURATED_GUESTS.get(guest_id, CURATED_GUESTS["potassium_cation"])

        guest_diam = 2.0 * guest_info["effective_radius_angstrom"]
        cavity_diam = host_info["cavity_diameter_angstrom"]
        size_ratio = guest_diam / cavity_diam

        # Check empirical benchmark database first
        pair_key = (host_id, guest_id)
        if pair_key in BENCHMARK_COMPLEXES_DATABASE:
            bm = BENCHMARK_COMPLEXES_DATABASE[pair_key]
            log_ka = bm["log_ka"]
            delta_h = bm["delta_h_kj_mol"]
            ion_dipole = bm["donor_interaction"]
            h_bond = bm["h_bonding"]
            pi_pi = bm["pi_stacking"]
            hydrophobic = bm["desolvation"]
            steric_penalty = 0.0
        else:
            # First-principles size-complementarity scoring
            # Optimal fit when size_ratio ~ 0.95 - 1.05
            size_mismatch = abs(1.0 - size_ratio)
            steric_penalty = max(0.0, (size_mismatch - 0.05) * 45.0)

            if host_info["category"] in ("crown_ether", "cryptand"):
                # Ion-dipole electrostatic mechanism
                base_log_ka = 5.0 if host_info["category"] == "crown_ether" else 8.5
                log_ka = max(1.2, base_log_ka - size_mismatch * 8.0)
                ion_dipole = -40.0 * (1.0 / max(0.5, size_ratio))
                h_bond = 0.0
                pi_pi = 0.0
                hydrophobic = 8.0
                delta_h = ion_dipole + steric_penalty
            else:
                # Cyclodextrin hydrophobic inclusion mechanism
                log_ka = max(1.0, 4.0 - size_mismatch * 6.0)
                ion_dipole = 0.0
                h_bond = -8.0
                pi_pi = -4.0 if "aromatic" in guest_info["category"] else 0.0
                hydrophobic = -18.0 * (1.0 - min(0.6, size_mismatch))
                delta_h = h_bond + pi_pi + hydrophobic * 0.4 + steric_penalty

        ka = math.pow(10.0, log_ka)
        total_energy = ion_dipole + h_bond + pi_pi + hydrophobic + steric_penalty

        decomp = NonCovalentDecomposition(
            ion_dipole_electrostatic_kj_mol=round(ion_dipole, 2),
            hydrogen_bonding_kj_mol=round(h_bond, 2),
            pi_pi_stacking_kj_mol=round(pi_pi, 2),
            hydrophobic_desolvation_kj_mol=round(hydrophobic, 2),
            steric_cavity_fit_penalty_kj_mol=round(steric_penalty, 2),
            total_interaction_energy_kj_mol=round(total_energy, 2),
            cavity_size_match_ratio=round(size_ratio, 3),
        )

        return ka, delta_h, decomp

    @classmethod
    def generate_job_plot(cls, request: JobPlotRequest) -> JobPlotResponse:
        """Simulates continuous variation (Job's Method) to confirm 1:1 binding stoichiometry."""
        if request.total_concentration_mM <= 0:
            raise ValueError("Total concentration must be positive.")
        if request.points_count < 9:
            raise ValueError("Minimum 9 points required for continuous variation analysis.")

        host_info = CURATED_HOSTS.get(request.host_id, CURATED_HOSTS["18_crown_6"])
        guest_info = CURATED_GUESTS.get(request.guest_id, CURATED_GUESTS["potassium_cation"])

        ka, _, _ = cls.evaluate_host_guest_system(request.host_id, request.guest_id, request.temperature_k)

        c_tot_m = request.total_concentration_mM * 1e-3  # M
        points: List[JobPlotPoint] = []
        max_signal = -1.0
        peak_r = 0.50

        steps = request.points_count
        for i in range(steps):
            r = i / (steps - 1)  # mole fraction guest in [0, 1]
            g0_m = c_tot_m * r
            h0_m = c_tot_m * (1.0 - r)

            hg_m = cls.solve_quadratic_equilibrium(h0_m, g0_m, ka)
            hg_mm = hg_m * 1e3
            # Optical / NMR signal proportional to [HG]
            signal = hg_mm * 1.5

            if signal > max_signal:
                max_signal = signal
                peak_r = r

            points.append(
                JobPlotPoint(
                    mole_fraction_guest=round(r, 4),
                    host_conc_mM=round(h0_m * 1e3, 4),
                    guest_conc_mM=round(g0_m * 1e3, 4),
                    complex_conc_mM=round(hg_mm, 5),
                    signal_intensity=round(signal, 5),
                )
            )

        stoichiometry = "1:1" if abs(peak_r - 0.50) <= 0.08 else ("1:2" if peak_r > 0.58 else "2:1")

        expl = (
            f"Job's continuous variation plot for {host_info['name']} and {guest_info['name']}. "
            f"Total concentration [H] + [G] = {request.total_concentration_mM} mM. "
            f"Signal apex observed at guest mole fraction r = {peak_r:.2f}, strictly confirming "
            f"{stoichiometry} host-guest binding stoichiometry (theoretical 1:1 apex = 0.50)."
        )

        result = JobPlotResult(
            host_name=host_info["name"],
            guest_name=guest_info["name"],
            total_concentration_mM=request.total_concentration_mM,
            peak_mole_fraction=round(peak_r, 3),
            determined_stoichiometry=stoichiometry,
            points=points,
            theoretical_1_to_1_peak=0.50,
            explanation=expl,
        )

        return JobPlotResponse(result=result)

    @classmethod
    def simulate_binding(cls, request: BindingSimulationRequest) -> BindingSimulationResponse:
        """Simulates titration binding isotherm, Scatchard parameters, and thermodynamic state."""
        if request.host_initial_conc_mM <= 0 or request.guest_max_conc_mM <= 0:
            raise ValueError("Concentrations must be positive.")

        host_info = CURATED_HOSTS.get(request.host_id, CURATED_HOSTS["18_crown_6"])
        guest_info = CURATED_GUESTS.get(request.guest_id, CURATED_GUESTS["potassium_cation"])

        ka, delta_h, decomp = cls.evaluate_host_guest_system(
            request.host_id, request.guest_id, request.temperature_k
        )

        temp_k = request.temperature_k
        # Standard Gibbs free energy: ΔG° = -RT ln Ka [kJ/mol]
        delta_g = -(R_GAS * temp_k * math.log(ka)) / 1000.0
        # -TΔS° = ΔG° - ΔH°
        minus_t_delta_s = delta_g - delta_h
        kd_um = (1.0 / ka) * 1e6

        h0_m = request.host_initial_conc_mM * 1e-3
        g_max_m = request.guest_max_conc_mM * 1e-3

        points: List[BindingIsothermPoint] = []
        for i in range(request.titration_steps):
            g0_m = (i / (request.titration_steps - 1)) * g_max_m
            hg_m = cls.solve_quadratic_equilibrium(h0_m, g0_m, ka)
            free_h_m = max(0.0, h0_m - hg_m)
            free_g_m = max(0.0, g0_m - hg_m)
            theta = hg_m / h0_m if h0_m > 0 else 0.0

            points.append(
                BindingIsothermPoint(
                    guest_total_mM=round(g0_m * 1e3, 4),
                    free_host_mM=round(free_h_m * 1e3, 4),
                    free_guest_mM=round(free_g_m * 1e3, 4),
                    bound_complex_mM=round(hg_m * 1e3, 4),
                    fraction_bound=round(theta, 4),
                    relative_spectroscopic_signal=round(theta * 100.0, 2),
                )
            )

        is_h_driven = delta_h < 0.0 and abs(delta_h) > abs(minus_t_delta_s)
        is_s_driven = minus_t_delta_s < 0.0 and abs(minus_t_delta_s) > abs(delta_h)

        pedagogy = (
            f"Complexation of {host_info['name']} with {guest_info['name']} at T = {temp_k} K. "
            f"Association constant Ka = {ka:.2e} M⁻¹ (log Ka = {math.log10(ka):.2f}, Kd = {kd_um:.2f} μM). "
            f"Thermodynamics: ΔG° = {delta_g:.2f} kJ/mol, ΔH° = {delta_h:.2f} kJ/mol, -TΔS° = {minus_t_delta_s:.2f} kJ/mol. "
            f"The inclusion is primarily {'enthalpy-driven (-ΔH° > 0)' if is_h_driven else 'entropy-driven (hydrophobic desolvation)'}."
        )

        system = HostGuestComplexSystem(
            host=HostMolecule(**host_info),
            guest=GuestMolecule(**guest_info),
            association_constant_ka_m_inv=round(ka, 2),
            log_ka=round(math.log10(ka), 2),
            dissociation_constant_kd_uM=round(kd_um, 3),
            gibbs_free_energy_delta_g_kj_mol=round(delta_g, 2),
            enthalpy_delta_h_kj_mol=round(delta_h, 2),
            entropy_term_minus_t_delta_s_kj_mol=round(minus_t_delta_s, 2),
            is_enthalpy_driven=is_h_driven,
            is_entropy_driven=is_s_driven,
            decomposition=decomp,
            stoichiometry="1:1",
            isotherm_points=points,
            pedagogical_summary=pedagogy,
        )

        return BindingSimulationResponse(system=system)
