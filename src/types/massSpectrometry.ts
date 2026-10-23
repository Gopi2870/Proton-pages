/**
 * Types for Analytical Chromatography & Mass Spectrometry (PR #051).
 */

export interface MassPeak {
  mz: number;
  relative_intensity: number;
  fragment_formula: string;
  fragment_name: string;
  mechanism: string;
  is_molecular_ion: boolean;
}

export interface IsotopePeak {
  mass: number;
  relative_abundance: number;
  isotopic_label: string;
}

export interface ChromatographicPeak {
  analyte_name: string;
  formula: string;
  retention_time_min: number;
  peak_width_min: number;
  peak_area: number;
  retention_factor_k: number;
  base_mz: number;
}

export interface VanDeemterPoint {
  linear_velocity_cm_s: number;
  plate_height_h_um: number;
  eddy_diffusion_a_um: number;
  longitudinal_diffusion_b_um: number;
  mass_transfer_c_um: number;
}

export interface MsStandard {
  id: string;
  name: string;
  formula: string;
  smiles: string;
  molecular_weight: number;
  monoisotopic_mass: number;
  category: string;
  ionization_mode: string;
  base_peak_mz: number;
  peaks: MassPeak[];
  description: string;
}

export interface MsSimulationRequest {
  standard_id?: string;
  custom_formula?: string;
  ionization_mode?: string;
  electron_energy_ev?: number;
}

export interface MsSimulationResponse {
  analyte_name: string;
  formula: string;
  exact_mass: number;
  base_peak_mz: number;
  molecular_ion_mz: number;
  molecular_ion_stability: 'high' | 'moderate' | 'fragile / absent' | string;
  spectrum: MassPeak[];
  diagnostic_neutral_losses: string[];
}

export interface IsotopeEnvelopeRequest {
  formula: string;
  charge?: number;
  resolution?: number;
}

export interface IsotopeEnvelopeResponse {
  formula: string;
  monoisotopic_mass: number;
  m_plus_1_expected_pct: number;
  m_plus_2_expected_pct: number;
  peaks: IsotopePeak[];
  pattern_signature: string;
}

export interface VanDeemterRequest {
  particle_diameter_um?: number;
  column_length_mm?: number;
  diffusion_coeff_cm2_s?: number;
  retention_factor_k?: number;
  velocities_cm_s?: number[];
}

export interface VanDeemterResponse {
  a_term_um: number;
  b_term_cm2_s: number;
  c_term_s: number;
  optimum_velocity_cm_s: number;
  minimum_plate_height_um: number;
  maximum_theoretical_plates: number;
  curve: VanDeemterPoint[];
}

export interface ChromatogramSimulationRequest {
  analyte_ids?: string[];
  column_length_mm?: number;
  flow_rate_ml_min?: number;
  temperature_c?: number;
  stationary_phase_polarity?: string;
}

export interface ChromatogramSimulationResponse {
  dead_time_t0_min: number;
  total_run_time_min: number;
  peaks: ChromatographicPeak[];
  resolution_pairs: Record<string, number>;
}
