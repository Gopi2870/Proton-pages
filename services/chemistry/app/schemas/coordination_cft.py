"""Pydantic schemas for Coordination Chemistry & Crystal Field Theory (CFT)."""

from typing import List, Optional
from pydantic import BaseModel, Field


class MetalIonSummary(BaseModel):
    symbol: str
    name: str
    atomic_number: int
    group: int
    period: int
    oxidation_state: int
    d_electron_count: int


class LigandSummary(BaseModel):
    id: str
    formula: str
    name: str
    denticity: int
    donor_atom: str
    spectrochemical_rank: int
    field_strength: str


class OrbitalLevelSchema(BaseModel):
    label: str
    orbitals: List[str]
    energy_delta: float
    energy_cm_inv: float
    degeneracy: int
    electron_count: int
    unpaired_electrons: int


class CoordinationAnalysisRequest(BaseModel):
    metal_symbol: str = Field("Fe", description="Metal element symbol (e.g. Fe, Co, Ni, Cu)")
    oxidation_state: int = Field(2, ge=1, le=4, description="Metal oxidation state")
    ligand_id: str = Field("h2o", description="Ligand identifier from spectrochemical series")
    geometry: str = Field("octahedral", description="'octahedral', 'tetrahedral', or 'square_planar'")
    forced_spin_state: Optional[str] = Field(None, description="Optional override: 'high_spin' or 'low_spin'")


class CoordinationAnalysisResponse(BaseModel):
    formula: str
    name: str
    metal: MetalIonSummary
    ligand: LigandSummary
    coordination_number: int
    geometry: str
    delta_cm_inv: float
    pairing_energy_cm_inv: float
    spin_state: str
    orbital_levels: List[OrbitalLevelSchema]
    cfse_delta_units: float
    cfse_kj_mol: float
    unpaired_electrons: int
    magnetic_moment_bm: float
    is_paramagnetic: bool
    jahn_teller_distortion: str
    absorption_wavelength_nm: Optional[float] = None
    perceived_color_name: str
    perceived_color_hex: str
    pedagogical_notes: str


class ComplexPresetSummary(BaseModel):
    id: str
    formula: str
    name: str
    geometry: str
    spin_state: str
    d_electron_count: int
    unpaired_electrons: int
    perceived_color_hex: str
    description: str
