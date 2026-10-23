/**
 * TypeScript types for Biomolecular Structure Modeling, PDB parsing,
 * DSSP hydrogen-bond networks, and Ramachandran dihedral analysis.
 */

export type SecondaryStructureType =
  | 'Alpha Helix (4-turn)'
  | '3_10 Helix (3-turn)'
  | 'Pi Helix (5-turn)'
  | 'Beta Sheet / Strand'
  | 'Beta Bridge'
  | 'Hydrogen-Bonded Turn'
  | 'Geometric Bend'
  | 'Random Coil / Loop';

export type RamachandranRegion =
  | 'Favored Alpha Helix'
  | 'Favored Beta Sheet'
  | 'Favored Left-Handed Alpha'
  | 'Allowed Conformation'
  | 'Steric Outlier';

export interface AminoAcidResidue {
  chain_id: string;
  res_seq: number;
  res_name: string;
  i_code: string;
  n_coord?: [number, number, number];
  ca_coord?: [number, number, number];
  c_coord?: [number, number, number];
  o_coord?: [number, number, number];
  h_coord?: [number, number, number];
  phi: number | null;
  psi: number | null;
  omega: number | null;
  secondary_structure: SecondaryStructureType;
  ramachandran_region: RamachandranRegion;
}

export interface HydrogenBondRecord {
  donor_chain: string;
  donor_res_seq: number;
  donor_res_name: string;
  acceptor_chain: string;
  acceptor_res_seq: number;
  acceptor_res_name: string;
  distance_on: number;
  distance_oh: number;
  energy_kcal_mol: number;
}

export interface SecondaryStructureSegment {
  type: SecondaryStructureType;
  chain_id: string;
  start_res_seq: number;
  end_res_seq: number;
  length: number;
}

export interface ProteinStructureSummary {
  title: string;
  pdb_id: string | null;
  chain_ids: string[];
  total_residues: number;
  total_atoms: number;
  helix_count: number;
  sheet_count: number;
  turn_count: number;
  coil_count: number;
  helix_percentage: number;
  sheet_percentage: number;
  ramachandran_favored_percentage: number;
  ramachandran_outlier_percentage: number;
}

export interface ProteinStructureDetail {
  summary: ProteinStructureSummary;
  residues: AminoAcidResidue[];
  hydrogen_bonds: HydrogenBondRecord[];
  secondary_structure_segments: SecondaryStructureSegment[];
}

export interface StructurePresetSummary {
  id: string;
  name: string;
  pdb_id: string;
  description: string;
  organism: string;
  resolution_angstrom: number | null;
  residue_count: number;
  classification: string;
}

export interface RamachandranPoint {
  chain_id: string;
  res_seq: number;
  res_name: string;
  phi: number;
  psi: number;
  region: RamachandranRegion;
  is_general: boolean;
  is_glycine: boolean;
  is_proline: boolean;
}
