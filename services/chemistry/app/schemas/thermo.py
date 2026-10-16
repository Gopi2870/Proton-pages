"""
Thermochemistry and Hess's Law API Schemas.
"""
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field, ConfigDict

class ThermodynamicSpeciesResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    formula: str
    name: str
    state: str
    delta_h_f_kj_mol: float
    delta_g_f_kj_mol: float
    s_molar_j_mol_k: float

class EquationThermoRequest(BaseModel):
    equation: str = Field(..., json_schema_extra={"example": "2 H2(g) + O2(g) -> 2 H2O(l)"})
    temperature_kelvin: float = Field(default=298.15, ge=0.1, le=5000.0)

class ReactionComponent(BaseModel):
    formula: str
    coefficient: float = Field(default=1.0, gt=0)

class DirectReactionThermoRequest(BaseModel):
    reactants: List[ReactionComponent]
    products: List[ReactionComponent]
    temperature_kelvin: float = Field(default=298.15, ge=0.1, le=5000.0)

class ReactionThermochemistryResponse(BaseModel):
    balanced_equation: str
    temperature_kelvin: float
    delta_h_standard_kj: float
    delta_s_standard_j_k: float
    delta_g_standard_kj: float
    is_exothermic: bool
    is_spontaneous: bool
    spontaneity_condition: str
    equilibrium_constant_k: Optional[float] = None
    reactants_breakdown: List[Dict[str, Any]]
    products_breakdown: List[Dict[str, Any]]

class HessIntermediateReaction(BaseModel):
    equation: str = Field(..., json_schema_extra={"example": "C(s) + O2(g) -> CO2(g)"})
    delta_h_kj: float = Field(..., json_schema_extra={"example": -393.5})

class HessSolveRequest(BaseModel):
    target_equation: str = Field(..., json_schema_extra={"example": "C(s) + 0.5 O2(g) -> CO(g)"})
    intermediate_reactions: List[HessIntermediateReaction]

class HessStepResponse(BaseModel):
    equation: str
    original_delta_h_kj: float
    multiplier: float
    effective_delta_h_kj: float

class HessSolveResponse(BaseModel):
    target_equation: str
    target_delta_h_kj: float
    steps: List[HessStepResponse]
    is_solvable: bool
    method: str
    explanation: str
