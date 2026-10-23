"""
Pydantic schemas for Analytical Chromatography & Mass Spectrometry API (PR #051).
"""
from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from app.models.mass_spectrometry import (
    MassPeak,
    IsotopePeak,
    ChromatographicPeak,
    VanDeemterPoint,
    MsStandard,
)


class MsSimulationRequest(BaseModel):
    standard_id: Optional[str] = Field(default="butylbenzene", description="Preset standard ID or custom formula")
    custom_formula: Optional[str] = Field(default=None, description="Custom elemental formula (e.g. C10H14, C7H7Cl)")
    ionization_mode: str = Field(default="EI_70eV", description="EI_70eV or ESI_positive")
    electron_energy_ev: float = Field(default=70.0, ge=10.0, le=100.0)


class MsSimulationResponse(BaseModel):
    analyte_name: str
    formula: str
    exact_mass: float
    base_peak_mz: float
    molecular_ion_mz: float
    molecular_ion_stability: str  # "high", "moderate", "fragile / absent"
    spectrum: List[MassPeak]
    diagnostic_neutral_losses: List[str]


class IsotopeEnvelopeRequest(BaseModel):
    formula: str = Field(default="C7H7Cl", description="Chemical formula to compute isotope distribution")
    charge: int = Field(default=1, ge=1, le=5)
    resolution: float = Field(default=10000.0, ge=500.0, le=100000.0)


class IsotopeEnvelopeResponse(BaseModel):
    formula: str
    monoisotopic_mass: float
    m_plus_1_expected_pct: float
    m_plus_2_expected_pct: float
    peaks: List[IsotopePeak]
    pattern_signature: str  # "Characteristic Chlorine 3:1 pattern", "Characteristic Bromine 1:1 pattern", "Standard Carbon-13 envelope"


class VanDeemterRequest(BaseModel):
    particle_diameter_um: float = Field(default=3.5, ge=1.0, le=10.0, description="Stationary phase particle size d_p")
    column_length_mm: float = Field(default=150.0, ge=30.0, le=300.0)
    diffusion_coeff_cm2_s: float = Field(default=1e-5, ge=1e-7, le=1e-3)
    retention_factor_k: float = Field(default=3.0, ge=0.1, le=20.0)
    velocities_cm_s: Optional[List[float]] = None


class VanDeemterResponse(BaseModel):
    a_term_um: float
    b_term_cm2_s: float
    c_term_s: float
    optimum_velocity_cm_s: float
    minimum_plate_height_um: float
    maximum_theoretical_plates: int
    curve: List[VanDeemterPoint]


class ChromatogramSimulationRequest(BaseModel):
    analyte_ids: List[str] = Field(default=["benzene", "toluene", "ethylbenzene", "butylbenzene"])
    column_length_mm: float = Field(default=150.0, ge=50.0, le=300.0)
    flow_rate_ml_min: float = Field(default=1.0, ge=0.1, le=5.0)
    temperature_c: float = Field(default=120.0, ge=30.0, le=320.0)
    stationary_phase_polarity: str = Field(default="non_polar_db5", description="non_polar_db5, mid_polar_wax, or c18_reversed_phase")


class ChromatogramSimulationResponse(BaseModel):
    dead_time_t0_min: float
    total_run_time_min: float
    peaks: List[ChromatographicPeak]
    resolution_pairs: Dict[str, float]  # e.g. "benzene/toluene": 2.45
