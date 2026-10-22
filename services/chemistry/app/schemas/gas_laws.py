"""
Pydantic Schemas for Gas Laws and Phase Equilibria API.
"""
from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field


class IdealGasCalculateRequest(BaseModel):
    pressure_atm: Optional[float] = Field(default=None, gt=0, description="Pressure in atm")
    volume_liters: Optional[float] = Field(default=None, gt=0, description="Volume in Liters")
    moles: Optional[float] = Field(default=None, gt=0, description="Amount of substance in moles")
    temperature_k: Optional[float] = Field(default=None, gt=0, description="Temperature in Kelvin")
    temperature_c: Optional[float] = Field(default=None, description="Temperature in Celsius (alternative to temperature_k)")
    molar_mass_g_mol: Optional[float] = Field(default=None, gt=0, description="Optional molar mass to compute gas density")


class IdealGasCalculateResponse(BaseModel):
    pressure_atm: float
    volume_liters: float
    moles: float
    temperature_k: float
    temperature_c: float
    molar_volume_l_mol: float
    density_g_l: Optional[float] = None
    equation: str
    notes: str


class VanDerWaalsPointSchema(BaseModel):
    volume_liters: float
    pressure_ideal_atm: float
    pressure_vdw_atm: float
    compressibility_z: float


class VanDerWaalsRequest(BaseModel):
    gas_id: str = Field(..., description="Gas ID (e.g., 'co2', 'n2', 'ch4', 'he', 'h2o', 'nh3')")
    moles: float = Field(default=1.0, gt=0, le=100.0)
    temperature_k: float = Field(default=298.15, gt=0, le=3000.0)
    current_volume_liters: float = Field(default=1.0, gt=0.01, le=100.0)
    min_volume_liters: Optional[float] = Field(default=0.1, gt=0.01)
    max_volume_liters: Optional[float] = Field(default=5.0, le=50.0)
    steps: Optional[int] = Field(default=40, ge=10, le=100)


class VanDerWaalsResponse(BaseModel):
    gas_id: str
    gas_name: str
    moles: float
    temperature_k: float
    vdw_a_l2_atm_mol2: float
    vdw_b_l_mol: float
    p_ideal_atm: float
    p_vdw_atm: float
    compressibility_z: float
    deviation_percent: float
    regime: str
    isotherm_points: List[VanDerWaalsPointSchema]
    notes: str


class SpeedDistributionPointSchema(BaseModel):
    speed_m_s: float
    probability_density: float


class MaxwellBoltzmannRequest(BaseModel):
    gas_name: str = Field(default="N2")
    molar_mass_g_mol: float = Field(..., gt=0, description="Molar mass in g/mol (e.g. 28.013 for N2, 4.003 for He)")
    temperature_k: float = Field(..., gt=0, le=3000.0, description="Temperature in Kelvin")
    max_speed_m_s: Optional[float] = Field(default=2000.0, gt=100.0)
    steps: Optional[int] = Field(default=50, ge=20, le=200)


class MaxwellBoltzmannResponse(BaseModel):
    gas_name: str
    molar_mass_g_mol: float
    temperature_k: float
    v_mp_m_s: float
    v_avg_m_s: float
    v_rms_m_s: float
    mean_kinetic_energy_j: float
    distribution_points: List[SpeedDistributionPointSchema]


class VaporPressurePointSchema(BaseModel):
    temperature_c: float
    temperature_k: float
    vapor_pressure_kpa: float
    vapor_pressure_atm: float


class PhaseEquilibriumRequest(BaseModel):
    substance_id: str = Field(..., description="Substance ID (e.g. 'water', 'ethanol', 'acetone', 'benzene')")


class PhaseEquilibriumResponse(BaseModel):
    substance_name: str
    formula: str
    normal_boiling_point_c: float
    delta_h_vap_kj_mol: float
    normal_melting_point_c: Optional[float] = None
    triple_point_t_c: Optional[float] = None
    triple_point_p_kpa: Optional[float] = None
    critical_point_t_c: Optional[float] = None
    critical_point_p_mpa: Optional[float] = None
    vapor_pressure_curve: List[VaporPressurePointSchema]


class RealGasConstantsSchema(BaseModel):
    id: str
    name: str
    formula: str
    molar_mass_g_mol: float
    vdw_a_l2_atm_mol2: float
    vdw_b_l_mol: float
    t_c_k: float
    p_c_atm: float
