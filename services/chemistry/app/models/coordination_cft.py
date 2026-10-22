"""Domain models for Coordination Chemistry & Crystal Field Theory (CFT)."""

from typing import List, Optional
from pydantic import BaseModel, Field


class TransitionMetalIon(BaseModel):
    """Transition metal ion with valence d-electron count."""
    symbol: str = Field(..., description="Element symbol (e.g. Fe, Cu, Co)")
    name: str = Field(..., description="Metal name")
    atomic_number: int
    group: int
    period: int
    oxidation_state: int
    d_electron_count: int = Field(..., ge=0, le=10, description="d-electrons in valence shell")


class Ligand(BaseModel):
    """Ligand in the spectrochemical series."""
    id: str
    formula: str
    name: str
    denticity: int = 1
    donor_atom: str
    spectrochemical_rank: int = Field(..., description="1 (weakest, I-) to 20 (strongest, CO)")
    field_strength: str = Field(..., description="'weak_field', 'intermediate', 'strong_field'")
    f_factor: float = Field(1.0, description="Jørgensen ligand field parameter (f)")


class OrbitalLevel(BaseModel):
    """A d-orbital splitting level with its electron occupation."""
    label: str = Field(..., description="e.g. 't2g', 'eg', 'dz2', 'dx2-y2'")
    orbitals: List[str] = Field(..., description="e.g. ['dxy', 'dyz', 'dxz']")
    energy_delta: float = Field(..., description="Energy in units of Delta_o (e.g. -0.4 or +0.6)")
    energy_cm_inv: float
    degeneracy: int
    electron_count: int = 0
    unpaired_electrons: int = 0


class CoordinationComplex(BaseModel):
    """Coordination complex entity with crystal field splitting and magnetic properties."""
    formula: str
    name: str
    metal: TransitionMetalIon
    ligand: Ligand
    coordination_number: int = 6
    geometry: str = Field(..., description="'octahedral', 'tetrahedral', 'square_planar'")
    delta_cm_inv: float
    pairing_energy_cm_inv: float
    spin_state: str = Field(..., description="'high_spin', 'low_spin', 'not_applicable'")
    orbital_levels: List[OrbitalLevel]
    cfse_delta_units: float
    cfse_kj_mol: float
    unpaired_electrons: int
    magnetic_moment_bm: float = Field(..., description="Spin-only effective magnetic moment (Bohr Magnetons)")
    is_paramagnetic: bool
    jahn_teller_distortion: str = Field(..., description="'none', 'strong_elongation', 'weak_compression'")
    absorption_wavelength_nm: Optional[float] = None
    perceived_color_name: str
    perceived_color_hex: str
    pedagogical_notes: str
