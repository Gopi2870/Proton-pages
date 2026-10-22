/**
 * Gas Laws & Phase Equilibria Types
 */

export interface IdealGasResult {
  pressure_atm: number;
  volume_liters: number;
  moles: number;
  temperature_k: number;
  temperature_c: number;
  molar_volume_l_mol: number;
  density_g_l?: number;
  equation: string;
  notes: string;
}

export interface VanDerWaalsPoint {
  volume_liters: number;
  pressure_ideal_atm: number;
  pressure_vdw_atm: number;
  compressibility_z: number;
}

export interface VanDerWaalsResult {
  gas_id: string;
  gas_name: string;
  moles: number;
  temperature_k: number;
  vdw_a_l2_atm_mol2: number;
  vdw_b_l_mol: number;
  p_ideal_atm: number;
  p_vdw_atm: number;
  compressibility_z: number;
  deviation_percent: number;
  regime: string;
  isotherm_points: VanDerWaalsPoint[];
  notes: string;
}

export interface SpeedDistributionPoint {
  speed_m_s: number;
  probability_density: number;
}

export interface MaxwellBoltzmannResult {
  gas_name: string;
  molar_mass_g_mol: number;
  temperature_k: number;
  v_mp_m_s: number;
  v_avg_m_s: number;
  v_rms_m_s: number;
  mean_kinetic_energy_j: number;
  distribution_points: SpeedDistributionPoint[];
}

export interface VaporPressurePoint {
  temperature_c: number;
  temperature_k: number;
  vapor_pressure_kpa: number;
  vapor_pressure_atm: number;
}

export interface PhaseEquilibriumResult {
  substance_name: string;
  formula: string;
  normal_boiling_point_c: number;
  delta_h_vap_kj_mol: number;
  normal_melting_point_c?: number;
  triple_point_t_c?: number;
  triple_point_p_kpa?: number;
  critical_point_t_c?: number;
  critical_point_p_mpa?: number;
  vapor_pressure_curve: VaporPressurePoint[];
}

export interface RealGasConstants {
  id: string;
  name: string;
  formula: string;
  molar_mass_g_mol: number;
  vdw_a_l2_atm_mol2: number;
  vdw_b_l_mol: number;
  t_c_k: number;
  p_c_atm: number;
}
