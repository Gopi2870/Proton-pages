"""
Formula API Schemas with strict validation.
"""
from typing import Dict, List, Optional
from pydantic import BaseModel, Field

class FormulaParseRequest(BaseModel):
    formula: str = Field(
        ...,
        min_length=1,
        max_length=256,
        description="Chemical formula string (e.g. Ca(OH)2, CuSO4*5H2O)",
        json_schema_extra={"example": "Ca(OH)2"}
    )

class FormulaMassRequest(BaseModel):
    formula: str = Field(
        ...,
        min_length=1,
        max_length=256,
        description="Chemical formula string to compute molar mass",
        json_schema_extra={"example": "Al2(SO4)3"}
    )

class FormulaCompositionRequest(BaseModel):
    formula: str = Field(
        ...,
        min_length=1,
        max_length=256,
        description="Chemical formula string to compute elemental mass percent",
        json_schema_extra={"example": "H2O"}
    )

class EmpiricalFormulaRequest(BaseModel):
    elemental_data: Dict[str, float] = Field(
        ...,
        min_length=1,
        max_length=50,
        description="Map of element symbol to percentage or mass in grams",
        json_schema_extra={"example": {"H": 11.19, "O": 88.81}}
    )
