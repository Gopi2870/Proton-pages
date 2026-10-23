"""
Pydantic schemas for microfluidics, droplet chemistry, and continuous flow reactors.
"""
from typing import List, Optional, Dict
from pydantic import BaseModel, Field
from app.models.microfluidics import (
    JunctionGeometry,
    MicrofluidicChip,
    HydrodynamicResult,
    DropletGenerationResult,
    FlowReactionResult,
)


class HydrodynamicsRequest(BaseModel):
    channel_width_um: float = Field(default=100.0, ge=1.0, le=5000.0)
    channel_height_um: float = Field(default=50.0, ge=1.0, le=5000.0)
    channel_length_mm: float = Field(default=25.0, ge=0.1, le=10000.0)
    flow_rate_ul_min: float = Field(default=10.0, gt=0.0, le=100000.0)
    viscosity_pa_s: float = Field(default=0.001, gt=0.0, le=10.0)
    density_kg_m3: float = Field(default=1000.0, gt=0.0, le=20000.0)
    diffusion_coefficient_m2_s: float = Field(default=1e-9, gt=0.0, le=1e-6)
    interfacial_tension_n_m: float = Field(default=0.035, gt=0.0, le=1.0)


class DropletGenerationRequest(BaseModel):
    geometry: JunctionGeometry = Field(default=JunctionGeometry.T_JUNCTION)
    channel_width_um: float = Field(default=100.0, ge=5.0, le=1000.0)
    channel_height_um: float = Field(default=50.0, ge=5.0, le=1000.0)
    dispersed_flow_rate_ul_min: float = Field(default=5.0, gt=0.0, le=5000.0)
    continuous_flow_rate_ul_min: float = Field(default=25.0, gt=0.0, le=25000.0)
    continuous_viscosity_pa_s: float = Field(default=0.015, gt=0.0, le=5.0)  # e.g. fluorinated or mineral oil
    dispersed_viscosity_pa_s: float = Field(default=0.001, gt=0.0, le=5.0)   # aqueous phase
    interfacial_tension_n_m: float = Field(default=0.015, gt=0.0001, le=0.1) # surfactant-stabilized
    diffusion_coefficient_m2_s: float = Field(default=1e-9, gt=0.0, le=1e-6)


class FlowReactionRequest(BaseModel):
    chip_id: Optional[str] = Field(default=None)
    channel_width_um: float = Field(default=200.0, ge=10.0, le=5000.0)
    channel_height_um: float = Field(default=100.0, ge=10.0, le=5000.0)
    channel_length_mm: float = Field(default=500.0, ge=10.0, le=50000.0)
    total_flow_rate_ul_min: float = Field(default=50.0, gt=0.1, le=50000.0)
    initial_concentration_m: float = Field(default=1.0, gt=0.0, le=20.0)
    rate_constant_k1: float = Field(default=0.15, gt=0.0, description="k1 in s^-1 for A -> P")
    rate_constant_k2: float = Field(default=0.01, ge=0.0, description="k2 in s^-1 for P -> S (over-reaction)")
    temperature_k: float = Field(default=333.15, ge=200.0, le=600.0)
    molecular_weight_g_mol: float = Field(default=150.0, gt=1.0, le=10000.0)


class BenchmarkReactionInfo(BaseModel):
    id: str
    name: str
    reaction_type: str
    reagents: str
    typical_temperature_c: float
    typical_residence_time_s: float
    k1_at_ref_temp: float
    k2_at_ref_temp: float
    description: str


class MicrofluidicsCatalogResponse(BaseModel):
    chips: List[MicrofluidicChip]
    reactions: List[BenchmarkReactionInfo]
