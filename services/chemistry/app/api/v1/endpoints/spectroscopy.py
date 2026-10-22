"""
Spectroscopy & Instrumental Analysis API Endpoints.
Covers UV-Vis spectrophotometer simulation, FTIR functional group identification, and NMR spectrum synthesis.
"""
from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException, Query
from services.chemistry.app.schemas.spectroscopy import (
    UvVisSimulationRequest,
    UvVisSimulationResponse,
    CalibrationCurveRequest,
    CalibrationCurveResponse,
    FtirSimulationRequest,
    FtirSimulationResponse,
    FtirPeakIdentificationRequest,
    FtirPeakIdentificationResponse,
    NmrSimulationRequest,
    NmrSimulationResponse,
    SpectroscopyChallengeResponse,
)
from services.chemistry.app.services.spectroscopy_service import SpectroscopyService

router = APIRouter(prefix="/spectroscopy", tags=["Spectroscopy & Instrumental Analysis"])


@router.get("/uv-vis/standards", response_model=List[Dict[str, Any]])
def list_uv_vis_standards():
    """List catalog of calibrated chromophores and absorbance standards."""
    standards = []
    for key, val in SpectroscopyService.UV_VIS_STANDARDS.items():
        standards.append({
            "id": key,
            "name": val["name"],
            "formula": val["formula"],
            "color": val["color"],
            "lambda_max_nm": val["lambda_max_nm"],
            "molar_absorptivity": val["epsilon_l_mol_cm"],
            "description": val["notes"],
        })
    return standards


@router.post("/uv-vis/simulate", response_model=UvVisSimulationResponse)
def simulate_uv_vis_spectrum(req: UvVisSimulationRequest):
    """Simulate Beer-Lambert absorbance spectrum across specified wavelength range."""
    result = SpectroscopyService.simulate_uv_vis(
        analyte_id=req.analyte_id,
        concentration_m=req.concentration_m,
        path_length_cm=req.path_length_cm,
        start_nm=req.start_wavelength_nm or 350.0,
        end_nm=req.end_wavelength_nm or 750.0,
        step_nm=req.step_nm or 2.0,
    )
    return UvVisSimulationResponse(
        analyte_id=result.analyte_id,
        analyte_name=result.analyte_name,
        analyte_formula=result.analyte_formula,
        concentration_m=result.concentration_m,
        path_length_cm=result.path_length_cm,
        molar_absorptivity_l_mol_cm=result.molar_absorptivity_l_mol_cm,
        lambda_max_nm=result.lambda_max_nm,
        absorbance_at_lambda_max=result.absorbance_at_lambda_max,
        transmittance_at_lambda_max=result.transmittance_at_lambda_max,
        chemical_color=result.chemical_color,
        spectrum_points=[
            {
                "wavelength_nm": p.wavelength_nm,
                "absorbance": p.absorbance,
                "transmittance_pct": p.transmittance_pct,
            }
            for p in result.spectrum_points
        ],
        notes=result.notes,
    )


@router.post("/uv-vis/calibration-curve", response_model=CalibrationCurveResponse)
def compute_calibration_curve(req: CalibrationCurveRequest):
    """Perform linear least-squares regression for standard calibration curve."""
    pts = [(p.concentration_m, p.absorbance) for p in req.standard_points]
    try:
        res = SpectroscopyService.calculate_calibration_curve(
            analyte_name=req.analyte_name,
            standard_points=pts,
            unknown_absorbance=req.unknown_absorbance,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return CalibrationCurveResponse(
        analyte_name=req.analyte_name,
        slope=res.slope,
        intercept=res.intercept,
        r_squared=res.r_squared,
        equation=res.equation,
        standard_points=req.standard_points,
        unknown_absorbance=res.unknown_absorbance,
        calculated_concentration_m=res.calculated_concentration_m,
        analysis_notes=res.analysis_notes,
    )


@router.post("/ftir/simulate", response_model=FtirSimulationResponse)
def simulate_ftir_spectrum(req: FtirSimulationRequest):
    """Simulate FTIR transmittance spectrum across mid-IR range 4000 to 400 cm-1."""
    res = SpectroscopyService.simulate_ftir(compound_id=req.compound_id)
    return FtirSimulationResponse(
        compound_name=res.compound_name,
        compound_formula=res.compound_formula,
        detected_bands=[
            {
                "wavenumber_cm1": b.wavenumber_cm1,
                "transmittance_pct": b.transmittance_pct,
                "intensity": b.intensity,
                "assigned_bond": b.assigned_bond,
                "functional_group": b.functional_group,
            }
            for b in res.detected_bands
        ],
        spectrum_points=[
            {
                "wavenumber_cm1": p.wavenumber_cm1,
                "transmittance_pct": p.transmittance_pct,
            }
            for p in res.spectrum_points
        ],
        fingerprint_summary=res.fingerprint_summary,
    )


@router.post("/ftir/identify-peaks", response_model=FtirPeakIdentificationResponse)
def identify_ftir_peaks(req: FtirPeakIdentificationRequest):
    """Correlate experimental infrared absorption peaks to known functional groups."""
    res = SpectroscopyService.identify_ftir_peaks(
        peaks=req.experimental_peaks_cm1,
        tolerance_cm1=req.tolerance_cm1 or 40.0,
    )
    return FtirPeakIdentificationResponse(
        matches=res["matches"],
        diagnostic_assessment=res["diagnostic_assessment"],
    )


@router.post("/nmr/simulate", response_model=NmrSimulationResponse)
def simulate_nmr_spectrum(req: NmrSimulationRequest):
    """Simulate 1H or 13C NMR spectrum with peak splitting and continuous chemical shift trace."""
    res = SpectroscopyService.simulate_nmr(
        compound_id=req.compound_id,
        nucleus=req.nucleus or "1H",
        spectrometer_freq_mhz=req.spectrometer_freq_mhz or 400.0,
    )
    return NmrSimulationResponse(
        nucleus=res.nucleus,
        compound_name=res.compound_name,
        solvent=res.solvent,
        spectrometer_freq_mhz=res.spectrometer_freq_mhz,
        total_integrated_nuclei=res.total_integrated_nuclei,
        signals=[
            {
                "chemical_shift_ppm": s.chemical_shift_ppm,
                "multiplicity": s.multiplicity,
                "integration_protons": s.integration_protons,
                "coupling_constant_hz": s.coupling_constant_hz,
                "assignment": s.assignment,
            }
            for s in res.signals
        ],
        spectrum_points=[
            {
                "chemical_shift_ppm": p.chemical_shift_ppm,
                "intensity": p.intensity,
            }
            for p in res.spectrum_points
        ],
    )


@router.get("/challenges", response_model=List[SpectroscopyChallengeResponse])
def get_spectroscopy_challenges():
    """Fetch unknown structure determination challenge problems."""
    challenges = SpectroscopyService.get_challenges()
    responses = []
    for ch in challenges:
        responses.append(
            SpectroscopyChallengeResponse(
                challenge_id=ch.challenge_id,
                title=ch.title,
                difficulty=ch.difficulty,
                molecular_formula=ch.molecular_formula,
                molecular_weight=ch.molecular_weight,
                uv_vis_summary=ch.uv_vis_summary,
                ftir_prominent_peaks=ch.ftir_prominent_peaks,
                nmr_signals=ch.nmr_signals,
                candidate_structures=ch.candidate_structures,
                correct_compound_name=ch.correct_compound_name,
                explanation=ch.explanation,
            )
        )
    return responses
