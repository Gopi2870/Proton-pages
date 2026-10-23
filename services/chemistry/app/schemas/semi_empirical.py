"""
Pydantic Schemas for Semi-Empirical Quantum Chemistry Endpoints (PR #057).
"""
from typing import Dict, List, Optional
from pydantic import BaseModel, Field

from app.models.semi_empirical import (
    AtomCoordinate,
    ElementParameters,
    PesScanPoint,
    SemiEmpiricalCalculationResult,
    SemiEmpiricalMethod,
    SemiEmpiricalPresetMolecule,
)


class SemiEmpiricalCalculationRequest(BaseModel):
    """Request payload for running a semi-empirical quantum calculation."""
    preset_id: Optional[str] = Field(None, description="Preset molecule identifier (e.g. 'water', 'methane', 'ammonia')")
    atoms: Optional[List[AtomCoordinate]] = Field(None, description="Custom Cartesian atomic coordinates in Angstroms")
    method: SemiEmpiricalMethod = Field(SemiEmpiricalMethod.AM1, description="Semi-empirical Hamiltonian: MNDO, AM1, or PM3")
    max_iterations: int = Field(60, ge=5, le=200, description="Maximum SCF cycles")
    energy_tolerance_ev: float = Field(1e-6, ge=1e-10, le=1e-3, description="SCF energy convergence threshold in eV")
    density_tolerance: float = Field(1e-5, ge=1e-8, le=1e-2, description="SCF density matrix maximum element change threshold")


class SemiEmpiricalCalculationResponse(BaseModel):
    """Response payload containing full SCF converged properties."""
    success: bool
    result: Optional[SemiEmpiricalCalculationResult] = None
    preset_info: Optional[SemiEmpiricalPresetMolecule] = None
    message: Optional[str] = None


class PesScanRequest(BaseModel):
    """Request payload for 1D potential energy surface bond coordinate scanning."""
    preset_id: Optional[str] = Field(None, description="Preset molecule ID")
    atoms: Optional[List[AtomCoordinate]] = Field(None, description="Coordinates if not using preset")
    atom_idx_1: int = Field(..., description="First atom index (fixed center)")
    atom_idx_2: int = Field(..., description="Second atom index (displaced along bond vector)")
    start_distance: float = Field(0.7, ge=0.4, le=10.0, description="Starting bond distance in Angstroms")
    end_distance: float = Field(2.5, ge=0.5, le=15.0, description="Ending bond distance in Angstroms")
    steps: int = Field(15, ge=5, le=50, description="Number of evaluation points along coordinate")
    method: SemiEmpiricalMethod = Field(SemiEmpiricalMethod.AM1, description="Semi-empirical method")


class PesScanResponse(BaseModel):
    """Potential energy surface response with equilibrium point identification."""
    success: bool
    method: SemiEmpiricalMethod
    atom_idx_1: int
    atom_idx_2: int
    points: List[PesScanPoint]
    equilibrium_distance_angstrom: Optional[float] = None
    well_depth_kcal_mol: Optional[float] = None
    message: Optional[str] = None


class ParameterSetInfoResponse(BaseModel):
    """Overview of atomic parameters and literature citations for a Hamiltonian."""
    method: SemiEmpiricalMethod
    citation: str
    elements: Dict[str, ElementParameters]
