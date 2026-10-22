"""
Domain models for Crystallography, 14 Bravais Lattices, Miller Indices, and XRD Diffractograms.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
from enum import Enum


class CrystalSystem(str, Enum):
    CUBIC = "cubic"
    TETRAGONAL = "tetragonal"
    ORTHORHOMBIC = "orthorhombic"
    HEXAGONAL = "hexagonal"
    RHOMBOHEDRAL = "rhombohedral"
    MONOCLINIC = "monoclinic"
    TRICLINIC = "triclinic"


class BravaisLatticeType(str, Enum):
    PRIMITIVE_CUBIC = "primitive_cubic"
    BODY_CENTERED_CUBIC = "body_centered_cubic"
    FACE_CENTERED_CUBIC = "face_centered_cubic"
    PRIMITIVE_TETRAGONAL = "primitive_tetragonal"
    BODY_CENTERED_TETRAGONAL = "body_centered_tetragonal"
    PRIMITIVE_ORTHORHOMBIC = "primitive_orthorhombic"
    BASE_CENTERED_ORTHORHOMBIC = "base_centered_orthorhombic"
    BODY_CENTERED_ORTHORHOMBIC = "body_centered_orthorhombic"
    FACE_CENTERED_ORTHORHOMBIC = "face_centered_orthorhombic"
    HEXAGONAL = "hexagonal"
    RHOMBOHEDRAL = "rhombohedral"
    PRIMITIVE_MONOCLINIC = "primitive_monoclinic"
    BASE_CENTERED_MONOCLINIC = "base_centered_monoclinic"
    TRICLINIC = "triclinic"


class XRaySource(str, Enum):
    CU_KA = "Cu_Ka"  # 1.54060 Angstrom
    MO_KA = "Mo_Ka"  # 0.71073 Angstrom
    CO_KA = "Co_Ka"  # 1.78901 Angstrom
    CR_KA = "Cr_Ka"  # 2.28970 Angstrom


@dataclass
class FractionalAtom:
    element: str
    x: float
    y: float
    z: float
    occupancy: float = 1.0
    wyckoff: Optional[str] = None


@dataclass
class MillerPlane:
    h: int
    k: int
    l: int
    d_spacing_angstrom: float
    two_theta_degrees: float
    intensity_relative: float  # Normalized 0-100
    multiplicity: int
    structure_factor_mag: float


@dataclass
class UnitCellGeometry:
    a: float  # Angstroms
    b: float
    c: float
    alpha: float  # degrees
    beta: float
    gamma: float
    volume_angstrom3: float
    crystal_system: CrystalSystem
    bravais_lattice: BravaisLatticeType
    formula_units_z: int
    density_g_cm3: float
    packing_efficiency: float  # 0.0 to 1.0


@dataclass
class XrdDiffractionSpectrum:
    crystal_id: str
    crystal_name: str
    chemical_formula: str
    x_ray_source: XRaySource
    wavelength_angstrom: float
    peaks: List[MillerPlane]
    two_theta_grid: List[float]
    intensity_profile: List[float]
    highest_intensity_peak: MillerPlane


@dataclass
class CrystalStructurePreset:
    id: str
    name: str
    formula: str
    crystal_system: CrystalSystem
    bravais_lattice: BravaisLatticeType
    space_group: str
    a: float
    b: float
    c: float
    alpha: float = 90.0
    beta: float = 90.0
    gamma: float = 90.0
    z: int = 1
    molar_mass_g_mol: float = 0.0
    basis_atoms: List[FractionalAtom] = field(default_factory=list)
    description: str = ""
    practical_applications: List[str] = field(default_factory=list)
