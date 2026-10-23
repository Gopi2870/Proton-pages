/**
 * Semi-Empirical Quantum Chemistry TypeScript Contracts (PR #057).
 * Corresponds to MNDO, AM1, and PM3 Hamiltonians, Roothaan-Hall SCF,
 * molecular orbitals ladder, dipole vectors, and PES scans.
 */

export type SemiEmpiricalMethod = 'MNDO' | 'AM1' | 'PM3';

export type OrbitalType = 's' | 'px' | 'py' | 'pz';

export interface GaussianCorrection {
  k: number;
  l: number;
  m: number;
}

export interface ElementParameters {
  symbol: string;
  atomic_number: number;
  valence_charge: number;
  u_ss: number;
  u_pp: number;
  zeta_s: number;
  zeta_p: number;
  beta_s: number;
  beta_p: number;
  g_ss: number;
  g_sp: number;
  g_pp: number;
  g_p2: number;
  h_sp: number;
  alpha: number;
  gaussians: GaussianCorrection[];
  isolated_atom_energy_ev: number;
  heat_of_formation_atom_kcal_mol: number;
}

export interface AtomCoordinate {
  index: number;
  symbol: string;
  x: number;
  y: number;
  z: number;
}

export interface AtomicBasisFunction {
  index: number;
  atom_index: number;
  symbol: string;
  orbital_type: OrbitalType;
  zeta: number;
}

export interface ScfIterationRecord {
  iteration: number;
  electronic_energy_ev: number;
  total_energy_ev: number;
  energy_change_ev: number;
  density_change_max: number;
  diis_dimension: number;
}

export interface MolecularOrbitalLevel {
  index: number;
  energy_ev: number;
  occupancy: number;
  is_homo: boolean;
  is_lumo: boolean;
  symmetry_label?: string;
  coefficients: number[];
}

export interface AtomicPopulation {
  atom_index: number;
  symbol: string;
  total_valence_electrons: number;
  net_charge: number;
  s_population: number;
  p_population: number;
}

export interface DipoleMomentVector {
  dx: number;
  dy: number;
  dz: number;
  magnitude: number;
  point_charge_contribution: number;
  hybridization_contribution: number;
}

export interface FrontierOrbitalIndices {
  homo_energy_ev: number;
  lumo_energy_ev: number;
  gap_ev: number;
  ionization_potential_ev: number;
  electron_affinity_ev: number;
  electronegativity_ev: number;
  hardness_ev: number;
  softness_ev_inv: number;
  electrophilicity_index_ev: number;
}

export interface SemiEmpiricalPresetMolecule {
  id: string;
  name: string;
  formula: string;
  description: string;
  atoms: AtomCoordinate[];
  point_group: string;
  literature_heat_of_formation_kcal_mol: Record<string, number>;
  literature_dipole_debye: Record<string, number>;
  provenance: string;
}

export interface PesScanPoint {
  coordinate_value: number;
  total_energy_ev: number;
  relative_energy_kcal_mol: number;
  heat_of_formation_kcal_mol: number;
  converged: boolean;
}

export interface SemiEmpiricalCalculationResult {
  method: SemiEmpiricalMethod;
  total_atoms: number;
  total_valence_electrons: number;
  number_of_basis_functions: number;
  scf_converged: boolean;
  scf_iterations: number;
  electronic_energy_ev: number;
  core_repulsion_energy_ev: number;
  total_energy_ev: number;
  heat_of_formation_kcal_mol: number;
  dipole_moment: DipoleMomentVector;
  frontier_indices: FrontierOrbitalIndices;
  atomic_populations: AtomicPopulation[];
  molecular_orbitals: MolecularOrbitalLevel[];
  scf_history: ScfIterationRecord[];
  atoms: AtomCoordinate[];
}

export interface SemiEmpiricalCalculationRequest {
  preset_id?: string;
  atoms?: AtomCoordinate[];
  method: SemiEmpiricalMethod;
  max_iterations?: number;
  energy_tolerance_ev?: number;
  density_tolerance?: number;
}

export interface SemiEmpiricalCalculationResponse {
  success: boolean;
  result?: SemiEmpiricalCalculationResult;
  preset_info?: SemiEmpiricalPresetMolecule;
  message?: string;
}

export interface PesScanRequest {
  preset_id?: string;
  atoms?: AtomCoordinate[];
  atom_idx_1: number;
  atom_idx_2: number;
  start_distance?: number;
  end_distance?: number;
  steps?: number;
  method: SemiEmpiricalMethod;
}

export interface PesScanResponse {
  success: boolean;
  method: SemiEmpiricalMethod;
  atom_idx_1: number;
  atom_idx_2: number;
  points: PesScanPoint[];
  equilibrium_distance_angstrom?: number;
  well_depth_kcal_mol?: number;
  message?: string;
}

export interface ParameterSetInfoResponse {
  method: SemiEmpiricalMethod;
  citation: string;
  elements: Record<string, ElementParameters>;
}
