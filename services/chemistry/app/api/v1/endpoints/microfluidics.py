"""FastAPI endpoints for Microfluidics, Droplets & Flow Chemistry (PR #048)."""

from fastapi import APIRouter, HTTPException, status
from app.schemas.microfluidics import (
    HydrodynamicsRequest,
    DropletGenerationRequest,
    FlowReactionRequest,
    MicrofluidicsCatalogResponse,
)
from app.models.microfluidics import (
    HydrodynamicResult,
    DropletGenerationResult,
    FlowReactionResult,
)
from app.services.microfluidics_service import (
    MicrofluidicsEngine,
    CURATED_CHIPS,
    CURATED_REACTIONS,
)

router = APIRouter(prefix="/microfluidics", tags=["Microfluidics, Droplet Chemistry & Continuous-Flow Reactors"])


@router.get("/catalog", response_model=MicrofluidicsCatalogResponse)
async def get_microfluidics_catalog():
    """Returns curated microfluidic chips, junction geometries, and benchmark flow reactions."""
    return MicrofluidicsCatalogResponse(
        chips=CURATED_CHIPS,
        reactions=CURATED_REACTIONS,
    )


@router.post("/hydrodynamics", response_model=HydrodynamicResult)
async def calculate_channel_hydrodynamics(request: HydrodynamicsRequest):
    """Calculates laminar pressure drop, hydraulic resistance, Re, Ca, and Pe."""
    try:
        return MicrofluidicsEngine.calculate_hydrodynamics(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Hydrodynamics calculation failed: {str(e)}",
        )


@router.post("/droplet-generation", response_model=DropletGenerationResult)
async def simulate_droplet_generation(request: DropletGenerationRequest):
    """Simulates droplet volume, pinch-off regime, frequency, and chaotic mixing recirculation."""
    try:
        return MicrofluidicsEngine.simulate_droplet_generation(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Droplet generation simulation failed: {str(e)}",
        )


@router.post("/flow-reactor", response_model=FlowReactionResult)
async def simulate_continuous_flow_reactor(request: FlowReactionRequest):
    """Simulates continuous-flow PFR conversion, intermediate selectivity, axial concentration profiles, and RTD."""
    try:
        return MicrofluidicsEngine.simulate_flow_reactor(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Flow reactor simulation failed: {str(e)}",
        )
