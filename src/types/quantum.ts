export type AromaticityType = 'aromatic' | 'anti_aromatic' | 'non_aromatic';

export type OrbitalSymmetry = 'symmetric' | 'antisymmetric' | 'degenerate';

export interface MolecularOrbitalLevel {
  index: number;
  energy_coefficient_m: number;
  energy_ev: number;
  electron_occupancy: number; // 0, 1, or 2
  is_homo: boolean;
  is_lumo: boolean;
  is_singly_occupied: boolean;
  orbital_symmetry: OrbitalSymmetry;
  nodal_planes_count: number;
  coefficients: number[];
  label: string;
}

export interface ConjugatedAtom {
  atom_id: number;
  element: string;
  label: string;
  x_2d: number;
  y_2d: number;
  huckel_h?: number;
  pi_electron_contribution: number;
}

export interface ConjugatedBond {
  atom_i: number;
  atom_j: number;
  huckel_k?: number;
}

export interface HmoCalculationResult {
  molecule_id: string;
  molecule_name: string;
  chemical_formula: string;
  atom_count: number;
  pi_electron_count: number;
  total_pi_energy_units: number;
  delocalization_energy_beta: number;
  delocalization_energy_ev: number;
  homo_lumo_gap_beta: number;
  homo_lumo_gap_ev: number;
  predicted_uv_lambda_nm: number;
  aromaticity_classification: AromaticityType;
  is_closed_shell: boolean;
  orbitals: MolecularOrbitalLevel[];
  atomic_charges: number[];
  atomic_electron_densities: number[];
  bond_orders: number[][];
  atoms: ConjugatedAtom[];
  bonds: ConjugatedBond[];
}

export interface ConjugatedPresetSummary {
  id: string;
  name: string;
  formula: string;
  atom_count: number;
  pi_electron_count: number;
  expected_aromaticity: AromaticityType;
  is_cyclic: boolean;
  description: string;
  pedagogical_notes: string;
}
