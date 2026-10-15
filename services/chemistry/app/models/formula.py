"""
Chemical Formula AST and Composition Models.
"""
from typing import Dict, List, Optional, Any
from pydantic import BaseModel, ConfigDict, Field


class FormulaComposition(BaseModel):
    """
    Structured breakdown of elemental composition in a chemical formula.
    """
    model_config = ConfigDict(frozen=True)

    elements: Dict[str, int] = Field(..., description="Map of element symbol to total atom count")
    total_atoms: int = Field(..., ge=1, description="Total number of atoms in the formula")
    charge: int = Field(0, description="Net charge of the species")
    hydrate_water_molecules: float = Field(0.0, description="Molecules of water in hydrate if applicable")


class FormulaValidationResult(BaseModel):
    """
    Result of chemical formula validation.
    """
    is_valid: bool = Field(..., description="Whether the formula is valid")
    formula: str = Field(..., description="Input formula string")
    normalized_formula: Optional[str] = Field(None, description="Canonical normalized formula string")
    composition: Optional[FormulaComposition] = Field(None, description="Composition if valid")
    errors: List[str] = Field(default_factory=list, description="Validation error messages")


class ElementalContribution(BaseModel):
    """
    Elemental contribution to total molecular mass.
    """
    symbol: str
    name: str
    count: int
    atomic_mass: float
    total_mass: float
    percentage: float


class MolecularMassResult(BaseModel):
    """
    Detailed result of molecular mass calculation.
    """
    formula: str
    normalized_formula: str
    molecular_mass: float
    unit: str = "g/mol"
    elemental_contributions: List[ElementalContribution]
    total_atoms: int


class PercentCompositionResult(BaseModel):
    """
    Percent composition breakdown.
    """
    formula: str
    normalized_formula: str
    molecular_mass: float
    composition: Dict[str, float] = Field(..., description="Map of element symbol to mass percentage")
    details: List[ElementalContribution]


class EmpiricalFormulaResult(BaseModel):
    """
    Result of empirical formula derivation.
    """
    empirical_formula: str
    element_counts: Dict[str, int]
    mole_ratios: Dict[str, float]
    normalized_ratios: Dict[str, float]
