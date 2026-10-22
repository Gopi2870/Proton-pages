export type ArrowType = 'two_electron' | 'single_electron';

export type IntermediateType =
  | 'reactant'
  | 'transition_state'
  | 'carbocation'
  | 'carbanion'
  | 'enolate'
  | 'oxonium'
  | 'arenium_ion'
  | 'radical'
  | 'product';

export type MechanismClass =
  | 'SN1'
  | 'SN2'
  | 'E1'
  | 'E2'
  | 'EAS'
  | 'carbonyl_addition'
  | 'aldol_condensation'
  | 'grignard'
  | 'markovnikov_addition';

export type StereochemicalOutcome =
  | 'inversion_walden'
  | 'racemization'
  | 'retention'
  | 'anti_elimination'
  | 'syn_addition'
  | 'zaitsev_regioselective'
  | 'markovnikov_regioselective'
  | 'achiral';

export interface CurvedArrow {
  source_type: string;
  source_label: string;
  source_coords: [number, number];
  target_type: string;
  target_label: string;
  target_coords: [number, number];
  arrow_type?: ArrowType;
  curvature_bias?: number;
}

export interface MechanismStep {
  step_number: number;
  title: string;
  description: string;
  intermediate_type: IntermediateType;
  reactants_label: string;
  products_label: string;
  activation_energy_kj_mol: number;
  reaction_energy_kj_mol: number;
  curved_arrows: CurvedArrow[];
  key_bonds_formed: string[];
  key_bonds_broken: string[];
}

export interface ReactionEnergyPoint {
  reaction_coordinate: number;
  gibbs_free_energy_kj_mol: number;
  point_type: string;
  label: string;
}

export interface OrganicReactionMechanism {
  id: string;
  name: string;
  mechanism_class: MechanismClass;
  overall_reaction: string;
  substrate: string;
  nucleophile_or_reagent: string;
  solvent: string;
  stereochemical_outcome: StereochemicalOutcome;
  kinetics_rate_law: string;
  steps: MechanismStep[];
  energy_profile: ReactionEnergyPoint[];
  pedagogical_notes: string;
}

export interface MechanismSummary {
  id: string;
  name: string;
  mechanism_class: MechanismClass;
  overall_reaction: string;
  substrate: string;
  nucleophile_or_reagent: string;
  solvent: string;
  stereochemical_outcome: StereochemicalOutcome;
  kinetics_rate_law: string;
  step_count: number;
  total_activation_barrier_kj_mol: number;
  net_gibbs_energy_kj_mol: number;
}

export interface EnergyProfileInterpolationResponse {
  coordinate_grid: number[];
  gibbs_energy_curve: number[];
  transition_state_peaks: ReactionEnergyPoint[];
  intermediate_valleys: ReactionEnergyPoint[];
}
