"""
Reaction API Schemas.
"""
from typing import List, Optional
from pydantic import BaseModel, Field
from services.chemistry.app.models.reaction import (
    ParsedReaction, BalancedReaction, ReactionValidationResult, ReactionClassificationResult
)

class ReactionParseRequest(BaseModel):
    equation: str = Field(..., json_schema_extra={"example": "CH4 + O2 -> CO2 + H2O"})

class ReactionBalanceRequest(BaseModel):
    equation: str = Field(..., json_schema_extra={"example": "CH4 + O2 -> CO2 + H2O"})

class ReactionValidateRequest(BaseModel):
    equation: str = Field(..., json_schema_extra={"example": "2H2 + O2 -> 2H2O"})

class ReactionClassifyRequest(BaseModel):
    equation: str = Field(..., json_schema_extra={"example": "CH4 + 2O2 -> CO2 + 2H2O"})
