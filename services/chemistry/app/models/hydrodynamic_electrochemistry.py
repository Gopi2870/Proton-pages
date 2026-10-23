"""
Domain models for Hydrodynamic Electrochemistry, Rotating Disk Electrode (RDE),
Rotating Ring-Disk Electrode (RRDE), and Anodic Stripping Voltammetry (ASV).
"""
from enum import Enum
from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class ElectrodeType(str, Enum):
    GLASSY_CARBON = "glassy_carbon"
    PLATINUM_DISK = "platinum_disk"
    GOLD_DISK = "gold_disk"
    MERCURY_FILM = "mercury_film"
    BISMUTH_FILM = "bismuth_film"
    BORON_DOPED_DIAMOND = "boron_doped_diamond"


class StrippingMode(str, Enum):
    LINEAR_SWEEP = "linear_sweep"
    DIFFERENTIAL_PULSE = "differential_pulse"
    SQUARE_WAVE = "square_wave"


class RdeHydrodynamicPoint(BaseModel):
    rotation_speed_rpm: float
    angular_velocity_rad_s: float
    sqrt_angular_velocity: float
    limiting_current_ua: float
    hydrodynamic_boundary_layer_um: float
    kinetic_current_ua: Optional[float] = None


class KouteckyLevichPoint(BaseModel):
    inv_sqrt_omega: float
    inv_current_ua: float


class StrippingPeak(BaseModel):
    metal_ion: str
    symbol: str
    peak_potential_v: float
    peak_current_ua: float
    fwhm_mv: float
    concentration_ppb: float
    detection_limit_ppb: float


class VoltammogramWavePoint(BaseModel):
    potential_v: float
    current_disk_ua: float
    current_ring_ua: Optional[float] = None


class RdeSimulationResult(BaseModel):
    system_name: str
    electrode_type: ElectrodeType
    electrode_area_cm2: float
    diffusion_coefficient_cm2_s: float
    kinematic_viscosity_cm2_s: float
    concentration_mm: float
    n_electrons: int
    levich_slope_ua_s_half: float
    levich_points: List[RdeHydrodynamicPoint]
    koutecky_levich_points: List[KouteckyLevichPoint]
    heterogeneous_rate_constant_k0_cm_s: float
    rrde_collection_efficiency_theoretical: float
    polarization_waves: List[Dict[str, List[VoltammogramWavePoint]]]


class StrippingVoltammetryResult(BaseModel):
    analyte_name: str
    deposition_potential_v: float
    deposition_time_s: float
    stripping_mode: StrippingMode
    peaks_detected: List[StrippingPeak]
    stripping_curve: List[Dict[str, float]]
    preconcentration_factor: float
    pedagogical_insights: str


class ChronocoulometryResult(BaseModel):
    system_name: str
    double_layer_charge_uc: float
    surface_excess_gamma_mol_cm2: float
    diffusion_coefficient_cm2_s: float
    anson_slope_uc_s_half: float
    anson_points: List[Dict[str, float]]
