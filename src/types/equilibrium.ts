export type EquilibriumSystemType =
  | 'homogeneous_gas'
  | 'weak_acid_base'
  | 'polyprotic_acid'
  | 'buffer_solution'
  | 'solubility_ksp'
  | 'cobalt_complex';

export type ShiftDirection = 'forward' | 'reverse' | 'at_equilibrium';

export type PerturbationType = 'concentration_spike' | 'pressure_volume' | 'temperature_shift';

export interface ReactionParticipant {
  formula: string;
  name: string;
  coefficient: number;
  is_product: boolean;
  initial_concentration: number;
}

export interface RiceTableRow {
  species_formula: string;
  species_name: string;
  coefficient: number;
  is_product: boolean;
  initial: number;
  change: number;
  equilibrium: number;
}

export interface RiceTableRequest {
  equilibrium_constant_k: number;
  participants: {
    formula: string;
    name: string;
    coefficient: number;
    is_product: boolean;
    initial_concentration: number;
  }[];
}

export interface RiceTableResponse {
  equilibrium_constant_k: number;
  reaction_quotient_q: number;
  shift_direction: ShiftDirection;
  extent_of_reaction_xi: number;
  rows: RiceTableRow[];
  converged: boolean;
  iterations: number;
  residual_error: number;
}

export interface PolyproticSpeciesFraction {
  species_formula: string;
  charge: number;
  fraction_alpha: number;
  equilibrium_concentration: number;
}

export interface PolyproticAcidRequest {
  acid_name: string;
  acid_formula: string;
  total_concentration_ca: number;
  dissociation_constants_ka: number[];
}

export interface PolyproticAcidResponse {
  acid_name: string;
  acid_formula: string;
  total_concentration_ca: number;
  ph: number;
  poh: number;
  h_plus_concentration: number;
  oh_minus_concentration: number;
  dissociation_constants_ka: number[];
  species_fractions: PolyproticSpeciesFraction[];
}

export interface BufferCapacityPoint {
  ph: number;
  buffer_capacity_beta: number;
  fraction_base: number;
}

export interface BufferCapacityRequest {
  buffer_name: string;
  acid_component: string;
  base_component: string;
  pka: number;
  total_buffer_concentration_m: number;
  ratio_base_to_acid: number;
  added_strong_acid_m: number;
  added_strong_base_m: number;
}

export interface BufferCapacityResponse {
  buffer_name: string;
  acid_component: string;
  base_component: string;
  pka: number;
  total_buffer_concentration_m: number;
  ratio_base_to_acid: number;
  henderson_hasselbalch_ph: number;
  rigorous_equilibrium_ph: number;
  van_slyke_buffer_capacity_beta: number;
  maximum_buffer_capacity: number;
  ph_after_acid_addition: number;
  ph_after_base_addition: number;
  buffer_curve: BufferCapacityPoint[];
}

export interface SolubilityKspRequest {
  salt_name: string;
  salt_formula: string;
  ksp_value: number;
  molar_mass_g_mol: number;
  cation_formula: string;
  cation_coefficient: number;
  anion_formula: string;
  anion_coefficient: number;
  common_ion_formula?: string;
  common_ion_concentration: number;
}

export interface SolubilityKspResponse {
  salt_name: string;
  salt_formula: string;
  ksp_value: number;
  cation_formula: string;
  cation_coefficient: number;
  anion_formula: string;
  anion_coefficient: number;
  common_ion_formula?: string;
  common_ion_concentration: number;
  molar_solubility_mol_l: number;
  mass_solubility_g_l: number;
  ion_product_qsp: number;
  is_precipitate_formed: boolean;
  saturation_state: string;
}

export interface LeChatelierRequest {
  preset_reaction_id: string;
  perturbation_type: PerturbationType;
  concentration_changes?: Record<string, number>;
  pressure_multiplier?: number;
  temperature_k?: number;
}

export interface LeChatelierResponse {
  reaction_title: string;
  equation_string: string;
  delta_h_standard_kj_mol: number;
  delta_ng_gas: number;
  perturbation_type: PerturbationType;
  perturbation_description: string;
  initial_k: number;
  initial_q: number;
  initial_shift: ShiftDirection;
  perturbed_k: number;
  perturbed_q: number;
  le_chatelier_shift: ShiftDirection;
  initial_concentrations: Record<string, number>;
  perturbed_concentrations: Record<string, number>;
  new_equilibrium_concentrations: Record<string, number>;
  pedagogical_explanation: string;
}

export interface EquilibriumPresetSummary {
  id: string;
  title: string;
  system_type: EquilibriumSystemType;
  equation: string;
  default_k: number;
  delta_h_kj_mol?: number | null;
  description: string;
}
