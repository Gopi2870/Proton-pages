"""
Virtual Laboratory Domain Models for Titration and Calorimetry.
"""
from dataclasses import dataclass, field
from typing import Dict, List, Optional


@dataclass
class TitrationCurvePoint:
    """Individual simulated point along the titration curve."""
    volume_ml: float
    ph: float
    dp_h_dv: float  # First derivative dpH/dV (inflection indicator)
    conductivity_ms_cm: float
    temperature_c: float
    indicator_color: str


@dataclass
class TitrationAnalysisResult:
    """Rigorous analytical titration output for acid-base systems."""
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
    half_equivalence_volume_ml: Optional[float]
    pka: Optional[float]
    indicator: str
    curve_points: List[TitrationCurvePoint] = field(default_factory=list)
    indicator_transitions: List[Dict[str, str]] = field(default_factory=list)


@dataclass
class CalorimetryPoint:
    """Time-series thermal measurement point."""
    time_seconds: float
    temperature_c: float


@dataclass
class CalorimetrySimulationResult:
    """Analytical output from coffee-cup or bomb calorimetry experiment."""
    calorimeter_type: str  # 'solution_coffee_cup' or 'constant_volume_bomb'
    sample_name: str
    sample_formula: str
    sample_mass_g: float
    sample_moles: float
    water_mass_g: float
    calorimeter_c_j_k: float  # Heat capacity of calorimeter assembly (J/K)
    initial_temp_c: float
    peak_temp_c: float
    delta_t_c: float
    heat_transferred_joules: float
    molar_enthalpy_kj_mol: float
    theoretical_enthalpy_kj_mol: float
    percent_error: float
    is_exothermic: bool
    temperature_curve: List[CalorimetryPoint] = field(default_factory=list)
    reaction_equation: str = ""
    analysis_notes: str = ""
