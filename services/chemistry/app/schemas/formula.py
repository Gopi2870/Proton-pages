"""
Formula API Schemas.
"""
from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from services.chemistry.app.models.formula import (
    FormulaComposition, FormulaValidationResult, MolecularMassResult,
    PercentCompositionResult, EmpiricalFormulaResult
)

class FormulaParseRequest(BaseModel):
    formula: str = Field(..., json_schema_extra={"example": "Ca(OH)2"})

class FormulaMassRequest(BaseModel):
    formula: str = Field(..., json_schema_extra={"example": "Al2(SO4)3"})

class FormulaCompositionRequest(BaseModel):
    formula: str = Field(..., json_schema_extra={"example": "H2O"})

class EmpiricalFormulaRequest(BaseModel):
    elemental_data: Dict[str, float] = Field(
        ...,
        description="Map of element symbol to percentage or mass in grams",
        json_schema_extra={"example": {"H": 11.19, "O": 88.81}}
    )
