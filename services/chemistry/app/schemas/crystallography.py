"""
Pydantic schemas for Crystallography & XRD API endpoints.
"""

from typing import List, Optional
from pydantic import BaseModel, Field
from app.models.crystallography import (
    CrystalSystem,
    BravaisLatticeType,
    XRaySource,
)


class FractionalAtomSchema(BaseModel):
    element: str = Field(..., description="Chemical element symbol (e.g. Na, Cl, Cu)")
    x: float = Field(..., ge=0.0, le=1.0, description="Fractional x coordinate")
    y: float = Field(..., ge=0.0, le=1.0, description="Fractional y coordinate")
    z: float = Field(..., ge=0.0, le=1.0, description="Fractional z coordinate")
    occupancy: float = Field(1.0, ge=0.0, le=1.0)
    wyckoff: Optional[str] = None


class MillerPlaneSchema(BaseModel):
    h: int
    k: int
    l: int
    d_spacing_angstrom: float
    two_theta_degrees: float
    intensity_relative: float
    multiplicity: int
    structure_factor_mag: float


class UnitCellGeometryRequest(BaseModel):
    a: float = Field(..., gt=0.1, le=100.0, description="Lattice parameter a in Angstroms")
    b: Optional[float] = Field(None, gt=0.1, le=100.0)
    c: Optional[float] = Field(None, gt=0.1, le=100.0)
    alpha: float = Field(90.0, gt=10.0, lt=180.0, description="Angle alpha in degrees")
    beta: float = Field(90.0, gt=10.0, lt=180.0, description="Angle beta in degrees")
    gamma: float = Field(90.0, gt=10.0, lt=180.0, description="Angle gamma in degrees")
    crystal_system: CrystalSystem = CrystalSystem.CUBIC
    bravais_lattice: BravaisLatticeType = BravaisLatticeType.FACE_CENTERED_CUBIC
    formula_units_z: int = Field(1, ge=1, le=64)
    molar_mass_g_mol: float = Field(..., gt=0.1, description="Molar mass per formula unit")
    atomic_radii_angstrom: Optional[float] = Field(None, gt=0.1, le=10.0)


class UnitCellGeometryResponse(BaseModel):
    a: float
    b: float
    c: float
    alpha: float
    beta: float
    gamma: float
    volume_angstrom3: float
    crystal_system: CrystalSystem
    bravais_lattice: BravaisLatticeType
    formula_units_z: int
    density_g_cm3: float
    packing_efficiency: float
    metric_tensor: List[List[float]]


class XrdSimulationRequest(BaseModel):
    crystal_id: Optional[str] = Field(None, description="Preset crystal ID e.g. 'nacl', 'copper', 'diamond'")
    custom_cell: Optional[UnitCellGeometryRequest] = None
    x_ray_source: XRaySource = Field(XRaySource.CU_KA, description="Target anode radiation source")
    max_two_theta: float = Field(90.0, ge=20.0, le=160.0, description="Maximum 2-theta scan angle in degrees")
    fwhm_degrees: float = Field(0.2, ge=0.02, le=2.0, description="Instrumental peak full-width at half-maximum")


class XrdSimulationResponse(BaseModel):
    crystal_id: str
    crystal_name: str
    chemical_formula: str
    x_ray_source: XRaySource
    wavelength_angstrom: float
    peaks: List[MillerPlaneSchema]
    two_theta_grid: List[float]
    intensity_profile: List[float]
    highest_intensity_peak: MillerPlaneSchema


class CrystalPresetSummarySchema(BaseModel):
    id: str
    name: str
    formula: str
    crystal_system: CrystalSystem
    bravais_lattice: BravaisLatticeType
    space_group: str
    a: float
    b: float
    c: float
    alpha: float
    beta: float
    gamma: float
    z: int
    molar_mass_g_mol: float
    basis_atoms: List[FractionalAtomSchema]
    description: str
    practical_applications: List[str]


class MillerIndicesSpacingRequest(BaseModel):
    h: int = Field(..., ge=-10, le=10)
    k: int = Field(..., ge=-10, le=10)
    l: int = Field(..., ge=-10, le=10)
    a: float = Field(..., gt=0.1)
    b: Optional[float] = None
    c: Optional[float] = None
    alpha: float = 90.0
    beta: float = 90.0
    gamma: float = 90.0
    crystal_system: CrystalSystem = CrystalSystem.CUBIC


class MillerIndicesSpacingResponse(BaseModel):
    h: int
    k: int
    l: int
    d_spacing_angstrom: float
    cu_ka_two_theta_deg: Optional[float]
    mo_ka_two_theta_deg: Optional[float]
    co_ka_two_theta_deg: Optional[float]
    is_diffraction_allowed: bool
