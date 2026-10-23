"""
FastAPI Endpoints for Semi-Empirical Quantum Chemistry Engine (PR #057).
Provides MNDO, AM1, and PM3 Hamiltonians, DIIS SCF convergence,
Mulliken population analysis, dipole moments, and PES bond scans.
"""
from typing import Dict, List
from fastapi import APIRouter, HTTPException, Query

from app.models.semi_empirical import (
    AtomCoordinate,
    SemiEmpiricalMethod,
    SemiEmpiricalPresetMolecule,
)
from app.schemas.semi_empirical import (
    ParameterSetInfoResponse,
    PesScanRequest,
    PesScanResponse,
    SemiEmpiricalCalculationRequest,
    SemiEmpiricalCalculationResponse,
)
from app.services.semi_empirical_parameters import (
    AM1_PARAMETERS,
    MNDO_PARAMETERS,
    PM3_PARAMETERS,
    PRESET_MOLECULES,
)
from app.services.semi_empirical_service import SemiEmpiricalEngine

router = APIRouter(prefix="/chemistry/semi-empirical", tags=["semi-empirical"])

LITERATURE_CITATIONS = {
    SemiEmpiricalMethod.MNDO: "Dewar, M. J. S.; Thiel, W. J. Am. Chem. Soc. 1977, 99 (15), 4899-4907.",
    SemiEmpiricalMethod.AM1: "Dewar, M. J. S.; Zoebisch, E. G.; Ealy, E. F.; Stewart, J. J. P. J. Am. Chem. Soc. 1985, 107 (13), 3902-3909.",
    SemiEmpiricalMethod.PM3: "Stewart, J. J. P. J. Comput. Chem. 1989, 10 (2), 209-220.",
}


@router.get("/presets", response_model=List[SemiEmpiricalPresetMolecule])
def get_presets():
    """Returns curated reference molecules with experimental geometries and literature benchmark values."""
    return SemiEmpiricalEngine.get_preset_molecules()


@router.get("/presets/{preset_id}", response_model=SemiEmpiricalPresetMolecule)
def get_preset_by_id(preset_id: str):
    """Returns details for a specific benchmark preset molecule."""
    preset = SemiEmpiricalEngine.get_preset_by_id(preset_id)
    if not preset:
        raise HTTPException(status_code=404, detail=f"Preset molecule '{preset_id}' not found.")
    return preset


@router.get("/parameters", response_model=List[ParameterSetInfoResponse])
def get_parameters(method: SemiEmpiricalMethod = Query(None)):
    """Returns atomic parameter catalogs and citations for supported semi-empirical Hamiltonians."""
    methods_to_return = [method] if method else [SemiEmpiricalMethod.MNDO, SemiEmpiricalMethod.AM1, SemiEmpiricalMethod.PM3]
    results = []

    for m in methods_to_return:
        params = SemiEmpiricalEngine.get_parameters_for_method(m)
        results.append(
            ParameterSetInfoResponse(
                method=m,
                citation=LITERATURE_CITATIONS[m],
                elements=params,
            )
        )
    return results


@router.post("/calculate", response_model=SemiEmpiricalCalculationResponse)
def calculate_semi_empirical(req: SemiEmpiricalCalculationRequest):
    """
    Solves the self-consistent field (SCF) semi-empirical secular equations using Roothaan-Hall
    and Pulay DIIS acceleration for a given molecule geometry or preset.
    """
    preset_info = None
    atoms_to_use: List[AtomCoordinate] = []

    if req.preset_id:
        preset_info = SemiEmpiricalEngine.get_preset_by_id(req.preset_id)
        if not preset_info:
            raise HTTPException(status_code=404, detail=f"Preset '{req.preset_id}' not found.")
        atoms_to_use = preset_info.atoms
    elif req.atoms and len(req.atoms) > 0:
        atoms_to_use = req.atoms
    else:
        # Default to water preset if neither provided
        preset_info = PRESET_MOLECULES["water"]
        atoms_to_use = preset_info.atoms

    try:
        result = SemiEmpiricalEngine.solve(
            atoms=atoms_to_use,
            method=req.method,
            max_iterations=req.max_iterations,
            energy_tolerance_ev=req.energy_tolerance_ev,
            density_tolerance=req.density_tolerance,
        )
        return SemiEmpiricalCalculationResponse(
            success=True,
            result=result,
            preset_info=preset_info,
            message="SCF calculation completed successfully.",
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Semi-empirical solver error: {str(e)}")


@router.post("/pes-scan", response_model=PesScanResponse)
def scan_potential_energy_surface(req: PesScanRequest):
    """
    Computes a 1D Potential Energy Surface (PES) curve by scanning an interatomic bond coordinate.
    """
    atoms_to_use: List[AtomCoordinate] = []
    if req.preset_id:
        preset = SemiEmpiricalEngine.get_preset_by_id(req.preset_id)
        if not preset:
            raise HTTPException(status_code=404, detail=f"Preset '{req.preset_id}' not found.")
        atoms_to_use = preset.atoms
    elif req.atoms and len(req.atoms) > 0:
        atoms_to_use = req.atoms
    else:
        atoms_to_use = PRESET_MOLECULES["water"].atoms

    try:
        points = SemiEmpiricalEngine.scan_potential_energy_surface(
            atoms=atoms_to_use,
            atom_idx_1=req.atom_idx_1,
            atom_idx_2=req.atom_idx_2,
            start_distance=req.start_distance,
            end_distance=req.end_distance,
            steps=req.steps,
            method=req.method,
        )

        converged_points = [p for p in points if p.converged]
        eq_dist = None
        well_depth = None
        if converged_points:
            min_pt = min(converged_points, key=lambda p: p.total_energy_ev)
            eq_dist = min_pt.coordinate_value
            max_pt = max(converged_points, key=lambda p: p.total_energy_ev)
            well_depth = round(max_pt.relative_energy_kcal_mol, 3)

        return PesScanResponse(
            success=True,
            method=req.method,
            atom_idx_1=req.atom_idx_1,
            atom_idx_2=req.atom_idx_2,
            points=points,
            equilibrium_distance_angstrom=eq_dist,
            well_depth_kcal_mol=well_depth,
            message="PES scan completed successfully.",
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PES scan error: {str(e)}")
