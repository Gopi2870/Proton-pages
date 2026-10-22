/**
 * Reaction Kinetics & Catalytic Dynamics Types
 */

export interface KineticsTimePoint {
  time_seconds: number;
  concentration_m: number;
  rate_m_s: number;
  ln_conc?: number;
  inv_conc?: number;
}

export interface RateLawSimulationResult {
  reaction_name: string;
  order: number;
  initial_conc_m: number;
  rate_constant_k: number;
  k_units: string;
  half_life_seconds: number;
  differential_rate_equation: string;
  integrated_rate_equation: string;
  time_series: KineticsTimePoint[];
  notes: string;
}

export interface ArrheniusResult {
  activation_energy_j_mol: number;
  activation_energy_kj_mol: number;
  pre_exponential_factor_a: number;
  target_temperature_c?: number;
  predicted_k_at_target?: number;
  equation: string;
  temp_curve: Array<{
    temp_c: number;
    temp_k: number;
    rate_constant_k: number;
  }>;
}

export interface MichaelisMentenPoint {
  substrate_conc_um: number;
  velocity_um_s: number;
  inv_substrate: number;
  inv_velocity: number;
}

export interface MichaelisMentenResult {
  enzyme_name: string;
  v_max: number;
  k_m: number;
  inhibition_type?: string;
  inhibitor_conc_um?: number;
  k_i_um?: number;
  apparent_v_max: number;
  apparent_k_m: number;
  lineweaver_burk_slope: number;
  lineweaver_burk_intercept: number;
  saturation_points: MichaelisMentenPoint[];
}

export interface ConsecutiveKineticsPoint {
  time_seconds: number;
  conc_a: number;
  conc_b: number;
  conc_c: number;
}

export interface ConsecutiveKineticsResult {
  initial_a_m: number;
  k1: number;
  k2: number;
  t_max_intermediate_seconds: number;
  max_intermediate_conc_m: number;
  time_series: ConsecutiveKineticsPoint[];
  description: string;
}

export interface PresetKineticsReaction {
  id: string;
  name: string;
  order?: number;
  typical_k?: number;
  k_units?: string;
  ea_kj_mol?: number;
  is_enzyme?: boolean;
  v_max?: number;
  k_m?: number;
  description: string;
}
