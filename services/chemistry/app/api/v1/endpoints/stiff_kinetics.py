"""FastAPI endpoints for Stiff Kinetics Reaction Networks & Stiff ODE Solvers (PR #040)."""

from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models.stiff_kinetics import StiffKineticsPreset
from app.schemas.stiff_kinetics import (
    KineticsPresetSummary,
    StiffKineticsSimulationRequest,
    StiffKineticsSimulationResponse,
)
from app.services.stiff_kinetics_service import StiffKineticsEngine

router = APIRouter(prefix="/stiff-kinetics", tags=["Stiff Kinetics Reaction Networks"])


@router.get("/presets", response_model=List[KineticsPresetSummary])
async def get_kinetics_presets():
    """Returns curated benchmark kinetic networks (Robertson, Chapman ozone, Oregonator BZ, Zeldovich NOx)."""
    return StiffKineticsEngine.get_presets()


@router.get("/presets/{preset_id}", response_model=StiffKineticsPreset)
async def get_kinetics_preset_detail(preset_id: str):
    """Returns full kinetic network definition for a given preset ID."""
    preset = StiffKineticsEngine.get_preset(preset_id)
    if not preset:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Kinetics preset '{preset_id}' not found.",
        )
    return preset


@router.post("/simulate", response_model=StiffKineticsSimulationResponse)
async def simulate_stiff_kinetics(request: StiffKineticsSimulationRequest):
    """Simulates multi-reaction kinetic network using Rosenbrock-W stiff ODE solver or RK4."""
    try:
        return StiffKineticsEngine.simulate(request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Stiff kinetic integration failed: {str(e)}",
        )
