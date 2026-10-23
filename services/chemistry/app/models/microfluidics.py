"""
Domain models for Microfluidics, Droplet Chemistry, and Continuous-Flow Reactors.
"""
from enum import Enum
from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class FlowRegime(str, Enum):
    CREEPING_LAMINAR = "creeping_laminar"  # Re << 1
    LAMINAR = "laminar"                    # 1 < Re < 2000
    TRANSITIONAL = "transitional"          # 2000 < Re < 4000
    TURBULENT = "turbulent"                # Re > 4000


class DropletRegime(str, Enum):
    SQUEEZING = "squeezing"      # Ca < 0.01, confinement dominated
    DRIPPING = "dripping"        # 0.01 <= Ca <= 0.1, shear-assisted pinch-off
    JETTING = "jetting"          # Ca > 0.1, viscous drag extends thread before breakup


class JunctionGeometry(str, Enum):
    T_JUNCTION = "t_junction"
    FLOW_FOCUSING = "flow_focusing"
    CO_FLOW = "co_flow"


class MicrofluidicChip(BaseModel):
    id: str
    name: str
    material: str
    geometry: JunctionGeometry
    channel_width_um: float = Field(..., description="Main channel width in micrometers")
    channel_height_um: float = Field(..., description="Channel height/depth in micrometers")
    channel_length_mm: float = Field(..., description="Total channel length in millimeters")
    description: str


class FluidProperties(BaseModel):
    name: str
    density_kg_m3: float = Field(default=1000.0, description="Density in kg/m^3")
    viscosity_pa_s: float = Field(default=0.001, description="Dynamic viscosity in Pa·s")
    interfacial_tension_n_m: float = Field(default=0.035, description="Interfacial tension between phases in N/m")


class HydrodynamicResult(BaseModel):
    reynolds_number: float
    capillary_number: float
    peclet_number: float
    flow_regime: FlowRegime
    hydraulic_diameter_um: float
    mean_velocity_m_s: float
    pressure_drop_kpa: float
    hydraulic_resistance_pa_s_m3: float
    wall_shear_stress_pa: float


class DropletGenerationResult(BaseModel):
    regime: DropletRegime
    droplet_volume_pl: float = Field(..., description="Droplet volume in picoliters (pL)")
    droplet_diameter_um: float = Field(..., description="Equivalent spherical droplet diameter in um")
    generation_frequency_hz: float = Field(..., description="Droplets generated per second (Hz)")
    droplet_length_um: float = Field(..., description="Length of segmented plug in um")
    slug_velocity_m_s: float = Field(..., description="Linear velocity of droplet train in m/s")
    mixing_time_ms: float = Field(..., description="Recirculation chaotic mixing time inside droplet in ms")
    unsegmented_mixing_time_ms: float = Field(..., description="Pure diffusion mixing time in unsegmented stream in ms")
    mixing_acceleration_fold: float = Field(..., description="Acceleration fold of chaotic advection vs diffusion")


class FlowReactionResult(BaseModel):
    residence_time_s: float = Field(..., description="Mean space time tau in seconds")
    reynolds_number: float
    bodenstein_number: float = Field(..., description="Bo = u*L/D_ax (Bodenstein / axial Peclet number)")
    conversion: float = Field(..., description="Reactant conversion fraction (0.0 to 1.0)")
    intermediate_yield: float = Field(..., description="Desired intermediate product yield fraction (0.0 to 1.0)")
    byproduct_yield: float = Field(..., description="Over-reaction byproduct yield fraction (0.0 to 1.0)")
    space_time_yield_kg_m3_h: float = Field(..., description="Productivity per unit reactor volume per hour")
    rtd_curve: List[Dict[str, float]] = Field(..., description="Residence time distribution E(theta) points")
    axial_concentration_profile: List[Dict[str, float]] = Field(..., description="Concentration vs channel length z")
