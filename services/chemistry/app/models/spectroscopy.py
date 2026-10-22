"""
Spectroscopy and Instrumental Analysis Domain Models.
Covers UV-Vis Spectrophotometry, FTIR Vibrational Spectroscopy, and NMR Chemical Shifts.
"""
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any


@dataclass
class UvVisSpectrumPoint:
    """Individual data point in a UV-Vis absorption spectrum."""
    wavelength_nm: float
    absorbance: float
    transmittance_pct: float


@dataclass
class UvVisSimulationResult:
    """Analytical UV-Vis spectrophotometry simulation output."""
    analyte_id: str
    analyte_name: str
    analyte_formula: str
    concentration_m: float
    path_length_cm: float
    molar_absorptivity_l_mol_cm: float  # Epsilon at lambda_max
    lambda_max_nm: float
    absorbance_at_lambda_max: float
    transmittance_at_lambda_max: float
    spectrum_points: List[UvVisSpectrumPoint] = field(default_factory=list)
    chemical_color: str = "#8B572A"
    notes: str = ""


@dataclass
class CalibrationPoint:
    """Standard concentration vs absorbance calibration point."""
    concentration_m: float
    absorbance: float


@dataclass
class CalibrationCurveResult:
    """Linear regression model for Beer-Lambert spectrophotometric quantification."""
    slope: float  # m = epsilon * b
    intercept: float
    r_squared: float
    equation: str
    standard_points: List[CalibrationPoint] = field(default_factory=list)
    unknown_absorbance: Optional[float] = None
    calculated_concentration_m: Optional[float] = None
    analysis_notes: str = ""


@dataclass
class FtirBand:
    """Individual vibrational absorption band in an FTIR spectrum."""
    wavenumber_cm1: float
    transmittance_pct: float
    intensity: str  # 'strong', 'medium', 'weak', 'broad'
    assigned_bond: str  # e.g., 'O-H stretch', 'C=O stretch'
    functional_group: str  # e.g., 'Alcohol', 'Ketone/Aldehyde'


@dataclass
class FtirSpectrumPoint:
    """Continuous wavenumber point for FTIR transmittance spectrum."""
    wavenumber_cm1: float
    transmittance_pct: float


@dataclass
class FtirSimulationResult:
    """Analytical Fourier Transform Infrared (FTIR) spectrum output."""
    compound_name: str
    compound_formula: str
    detected_bands: List[FtirBand] = field(default_factory=list)
    spectrum_points: List[FtirSpectrumPoint] = field(default_factory=list)
    fingerprint_summary: str = ""


@dataclass
class NmrSignal:
    """Resonance peak signal in 1H or 13C Nuclear Magnetic Resonance spectrum."""
    chemical_shift_ppm: float
    multiplicity: str  # 'singlet', 'doublet', 'triplet', 'quartet', 'multiplet'
    integration_protons: int
    coupling_constant_hz: Optional[float]
    assignment: str  # e.g., '-CH3 adjacent to carbonyl'


@dataclass
class NmrSpectrumPoint:
    """Continuous chemical shift point in NMR frequency trace."""
    chemical_shift_ppm: float
    intensity: float


@dataclass
class NmrSimulationResult:
    """Simulated 1H or 13C NMR spectrum with peak assignments."""
    nucleus: str  # '1H' or '13C'
    compound_name: str
    solvent: str  # e.g., 'CDCl3', 'DMSO-d6'
    spectrometer_freq_mhz: float
    signals: List[NmrSignal] = field(default_factory=list)
    spectrum_points: List[NmrSpectrumPoint] = field(default_factory=list)
    total_integrated_nuclei: int = 0


@dataclass
class SpectroscopyChallenge:
    """Pedagogical unknown structure identification problem."""
    challenge_id: str
    title: str
    difficulty: str  # 'Introductory', 'Intermediate', 'Advanced'
    molecular_formula: str
    molecular_weight: float
    uv_vis_summary: str
    ftir_prominent_peaks: List[float]
    nmr_signals: List[Dict[str, Any]]
    candidate_structures: List[Dict[str, str]]
    correct_compound_name: str
    explanation: str
