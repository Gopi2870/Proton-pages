"""
Domain models for Computational Quantum Chemistry & DFT Kohn-Sham Solver (PR #052).
Encompasses exchange-correlation functionals (LDA, BLYP, B3LYP), SCF convergence,
orbital eigenvalues, MEP surface potential, and TD-DFT excitations.
"""
from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class KohnShamOrbital(BaseModel):
    orbital_index: int
    symmetry_label: str
    energy_ev: float
    occupation: float = Field(..., ge=0.0, le=2.0)
    is_homo: bool = False
    is_lumo: bool = False
    dominant_atomic_orbitals: List[str] = Field(default_factory=list)


class ScfIterationStep(BaseModel):
    iteration: int
    electronic_energy_hartree: float
    energy_change_hartree: float
    diis_error_norm: float
    damping_factor: float


class MepSpatialPoint(BaseModel):
    x: float
    y: float
    z: float
    electron_density: float
    electrostatic_potential_au: float


class TdDftExcitation(BaseModel):
    state_index: int
    excitation_energy_ev: float
    wavelength_nm: float
    oscillator_strength_f: float
    dominant_transition: str  # e.g., "HOMO -> LUMO (94.2%)"


class DftPresetMolecule(BaseModel):
    id: str
    name: str
    formula: str
    smiles: str
    point_group: str
    stoichiometry: Dict[str, int]
    default_functional: str
    nuclear_repulsion_energy_hartree: float
    scf_converged_energy_hartree: float
    homo_energy_ev: float
    lumo_energy_ev: float
    dipole_moment_debye: float
