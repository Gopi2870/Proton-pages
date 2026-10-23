"""
Pydantic v2 schemas for Crystallographic Space Groups, Wyckoff Sites,
Metric Tensors, and Powder XRD Simulation.
"""

from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field
from app.models.crystallography_spacegroup import CrystalSystem, CenteringType, XRayRadiationSource


class SymmetryOperationSchema(BaseModel):
    jones_faithful: str
    rotation_matrix: List[List[float]]
    translation_vector: List[float]
    is_identity: bool
    is_inversion: bool
    rotation_order: int
    determinant: float


class WyckoffSiteSchema(BaseModel):
    multiplicity: int
    letter: str
    site_symmetry: str
    coordinate_generator: str
    coordinates: List[str] = Field(default_factory=list)
    provenance: str = "International Tables for Crystallography Vol. A (2016)"


class SpaceGroupSummarySchema(BaseModel):
    number: int
    hermann_mauguin: str
    hermann_mauguin_full: str
    hall_symbol: str
    schoenflies: str
    crystal_system: CrystalSystem
    point_group: str
    laue_class: str
    centering: CenteringType
    is_centrosymmetric: bool
    general_multiplicity: int
    wyckoff_letters: List[str] = Field(default_factory=list)
    description: str = ""


class SpaceGroupDetailSchema(SpaceGroupSummarySchema):
    symmetry_operations: List[SymmetryOperationSchema] = Field(default_factory=list)
    wyckoff_sites: List[WyckoffSiteSchema] = Field(default_factory=list)


class FractionalCoordinateSchema(BaseModel):
    element: str
    x: float
    y: float
    z: float
    occupancy: float = 1.0
    wyckoff_letter: str = ""
    site_multiplicity: int = 1
    thermal_factor_b: float = 0.5


class WyckoffOrbitRequest(BaseModel):
    space_group_number: int = Field(..., ge=1, le=230)
    element: str = Field(default="Na")
    x: float = Field(default=0.0)
    y: float = Field(default=0.0)
    z: float = Field(default=0.0)
    tolerance: float = Field(default=1e-4, ge=1e-6, le=1e-2)


class WyckoffOrbitResponse(BaseModel):
    space_group_number: int
    element: str
    initial_coordinate: List[float]
    multiplicity: int
    coordinates: List[FractionalCoordinateSchema]


class UnitCellParametersSchema(BaseModel):
    a: float = Field(..., gt=0.1, description="Lattice parameter a in Angstroms")
    b: float = Field(..., gt=0.1, description="Lattice parameter b in Angstroms")
    c: float = Field(..., gt=0.1, description="Lattice parameter c in Angstroms")
    alpha: float = Field(default=90.0, gt=10.0, lt=170.0, description="Angle alpha in degrees")
    beta: float = Field(default=90.0, gt=10.0, lt=170.0, description="Angle beta in degrees")
    gamma: float = Field(default=90.0, gt=10.0, lt=170.0, description="Angle gamma in degrees")


class MetricTensorResponse(BaseModel):
    unit_cell: UnitCellParametersSchema
    volume_angstrom3: float
    direct_metric_tensor: List[List[float]]
    reciprocal_metric_tensor: List[List[float]]
    direct_to_cartesian_matrix: List[List[float]]
    cartesian_to_direct_matrix: List[List[float]]
    reciprocal_a_star: float
    reciprocal_b_star: float
    reciprocal_c_star: float
    reciprocal_alpha_star: float
    reciprocal_beta_star: float
    reciprocal_gamma_star: float


class CartesianCoordinateSchema(BaseModel):
    element: str
    x_angstrom: float
    y_angstrom: float
    z_angstrom: float
    occupancy: float = 1.0
    site_label: str = ""


class CartesianConvertRequest(BaseModel):
    unit_cell: UnitCellParametersSchema
    fractional_coordinates: List[FractionalCoordinateSchema]


class CartesianConvertResponse(BaseModel):
    cartesian_coordinates: List[CartesianCoordinateSchema]


class BraggDiffractionPeakSchema(BaseModel):
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
    intensity_relative: float
    is_systematic_absence: bool
    extinction_condition: str = ""


class PowderXrdSimRequest(BaseModel):
    space_group_number: int = Field(default=225, ge=1, le=230)
    unit_cell: UnitCellParametersSchema
    atoms: List[FractionalCoordinateSchema]
    radiation_source: XRayRadiationSource = Field(default=XRayRadiationSource.CU_KA)
    two_theta_min: float = Field(default=10.0, ge=2.0, le=80.0)
    two_theta_max: float = Field(default=90.0, ge=20.0, le=170.0)
    fwhm_degrees: float = Field(default=0.25, ge=0.02, le=2.0)
    max_hkl_index: int = Field(default=5, ge=1, le=10)


class PowderXrdSimResponse(BaseModel):
    space_group_number: int
    space_group_symbol: str
    radiation_source: XRayRadiationSource
    wavelength_angstrom: float
    peaks: List[BraggDiffractionPeakSchema]
    two_theta_grid: List[float]
    intensity_profile: List[float]
    total_allowed_reflections: int
    total_extinct_reflections: int
