"""Pydantic schemas for Molecular Dynamics Simulation API (PR #036)."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from app.models.molecular_dynamics import EnsembleType, LatticeStructure


class MolecularDynamicsRequest(BaseModel):
    preset_id: Optional[str] = "liquid_argon"
    ensemble: EnsembleType = EnsembleType.NVE_MICROCANONICAL
    num_particles: int = Field(default=32, ge=8, le=256)
    target_temperature_k: float = Field(default=84.0, ge=1.0, le=2000.0)
    density_g_cm3: float = Field(default=1.35, ge=0.01, le=5.0)
    timestep_fs: float = Field(default=4.0, ge=0.5, le=15.0)
    total_steps: int = Field(default=100, ge=10, le=1000)
    sampling_interval: int = Field(default=2, ge=1, le=50)
    sigma_angstrom: float = Field(default=3.405, gt=0.5, le=10.0)
    epsilon_kj_mol: float = Field(default=0.996, gt=0.01, le=20.0)
    cutoff_radius_sigma: float = Field(default=2.5, ge=1.5, le=4.5)
    thermostat_coupling_ps: float = Field(default=0.2, ge=0.01, le=10.0)
    initial_lattice: LatticeStructure = LatticeStructure.FACE_CENTERED_CUBIC
    random_seed: Optional[int] = Field(default=42)


class SimulationTelemetryStepSchema(BaseModel):
    step: int
    time_ps: float
    kinetic_energy_kj_mol: float
    potential_energy_kj_mol: float
    total_energy_kj_mol: float
    temperature_k: float
    pressure_bar: float
    energy_drift_fraction: float


class RadialDistributionPointSchema(BaseModel):
    r_angstrom: float
    g_r: float


class MeanSquaredDisplacementPointSchema(BaseModel):
    time_ps: float
    msd_angstrom2: float


class ParticleCoordinateSchema(BaseModel):
    id: int
    x: float
    y: float
    z: float
    vx: float
    vy: float
    vz: float
    speed: float


class MolecularDynamicsResponse(BaseModel):
    system_name: str
    ensemble: EnsembleType
    num_particles: int
    box_length_angstrom: float
    volume_angstrom3: float
    density_g_cm3: float
    timestep_fs: float
    total_steps: int
    initial_temperature_k: float
    final_temperature_k: float
    average_temperature_k: float
    average_pressure_bar: float
    energy_conservation_ratio: float
    self_diffusion_coefficient_cm2_s: float
    telemetry: List[SimulationTelemetryStepSchema]
    radial_distribution: List[RadialDistributionPointSchema]
    msd_curve: List[MeanSquaredDisplacementPointSchema]
    final_positions: List[ParticleCoordinateSchema]
    pedagogical_summary: str


class MolecularDynamicsPresetSummary(BaseModel):
    id: str
    name: str
    state_of_matter: str
    default_ensemble: EnsembleType
    target_temperature_k: float
    density_g_cm3: float
    description: str
