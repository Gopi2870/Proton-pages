"""Pydantic schemas for Analytical Chromatography & Separation Science endpoints."""

from typing import List, Optional
from pydantic import BaseModel, Field
from app.models.chromatography import (
    ChromatographyModality,
    ElutionMode,
    DetectorType,
    StationaryPhaseType,
)


class ColumnParametersSchema(BaseModel):
    name: str = "Eclipse Plus C18"
    length_mm: float = Field(default=150.0, ge=10.0, le=1000.0)
    inner_diameter_mm: float = Field(default=4.6, ge=0.05, le=50.0)
    particle_size_um: float = Field(default=3.5, ge=1.0, le=50.0)
    film_thickness_um: float = Field(default=0.25, ge=0.05, le=10.0)
    stationary_phase: StationaryPhaseType = StationaryPhaseType.C18_OCTADECYL
    void_volume_ml: float = Field(default=1.5, ge=0.01, le=50.0)


class MobilePhaseConditionsSchema(BaseModel):
    flow_rate_ml_min: float = Field(default=1.0, ge=0.05, le=20.0)
    modality: ChromatographyModality = ChromatographyModality.HPLC
    elution_mode: ElutionMode = ElutionMode.ISOCRATIC
    solvent_a_name: str = "Water (0.1% Formic Acid)"
    solvent_b_name: str = "Acetonitrile"
    organic_percent: float = Field(default=45.0, ge=0.0, le=100.0)
    gradient_start_percent: float = Field(default=10.0, ge=0.0, le=100.0)
    gradient_end_percent: float = Field(default=90.0, ge=0.0, le=100.0)
    gradient_time_min: float = Field(default=12.0, ge=1.0, le=120.0)
    temperature_c: float = Field(default=30.0, ge=5.0, le=350.0)
    temp_ramp_rate_c_min: float = Field(default=10.0, ge=0.5, le=50.0)
    final_temperature_c: float = Field(default=250.0, ge=30.0, le=450.0)
    carrier_gas: str = "Helium"


class AnalyteCompoundInput(BaseModel):
    compound_id: str
    compound_name: str
    chemical_formula: str
    molecular_weight: float
    log_kow: float  # Octanol-water partition coefficient
    boiling_point_c: Optional[float] = None
    concentration_mg_l: float = Field(default=50.0, ge=0.1, le=5000.0)


class ChromatographySimulationRequest(BaseModel):
    sample_name: str = "Custom Separation Mixture"
    modality: ChromatographyModality = ChromatographyModality.HPLC
    detector: DetectorType = DetectorType.UV_DAD
    column: ColumnParametersSchema
    conditions: MobilePhaseConditionsSchema
    analytes: List[AnalyteCompoundInput]


class AnalytePeakResponse(BaseModel):
    compound_id: str
    compound_name: str
    chemical_formula: str
    molecular_weight: float
    retention_time_min: float
    retention_factor_k: float
    theoretical_plates_n: int
    peak_width_base_min: float
    peak_width_half_min: float
    peak_height_mau: float
    peak_area_mau_s: float
    tailing_factor: float
    resolution_with_previous: Optional[float] = None
    selectivity_with_previous: Optional[float] = None


class VanDeemterResponse(BaseModel):
    term_a_um: float
    term_b_um_mm_s: float
    term_c_s: float
    optimal_velocity_mm_s: float
    minimum_plate_height_um: float
    tested_velocity_mm_s: float
    operating_plate_height_um: float


class ChromatogramPointResponse(BaseModel):
    time_min: float
    signal_intensity: float


class ChromatographySimulationResponse(BaseModel):
    simulation_id: str
    sample_name: str
    modality: ChromatographyModality
    elution_mode: ElutionMode
    detector: DetectorType
    run_time_min: float
    dead_time_t0_min: float
    column: ColumnParametersSchema
    conditions: MobilePhaseConditionsSchema
    van_deemter: VanDeemterResponse
    peaks: List[AnalytePeakResponse]
    chromatogram_trace: List[ChromatogramPointResponse]
    mean_theoretical_plates: int
    minimum_resolution: float
    separation_quality: str
    pedagogical_notes: str


class ChromatographyPresetSummary(BaseModel):
    id: str
    name: str
    modality: ChromatographyModality
    elution_mode: ElutionMode
    target_compounds: List[str]
    description: str
    recommended_column: str
    recommended_conditions: str
