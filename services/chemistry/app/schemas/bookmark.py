"""
Chemical Bookmark Schemas.
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

class BookmarkCreate(BaseModel):
    item_type: str = Field(..., description="element, compound, reaction, formula, or molecule")
    item_identifier: str = Field(..., min_length=1, max_length=128, description="Identifier, e.g. H2O or Fe")
    notes: Optional[str] = Field(default=None, max_length=2000, description="User personal study notes")
    metadata_json: Optional[str] = Field(default=None, description="Serialized JSON metadata for UI preview")

class BookmarkUpdate(BaseModel):
    notes: Optional[str] = Field(default=None, max_length=2000)
    metadata_json: Optional[str] = Field(default=None)

class BookmarkResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    item_type: str
    item_identifier: str
    notes: Optional[str] = None
    metadata_json: Optional[str] = None
    created_at: datetime

