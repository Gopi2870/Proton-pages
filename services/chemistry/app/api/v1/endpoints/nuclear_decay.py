"""FastAPI endpoints for Nuclear Chemistry, Radioactive Decay Chains & Bateman Solvers (PR #042)."""

from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models.nuclear_decay import DecayChainPreset
from app.schemas.nuclear_decay import (
    ChainPresetSummary,
    BatemanSimulationRequest,
    BatemanSimulationResponse,
    RadiocarbonDatingRequest,
    RadiocarbonDatingResponse,
)
from app.services.nuclear_decay_service import NuclearDecayEngine

router = APIRouter(prefix="/nuclear-decay", tags=["Nuclear Chemistry & Radioactive Decay Chains"])


@router.get("/presets", response_model=List[ChainPresetSummary])
async def get_decay_chain_presets():
    """Returns curated library of natural and medical radioactive decay chains."""
    return NuclearDecayEngine.get_presets()


@router.get("/presets/{chain_id}", response_model=DecayChainPreset)
async def get_chain_preset_detail(chain_id: str):
    """Returns detailed nuclide steps and half-lives for a specific decay chain."""
    preset = NuclearDecayEngine.get_preset(chain_id)
    if not preset:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Decay chain preset '{chain_id}' not found.",
        )
    return preset


@router.post("/simulate", response_model=BatemanSimulationResponse)
async def simulate_decay_chain(request: BatemanSimulationRequest):
    """Analytically evaluates sequential Bateman equations for radionuclide populations and activities."""
    try:
        return NuclearDecayEngine.simulate(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Bateman decay simulation failed: {str(e)}",
        )


@router.post("/radiocarbon-dating", response_model=RadiocarbonDatingResponse)
async def calculate_radiocarbon_age(request: RadiocarbonDatingRequest):
    """Calculates uncalibrated radiocarbon age (BP) from 14C activity ratio with explicit calibration caveats."""
    try:
        return NuclearDecayEngine.calculate_radiocarbon_age(request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Radiocarbon age calculation failed: {str(e)}",
        )
