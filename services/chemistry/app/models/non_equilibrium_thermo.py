"""Domain models for Non-Equilibrium Thermodynamics & Onsager Reciprocal Relations (PR #044)."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class TransportMatrix(BaseModel):
    """Phenomenological transport coefficient matrix L linking generalized forces to fluxes."""
    dimension: int = Field(2, ge=2, le=4)
    labels: List[str]
    matrix_l: List[List[float]]
    is_symmetric: bool
    asymmetry_norm: float
    eigenvalues: List[float]
    is_positive_semidefinite: bool
    determinant: float
    coupling_factor_q: Optional[float] = Field(None, description="Coupling factor q = L_12 / sqrt(L_11 * L_22) for 2x2")


class EntropyProductionResult(BaseModel):
    """Rate of entropy production sigma = sum(J_i * X_i) >= 0 and energy dissipation."""
    fluxes: List[float]
    forces: List[float]
    entropy_production_w_m3_k: float = Field(..., description="Local entropy production rate sigma [W / (m^3 K)]")
    dissipation_rate_w_m3: float = Field(..., description="Energy dissipation rate Phi = T * sigma [W / m^3]")
    is_physically_admissible: bool
    second_law_satisfied: bool
    validation_message: str


class ThermoelectricSystem(BaseModel):
    """Thermoelectric transport model evaluating Seebeck, Peltier, and Thomson effects."""
    material_name: str
    temperature_k: float
    electrical_conductivity_s_m: float
    seebeck_coefficient_uv_k: float
    thermal_conductivity_w_m_k: float
    peltier_coefficient_mv: float
    kelvin_relation_predicted_peltier_mv: float
    kelvin_relation_residual_pct: float
    figure_of_merit_zt: float
    thomson_coefficient_uv_k: Optional[float] = None


class ElectrokineticSystem(BaseModel):
    """Electrokinetic transport model evaluating electro-osmosis, streaming potential, and Saxén relations."""
    medium_name: str
    hydraulic_permeance_l11: float
    electrical_conductance_l22: float
    cross_coefficient_l12: float
    cross_coefficient_l21: float
    electroosmotic_velocity_per_volt: float
    streaming_potential_per_bar: float
    saxen_reciprocity_verified: bool
    saxen_relative_error_pct: float


class ThermodiffusionSystem(BaseModel):
    """Thermodiffusion binary transport model evaluating Soret and Dufour cross-effects."""
    mixture_name: str
    temperature_k: float
    mass_diffusion_coeff_m2_s: float
    thermal_conductivity_w_m_k: float
    soret_coefficient_k_inv: float
    thermal_diffusion_coeff_m2_s_k: float
    dufour_heat_flux_ratio: float
    onsager_cross_coupling_ratio: float
