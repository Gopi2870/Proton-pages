"""Domain models for Surface Chemistry, Heterogeneous Catalysis & Adsorption Isotherms (PR #041)."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class AdsorptionDataPoint(BaseModel):
    """An experimental or simulated gas physisorption data point."""
    relative_pressure: float = Field(..., ge=0.0, le=1.0, description="P / P0 (relative pressure)")
    volume_adsorbed_cm3_g: float = Field(..., ge=0.0, description="Volume adsorbed at STP (cm3/g)")
    pressure_kpa: Optional[float] = None


class AdsorbentMaterial(BaseModel):
    """Porous adsorbent material with physical characteristics and literature isotherm."""
    id: str
    name: str
    material_type: str = Field(..., description="'zeolite', 'activated_carbon', 'mof', 'mesoporous_silica', 'metal_oxide'")
    description: str
    literature_bet_surface_area_m2_g: float
    monolayer_volume_cm3_g: float
    c_constant: float
    isotherm_type: str = Field(..., description="IUPAC isotherm classification: 'Type I', 'Type II', 'Type IV'")
    sample_points: List[AdsorptionDataPoint]


class BetLinearFit(BaseModel):
    """Linear regression results for the BET equation within 0.05 <= P/P0 <= 0.35."""
    slope: float
    intercept: float
    r_squared: float
    monolayer_capacity_vm: float = Field(..., description="V_m in cm3(STP)/g")
    c_parameter: float = Field(..., description="BET C parameter exp((q1 - qL)/RT)")
    specific_surface_area_m2_g: float = Field(..., description="BET Specific Surface Area S_BET (m2/g)")
    is_c_positive: bool
    is_valid_bet_range: bool


class IsothermFitModel(BaseModel):
    """Fitted model coefficients and predictions for an adsorption isotherm."""
    model_name: str = Field(..., description="'Langmuir', 'Freundlich', or 'BET'")
    parameters: Dict[str, float]
    r_squared: float
    predicted_points: List[Dict[str, float]]
    equation_display: str


class CatalyticKineticsPoint(BaseModel):
    """Rate and coverage for heterogeneous catalytic mechanism."""
    partial_pressure_a_kpa: float
    rate_langmuir_hinshelwood: float
    rate_eley_rideal: float
    coverage_theta_a: float
    coverage_theta_b: float
    fraction_vacant_theta_v: float
