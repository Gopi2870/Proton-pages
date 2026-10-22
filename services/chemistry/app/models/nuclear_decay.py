"""Domain models for Nuclear Chemistry, Radioactive Decay Chains & Bateman Solvers (PR #042)."""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class Radioisotope(BaseModel):
    """A nuclide characterized by atomic numbers, half-life, and decay channel."""
    symbol: str = Field(..., description="Nuclide symbol (e.g. 'U-238', 'Mo-99', 'C-14')")
    name: str = Field(..., description="Full element name with mass number")
    atomic_number: int = Field(..., ge=1, le=118, description="Proton number Z")
    mass_number: int = Field(..., ge=1, le=300, description="Nucleon number A")
    half_life_seconds: Optional[float] = Field(None, gt=0.0, description="Half-life in seconds, None if stable")
    half_life_display: str = Field("Stable", description="Human-readable half life with appropriate time unit")
    decay_constant_s_inv: float = Field(0.0, ge=0.0, description="Decay constant lambda (s^-1)")
    decay_mode: str = Field("stable", description="'alpha', 'beta_minus', 'beta_plus', 'gamma', 'ec', 'stable'")
    daughter_isotope: Optional[str] = Field(None, description="Symbol of daughter nuclide formed")
    branching_ratio: float = Field(1.0, ge=0.0, le=1.0, description="Fractional probability of this decay channel")
    is_stable: bool = False
    energy_mev: Optional[float] = None


class DecayChainPreset(BaseModel):
    """A natural or synthetic sequential radioactive decay series."""
    id: str
    name: str
    category: str = Field(..., description="'primordial', 'medical', 'cosmogenic', 'actinide'")
    description: str
    isotopes: List[Radioisotope]
    default_time_horizon_s: float
    default_time_unit: str
    equilibrium_type: str = Field("none", description="'secular', 'transient', 'none'")


class BatemanTimePoint(BaseModel):
    """Nuclei populations and radioactivity at a discrete time point."""
    time_seconds: float
    time_display: str
    populations: Dict[str, float]
    activities_bq: Dict[str, float]
    total_activity_bq: float


class RadiocarbonDatingResult(BaseModel):
    """Calculated radiocarbon age with explicit uncalibrated caveats."""
    fraction_modern_carbon: float = Field(..., ge=0.0, le=1.5, description="A / A0 measured ratio")
    uncalibrated_age_years_bp: float
    uncertainty_years: float
    half_life_used_years: float
    decay_constant_yr_inv: float
    approximate_calendar_era: str
    calibration_notes: str
    scientific_disclaimer: str
