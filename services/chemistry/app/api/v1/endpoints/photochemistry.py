"""FastAPI endpoints for Photochemistry & Jablonski Diagrams (PR #047)."""

from fastapi import APIRouter, HTTPException, status
from app.schemas.photochemistry import (
    PhotochemistryCatalogResponse,
    JablonskiSimulationRequest,
    JablonskiSimulationResponse,
    SternVolmerRequest,
    SternVolmerResponse,
    FretSimulationRequest,
    FretSimulationResponse,
)
from app.services.photochemistry_service import PhotochemistryEngine

router = APIRouter(prefix="/photochemistry", tags=["Photochemistry, Jablonski Diagrams & FRET Dynamics"])


@router.get("/catalog", response_model=PhotochemistryCatalogResponse)
async def get_photochemistry_catalog():
    """Returns curated library of fluorophores, quenchers, and FRET donor-acceptor pairs."""
    return PhotochemistryEngine.get_catalog()


@router.post("/simulate-jablonski", response_model=JablonskiSimulationResponse)
async def simulate_jablonski_manifold(request: JablonskiSimulationRequest):
    """Simulates Jablonski electronic state manifold, radiative/non-radiative decay rates, and quantum yields."""
    try:
        return PhotochemistryEngine.simulate_jablonski(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Jablonski simulation failed: {str(e)}",
        )


@router.post("/stern-volmer", response_model=SternVolmerResponse)
async def calculate_stern_volmer_quenching(request: SternVolmerRequest):
    """Calculates Stern-Volmer collisional quenching plot and bimolecular quenching constant kq."""
    try:
        return PhotochemistryEngine.calculate_stern_volmer(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Stern-Volmer calculation failed: {str(e)}",
        )


@router.post("/simulate-fret", response_model=FretSimulationResponse)
async def simulate_fret_efficiency(request: FretSimulationRequest):
    """Simulates Förster Resonance Energy Transfer (FRET) efficiency curve and spectroscopic nanoruler."""
    try:
        return PhotochemistryEngine.simulate_fret(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"FRET simulation failed: {str(e)}",
        )
