"""
API Endpoints for Computational Quantum Chemistry & DFT Kohn-Sham Solver (PR #052).
"""
from typing import List
from fastapi import APIRouter
from app.models.dft_quantum import DftPresetMolecule
from app.schemas.dft_quantum import (
    DftCalculationRequest,
    DftCalculationResponse,
    TdDftRequest,
    TdDftResponse,
    MepSurfaceRequest,
    MepSurfaceResponse,
)
from app.services.dft_quantum_service import DftKohnShamEngine

router = APIRouter(prefix="/dft-quantum", tags=["Computational Quantum Chemistry & DFT Kohn-Sham"])


@router.get("/presets", response_model=List[DftPresetMolecule], summary="Get preset benchmark molecules")
async def get_presets():
    """Returns curated benchmark molecular systems with point group symmetries and reference DFT energies."""
    return DftKohnShamEngine.get_preset_molecules()


@router.post("/calculate-scf", response_model=DftCalculationResponse, summary="Solve Kohn-Sham SCF secular equations")
async def calculate_scf(request: DftCalculationRequest):
    """Executes Self-Consistent Field (SCF) iterations with Pulay DIIS convergence and orbital energy ladder."""
    return DftKohnShamEngine.solve_dft(request)


@router.post("/td-dft", response_model=TdDftResponse, summary="Compute Time-Dependent DFT electronic excitations")
async def calculate_td_dft(request: TdDftRequest):
    """Calculates singlet excitation energies, wavelengths, and transition dipole oscillator strengths."""
    return DftKohnShamEngine.calculate_td_dft(request)


@router.post("/mep-surface", response_model=MepSurfaceResponse, summary="Generate Molecular Electrostatic Potential grid")
async def generate_mep_surface(request: MepSurfaceRequest):
    """Generates 3D electron density and electrostatic potential spatial grid for isosurface rendering."""
    return DftKohnShamEngine.generate_mep_surface(request)
