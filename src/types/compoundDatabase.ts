/**
 * Type definitions for Comprehensive Chemical Compounds & Spectral Reference Database (PR #050).
 */

export interface SpectralPeakUv {
  wavelength_nm: number;
  extinction_coeff_m_cm: number;
  electronic_transition: string;
}

export interface SpectralBandIr {
  wavenumber_cm1: number;
  intensity: 'strong' | 'medium' | 'weak' | 'broad' | string;
  vibrational_mode: string;
}

export interface SpectralShiftNmr1H {
  chemical_shift_ppm: number;
  multiplicity: 's' | 'd' | 't' | 'q' | 'm' | 'dd' | string;
  integration: number;
  assignment: string;
}

export interface SpectralShiftNmr13C {
  chemical_shift_ppm: number;
  carbon_type: 'CH3' | 'CH2' | 'CH' | 'C_quat' | 'C=O' | 'aromatic' | string;
  assignment: string;
}

export interface DetailedCompound {
  id: string;
  name: string;
  iupac_name: string;
  formula: string;
  smiles: string;
  inchi?: string;
  inchi_key?: string;
  cas_number?: string;
  molecular_weight: number;
  monoisotopic_mass: number;
  category: 'Organic' | 'Inorganic' | 'Biochemical' | 'Pharmaceutical' | 'Organometallic' | string;
  subcategory: string;
  physical_state_at_25c: 'Solid' | 'Liquid' | 'Gas' | string;
  melting_point_c?: number;
  boiling_point_c?: number;
  density_g_cm3?: number;
  aqueous_solubility_g_l?: number;
  log_p?: number;
  pka_values: number[];
  delta_h_f_kj_mol?: number;
  entropy_s_j_mol_k?: number;
  heat_capacity_cp_j_mol_k?: number;
  delta_g_f_kj_mol?: number;
  uv_vis_peaks: SpectralPeakUv[];
  ir_bands: SpectralBandIr[];
  nmr_1h_shifts: SpectralShiftNmr1H[];
  nmr_13c_shifts: SpectralShiftNmr13C[];
  safety_ghs_pictograms: string[];
  hazard_statements: string[];
  description: string;
}

export interface CompoundSearchFilter {
  query?: string;
  category?: string;
  min_mw?: number;
  max_mw?: number;
  min_log_p?: number;
  max_log_p?: number;
  physical_state?: string;
  has_uv?: boolean;
  has_ir?: boolean;
  has_nmr?: boolean;
  limit?: number;
  offset?: number;
}

export interface CompoundSearchResult {
  total_matches: number;
  compounds: DetailedCompound[];
  query_time_ms: number;
}

export interface SpectralMatchRequest {
  target_uv_wavelength_nm?: number;
  target_ir_wavenumber_cm1?: number;
  target_nmr_1h_ppm?: number;
  tolerance_percent?: number;
  limit?: number;
}

export interface DatabaseStats {
  total_compounds: number;
  categories: Record<string, number>;
  compounds_with_uv: number;
  compounds_with_ir: number;
  compounds_with_nmr: number;
  average_molecular_weight: number;
}
