"""FastAPI endpoints for Advanced Electroanalytical Chemistry & Cyclic Voltammetry (PR #037)."""

from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models.electroanalytical import ElectrochemicalPreset
from app.schemas.electroanalytical import (
    CyclicVoltammetryRequest,
    CyclicVoltammetryResponse,
    ChronoamperometryRequest,
    ChronoamperometryResponse,
    ElectrochemicalPresetSummary,
)
from app.services.electroanalytical_service import (
    ElectroanalyticalEngine,
    BENCHMARK_PRESETS,
)

router = APIRouter(prefix="/electroanalysis", tags=["Electroanalytical Chemistry & Voltammetry"])


@router.get("/presets", response_model=List[ElectrochemicalPresetSummary])
async def get_electroanalysis_presets():
    """Returns curated benchmark redox couples for cyclic voltammetry and chronoamperometry."""
    return [
        ElectrochemicalPresetSummary(
            id=p.id,
            name=p.name,
            redox_couple=p.redox_couple,
            reversibility=p.reversibility,
            e0_v_vs_she=p.e0_v_vs_she,
            n_electrons=p.n_electrons,
            standard_d_cm2_s=p.standard_d_cm2_s,
            standard_k0_cm_s=p.standard_k0_cm_s,
            alpha=p.alpha,
            description=p.description,
        )
        for p in BENCHMARK_PRESETS
    ]


@router.post("/cv-simulate", response_model=CyclicVoltammetryResponse)
async def simulate_cyclic_voltammetry(request: CyclicVoltammetryRequest):
    """Simulates a full cyclic voltammogram incorporating Randles-Sevcik and Butler-Volmer kinetics."""
    try:
        res = ElectroanalyticalEngine.simulate_cyclic_voltammetry(request)
        return CyclicVoltammetryResponse(
            system_name=res.system_name,
            reversibility=res.reversibility,
            n_electrons=res.n_electrons,
            e_half_v=res.e_half_v,
            e_peak_anodic_v=res.e_peak_anodic_v,
            e_peak_cathodic_v=res.e_peak_cathodic_v,
            delta_ep_mv=res.delta_ep_mv,
            peak_current_anodic_ua=res.peak_current_anodic_ua,
            peak_current_cathodic_ua=res.peak_current_cathodic_ua,
            current_ratio=res.current_ratio,
            scan_rate_v_s=res.scan_rate_v_s,
            diffusion_coefficient_cm2_s=res.diffusion_coefficient_cm2_s,
            electrode_area_cm2=res.electrode_area_cm2,
            concentration_mm=res.concentration_mm,
            standard_rate_constant_k0_cm_s=res.standard_rate_constant_k0_cm_s,
            transfer_coefficient_alpha=res.transfer_coefficient_alpha,
            voltammogram=[
                {
                    "potential_v": pt.potential_v,
                    "current_ua": pt.current_ua,
                    "current_faradaic_ua": pt.current_faradaic_ua,
                    "current_capacitive_ua": pt.current_capacitive_ua,
                    "scan_direction": pt.scan_direction,
                    "time_s": pt.time_s,
                }
                for pt in res.voltammogram
            ],
            pedagogical_summary=res.pedagogical_summary,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Cyclic voltammetry simulation failed: {str(e)}",
        )


@router.post("/chronoamperometry", response_model=ChronoamperometryResponse)
async def simulate_chronoamperometry(request: ChronoamperometryRequest):
    """Simulates Cottrell chronoamperometry under semi-infinite planar diffusion."""
    try:
        res = ElectroanalyticalEngine.simulate_chronoamperometry(request)
        return ChronoamperometryResponse(
            system_name=res.system_name,
            applied_potential_v=res.applied_potential_v,
            duration_s=res.duration_s,
            cottrell_slope_ua_s_half=res.cottrell_slope_ua_s_half,
            diffusion_coefficient_cm2_s=res.diffusion_coefficient_cm2_s,
            curve=[
                {
                    "time_s": pt.time_s,
                    "current_ua": pt.current_ua,
                    "inv_sqrt_time": pt.inv_sqrt_time,
                }
                for pt in res.curve
            ],
            pedagogical_summary=res.pedagogical_summary,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Chronoamperometry simulation failed: {str(e)}",
        )
