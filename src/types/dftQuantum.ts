/**
 * TypeScript interfaces for Computational Quantum Chemistry & DFT Kohn-Sham Solver (PR #052).
 */

export interface KohnShamOrbital {
  orbital_index: number;
  symmetry_label: string;
  energy_ev: number;
  occupation: number;
  is_homo: boolean;
  is_lumo: boolean;
  dominant_atomic_orbitals: string[];
}

export interface ScfIterationStep {
  iteration: number;
  electronic_energy_hartree: number;
  energy_change_hartree: number;
  diis_error_norm: number;
  damping_factor: number;
}

export interface MepSpatialPoint {
  x: number;
  y: number;
  z: number;
  electron_density: number;
  electrostatic_potential_au: number;
}

export interface TdDftExcitation {
  state_index: number;
  excitation_energy_ev: number;
  wavelength_nm: number;
  oscillator_strength_f: number;
  dominant_transition: string;
}

export interface DftPresetMolecule {
  id: string;
  name: string;
  formula: string;
  smiles: string;
  point_group: string;
  stoichiometry: Record<string, number>;
  default_functional: string;
  nuclear_repulsion_energy_hartree: number;
  scf_converged_energy_hartree: number;
  homo_energy_ev: number;
  lumo_energy_ev: number;
  dipole_moment_debye: number;
}

export interface DftCalculationRequest {
  molecule_id?: string;
  functional?: string;
  basis_set?: string;
  scf_max_cycles?: number;
  convergence_threshold?: number;
  enable_diis?: boolean;
}

export interface DftCalculationResponse {
  molecule_name: string;
  formula: string;
  functional: string;
  basis_set: string;
  total_energy_hartree: number;
  electronic_energy_hartree: number;
  nuclear_repulsion_energy_hartree: number;
  scf_converged: boolean;
  iterations_count: number;
  scf_history: ScfIterationStep[];
  homo_lumo_gap_ev: number;
  chemical_hardness_ev: number;
  electronegativity_ev: number;
  dipole_moment_debye: number;
  orbitals: KohnShamOrbital[];
}

export interface TdDftRequest {
  molecule_id?: string;
  functional?: string;
  n_excited_states?: number;
}

export interface TdDftResponse {
  molecule_name: string;
  states: TdDftExcitation[];
  absorption_max_wavelength_nm: number;
}

export interface MepSurfaceRequest {
  molecule_id?: string;
  grid_resolution?: number;
}

export interface MepSurfaceResponse {
  molecule_name: string;
  min_potential_au: number;
  max_potential_au: number;
  points: MepSpatialPoint[];
}
