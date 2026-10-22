"""Pydantic schemas for Phase Equilibria & Ternary Liquid-Liquid Extraction (LLE)."""

from typing import List, Optional, Tuple
from pydantic import BaseModel, Field


class TernaryPointSchema(BaseModel):
    x_a: float = Field(..., ge=0.0, le=1.0, description="Carrier mass fraction")
    x_b: float = Field(..., ge=0.0, le=1.0, description="Solvent mass fraction")
    x_c: float = Field(..., ge=0.0, le=1.0, description="Solute mass fraction")
    cartesian_x: float = Field(..., description="Equilateral X in [0, 1]")
    cartesian_y: float = Field(..., description="Equilateral Y in [0, sqrt(3)/2]")
    label: Optional[str] = None


class TieLineSchema(BaseModel):
    id: str
    raffinate: TernaryPointSchema
    extract: TernaryPointSchema
    distribution_coefficient: float
    selectivity: float


class CorrelationResultSchema(BaseModel):
    slope: float
    intercept: float
    r_squared: float
    is_consistent: bool
    formula_latex: str
    data_points: List[Tuple[float, float]] = []


class ExtractionStageSchema(BaseModel):
    stage_number: int
    extract: TernaryPointSchema
    raffinate: TernaryPointSchema
    solute_recovery_percent: float


class TernarySystemSummary(BaseModel):
    id: str
    name: str
    carrier_name: str
    solvent_name: str
    solute_name: str
    temperature_k: float
    description: str


class TernarySystemDetailResponse(BaseModel):
    id: str
    name: str
    carrier_name: str
    solvent_name: str
    solute_name: str
    temperature_k: float
    pressure_kpa: float
    plait_point: TernaryPointSchema
    binodal_curve: List[TernaryPointSchema]
    tie_lines: List[TieLineSchema]
    hand_correlation: CorrelationResultSchema
    othmer_tobias_correlation: CorrelationResultSchema
    description: str


class HunterNashSimulationRequest(BaseModel):
    system_id: str = Field("water_toluene_acetic_acid", description="System identifier")
    feed_rate_kg_h: float = Field(1000.0, gt=0.0, description="Feed mass flow rate (kg/h)")
    feed_x_carrier: float = Field(0.70, ge=0.0, le=1.0, description="Feed carrier mass fraction")
    feed_x_solvent: float = Field(0.00, ge=0.0, le=1.0, description="Feed solvent mass fraction")
    feed_x_solute: float = Field(0.30, ge=0.0, le=1.0, description="Feed solute mass fraction")
    solvent_rate_kg_h: float = Field(1200.0, gt=0.0, description="Solvent mass flow rate (kg/h)")
    solvent_x_carrier: float = Field(0.00, ge=0.0, le=1.0, description="Solvent carrier mass fraction")
    solvent_x_solvent: float = Field(1.00, ge=0.0, le=1.0, description="Solvent solvent mass fraction")
    solvent_x_solute: float = Field(0.00, ge=0.0, le=1.0, description="Solvent solute mass fraction")
    target_raffinate_solute_fraction: float = Field(0.05, gt=0.0, lt=1.0, description="Target solute fraction in exiting raffinate")
    max_stages: int = Field(15, ge=1, le=30, description="Maximum number of theoretical stages to step")


class HunterNashSimulationResponse(BaseModel):
    system_id: str
    system_name: str
    feed_point: TernaryPointSchema
    solvent_point: TernaryPointSchema
    mixture_point: TernaryPointSchema
    is_in_two_phase_region: bool
    operating_point_delta: Optional[Tuple[float, float]] = None
    minimum_solvent_ratio: float
    actual_solvent_ratio: float
    is_solvent_sufficient: bool
    theoretical_stages_count: int
    stages: List[ExtractionStageSchema]
    final_extract: TernaryPointSchema
    final_raffinate: TernaryPointSchema
    solute_recovery_percent: float
    extract_rate_kg_h: float
    raffinate_rate_kg_h: float
    hand_correlation: CorrelationResultSchema
    othmer_tobias_correlation: CorrelationResultSchema
    pedagogical_summary: str
