"""
Domain models for 230 Crystallographic Space Groups, Wyckoff Positions,
Symmetry Operations, Metric Tensors, and Powder XRD Bragg Diffraction.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import List, Dict, Tuple, Optional, Any


class CrystalSystem(str, Enum):
    TRICLINIC = "triclinic"
    MONOCLINIC = "monoclinic"
    ORTHORHOMBIC = "orthorhombic"
    TETRAGONAL = "tetragonal"
    TRIGONAL = "trigonal"
    HEXAGONAL = "hexagonal"
    CUBIC = "cubic"


class CenteringType(str, Enum):
    PRIMITIVE = "P"
    BODY_CENTERED = "I"
    FACE_CENTERED = "F"
    BASE_CENTERED_C = "C"
    BASE_CENTERED_A = "A"
    BASE_CENTERED_B = "B"
    RHOMBOHEDRAL = "R"


class XRayRadiationSource(str, Enum):
    CU_KA = "Cu_Ka"  # 1.54060 Angstrom
    MO_KA = "Mo_Ka"  # 0.71073 Angstrom
    CO_KA = "Co_Ka"  # 1.78901 Angstrom
    CR_KA = "Cr_Ka"  # 2.28970 Angstrom
    FE_KA = "Fe_Ka"  # 1.93604 Angstrom


@dataclass
class SymmetryOperation:
    """
    Representation of an affine crystallographic symmetry operation:
    r' = W * r + w  (mod 1)
    """
    jones_faithful: str
    rotation_matrix: List[List[float]]  # 3x3 rotation/inversion/reflection matrix
    translation_vector: List[float]     # 3x1 fractional translation vector
    is_identity: bool = False
    is_inversion: bool = False
    rotation_order: int = 1             # 1, 2, 3, 4, 6
    determinant: float = 1.0            # +1 for proper rotations, -1 for improper


@dataclass
class WyckoffSite:
    """
    A single Wyckoff position site within a space group.
    """
    multiplicity: int
    letter: str
    site_symmetry: str                  # Point group at site, e.g. "m-3m", "2/m", "1"
    coordinate_generator: str           # e.g. "(0, 0, 0)", "(x, x, x)", "(x, y, z)"
    coordinates: List[str] = field(default_factory=list)  # List of coordinate strings
    provenance: str = "International Tables for Crystallography Vol. A (2016)"


@dataclass
class FractionalSiteCoordinate:
    """
    A generated fractional coordinate site in unit cell.
    """
    element: str
    x: float
    y: float
    z: float
    occupancy: float = 1.0
    wyckoff_letter: str = ""
    site_multiplicity: int = 1
    thermal_factor_b: float = 0.5  # Debye-Waller B-factor in Angstrom^2


@dataclass
class CartesianCoordinate:
    """
    Direct Cartesian coordinate (x, y, z) in Angstroms.
    """
    element: str
    x_angstrom: float
    y_angstrom: float
    z_angstrom: float
    occupancy: float = 1.0
    site_label: str = ""


@dataclass
class SpaceGroupMetadata:
    """
    Comprehensive metadata for any of the 230 space groups.
    """
    number: int                         # 1 to 230
    hermann_mauguin: str                # e.g. "Fm-3m"
    hermann_mauguin_full: str           # e.g. "F 4/m -3 2/m"
    hall_symbol: str                    # e.g. "-F 4 2 3"
    schoenflies: str                    # e.g. "Oh^5"
    crystal_system: CrystalSystem
    point_group: str                    # e.g. "m-3m"
    laue_class: str                     # e.g. "m-3m"
    centering: CenteringType
    is_centrosymmetric: bool
    general_multiplicity: int           # Multiplicity of general position (e.g. 192 for Fm-3m)
    wyckoff_letters: List[str] = field(default_factory=list)
    description: str = ""


@dataclass
class SpaceGroupDetails(SpaceGroupMetadata):
    """
    Full space group details including all symmetry operators and Wyckoff sites.
    """
    symmetry_operations: List[SymmetryOperation] = field(default_factory=list)
    wyckoff_sites: List[WyckoffSite] = field(default_factory=list)


@dataclass
class UnitCellParameters:
    a: float  # Angstroms
    b: float
    c: float
    alpha: float  # Degrees
    beta: float
    gamma: float


@dataclass
class MetricTensorResult:
    unit_cell: UnitCellParameters
    volume_angstrom3: float
    direct_metric_tensor: List[List[float]]      # 3x3 G matrix
    reciprocal_metric_tensor: List[List[float]]  # 3x3 G* matrix
    direct_to_cartesian_matrix: List[List[float]]  # 3x3 Busing-Levy matrix M
    cartesian_to_direct_matrix: List[List[float]]  # 3x3 M^-1 matrix
    reciprocal_a_star: float                     # Angstrom^-1
    reciprocal_b_star: float
    reciprocal_c_star: float
    reciprocal_alpha_star: float                 # Degrees
    reciprocal_beta_star: float
    reciprocal_gamma_star: float


@dataclass
class BraggDiffractionPeak:
    h: int
    k: int
    l: int
    d_spacing_angstrom: float
    two_theta_degrees: float
    structure_factor_real: float
    structure_factor_imag: float
    structure_factor_magnitude: float
    phase_degrees: float
    form_factor_contributions: Dict[str, float]
    multiplicity: int
    lorentz_polarization_factor: float
    intensity_raw: float
    intensity_relative: float           # 0 to 100%
    is_systematic_absence: bool = False
    extinction_condition: str = ""


@dataclass
class PowderDiffractionPattern:
    space_group_number: int
    space_group_symbol: str
    radiation_source: XRayRadiationSource
    wavelength_angstrom: float
    peaks: List[BraggDiffractionPeak]
    two_theta_grid: List[float]         # Discretized 2theta values
    intensity_profile: List[float]      # Broadened continuous diffractogram
    maximum_intensity_peak: Optional[BraggDiffractionPeak] = None
    total_allowed_reflections: int = 0
    total_extinct_reflections: int = 0
