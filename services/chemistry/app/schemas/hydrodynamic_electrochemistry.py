"""
Pydantic schemas for Hydrodynamic Electrochemistry, RDE, RRDE, and Stripping Voltammetry.
"""
from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from app.models.hydrodynamic_electrochemistry import (
    ElectrodeType,
    StrippingMode,
    RdeSimulationResult,
    StrippingVoltammetryResult,
    ChronocoulometryResult,
)


class RdeSimulationRequest(BaseModel):
    system_name: str = Field(default="Ferrocyanide Oxidation / [Fe(CN)6]4-")
    electrode_type: ElectrodeType = Field(default=ElectrodeType.PLATINUM_DISK)
    electrode_radius_mm: float = Field(default=2.5, ge=0.1, le=10.0)
    concentration_mm: float = Field(default=5.0, gt=0.0, le=500.0)
    n_electrons: int = Field(default=1, ge=1, le=6)
    diffusion_coefficient_cm2_s: float = Field(default=6.5e-6, gt=0.0, le=1e-4)
    kinematic_viscosity_cm2_s: float = Field(default=0.010, gt=0.0, le=0.5)  # water = 0.010 cm^2/s
    rotation_speeds_rpm: List[float] = Field(
        default=[400.0, 900.0, 1600.0, 2500.0, 3600.0],
        description="RDE rotation speeds in revolutions per minute",
    )
    overpotential_mv: float = Field(default=250.0, ge=10.0, le=1000.0)
    heterogeneous_rate_constant_k0_cm_s: float = Field(default=0.02, gt=0.0, le=10.0)
    transfer_coefficient_alpha: float = Field(default=0.5, ge=0.05, le=0.95)


class StrippingVoltammetryRequest(BaseModel):
    sample_name: str = Field(default="Municipal Water Heavy Metal Trace Analysis")
    deposition_potential_v: float = Field(default=-1.2, le=-0.2, ge=-2.5)
    deposition_time_s: float = Field(default=120.0, ge=10.0, le=1800.0)
    equilibration_time_s: float = Field(default=10.0, ge=2.0, le=60.0)
    stripping_mode: StrippingMode = Field(default=StrippingMode.SQUARE_WAVE)
    electrode_type: ElectrodeType = Field(default=ElectrodeType.BISMUTH_FILM)
    step_potential_mv: float = Field(default=4.0, ge=1.0, le=20.0)
    square_wave_amplitude_mv: float = Field(default=25.0, ge=5.0, le=100.0)
    square_wave_frequency_hz: float = Field(default=25.0, ge=5.0, le=250.0)
    zn_concentration_ppb: float = Field(default=45.0, ge=0.0, le=1000.0)
    cd_concentration_ppb: float = Field(default=12.0, ge=0.0, le=1000.0)
    pb_concentration_ppb: float = Field(default=18.0, ge=0.0, le=1000.0)
    cu_concentration_ppb: float = Field(default=30.0, ge=0.0, le=1000.0)


class ChronocoulometryRequest(BaseModel):
    system_name: str = Field(default="Anthraquinone-2-sulfonate Adsorption on Carbon")
    concentration_mm: float = Field(default=1.0, gt=0.0, le=50.0)
    electrode_area_cm2: float = Field(default=0.196, gt=0.0, le=5.0)
    step_duration_s: float = Field(default=0.25, ge=0.01, le=5.0)
    n_electrons: int = Field(default=2, ge=1, le=4)
    surface_excess_gamma_mol_cm2: float = Field(default=2.5e-10, ge=0.0, le=1e-8)
    double_layer_capacitance_uf_cm2: float = Field(default=20.0, gt=0.0, le=200.0)
    potential_step_v: float = Field(default=0.6, gt=0.0, le=2.0)
    diffusion_coefficient_cm2_s: float = Field(default=5.2e-6, gt=0.0, le=1e-4)


class CuratedMetalStandard(BaseModel):
    metal: str
    symbol: str
    redox_couple: str
    standard_potential_v_she: float
    asv_peak_potential_v: float
    who_drinking_water_limit_ppb: float
    description: str


class HydrodynamicElectrochemistryCatalogResponse(BaseModel):
    metals: List[CuratedMetalStandard]
    electrodes: List[Dict[str, str]]
