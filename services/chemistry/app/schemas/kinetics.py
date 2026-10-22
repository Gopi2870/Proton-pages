"""
Pydantic Schemas for Chemical Reaction Kinetics and Dynamics API.
"""
from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field


class KineticsPointSchema(BaseModel):
    time_seconds: float
    concentration_m: float
    rate_m_s: float
    ln_conc: Optional[float] = None
    inv_conc: Optional[float] = None


class RateLawSimulationRequest(BaseModel):
    reaction_name: str = Field(default="Generic Reactant Decomposition")
    order: int = Field(..., ge=0, le=2, description="Reaction order (0 for zero-order, 1 for first-order, 2 for second-order)")
    initial_conc_m: float = Field(..., gt=0, le=10.0, description="Initial reactant concentration [A]0 in mol/L")
    rate_constant_k: float = Field(..., gt=0, description="Rate constant k with appropriate units")
    total_time_seconds: float = Field(default=100.0, gt=0, le=100000.0)
    time_steps: int = Field(default=50, ge=10, le=500)


class RateLawSimulationResponse(BaseModel):
    reaction_name: str
    order: int
    initial_conc_m: float
    rate_constant_k: float
    k_units: str
    half_life_seconds: float
    differential_rate_equation: str
    integrated_rate_equation: str
    time_series: List[KineticsPointSchema]
    notes: str


class ArrheniusTwoPointRequest(BaseModel):
    t1_c: float = Field(..., description="First temperature in Celsius")
    k1: float = Field(..., gt=0, description="Rate constant at T1")
    t2_c: float = Field(..., description="Second temperature in Celsius")
    k2: float = Field(..., gt=0, description="Rate constant at T2")
    target_t_c: Optional[float] = Field(default=None, description="Optional target temperature to predict k")


class ArrheniusResponse(BaseModel):
    activation_energy_j_mol: float
    activation_energy_kj_mol: float
    pre_exponential_factor_a: float
    target_temperature_c: Optional[float] = None
    predicted_k_at_target: Optional[float] = None
    equation: str
    temp_curve: List[Dict[str, float]]


class MichaelisMentenRequest(BaseModel):
    enzyme_name: str = Field(default="Catalase / Substrate Reaction")
    v_max: float = Field(..., gt=0, description="Maximum velocity Vmax in µM/s")
    k_m: float = Field(..., gt=0, description="Michaelis constant Km in µM")
    inhibition_type: Optional[str] = Field(default=None, pattern="^(competitive|noncompetitive|uncompetitive)$")
    inhibitor_conc_um: Optional[float] = Field(default=0.0, ge=0)
    k_i_um: Optional[float] = Field(default=1.0, gt=0)
    max_substrate_um: Optional[float] = Field(default=100.0, gt=0)
    steps: Optional[int] = Field(default=30, ge=10, le=100)


class MichaelisMentenPointSchema(BaseModel):
    substrate_conc_um: float
    velocity_um_s: float
    inv_substrate: float
    inv_velocity: float


class MichaelisMentenResponse(BaseModel):
    enzyme_name: str
    v_max: float
    k_m: float
    inhibition_type: Optional[str] = None
    inhibitor_conc_um: Optional[float] = None
    k_i_um: Optional[float] = None
    apparent_v_max: float
    apparent_k_m: float
    lineweaver_burk_slope: float
    lineweaver_burk_intercept: float
    saturation_points: List[MichaelisMentenPointSchema]


class ConsecutiveKineticsRequest(BaseModel):
    initial_a_m: float = Field(..., gt=0, le=5.0)
    k1: float = Field(..., gt=0)
    k2: float = Field(..., gt=0)
    total_time_seconds: float = Field(default=60.0, gt=0)
    steps: int = Field(default=60, ge=20, le=200)


class ConsecutiveKineticsPointSchema(BaseModel):
    time_seconds: float
    conc_a: float
    conc_b: float
    conc_c: float


class ConsecutiveKineticsResponse(BaseModel):
    initial_a_m: float
    k1: float
    k2: float
    t_max_intermediate_seconds: float
    max_intermediate_conc_m: float
    time_series: List[ConsecutiveKineticsPointSchema]
    description: str
