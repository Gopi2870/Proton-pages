"""Pydantic schemas for Advanced Electroanalytical Chemistry API (PR #037)."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from app.models.electroanalytical import (
    ElectrochemicalReversibility,
    ReferenceElectrode,
)


class CyclicVoltammetryRequest(BaseModel):
    preset_id: Optional[str] = "ferricyanide"
    system_name: Optional[str] = "Ferricyanide / Ferrocyanide Redox Couple"
    e0_v: float = Field(default=0.36, ge=-3.5, le=3.5)
    n_electrons: int = Field(default=1, ge=1, le=4)
    e_start_v: float = Field(default=0.6, ge=-3.5, le=3.5)
    e_switch_v: float = Field(default=0.0, ge=-3.5, le=3.5)
    scan_rate_v_s: float = Field(default=0.1, ge=0.005, le=10.0)
    concentration_mm: float = Field(default=1.0, gt=0.001, le=100.0)
    diffusion_coefficient_cm2_s: float = Field(default=7.6e-6, gt=1e-9, le=1e-3)
    electrode_area_cm2: float = Field(default=0.0707, gt=1e-4, le=10.0)
    standard_rate_constant_k0_cm_s: float = Field(default=0.02, gt=1e-8, le=10.0)
    transfer_coefficient_alpha: float = Field(default=0.5, ge=0.1, le=0.9)
    temperature_k: float = Field(default=298.15, ge=250.0, le=373.15)
    double_layer_capacitance_uf_cm2: float = Field(default=20.0, ge=0.0, le=100.0)


class VoltammogramPointSchema(BaseModel):
    potential_v: float
    current_ua: float
    current_faradaic_ua: float
    current_capacitive_ua: float
    scan_direction: str
    time_s: float


class CyclicVoltammetryResponse(BaseModel):
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
    voltammogram: List[VoltammogramPointSchema]
    pedagogical_summary: str


class ChronoamperometryRequest(BaseModel):
    preset_id: Optional[str] = "ferricyanide"
    applied_potential_v: float = Field(default=0.0, ge=-3.5, le=3.5)
    duration_s: float = Field(default=5.0, ge=0.5, le=60.0)
    time_step_s: float = Field(default=0.05, ge=0.005, le=0.5)
    concentration_mm: float = Field(default=1.0, gt=0.001, le=100.0)
    diffusion_coefficient_cm2_s: float = Field(default=7.6e-6, gt=1e-9, le=1e-3)
    electrode_area_cm2: float = Field(default=0.0707, gt=1e-4, le=10.0)
    n_electrons: int = Field(default=1, ge=1, le=4)
    temperature_k: float = Field(default=298.15, ge=250.0, le=373.15)


class ChronoamperometryPointSchema(BaseModel):
    time_s: float
    current_ua: float
    inv_sqrt_time: float


class ChronoamperometryResponse(BaseModel):
    system_name: str
    applied_potential_v: float
    duration_s: float
    cottrell_slope_ua_s_half: float
    diffusion_coefficient_cm2_s: float
    curve: List[ChronoamperometryPointSchema]
    pedagogical_summary: str


class ElectrochemicalPresetSummary(BaseModel):
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
