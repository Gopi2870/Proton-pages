"""FastAPI endpoints for Dynamic Covalent Chemistry & Constitutional Networks (PR #046)."""

from fastapi import APIRouter, HTTPException, status
from app.schemas.dynamic_covalent import (
    DCLCatalogResponse,
    DCLSimulationRequest,
    DCLSimulationResponse,
    ExchangeKineticsRequest,
    ExchangeKineticsResponse,
)
from app.services.dynamic_covalent_service import DynamicCovalentEngine

router = APIRouter(prefix="/dynamic-covalent", tags=["Dynamic Covalent Chemistry & Constitutional Networks"])


@router.get("/catalog", response_model=DCLCatalogResponse)
async def get_dcl_catalog():
    """Returns curated library of dynamic covalent bond motifs, building blocks, and templates."""
    return DynamicCovalentEngine.get_catalog()


@router.post("/simulate-dcl", response_model=DCLSimulationResponse)
async def simulate_dynamic_combinatorial_library(request: DCLSimulationRequest):
    """Simulates dynamic combinatorial library (DCL) equilibrium and template-induced constitutional amplification."""
    try:
        return DynamicCovalentEngine.simulate_dcl(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"DCL simulation failed: {str(e)}",
        )


@router.post("/exchange-kinetics", response_model=ExchangeKineticsResponse)
async def calculate_exchange_kinetics(request: ExchangeKineticsRequest):
    """Simulates time-course component exchange relaxation towards thermodynamic equilibrium."""
    try:
        return DynamicCovalentEngine.calculate_exchange_kinetics(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Exchange kinetics calculation failed: {str(e)}",
        )
