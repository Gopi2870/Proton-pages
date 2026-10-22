"""Pydantic schemas for Colligative Properties & Non-Ideal Solution Chemistry API."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from app.models.colligative import (
    SolutionModelType,
    PressureUnit,
)


class SolventPropertiesSchema(BaseModel):
    name: str
    formula: str
    molar_mass_g_mol: float
    normal_boiling_point_c: float
    kb_c_kg_mol: float
    normal_freezing_point_c: float
    kf_c_kg_mol: float
    density_g_cm3: float
    description: str = ""


class SolutePropertiesSchema(BaseModel):
    name: str
    formula: str
    molar_mass_g_mol: float
    van_t_hoff_i: float
    is_electrolyte: bool
    cation_charge: Optional[int] = None
    anion_charge: Optional[int] = None
    cation_count: Optional[int] = None
    anion_count: Optional[int] = None


class VaporPressureRequest(BaseModel):
    solvent1_id: str = "ethanol"
    solvent2_id: str = "water"
    temperature_c: float = Field(default=25.0, ge=-50.0, le=200.0)
    x1_mole_fraction: float = Field(default=0.40, ge=0.0, le=1.0)
    non_ideal_parameter_a12: Optional[float] = Field(default=1.25, ge=-5.0, le=5.0)


class VlePointSchema(BaseModel):
    x1_liquid: float
    y1_vapor: float
    pressure_kpa: float
    pressure_mmhg: float
    activity_coeff_1: float
    activity_coeff_2: float


class VaporPressureResponse(BaseModel):
    solvent1_name: str
    solvent2_name: str
    temperature_c: float
    x1_mole_fraction: float
    x2_mole_fraction: float
    p1_pure_kpa: float
    p2_pure_kpa: float
    activity_coeff_1: float
    activity_coeff_2: float
    p1_partial_kpa: float
    p2_partial_kpa: float
    total_vapor_pressure_kpa: float
    total_vapor_pressure_mmhg: float
    y1_vapor_mole_fraction: float
    y2_vapor_mole_fraction: float
    azeotrope_detected: bool
    azeotrope_x1: Optional[float]
    model_type: SolutionModelType
    vle_curve: List[VlePointSchema]


class BoilingFreezingRequest(BaseModel):
    solvent_id: str = "water"
    solute_id: str = "nacl"
    solute_mass_g: float = Field(default=5.844, gt=0.0, le=1000.0)
    solvent_mass_g: float = Field(default=100.0, gt=0.0, le=10000.0)
    custom_van_t_hoff_i: Optional[float] = Field(default=None, ge=1.0, le=6.0)
    observed_delta_tf_c: Optional[float] = Field(default=None, ge=0.0, le=100.0)


class BoilingFreezingResponse(BaseModel):
    solvent_name: str
    solute_name: str
    solute_mass_g: float
    solvent_mass_g: float
    molality_m: float
    van_t_hoff_factor_i: float
    pure_boiling_point_c: float
    delta_tb_c: float
    solution_boiling_point_c: float
    pure_freezing_point_c: float
    delta_tf_c: float
    solution_freezing_point_c: float
    dilute_limit_exceeded: bool
    applicability_warning: Optional[str]
    estimated_molar_mass_g_mol: Optional[float]


class OsmoticPressureRequest(BaseModel):
    solute_name: str = "Bovine Serum Albumin (BSA)"
    temperature_c: float = Field(default=25.0, ge=-10.0, le=80.0)
    solute_mass_g: float = Field(default=10.0, gt=0.0, le=500.0)
    solution_volume_l: float = Field(default=1.0, gt=0.0, le=100.0)
    solute_molar_mass_g_mol: Optional[float] = Field(default=66500.0, gt=1.0)
    van_t_hoff_i: float = Field(default=1.0, ge=1.0, le=6.0)
    solvent_density_g_cm3: float = Field(default=0.997, gt=0.1, le=3.0)


class OsmoticPressureResponse(BaseModel):
    solute_name: str
    temperature_c: float
    molarity_m: float
    molality_m: float
    van_t_hoff_i: float
    osmotic_pressure_atm: float
    osmotic_pressure_bar: float
    osmotic_pressure_kpa: float
    osmotic_pressure_mmhg: float
    morse_corrected_pressure_atm: float
    is_isotonic_blood: bool
    tonicity_category: str
    macromolecule_mw_estimate: Optional[float]


class IonicStrengthRequest(BaseModel):
    electrolyte_id: str = "cacl2"
    molarity_m: float = Field(default=0.05, gt=0.0, le=5.0)
    temperature_c: float = Field(default=25.0, ge=0.0, le=100.0)
    ion_radius_angstrom: float = Field(default=3.0, ge=1.0, le=10.0)


class IonicStrengthPointSchema(BaseModel):
    concentration_m: float
    ionic_strength: float
    gamma_plus_minus: float


class IonicStrengthResponse(BaseModel):
    electrolyte_formula: str
    molarity_m: float
    ionic_strength_i: float
    cation_charge_z_plus: int
    anion_charge_z_minus: int
    dhll_gamma_plus_minus: float
    extended_dh_gamma_plus_minus: float
    davies_gamma_plus_minus: float
    selected_gamma: float
    regime_description: str
    validity_warning: Optional[str]
    activity_curve: List[IonicStrengthPointSchema]


class ColligativePresetSummary(BaseModel):
    id: str
    title: str
    category: str
    description: str
