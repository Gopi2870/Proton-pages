"""
Element API Schemas.
"""
from typing import List
from pydantic import BaseModel
from services.chemistry.app.models.element import Element

ElementResponse = Element

class ElementListResponse(BaseModel):
    total: int
    elements: List[Element]
