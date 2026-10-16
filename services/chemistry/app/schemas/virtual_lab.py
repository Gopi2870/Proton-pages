"""
Pydantic Schemas for Virtual Chemistry Laboratory Workflows.
"""
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class TitrationSimulateRequest(BaseModel):
    system_type: str = Field("strong_acid_strong_base", description="Chemical system: strong_acid_strong_base, weak_acid_strong_base, strong_acid_weak_base")
    analyte_volume_ml: float = Field(25.0, ge=1.0, le=500.0, description="Volume of analyte in mL")
    analyte_conc_m: float = Field(0.1, gt=0.0, le=10.0, description="Concentration of analyte in M")
    titrant_conc_m: float = Field(0.1, gt=0.0, le=10.0, description="Concentration of titrant in M")
    max_titrant_volume_ml: float = Field(50.0, ge=5.0, le=100.0, description="Maximum burette volume in mL")
    volume_step_ml: float = Field(0.5, ge=0.05, le=5.0, description="Sampling volume increment")
    indicator: str = Field("Phenolphthalein", description="Visual indicator name")

    model_config = {
        "json_schema_extra": {
            "example": {
                "system_type": "weak_acid_strong_base",
                "analyte_volume_ml": 25.0,
                "analyte_conc_m": 0.1,
                "titrant_conc_m": 0.1,
                "indicator": "Phenolphthalein"
            }
        }
    }


class TitrationPointResponse(BaseModel):
    volume_ml: float
    ph: float
    dp_h_dv: float
    conductivity_ms_cm: float
    temperature_c: float
    indicator_color: str


class TitrationSimulateResponse(BaseModel):
    system_type: str
    analyte_name: str
    analyte_formula: str
    analyte_volume_ml: float
    analyte_conc_m: float
    titrant_name: str
    titrant_formula: str
    titrant_conc_m: float
    equivalence_volume_ml: float
    equivalence_ph: float
    half_equivalence_volume_ml: Optional[float] = None
    pka: Optional[float] = None
    indicator: str
    curve_points: List[TitrationPointResponse]
    indicator_transitions: List[Dict[str, str]]


class CalorimetrySimulateRequest(BaseModel):
    calorimeter_type: str = Field("solution_coffee_cup", description="'solution_coffee_cup' or 'constant_volume_bomb'")
    sample_key: str = Field("nh4no3", description="Sample key: nh4no3, cacl2, naoh, nacl, kno3, benzoic_acid, sucrose, naphthalene")
    sample_mass_g: float = Field(5.0, gt=0.01, le=500.0, description="Mass of sample in grams")
    water_mass_g: float = Field(100.0, ge=10.0, le=2000.0, description="Mass of water in grams")
    initial_temp_c: float = Field(25.0, ge=0.0, le=95.0, description="Initial temperature in °C")
    calorimeter_c_j_k: float = Field(25.0, ge=0.0, le=50000.0, description="Heat capacity of calorimeter (J/K)")
    ambient_temp_c: float = Field(25.0, ge=0.0, le=45.0, description="Ambient temperature in °C")

    model_config = {
        "json_schema_extra": {
            "example": {
                "calorimeter_type": "solution_coffee_cup",
                "sample_key": "cacl2",
                "sample_mass_g": 5.0,
                "water_mass_g": 100.0,
                "initial_temp_c": 25.0
            }
        }
    }


class CalorimetryPointResponse(BaseModel):
    time_seconds: float
    temperature_c: float


class CalorimetrySimulateResponse(BaseModel):
    calorimeter_type: str
    sample_name: str
    sample_formula: str
    sample_mass_g: float
    sample_moles: float
    water_mass_g: float
    calorimeter_c_j_k: float
    initial_temp_c: float
    peak_temp_c: float
    delta_t_c: float
    heat_transferred_joules: float
    molar_enthalpy_kj_mol: float
    theoretical_enthalpy_kj_mol: float
    percent_error: float
    is_exothermic: bool
    temperature_curve: List[CalorimetryPointResponse]
    reaction_equation: str
    analysis_notes: str
