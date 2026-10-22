"""Domain models for Supramolecular Chemistry & Host-Guest Complexation (PR #045)."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class HostMolecule(BaseModel):
    """Macrocyclic host receptor specification."""
    id: str
    name: str
    category: str = Field(..., description="crown_ether, cyclodextrin, cryptand, calixarene")
    formula: str
    molecular_weight: float
    cavity_diameter_angstrom: float
    depth_angstrom: Optional[float] = None
    donor_sites: int
    donor_atom_type: str
    description: str


class GuestMolecule(BaseModel):
    """Guest analyte or inclusion substrate."""
    id: str
    name: str
    category: str = Field(..., description="alkali_cation, aromatic_guest, ammonium_ion")
    formula: str
    molecular_weight: float
    effective_radius_angstrom: float
    charge: int
    description: str


class JobPlotPoint(BaseModel):
    """Individual measurement point in continuous variation (Job's) analysis."""
    mole_fraction_guest: float
    host_conc_mM: float
    guest_conc_mM: float
    complex_conc_mM: float
    signal_intensity: float


class JobPlotResult(BaseModel):
    """Job's method continuous variation analysis determining host-guest stoichiometry."""
    host_name: str
    guest_name: str
    total_concentration_mM: float
    peak_mole_fraction: float
    determined_stoichiometry: str = Field(..., description="1:1, 1:2, or 2:1")
    points: List[JobPlotPoint]
    theoretical_1_to_1_peak: float = 0.50
    explanation: str


class BindingIsothermPoint(BaseModel):
    """Equilibrium concentration and fractional saturation at titration step."""
    guest_total_mM: float
    free_host_mM: float
    free_guest_mM: float
    bound_complex_mM: float
    fraction_bound: float
    relative_spectroscopic_signal: float


class NonCovalentDecomposition(BaseModel):
    """Thermodynamic and non-covalent force decomposition of host-guest binding."""
    ion_dipole_electrostatic_kj_mol: float
    hydrogen_bonding_kj_mol: float
    pi_pi_stacking_kj_mol: float
    hydrophobic_desolvation_kj_mol: float
    steric_cavity_fit_penalty_kj_mol: float
    total_interaction_energy_kj_mol: float
    cavity_size_match_ratio: float


class HostGuestComplexSystem(BaseModel):
    """Complete supramolecular host-guest inclusion complex evaluation."""
    host: HostMolecule
    guest: GuestMolecule
    association_constant_ka_m_inv: float = Field(..., description="Binding constant Ka [M^-1]")
    log_ka: float = Field(..., description="Logarithm base 10 of association constant")
    dissociation_constant_kd_uM: float = Field(..., description="Kd = 1/Ka [μM]")
    gibbs_free_energy_delta_g_kj_mol: float = Field(..., description="ΔG° = -RT ln Ka [kJ/mol]")
    enthalpy_delta_h_kj_mol: float = Field(..., description="Enthalpy of binding ΔH° [kJ/mol]")
    entropy_term_minus_t_delta_s_kj_mol: float = Field(..., description="-TΔS° [kJ/mol]")
    is_enthalpy_driven: bool
    is_entropy_driven: bool
    decomposition: NonCovalentDecomposition
    stoichiometry: str = "1:1"
    isotherm_points: List[BindingIsothermPoint]
    pedagogical_summary: str
