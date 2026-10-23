/**
 * TypeScript domain models for Microfluidics, Droplet Chemistry & Continuous Flow Reactors.
 */

export type FlowRegime = 'creeping_laminar' | 'laminar' | 'transitional' | 'turbulent';

export type DropletRegime = 'squeezing' | 'dripping' | 'jetting';

export type JunctionGeometry = 't_junction' | 'flow_focusing' | 'co_flow';

export interface MicrofluidicChip {
  id: string;
  name: string;
  material: string;
  geometry: JunctionGeometry;
  channel_width_um: number;
  channel_height_um: number;
  channel_length_mm: number;
  description: string;
}

export interface FluidProperties {
  name: string;
  density_kg_m3: number;
  viscosity_pa_s: number;
  interfacial_tension_n_m: number;
}

export interface HydrodynamicsRequest {
  channel_width_um: number;
  channel_height_um: number;
  channel_length_mm: number;
  flow_rate_ul_min: number;
  viscosity_pa_s: number;
  density_kg_m3: number;
  diffusion_coefficient_m2_s: number;
  interfacial_tension_n_m: number;
}

export interface HydrodynamicResult {
  reynolds_number: number;
  capillary_number: number;
  peclet_number: number;
  flow_regime: FlowRegime;
  hydraulic_diameter_um: number;
  mean_velocity_m_s: number;
  pressure_drop_kpa: number;
  hydraulic_resistance_pa_s_m3: number;
  wall_shear_stress_pa: number;
}

export interface DropletGenerationRequest {
  geometry: JunctionGeometry;
  channel_width_um: number;
  channel_height_um: number;
  dispersed_flow_rate_ul_min: number;
  continuous_flow_rate_ul_min: number;
  continuous_viscosity_pa_s: number;
  dispersed_viscosity_pa_s: number;
  interfacial_tension_n_m: number;
  diffusion_coefficient_m2_s: number;
}

export interface DropletGenerationResult {
  regime: DropletRegime;
  droplet_volume_pl: number;
  droplet_diameter_um: number;
  generation_frequency_hz: number;
  droplet_length_um: number;
  slug_velocity_m_s: number;
  mixing_time_ms: number;
  unsegmented_mixing_time_ms: number;
  mixing_acceleration_fold: number;
}

export interface FlowReactionRequest {
  chip_id?: string;
  channel_width_um: number;
  channel_height_um: number;
  channel_length_mm: number;
  total_flow_rate_ul_min: number;
  initial_concentration_m: number;
  rate_constant_k1: number;
  rate_constant_k2: number;
  temperature_k: number;
  molecular_weight_g_mol: number;
}

export interface RTDPoint {
  theta: number;
  time_s: number;
  e_theta: number;
}

export interface AxialConcentrationPoint {
  z_position_mm: number;
  fractional_length: number;
  residence_time_s: number;
  c_reactant_m: number;
  c_product_m: number;
  c_byproduct_m: number;
}

export interface FlowReactionResult {
  residence_time_s: number;
  reynolds_number: number;
  bodenstein_number: number;
  conversion: number;
  intermediate_yield: number;
  byproduct_yield: number;
  space_time_yield_kg_m3_h: number;
  rtd_curve: RTDPoint[];
  axial_concentration_profile: AxialConcentrationPoint[];
}

export interface BenchmarkReactionInfo {
  id: string;
  name: string;
  reaction_type: string;
  reagents: string;
  typical_temperature_c: number;
  typical_residence_time_s: number;
  k1_at_ref_temp: number;
  k2_at_ref_temp: number;
  description: string;
}

export interface MicrofluidicsCatalogResponse {
  chips: MicrofluidicChip[];
  reactions: BenchmarkReactionInfo[];
}
