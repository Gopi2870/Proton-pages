/**
 * Cheminformatics Domain Types.
 * Defines topological molecular graphs, Morgan circular fingerprints (ECFP equivalent),
 * chemical similarity coefficients, and substructure isomorphism match mappings.
 */

export interface AtomNode {
  index: number;
  element: string;
  atomic_number: number;
  formal_charge?: number;
  implicit_hydrogens?: number;
  aromatic?: boolean;
  in_ring?: boolean;
  ring_sizes?: number[];
  valence?: number;
  hybridization?: string;
  x: number;
  y: number;
  z?: number;
}

export interface BondEdge {
  source: number;
  target: number;
  order: number; // 1.0 = single, 2.0 = double, 3.0 = triple, 1.5 = aromatic
  aromatic?: boolean;
  in_ring?: boolean;
}

export interface MolecularGraph {
  id: string;
  name: string;
  smiles: string;
  formula: string;
  molecular_weight: number;
  description?: string;
  atoms: AtomNode[];
  bonds: BondEdge[];
}

export interface CircularEnvironment {
  atom_index: number;
  radius: number;
  feature_id: number;
  bit_index: number;
  participating_atoms: number[];
  participating_bonds: [number, number][];
  notation: string;
}

export interface MorganFingerprint {
  molecule_id: string;
  radius: number;
  n_bits: number;
  active_bits: number[];
  bit_counts: Record<string, number>;
  bit_hex: string;
  density: number;
  environments: CircularEnvironment[];
}

export type SimilarityMetric = 'tanimoto' | 'dice' | 'cosine' | 'tversky' | 'euclidean' | 'manhattan';

export interface SimilarityResult {
  molecule_a_id: string;
  molecule_b_id: string;
  tanimoto: number;
  dice: number;
  cosine: number;
  tversky: number;
  shared_bits: number[];
  bits_a_only: number[];
  bits_b_only: number[];
  euclidean_distance: number;
  manhattan_distance: number;
}

export interface SubstructureMatch {
  target_molecule_id: string;
  target_molecule_name: string;
  query_fragment_id: string;
  query_fragment_name: string;
  matched: boolean;
  filter_passed: boolean;
  atom_mappings: Record<string, number>[];
  matched_target_atoms: number[];
  matched_target_bonds: [number, number][];
  execution_time_ms: number;
}

export interface LibraryScreeningHit {
  molecule_id: string;
  molecule_name: string;
  formula: string;
  smiles: string;
  score: number;
  rank: number;
  matched_substructure?: boolean;
  matched_atoms?: number[];
}

export interface LibraryScreeningResponse {
  query_id: string;
  metric: string;
  hits: LibraryScreeningHit[];
  total_screened: number;
}

export interface SimilarityMatrixResult {
  molecule_ids: string[];
  molecule_names: string[];
  metric: string;
  matrix: number[][];
}
