"""
Gas Laws, Kinetic Molecular Theory and Real Gas Phase Equilibria Domain Models.
Covers Ideal Gas Law, Van der Waals Real Gas equations of state, Maxwell-Boltzmann velocity distributions,
and Clausius-Clapeyron vapor pressure equilibria.
"""
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any


@dataclass
class IdealGasResult:
    """Analytical solution for Ideal Gas Equation of State (PV = nRT)."""
    pressure_atm: float
    volume_liters: float
    moles: float
    temperature_k: float
    temperature_c: float
    molar_volume_l_mol: float
    density_g_l: Optional[float] = None
    equation: str = "PV = nRT"
    notes: str = ""


@dataclass
class VanDerWaalsPoint:
    """Individual volume step on an isotherm."""
    volume_liters: float
    pressure_ideal_atm: float
    pressure_vdw_atm: float
    compressibility_z: float


@dataclass
class VanDerWaalsResult:
    """Simulation of non-ideal real gas behavior comparing Ideal Gas vs Van der Waals."""
    gas_id: str
    gas_name: str
    moles: float
    temperature_k: float
    vdw_a_l2_atm_mol2: float
    vdw_b_l_mol: float
    p_ideal_atm: float
    p_vdw_atm: float
    compressibility_z: float  # Z = PV / nRT
    deviation_percent: float
    regime: str  # 'Ideal-like', 'Attraction-dominated (Z < 1)', 'Volume-repulsion dominated (Z > 1)'
    isotherm_points: List[VanDerWaalsPoint] = field(default_factory=list)
    notes: str = ""


@dataclass
class SpeedDistributionPoint:
    """Velocity step in Maxwell-Boltzmann distribution curve."""
    speed_m_s: float
    probability_density: float


@dataclass
class MaxwellBoltzmannResult:
    """Statistical thermodynamics molecular velocity distribution."""
    gas_name: str
    molar_mass_g_mol: float
    temperature_k: float
    v_mp_m_s: float   # Most probable speed sqrt(2RT/M)
    v_avg_m_s: float  # Mean speed sqrt(8RT/pi*M)
    v_rms_m_s: float  # Root-mean-square speed sqrt(3RT/M)
    mean_kinetic_energy_j: float  # (3/2) * k_B * T
    distribution_points: List[SpeedDistributionPoint] = field(default_factory=list)


@dataclass
class VaporPressurePoint:
    """Vapor-liquid phase equilibrium point along boiling curve."""
    temperature_c: float
    temperature_k: float
    vapor_pressure_kpa: float
    vapor_pressure_atm: float


@dataclass
class PhaseEquilibriumResult:
    """Phase boundary parameters and Clausius-Clapeyron vapor pressure progression."""
    substance_name: str
    formula: str
    normal_boiling_point_c: float
    delta_h_vap_kj_mol: float
    normal_melting_point_c: Optional[float] = None
    triple_point_t_c: Optional[float] = None
    triple_point_p_kpa: Optional[float] = None
    critical_point_t_c: Optional[float] = None
    critical_point_p_mpa: Optional[float] = None
    vapor_pressure_curve: List[VaporPressurePoint] = field(default_factory=list)


@dataclass
class RealGasConstants:
    """Physical constants and critical parameters for a real gas substance."""
    id: str
    name: str
    formula: str
    molar_mass_g_mol: float
    vdw_a_l2_atm_mol2: float
    vdw_b_l_mol: float
    t_c_k: float
    p_c_atm: float
