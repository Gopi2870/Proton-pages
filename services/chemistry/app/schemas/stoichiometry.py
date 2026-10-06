"""
Stoichiometry API Schemas.
"""
from typing import List, Optional
from pydantic import BaseModel, Field
from services.chemistry.app.models.stoichiometry import (
    ReactantAmountInput, LimitingReactantResult, TheoreticalYieldResult,
    PercentYieldResult, MolarityResult, DilutionResult
)

class LimitingReactantRequest(BaseModel):
    equation: str = Field(..., json_schema_extra={"example": "2H2 + O2 -> 2H2O"})
    reactants: List[ReactantAmountInput] = Field(
        ...,
        json_schema_extra={"example": [
            {"formula": "H2", "amount": 4.0, "unit": "g"},
            {"formula": "O2", "amount": 32.0, "unit": "g"}
        ]}
    )

class TheoreticalYieldRequest(BaseModel):
    equation: str = Field(..., json_schema_extra={"example": "2H2 + O2 -> 2H2O"})
    reactants: List[ReactantAmountInput]
    target_product: str = Field(..., json_schema_extra={"example": "H2O"})

class PercentYieldRequest(BaseModel):
    actual_yield_g: float = Field(..., gt=0, json_schema_extra={"example": 32.5})
    theoretical_yield_g: float = Field(..., gt=0, json_schema_extra={"example": 36.0})

class MolarityRequest(BaseModel):
    moles: Optional[float] = Field(None, json_schema_extra={"example": 0.5})
    volume_liters: Optional[float] = Field(None, json_schema_extra={"example": 1.0})
    molarity: Optional[float] = Field(None, json_schema_extra={"example": 0.5})
    unit_v: str = Field("L", json_schema_extra={"example": "L"})

class DilutionRequest(BaseModel):
    m1: Optional[float] = Field(None, json_schema_extra={"example": 12.0})
    v1: Optional[float] = Field(None, json_schema_extra={"example": 0.1})
    m2: Optional[float] = Field(None, json_schema_extra={"example": 1.0})
    v2: Optional[float] = Field(None)

class UnitConversionRequest(BaseModel):
    value: float
    from_unit: str
    to_unit: str
    unit_type: str = Field(..., description="mass, amount, volume, or concentration")

class UnitConversionResponse(BaseModel):
    original_value: float
    from_unit: str
    converted_value: float
    to_unit: str
