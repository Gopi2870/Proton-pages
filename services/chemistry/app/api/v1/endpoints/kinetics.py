"""
Chemical Reaction Kinetics and Catalytic Dynamics API Endpoints.
Provides integrated rate law simulations, Arrhenius activation energy solvers,
and Michaelis-Menten enzyme kinetics.
"""
from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException
from services.chemistry.app.schemas.kinetics import (
    RateLawSimulationRequest,
    RateLawSimulationResponse,
    ArrheniusTwoPointRequest,
    ArrheniusResponse,
    MichaelisMentenRequest,
    MichaelisMentenResponse,
    ConsecutiveKineticsRequest,
    ConsecutiveKineticsResponse,
)
from services.chemistry.app.services.kinetics_service import KineticsService

router = APIRouter(prefix="/kinetics", tags=["Reaction Kinetics & Catalysis"])


@router.get("/reactions", response_model=List[Dict[str, Any]])
def get_preset_reactions():
    """List benchmark preset kinetics reactions and biological enzyme systems."""
    return KineticsService.PRESET_REACTIONS


@router.post("/rate-law/simulate", response_model=RateLawSimulationResponse)
def simulate_rate_law(req: RateLawSimulationRequest):
    """Simulate concentration progression, half-life, and rate for zero, first, or second order reactions."""
    try:
        res = KineticsService.simulate_rate_law(
            reaction_name=req.reaction_name,
            order=req.order,
            initial_conc_m=req.initial_conc_m,
            rate_constant_k=req.rate_constant_k,
            total_time_seconds=req.total_time_seconds,
            time_steps=req.time_steps,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return RateLawSimulationResponse(
        reaction_name=res.reaction_name,
        order=res.order,
        initial_conc_m=res.initial_conc_m,
        rate_constant_k=res.rate_constant_k,
        k_units=res.k_units,
        half_life_seconds=res.half_life_seconds,
        differential_rate_equation=res.differential_rate_equation,
        integrated_rate_equation=res.integrated_rate_equation,
        time_series=[
            {
                "time_seconds": p.time_seconds,
                "concentration_m": p.concentration_m,
                "rate_m_s": p.rate_m_s,
                "ln_conc": p.ln_conc,
                "inv_conc": p.inv_conc,
            }
            for p in res.time_series
        ],
        notes=res.notes,
    )


@router.post("/arrhenius/calculate", response_model=ArrheniusResponse)
def calculate_arrhenius(req: ArrheniusTwoPointRequest):
    """Calculate activation energy Ea and pre-exponential factor A from two experimental rate constants."""
    try:
        res = KineticsService.solve_arrhenius(
            t1_c=req.t1_c,
            k1=req.k1,
            t2_c=req.t2_c,
            k2=req.k2,
            target_t_c=req.target_t_c,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return ArrheniusResponse(
        activation_energy_j_mol=res.activation_energy_j_mol,
        activation_energy_kj_mol=res.activation_energy_kj_mol,
        pre_exponential_factor_a=res.pre_exponential_factor_a,
        target_temperature_c=req.target_t_c,
        predicted_k_at_target=res.rate_constant_k if req.target_t_c is not None else None,
        equation=res.equation,
        temp_curve=res.temp_curve,
    )


@router.post("/michaelis-menten/simulate", response_model=MichaelisMentenResponse)
def simulate_michaelis_menten(req: MichaelisMentenRequest):
    """Simulate enzyme saturation kinetics with competitive, uncompetitive, or noncompetitive inhibition."""
    try:
        res = KineticsService.simulate_michaelis_menten(
            enzyme_name=req.enzyme_name,
            v_max=req.v_max,
            k_m=req.k_m,
            inhibition_type=req.inhibition_type,
            inhibitor_conc_um=req.inhibitor_conc_um or 0.0,
            k_i_um=req.k_i_um or 1.0,
            max_substrate_um=req.max_substrate_um or 100.0,
            steps=req.steps or 30,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return MichaelisMentenResponse(
        enzyme_name=res.enzyme_name,
        v_max=res.v_max,
        k_m=res.k_m,
        inhibition_type=res.inhibition_type,
        inhibitor_conc_um=res.inhibitor_conc_um,
        k_i_um=res.k_i_um,
        apparent_v_max=res.apparent_v_max,
        apparent_k_m=res.apparent_k_m,
        lineweaver_burk_slope=res.lineweaver_burk_slope,
        lineweaver_burk_intercept=res.lineweaver_burk_intercept,
        saturation_points=[
            {
                "substrate_conc_um": p.substrate_conc_um,
                "velocity_um_s": p.velocity_um_s,
                "inv_substrate": p.inv_substrate,
                "inv_velocity": p.inv_velocity,
            }
            for p in res.saturation_points
        ],
    )


@router.post("/consecutive/simulate", response_model=ConsecutiveKineticsResponse)
def simulate_consecutive_reactions(req: ConsecutiveKineticsRequest):
    """Simulate consecutive reaction dynamics A -> B -> C."""
    try:
        res = KineticsService.simulate_consecutive_reactions(
            initial_a_m=req.initial_a_m,
            k1=req.k1,
            k2=req.k2,
            total_time_seconds=req.total_time_seconds,
            steps=req.steps,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return ConsecutiveKineticsResponse(
        initial_a_m=res.initial_a_m,
        k1=res.k1,
        k2=res.k2,
        t_max_intermediate_seconds=res.t_max_intermediate_seconds,
        max_intermediate_conc_m=res.max_intermediate_conc_m,
        time_series=[
            {
                "time_seconds": p.time_seconds,
                "conc_a": p.conc_a,
                "conc_b": p.conc_b,
                "conc_c": p.conc_c,
            }
            for p in res.time_series
        ],
        description=res.description,
    )
