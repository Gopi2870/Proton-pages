"""
Domain models for Quantum Chemistry, Hückel Molecular Orbital (HMO) Theory, and Conjugated Pi-Systems.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Tuple
from enum import Enum


class AromaticityType(str, Enum):
    AROMATIC = "aromatic"  # 4n + 2 pi electrons, closed shell, significant delocalization energy
    ANTI_AROMATIC = "anti_aromatic"  # 4n pi electrons in planar ring, open shell / unstable
    NON_AROMATIC = "non_aromatic"  # Non-cyclic or non-conjugated or non-planar


class OrbitalSymmetry(str, Enum):
    SYMMETRIC = "symmetric"  # S (gerade or mirror symmetric)
    ANTISYMMETRIC = "antisymmetric"  # A (ungerade or mirror antisymmetric)
    DEGENERATE = "degenerate"


@dataclass
class MolecularOrbitalLevel:
    index: int  # 1 to N (1 is lowest energy)
    energy_coefficient_m: float  # In E = alpha + m * beta
    energy_ev: float  # Numerical energy in electron-volts (using beta ~ -2.7 eV)
    electron_occupancy: int  # 0, 1, or 2 electrons
    is_homo: bool
    is_lumo: bool
    is_singly_occupied: bool  # SOMO (free radical)
    orbital_symmetry: OrbitalSymmetry
    nodal_planes_count: int
    coefficients: List[float]  # c_kr eigenvector coefficients at each atomic center
    label: str  # e.g., "psi_1", "psi_2*"


@dataclass
class ConjugatedAtom:
    atom_id: int
    element: str
    label: str
    x_2d: float
    y_2d: float
    huckel_h: float = 0.0  # Coulomb parameter shift for heteroatoms (alpha_X = alpha + h*beta)
    pi_electron_contribution: int = 1  # Standard sp2 carbon contributes 1 pi electron


@dataclass
class ConjugatedBond:
    atom_i: int
    atom_j: int
    huckel_k: float = 1.0  # Resonance integral parameter (beta_ij = k*beta)


@dataclass
class HmoCalculationResult:
    molecule_id: str
    molecule_name: str
    chemical_formula: str
    atom_count: int
    pi_electron_count: int
    total_pi_energy_units: float  # In terms of (N_pi * alpha + X * beta)
    delocalization_energy_beta: float  # E_deloc in units of |beta|
    delocalization_energy_ev: float
    homo_lumo_gap_beta: float  # Delta E in units of |beta|
    homo_lumo_gap_ev: float
    predicted_uv_lambda_nm: float  # Wavelength for HOMO -> LUMO transition
    aromaticity_classification: AromaticityType
    is_closed_shell: bool
    orbitals: List[MolecularOrbitalLevel]
    atomic_charges: List[float]  # Net pi charge zeta_r = 1 - q_r
    atomic_electron_densities: List[float]  # q_r
    bond_orders: List[List[float]]  # p_rs bond order matrix
    atoms: List[ConjugatedAtom]
    bonds: List[ConjugatedBond]


@dataclass
class ConjugatedSystemPreset:
    id: str
    name: str
    formula: str
    description: str
    atoms: List[ConjugatedAtom]
    bonds: List[ConjugatedBond]
    expected_aromaticity: AromaticityType
    is_cyclic: bool
    pedagogical_notes: str
