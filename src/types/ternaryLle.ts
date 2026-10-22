/**
 * Type definitions for Phase Equilibria & Ternary Liquid-Liquid Extraction (LLE).
 */

export interface TernaryPoint {
  x_a: number; // Carrier mass fraction (e.g. Water)
  x_b: number; // Solvent mass fraction (e.g. Toluene / MIBK)
  x_c: number; // Solute mass fraction (e.g. Acetic Acid / Acetone)
  cartesian_x: number; // Equilateral X in [0, 1]
  cartesian_y: number; // Equilateral Y in [0, sqrt(3)/2]
  label?: string;
}

export interface TieLine {
  id: string;
  raffinate: TernaryPoint;
  extract: TernaryPoint;
  distribution_coefficient: number;
  selectivity: number;
}

export interface CorrelationResult {
  slope: number;
  intercept: number;
  r_squared: number;
  is_consistent: boolean;
  formula_latex: string;
  data_points: [number, number][];
}

export interface ExtractionStage {
  stage_number: number;
  extract: TernaryPoint;
  raffinate: TernaryPoint;
  solute_recovery_percent: number;
}

export interface TernarySystemSummary {
  id: string;
  name: string;
  carrier_name: string;
  solvent_name: string;
  solute_name: string;
  temperature_k: number;
  description: string;
}

export interface TernarySystemDetail {
  id: string;
  name: string;
  carrier_name: string;
  solvent_name: string;
  solute_name: string;
  temperature_k: number;
  pressure_kpa: number;
  plait_point: TernaryPoint;
  binodal_curve: TernaryPoint[];
  tie_lines: TieLine[];
  hand_correlation: CorrelationResult;
  othmer_tobias_correlation: CorrelationResult;
  description: string;
}

export interface HunterNashRequest {
  system_id: string;
  feed_rate_kg_h: number;
  feed_x_carrier: number;
  feed_x_solvent: number;
  feed_x_solute: number;
  solvent_rate_kg_h: number;
  solvent_x_carrier: number;
  solvent_x_solvent: number;
  solvent_x_solute: number;
  target_raffinate_solute_fraction: number;
  max_stages?: number;
}

export interface HunterNashResponse {
  system_id: string;
  system_name: string;
  feed_point: TernaryPoint;
  solvent_point: TernaryPoint;
  mixture_point: TernaryPoint;
  is_in_two_phase_region: boolean;
  operating_point_delta?: [number, number];
  minimum_solvent_ratio: number;
  actual_solvent_ratio: number;
  is_solvent_sufficient: boolean;
  theoretical_stages_count: number;
  stages: ExtractionStage[];
  final_extract: TernaryPoint;
  final_raffinate: TernaryPoint;
  solute_recovery_percent: number;
  extract_rate_kg_h: number;
  raffinate_rate_kg_h: number;
  hand_correlation: CorrelationResult;
  othmer_tobias_correlation: CorrelationResult;
  pedagogical_summary: string;
}
