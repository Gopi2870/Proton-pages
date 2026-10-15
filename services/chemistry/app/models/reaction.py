"""
Chemical Reaction Data Models.
"""
from enum import Enum
from typing import List, Dict, Optional
from pydantic import BaseModel, ConfigDict, Field


class ReactionType(str, Enum):
    SYNTHESIS = "synthesis"
    DECOMPOSITION = "decomposition"
    SINGLE_REPLACEMENT = "single_replacement"
    DOUBLE_REPLACEMENT = "double_replacement"
    COMBUSTION = "combustion"
    ACID_BASE = "acid_base"
    PRECIPITATION = "precipitation"
    REDOX = "redox"
    UNKNOWN = "unknown"


class ReactionSpecies(BaseModel):
    """
    Representation of a single chemical species in a reaction with its stoichiometric coefficient.
    """
    coefficient: int = Field(..., ge=1, description="Stoichiometric coefficient")
    formula: str = Field(..., description="Chemical formula of species")
    state: Optional[str] = Field(None, description="Physical state symbol: (g), (l), (s), (aq)")
    charge: int = Field(0, description="Ionic charge of species")


class ParsedReaction(BaseModel):
    """
    Parsed representation of a chemical reaction equation.
    """
    raw_equation: str
    reactants: List[ReactionSpecies]
    products: List[ReactionSpecies]
    reversible: bool = False
    arrow: str = "->"


class BalancedReaction(BaseModel):
    """
    Result of chemical equation balancing.
    """
    raw_equation: str
    balanced_equation: str
    reactants: List[ReactionSpecies]
    products: List[ReactionSpecies]
    is_balanced: bool = True
    coefficients: List[int]
    species_list: List[str]


class ReactionValidationResult(BaseModel):
    """
    Result of chemical equation validation.
    """
    raw_equation: str
    is_valid: bool
    is_balanced: bool
    reactant_atoms: Dict[str, int]
    product_atoms: Dict[str, int]
    atom_difference: Dict[str, int]
    errors: List[str] = Field(default_factory=list)


class ReactionClassificationResult(BaseModel):
    """
    Classification of chemical reaction type.
    """
    reaction: str
    primary_type: ReactionType
    secondary_types: List[ReactionType] = Field(default_factory=list)
    confidence: float = Field(..., ge=0.0, le=1.0)
    explanation: str
