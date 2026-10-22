/**
 * Type definitions for Coordination Chemistry & Crystal Field Theory (CFT).
 */

export interface TransitionMetalSummary {
  symbol: string;
  name: string;
  atomic_number: number;
  group: number;
  period: number;
  oxidation_state: number;
  d_electron_count: number;
}

export interface LigandSummary {
  id: string;
  formula: string;
  name: string;
  denticity: number;
  donor_atom: string;
  spectrochemical_rank: number;
  field_strength: string;
}

export interface OrbitalLevel {
  label: string;
  orbitals: string[];
  energy_delta: number;
  energy_cm_inv: number;
  degeneracy: number;
  electron_count: number;
  unpaired_electrons: number;
}

export interface CoordinationAnalysisRequest {
  metal_symbol: string;
  oxidation_state: number;
  ligand_id: string;
  geometry: string;
  forced_spin_state?: string;
}

export interface CoordinationAnalysisResponse {
  formula: string;
  name: string;
  metal: TransitionMetalSummary;
  ligand: LigandSummary;
  coordination_number: number;
  geometry: string;
  delta_cm_inv: number;
  pairing_energy_cm_inv: number;
  spin_state: string;
  orbital_levels: OrbitalLevel[];
  cfse_delta_units: number;
  cfse_kj_mol: number;
  unpaired_electrons: number;
  magnetic_moment_bm: number;
  is_paramagnetic: boolean;
  jahn_teller_distortion: string;
  absorption_wavelength_nm?: number;
  perceived_color_name: string;
  perceived_color_hex: string;
  pedagogical_notes: string;
}

export interface ComplexPresetSummary {
  id: string;
  formula: string;
  name: string;
  geometry: string;
  spin_state: string;
  d_electron_count: number;
  unpaired_electrons: number;
  perceived_color_hex: string;
  description: string;
}
