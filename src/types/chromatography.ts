export type ChromatographyModality = 'hplc' | 'gc';

export type ElutionMode = 'isocratic' | 'gradient' | 'isothermal' | 'temperature_programmed';

export type DetectorType = 'uv_dad' | 'fid' | 'rid';

export type StationaryPhaseType =
  | 'c18_octadecyl'
  | 'c8_octyl'
  | 'phenyl_hexyl'
  | 'silica_normal'
  | 'db_1_100_dimethyl'
  | 'db_5_5_phenyl'
  | 'wax_polyethylene_glycol';

export interface ColumnParameters {
  name: string;
  length_mm: number;
  inner_diameter_mm: number;
  particle_size_um: number;
  film_thickness_um: number;
  stationary_phase: StationaryPhaseType;
  void_volume_ml: number;
}

export interface MobilePhaseConditions {
  flow_rate_ml_min: number;
  modality: ChromatographyModality;
  elution_mode: ElutionMode;
  solvent_a_name: string;
  solvent_b_name: string;
  organic_percent: number;
  gradient_start_percent: number;
  gradient_end_percent: number;
  gradient_time_min: number;
  temperature_c: number;
  temp_ramp_rate_c_min: number;
  final_temperature_c: number;
  carrier_gas: string;
}

export interface VanDeemterParameters {
  term_a_um: number;
  term_b_um_mm_s: number;
  term_c_s: number;
  optimal_velocity_mm_s: number;
  minimum_plate_height_um: number;
  tested_velocity_mm_s: number;
  operating_plate_height_um: number;
}

export interface AnalytePeak {
  compound_id: string;
  compound_name: string;
  chemical_formula: string;
  molecular_weight: number;
  retention_time_min: number;
  retention_factor_k: number;
  theoretical_plates_n: number;
  peak_width_base_min: number;
  peak_width_half_min: number;
  peak_height_mau: number;
  peak_area_mau_s: number;
  tailing_factor: number;
  resolution_with_previous?: number | null;
  selectivity_with_previous?: number | null;
}

export interface ChromatogramDataPoint {
  time_min: number;
  signal_intensity: number;
}

export interface ChromatographySimulationResult {
  simulation_id: string;
  sample_name: string;
  modality: ChromatographyModality;
  elution_mode: ElutionMode;
  detector: DetectorType;
  run_time_min: number;
  dead_time_t0_min: number;
  column: ColumnParameters;
  conditions: MobilePhaseConditions;
  van_deemter: VanDeemterParameters;
  peaks: AnalytePeak[];
  chromatogram_trace: ChromatogramDataPoint[];
  mean_theoretical_plates: number;
  minimum_resolution: number;
  separation_quality: 'baseline_resolved' | 'partial_overlap' | 'co_eluting';
  pedagogical_notes: string;
}

export interface ChromatographyPresetSummary {
  id: string;
  name: string;
  modality: ChromatographyModality;
  elution_mode: ElutionMode;
  target_compounds: string[];
  description: string;
  recommended_column: string;
  recommended_conditions: string;
}

export interface AnalyteCompoundInput {
  compound_id: string;
  compound_name: string;
  chemical_formula: string;
  molecular_weight: number;
  log_kow: number;
  boiling_point_c?: number;
  concentration_mg_l: number;
}
