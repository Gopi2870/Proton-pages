"""
Chemical Reaction Kinetics and Catalytic Dynamics Domain Models.
Covers integrated rate laws (zero, 1st, 2nd order), Arrhenius temperature dependence,
and Michaelis-Menten enzyme kinetics.
"""
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any


@dataclass
class KineticsTimePoint:
    """Individual time step in reaction concentration progress."""
    time_seconds: float
    concentration_m: float
    rate_m_s: float
    ln_conc: Optional[float] = None
    inv_conc: Optional[float] = None


@dataclass
class RateLawSimulationResult:
    """Simulation output for zero, first, or second order reaction."""
    reaction_name: str
    order: int  # 0, 1, or 2
    initial_conc_m: float
    rate_constant_k: float
    k_units: str
    half_life_seconds: float
    time_series: List[KineticsTimePoint] = field(default_factory=list)
    differential_rate_equation: str = ""
    integrated_rate_equation: str = ""
    notes: str = ""


@dataclass
class ArrheniusResult:
    """Temperature dependence parameters derived from Arrhenius equation."""
    activation_energy_j_mol: float
    activation_energy_kj_mol: float
    pre_exponential_factor_a: float
    temperature_k: float
    rate_constant_k: float
    equation: str
    temp_curve: List[Dict[str, float]] = field(default_factory=list)


@dataclass
class MichaelisMentenPoint:
    """Substrate concentration vs initial velocity point."""
    substrate_conc_um: float
    velocity_um_s: float
    inv_substrate: float
    inv_velocity: float


@dataclass
class MichaelisMentenResult:
    """Analytical enzyme kinetics with optional inhibitor modeling."""
    enzyme_name: str
    v_max: float
    k_m: float
    inhibition_type: Optional[str]  # None, 'competitive', 'noncompetitive', 'uncompetitive'
    inhibitor_conc_um: Optional[float]
    k_i_um: Optional[float]
    apparent_v_max: float
    apparent_k_m: float
    lineweaver_burk_slope: float
    lineweaver_burk_intercept: float
    saturation_points: List[MichaelisMentenPoint] = field(default_factory=list)


@dataclass
class ConsecutiveKineticsPoint:
    """Time-series point for A -> B -> C sequential reaction."""
    time_seconds: float
    conc_a: float
    conc_b: float  # Reactive intermediate
    conc_c: float  # Final product


@dataclass
class ConsecutiveKineticsResult:
    """Analytical solution for two-step consecutive reaction A -> B -> C."""
    initial_a_m: float
    k1: float
    k2: float
    t_max_intermediate_seconds: float
    max_intermediate_conc_m: float
    time_series: List[ConsecutiveKineticsPoint] = field(default_factory=list)
    description: str = ""
