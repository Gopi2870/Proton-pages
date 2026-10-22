export type ElectrochemicalReversibility =
  | 'reversible'
  | 'quasi_reversible'
  | 'irreversible';

export interface VoltammogramPoint {
  potential_v: number;
  current_ua: number;
  current_faradaic_ua: number;
  current_capacitive_ua: number;
  scan_direction: 'forward' | 'reverse';
  time_s: number;
}

export interface ChronoamperometryPoint {
  time_s: number;
  current_ua: number;
  inv_sqrt_time: number;
}

export interface CyclicVoltammetryRequest {
  preset_id?: string;
  system_name?: string;
  e0_v: number;
  n_electrons: number;
  e_start_v: number;
  e_switch_v: number;
  scan_rate_v_s: number;
  concentration_mm: number;
  diffusion_coefficient_cm2_s: number;
  electrode_area_cm2: number;
  standard_rate_constant_k0_cm_s: number;
  transfer_coefficient_alpha: number;
  temperature_k?: number;
  double_layer_capacitance_uf_cm2?: number;
}

export interface CyclicVoltammetryResponse {
  system_name: string;
  reversibility: ElectrochemicalReversibility;
  n_electrons: number;
  e_half_v: number;
  e_peak_anodic_v: number;
  e_peak_cathodic_v?: number | null;
  delta_ep_mv?: number | null;
  peak_current_anodic_ua: number;
  peak_current_cathodic_ua?: number | null;
  current_ratio?: number | null;
  scan_rate_v_s: number;
  diffusion_coefficient_cm2_s: number;
  electrode_area_cm2: number;
  concentration_mm: number;
  standard_rate_constant_k0_cm_s: number;
  transfer_coefficient_alpha: number;
  voltammogram: VoltammogramPoint[];
  pedagogical_summary: string;
}

export interface ChronoamperometryRequest {
  preset_id?: string;
  applied_potential_v: number;
  duration_s: number;
  time_step_s?: number;
  concentration_mm: number;
  diffusion_coefficient_cm2_s: number;
  electrode_area_cm2: number;
  n_electrons: number;
  temperature_k?: number;
}

export interface ChronoamperometryResponse {
  system_name: string;
  applied_potential_v: number;
  duration_s: number;
  cottrell_slope_ua_s_half: number;
  diffusion_coefficient_cm2_s: number;
  curve: ChronoamperometryPoint[];
  pedagogical_summary: string;
}

export interface ElectrochemicalPresetSummary {
  id: string;
  name: string;
  redox_couple: string;
  reversibility: ElectrochemicalReversibility;
  e0_v_vs_she: number;
  n_electrons: number;
  standard_d_cm2_s: number;
  standard_k0_cm_s: number;
  alpha: number;
  description: string;
}
