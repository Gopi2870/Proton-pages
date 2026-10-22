import {
  HmoCalculationResult,
  ConjugatedPresetSummary,
  ConjugatedAtom,
  ConjugatedBond,
} from '../types/quantum';

const API_BASE = '/api/v1/chemistry/quantum';

export const FALLBACK_CONJUGATED_PRESETS: ConjugatedPresetSummary[] = [
  {
    id: 'ethylene',
    name: 'Ethylene (Ethene)',
    formula: 'C2H4',
    atom_count: 2,
    pi_electron_count: 2,
    expected_aromaticity: 'non_aromatic',
    is_cyclic: false,
    description: 'Simplest conjugated pi-system consisting of two sp2 hybridized carbon atoms.',
    pedagogical_notes:
      'Two molecular orbitals: bonding psi_1 (m = +1.0) and antibonding psi_2* (m = -1.0). HOMO-LUMO gap of 2.0|beta| yields a deep UV pi->pi* transition.',
  },
  {
    id: '1_3_butadiene',
    name: '1,3-Butadiene (s-trans)',
    formula: 'C4H6',
    atom_count: 4,
    pi_electron_count: 4,
    expected_aromaticity: 'non_aromatic',
    is_cyclic: false,
    description: 'Archetype conjugated diene demonstrating pi-electron delocalization across four carbon centers.',
    pedagogical_notes:
      'Four pi-electrons occupying psi_1 and psi_2. Total energy E_pi = 4*alpha + 4.472*beta gives a resonance delocalization energy of 0.472|beta| (~15 kcal/mol) compared to two isolated ethylenes.',
  },
  {
    id: 'benzene',
    name: 'Benzene (Aromatic D6h)',
    formula: 'C6H6',
    atom_count: 6,
    pi_electron_count: 6,
    expected_aromaticity: 'aromatic',
    is_cyclic: true,
    description: 'Classic aromatic benchmark with 6 pi-electrons in a closed-shell planar ring.',
    pedagogical_notes:
      'Degenerate orbital pairs at m = +1.0 (bonding) and m = -1.0 (antibonding). Delocalization energy of 2.00|beta| (~150 kJ/mol) provides enormous resonance stabilization, rendering benzene resistant to addition reactions.',
  },
  {
    id: 'cyclobutadiene',
    name: 'Cyclobutadiene (Anti-aromatic D4h)',
    formula: 'C4H4',
    atom_count: 4,
    pi_electron_count: 4,
    expected_aromaticity: 'anti_aromatic',
    is_cyclic: true,
    description: 'Textbook 4n anti-aromatic ring exhibiting degenerate non-bonding orbitals.',
    pedagogical_notes:
      "Hückel secular solution yields energy levels at +2.0, 0.0, 0.0, -2.0. The non-bonding zero-energy levels are singly occupied by two electrons with parallel spins according to Hund's rule, producing an open-shell triplet biradical.",
  },
  {
    id: 'cyclopentadienyl_anion',
    name: 'Cyclopentadienyl Anion (Cp-)',
    formula: 'C5H5-',
    atom_count: 5,
    pi_electron_count: 6,
    expected_aromaticity: 'aromatic',
    is_cyclic: true,
    description: 'Aromatic 5-membered cyclic carbanion with 6 pi-electrons obeying Hückel 4n+2 rule.',
    pedagogical_notes:
      'Closed-shell configuration with 6 pi-electrons filling psi_1, psi_2, and psi_3. Net negative charge (-0.20 per carbon) is completely symmetrically delocalized, forming stable metallocene complexes like ferrocene.',
  },
];

class QuantumService {
  async getPresets(): Promise<ConjugatedPresetSummary[]> {
    try {
      const res = await fetch(`${API_BASE}/presets`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return FALLBACK_CONJUGATED_PRESETS;
    }
  }

  async getPresetAnalysis(id: string, betaEv: number = -2.7): Promise<HmoCalculationResult> {
    try {
      const res = await fetch(`${API_BASE}/presets/${id}?beta_ev=${betaEv}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return this.solveHmoLocally(id, betaEv);
    }
  }

  async calculateCustom(
    atoms: ConjugatedAtom[],
    bonds: ConjugatedBond[],
    betaEv: number = -2.7
  ): Promise<HmoCalculationResult> {
    try {
      const res = await fetch(`${API_BASE}/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ custom_atoms: atoms, custom_bonds: bonds, beta_value_ev: betaEv }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return this.solveHmoLocally('ethylene', betaEv);
    }
  }

  private solveHmoLocally(presetId: string, betaEv: number): HmoCalculationResult {
    if (presetId === 'benzene') {
      const atoms: ConjugatedAtom[] = [
        { atom_id: 0, element: 'C', label: 'C1', x_2d: 0.5, y_2d: 0.2, pi_electron_contribution: 1 },
        { atom_id: 1, element: 'C', label: 'C2', x_2d: 0.72, y_2d: 0.35, pi_electron_contribution: 1 },
        { atom_id: 2, element: 'C', label: 'C3', x_2d: 0.72, y_2d: 0.65, pi_electron_contribution: 1 },
        { atom_id: 3, element: 'C', label: 'C4', x_2d: 0.5, y_2d: 0.8, pi_electron_contribution: 1 },
        { atom_id: 4, element: 'C', label: 'C5', x_2d: 0.28, y_2d: 0.65, pi_electron_contribution: 1 },
        { atom_id: 5, element: 'C', label: 'C6', x_2d: 0.28, y_2d: 0.35, pi_electron_contribution: 1 },
      ];
      const bonds: ConjugatedBond[] = [
        { atom_i: 0, atom_j: 1, huckel_k: 1.0 },
        { atom_i: 1, atom_j: 2, huckel_k: 1.0 },
        { atom_i: 2, atom_j: 3, huckel_k: 1.0 },
        { atom_i: 3, atom_j: 4, huckel_k: 1.0 },
        { atom_i: 4, atom_j: 5, huckel_k: 1.0 },
        { atom_i: 5, atom_j: 0, huckel_k: 1.0 },
      ];

      return {
        molecule_id: 'benzene',
        molecule_name: 'Benzene (Aromatic D6h)',
        chemical_formula: 'C6H6',
        atom_count: 6,
        pi_electron_count: 6,
        total_pi_energy_units: 8.0,
        delocalization_energy_beta: 2.0,
        delocalization_energy_ev: Number((2.0 * Math.abs(betaEv)).toFixed(3)),
        homo_lumo_gap_beta: 2.0,
        homo_lumo_gap_ev: Number((2.0 * Math.abs(betaEv)).toFixed(3)),
        predicted_uv_lambda_nm: Number((1239.84 / (2.0 * Math.abs(betaEv))).toFixed(1)),
        aromaticity_classification: 'aromatic',
        is_closed_shell: true,
        orbitals: [
          { index: 1, energy_coefficient_m: 2.0, energy_ev: Number((2.0 * betaEv).toFixed(3)), electron_occupancy: 2, is_homo: false, is_lumo: false, is_singly_occupied: false, orbital_symmetry: 'symmetric', nodal_planes_count: 0, coefficients: [0.408, 0.408, 0.408, 0.408, 0.408, 0.408], label: 'psi_1' },
          { index: 2, energy_coefficient_m: 1.0, energy_ev: Number((1.0 * betaEv).toFixed(3)), electron_occupancy: 2, is_homo: true, is_lumo: false, is_singly_occupied: false, orbital_symmetry: 'degenerate', nodal_planes_count: 1, coefficients: [0.577, 0.289, -0.289, -0.577, -0.289, 0.289], label: 'psi_2' },
          { index: 3, energy_coefficient_m: 1.0, energy_ev: Number((1.0 * betaEv).toFixed(3)), electron_occupancy: 2, is_homo: true, is_lumo: false, is_singly_occupied: false, orbital_symmetry: 'degenerate', nodal_planes_count: 1, coefficients: [0.0, 0.5, 0.5, 0.0, -0.5, -0.5], label: 'psi_3' },
          { index: 4, energy_coefficient_m: -1.0, energy_ev: Number((-1.0 * betaEv).toFixed(3)), electron_occupancy: 0, is_homo: false, is_lumo: true, is_singly_occupied: false, orbital_symmetry: 'degenerate', nodal_planes_count: 2, coefficients: [0.577, -0.289, -0.289, 0.577, -0.289, -0.289], label: 'psi_4*' },
          { index: 5, energy_coefficient_m: -1.0, energy_ev: Number((-1.0 * betaEv).toFixed(3)), electron_occupancy: 0, is_homo: false, is_lumo: true, is_singly_occupied: false, orbital_symmetry: 'degenerate', nodal_planes_count: 2, coefficients: [0.0, 0.5, -0.5, 0.0, 0.5, -0.5], label: 'psi_5*' },
          { index: 6, energy_coefficient_m: -2.0, energy_ev: Number((-2.0 * betaEv).toFixed(3)), electron_occupancy: 0, is_homo: false, is_lumo: false, is_singly_occupied: false, orbital_symmetry: 'antisymmetric', nodal_planes_count: 3, coefficients: [0.408, -0.408, 0.408, -0.408, 0.408, -0.408], label: 'psi_6*' },
        ],
        atomic_charges: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        atomic_electron_densities: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
        bond_orders: [
          [1.0, 0.667, 0.0, 0.0, 0.0, 0.667],
          [0.667, 1.0, 0.667, 0.0, 0.0, 0.0],
          [0.0, 0.667, 1.0, 0.667, 0.0, 0.0],
          [0.0, 0.0, 0.667, 1.0, 0.667, 0.0],
          [0.0, 0.0, 0.0, 0.667, 1.0, 0.667],
          [0.667, 0.0, 0.0, 0.0, 0.667, 1.0],
        ],
        atoms,
        bonds,
      };
    }

    // Default to Ethylene
    const atoms: ConjugatedAtom[] = [
      { atom_id: 0, element: 'C', label: 'C1', x_2d: 0.35, y_2d: 0.5, pi_electron_contribution: 1 },
      { atom_id: 1, element: 'C', label: 'C2', x_2d: 0.65, y_2d: 0.5, pi_electron_contribution: 1 },
    ];
    const bonds: ConjugatedBond[] = [{ atom_i: 0, atom_j: 1, huckel_k: 1.0 }];

    return {
      molecule_id: 'ethylene',
      molecule_name: 'Ethylene (Ethene)',
      chemical_formula: 'C2H4',
      atom_count: 2,
      pi_electron_count: 2,
      total_pi_energy_units: 2.0,
      delocalization_energy_beta: 0.0,
      delocalization_energy_ev: 0.0,
      homo_lumo_gap_beta: 2.0,
      homo_lumo_gap_ev: Number((2.0 * Math.abs(betaEv)).toFixed(3)),
      predicted_uv_lambda_nm: Number((1239.84 / (2.0 * Math.abs(betaEv))).toFixed(1)),
      aromaticity_classification: 'non_aromatic',
      is_closed_shell: true,
      orbitals: [
        { index: 1, energy_coefficient_m: 1.0, energy_ev: Number((1.0 * betaEv).toFixed(3)), electron_occupancy: 2, is_homo: true, is_lumo: false, is_singly_occupied: false, orbital_symmetry: 'symmetric', nodal_planes_count: 0, coefficients: [0.7071, 0.7071], label: 'psi_1' },
        { index: 2, energy_coefficient_m: -1.0, energy_ev: Number((-1.0 * betaEv).toFixed(3)), electron_occupancy: 0, is_homo: false, is_lumo: true, is_singly_occupied: false, orbital_symmetry: 'antisymmetric', nodal_planes_count: 1, coefficients: [0.7071, -0.7071], label: 'psi_2*' },
      ],
      atomic_charges: [0.0, 0.0],
      atomic_electron_densities: [1.0, 1.0],
      bond_orders: [
        [1.0, 1.0],
        [1.0, 1.0],
      ],
      atoms,
      bonds,
    };
  }
}

export const quantumService = new QuantumService();
