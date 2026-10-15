"""
Compound API Schemas.
"""
from typing import List
from pydantic import BaseModel
from services.chemistry.app.models.compound import Compound

CompoundResponse = Compound

class CompoundListResponse(BaseModel):
    total: int
    compounds: List[Compound]
