"""
Domain models for Analytical Chromatography & Mass Spectrometry (PR #051).
Covers Quadrupole GC-MS, LC-MS ESI/EI, fragmentation mechanisms, isotope clusters, and Van Deemter hydrodynamics.
"""
from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class MassPeak(BaseModel):
    mz: float = Field(..., description="Mass-to-charge ratio")
    relative_intensity: float = Field(..., ge=0.0, le=100.0, description="Relative intensity normalized to base peak (100%)")
    fragment_formula: str = Field(..., description="Chemical formula of fragment ion")
    fragment_name: str = Field(..., description="Descriptive fragment name")
    mechanism: str = Field(..., description="Fragmentation mechanism (e.g., McLafferty, alpha-cleavage, tropylium, neutral loss)")
    is_molecular_ion: bool = Field(default=False, description="Flag indicating radical molecular ion M+.")


class IsotopePeak(BaseModel):
    mass: float = Field(..., description="Nominal or monoisotopic mass")
    relative_abundance: float = Field(..., description="Abundance relative to monoisotopic peak (100%)")
    isotopic_label: str = Field(..., description="Isotope designation (e.g., M, M+1, M+2)")


class ChromatographicPeak(BaseModel):
    analyte_name: str
    formula: str
    retention_time_min: float
    peak_width_min: float
    peak_area: float
    retention_factor_k: float
    base_mz: float


class VanDeemterPoint(BaseModel):
    linear_velocity_cm_s: float
    plate_height_h_um: float
    eddy_diffusion_a_um: float
    longitudinal_diffusion_b_um: float
    mass_transfer_c_um: float


class MsStandard(BaseModel):
    id: str
    name: str
    formula: str
    smiles: str
    molecular_weight: float
    monoisotopic_mass: float
    category: str  # "Hydrocarbon", "Carbonyl", "Aromatic", "Halogenated", "Pharmaceutical"
    ionization_mode: str  # "EI_70eV", "ESI_positive", "ESI_negative"
    base_peak_mz: float
    peaks: List[MassPeak]
    description: str
