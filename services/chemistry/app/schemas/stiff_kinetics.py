"""Pydantic schemas for Computational Chemical Kinetics Networks & Stiff ODE Solvers."""

from typing import Any, Dict, List, Optional, Union
from pydantic import BaseModel, Field
from app.models.stiff_kinetics import KineticSpecies, ElementaryReaction


class KineticSpeciesSchema(BaseModel):
    name: str
    initial_concentration_m: float
    color_hex: Optional[str] = None


class ElementaryReactionSchema(BaseModel):
    id: str
    equation_str: str
    reactants: Dict[str, float]
    products: Dict[str, float]
    rate_constant: float
    activation_energy_kj: Optional[float] = None


class KineticsPresetSummary(BaseModel):
    id: str
    name: str
    category: str
    description: str
    species_count: int
    reactions_count: int
    estimated_stiffness_ratio: float
    default_total_time_s: float


class StiffKineticsSimulationRequest(BaseModel):
    model_config = {"arbitrary_types_allowed": True}

    preset_id: Optional[str] = Field("robertson_stiff", description="Preset identifier or None for custom")
    species: Optional[List[Union[KineticSpeciesSchema, KineticSpecies, Dict[str, Any]]]] = None
    reactions: Optional[List[Union[ElementaryReactionSchema, ElementaryReaction, Dict[str, Any]]]] = None
    total_time_s: float = Field(100.0, gt=0.0, description="Integration time horizon (seconds)")
    initial_step_s: float = Field(1e-4, gt=0.0, description="Initial integration step size")
    solver_method: str = Field("rosenbrock_stiff", description="'rosenbrock_stiff', 'adaptive_bdf', or 'explicit_rk4'")
    max_steps: int = Field(500, ge=50, le=2000, description="Maximum trajectory points recorded")


class StiffKineticsSimulationResponse(BaseModel):
    network_name: str
    solver_method: str
    stiffness_ratio: float
    is_stiff: bool
    species_names: List[str]
    time_points_count: int
    trajectory: List[Dict[str, float]]
    final_concentrations: Dict[str, float]
    jacobian_matrix: List[List[float]]
    pedagogical_summary: str
