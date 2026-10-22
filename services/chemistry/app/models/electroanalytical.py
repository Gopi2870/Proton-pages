"""Data models for Advanced Electroanalytical Chemistry & Cyclic Voltammetry (PR #037).

Implements Randles-Sevcik peak current, Butler-Volmer electron transfer kinetics,
Nicholson reversibility criteria, and Cottrell chronoamperometry.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Optional


class ElectrochemicalReversibility(str, Enum):
    REVERSIBLE = "reversible"
    QUASI_REVERSIBLE = "quasi_reversible"
    IRREVERSIBLE = "irreversible"


class ReferenceElectrode(str, Enum):
    SHE = "SHE"
    SCE = "SCE"  # Saturated Calomel (+0.241 V vs SHE)
    AG_AGCL = "Ag/AgCl"  # 3M KCl (+0.210 V vs SHE)


@dataclass
class VoltammogramPoint:
    potential_v: float
    current_ua: float
    current_faradaic_ua: float
    current_capacitive_ua: float
    scan_direction: str  # "forward" or "reverse"
    time_s: float


@dataclass
class ChronoamperometryPoint:
    time_s: float
    current_ua: float
    inv_sqrt_time: float


@dataclass
class CyclicVoltammetryResult:
    system_name: str
    reversibility: ElectrochemicalReversibility
    n_electrons: int
    e_half_v: float
    e_peak_anodic_v: float
    e_peak_cathodic_v: Optional[float]
    delta_ep_mv: Optional[float]
    peak_current_anodic_ua: float
    peak_current_cathodic_ua: Optional[float]
    current_ratio: Optional[float]
    scan_rate_v_s: float
    diffusion_coefficient_cm2_s: float
    electrode_area_cm2: float
    concentration_mm: float
    standard_rate_constant_k0_cm_s: float
    transfer_coefficient_alpha: float
    voltammogram: List[VoltammogramPoint]
    pedagogical_summary: str


@dataclass
class ChronoamperometryResult:
    system_name: str
    applied_potential_v: float
    duration_s: float
    cottrell_slope_ua_s_half: float
    diffusion_coefficient_cm2_s: float
    curve: List[ChronoamperometryPoint]
    pedagogical_summary: str


@dataclass
class ElectrochemicalPreset:
    id: str
    name: str
    redox_couple: str
    reversibility: ElectrochemicalReversibility
    e0_v_vs_she: float
    n_electrons: int
    standard_d_cm2_s: float
    standard_k0_cm_s: float
    alpha: float
    description: str
