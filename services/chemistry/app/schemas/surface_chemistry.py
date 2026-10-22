"""Pydantic schemas for Surface Chemistry, Heterogeneous Catalysis & Adsorption (PR #041)."""

from typing import Any, Dict, List, Optional, Union
from pydantic import BaseModel, Field
from app.models.surface_chemistry import AdsorptionDataPoint, BetLinearFit, IsothermFitModel, CatalyticKineticsPoint


class MaterialSummary(BaseModel):
    id: str
    name: str
    material_type: str
    description: str
    isotherm_type: str
    literature_bet_surface_area_m2_g: float


class BetCalculationRequest(BaseModel):
    model_config = {"arbitrary_types_allowed": True}

    material_id: Optional[str] = Field("mcm_41", description="Preset material ID or None for custom data")
    sample_points: Optional[List[Union[AdsorptionDataPoint, Dict[str, Any]]]] = None
    sample_mass_g: float = Field(1.0, gt=0.0, description="Mass of outgassed dry sample (g)")
    adsorbate_cross_section_nm2: float = Field(0.162, gt=0.0, description="N2 molecule cross section (0.162 nm2 at 77.35 K)")
    p0_saturation_kpa: float = Field(101.325, gt=0.0, description="Saturation vapor pressure P0 (kPa)")


class BetCalculationResponse(BaseModel):
    material_name: str
    isotherm_type: str
    sample_mass_g: float
    bet_fit: BetLinearFit
    linear_plot_points: List[Dict[str, float]]
    pedagogical_summary: str


class IsothermComparisonRequest(BaseModel):
    model_config = {"arbitrary_types_allowed": True}

    material_id: Optional[str] = Field("mcm_41", description="Preset material ID or custom")
    custom_points: Optional[List[Union[AdsorptionDataPoint, Dict[str, Any]]]] = None


class IsothermComparisonResponse(BaseModel):
    material_name: str
    experimental_points: List[Dict[str, float]]
    langmuir_fit: IsothermFitModel
    freundlich_fit: IsothermFitModel
    bet_fit: IsothermFitModel
    best_fitting_model: str


class CatalysisSimulationRequest(BaseModel):
    mechanism: str = Field("both", description="'langmuir_hinshelwood', 'eley_rideal', or 'both'")
    rate_constant_k: float = Field(1.5e-3, gt=0.0, description="Surface reaction rate constant")
    adsorption_constant_ka: float = Field(0.08, gt=0.0, description="Adsorption equilibrium constant for reactant A (kPa^-1)")
    adsorption_constant_kb: float = Field(0.02, gt=0.0, description="Adsorption equilibrium constant for reactant B (kPa^-1)")
    fixed_partial_pressure_b_kpa: float = Field(20.0, gt=0.0, description="Fixed partial pressure of coreactant B (kPa)")
    max_pressure_a_kpa: float = Field(100.0, gt=0.0, description="Upper bound for sweeping P_A (kPa)")
    points_count: int = Field(50, ge=10, le=200)


class CatalysisSimulationResponse(BaseModel):
    kinetics_curve: List[CatalyticKineticsPoint]
    lh_peak_pressure_a_kpa: Optional[float]
    lh_maximum_rate: Optional[float]
    summary: str
