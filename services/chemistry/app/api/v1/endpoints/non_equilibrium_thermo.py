"""FastAPI endpoints for Non-Equilibrium Thermodynamics & Onsager Reciprocal Relations (PR #044)."""

from typing import List
from fastapi import APIRouter, HTTPException, status
from app.schemas.non_equilibrium_thermo import (
    BenchmarkSystemSummary,
    TransportCouplingRequest,
    TransportCouplingResponse,
    ThermoelectricAnalysisRequest,
    ThermoelectricAnalysisResponse,
    ElectrokineticAnalysisRequest,
    ElectrokineticAnalysisResponse,
    ThermodiffusionAnalysisRequest,
    ThermodiffusionAnalysisResponse,
)
from app.services.non_equilibrium_thermo_service import NonEquilibriumThermoEngine

router = APIRouter(prefix="/non-equilibrium-thermo", tags=["Non-Equilibrium Thermodynamics & Onsager Relations"])


@router.get("/benchmarks", response_model=List[BenchmarkSystemSummary])
async def get_benchmark_systems():
    """Returns curated coupled transport regimes (Thermoelectric, Thermodiffusion, Electrokinetic)."""
    return NonEquilibriumThermoEngine.get_benchmark_systems()


@router.post("/evaluate-transport", response_model=TransportCouplingResponse)
async def evaluate_transport_coupling(request: TransportCouplingRequest):
    """Evaluates arbitrary phenomenological transport matrix, eigenvalues, and entropy production."""
    try:
        return NonEquilibriumThermoEngine.evaluate_transport_coupling(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Transport coupling evaluation failed: {str(e)}",
        )


@router.post("/thermoelectric", response_model=ThermoelectricAnalysisResponse)
async def evaluate_thermoelectric_transport(request: ThermoelectricAnalysisRequest):
    """Simulates coupled Seebeck and Peltier thermoelectric transport and validates Second Kelvin Law."""
    try:
        return NonEquilibriumThermoEngine.evaluate_thermoelectric_system(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Thermoelectric evaluation failed: {str(e)}",
        )


@router.post("/electrokinetic", response_model=ElectrokineticAnalysisResponse)
async def evaluate_electrokinetic_transport(request: ElectrokineticAnalysisRequest):
    """Simulates electro-osmosis and streaming potential, verifying Saxén reciprocal relations."""
    try:
        return NonEquilibriumThermoEngine.evaluate_electrokinetic_system(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Electrokinetic evaluation failed: {str(e)}",
        )


@router.post("/thermodiffusion", response_model=ThermodiffusionAnalysisResponse)
async def evaluate_thermodiffusion_transport(request: ThermodiffusionAnalysisRequest):
    """Simulates Soret mass diffusion and Dufour heat flux, verifying Onsager cross-coupling reciprocity."""
    try:
        return NonEquilibriumThermoEngine.evaluate_thermodiffusion_system(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Thermodiffusion evaluation failed: {str(e)}",
        )

