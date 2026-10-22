"""Domain models for Computational Chemical Kinetics Networks & Stiff ODE Solvers."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class KineticSpecies(BaseModel):
    """A chemical species in the reaction network."""
    name: str = Field(..., description="Species identifier (e.g. O3, NO, Ce4+)")
    initial_concentration_m: float = Field(..., ge=0.0, description="Initial molarity (mol/L)")
    color_hex: Optional[str] = None


class ElementaryReaction(BaseModel):
    """An elementary or composite reaction step in the kinetic network."""
    id: str
    equation_str: str
    reactants: Dict[str, float] = Field(..., description="Stoichiometric reactant coefficients")
    products: Dict[str, float] = Field(..., description="Stoichiometric product coefficients")
    rate_constant: float = Field(..., gt=0.0, description="Forward rate constant k (units vary with reaction order)")
    activation_energy_kj: Optional[float] = None


class KineticsTrajectoryPoint(BaseModel):
    """Time-series state during numerical stiff ODE integration."""
    time_s: float
    concentrations: Dict[str, float]
    step_size_s: float


class StiffKineticsPreset(BaseModel):
    """Benchmark kinetic network preset with documented reaction steps and stiffness."""
    id: str
    name: str
    category: str = Field(..., description="'stiff_benchmark', 'atmospheric', 'oscillatory', 'combustion'")
    description: str
    species: List[KineticSpecies]
    reactions: List[ElementaryReaction]
    total_time_s: float
    estimated_stiffness_ratio: float
