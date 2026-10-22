/**
 * Type definitions for Surface Chemistry, Heterogeneous Catalysis & Langmuir-BET Adsorption (PR #041).
 */

export interface AdsorptionDataPoint {
  relative_pressure: number;
  volume_adsorbed_cm3_g: number;
  pressure_kpa?: number;
}

export interface MaterialSummary {
  id: string;
  name: string;
  material_type: string;
  description: string;
  isotherm_type: string;
  literature_bet_surface_area_m2_g: number;
}

export interface AdsorbentMaterial extends MaterialSummary {
  monolayer_volume_cm3_g: number;
  c_constant: number;
  sample_points: AdsorptionDataPoint[];
}

export interface BetLinearFit {
  slope: number;
  intercept: number;
  r_squared: number;
  monolayer_capacity_vm: number;
  c_parameter: number;
  specific_surface_area_m2_g: number;
  is_c_positive: boolean;
  is_valid_bet_range: boolean;
}

export interface BetPlotPoint {
  relative_pressure: number;
  volume_adsorbed: number;
  bet_transform_y: number;
  is_in_bet_range: boolean;
}

export interface BetCalculationRequest {
  material_id?: string | null;
  sample_points?: AdsorptionDataPoint[];
  sample_mass_g?: number;
  adsorbate_cross_section_nm2?: number;
  p0_saturation_kpa?: number;
}

export interface BetCalculationResponse {
  material_name: string;
  isotherm_type: string;
  sample_mass_g: number;
  bet_fit: BetLinearFit;
  linear_plot_points: BetPlotPoint[];
  pedagogical_summary: string;
}

export interface IsothermFitModel {
  model_name: string;
  parameters: Record<string, number>;
  r_squared: number;
  predicted_points: { relative_pressure: number; volume_pred: number }[];
  equation_display: string;
}

export interface IsothermComparisonResponse {
  material_name: string;
  experimental_points: { relative_pressure: number; volume_adsorbed: number }[];
  langmuir_fit: IsothermFitModel;
  freundlich_fit: IsothermFitModel;
  bet_fit: IsothermFitModel;
  best_fitting_model: string;
}

export interface CatalyticKineticsPoint {
  partial_pressure_a_kpa: number;
  rate_langmuir_hinshelwood: number;
  rate_eley_rideal: number;
  coverage_theta_a: number;
  coverage_theta_b: number;
  fraction_vacant_theta_v: number;
}

export interface CatalysisSimulationRequest {
  mechanism?: 'langmuir_hinshelwood' | 'eley_rideal' | 'both';
  rate_constant_k?: number;
  adsorption_constant_ka?: number;
  adsorption_constant_kb?: number;
  fixed_partial_pressure_b_kpa?: number;
  max_pressure_a_kpa?: number;
  points_count?: number;
}

export interface CatalysisSimulationResponse {
  kinetics_curve: CatalyticKineticsPoint[];
  lh_peak_pressure_a_kpa?: number;
  lh_maximum_rate?: number;
  summary: string;
}
