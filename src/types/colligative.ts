export type SolutionModelType =
  | 'ideal_raoult'
  | 'margules_two_suffix'
  | 'van_t_hoff_colligative'
  | 'debye_huckel_limiting'
  | 'extended_debye_huckel'
  | 'davies_equation';

export type PressureUnit = 'atm' | 'bar' | 'kPa' | 'mmHg' | 'Torr' | 'psi';

export interface SolventProperties {
  name: string;
  formula: string;
  molar_mass_g_mol: number;
  normal_boiling_point_c: number;
  kb_c_kg_mol: number;
  normal_freezing_point_c: number;
  kf_c_kg_mol: number;
  density_g_cm3: number;
  description: string;
}

export interface SoluteProperties {
  name: string;
  formula: string;
  molar_mass_g_mol: number;
  van_t_hoff_i: number;
  is_electrolyte: boolean;
  cation_charge?: number | null;
  anion_charge?: number | null;
  cation_count?: number | null;
  anion_count?: number | null;
}

export interface VlePoint {
  x1_liquid: number;
  y1_vapor: number;
  pressure_kpa: number;
  pressure_mmhg: number;
  activity_coeff_1: number;
  activity_coeff_2: number;
}

export interface VaporPressureRequest {
  solvent1_id: string;
  solvent2_id: string;
  temperature_c: number;
  x1_mole_fraction: number;
  non_ideal_parameter_a12?: number | null;
}

export interface VaporPressureResponse {
  solvent1_name: string;
  solvent2_name: string;
  temperature_c: number;
  x1_mole_fraction: number;
  x2_mole_fraction: number;
  p1_pure_kpa: number;
  p2_pure_kpa: number;
  activity_coeff_1: number;
  activity_coeff_2: number;
  p1_partial_kpa: number;
  p2_partial_kpa: number;
  total_vapor_pressure_kpa: number;
  total_vapor_pressure_mmhg: number;
  y1_vapor_mole_fraction: number;
  y2_vapor_mole_fraction: number;
  azeotrope_detected: boolean;
  azeotrope_x1?: number | null;
  model_type: SolutionModelType;
  vle_curve: VlePoint[];
}

export interface BoilingFreezingRequest {
  solvent_id: string;
  solute_id: string;
  solute_mass_g: number;
  solvent_mass_g: number;
  custom_van_t_hoff_i?: number | null;
  observed_delta_tf_c?: number | null;
}

export interface BoilingFreezingResponse {
  solvent_name: string;
  solute_name: string;
  solute_mass_g: number;
  solvent_mass_g: number;
  molality_m: number;
  van_t_hoff_factor_i: number;
  pure_boiling_point_c: number;
  delta_tb_c: number;
  solution_boiling_point_c: number;
  pure_freezing_point_c: number;
  delta_tf_c: number;
  solution_freezing_point_c: number;
  dilute_limit_exceeded: boolean;
  applicability_warning?: string | null;
  estimated_molar_mass_g_mol?: number | null;
}

export interface OsmoticPressureRequest {
  solute_name: string;
  temperature_c: number;
  solute_mass_g: number;
  solution_volume_l: number;
  solute_molar_mass_g_mol?: number | null;
  van_t_hoff_i?: number;
  solvent_density_g_cm3?: number;
}

export interface OsmoticPressureResponse {
  solute_name: string;
  temperature_c: number;
  molarity_m: number;
  molality_m: number;
  van_t_hoff_i: number;
  osmotic_pressure_atm: number;
  osmotic_pressure_bar: number;
  osmotic_pressure_kpa: number;
  osmotic_pressure_mmhg: number;
  morse_corrected_pressure_atm: number;
  is_isotonic_blood: boolean;
  tonicity_category: string;
  macromolecule_mw_estimate?: number | null;
}

export interface IonicStrengthRequest {
  electrolyte_id: string;
  molarity_m: number;
  temperature_c?: number;
  ion_radius_angstrom?: number;
}

export interface IonicStrengthPoint {
  concentration_m: number;
  ionic_strength: number;
  gamma_plus_minus: number;
}

export interface IonicStrengthResponse {
  electrolyte_formula: string;
  molarity_m: number;
  ionic_strength_i: number;
  cation_charge_z_plus: number;
  anion_charge_z_minus: number;
  dhll_gamma_plus_minus: number;
  extended_dh_gamma_plus_minus: number;
  davies_gamma_plus_minus: number;
  selected_gamma: number;
  regime_description: string;
  validity_warning?: string | null;
  activity_curve: IonicStrengthPoint[];
}

export interface ColligativePresetSummary {
  id: string;
  title: string;
  category: string;
  description: string;
}
