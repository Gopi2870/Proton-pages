"""
Virtual Lab Experiment Schemas.
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

class ExperimentCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, description="Experiment or simulation title")
    experiment_type: str = Field(..., description="titration, calorimetry, mixer, synthesis, spectroscopy, etc.")
    status: str = Field(default="draft", description="draft, in_progress, completed")
    state_data: Optional[str] = Field(default=None, description="Serialized JSON apparatus / simulation data")
    observations: Optional[str] = Field(default=None, description="User lab observations and qualitative notes")

class ExperimentUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=255)
    status: Optional[str] = Field(default=None)
    state_data: Optional[str] = Field(default=None)
    observations: Optional[str] = Field(default=None)

class ExperimentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    title: str
    experiment_type: str
    status: str
    state_data: Optional[str] = None
    observations: Optional[str] = None
    created_at: datetime
    updated_at: datetime

