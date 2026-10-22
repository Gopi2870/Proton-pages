"""FastAPI endpoints for Phase Equilibria & Ternary Liquid-Liquid Extraction (LLE) (PR #038)."""

from typing import List
from fastapi import APIRouter, HTTPException, status
from app.schemas.ternary_lle import (
    TernarySystemSummary,
    TernarySystemDetailResponse,
    HunterNashSimulationRequest,
    HunterNashSimulationResponse,
)
from app.services.ternary_lle_service import (
    TernaryLleEngine,
    PRESET_SYSTEMS,
)

router = APIRouter(prefix="/ternary-lle", tags=["Phase Equilibria & Ternary LLE"])


@router.get("/systems", response_model=List[TernarySystemSummary])
async def get_ternary_systems():
    """Returns curated benchmark ternary systems for liquid-liquid extraction."""
    return TernaryLleEngine.get_all_presets()


@router.get("/systems/{system_id}", response_model=TernarySystemDetailResponse)
async def get_ternary_system_detail(system_id: str):
    """Returns binodal miscibility envelope, plait point, tie-lines, and thermodynamic consistency."""
    if system_id not in PRESET_SYSTEMS:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Ternary system '{system_id}' not found. Available: {list(PRESET_SYSTEMS.keys())}",
        )
    return TernaryLleEngine.get_system_detail(system_id)


@router.post("/simulate", response_model=HunterNashSimulationResponse)
async def simulate_hunter_nash_extraction(request: HunterNashSimulationRequest):
    """Simulates multi-stage countercurrent liquid-liquid extraction using Hunter-Nash graphical method."""
    if request.system_id not in PRESET_SYSTEMS:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Ternary system '{request.system_id}' not found.",
        )
    try:
        return TernaryLleEngine.simulate_hunter_nash(request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Hunter-Nash simulation failed: {str(e)}",
        )
