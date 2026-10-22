"""FastAPI route endpoints for Polymer Chemistry & Macromolecular Architecture."""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.models.polymer_chemistry import (
    PolymerizationMechanism,
    RadicalTerminationMode,
)
from app.schemas.polymer_chemistry import (
    PolymerPresetSummary,
    PolymerSimulationResponse,
    CarothersRequest,
    CarothersResponse,
    RadicalKineticsRequest,
    RadicalKineticsResponse,
    FloryHugginsRequest,
    FloryHugginsResponse,
    FloryHugginsPointResponse,
    MolecularWeightPointResponse,
)
from app.services.polymer_service import polymer_service

router = APIRouter(prefix="/chemistry/polymers", tags=["polymers"])


@router.get("/presets", response_model=List[PolymerPresetSummary])
def list_polymer_presets():
    """Retrieve catalog of standard step-growth and chain-growth polymers."""
    return polymer_service.get_presets()


@router.get("/presets/{preset_id}", response_model=PolymerSimulationResponse)
def get_preset_simulation(
    preset_id: str,
    conversion: Optional[float] = Query(None, ge=0.01, le=0.999, description="Override fractional conversion p"),
    stoichiometric_ratio: Optional[float] = Query(None, ge=0.1, le=1.0, description="Override stoichiometric ratio r"),
    chi: Optional[float] = Query(None, ge=-1.0, le=2.5, description="Override Flory-Huggins chi parameter"),
):
    """Run full simulation on a standard polymer with optional condition overrides."""
    try:
        res = polymer_service.get_preset_simulation(
            preset_id=preset_id,
            custom_conversion=conversion,
            custom_stoichiometry_r=stoichiometric_ratio,
            custom_chi=chi,
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    return _map_result_to_response(res)


@router.post("/carothers", response_model=CarothersResponse)
def calculate_carothers_equation(request: CarothersRequest):
    """Solve Carothers equation for step-growth polycondensation and gel point."""
    res = polymer_service.evaluate_carothers(
        conversion_p=request.conversion_p,
        stoichiometric_ratio_r=request.stoichiometric_ratio_r,
        average_functionality=request.average_functionality,
        monomer_mw=request.monomer_molecular_weight,
    )
    return CarothersResponse(
        stoichiometric_ratio_r=res.stoichiometric_ratio_r,
        average_functionality_fav=res.average_functionality_fav,
        conversion_p=res.conversion_p,
        gel_point_pc=res.gel_point_pc,
        is_gel_formed=res.is_gel_formed,
        degree_of_polymerization_xn=res.degree_of_polymerization_xn,
        weight_degree_of_polymerization_xw=res.weight_degree_of_polymerization_xw,
        polydispersity_index=res.polydispersity_index,
    )


@router.post("/radical-kinetics", response_model=RadicalKineticsResponse)
def calculate_radical_kinetics(request: RadicalKineticsRequest):
    """Solve steady-state radical polymerization rate equations (QSSA) and chain length."""
    res = polymer_service.evaluate_radical_kinetics(
        monomer_conc=request.monomer_concentration_m,
        initiator_conc=request.initiator.initial_concentration_m,
        kd=request.initiator.kd_s_1,
        f_eff=request.initiator.efficiency_f,
        kp=request.propagation_kp_l_mol_s,
        kt=request.termination_kt_l_mol_s,
        temp_c=request.temperature_c,
        termination_mode=request.termination_mode,
        conversion_p=request.conversion_p,
    )
    return RadicalKineticsResponse(
        temperature_c=res.temperature_c,
        monomer_concentration_m=res.monomer_concentration_m,
        initiator_concentration_m=res.initiator_concentration_m,
        propagation_kp_l_mol_s=res.propagation_kp_l_mol_s,
        termination_kt_l_mol_s=res.termination_kt_l_mol_s,
        radical_concentration_m=res.radical_concentration_m,
        polymerization_rate_rp_mol_l_s=res.polymerization_rate_rp_mol_l_s,
        kinetic_chain_length_nu=res.kinetic_chain_length_nu,
        predicted_xn=res.predicted_xn,
        autoacceleration_trommsdorff=res.autoacceleration_trommsdorff,
    )


@router.post("/flory-huggins", response_model=FloryHugginsResponse)
def calculate_flory_huggins(request: FloryHugginsRequest):
    """Calculate Flory-Huggins free energy of mixing curve and phase stability."""
    res = polymer_service.evaluate_flory_huggins(
        degree_of_polymerization_n=request.degree_of_polymerization_n,
        chi_parameter=request.chi_parameter,
    )
    return FloryHugginsResponse(
        chi_parameter=res.chi_parameter,
        critical_chi=res.critical_chi,
        critical_phi_polymer=res.critical_phi_polymer,
        is_phase_separated=res.is_phase_separated,
        curve_points=[
            FloryHugginsPointResponse(
                phi_polymer=pt.phi_polymer,
                delta_g_mix_rt=pt.delta_g_mix_rt,
                spinodal_chi=pt.spinodal_chi,
            )
            for pt in res.curve_points
        ],
    )


def _map_result_to_response(res) -> PolymerSimulationResponse:
    carothers_resp = None
    if res.carothers:
        carothers_resp = CarothersResponse(
            stoichiometric_ratio_r=res.carothers.stoichiometric_ratio_r,
            average_functionality_fav=res.carothers.average_functionality_fav,
            conversion_p=res.carothers.conversion_p,
            gel_point_pc=res.carothers.gel_point_pc,
            is_gel_formed=res.carothers.is_gel_formed,
            degree_of_polymerization_xn=res.carothers.degree_of_polymerization_xn,
            weight_degree_of_polymerization_xw=res.carothers.weight_degree_of_polymerization_xw,
            polydispersity_index=res.carothers.polydispersity_index,
        )

    kinetics_resp = None
    if res.radical_kinetics:
        kinetics_resp = RadicalKineticsResponse(
            temperature_c=res.radical_kinetics.temperature_c,
            monomer_concentration_m=res.radical_kinetics.monomer_concentration_m,
            initiator_concentration_m=res.radical_kinetics.initiator_concentration_m,
            propagation_kp_l_mol_s=res.radical_kinetics.propagation_kp_l_mol_s,
            termination_kt_l_mol_s=res.radical_kinetics.termination_kt_l_mol_s,
            radical_concentration_m=res.radical_kinetics.radical_concentration_m,
            polymerization_rate_rp_mol_l_s=res.radical_kinetics.polymerization_rate_rp_mol_l_s,
            kinetic_chain_length_nu=res.radical_kinetics.kinetic_chain_length_nu,
            predicted_xn=res.radical_kinetics.predicted_xn,
            autoacceleration_trommsdorff=res.radical_kinetics.autoacceleration_trommsdorff,
        )

    fh_resp = None
    if res.flory_huggins:
        fh_resp = FloryHugginsResponse(
            chi_parameter=res.flory_huggins.chi_parameter,
            critical_chi=res.flory_huggins.critical_chi,
            critical_phi_polymer=res.flory_huggins.critical_phi_polymer,
            is_phase_separated=res.flory_huggins.is_phase_separated,
            curve_points=[
                FloryHugginsPointResponse(
                    phi_polymer=pt.phi_polymer,
                    delta_g_mix_rt=pt.delta_g_mix_rt,
                    spinodal_chi=pt.spinodal_chi,
                )
                for pt in res.flory_huggins.curve_points
            ],
        )

    return PolymerSimulationResponse(
        simulation_id=res.simulation_id,
        polymer_name=res.polymer_name,
        repeat_unit_formula=res.repeat_unit_formula,
        repeat_unit_mw=res.repeat_unit_mw,
        mechanism=res.mechanism,
        conversion_p=res.conversion_p,
        number_average_mn=res.number_average_mn,
        weight_average_mw=res.weight_average_mw,
        z_average_mz=res.z_average_mz,
        polydispersity_index=res.polydispersity_index,
        carothers=carothers_resp,
        radical_kinetics=kinetics_resp,
        flory_huggins=fh_resp,
        distribution_curve=[
            MolecularWeightPointResponse(
                chain_length_i=pt.chain_length_i,
                molecular_weight=pt.molecular_weight,
                mole_fraction=pt.mole_fraction,
                weight_fraction=pt.weight_fraction,
                cumulative_weight_fraction=pt.cumulative_weight_fraction,
            )
            for pt in res.distribution_curve
        ],
        pedagogical_notes=res.pedagogical_notes,
    )
