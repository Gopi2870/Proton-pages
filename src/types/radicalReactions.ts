/**
 * TypeScript domain contracts for Radical Reaction Networks,
 * Elementary Mechanisms, Stiff Numerical Kinetics, and Sensitivity Analysis.
 */

export type RadicalSpeciesType =
  | 'atomic'
  | 'hydroxyl'
  | 'hydroperoxyl'
  | 'alkyl'
  | 'peroxy'
  | 'alkoxy'
  | 'acyl'
  | 'halogen'
  | 'non_radical';

export type RadicalReactionRole =
  | 'initiation'
  | 'propagation'
  | 'branching'
  | 'termination'
  | 'scavenging';

export interface RadicalSpecies {
  name: string;
  formula: string;
  unpaired_electrons: number;
  spin_multiplicity: number;
  radical_type: RadicalSpeciesType;
  enthalpy_f_kj_mol: number;
  gibbs_f_kj_mol: number;
  entropy_j_mol_k: number;
  initial_concentration_m: number;
  color_hex: string;
  elements: Record<string, number>;
}

export interface ArrheniusRateLaw {
  pre_exponential_a: number;
  temperature_exponent_n: number;
  activation_energy_kj_mol: number;
  description: string;
}

export interface RadicalElementaryReaction {
  id: string;
  equation: string;
  role: RadicalReactionRole;
  reactants: Record<string, number>;
  products: Record<string, number>;
  rate_law: ArrheniusRateLaw;
  is_reversible: boolean;
  delta_h_rxn_kj_mol: number;
}

export interface RadicalMechanismSummary {
  id: string;
  name: string;
  category: 'combustion' | 'atmospheric' | 'polymerization' | 'biochemical';
  description: string;
  species_count: number;
  reaction_count: number;
  reference_citation: string;
  validated_temperature_range_k: [number, number];
}

export interface RadicalMechanismDetail extends RadicalMechanismSummary {
  species: RadicalSpecies[];
  reactions: RadicalElementaryReaction[];
}

export interface SensitivityEntry {
  species: string;
  reaction_id: string;
  sensitivity: number;
}

export interface RadicalSimulationResult {
  mechanism_id: string;
  mechanism_name: string;
  temperature_k: number;
  pressure_atm: number;
  time_points_s: number[];
  trajectories: Record<string, number[]>;
  total_radical_pool: number[];
  top_sensitivities: SensitivityEntry[];
  element_conservation_errors: Record<string, number>;
  qssa_comparison: Record<string, number[]>;
  stiffness_ratio_estimate: number;
  cpu_time_ms: number;
}

export interface RadicalSimulationParams {
  mechanism_id: string;
  temperature_k?: number;
  pressure_atm?: number;
  total_time_s?: number;
  initial_concentrations?: Record<string, number>;
  max_steps?: number;
}
