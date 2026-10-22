"""FastAPI route endpoints for Chemical Equilibrium, Buffer Capacity & Le Chatelier."""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.models.equilibrium import (
    EquilibriumSystemType,
    ShiftDirection,
    PerturbationType,
)
from app.schemas.equilibrium import (
    EquilibriumPresetSummary,
    RiceTableRequest,
    RiceTableResponse,
    RiceTableRowSchema,
    PolyproticAcidRequest,
    PolyproticAcidResponse,
    PolyproticSpeciesFractionSchema,
    BufferCapacityRequest,
    BufferCapacityResponse,
    BufferCapacityPointSchema,
    SolubilityKspRequest,
    SolubilityKspResponse,
    LeChatelierRequest,
    LeChatelierResponse,
)
from app.services.equilibrium_service import equilibrium_service

router = APIRouter(prefix="/chemistry/equilibrium", tags=["equilibrium"])


@router.get("/presets", response_model=List[EquilibriumPresetSummary])
def list_equilibrium_presets():
    """Retrieve catalog of standard chemical equilibrium and Le Chatelier benchmark systems."""
    return equilibrium_service.get_presets()


@router.post("/rice-table", response_model=RiceTableResponse)
def solve_rice_table_endpoint(request: RiceTableRequest):
    """Solve ICE/RICE table for extent of reaction xi and equilibrium concentrations."""
    try:
        res = equilibrium_service.solve_rice_table(
            equilibrium_constant_k=request.equilibrium_constant_k,
            participants=request.participants,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return RiceTableResponse(
        equilibrium_constant_k=res.equilibrium_constant_k,
        reaction_quotient_q=res.reaction_quotient_q,
        shift_direction=res.shift_direction,
        extent_of_reaction_xi=res.extent_of_reaction_xi,
        rows=[
            RiceTableRowSchema(
                species_formula=row.species_formula,
                species_name=row.species_name,
                coefficient=row.coefficient,
                is_product=row.is_product,
                initial=row.initial,
                change=row.change,
                equilibrium=row.equilibrium,
            )
            for row in res.rows
        ],
        converged=res.converged,
        iterations=res.iterations,
        residual_error=res.residual_error,
    )


@router.post("/polyprotic-acid", response_model=PolyproticAcidResponse)
def solve_polyprotic_acid_endpoint(request: PolyproticAcidRequest):
    """Solve polyprotic acid dissociation equilibria (pH, fractions alpha, and concentrations)."""
    try:
        res = equilibrium_service.solve_polyprotic_acid(
            acid_name=request.acid_name,
            acid_formula=request.acid_formula,
            total_concentration_ca=request.total_concentration_ca,
            dissociation_constants_ka=request.dissociation_constants_ka,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return PolyproticAcidResponse(
        acid_name=res.acid_name,
        acid_formula=res.acid_formula,
        total_concentration_ca=res.total_concentration_ca,
        ph=res.ph,
        poh=res.poh,
        h_plus_concentration=res.h_plus_concentration,
        oh_minus_concentration=res.oh_minus_concentration,
        dissociation_constants_ka=res.dissociation_constants_ka,
        species_fractions=[
            PolyproticSpeciesFractionSchema(
                species_formula=f.species_formula,
                charge=f.charge,
                fraction_alpha=f.fraction_alpha,
                equilibrium_concentration=f.equilibrium_concentration,
            )
            for f in res.species_fractions
        ],
    )


@router.post("/buffer-capacity", response_model=BufferCapacityResponse)
def solve_buffer_capacity_endpoint(request: BufferCapacityRequest):
    """Calculate buffer pH, exact van Slyke buffer capacity beta = dCb/dpH, and acid/base response."""
    res = equilibrium_service.solve_buffer_capacity(
        buffer_name=request.buffer_name,
        acid_component=request.acid_component,
        base_component=request.base_component,
        pka=request.pka,
        total_buffer_concentration_m=request.total_buffer_concentration_m,
        ratio_base_to_acid=request.ratio_base_to_acid,
        added_strong_acid_m=request.added_strong_acid_m,
        added_strong_base_m=request.added_strong_base_m,
    )
    return BufferCapacityResponse(
        buffer_name=res.buffer_name,
        acid_component=res.acid_component,
        base_component=res.base_component,
        pka=res.pka,
        total_buffer_concentration_m=res.total_buffer_concentration_m,
        ratio_base_to_acid=res.ratio_base_to_acid,
        henderson_hasselbalch_ph=res.henderson_hasselbalch_ph,
        rigorous_equilibrium_ph=res.rigorous_equilibrium_ph,
        van_slyke_buffer_capacity_beta=res.van_slyke_buffer_capacity_beta,
        maximum_buffer_capacity=res.maximum_buffer_capacity,
        ph_after_acid_addition=res.ph_after_acid_addition,
        ph_after_base_addition=res.ph_after_base_addition,
        buffer_curve=[
            BufferCapacityPointSchema(
                ph=pt.ph,
                buffer_capacity_beta=pt.buffer_capacity_beta,
                fraction_base=pt.fraction_base,
            )
            for pt in res.buffer_curve
        ],
    )


@router.post("/solubility-ksp", response_model=SolubilityKspResponse)
def solve_solubility_ksp_endpoint(request: SolubilityKspRequest):
    """Calculate Ksp molar and mass solubility, common-ion depression, and precipitation threshold."""
    res = equilibrium_service.solve_solubility_ksp(
        salt_name=request.salt_name,
        salt_formula=request.salt_formula,
        ksp_value=request.ksp_value,
        molar_mass_g_mol=request.molar_mass_g_mol,
        cation_formula=request.cation_formula,
        cation_coefficient=request.cation_coefficient,
        anion_formula=request.anion_formula,
        anion_coefficient=request.anion_coefficient,
        common_ion_formula=request.common_ion_formula,
        common_ion_concentration=request.common_ion_concentration,
    )
    return SolubilityKspResponse(
        salt_name=res.salt_name,
        salt_formula=res.salt_formula,
        ksp_value=res.ksp_value,
        cation_formula=res.cation_formula,
        cation_coefficient=res.cation_coefficient,
        anion_formula=res.anion_formula,
        anion_coefficient=res.anion_coefficient,
        common_ion_formula=res.common_ion_formula,
        common_ion_concentration=res.common_ion_concentration,
        molar_solubility_mol_l=res.molar_solubility_mol_l,
        mass_solubility_g_l=res.mass_solubility_g_l,
        ion_product_qsp=res.ion_product_qsp,
        is_precipitate_formed=res.is_precipitate_formed,
        saturation_state=res.saturation_state,
    )


@router.post("/le-chatelier", response_model=LeChatelierResponse)
def simulate_le_chatelier_endpoint(request: LeChatelierRequest):
    """Simulate Le Chatelier thermodynamic response to concentration, pressure, and temperature perturbations."""
    try:
        res = equilibrium_service.simulate_le_chatelier(
            preset_reaction_id=request.preset_reaction_id,
            perturbation_type=request.perturbation_type,
            concentration_changes=request.concentration_changes,
            pressure_multiplier=request.pressure_multiplier,
            temperature_k=request.temperature_k,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return LeChatelierResponse(
        reaction_title=res.reaction_title,
        equation_string=res.equation_string,
        delta_h_standard_kj_mol=res.delta_h_standard_kj_mol,
        delta_ng_gas=res.delta_ng_gas,
        perturbation_type=res.perturbation_type,
        perturbation_description=res.perturbation_description,
        initial_k=res.initial_k,
        initial_q=res.initial_q,
        initial_shift=res.initial_shift,
        perturbed_k=res.perturbed_k,
        perturbed_q=res.perturbed_q,
        le_chatelier_shift=res.le_chatelier_shift,
        initial_concentrations=res.initial_concentrations,
        perturbed_concentrations=res.perturbed_concentrations,
        new_equilibrium_concentrations=res.new_equilibrium_concentrations,
        pedagogical_explanation=res.pedagogical_explanation,
    )
