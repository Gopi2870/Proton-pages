"""
Gas Laws, Kinetic Molecular Theory and Phase Equilibria API Endpoints.
"""
from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException
from services.chemistry.app.schemas.gas_laws import (
    IdealGasCalculateRequest,
    IdealGasCalculateResponse,
    VanDerWaalsRequest,
    VanDerWaalsResponse,
    MaxwellBoltzmannRequest,
    MaxwellBoltzmannResponse,
    PhaseEquilibriumRequest,
    PhaseEquilibriumResponse,
    RealGasConstantsSchema,
)
from services.chemistry.app.services.gas_laws_service import GasLawsService

router = APIRouter(prefix="/gas-laws", tags=["Gas Laws & Phase Equilibria"])


@router.get("/constants", response_model=List[RealGasConstantsSchema])
def get_real_gas_constants():
    """List catalog of real gas substances with Van der Waals constants and critical points."""
    result = []
    for g in GasLawsService.REAL_GAS_CATALOG.values():
        result.append(
            RealGasConstantsSchema(
                id=g.id,
                name=g.name,
                formula=g.formula,
                molar_mass_g_mol=g.molar_mass_g_mol,
                vdw_a_l2_atm_mol2=g.vdw_a_l2_atm_mol2,
                vdw_b_l_mol=g.vdw_b_l_mol,
                t_c_k=g.t_c_k,
                p_c_atm=g.p_c_atm,
            )
        )
    return result


@router.post("/ideal/calculate", response_model=IdealGasCalculateResponse)
def calculate_ideal_gas(req: IdealGasCalculateRequest):
    """Solve for missing variable in Ideal Gas Law PV = nRT."""
    try:
        res = GasLawsService.calculate_ideal_gas(
            pressure_atm=req.pressure_atm,
            volume_liters=req.volume_liters,
            moles=req.moles,
            temperature_k=req.temperature_k,
            temperature_c=req.temperature_c,
            molar_mass_g_mol=req.molar_mass_g_mol,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return IdealGasCalculateResponse(
        pressure_atm=res.pressure_atm,
        volume_liters=res.volume_liters,
        moles=res.moles,
        temperature_k=res.temperature_k,
        temperature_c=res.temperature_c,
        molar_volume_l_mol=res.molar_volume_l_mol,
        density_g_l=res.density_g_l,
        equation=res.equation,
        notes=res.notes,
    )


@router.post("/vanderwaals/simulate", response_model=VanDerWaalsResponse)
def simulate_vanderwaals(req: VanDerWaalsRequest):
    """Simulate real gas compressibility Z and Van der Waals pressure isotherm."""
    try:
        res = GasLawsService.simulate_vanderwaals(
            gas_id=req.gas_id,
            moles=req.moles,
            temperature_k=req.temperature_k,
            current_volume_liters=req.current_volume_liters,
            min_volume_liters=req.min_volume_liters or 0.15,
            max_volume_liters=req.max_volume_liters or 5.0,
            steps=req.steps or 40,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return VanDerWaalsResponse(
        gas_id=res.gas_id,
        gas_name=res.gas_name,
        moles=res.moles,
        temperature_k=res.temperature_k,
        vdw_a_l2_atm_mol2=res.vdw_a_l2_atm_mol2,
        vdw_b_l_mol=res.vdw_b_l_mol,
        p_ideal_atm=res.p_ideal_atm,
        p_vdw_atm=res.p_vdw_atm,
        compressibility_z=res.compressibility_z,
        deviation_percent=res.deviation_percent,
        regime=res.regime,
        isotherm_points=[
            {
                "volume_liters": p.volume_liters,
                "pressure_ideal_atm": p.pressure_ideal_atm,
                "pressure_vdw_atm": p.pressure_vdw_atm,
                "compressibility_z": p.compressibility_z,
            }
            for p in res.isotherm_points
        ],
        notes=res.notes,
    )


@router.post("/maxwell-boltzmann/distribution", response_model=MaxwellBoltzmannResponse)
def calculate_maxwell_boltzmann(req: MaxwellBoltzmannRequest):
    """Calculate statistical Maxwell-Boltzmann molecular speed distribution."""
    try:
        res = GasLawsService.calculate_maxwell_boltzmann(
            gas_name=req.gas_name,
            molar_mass_g_mol=req.molar_mass_g_mol,
            temperature_k=req.temperature_k,
            max_speed_m_s=req.max_speed_m_s or 2000.0,
            steps=req.steps or 50,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return MaxwellBoltzmannResponse(
        gas_name=res.gas_name,
        molar_mass_g_mol=res.molar_mass_g_mol,
        temperature_k=res.temperature_k,
        v_mp_m_s=res.v_mp_m_s,
        v_avg_m_s=res.v_avg_m_s,
        v_rms_m_s=res.v_rms_m_s,
        mean_kinetic_energy_j=res.mean_kinetic_energy_j,
        distribution_points=[
            {
                "speed_m_s": p.speed_m_s,
                "probability_density": p.probability_density,
            }
            for p in res.distribution_points
        ],
    )


@router.post("/phase-equilibrium", response_model=PhaseEquilibriumResponse)
def get_phase_equilibrium(req: PhaseEquilibriumRequest):
    """Retrieve phase boundaries and Clausius-Clapeyron vapor pressure progression."""
    res = GasLawsService.get_phase_equilibrium(substance_id=req.substance_id)
    return PhaseEquilibriumResponse(
        substance_name=res.substance_name,
        formula=res.formula,
        normal_boiling_point_c=res.normal_boiling_point_c,
        delta_h_vap_kj_mol=res.delta_h_vap_kj_mol,
        normal_melting_point_c=res.normal_melting_point_c,
        triple_point_t_c=res.triple_point_t_c,
        triple_point_p_kpa=res.triple_point_p_kpa,
        critical_point_t_c=res.critical_point_t_c,
        critical_point_p_mpa=res.critical_point_p_mpa,
        vapor_pressure_curve=[
            {
                "temperature_c": p.temperature_c,
                "temperature_k": p.temperature_k,
                "vapor_pressure_kpa": p.vapor_pressure_kpa,
                "vapor_pressure_atm": p.vapor_pressure_atm,
            }
            for p in res.vapor_pressure_curve
        ],
    )
