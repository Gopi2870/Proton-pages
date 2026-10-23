/**
 * TypeScript domain contracts for 230 Crystallographic Space Groups,
 * Wyckoff Positions, Metric Tensors, and Powder XRD Bragg Diffraction.
 */

export type CrystalSystem =
  | 'triclinic'
  | 'monoclinic'
  | 'orthorhombic'
  | 'tetragonal'
  | 'trigonal'
  | 'hexagonal'
  | 'cubic';

export type CenteringType = 'P' | 'I' | 'F' | 'C' | 'A' | 'B' | 'R';

export type XRayRadiationSource = 'Cu_Ka' | 'Mo_Ka' | 'Co_Ka' | 'Cr_Ka' | 'Fe_Ka';

export interface SymmetryOperation {
  jones_faithful: string;
  rotation_matrix: number[][]; // 3x3
  translation_vector: number[]; // 3x1
  is_identity: boolean;
  is_inversion: boolean;
  rotation_order: number;
  determinant: number;
}

export interface WyckoffSite {
  multiplicity: number;
  letter: string;
  site_symmetry: string;
  coordinate_generator: string;
  coordinates: string[];
  provenance: string;
}

export interface SpaceGroupSummary {
  number: number;
  hermann_mauguin: string;
  hermann_mauguin_full: string;
  hall_symbol: string;
  schoenflies: string;
  crystal_system: CrystalSystem;
  point_group: string;
  laue_class: string;
  centering: CenteringType;
  is_centrosymmetric: boolean;
  general_multiplicity: number;
  wyckoff_letters: string[];
  description: string;
}

export interface SpaceGroupDetail extends SpaceGroupSummary {
  symmetry_operations: SymmetryOperation[];
  wyckoff_sites: WyckoffSite[];
}

export interface FractionalCoordinate {
  element: string;
  x: number;
  y: number;
  z: number;
  occupancy?: number;
  wyckoff_letter?: string;
  site_multiplicity?: number;
  thermal_factor_b?: number;
}

export interface UnitCellParameters {
  a: number;
  b: number;
  c: number;
  alpha: number;
  beta: number;
  gamma: number;
}

export interface MetricTensorResult {
  unit_cell: UnitCellParameters;
  volume_angstrom3: number;
  direct_metric_tensor: number[][];
  reciprocal_metric_tensor: number[][];
  direct_to_cartesian_matrix: number[][];
  cartesian_to_direct_matrix: number[][];
  reciprocal_a_star: number;
  reciprocal_b_star: number;
  reciprocal_c_star: number;
  reciprocal_alpha_star: number;
  reciprocal_beta_star: number;
  reciprocal_gamma_star: number;
}

export interface CartesianCoordinate {
  element: string;
  x_angstrom: number;
  y_angstrom: number;
  z_angstrom: number;
  occupancy: number;
  site_label: string;
}

export interface BraggDiffractionPeak {
  h: number;
  k: number;
  l: number;
  d_spacing_angstrom: number;
  two_theta_degrees: number;
  structure_factor_real: number;
  structure_factor_imag: number;
  structure_factor_magnitude: number;
  phase_degrees: number;
  form_factor_contributions: Record<string, number>;
  multiplicity: number;
  lorentz_polarization_factor: number;
  intensity_raw: number;
  intensity_relative: number;
  is_systematic_absence: boolean;
  extinction_condition: string;
}

export interface PowderDiffractionPattern {
  space_group_number: number;
  space_group_symbol: string;
  radiation_source: XRayRadiationSource;
  wavelength_angstrom: number;
  peaks: BraggDiffractionPeak[];
  two_theta_grid: number[];
  intensity_profile: number[];
  total_allowed_reflections: number;
  total_extinct_reflections: number;
}

export interface SpaceGroupPreset {
  id: string;
  name: string;
  formula: string;
  space_group_number: number;
  space_group_symbol: string;
  crystal_system: CrystalSystem;
  unit_cell: UnitCellParameters;
  basis_sites: FractionalCoordinate[];
  description: string;
  literature_reference: string;
}
