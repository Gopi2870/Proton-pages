export type PolymerizationMechanism = 'step_growth' | 'chain_growth_radical' | 'ring_opening';

export type RadicalTerminationMode = 'combination' | 'disproportionation' | 'mixed';

export interface CarothersAnalysis {
  stoichiometric_ratio_r: number;
  average_functionality_fav: number;
  conversion_p: number;
  gel_point_pc: number | null;
  is_gel_formed: boolean;
  degree_of_polymerization_xn: number;
  weight_degree_of_polymerization_xw: number;
  polydispersity_index: number;
}

export interface RadicalKineticsAnalysis {
  temperature_c: number;
  monomer_concentration_m: number;
  initiator_concentration_m: number;
  propagation_kp_l_mol_s: number;
  termination_kt_l_mol_s: number;
  radical_concentration_m: number;
  polymerization_rate_rp_mol_l_s: number;
  kinetic_chain_length_nu: number;
  predicted_xn: number;
  autoacceleration_trommsdorff: boolean;
}

export interface MolecularWeightPoint {
  chain_length_i: number;
  molecular_weight: number;
  mole_fraction: number;
  weight_fraction: number;
  cumulative_weight_fraction: number;
}

export interface FloryHugginsPoint {
  phi_polymer: number;
  delta_g_mix_rt: number;
  spinodal_chi: number;
}

export interface FloryHugginsAnalysis {
  chi_parameter: number;
  critical_chi: number;
  critical_phi_polymer: number;
  is_phase_separated: boolean;
  curve_points: FloryHugginsPoint[];
}

export interface PolymerSimulationResult {
  simulation_id: string;
  polymer_name: string;
  repeat_unit_formula: string;
  repeat_unit_mw: number;
  mechanism: PolymerizationMechanism;
  conversion_p: number;
  number_average_mn: number;
  weight_average_mw: number;
  z_average_mz: number;
  polydispersity_index: number;
  carothers: CarothersAnalysis | null;
  radical_kinetics: RadicalKineticsAnalysis | null;
  flory_huggins: FloryHugginsAnalysis | null;
  distribution_curve: MolecularWeightPoint[];
  pedagogical_notes: string;
}

export interface PolymerPresetSummary {
  id: string;
  name: string;
  classification: string;
  mechanism: PolymerizationMechanism;
  repeat_unit_formula: string;
  repeat_unit_mw: number;
  typical_applications: string[];
  description: string;
}
