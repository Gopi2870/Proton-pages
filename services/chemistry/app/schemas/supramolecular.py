"""Pydantic validation schemas for Supramolecular Chemistry & Host-Guest Complexation (PR #045)."""

from typing import List, Optional
from pydantic import BaseModel, Field
from app.models.supramolecular import (
    HostMolecule,
    GuestMolecule,
    JobPlotResult,
    HostGuestComplexSystem,
)


class HostsAndGuestsCatalogResponse(BaseModel):
    hosts: List[HostMolecule]
    guests: List[GuestMolecule]


class JobPlotRequest(BaseModel):
    host_id: str = Field("18_crown_6", description="Preset macrocyclic host receptor")
    guest_id: str = Field("potassium_cation", description="Preset guest molecule or cation")
    total_concentration_mM: float = Field(1.0, gt=0.0, le=100.0, description="Total equimolar sum [H] + [G] in mM")
    points_count: int = Field(21, ge=9, le=101, description="Number of continuous variation titration points")
    temperature_k: float = Field(298.15, gt=0.0, description="Temperature in Kelvin")


class JobPlotResponse(BaseModel):
    result: JobPlotResult


class BindingSimulationRequest(BaseModel):
    host_id: str = Field("18_crown_6", description="Preset macrocyclic host")
    guest_id: str = Field("potassium_cation", description="Preset guest substrate")
    host_initial_conc_mM: float = Field(0.5, gt=0.0, le=50.0, description="Initial cell host concentration in mM")
    guest_max_conc_mM: float = Field(2.5, gt=0.0, le=200.0, description="Maximum titrated guest concentration in mM")
    temperature_k: float = Field(298.15, gt=0.0)
    titration_steps: int = Field(25, ge=10, le=100)


class BindingSimulationResponse(BaseModel):
    system: HostGuestComplexSystem
