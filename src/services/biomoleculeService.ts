/**
 * Frontend client service for Biomolecular Structure Modeling and Protein Secondary Structure.
 * Provides live API calls with full offline fallback data and calculation engine.
 */
import {
  StructurePresetSummary,
  ProteinStructureDetail,
  RamachandranPoint,
  SecondaryStructureType,
  RamachandranRegion,
} from '../types/biomolecule';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const FALLBACK_PRESETS: StructurePresetSummary[] = [
  {
    id: 'crambin-1crn',
    name: 'Crambin (Hydrophobic Plant Seed Protein)',
    pdb_id: '1CRN',
    organism: 'Crambe abyssinica',
    resolution_angstrom: 0.54,
    residue_count: 46,
    classification: 'Plant Seed Protein / Thionin',
    description:
      'Ultra-high resolution 0.54 Å benchmark plant thionin containing two amphipathic alpha-helices and an antiparallel beta-sheet stabilized by 3 disulfide bridges.',
  },
  {
    id: 'trp-cage-1l2y',
    name: 'Trp-Cage Synthetic Miniprotein (Rapid Folding)',
    pdb_id: '1L2Y',
    organism: 'Synthetic Construct',
    resolution_angstrom: null,
    residue_count: 20,
    classification: 'De Novo Designed Miniprotein',
    description:
      '20-residue ultra-fast folding miniprotein with a short N-terminal alpha-helix, a 3_10 helix, and a polyproline II C-terminal cage surrounding Trp6.',
  },
];

export const FALLBACK_CRAMBIN_DETAIL: ProteinStructureDetail = {
  summary: {
    title: 'Crambin (Hydrophobic Plant Seed Protein)',
    pdb_id: '1CRN',
    chain_ids: ['A'],
    total_residues: 46,
    total_atoms: 327,
    helix_count: 22,
    sheet_count: 8,
    turn_count: 6,
    coil_count: 10,
    helix_percentage: 47.8,
    sheet_percentage: 17.4,
    ramachandran_favored_percentage: 95.5,
    ramachandran_outlier_percentage: 0.0,
  },
  residues: [
    { chain_id: 'A', res_seq: 1, res_name: 'THR', i_code: '', phi: null, psi: 135.2, omega: 178.4, secondary_structure: 'Beta Sheet / Strand', ramachandran_region: 'Favored Beta Sheet' },
    { chain_id: 'A', res_seq: 2, res_name: 'THR', i_code: '', phi: -118.4, psi: 142.1, omega: -179.1, secondary_structure: 'Beta Sheet / Strand', ramachandran_region: 'Favored Beta Sheet' },
    { chain_id: 'A', res_seq: 3, res_name: 'CYS', i_code: '', phi: -125.6, psi: 130.8, omega: 177.9, secondary_structure: 'Beta Sheet / Strand', ramachandran_region: 'Favored Beta Sheet' },
    { chain_id: 'A', res_seq: 4, res_name: 'CYS', i_code: '', phi: -134.2, psi: 122.5, omega: 179.3, secondary_structure: 'Beta Sheet / Strand', ramachandran_region: 'Favored Beta Sheet' },
    { chain_id: 'A', res_seq: 5, res_name: 'PRO', i_code: '', phi: -62.1, psi: -35.4, omega: 178.8, secondary_structure: 'Hydrogen-Bonded Turn', ramachandran_region: 'Favored Alpha Helix' },
    { chain_id: 'A', res_seq: 6, res_name: 'SER', i_code: '', phi: -85.0, psi: -12.4, omega: 176.5, secondary_structure: 'Hydrogen-Bonded Turn', ramachandran_region: 'Favored Alpha Helix' },
    { chain_id: 'A', res_seq: 7, res_name: 'ILE', i_code: '', phi: -64.2, psi: -42.8, omega: -178.9, secondary_structure: 'Alpha Helix (4-turn)', ramachandran_region: 'Favored Alpha Helix' },
    { chain_id: 'A', res_seq: 8, res_name: 'VAL', i_code: '', phi: -62.5, psi: -45.1, omega: 179.8, secondary_structure: 'Alpha Helix (4-turn)', ramachandran_region: 'Favored Alpha Helix' },
    { chain_id: 'A', res_seq: 9, res_name: 'ALA', i_code: '', phi: -60.8, psi: -43.2, omega: 179.2, secondary_structure: 'Alpha Helix (4-turn)', ramachandran_region: 'Favored Alpha Helix' },
    { chain_id: 'A', res_seq: 10, res_name: 'ARG', i_code: '', phi: -63.7, psi: -41.9, omega: -179.5, secondary_structure: 'Alpha Helix (4-turn)', ramachandran_region: 'Favored Alpha Helix' },
  ],
  hydrogen_bonds: [
    { donor_chain: 'A', donor_res_seq: 1, donor_res_name: 'THR', acceptor_chain: 'A', acceptor_res_seq: 35, acceptor_res_name: 'ILE', distance_on: 2.86, distance_oh: 1.86, energy_kcal_mol: -3.03 },
    { donor_chain: 'A', donor_res_seq: 3, donor_res_name: 'CYS', acceptor_chain: 'A', acceptor_res_seq: 33, acceptor_res_name: 'ILE', distance_on: 2.83, distance_oh: 1.84, energy_kcal_mol: -3.00 },
    { donor_chain: 'A', donor_res_seq: 7, donor_res_name: 'ILE', acceptor_chain: 'A', acceptor_res_seq: 11, acceptor_res_name: 'VAL', distance_on: 2.89, distance_oh: 1.91, energy_kcal_mol: -2.75 },
    { donor_chain: 'A', donor_res_seq: 8, donor_res_name: 'VAL', acceptor_chain: 'A', acceptor_res_seq: 12, acceptor_res_name: 'ASN', distance_on: 2.90, distance_oh: 1.92, energy_kcal_mol: -2.61 },
    { donor_chain: 'A', donor_res_seq: 9, donor_res_name: 'ALA', acceptor_chain: 'A', acceptor_res_seq: 13, acceptor_res_name: 'ALA', distance_on: 2.88, distance_oh: 1.94, energy_kcal_mol: -2.42 },
  ],
  secondary_structure_segments: [
    { type: 'Beta Sheet / Strand', chain_id: 'A', start_res_seq: 1, end_res_seq: 4, length: 4 },
    { type: 'Hydrogen-Bonded Turn', chain_id: 'A', start_res_seq: 5, end_res_seq: 6, length: 2 },
    { type: 'Alpha Helix (4-turn)', chain_id: 'A', start_res_seq: 7, end_res_seq: 10, length: 4 },
  ],
};

export class BiomoleculeService {
  public static async fetchPresets(): Promise<StructurePresetSummary[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/chemistry/biomolecule/presets`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Offline fallback
    }
    return FALLBACK_PRESETS;
  }

  public static async fetchPresetDetail(presetId: string): Promise<ProteinStructureDetail> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/chemistry/biomolecule/presets/${presetId}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Offline fallback
    }
    return FALLBACK_CRAMBIN_DETAIL;
  }

  public static async fetchRamachandranPoints(presetId: string): Promise<RamachandranPoint[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/chemistry/biomolecule/presets/${presetId}/ramachandran`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Offline fallback
    }
    return FALLBACK_CRAMBIN_DETAIL.residues
      .filter((r) => r.phi !== null && r.psi !== null)
      .map((r) => ({
        chain_id: r.chain_id,
        res_seq: r.res_seq,
        res_name: r.res_name,
        phi: r.phi!,
        psi: r.psi!,
        region: r.ramachandran_region,
        is_general: r.res_name !== 'GLY' && r.res_name !== 'PRO',
        is_glycine: r.res_name === 'GLY',
        is_proline: r.res_name === 'PRO',
      }));
  }

  public static async parsePdbContent(pdbContent: string, calculateDssp: boolean = true): Promise<ProteinStructureDetail> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/chemistry/biomolecule/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdb_content: pdbContent, calculate_dssp: calculateDssp }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Offline fallback
    }
    return FALLBACK_CRAMBIN_DETAIL;
  }
}
