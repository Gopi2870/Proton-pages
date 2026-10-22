export type CrystalSystem =
  | 'cubic'
  | 'tetragonal'
  | 'orthorhombic'
  | 'hexagonal'
  | 'rhombohedral'
  | 'monoclinic'
  | 'triclinic';

export type BravaisLatticeType =
  | 'primitive_cubic'
  | 'body_centered_cubic'
  | 'face_centered_cubic'
  | 'primitive_tetragonal'
  | 'body_centered_tetragonal'
  | 'primitive_orthorhombic'
  | 'base_centered_orthorhombic'
  | 'body_centered_orthorhombic'
  | 'face_centered_orthorhombic'
  | 'hexagonal'
  | 'rhombohedral'
  | 'primitive_monoclinic'
  | 'base_centered_monoclinic'
  | 'triclinic';

export type XRaySource = 'Cu_Ka' | 'Mo_Ka' | 'Co_Ka' | 'Cr_Ka';

export interface FractionalAtom {
  element: string;
  x: floatNumber;
  y: floatNumber;
  z: floatNumber;
  occupancy?: number;
  wyckoff?: string;
}

type floatNumber = number;

export interface MillerPlane {
  h: number;
  k: number;
  l: number;
  d_spacing_angstrom: number;
  two_theta_degrees: number;
  intensity_relative: number;
  multiplicity: number;
  structure_factor_mag: number;
}

export interface UnitCellGeometry {
  a: number;
  b: number;
  c: number;
  alpha: number;
  beta: number;
  gamma: number;
  volume_angstrom3: number;
  crystal_system: CrystalSystem;
  bravais_lattice: BravaisLatticeType;
  formula_units_z: number;
  density_g_cm3: number;
  packing_efficiency: number;
  metric_tensor?: number[][];
}

export interface XrdDiffractionSpectrum {
  crystal_id: string;
  crystal_name: string;
  chemical_formula: string;
  x_ray_source: XRaySource;
  wavelength_angstrom: number;
  peaks: MillerPlane[];
  two_theta_grid: number[];
  intensity_profile: number[];
  highest_intensity_peak: MillerPlane;
}

export interface CrystalStructurePreset {
  id: string;
  name: string;
  formula: string;
  crystal_system: CrystalSystem;
  bravais_lattice: BravaisLatticeType;
  space_group: string;
  a: number;
  b: number;
  c: number;
  alpha: number;
  beta: number;
  gamma: number;
  z: number;
  molar_mass_g_mol: number;
  basis_atoms: FractionalAtom[];
  description: string;
  practical_applications: string[];
}

export interface MillerIndicesSpacingRequest {
  h: number;
  k: number;
  l: number;
  a: number;
  b?: number;
  c?: number;
  alpha?: number;
  beta?: number;
  gamma?: number;
  crystal_system?: CrystalSystem;
}

export interface MillerIndicesSpacingResponse {
  h: number;
  k: number;
  l: number;
  d_spacing_angstrom: number;
  cu_ka_two_theta_deg?: number;
  mo_ka_two_theta_deg?: number;
  co_ka_two_theta_deg?: number;
  is_diffraction_allowed: boolean;
}
