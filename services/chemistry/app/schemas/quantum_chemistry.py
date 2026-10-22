"""
Pydantic schemas for Quantum Chemistry & Hückel Molecular Orbital API.
"""

from typing import List, Optional
from pydantic import BaseModel, Field
from app.models.quantum_chemistry import AromaticityType, OrbitalSymmetry


class ConjugatedAtomSchema(BaseModel):
    atom_id: int
    element: str = "C"
    label: str
    x_2d: float
    y_2d: float
    huckel_h: float = 0.0
    pi_electron_contribution: int = 1


class ConjugatedBondSchema(BaseModel):
    atom_i: int
    atom_j: int
    huckel_k: float = 1.0


class MolecularOrbitalLevelSchema(BaseModel):
    index: int
    energy_coefficient_m: float
    energy_ev: float
    electron_occupancy: int
    is_homo: bool
    is_lumo: bool
    is_singly_occupied: bool
    orbital_symmetry: OrbitalSymmetry
    nodal_planes_count: int
    coefficients: List[float]
    label: str


class HmoCalculationRequest(BaseModel):
    molecule_id: Optional[str] = None
    custom_atoms: Optional[List[ConjugatedAtomSchema]] = None
    custom_bonds: Optional[List[ConjugatedBondSchema]] = None
    beta_value_ev: float = Field(-2.70, le=-1.0, ge=-5.0, description="Empirical resonance integral in eV")


class HmoCalculationResponse(BaseModel):
    molecule_id: str
    molecule_name: str
    chemical_formula: str
    atom_count: int
    pi_electron_count: int
    total_pi_energy_units: float
    delocalization_energy_beta: float
    delocalization_energy_ev: float
    homo_lumo_gap_beta: float
    homo_lumo_gap_ev: float
    predicted_uv_lambda_nm: float
    aromaticity_classification: AromaticityType
    is_closed_shell: bool
    orbitals: List[MolecularOrbitalLevelSchema]
    atomic_charges: List[float]
    atomic_electron_densities: List[float]
    bond_orders: List[List[float]]
    atoms: List[ConjugatedAtomSchema]
    bonds: List[ConjugatedBondSchema]


class ConjugatedPresetSummarySchema(BaseModel):
    id: str
    name: str
    formula: str
    atom_count: int
    pi_electron_count: int
    expected_aromaticity: AromaticityType
    is_cyclic: bool
    description: str
    pedagogical_notes: str
