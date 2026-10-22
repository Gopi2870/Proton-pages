/**
 * Type definitions for Computational Chemical Kinetics Networks & Stiff ODE Solvers (PR #040).
 */

export interface KineticSpecies {
  name: string;
  initial_concentration_m: number;
  color_hex?: string;
}

export interface ElementaryReaction {
  id: string;
  equation_str: string;
  reactants: Record<string, number>;
  products: Record<string, number>;
  rate_constant: number;
  activation_energy_kj?: number;
}

export interface KineticsPresetSummary {
  id: string;
  name: string;
  category: 'stiff_benchmark' | 'atmospheric' | 'oscillatory' | 'combustion' | string;
  description: string;
  species_count: number;
  reactions_count: number;
  estimated_stiffness_ratio: number;
  default_total_time_s: number;
}

export interface StiffKineticsPresetDetail extends KineticsPresetSummary {
  species: KineticSpecies[];
  reactions: ElementaryReaction[];
  total_time_s: number;
}

export interface StiffKineticsSimulationRequest {
  preset_id?: string | null;
  species?: KineticSpecies[];
  reactions?: ElementaryReaction[];
  total_time_s: number;
  initial_step_s: number;
  solver_method: 'rosenbrock_stiff' | 'explicit_rk4' | string;
  max_steps?: number;
}

export interface StiffKineticsSimulationResponse {
  network_name: string;
  solver_method: string;
  stiffness_ratio: number;
  is_stiff: boolean;
  species_names: string[];
  time_points_count: number;
  trajectory: Record<string, number>[];
  final_concentrations: Record<string, number>;
  jacobian_matrix: number[][];
  pedagogical_summary: string;
}
