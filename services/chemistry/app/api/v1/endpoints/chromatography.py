"""FastAPI endpoints for Analytical Chromatography & Separation Science."""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.models.chromatography import (
    ColumnParameters,
    MobilePhaseConditions,
)
from app.schemas.chromatography import (
    ChromatographyPresetSummary,
    ChromatographySimulationRequest,
    ChromatographySimulationResponse,
    VanDeemterResponse,
    ColumnParametersSchema,
    MobilePhaseConditionsSchema,
    AnalytePeakResponse,
    ChromatogramPointResponse,
)
from app.services.chromatography_service import chromatography_service

router = APIRouter(prefix="/chemistry/chromatography", tags=["chromatography"])


@router.get("/presets", response_model=List[ChromatographyPresetSummary])
def get_chromatography_presets():
    """Retrieve catalog of standard analytical HPLC and GC separation presets."""
    return chromatography_service.get_preset_summaries()


@router.get("/presets/{preset_id}", response_model=ChromatographySimulationResponse)
def get_preset_simulation(
    preset_id: str,
    flow_rate: Optional[float] = Query(None, ge=0.05, le=20.0, description="Override flow rate in mL/min"),
    organic_percent: Optional[float] = Query(None, ge=0.0, le=100.0, description="Override % organic solvent"),
    temperature_c: Optional[float] = Query(None, ge=5.0, le=350.0, description="Override temperature in °C"),
):
    """Run simulation on a standard preset with optional condition overrides."""
    try:
        res = chromatography_service.get_preset_simulation(
            preset_id=preset_id,
            custom_flow_rate=flow_rate,
            custom_organic_pct=organic_percent,
            custom_temp_c=temperature_c,
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    return _map_result_to_response(res)


@router.post("/simulate", response_model=ChromatographySimulationResponse)
def simulate_custom_separation(request: ChromatographySimulationRequest):
    """Simulate a custom mixture separation on user-specified column and conditions."""
    if not request.analytes:
        raise HTTPException(status_code=400, detail="At least one analyte must be specified.")

    col = ColumnParameters(
        name=request.column.name,
        length_mm=request.column.length_mm,
        inner_diameter_mm=request.column.inner_diameter_mm,
        particle_size_um=request.column.particle_size_um,
        film_thickness_um=request.column.film_thickness_um,
        stationary_phase=request.column.stationary_phase,
        void_volume_ml=request.column.void_volume_ml,
    )

    cond = MobilePhaseConditions(
        flow_rate_ml_min=request.conditions.flow_rate_ml_min,
        modality=request.conditions.modality,
        elution_mode=request.conditions.elution_mode,
        solvent_a_name=request.conditions.solvent_a_name,
        solvent_b_name=request.conditions.solvent_b_name,
        organic_percent=request.conditions.organic_percent,
        gradient_start_percent=request.conditions.gradient_start_percent,
        gradient_end_percent=request.conditions.gradient_end_percent,
        gradient_time_min=request.conditions.gradient_time_min,
        temperature_c=request.conditions.temperature_c,
        temp_ramp_rate_c_min=request.conditions.temp_ramp_rate_c_min,
        final_temperature_c=request.conditions.final_temperature_c,
        carrier_gas=request.conditions.carrier_gas,
    )

    res = chromatography_service.simulate_separation(
        sample_name=request.sample_name,
        modality=request.modality,
        detector=request.detector,
        column=col,
        conditions=cond,
        analytes=request.analytes,
        pedagogical_notes="Custom simulated separation using theoretical plate and Snyder-Soczewinski models.",
    )

    return _map_result_to_response(res)


@router.get("/van-deemter", response_model=VanDeemterResponse)
def get_van_deemter_curve(
    length_mm: float = Query(150.0, ge=10.0, le=1000.0),
    inner_diameter_mm: float = Query(4.6, ge=0.05, le=50.0),
    particle_size_um: float = Query(3.5, ge=1.0, le=50.0),
    flow_rate_ml_min: float = Query(1.0, ge=0.05, le=20.0),
):
    """Calculate van Deemter parameters and optimal velocity for HPLC column."""
    col = ColumnParameters(
        name="Test Column",
        length_mm=length_mm,
        inner_diameter_mm=inner_diameter_mm,
        particle_size_um=particle_size_um,
    )
    cond = MobilePhaseConditions(
        flow_rate_ml_min=flow_rate_ml_min,
    )
    vd = chromatography_service.calculate_van_deemter(col, cond)

    return VanDeemterResponse(
        term_a_um=vd.term_a_um,
        term_b_um_mm_s=vd.term_b_um_mm_s,
        term_c_s=vd.term_c_s,
        optimal_velocity_mm_s=vd.optimal_velocity_mm_s,
        minimum_plate_height_um=vd.minimum_plate_height_um,
        tested_velocity_mm_s=vd.tested_velocity_mm_s,
        operating_plate_height_um=vd.operating_plate_height_um,
    )


def _map_result_to_response(res) -> ChromatographySimulationResponse:
    return ChromatographySimulationResponse(
        simulation_id=res.simulation_id,
        sample_name=res.sample_name,
        modality=res.modality,
        elution_mode=res.elution_mode,
        detector=res.detector,
        run_time_min=res.run_time_min,
        dead_time_t0_min=res.dead_time_t0_min,
        column=ColumnParametersSchema(
            name=res.column.name,
            length_mm=res.column.length_mm,
            inner_diameter_mm=res.column.inner_diameter_mm,
            particle_size_um=res.column.particle_size_um,
            film_thickness_um=res.column.film_thickness_um,
            stationary_phase=res.column.stationary_phase,
            void_volume_ml=res.column.void_volume_ml,
        ),
        conditions=MobilePhaseConditionsSchema(
            flow_rate_ml_min=res.conditions.flow_rate_ml_min,
            modality=res.conditions.modality,
            elution_mode=res.conditions.elution_mode,
            solvent_a_name=res.conditions.solvent_a_name,
            solvent_b_name=res.conditions.solvent_b_name,
            organic_percent=res.conditions.organic_percent,
            gradient_start_percent=res.conditions.gradient_start_percent,
            gradient_end_percent=res.conditions.gradient_end_percent,
            gradient_time_min=res.conditions.gradient_time_min,
            temperature_c=res.conditions.temperature_c,
            temp_ramp_rate_c_min=res.conditions.temp_ramp_rate_c_min,
            final_temperature_c=res.conditions.final_temperature_c,
            carrier_gas=res.conditions.carrier_gas,
        ),
        van_deemter=VanDeemterResponse(
            term_a_um=res.van_deemter.term_a_um,
            term_b_um_mm_s=res.van_deemter.term_b_um_mm_s,
            term_c_s=res.van_deemter.term_c_s,
            optimal_velocity_mm_s=res.van_deemter.optimal_velocity_mm_s,
            minimum_plate_height_um=res.van_deemter.minimum_plate_height_um,
            tested_velocity_mm_s=res.van_deemter.tested_velocity_mm_s,
            operating_plate_height_um=res.van_deemter.operating_plate_height_um,
        ),
        peaks=[
            AnalytePeakResponse(
                compound_id=p.compound_id,
                compound_name=p.compound_name,
                chemical_formula=p.chemical_formula,
                molecular_weight=p.molecular_weight,
                retention_time_min=p.retention_time_min,
                retention_factor_k=p.retention_factor_k,
                theoretical_plates_n=p.theoretical_plates_n,
                peak_width_base_min=p.peak_width_base_min,
                peak_width_half_min=p.peak_width_half_min,
                peak_height_mau=p.peak_height_mau,
                peak_area_mau_s=p.peak_area_mau_s,
                tailing_factor=p.tailing_factor,
                resolution_with_previous=p.resolution_with_previous,
                selectivity_with_previous=p.selectivity_with_previous,
            )
            for p in res.peaks
        ],
        chromatogram_trace=[
            ChromatogramPointResponse(
                time_min=pt.time_min,
                signal_intensity=pt.signal_intensity,
            )
            for pt in res.chromatogram_trace
        ],
        mean_theoretical_plates=res.mean_theoretical_plates,
        minimum_resolution=res.minimum_resolution,
        separation_quality=res.separation_quality,
        pedagogical_notes=res.pedagogical_notes,
    )
