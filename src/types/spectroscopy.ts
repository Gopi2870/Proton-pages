/**
 * Spectroscopy & Instrumental Analysis Types
 */

export interface UvVisPoint {
  wavelength_nm: number;
  absorbance: number;
  transmittance_pct: number;
}

export interface UvVisStandard {
  id: string;
  name: string;
  formula: string;
  color: string;
  lambda_max_nm: number;
  molar_absorptivity: number;
  description: string;
}

export interface UvVisSimulationResult {
  analyte_id: string;
  analyte_name: string;
  analyte_formula: string;
  concentration_m: number;
  path_length_cm: number;
  molar_absorptivity_l_mol_cm: number;
  lambda_max_nm: number;
  absorbance_at_lambda_max: number;
  transmittance_at_lambda_max: number;
  chemical_color: string;
  spectrum_points: UvVisPoint[];
  notes: string;
}

export interface CalibrationPoint {
  concentration_m: number;
  absorbance: number;
}

export interface CalibrationCurveResult {
  analyte_name: string;
  slope: number;
  intercept: number;
  r_squared: number;
  equation: string;
  standard_points: CalibrationPoint[];
  unknown_absorbance?: number;
  calculated_concentration_m?: number;
  analysis_notes: string;
}

export interface FtirBand {
  wavenumber_cm1: number;
  transmittance_pct: number;
  intensity: string;
  assigned_bond: string;
  functional_group: string;
}

export interface FtirPoint {
  wavenumber_cm1: number;
  transmittance_pct: number;
}

export interface FtirSimulationResult {
  compound_name: string;
  compound_formula: string;
  detected_bands: FtirBand[];
  spectrum_points: FtirPoint[];
  fingerprint_summary: string;
}

export interface IdentifiedGroupMatch {
  experimental_peak_cm1: number;
  matched_group: string;
  typical_range_cm1: string;
  bond_vibration: string;
  confidence: number;
}

export interface FtirPeakIdentificationResult {
  matches: IdentifiedGroupMatch[];
  diagnostic_assessment: string;
}

export interface NmrSignal {
  chemical_shift_ppm: number;
  multiplicity: string;
  integration_protons: number;
  coupling_constant_hz?: number;
  assignment: string;
}

export interface NmrPoint {
  chemical_shift_ppm: number;
  intensity: number;
}

export interface NmrSimulationResult {
  nucleus: string;
  compound_name: string;
  solvent: string;
  spectrometer_freq_mhz: number;
  total_integrated_nuclei: number;
  signals: NmrSignal[];
  spectrum_points: NmrPoint[];
}

export interface SpectroscopyChallenge {
  challenge_id: string;
  title: string;
  difficulty: string;
  molecular_formula: string;
  molecular_weight: number;
  uv_vis_summary: string;
  ftir_prominent_peaks: number[];
  nmr_signals: Array<{
    shift: number;
    multiplicity: string;
    integration: number;
    assignment: string;
  }>;
  candidate_structures: Array<{
    name: string;
    formula: string;
    smiles: string;
    iupac: string;
  }>;
  correct_compound_name: string;
  explanation: string;
}
