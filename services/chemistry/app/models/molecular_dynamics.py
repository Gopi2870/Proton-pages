"""Data models for Molecular Dynamics Simulation Engine (PR #036).

Implements Lennard-Jones (12-6) pair potential, Velocity-Verlet integrator,
periodic boundary conditions (PBC), minimum-image convention, microcanonical (NVE)
and canonical (NVT Andersen/Berendsen) ensembles, radial distribution function g(r),
and Einstein mean squared displacement (MSD) diffusion.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Optional, Tuple


class EnsembleType(str, Enum):
    NVE_MICROCANONICAL = "nve_microcanonical"
    NVT_ANDERSEN = "nvt_andersen"
    NVT_BERENDSEN = "nvt_berendsen"


class LatticeStructure(str, Enum):
    SIMPLE_CUBIC = "simple_cubic"
    FACE_CENTERED_CUBIC = "face_centered_cubic"
    RANDOM_NON_OVERLAPPING = "random_non_overlapping"


@dataclass
class Particle:
    id: int
    x: float
    y: float
    z: float
    vx: float
    vy: float
    vz: float
    fx: float = 0.0
    fy: float = 0.0
    fz: float = 0.0
    mass: float = 39.948  # Argon default g/mol
    unwrapped_x: float = 0.0
    unwrapped_y: float = 0.0
    unwrapped_z: float = 0.0


@dataclass
class SimulationTelemetryStep:
    step: int
    time_ps: float
    kinetic_energy_kj_mol: float
    potential_energy_kj_mol: float
    total_energy_kj_mol: float
    temperature_k: float
    pressure_bar: float
    energy_drift_fraction: float


@dataclass
class RadialDistributionPoint:
    r_angstrom: float
    g_r: float


@dataclass
class MeanSquaredDisplacementPoint:
    time_ps: float
    msd_angstrom2: float


@dataclass
class MolecularDynamicsResult:
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
    telemetry: List[SimulationTelemetryStep] = field(default_factory=list)
    radial_distribution: List[RadialDistributionPoint] = field(default_factory=list)
    msd_curve: List[MeanSquaredDisplacementPoint] = field(default_factory=list)
    final_positions: List[Dict[str, float]] = field(default_factory=list)
    pedagogical_summary: str = ""
