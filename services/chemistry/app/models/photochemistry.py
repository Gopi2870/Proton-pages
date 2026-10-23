"""Domain models for Photochemistry, Jablonski Energy Diagrams & FRET Dynamics (PR #047)."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class FluorophoreMolecule(BaseModel):
    """Chromophore or fluorophore photophysical profile."""
    id: str
    name: str
    category: str = Field(..., description="organic_dye, fluorescent_protein, quantum_dot, organometallic_complex")
    formula: str
    molecular_weight: float
    absorption_max_nm: float
    emission_max_nm: float
    extinction_coefficient_m_inv_cm_inv: float
    radiative_rate_kr_s_inv: float = Field(..., description="Radiative emission rate constant kr [s^-1]")
    internal_conversion_rate_kic_s_inv: float = Field(..., description="Internal conversion rate constant kic [s^-1]")
    intersystem_crossing_rate_kisc_s_inv: float = Field(..., description="Intersystem crossing rate constant kisc [s^-1]")
    phosphorescence_rate_kp_s_inv: float = Field(..., description="Radiative phosphorescence rate constant kp [s^-1]")
    triplet_non_radiative_rate_ktnr_s_inv: float = Field(..., description="Triplet non-radiative deactivation ktnr [s^-1]")
    stokes_shift_cm_inv: float
    singlet_energy_s1_ev: float
    triplet_energy_t1_ev: float
    description: str


class QuencherMolecule(BaseModel):
    """Fluorescence collisional or static quencher."""
    id: str
    name: str
    quencher_type: str = Field(..., description="collisional_dynamic, heavy_atom, electron_transfer, static_complex")
    formula: str
    molecular_weight: float
    typical_bimolecular_kq_m_inv_s_inv: float = Field(..., description="Bimolecular quenching constant kq [M^-1 s^-1]")
    description: str


class FretPair(BaseModel):
    """Förster Resonance Energy Transfer donor-acceptor pair specification."""
    id: str
    name: str
    donor_id: str
    acceptor_id: str
    forster_distance_r0_angstrom: float = Field(..., description="Förster critical distance R0 where efficiency = 50% [Å]")
    spectral_overlap_integral_j_nm4_m_cm: float = Field(..., description="Spectral overlap integral J(λ) [nm^4 M^-1 cm^-1]")
    dipole_orientation_kappa2: float = 0.667
    refractive_index_n: float = 1.333
    description: str


class JablonskiEnergyState(BaseModel):
    """Energy manifold level for Jablonski diagram visualization."""
    state_id: str
    label: str
    multiplicity: str = Field(..., description="singlet, triplet")
    energy_ev: float
    energy_kj_mol: float
    electronic_configuration: str


class PhotophysicalDeexcitationRates(BaseModel):
    """De-excitation rate breakdown and quantum yields."""
    radiative_kr_s_inv: float
    internal_conversion_kic_s_inv: float
    intersystem_crossing_kisc_s_inv: float
    total_decay_rate_k_tot_s_inv: float
    fluorescence_lifetime_tau0_ns: float
    fluorescence_quantum_yield_phi_f: float
    triplet_yield_phi_isc: float
    phosphorescence_quantum_yield_phi_p: float
    phosphorescence_lifetime_tau_p_ms: float


class SternVolmerPoint(BaseModel):
    """Individual titration point in Stern-Volmer fluorescence quenching analysis."""
    quencher_concentration_mM: float
    fluorescence_intensity_f: float
    f0_over_f: float
    fluorescence_lifetime_tau_ns: float


class SternVolmerResult(BaseModel):
    """Stern-Volmer collisional quenching determination."""
    fluorophore_name: str
    quencher_name: str
    stern_volmer_constant_ksv_m_inv: float
    bimolecular_quenching_rate_kq_m_inv_s_inv: float
    is_diffusion_limited: bool
    unquenched_intensity_f0: float
    unquenched_lifetime_tau0_ns: float
    points: List[SternVolmerPoint]
    regression_r_squared: float
    explanation: str


class FretEfficiencyPoint(BaseModel):
    """Donor-acceptor inter-fluorophore distance and corresponding FRET efficiency."""
    distance_r_angstrom: float
    fret_efficiency: float
    relative_donor_fluorescence: float
    sensitized_acceptor_emission: float


class FretSimulationResult(BaseModel):
    """Förster Resonance Energy Transfer simulation and distance ruler computation."""
    pair_name: str
    donor_name: str
    acceptor_name: str
    forster_distance_r0_angstrom: float
    current_distance_r_angstrom: float
    efficiency_at_current_distance: float
    distance_points: List[FretEfficiencyPoint]
    r0_validation_summary: str
