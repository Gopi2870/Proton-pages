"""FastAPI endpoints for Surface Chemistry, Heterogeneous Catalysis & Adsorption (PR #041)."""

from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models.surface_chemistry import AdsorbentMaterial
from app.schemas.surface_chemistry import (
    MaterialSummary,
    BetCalculationRequest,
    BetCalculationResponse,
    IsothermComparisonRequest,
    IsothermComparisonResponse,
    CatalysisSimulationRequest,
    CatalysisSimulationResponse,
)
from app.services.surface_chemistry_service import SurfaceChemistryEngine

router = APIRouter(prefix="/surface-chemistry", tags=["Surface Chemistry & Heterogeneous Catalysis"])


@router.get("/materials", response_model=List[MaterialSummary])
async def get_adsorbent_materials():
    """Returns curated library of porous materials with literature BET surface areas."""
    return SurfaceChemistryEngine.get_materials()


@router.get("/materials/{material_id}", response_model=AdsorbentMaterial)
async def get_material_detail(material_id: str):
    """Returns detailed physisorption isotherm data for a specific material."""
    mat = SurfaceChemistryEngine.get_material(material_id)
    if not mat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Material '{material_id}' not found.",
        )
    return mat


@router.post("/bet-analysis", response_model=BetCalculationResponse)
async def calculate_bet_surface_area(request: BetCalculationRequest):
    """Performs multi-point Brunauer-Emmett-Teller (BET) linear regression and surface area determination."""
    try:
        return SurfaceChemistryEngine.calculate_bet_surface_area(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"BET surface area calculation failed: {str(e)}",
        )


@router.post("/isotherm-compare", response_model=IsothermComparisonResponse)
async def compare_adsorption_isotherms(request: IsothermComparisonRequest):
    """Fits Langmuir, Freundlich, and BET models to evaluate goodness of fit (R^2)."""
    try:
        return SurfaceChemistryEngine.compare_isotherms(request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Adsorption isotherm comparison failed: {str(e)}",
        )


@router.post("/catalysis-kinetics", response_model=CatalysisSimulationResponse)
async def simulate_catalysis_kinetics(request: CatalysisSimulationRequest):
    """Simulates Langmuir-Hinshelwood vs Eley-Rideal heterogeneous catalytic kinetics."""
    try:
        return SurfaceChemistryEngine.simulate_catalysis_kinetics(request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Catalytic kinetics simulation failed: {str(e)}",
        )
