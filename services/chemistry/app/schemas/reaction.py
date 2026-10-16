"""
Reaction API Schemas with strict validation.
"""
from typing import List, Optional
from pydantic import BaseModel, Field

class ReactionParseRequest(BaseModel):
    equation: str = Field(
        ...,
        min_length=3,
        max_length=512,
        description="Chemical equation string (e.g. CH4 + O2 -> CO2 + H2O)",
        json_schema_extra={"example": "CH4 + O2 -> CO2 + H2O"}
    )

class ReactionBalanceRequest(BaseModel):
    equation: str = Field(
        ...,
        min_length=3,
        max_length=512,
        description="Unbalanced or balanced chemical equation to balance via matrix null space",
        json_schema_extra={"example": "CH4 + O2 -> CO2 + H2O"}
    )

class ReactionValidateRequest(BaseModel):
    equation: str = Field(
        ...,
        min_length=3,
        max_length=512,
        description="Chemical equation to verify mass and atom conservation",
        json_schema_extra={"example": "2H2 + O2 -> 2H2O"}
    )

class ReactionClassifyRequest(BaseModel):
    equation: str = Field(
        ...,
        min_length=3,
        max_length=512,
        description="Chemical equation to classify reaction mechanism/type",
        json_schema_extra={"example": "CH4 + 2O2 -> CO2 + 2H2O"}
    )
