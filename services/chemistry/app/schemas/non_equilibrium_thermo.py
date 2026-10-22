"""Pydantic validation schemas for Non-Equilibrium Thermodynamics API endpoints (PR #044)."""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field
from app.models.non_equilibrium_thermo import (
    TransportMatrix,
    EntropyProductionResult,
    ThermoelectricSystem,
    ElectrokineticSystem,
    ThermodiffusionSystem,
)


class BenchmarkSystemSummary(BaseModel):
    id: str
    name: str
    category: str
    description: str
    flux_labels: List[str]
    force_labels: List[str]
    default_forces: List[float]


class TransportCouplingRequest(BaseModel):
    matrix_l: List[List[float]] = Field(..., description="Phenomenological matrix L (nxn, typically 2x2)")
    driving_forces: List[float] = Field(..., description="Generalized thermodynamic forces X_i")
    temperature_k: float = Field(298.15, gt=0.0, description="Absolute system temperature in Kelvin")
    force_labels: Optional[List[str]] = None
    flux_labels: Optional[List[str]] = None


class TransportCouplingResponse(BaseModel):
    temperature_k: float
    transport_matrix: TransportMatrix
    entropy_production: EntropyProductionResult
    pedagogical_summary: str


class ThermoelectricAnalysisRequest(BaseModel):
    material_id: Optional[str] = Field("bi2te3_n_type", description="Preset material or custom")
    temperature_k: float = Field(300.0, gt=0.0)
    electrical_conductivity_s_m: Optional[float] = Field(None, gt=0.0)
    seebeck_coefficient_uv_k: Optional[float] = None
    thermal_conductivity_w_m_k: Optional[float] = Field(None, gt=0.0)
    voltage_gradient_v_m: float = Field(10.0)
    temperature_gradient_k_m: float = Field(500.0)


class ThermoelectricAnalysisResponse(BaseModel):
    material_name: str
    temperature_k: float
    system: ThermoelectricSystem
    current_density_a_m2: float
    heat_flux_w_m2: float
    entropy_production_w_m3_k: float
    second_kelvin_law_verified: bool
    explanation: str


class ElectrokineticAnalysisRequest(BaseModel):
    medium_id: Optional[str] = Field("glass_capillary_water", description="Preset porous membrane or custom")
    pressure_drop_kpa: float = Field(50.0)
    voltage_difference_v: float = Field(100.0)
    hydraulic_permeance: Optional[float] = Field(None, gt=0.0)
    electrical_conductance: Optional[float] = Field(None, gt=0.0)
    cross_coupling_coeff: Optional[float] = None


class ElectrokineticAnalysisResponse(BaseModel):
    medium_name: str
    system: ElectrokineticSystem
    volume_flow_rate_m3_s: float
    electric_current_a: float
    entropy_production_w_k: float
    saxen_reciprocity_holds: bool
    explanation: str


class ThermodiffusionAnalysisRequest(BaseModel):
    mixture_id: Optional[str] = Field("toluene_cyclohexane", description="Preset mixture or custom")
    temperature_k: float = Field(298.15, gt=0.0)
    mass_diffusion_coeff_m2_s: Optional[float] = Field(None, gt=0.0)
    thermal_conductivity_w_m_k: Optional[float] = Field(None, gt=0.0)
    soret_coefficient_k_inv: Optional[float] = None
    temperature_gradient_k_m: float = Field(200.0)
    mass_fraction_gradient_m_inv: float = Field(0.5)
    mass_fraction_solute: float = Field(0.5, ge=0.001, le=0.999)


class ThermodiffusionAnalysisResponse(BaseModel):
    mixture_name: str
    temperature_k: float
    system: ThermodiffusionSystem
    matter_flux_kg_m2_s: float
    heat_flux_w_m2: float
    entropy_production_w_m3_k: float
    steady_state_separation_pct: float
    onsager_reciprocity_verified: bool
    explanation: str

