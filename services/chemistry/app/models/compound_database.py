"""
Domain models for Comprehensive Chemical Compounds & Spectral Reference Database (PR #050).
"""
from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class SpectralPeakUv(BaseModel):
    wavelength_nm: float
    extinction_coeff_m_cm: float
    electronic_transition: str  # e.g., "pi -> pi*", "n -> pi*"


class SpectralBandIr(BaseModel):
    wavenumber_cm1: float
    intensity: str  # "strong", "medium", "weak", "broad"
    vibrational_mode: str  # e.g., "C=O stretch", "O-H stretch", "C-H bend"


class SpectralShiftNmr1H(BaseModel):
    chemical_shift_ppm: float
    multiplicity: str  # "s", "d", "t", "q", "m", "dd"
    integration: int
    assignment: str


class SpectralShiftNmr13C(BaseModel):
    chemical_shift_ppm: float
    carbon_type: str  # "CH3", "CH2", "CH", "C_quat", "C=O", "aromatic"
    assignment: str


class DetailedCompound(BaseModel):
    id: str
    name: str
    iupac_name: str
    formula: str
    smiles: str
    inchi: Optional[str] = None
    inchi_key: Optional[str] = None
    cas_number: Optional[str] = None
    molecular_weight: float
    monoisotopic_mass: float
    category: str  # "Organic", "Inorganic", "Biochemical", "Pharmaceutical", "Organometallic"
    subcategory: str
    physical_state_at_25c: str  # "Solid", "Liquid", "Gas"
    melting_point_c: Optional[float] = None
    boiling_point_c: Optional[float] = None
    density_g_cm3: Optional[float] = None
    aqueous_solubility_g_l: Optional[float] = None
    log_p: Optional[float] = None
    pka_values: List[float] = Field(default_factory=list)
    delta_h_f_kj_mol: Optional[float] = None
    entropy_s_j_mol_k: Optional[float] = None
    heat_capacity_cp_j_mol_k: Optional[float] = None
    delta_g_f_kj_mol: Optional[float] = None
    uv_vis_peaks: List[SpectralPeakUv] = Field(default_factory=list)
    ir_bands: List[SpectralBandIr] = Field(default_factory=list)
    nmr_1h_shifts: List[SpectralShiftNmr1H] = Field(default_factory=list)
    nmr_13c_shifts: List[SpectralShiftNmr13C] = Field(default_factory=list)
    safety_ghs_pictograms: List[str] = Field(default_factory=list)
    hazard_statements: List[str] = Field(default_factory=list)
    description: str


class CompoundSearchFilter(BaseModel):
    query: Optional[str] = None
    category: Optional[str] = None
    min_mw: Optional[float] = None
    max_mw: Optional[float] = None
    min_log_p: Optional[float] = None
    max_log_p: Optional[float] = None
    has_uv: Optional[bool] = None
    has_ir: Optional[bool] = None
    has_nmr: Optional[bool] = None
    physical_state: Optional[str] = None
    limit: int = 50
    offset: int = 0


class CompoundSearchResult(BaseModel):
    total_matches: int
    compounds: List[DetailedCompound]
    query_time_ms: float
