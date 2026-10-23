"""FastAPI endpoints for Hydrodynamic Electrochemistry & Stripping Voltammetry (PR #049)."""

from fastapi import APIRouter, HTTPException, status
from app.schemas.hydrodynamic_electrochemistry import (
    RdeSimulationRequest,
    StrippingVoltammetryRequest,
    ChronocoulometryRequest,
    HydrodynamicElectrochemistryCatalogResponse,
)
from app.models.hydrodynamic_electrochemistry import (
    RdeSimulationResult,
    StrippingVoltammetryResult,
    ChronocoulometryResult,
)
from app.services.hydrodynamic_electrochemistry_service import HydrodynamicElectrochemistryEngine

router = APIRouter(
    prefix="/hydrodynamic-electrochemistry",
    tags=["Hydrodynamic Electrochemistry, RDE, RRDE & Stripping Voltammetry"],
)


@router.get("/catalog", response_model=HydrodynamicElectrochemistryCatalogResponse)
async def get_electrochemistry_catalog():
    """Returns curated metal standards and working electrode specifications."""
    return HydrodynamicElectrochemistryEngine.get_catalog()


@router.post("/simulate-rde", response_model=RdeSimulationResult)
async def simulate_rde_hydrodynamics(request: RdeSimulationRequest):
    """Simulates Rotating Disk Electrode (RDE) Levich slopes, Koutecký-Levich kinetics, and RRDE collection."""
    try:
        return HydrodynamicElectrochemistryEngine.simulate_rde(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"RDE simulation failed: {str(e)}",
        )


@router.post("/simulate-stripping", response_model=StrippingVoltammetryResult)
async def simulate_stripping_voltammetry(request: StrippingVoltammetryRequest):
    """Simulates Anodic Stripping Voltammetry (ASV) trace heavy metal preconcentration and square-wave stripping peaks."""
    try:
        return HydrodynamicElectrochemistryEngine.simulate_stripping(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Stripping voltammetry simulation failed: {str(e)}",
        )


@router.post("/simulate-chronocoulometry", response_model=ChronocoulometryResult)
async def simulate_chronocoulometry(request: ChronocoulometryRequest):
    """Simulates Chronocoulometry Anson plot separating diffusion, double-layer capacitance, and surface excess Gamma."""
    try:
        return HydrodynamicElectrochemistryEngine.simulate_chronocoulometry(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Chronocoulometry simulation failed: {str(e)}",
        )
