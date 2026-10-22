"""
FastAPI route endpoints for Crystallography, Bravais Lattices, Miller Spacings, and Powder XRD Simulation.
"""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.schemas.crystallography import (
    UnitCellGeometryRequest,
    UnitCellGeometryResponse,
    XrdSimulationRequest,
    XrdSimulationResponse,
    CrystalPresetSummarySchema,
    MillerIndicesSpacingRequest,
    MillerIndicesSpacingResponse,
    FractionalAtomSchema,
    MillerPlaneSchema,
)
from app.services.crystallography_service import CrystallographyService, XRAY_WAVELENGTHS
from app.models.crystallography import XRaySource

router = APIRouter(prefix="/chemistry/crystallography", tags=["crystallography"])


@router.get("/presets", response_model=List[CrystalPresetSummarySchema])
def list_crystal_presets():
    """Returns curated crystal structure presets with fractional basis and space-groups."""
    presets = CrystallographyService.get_presets()
    return [
        CrystalPresetSummarySchema(
            id=p.id,
            name=p.name,
            formula=p.formula,
            crystal_system=p.crystal_system,
            bravais_lattice=p.bravais_lattice,
            space_group=p.space_group,
            a=p.a,
            b=p.b,
            c=p.c,
            alpha=p.alpha,
            beta=p.beta,
            gamma=p.gamma,
            z=p.z,
            molar_mass_g_mol=p.molar_mass_g_mol,
            basis_atoms=[
                FractionalAtomSchema(
                    element=at.element,
                    x=at.x,
                    y=at.y,
                    z=at.z,
                    occupancy=at.occupancy,
                    wyckoff=at.wyckoff,
                )
                for at in p.basis_atoms
            ],
            description=p.description,
            practical_applications=p.practical_applications,
        )
        for p in presets
    ]


@router.get("/presets/{preset_id}", response_model=CrystalPresetSummarySchema)
def get_crystal_preset(preset_id: str):
    """Retrieves detailed crystal metrics for a specified preset."""
    preset = CrystallographyService.get_preset_by_id(preset_id)
    if not preset:
        raise HTTPException(
            status_code=404, detail=f"Crystal preset '{preset_id}' not found in database"
        )
    return CrystalPresetSummarySchema(
        id=preset.id,
        name=preset.name,
        formula=preset.formula,
        crystal_system=preset.crystal_system,
        bravais_lattice=preset.bravais_lattice,
        space_group=preset.space_group,
        a=preset.a,
        b=preset.b,
        c=preset.c,
        alpha=preset.alpha,
        beta=preset.beta,
        gamma=preset.gamma,
        z=preset.z,
        molar_mass_g_mol=preset.molar_mass_g_mol,
        basis_atoms=[
            FractionalAtomSchema(
                element=at.element,
                x=at.x,
                y=at.y,
                z=at.z,
                occupancy=at.occupancy,
                wyckoff=at.wyckoff,
            )
            for at in preset.basis_atoms
        ],
        description=preset.description,
        practical_applications=preset.practical_applications,
    )


@router.post("/cell-geometry", response_model=UnitCellGeometryResponse)
def compute_unit_cell_geometry(payload: UnitCellGeometryRequest):
    """Calculates unit cell direct volume, metric tensor G, theoretical density, and APF."""
    b = payload.b or payload.a
    c = payload.c or payload.a

    vol = CrystallographyService.calculate_cell_volume(
        payload.a, b, c, payload.alpha, payload.beta, payload.gamma
    )
    density = CrystallographyService.calculate_density(
        payload.formula_units_z, payload.molar_mass_g_mol, vol
    )
    metric = CrystallographyService.calculate_metric_tensor(
        payload.a, b, c, payload.alpha, payload.beta, payload.gamma
    )
    packing = CrystallographyService.calculate_packing_efficiency(
        payload.bravais_lattice, payload.atomic_radii_angstrom, vol, payload.formula_units_z
    )

    return UnitCellGeometryResponse(
        a=payload.a,
        b=b,
        c=c,
        alpha=payload.alpha,
        beta=payload.beta,
        gamma=payload.gamma,
        volume_angstrom3=round(vol, 4),
        crystal_system=payload.crystal_system,
        bravais_lattice=payload.bravais_lattice,
        formula_units_z=payload.formula_units_z,
        density_g_cm3=round(density, 4),
        packing_efficiency=round(packing, 4),
        metric_tensor=metric,
    )


@router.post("/miller-spacing", response_model=MillerIndicesSpacingResponse)
def compute_miller_spacing(payload: MillerIndicesSpacingRequest):
    """Calculates interplanar lattice plane spacing d_hkl and Bragg 2-theta angles."""
    b = payload.b or payload.a
    c = payload.c or payload.a

    d = CrystallographyService.calculate_d_spacing(
        payload.h,
        payload.k,
        payload.l,
        payload.a,
        b,
        c,
        payload.alpha,
        payload.beta,
        payload.gamma,
        payload.crystal_system,
    )

    if d <= 0:
        raise HTTPException(status_code=400, detail="Invalid lattice indices (0,0,0) or negative spacing")

    # Bragg angles for Cu, Mo, Co
    def get_2theta(wavelength: float) -> Optional[float]:
        sin_t = wavelength / (2.0 * d)
        if sin_t >= 1.0:
            return None
        import math
        return round(2.0 * math.degrees(math.asin(sin_t)), 2)

    cu_2t = get_2theta(XRAY_WAVELENGTHS[XRaySource.CU_KA])
    mo_2t = get_2theta(XRAY_WAVELENGTHS[XRaySource.MO_KA])
    co_2t = get_2theta(XRAY_WAVELENGTHS[XRaySource.CO_KA])

    return MillerIndicesSpacingResponse(
        h=payload.h,
        k=payload.k,
        l=payload.l,
        d_spacing_angstrom=round(d, 4),
        cu_ka_two_theta_deg=cu_2t,
        mo_ka_two_theta_deg=mo_2t,
        co_ka_two_theta_deg=co_2t,
        is_diffraction_allowed=cu_2t is not None,
    )


@router.post("/xrd-simulate", response_model=XrdSimulationResponse)
def simulate_xrd_spectrum(payload: XrdSimulationRequest):
    """Synthesizes high-resolution powder X-ray diffractogram with Miller peak indexing."""
    if payload.custom_cell:
        cell = payload.custom_cell
        spectrum = CrystallographyService.simulate_xrd(
            custom_a=cell.a,
            custom_b=cell.b or cell.a,
            custom_c=cell.c or cell.a,
            custom_alpha=cell.alpha,
            custom_beta=cell.beta,
            custom_gamma=cell.gamma,
            crystal_system=cell.crystal_system,
            bravais_lattice=cell.bravais_lattice,
            x_ray_source=payload.x_ray_source,
            max_two_theta=payload.max_two_theta,
            fwhm_degrees=payload.fwhm_degrees,
        )
    elif payload.crystal_id:
        spectrum = CrystallographyService.simulate_xrd(
            preset_id=payload.crystal_id,
            x_ray_source=payload.x_ray_source,
            max_two_theta=payload.max_two_theta,
            fwhm_degrees=payload.fwhm_degrees,
        )
    else:
        spectrum = CrystallographyService.simulate_xrd(
            preset_id="nacl",
            x_ray_source=payload.x_ray_source,
            max_two_theta=payload.max_two_theta,
            fwhm_degrees=payload.fwhm_degrees,
        )

    return XrdSimulationResponse(
        crystal_id=spectrum.crystal_id,
        crystal_name=spectrum.crystal_name,
        chemical_formula=spectrum.chemical_formula,
        x_ray_source=spectrum.x_ray_source,
        wavelength_angstrom=spectrum.wavelength_angstrom,
        peaks=[
            MillerPlaneSchema(
                h=p.h,
                k=p.k,
                l=p.l,
                d_spacing_angstrom=p.d_spacing_angstrom,
                two_theta_degrees=p.two_theta_degrees,
                intensity_relative=p.intensity_relative,
                multiplicity=p.multiplicity,
                structure_factor_mag=p.structure_factor_mag,
            )
            for p in spectrum.peaks
        ],
        two_theta_grid=spectrum.two_theta_grid,
        intensity_profile=spectrum.intensity_profile,
        highest_intensity_peak=MillerPlaneSchema(
            h=spectrum.highest_intensity_peak.h,
            k=spectrum.highest_intensity_peak.k,
            l=spectrum.highest_intensity_peak.l,
            d_spacing_angstrom=spectrum.highest_intensity_peak.d_spacing_angstrom,
            two_theta_degrees=spectrum.highest_intensity_peak.two_theta_degrees,
            intensity_relative=spectrum.highest_intensity_peak.intensity_relative,
            multiplicity=spectrum.highest_intensity_peak.multiplicity,
            structure_factor_mag=spectrum.highest_intensity_peak.structure_factor_mag,
        ),
    )
