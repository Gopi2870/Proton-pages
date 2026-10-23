"""
Pydantic schemas for Computational Quantum Chemistry & DFT Kohn-Sham API (PR #052).
"""
from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from app.models.dft_quantum import (
    KohnShamOrbital,
    ScfIterationStep,
    MepSpatialPoint,
    TdDftExcitation,
    DftPresetMolecule,
)


class DftCalculationRequest(BaseModel):
    molecule_id: str = Field(default="benzene", description="Preset molecule ID (e.g. water, ethylene, benzene, formaldehyde)")
    functional: str = Field(default="B3LYP", description="Exchange-correlation functional: LDA, BLYP, or B3LYP")
    basis_set: str = Field(default="6-31G(d)", description="Basis set: STO-3G, 6-31G, or 6-31G(d)")
    scf_max_cycles: int = Field(default=50, ge=10, le=200)
    convergence_threshold: float = Field(default=1e-6, ge=1e-10, le=1e-3)
    enable_diis: bool = Field(default=True, description="Direct Inversion in the Iterative Subspace damping")


class DftCalculationResponse(BaseModel):
    molecule_name: str
    formula: str
    functional: str
    basis_set: str
    total_energy_hartree: float
    electronic_energy_hartree: float
    nuclear_repulsion_energy_hartree: float
    scf_converged: bool
    iterations_count: int
    scf_history: List[ScfIterationStep]
    homo_lumo_gap_ev: float
    chemical_hardness_ev: float
    electronegativity_ev: float
    dipole_moment_debye: float
    orbitals: List[KohnShamOrbital]


class TdDftRequest(BaseModel):
    molecule_id: str = Field(default="benzene")
    functional: str = Field(default="B3LYP")
    n_excited_states: int = Field(default=5, ge=1, le=20)


class TdDftResponse(BaseModel):
    molecule_name: str
    states: List[TdDftExcitation]
    absorption_max_wavelength_nm: float


class MepSurfaceRequest(BaseModel):
    molecule_id: str = Field(default="water")
    grid_resolution: int = Field(default=20, ge=10, le=50)


class MepSurfaceResponse(BaseModel):
    molecule_name: str
    min_potential_au: float
    max_potential_au: float
    points: List[MepSpatialPoint]
