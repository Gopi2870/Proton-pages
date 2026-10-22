"""Pydantic validation schemas for Nuclear Chemistry & Radioactive Decay Chains (PR #042)."""

from typing import Any, Dict, List, Optional, Union
from pydantic import BaseModel, Field
from app.models.nuclear_decay import Radioisotope, RadiocarbonDatingResult


class NuclideSummary(BaseModel):
    symbol: str
    name: str
    atomic_number: int
    mass_number: int
    half_life_display: str
    decay_mode: str
    daughter_isotope: Optional[str]
    is_stable: bool


class ChainPresetSummary(BaseModel):
    id: str
    name: str
    category: str
    description: str
    isotopes_count: int
    first_nuclide: str
    stable_end_product: str
    equilibrium_type: str
    default_time_horizon_display: str


class BatemanSimulationRequest(BaseModel):
    model_config = {"arbitrary_types_allowed": True}

    chain_id: Optional[str] = Field("molybdenum_technetium", description="Preset decay chain ID or None for custom")
    custom_isotopes: Optional[List[Union[Radioisotope, Dict[str, Any]]]] = None
    initial_populations: Optional[Dict[str, float]] = Field(None, description="Initial atoms N0 for each isotope (default N1=1e12)")
    time_horizon: float = Field(72.0, gt=0.0, description="Elapsed time horizon")
    time_unit: str = Field("hours", description="'seconds', 'minutes', 'hours', 'days', 'years'")
    points_count: int = Field(60, ge=10, le=300)


class BatemanSimulationResponse(BaseModel):
    chain_name: str
    equilibrium_type: str
    time_unit: str
    isotopes: List[NuclideSummary]
    time_points_count: int
    trajectory: List[Dict[str, Any]]
    final_populations: Dict[str, float]
    final_activities_bq: Dict[str, float]
    pedagogical_summary: str


class RadiocarbonDatingRequest(BaseModel):
    fraction_modern_carbon: Optional[float] = Field(None, ge=0.0, le=1.5, description="A / A0 modern carbon ratio (1.0 = 100% modern)")
    measured_dpm_per_g: Optional[float] = Field(None, ge=0.0, description="Measured 14C activity in dpm / g carbon (modern baseline ~15.3 dpm/g)")
    use_cambridge_half_life: bool = Field(True, description="True for physical IUPAC half-life 5,730 y; False for Libby half-life 5,568 y")


class RadiocarbonDatingResponse(BaseModel):
    dating_result: RadiocarbonDatingResult
