/**
 * TypeScript domain models for Hydrodynamic Electrochemistry, RDE, RRDE & Stripping Voltammetry.
 */

export type ElectrodeType =
  | 'glassy_carbon'
  | 'platinum_disk'
  | 'gold_disk'
  | 'mercury_film'
  | 'bismuth_film'
  | 'boron_doped_diamond';

export type StrippingMode = 'linear_sweep' | 'differential_pulse' | 'square_wave';

export interface RdeHydrodynamicPoint {
  rotation_speed_rpm: number;
  angular_velocity_rad_s: number;
  sqrt_angular_velocity: number;
  limiting_current_ua: number;
  hydrodynamic_boundary_layer_um: number;
  kinetic_current_ua?: number;
}

export interface KouteckyLevichPoint {
  inv_sqrt_omega: number;
  inv_current_ua: number;
}

export interface StrippingPeak {
  metal_ion: string;
  symbol: string;
  peak_potential_v: number;
  peak_current_ua: number;
  fwhm_mv: number;
  concentration_ppb: number;
  detection_limit_ppb: number;
}

export interface VoltammogramWavePoint {
  potential_v: number;
  current_disk_ua: number;
  current_ring_ua?: number;
}

export interface RdeSimulationRequest {
  system_name?: string;
  electrode_type: ElectrodeType;
  electrode_radius_mm: number;
  concentration_mm: number;
  n_electrons: number;
  diffusion_coefficient_cm2_s: number;
  kinematic_viscosity_cm2_s: number;
  rotation_speeds_rpm: number[];
  overpotential_mv?: number;
  heterogeneous_rate_constant_k0_cm_s?: number;
  transfer_coefficient_alpha?: number;
}

export interface RdeSimulationResult {
  system_name: string;
  electrode_type: ElectrodeType;
  electrode_area_cm2: number;
  diffusion_coefficient_cm2_s: number;
  kinematic_viscosity_cm2_s: number;
  concentration_mm: number;
  n_electrons: number;
  levich_slope_ua_s_half: number;
  levich_points: RdeHydrodynamicPoint[];
  koutecky_levich_points: KouteckyLevichPoint[];
  heterogeneous_rate_constant_k0_cm_s: number;
  rrde_collection_efficiency_theoretical: number;
  polarization_waves: Record<string, VoltammogramWavePoint[]>[];
}

export interface StrippingVoltammetryRequest {
  sample_name?: string;
  deposition_potential_v: number;
  deposition_time_s: number;
  equilibration_time_s?: number;
  stripping_mode: StrippingMode;
  electrode_type: ElectrodeType;
  step_potential_mv?: number;
  square_wave_amplitude_mv?: number;
  square_wave_frequency_hz?: number;
  zn_concentration_ppb: number;
  cd_concentration_ppb: number;
  pb_concentration_ppb: number;
  cu_concentration_ppb: number;
}

export interface StrippingPoint {
  potential_v: number;
  current_total_ua: number;
  current_background_ua: number;
  current_stripping_ua: number;
}

export interface StrippingVoltammetryResult {
  analyte_name: string;
  deposition_potential_v: number;
  deposition_time_s: number;
  stripping_mode: StrippingMode;
  peaks_detected: StrippingPeak[];
  stripping_curve: StrippingPoint[];
  preconcentration_factor: number;
  pedagogical_insights: string;
}

export interface ChronocoulometryRequest {
  system_name?: string;
  concentration_mm: number;
  electrode_area_cm2: number;
  step_duration_s: number;
  n_electrons: number;
  surface_excess_gamma_mol_cm2: number;
  double_layer_capacitance_uf_cm2: number;
  potential_step_v: number;
  diffusion_coefficient_cm2_s: number;
}

export interface AnsonPoint {
  time_s: number;
  sqrt_time_s: number;
  charge_total_uc: number;
  charge_diffusional_uc: number;
  charge_double_layer_uc: number;
  charge_adsorption_uc: number;
}

export interface ChronocoulometryResult {
  system_name: string;
  double_layer_charge_uc: number;
  surface_excess_gamma_mol_cm2: number;
  diffusion_coefficient_cm2_s: number;
  anson_slope_uc_s_half: number;
  anson_points: AnsonPoint[];
}

export interface CuratedMetalStandard {
  metal: string;
  symbol: string;
  redox_couple: string;
  standard_potential_v_she: number;
  asv_peak_potential_v: number;
  who_drinking_water_limit_ppb: number;
  description: string;
}

export interface HydrodynamicElectrochemistryCatalogResponse {
  metals: CuratedMetalStandard[];
  electrodes: Array<{ type: string; name: string; window: string; best_for: string }>;
}
