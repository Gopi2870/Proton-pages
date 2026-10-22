"""
Pydantic Schemas for Spectroscopy and Instrumental Analysis API.
"""
from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field


class UvVisPointSchema(BaseModel):
    wavelength_nm: float
    absorbance: float
    transmittance_pct: float


class UvVisSimulationRequest(BaseModel):
    analyte_id: str = Field(..., description="Standard analyte ID (e.g., 'kmno4', 'cuso4', 'riboflavin', 'methyl_orange')")
    concentration_m: float = Field(..., gt=0, le=1.0, description="Concentration in mol/L (M)")
    path_length_cm: float = Field(default=1.0, gt=0, le=10.0, description="Optical path length in cm")
    start_wavelength_nm: Optional[float] = Field(default=350.0, ge=200.0, le=800.0)
    end_wavelength_nm: Optional[float] = Field(default=750.0, ge=250.0, le=1000.0)
    step_nm: Optional[float] = Field(default=2.0, ge=0.5, le=10.0)


class UvVisSimulationResponse(BaseModel):
    analyte_id: str
    analyte_name: str
    analyte_formula: str
    concentration_m: float
    path_length_cm: float
    molar_absorptivity_l_mol_cm: float
    lambda_max_nm: float
    absorbance_at_lambda_max: float
    transmittance_at_lambda_max: float
    chemical_color: str
    spectrum_points: List[UvVisPointSchema]
    notes: str


class CalibrationPointSchema(BaseModel):
    concentration_m: float = Field(..., ge=0)
    absorbance: float = Field(..., ge=0)


class CalibrationCurveRequest(BaseModel):
    analyte_name: str
    standard_points: List[CalibrationPointSchema] = Field(..., min_length=2)
    unknown_absorbance: Optional[float] = Field(default=None, ge=0)


class CalibrationCurveResponse(BaseModel):
    analyte_name: str
    slope: float
    intercept: float
    r_squared: float
    equation: str
    standard_points: List[CalibrationPointSchema]
    unknown_absorbance: Optional[float] = None
    calculated_concentration_m: Optional[float] = None
    analysis_notes: str


class FtirBandSchema(BaseModel):
    wavenumber_cm1: float
    transmittance_pct: float
    intensity: str
    assigned_bond: str
    functional_group: str


class FtirPointSchema(BaseModel):
    wavenumber_cm1: float
    transmittance_pct: float


class FtirSimulationRequest(BaseModel):
    compound_id: str = Field(..., description="Compound ID (e.g. 'ethanol', 'acetone', 'acetic_acid', 'toluene', 'benzaldehyde')")


class FtirSimulationResponse(BaseModel):
    compound_name: str
    compound_formula: str
    detected_bands: List[FtirBandSchema]
    spectrum_points: List[FtirPointSchema]
    fingerprint_summary: str


class FtirPeakIdentificationRequest(BaseModel):
    experimental_peaks_cm1: List[float] = Field(..., min_length=1)
    tolerance_cm1: Optional[float] = Field(default=40.0, ge=5.0, le=100.0)


class IdentifiedGroupMatch(BaseModel):
    experimental_peak_cm1: float
    matched_group: str
    typical_range_cm1: str
    bond_vibration: str
    confidence: float


class FtirPeakIdentificationResponse(BaseModel):
    matches: List[IdentifiedGroupMatch]
    diagnostic_assessment: str


class NmrSignalSchema(BaseModel):
    chemical_shift_ppm: float
    multiplicity: str
    integration_protons: int
    coupling_constant_hz: Optional[float] = None
    assignment: str


class NmrPointSchema(BaseModel):
    chemical_shift_ppm: float
    intensity: float


class NmrSimulationRequest(BaseModel):
    compound_id: str = Field(..., description="Compound ID (e.g., 'ethanol', 'acetone', 'ethyl_acetate', 'toluene')")
    nucleus: Optional[str] = Field(default="1H", pattern="^(1H|13C)$")
    spectrometer_freq_mhz: Optional[float] = Field(default=400.0, ge=60.0, le=1000.0)


class NmrSimulationResponse(BaseModel):
    nucleus: str
    compound_name: str
    solvent: str
    spectrometer_freq_mhz: float
    total_integrated_nuclei: int
    signals: List[NmrSignalSchema]
    spectrum_points: List[NmrPointSchema]


class CandidateStructureSchema(BaseModel):
    name: str
    formula: str
    smiles: str
    iupac: str


class SpectroscopyChallengeResponse(BaseModel):
    challenge_id: str
    title: str
    difficulty: str
    molecular_formula: str
    molecular_weight: float
    uv_vis_summary: str
    ftir_prominent_peaks: List[float]
    nmr_signals: List[Dict[str, Any]]
    candidate_structures: List[CandidateStructureSchema]
    correct_compound_name: str
    explanation: str
