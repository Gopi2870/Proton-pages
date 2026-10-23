"""
API Endpoints for Comprehensive Chemical Compounds & Spectral Reference Database (PR #050).
"""
from typing import Optional
from fastapi import APIRouter, HTTPException, Query, status
from app.models.compound_database import (
    DetailedCompound,
    CompoundSearchResult,
)
from app.schemas.compound_database import (
    CompoundSearchRequest,
    SpectralMatchRequest,
    DatabaseStatsResponse,
)
from app.services.compound_database_service import CompoundDatabaseEngine, CURATED_DATABASE

router = APIRouter(prefix="/compound-database", tags=["Comprehensive Chemical Compounds & Spectral Database"])


@router.get("/stats", response_model=DatabaseStatsResponse, summary="Get database statistics")
async def get_database_stats():
    """Returns aggregated catalog metrics: counts by category, spectral modality totals, and average MW."""
    return CompoundDatabaseEngine.get_database_stats()


@router.get("/compounds", response_model=CompoundSearchResult, summary="Query compound catalog via GET")
async def list_compounds(
    query: Optional[str] = Query(default=None, description="Search keyword in name, IUPAC, SMILES, CAS"),
    category: Optional[str] = Query(default=None, description="Category filter (Organic, Inorganic, Biochemical, etc.)"),
    min_mw: Optional[float] = Query(default=None, ge=0.0),
    max_mw: Optional[float] = Query(default=None, ge=0.0),
    min_log_p: Optional[float] = Query(default=None),
    max_log_p: Optional[float] = Query(default=None),
    physical_state: Optional[str] = Query(default=None),
    has_uv: Optional[bool] = Query(default=None),
    has_ir: Optional[bool] = Query(default=None),
    has_nmr: Optional[bool] = Query(default=None),
    limit: int = Query(default=50, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
):
    """Search and filter the curated chemical database with optional spectral filters."""
    req = CompoundSearchRequest(
        query=query,
        category=category,
        min_mw=min_mw,
        max_mw=max_mw,
        min_log_p=min_log_p,
        max_log_p=max_log_p,
        physical_state=physical_state,
        has_uv=has_uv,
        has_ir=has_ir,
        has_nmr=has_nmr,
        limit=limit,
        offset=offset,
    )
    return CompoundDatabaseEngine.search_compounds(req)


@router.post("/search", response_model=CompoundSearchResult, summary="Search compound catalog via POST")
async def search_compounds_post(request: CompoundSearchRequest):
    """Full-featured search request payload for complex filtering and pagination."""
    return CompoundDatabaseEngine.search_compounds(request)


@router.post("/match-spectroscopy", response_model=CompoundSearchResult, summary="Match unknowns against spectral references")
async def match_spectroscopy(request: SpectralMatchRequest):
    """Matches unknown analytical peaks (UV lambda_max, FTIR bands, 1H-NMR shifts) against curated spectral standards."""
    return CompoundDatabaseEngine.match_spectroscopy(request)


@router.get("/{compound_id}", response_model=DetailedCompound, summary="Get full compound profile by ID")
async def get_compound_by_id(compound_id: str):
    """Retrieves full physicochemical, thermodynamic, and spectroscopic profile for a compound ID."""
    for c in CURATED_DATABASE:
        if c.id.lower() == compound_id.lower():
            return c
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Compound with ID '{compound_id}' was not found in the curated spectral database.",
    )
