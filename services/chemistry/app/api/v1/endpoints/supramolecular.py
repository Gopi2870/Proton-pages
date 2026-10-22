"""FastAPI endpoints for Supramolecular Chemistry & Host-Guest Complexation (PR #045)."""

from fastapi import APIRouter, HTTPException, status
from app.schemas.supramolecular import (
    HostsAndGuestsCatalogResponse,
    JobPlotRequest,
    JobPlotResponse,
    BindingSimulationRequest,
    BindingSimulationResponse,
)
from app.services.supramolecular_service import SupramolecularEngine

router = APIRouter(prefix="/supramolecular", tags=["Supramolecular Chemistry & Host-Guest Complexation"])


@router.get("/catalog", response_model=HostsAndGuestsCatalogResponse)
async def get_hosts_and_guests_catalog():
    """Returns curated library of macrocyclic hosts (crown ethers, cyclodextrins, cryptands) and guests."""
    return SupramolecularEngine.get_catalog()


@router.post("/job-plot", response_model=JobPlotResponse)
async def calculate_job_plot(request: JobPlotRequest):
    """Calculates continuous variation (Job's method) curve determining 1:1, 1:2, or 2:1 binding stoichiometry."""
    try:
        return SupramolecularEngine.generate_job_plot(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Job plot calculation failed: {str(e)}",
        )


@router.post("/simulate-binding", response_model=BindingSimulationResponse)
async def simulate_host_guest_binding(request: BindingSimulationRequest):
    """Simulates titration binding isotherm, association constant Ka, ΔG°, ΔH°, and non-covalent decomposition."""
    try:
        return SupramolecularEngine.simulate_binding(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Binding simulation failed: {str(e)}",
        )
