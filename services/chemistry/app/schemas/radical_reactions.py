"""
Pydantic v2 schemas for Radical Reaction Networks, Elementary Mechanisms,
Stiff Numerical Kinetics, and Sensitivity Analysis.
"""

from typing import List, Dict, Optional, Any, Tuple
from pydantic import BaseModel, Field
from app.models.radical_reactions import RadicalSpeciesType, RadicalReactionRole


class RadicalSpeciesSchema(BaseModel):
    name: str
    formula: str
    unpaired_electrons: int = 0
    spin_multiplicity: int = 1
    radical_type: RadicalSpeciesType
    enthalpy_f_kj_mol: float = 0.0
    gibbs_f_kj_mol: float = 0.0
    entropy_j_mol_k: float = 0.0
    initial_concentration_m: float = 0.0
    color_hex: str = "#94a3b8"
    elements: Dict[str, int] = Field(default_factory=dict)


class ArrheniusRateLawSchema(BaseModel):
    pre_exponential_a: float
    temperature_exponent_n: float = 0.0
    activation_energy_kj_mol: float = 0.0
    description: str = ""


class RadicalElementaryReactionSchema(BaseModel):
    id: str
    equation: str
    role: RadicalReactionRole
    reactants: Dict[str, float]
    products: Dict[str, float]
    rate_law: ArrheniusRateLawSchema
    is_reversible: bool = False
    delta_h_rxn_kj_mol: float = 0.0


class RadicalMechanismSummarySchema(BaseModel):
    id: str
    name: str
    category: str
    description: str
    species_count: int
    reaction_count: int
    reference_citation: str = ""
    validated_temperature_range_k: Tuple[float, float] = (250.0, 3000.0)


class RadicalMechanismDetailSchema(BaseModel):
    id: str
    name: str
    category: str
    description: str
    reference_citation: str = ""
    validated_temperature_range_k: Tuple[float, float] = (250.0, 3000.0)
    species: List[RadicalSpeciesSchema]
    reactions: List[RadicalElementaryReactionSchema]


class RadicalSimulationRequest(BaseModel):
    mechanism_id: str = Field(default="h2_o2_combustion")
    temperature_k: float = Field(default=1200.0, ge=100.0, le=4000.0)
    pressure_atm: float = Field(default=1.0, ge=0.01, le=100.0)
    total_time_s: float = Field(default=1e-3, ge=1e-10, le=100.0)
    initial_concentrations: Optional[Dict[str, float]] = None
    max_steps: int = Field(default=1000, ge=50, le=5000)


class SensitivityEntrySchema(BaseModel):
    species: str
    reaction_id: str
    sensitivity: float


class RadicalSimulationResponse(BaseModel):
    mechanism_id: str
    mechanism_name: str
    temperature_k: float
    pressure_atm: float
    time_points_s: List[float]
    trajectories: Dict[str, List[float]]
    total_radical_pool: List[float]
    top_sensitivities: List[SensitivityEntrySchema]
    element_conservation_errors: Dict[str, float]
    qssa_comparison: Dict[str, List[float]] = Field(default_factory=dict)
    stiffness_ratio_estimate: float = 1.0
    cpu_time_ms: float = 0.0
