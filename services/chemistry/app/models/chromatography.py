"""Data models for Analytical Chromatography & Separation Science.

Models High-Performance Liquid Chromatography (HPLC) and Gas Chromatography (GC)
including van Deemter efficiency dynamics, plate theory, retention factors,
and peak resolution.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import List, Optional


class ChromatographyModality(str, Enum):
    HPLC = "hplc"
    GC = "gc"


class ElutionMode(str, Enum):
    ISOCRATIC = "isocratic"
    GRADIENT = "gradient"
    ISOTHERMAL = "isothermal"
    TEMPERATURE_PROGRAMMED = "temperature_programmed"


class DetectorType(str, Enum):
    UV_DAD = "uv_dad"
    FID = "fid"
    REFRACTIVE_INDEX = "rid"


class StationaryPhaseType(str, Enum):
    # HPLC columns
    C18_OCTADECYL = "c18_octadecyl"
    C8_OCTYL = "c8_octyl"
    PHENYL_HEXYL = "phenyl_hexyl"
    SILICA_NORMAL = "silica_normal"
    # GC columns
    DB_1_DIMETHYL = "db_1_100_dimethyl"
    DB_5_PHENYL = "db_5_5_phenyl"
    WAX_PEG = "wax_polyethylene_glycol"


@dataclass
class ColumnParameters:
    name: str
    length_mm: float
    inner_diameter_mm: float
    particle_size_um: float = 3.5  # for HPLC packed columns
    film_thickness_um: float = 0.25  # for GC capillary columns
    stationary_phase: StationaryPhaseType = StationaryPhaseType.C18_OCTADECYL
    void_volume_ml: float = 1.0


@dataclass
class MobilePhaseConditions:
    flow_rate_ml_min: float = 1.0
    modality: ChromatographyModality = ChromatographyModality.HPLC
    elution_mode: ElutionMode = ElutionMode.ISOCRATIC
    solvent_a_name: str = "Water (0.1% Formic Acid)"
    solvent_b_name: str = "Acetonitrile"
    organic_percent: float = 50.0  # isocratic %B
    gradient_start_percent: float = 10.0
    gradient_end_percent: float = 90.0
    gradient_time_min: float = 15.0
    temperature_c: float = 30.0
    temp_ramp_rate_c_min: float = 10.0  # for GC ramp
    final_temperature_c: float = 250.0
    carrier_gas: str = "Helium"  # He, N2, H2 for GC


@dataclass
class VanDeemterParameters:
    term_a_um: float  # Eddy diffusion: 2 * lambda * dp
    term_b_um_mm_s: float  # Longitudinal diffusion: 2 * gamma * Dm
    term_c_s: float  # Mass transfer resistance: Cs + Cm
    optimal_velocity_mm_s: float
    minimum_plate_height_um: float
    tested_velocity_mm_s: float
    operating_plate_height_um: float


@dataclass
class AnalytePeak:
    compound_id: str
    compound_name: str
    chemical_formula: str
    molecular_weight: float
    retention_time_min: float
    retention_factor_k: float  # k' = (tr - t0) / t0
    theoretical_plates_n: int  # N = 16 * (tr / W)^2
    peak_width_base_min: float  # W = 4 * sigma
    peak_width_half_min: float  # W_1/2 = 2.355 * sigma
    peak_height_mau: float
    peak_area_mau_s: float
    tailing_factor: float  # Tf = (a + b) / 2a (USP standard: 1.0 = symmetric)
    resolution_with_previous: Optional[float] = None  # Rs with preceding peak
    selectivity_with_previous: Optional[float] = None  # alpha = k2 / k1


@dataclass
class ChromatogramDataPoint:
    time_min: float
    signal_intensity: float  # mAU for DAD, pA for FID


@dataclass
class ChromatographySimulationResult:
    simulation_id: str
    sample_name: str
    modality: ChromatographyModality
    elution_mode: ElutionMode
    detector: DetectorType
    run_time_min: float
    dead_time_t0_min: float
    column: ColumnParameters
    conditions: MobilePhaseConditions
    van_deemter: VanDeemterParameters
    peaks: List[AnalytePeak] = field(default_factory=list)
    chromatogram_trace: List[ChromatogramDataPoint] = field(default_factory=list)
    mean_theoretical_plates: int = 0
    minimum_resolution: float = 0.0
    separation_quality: str = "baseline_resolved"  # baseline_resolved, partial_overlap, co_eluting
    pedagogical_notes: str = ""
