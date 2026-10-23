"""
FastAPI route endpoints for 230 Crystallographic Space Groups,
Wyckoff Positions, Metric Tensors, and Powder XRD Bragg Diffraction.
"""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.models.crystallography_spacegroup import (
    CrystalSystem,
    UnitCellParameters,
    FractionalSiteCoordinate,
)
from app.schemas.crystallography_spacegroup import (
    SpaceGroupSummarySchema,
    SpaceGroupDetailSchema,
    SymmetryOperationSchema,
    WyckoffSiteSchema,
    FractionalCoordinateSchema,
    WyckoffOrbitRequest,
    WyckoffOrbitResponse,
    UnitCellParametersSchema,
    MetricTensorResponse,
    CartesianConvertRequest,
    CartesianConvertResponse,
    CartesianCoordinateSchema,
    PowderXrdSimRequest,
    PowderXrdSimResponse,
    BraggDiffractionPeakSchema,
)
from app.services.crystallography_spacegroup_service import (
    CrystallographySpaceGroupService,
)

router = APIRouter(prefix="/chemistry/crystallography/space-groups", tags=["crystallography-space-groups"])


@router.get("", response_model=List[SpaceGroupSummarySchema])
def list_space_groups(
    crystal_system: Optional[CrystalSystem] = Query(None, description="Filter by crystal system"),
    search: Optional[str] = Query(None, description="Search by number, symbol or point group")
):
    """
    Returns catalogue of standard crystallographic space groups (1-230).
    """
    groups = CrystallographySpaceGroupService.list_space_groups(
        crystal_system=crystal_system,
        search_query=search
    )
    return [
        SpaceGroupSummarySchema(
            number=g.number,
            hermann_mauguin=g.hermann_mauguin,
            hermann_mauguin_full=g.hermann_mauguin_full,
            hall_symbol=g.hall_symbol,
            schoenflies=g.schoenflies,
            crystal_system=g.crystal_system,
            point_group=g.point_group,
            laue_class=g.laue_class,
            centering=g.centering,
            is_centrosymmetric=g.is_centrosymmetric,
            general_multiplicity=g.general_multiplicity,
            wyckoff_letters=g.wyckoff_letters,
            description=g.description,
        )
        for g in groups
    ]


@router.get("/{identifier:path}", response_model=SpaceGroupDetailSchema)
def get_space_group_details(identifier: str):
    """
    Retrieves full space group details including symmetry operations and Wyckoff sites.
    """
    sg = CrystallographySpaceGroupService.get_space_group(identifier)
    if not sg:
        raise HTTPException(
            status_code=404,
            detail=f"Crystallographic space group '{identifier}' not found in registry."
        )

    return SpaceGroupDetailSchema(
        number=sg.number,
        hermann_mauguin=sg.hermann_mauguin,
        hermann_mauguin_full=sg.hermann_mauguin_full,
        hall_symbol=sg.hall_symbol,
        schoenflies=sg.schoenflies,
        crystal_system=sg.crystal_system,
        point_group=sg.point_group,
        laue_class=sg.laue_class,
        centering=sg.centering,
        is_centrosymmetric=sg.is_centrosymmetric,
        general_multiplicity=sg.general_multiplicity,
        wyckoff_letters=sg.wyckoff_letters,
        description=sg.description,
        symmetry_operations=[
            SymmetryOperationSchema(
                jones_faithful=op.jones_faithful,
                rotation_matrix=op.rotation_matrix,
                translation_vector=op.translation_vector,
                is_identity=op.is_identity,
                is_inversion=op.is_inversion,
                rotation_order=op.rotation_order,
                determinant=op.determinant,
            )
            for op in sg.symmetry_operations
        ],
        wyckoff_sites=[
            WyckoffSiteSchema(
                multiplicity=w.multiplicity,
                letter=w.letter,
                site_symmetry=w.site_symmetry,
                coordinate_generator=w.coordinate_generator,
                coordinates=w.coordinates,
                provenance=w.provenance,
            )
            for w in sg.wyckoff_sites
        ],
    )


@router.post("/wyckoff-orbit", response_model=WyckoffOrbitResponse)
def generate_wyckoff_orbit(payload: WyckoffOrbitRequest):
    """
    Applies space group symmetry operations to an asymmetric coordinate
    and returns deduplicated equivalent fractional positions (orbit).
    """
    try:
        orbit = CrystallographySpaceGroupService.generate_wyckoff_orbit(
            space_group_number=payload.space_group_number,
            element=payload.element,
            x=payload.x,
            y=payload.y,
            z=payload.z,
            tolerance=payload.tolerance,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return WyckoffOrbitResponse(
        space_group_number=payload.space_group_number,
        element=payload.element,
        initial_coordinate=[payload.x, payload.y, payload.z],
        multiplicity=len(orbit),
        coordinates=[
            FractionalCoordinateSchema(
                element=site.element,
                x=site.x,
                y=site.y,
                z=site.z,
                occupancy=site.occupancy,
                site_multiplicity=site.site_multiplicity,
                thermal_factor_b=site.thermal_factor_b,
            )
            for site in orbit
        ],
    )


@router.post("/metric-tensor", response_model=MetricTensorResponse)
def calculate_metric_tensor(payload: UnitCellParametersSchema):
    """
    Calculates direct/reciprocal metric tensors, unit cell volume, and Busing-Levy Cartesian matrices.
    """
    try:
        res = CrystallographySpaceGroupService.calculate_metric_tensor(
            UnitCellParameters(
                a=payload.a,
                b=payload.b,
                c=payload.c,
                alpha=payload.alpha,
                beta=payload.beta,
                gamma=payload.gamma,
            )
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return MetricTensorResponse(
        unit_cell=payload,
        volume_angstrom3=res.volume_angstrom3,
        direct_metric_tensor=res.direct_metric_tensor,
        reciprocal_metric_tensor=res.reciprocal_metric_tensor,
        direct_to_cartesian_matrix=res.direct_to_cartesian_matrix,
        cartesian_to_direct_matrix=res.cartesian_to_direct_matrix,
        reciprocal_a_star=res.reciprocal_a_star,
        reciprocal_b_star=res.reciprocal_b_star,
        reciprocal_c_star=res.reciprocal_c_star,
        reciprocal_alpha_star=res.reciprocal_alpha_star,
        reciprocal_beta_star=res.reciprocal_beta_star,
        reciprocal_gamma_star=res.reciprocal_gamma_star,
    )


@router.post("/fractional-to-cartesian", response_model=CartesianConvertResponse)
def convert_fractional_to_cartesian(payload: CartesianConvertRequest):
    """
    Transforms fractional coordinates to absolute Cartesian coordinates in Angstroms.
    """
    unit_cell = UnitCellParameters(
        a=payload.unit_cell.a,
        b=payload.unit_cell.b,
        c=payload.unit_cell.c,
        alpha=payload.unit_cell.alpha,
        beta=payload.unit_cell.beta,
        gamma=payload.unit_cell.gamma,
    )
    atoms = [
        FractionalSiteCoordinate(
            element=at.element,
            x=at.x,
            y=at.y,
            z=at.z,
            occupancy=at.occupancy,
            wyckoff_letter=at.wyckoff_letter,
            thermal_factor_b=at.thermal_factor_b,
        )
        for at in payload.fractional_coordinates
    ]
    cartesian = CrystallographySpaceGroupService.fractional_to_cartesian(atoms, unit_cell)

    return CartesianConvertResponse(
        cartesian_coordinates=[
            CartesianCoordinateSchema(
                element=c.element,
                x_angstrom=c.x_angstrom,
                y_angstrom=c.y_angstrom,
                z_angstrom=c.z_angstrom,
                occupancy=c.occupancy,
                site_label=c.site_label,
            )
            for c in cartesian
        ]
    )


@router.post("/simulate-xrd", response_model=PowderXrdSimResponse)
def simulate_powder_xrd(payload: PowderXrdSimRequest):
    """
    Simulates high-precision powder XRD pattern using Bragg's law, Cromer-Mann form factors,
    Lorentz-polarization, and centering extinction rules.
    """
    unit_cell = UnitCellParameters(
        a=payload.unit_cell.a,
        b=payload.unit_cell.b,
        c=payload.unit_cell.c,
        alpha=payload.unit_cell.alpha,
        beta=payload.unit_cell.beta,
        gamma=payload.unit_cell.gamma,
    )
    atoms = [
        FractionalSiteCoordinate(
            element=at.element,
            x=at.x,
            y=at.y,
            z=at.z,
            occupancy=at.occupancy,
            wyckoff_letter=at.wyckoff_letter,
            thermal_factor_b=at.thermal_factor_b,
        )
        for at in payload.atoms
    ]

    try:
        res = CrystallographySpaceGroupService.simulate_powder_xrd(
            space_group_number=payload.space_group_number,
            unit_cell=unit_cell,
            atoms=atoms,
            radiation_source=payload.radiation_source,
            two_theta_min=payload.two_theta_min,
            two_theta_max=payload.two_theta_max,
            fwhm_degrees=payload.fwhm_degrees,
            max_hkl_index=payload.max_hkl_index,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return PowderXrdSimResponse(
        space_group_number=res.space_group_number,
        space_group_symbol=res.space_group_symbol,
        radiation_source=res.radiation_source,
        wavelength_angstrom=res.wavelength_angstrom,
        peaks=[
            BraggDiffractionPeakSchema(
                h=p.h,
                k=p.k,
                l=p.l,
                d_spacing_angstrom=p.d_spacing_angstrom,
                two_theta_degrees=p.two_theta_degrees,
                structure_factor_real=p.structure_factor_real,
                structure_factor_imag=p.structure_factor_imag,
                structure_factor_magnitude=p.structure_factor_magnitude,
                phase_degrees=p.phase_degrees,
                form_factor_contributions=p.form_factor_contributions,
                multiplicity=p.multiplicity,
                lorentz_polarization_factor=p.lorentz_polarization_factor,
                intensity_raw=p.intensity_raw,
                intensity_relative=p.intensity_relative,
                is_systematic_absence=p.is_systematic_absence,
                extinction_condition=p.extinction_condition,
            )
            for p in res.peaks
        ],
        two_theta_grid=res.two_theta_grid,
        intensity_profile=res.intensity_profile,
        total_allowed_reflections=res.total_allowed_reflections,
        total_extinct_reflections=res.total_extinct_reflections,
    )
