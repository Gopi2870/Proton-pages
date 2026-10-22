"""FastAPI endpoints for Statistical Thermodynamics & Molecular Partition Functions (PR #043)."""

from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models.statistical_thermo import MoleculeSpec
from app.schemas.statistical_thermo import (
    MoleculeSummary,
    PartitionFunctionCalculationRequest,
    PartitionFunctionCalculationResponse,
    TemperatureSweepRequest,
    TemperatureSweepResponse,
)
from app.services.statistical_thermo_service import StatisticalThermoEngine

router = APIRouter(prefix="/statistical-thermo", tags=["Statistical Thermodynamics & Partition Functions"])


@router.get("/molecules", response_model=List[MoleculeSummary])
async def get_curated_molecules():
    """Returns curated library of molecules with rotational constants and vibrational modes."""
    return StatisticalThermoEngine.get_molecules()


@router.get("/molecules/{molecule_id}", response_model=MoleculeSpec)
async def get_molecule_detail(molecule_id: str):
    """Returns detailed molecular parameters for a specific molecule."""
    mol = StatisticalThermoEngine.get_molecule(molecule_id)
    if not mol:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Molecule '{molecule_id}' not found in catalog.",
        )
    return mol


@router.post("/calculate", response_model=PartitionFunctionCalculationResponse)
async def calculate_partition_functions(request: PartitionFunctionCalculationRequest):
    """Computes molecular partition functions and derived macroscopic thermodynamic state functions."""
    try:
        return StatisticalThermoEngine.calculate(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Statistical thermodynamic calculation failed: {str(e)}",
        )


@router.post("/temperature-sweep", response_model=TemperatureSweepResponse)
async def calculate_temperature_sweep(request: TemperatureSweepRequest):
    """Generates temperature dependence curve showing quantum freeze-out of degrees of freedom."""
    try:
        return StatisticalThermoEngine.temperature_sweep(request)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Temperature sweep calculation failed: {str(e)}",
        )
