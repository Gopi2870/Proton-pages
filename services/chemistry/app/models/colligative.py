"""Data models for Colligative Properties & Non-Ideal Solution Chemistry.

Covers Raoult's law vapor pressure, boiling point elevation (ebullioscopy),
freezing point depression (cryoscopy), osmotic pressure, and Debye-Hückel
ionic strength / activity coefficient calculations.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Optional


class SolutionModelType(str, Enum):
    IDEAL_RAOULT = "ideal_raoult"
    MARGULES_TWO_SUFFIX = "margules_two_suffix"
    VAN_T_HOFF_COLLIGATIVE = "van_t_hoff_colligative"
    DEBYE_HUCKEL_LIMITING = "debye_huckel_limiting"
    EXTENDED_DEBYE_HUCKEL = "extended_debye_huckel"
    DAVIES_EQUATION = "davies_equation"


class PressureUnit(str, Enum):
    ATM = "atm"
    BAR = "bar"
    KPA = "kPa"
    MMHG = "mmHg"
    TORR = "Torr"
    PSI = "psi"


@dataclass
class SolventProperties:
    name: str
    formula: str
    molar_mass_g_mol: float
    normal_boiling_point_c: float
    kb_c_kg_mol: float  # ebullioscopic constant
    normal_freezing_point_c: float
    kf_c_kg_mol: float  # cryoscopic constant
    density_g_cm3: float  # at 20-25 C
    antoine_a: float  # log10(P/mmHg) = A - B/(T_C + C)
    antoine_b: float
    antoine_c: float
    description: str = ""


@dataclass
class SoluteProperties:
    name: str
    formula: str
    molar_mass_g_mol: float
    van_t_hoff_i: float  # theoretical dissociation count
    is_electrolyte: bool
    cation_charge: Optional[int] = None
    anion_charge: Optional[int] = None
    cation_count: Optional[int] = None
    anion_count: Optional[int] = None


@dataclass
class VlePoint:
    x1_liquid: float
    y1_vapor: float
    pressure_kpa: float
    pressure_mmhg: float
    activity_coeff_1: float
    activity_coeff_2: float


@dataclass
class VaporPressureAnalysis:
    solvent1_name: str
    solvent2_name: str
    temperature_c: number if False else float
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
    vle_curve: List[VlePoint] = field(default_factory=list)


@dataclass
class BoilingFreezingAnalysis:
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
    estimated_molar_mass_g_mol: Optional[float] = None


@dataclass
class OsmoticPressureAnalysis:
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
    tonicity_category: str  # hypotonic, isotonic, hypertonic
    macromolecule_mw_estimate: Optional[float] = None


@dataclass
class IonicStrengthPoint:
    concentration_m: float
    ionic_strength: float
    gamma_plus_minus: float


@dataclass
class IonicStrengthActivityAnalysis:
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
    activity_curve: List[IonicStrengthPoint] = field(default_factory=list)
