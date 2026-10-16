"""
Virtual Chemistry Laboratory Endpoints (Titration & Calorimetry).
"""
from typing import Any, Dict, List
from fastapi import APIRouter, HTTPException, status

from services.chemistry.app.services.virtual_lab_service import virtual_lab_service
from services.chemistry.app.schemas.virtual_lab import (
    CalorimetryPointResponse,
    CalorimetrySimulateRequest,
    CalorimetrySimulateResponse,
    TitrationPointResponse,
    TitrationSimulateRequest,
    TitrationSimulateResponse,
)

router = APIRouter(prefix="/lab", tags=["Virtual Chemistry Laboratory"])


@router.get("/solutes", response_model=Dict[str, Any])
def get_calorimetry_solutes():
    """Retrieve reference library of dissolution salts and combustion standards."""
    return {
        "solution_solutes": virtual_lab_service.SOLUTES_DATABASE,
        "combustion_standards": virtual_lab_service.COMBUSTION_DATABASE,
    }


@router.get("/systems", response_model=Dict[str, Any])
def get_titration_systems():
    """Retrieve supported acid-base titration systems and indicator definitions."""
    return {
        "systems": virtual_lab_service.ACID_BASE_SYSTEMS,
        "indicators": [
            {"name": "Phenolphthalein", "range": "pH 8.2 - 10.0", "transition": "Colorless to Pink"},
            {"name": "Bromothymol Blue", "range": "pH 6.0 - 7.6", "transition": "Yellow to Green to Blue"},
            {"name": "Methyl Orange", "range": "pH 3.1 - 4.4", "transition": "Red to Orange to Yellow"},
        ],
    }


@router.post("/titration-simulate", response_model=TitrationSimulateResponse)
def simulate_titration(payload: TitrationSimulateRequest):
    """
    Simulate full acid-base titration curve with pH, conductivity, and first derivative.
    Calculates exact Henderson-Hasselbalch buffer equilibrium and equivalence point metrics.
    """
    try:
        result = virtual_lab_service.calculate_titration_curve(
            system_type=payload.system_type,
            analyte_volume_ml=payload.analyte_volume_ml,
            analyte_conc_m=payload.analyte_conc_m,
            titrant_conc_m=payload.titrant_conc_m,
            max_titrant_volume_ml=payload.max_titrant_volume_ml,
            volume_step_ml=payload.volume_step_ml,
            indicator=payload.indicator,
        )

        curve_points = [
            TitrationPointResponse(
                volume_ml=pt.volume_ml,
                ph=pt.ph,
                dp_h_dv=pt.dp_h_dv,
                conductivity_ms_cm=pt.conductivity_ms_cm,
                temperature_c=pt.temperature_c,
                indicator_color=pt.indicator_color,
            )
            for pt in result.curve_points
        ]

        return TitrationSimulateResponse(
            system_type=result.system_type,
            analyte_name=result.analyte_name,
            analyte_formula=result.analyte_formula,
            analyte_volume_ml=result.analyte_volume_ml,
            analyte_conc_m=result.analyte_conc_m,
            titrant_name=result.titrant_name,
            titrant_formula=result.titrant_formula,
            titrant_conc_m=result.titrant_conc_m,
            equivalence_volume_ml=result.equivalence_volume_ml,
            equivalence_ph=result.equivalence_ph,
            half_equivalence_volume_ml=result.half_equivalence_volume_ml,
            pka=result.pka,
            indicator=result.indicator,
            curve_points=curve_points,
            indicator_transitions=result.indicator_transitions,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Titration simulation error: {str(e)}",
        )


@router.post("/calorimetry-simulate", response_model=CalorimetrySimulateResponse)
def simulate_calorimetry(payload: CalorimetrySimulateRequest):
    """
    Simulate coffee-cup solution calorimetry or constant-volume bomb calorimetry.
    Calculates temperature change, heat transferred (q), and molar enthalpy.
    """
    try:
        result = virtual_lab_service.simulate_calorimetry(
            calorimeter_type=payload.calorimeter_type,
            sample_key=payload.sample_key,
            sample_mass_g=payload.sample_mass_g,
            water_mass_g=payload.water_mass_g,
            initial_temp_c=payload.initial_temp_c,
            calorimeter_c_j_k=payload.calorimeter_c_j_k,
            ambient_temp_c=payload.ambient_temp_c,
        )

        curve = [
            CalorimetryPointResponse(
                time_seconds=pt.time_seconds,
                temperature_c=pt.temperature_c,
            )
            for pt in result.temperature_curve
        ]

        return CalorimetrySimulateResponse(
            calorimeter_type=result.calorimeter_type,
            sample_name=result.sample_name,
            sample_formula=result.sample_formula,
            sample_mass_g=result.sample_mass_g,
            sample_moles=result.sample_moles,
            water_mass_g=result.water_mass_g,
            calorimeter_c_j_k=result.calorimeter_c_j_k,
            initial_temp_c=result.initial_temp_c,
            peak_temp_c=result.peak_temp_c,
            delta_t_c=result.delta_t_c,
            heat_transferred_joules=result.heat_transferred_joules,
            molar_enthalpy_kj_mol=result.molar_enthalpy_kj_mol,
            theoretical_enthalpy_kj_mol=result.theoretical_enthalpy_kj_mol,
            percent_error=result.percent_error,
            is_exothermic=result.is_exothermic,
            temperature_curve=curve,
            reaction_equation=result.reaction_equation,
            analysis_notes=result.analysis_notes,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Calorimetry simulation error: {str(e)}",
        )
