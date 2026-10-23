"""
Pydantic schemas for Chemical Compounds & Spectral Reference Database.
"""
from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from app.models.compound_database import (
    DetailedCompound,
    CompoundSearchFilter,
    CompoundSearchResult,
)


class CompoundSearchRequest(BaseModel):
    query: Optional[str] = Field(default=None, description="Search term matching name, formula, SMILES, or CAS")
    category: Optional[str] = Field(default=None, description="Category filter (Organic, Inorganic, Pharmaceutical, etc.)")
    min_mw: Optional[float] = Field(default=None, ge=0.0)
    max_mw: Optional[float] = Field(default=None, ge=0.0)
    min_log_p: Optional[float] = Field(default=None)
    max_log_p: Optional[float] = Field(default=None)
    physical_state: Optional[str] = Field(default=None)
    has_uv: Optional[bool] = Field(default=None)
    has_ir: Optional[bool] = Field(default=None)
    has_nmr: Optional[bool] = Field(default=None)
    limit: int = Field(default=50, ge=1, le=500)
    offset: int = Field(default=0, ge=0)


class SpectralMatchRequest(BaseModel):
    target_uv_wavelength_nm: Optional[float] = Field(default=None, ge=150.0, le=900.0)
    target_ir_wavenumber_cm1: Optional[float] = Field(default=None, ge=400.0, le=4000.0)
    target_nmr_1h_ppm: Optional[float] = Field(default=None, ge=-5.0, le=20.0)
    tolerance_percent: float = Field(default=5.0, ge=0.5, le=25.0)
    limit: int = Field(default=20, ge=1, le=100)


class DatabaseStatsResponse(BaseModel):
    total_compounds: int
    categories: Dict[str, int]
    compounds_with_uv: int
    compounds_with_ir: int
    compounds_with_nmr: int
    average_molecular_weight: float
