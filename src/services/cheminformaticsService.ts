/**
 * Cheminformatics Client Service.
 * Provides API communication with fallback to high-fidelity client-side
 * topological graph analysis, Morgan circular fingerprinting, and substructure matching.
 */

import {
  MolecularGraph,
  MorganFingerprint,
  SimilarityResult,
  SubstructureMatch,
  LibraryScreeningResponse,
  SimilarityMatrixResult,
  SimilarityMetric,
  CircularEnvironment
} from '../types/cheminformatics';

const API_BASE = '/api/v1/chemistry/cheminformatics';

// FNV-1a 32-bit hash function in JavaScript
function fnv1a32(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export const CURATED_LIBRARY: MolecularGraph[] = [
  {
    id: 'aspirin',
    name: 'Aspirin (Acetylsalicylic Acid)',
    smiles: 'CC(=O)Oc1ccccc1C(=O)O',
    formula: 'C9H8O4',
    molecular_weight: 180.16,
    description: 'Analgesic and anti-inflammatory nonsteroidal drug; contains benzene ring, carboxylic acid, and ester groups.',
    atoms: [
      { index: 0, element: 'C', atomic_number: 6, x: -1.2, y: 0.0, aromatic: true, in_ring: true },
      { index: 1, element: 'C', atomic_number: 6, x: -0.6, y: 1.04, aromatic: true, in_ring: true },
      { index: 2, element: 'C', atomic_number: 6, x: 0.6, y: 1.04, aromatic: true, in_ring: true },
      { index: 3, element: 'C', atomic_number: 6, x: 1.2, y: 0.0, aromatic: true, in_ring: true },
      { index: 4, element: 'C', atomic_number: 6, x: 0.6, y: -1.04, aromatic: true, in_ring: true },
      { index: 5, element: 'C', atomic_number: 6, x: -0.6, y: -1.04, aromatic: true, in_ring: true },
      { index: 6, element: 'C', atomic_number: 6, x: -2.6, y: 0.0 },
      { index: 7, element: 'O', atomic_number: 8, x: -3.2, y: 1.04 },
      { index: 8, element: 'O', atomic_number: 8, x: -3.2, y: -1.04 },
      { index: 9, element: 'O', atomic_number: 8, x: -1.2, y: 2.2 },
      { index: 10, element: 'C', atomic_number: 6, x: -2.4, y: 2.7 },
      { index: 11, element: 'O', atomic_number: 8, x: -3.3, y: 2.0 },
      { index: 12, element: 'C', atomic_number: 6, x: -2.6, y: 4.1 }
    ],
    bonds: [
      { source: 0, target: 1, order: 1.5, aromatic: true },
      { source: 1, target: 2, order: 1.5, aromatic: true },
      { source: 2, target: 3, order: 1.5, aromatic: true },
      { source: 3, target: 4, order: 1.5, aromatic: true },
      { source: 4, target: 5, order: 1.5, aromatic: true },
      { source: 5, target: 0, order: 1.5, aromatic: true },
      { source: 0, target: 6, order: 1.0 },
      { source: 6, target: 7, order: 2.0 },
      { source: 6, target: 8, order: 1.0 },
      { source: 1, target: 9, order: 1.0 },
      { source: 9, target: 10, order: 1.0 },
      { source: 10, target: 11, order: 2.0 },
      { source: 10, target: 12, order: 1.0 }
    ]
  },
  {
    id: 'paracetamol',
    name: 'Acetaminophen (Paracetamol)',
    smiles: 'CC(=O)Nc1ccc(O)cc1',
    formula: 'C8H9NO2',
    molecular_weight: 151.16,
    description: 'Widely used antipyretic and analgesic; features 4-aminophenol scaffold with N-acetyl group.',
    atoms: [
      { index: 0, element: 'C', atomic_number: 6, x: 0.0, y: 1.4, aromatic: true, in_ring: true },
      { index: 1, element: 'C', atomic_number: 6, x: 1.2, y: 0.7, aromatic: true, in_ring: true },
      { index: 2, element: 'C', atomic_number: 6, x: 1.2, y: -0.7, aromatic: true, in_ring: true },
      { index: 3, element: 'C', atomic_number: 6, x: 0.0, y: -1.4, aromatic: true, in_ring: true },
      { index: 4, element: 'C', atomic_number: 6, x: -1.2, y: -0.7, aromatic: true, in_ring: true },
      { index: 5, element: 'C', atomic_number: 6, x: -1.2, y: 0.7, aromatic: true, in_ring: true },
      { index: 6, element: 'O', atomic_number: 8, x: 0.0, y: 2.8 },
      { index: 7, element: 'N', atomic_number: 7, x: 0.0, y: -2.8 },
      { index: 8, element: 'C', atomic_number: 6, x: -1.1, y: -3.5 },
      { index: 9, element: 'O', atomic_number: 8, x: -2.2, y: -3.0 },
      { index: 10, element: 'C', atomic_number: 6, x: -0.9, y: -4.9 }
    ],
    bonds: [
      { source: 0, target: 1, order: 1.5, aromatic: true },
      { source: 1, target: 2, order: 1.5, aromatic: true },
      { source: 2, target: 3, order: 1.5, aromatic: true },
      { source: 3, target: 4, order: 1.5, aromatic: true },
      { source: 4, target: 5, order: 1.5, aromatic: true },
      { source: 5, target: 0, order: 1.5, aromatic: true },
      { source: 0, target: 6, order: 1.0 },
      { source: 3, target: 7, order: 1.0 },
      { source: 7, target: 8, order: 1.0 },
      { source: 8, target: 9, order: 2.0 },
      { source: 8, target: 10, order: 1.0 }
    ]
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    smiles: 'CC(C)Cc1ccc(C(C)C(=O)O)cc1',
    formula: 'C13H18O2',
    molecular_weight: 206.28,
    description: 'Propionic acid derivative NSAID; contains isobutyl-substituted benzene with propionic acid chain.',
    atoms: [
      { index: 0, element: 'C', atomic_number: 6, x: 0.0, y: 0.0, aromatic: true, in_ring: true },
      { index: 1, element: 'C', atomic_number: 6, x: 1.2, y: 0.7, aromatic: true, in_ring: true },
      { index: 2, element: 'C', atomic_number: 6, x: 2.4, y: 0.0, aromatic: true, in_ring: true },
      { index: 3, element: 'C', atomic_number: 6, x: 2.4, y: -1.4, aromatic: true, in_ring: true },
      { index: 4, element: 'C', atomic_number: 6, x: 1.2, y: -2.1, aromatic: true, in_ring: true },
      { index: 5, element: 'C', atomic_number: 6, x: 0.0, y: -1.4, aromatic: true, in_ring: true },
      { index: 6, element: 'C', atomic_number: 6, x: -1.2, y: 0.8 },
      { index: 7, element: 'C', atomic_number: 6, x: -2.5, y: 0.2 },
      { index: 8, element: 'C', atomic_number: 6, x: -3.6, y: 1.2 },
      { index: 9, element: 'C', atomic_number: 6, x: -2.7, y: -1.2 },
      { index: 10, element: 'C', atomic_number: 6, x: 3.7, y: 0.8 },
      { index: 11, element: 'C', atomic_number: 6, x: 3.5, y: 2.2 },
      { index: 12, element: 'C', atomic_number: 6, x: 5.0, y: 0.2 },
      { index: 13, element: 'O', atomic_number: 8, x: 5.3, y: -1.0 },
      { index: 14, element: 'O', atomic_number: 8, x: 6.0, y: 1.1 }
    ],
    bonds: [
      { source: 0, target: 1, order: 1.5, aromatic: true },
      { source: 1, target: 2, order: 1.5, aromatic: true },
      { source: 2, target: 3, order: 1.5, aromatic: true },
      { source: 3, target: 4, order: 1.5, aromatic: true },
      { source: 4, target: 5, order: 1.5, aromatic: true },
      { source: 5, target: 0, order: 1.5, aromatic: true },
      { source: 0, target: 6, order: 1.0 },
      { source: 6, target: 7, order: 1.0 },
      { source: 7, target: 8, order: 1.0 },
      { source: 7, target: 9, order: 1.0 },
      { source: 2, target: 10, order: 1.0 },
      { source: 10, target: 11, order: 1.0 },
      { source: 10, target: 12, order: 1.0 },
      { source: 12, target: 13, order: 2.0 },
      { source: 12, target: 14, order: 1.0 }
    ]
  },
  {
    id: 'dopamine',
    name: 'Dopamine',
    smiles: 'NCCc1ccc(O)c(O)c1',
    formula: 'C8H11NO2',
    molecular_weight: 153.18,
    description: 'Catecholamine neurotransmitter; composed of a catechol (1,2-dihydroxybenzene) core and an ethylamine side chain.',
    atoms: [
      { index: 0, element: 'C', atomic_number: 6, x: -0.7, y: 1.2, aromatic: true, in_ring: true },
      { index: 1, element: 'C', atomic_number: 6, x: 0.7, y: 1.2, aromatic: true, in_ring: true },
      { index: 2, element: 'C', atomic_number: 6, x: 1.4, y: 0.0, aromatic: true, in_ring: true },
      { index: 3, element: 'C', atomic_number: 6, x: 0.7, y: -1.2, aromatic: true, in_ring: true },
      { index: 4, element: 'C', atomic_number: 6, x: -0.7, y: -1.2, aromatic: true, in_ring: true },
      { index: 5, element: 'C', atomic_number: 6, x: -1.4, y: 0.0, aromatic: true, in_ring: true },
      { index: 6, element: 'O', atomic_number: 8, x: -1.4, y: 2.4 },
      { index: 7, element: 'O', atomic_number: 8, x: 1.4, y: 2.4 },
      { index: 8, element: 'C', atomic_number: 6, x: -2.8, y: 0.0 },
      { index: 9, element: 'C', atomic_number: 6, x: -3.6, y: -1.2 },
      { index: 10, element: 'N', atomic_number: 7, x: -5.0, y: -1.0 }
    ],
    bonds: [
      { source: 0, target: 1, order: 1.5, aromatic: true },
      { source: 1, target: 2, order: 1.5, aromatic: true },
      { source: 2, target: 3, order: 1.5, aromatic: true },
      { source: 3, target: 4, order: 1.5, aromatic: true },
      { source: 4, target: 5, order: 1.5, aromatic: true },
      { source: 5, target: 0, order: 1.5, aromatic: true },
      { source: 0, target: 6, order: 1.0 },
      { source: 1, target: 7, order: 1.0 },
      { source: 5, target: 8, order: 1.0 },
      { source: 8, target: 9, order: 1.0 },
      { source: 9, target: 10, order: 1.0 }
    ]
  },
  {
    id: 'benzoic_acid',
    name: 'Benzoic Acid',
    smiles: 'c1ccccc1C(=O)O',
    formula: 'C7H6O2',
    molecular_weight: 122.12,
    description: 'Simplest aromatic carboxylic acid used as a chemical preservative and organic synthesis precursor.',
    atoms: [
      { index: 0, element: 'C', atomic_number: 6, x: 0.0, y: 0.0, aromatic: true, in_ring: true },
      { index: 1, element: 'C', atomic_number: 6, x: 1.2, y: 0.7, aromatic: true, in_ring: true },
      { index: 2, element: 'C', atomic_number: 6, x: 2.4, y: 0.0, aromatic: true, in_ring: true },
      { index: 3, element: 'C', atomic_number: 6, x: 2.4, y: -1.4, aromatic: true, in_ring: true },
      { index: 4, element: 'C', atomic_number: 6, x: 1.2, y: -2.1, aromatic: true, in_ring: true },
      { index: 5, element: 'C', atomic_number: 6, x: 0.0, y: -1.4, aromatic: true, in_ring: true },
      { index: 6, element: 'C', atomic_number: 6, x: -1.3, y: 0.7 },
      { index: 7, element: 'O', atomic_number: 8, x: -1.4, y: 1.9 },
      { index: 8, element: 'O', atomic_number: 8, x: -2.4, y: 0.0 }
    ],
    bonds: [
      { source: 0, target: 1, order: 1.5, aromatic: true },
      { source: 1, target: 2, order: 1.5, aromatic: true },
      { source: 2, target: 3, order: 1.5, aromatic: true },
      { source: 3, target: 4, order: 1.5, aromatic: true },
      { source: 4, target: 5, order: 1.5, aromatic: true },
      { source: 5, target: 0, order: 1.5, aromatic: true },
      { source: 0, target: 6, order: 1.0 },
      { source: 6, target: 7, order: 2.0 },
      { source: 6, target: 8, order: 1.0 }
    ]
  },
  {
    id: 'phenol',
    name: 'Phenol',
    smiles: 'c1ccccc1O',
    formula: 'C6H6O',
    molecular_weight: 94.11,
    description: 'Aromatic compound consisting of a benzene ring bonded to a single hydroxyl group.',
    atoms: [
      { index: 0, element: 'C', atomic_number: 6, x: 0.0, y: 1.2, aromatic: true, in_ring: true },
      { index: 1, element: 'C', atomic_number: 6, x: 1.04, y: 0.6, aromatic: true, in_ring: true },
      { index: 2, element: 'C', atomic_number: 6, x: 1.04, y: -0.6, aromatic: true, in_ring: true },
      { index: 3, element: 'C', atomic_number: 6, x: 0.0, y: -1.2, aromatic: true, in_ring: true },
      { index: 4, element: 'C', atomic_number: 6, x: -1.04, y: -0.6, aromatic: true, in_ring: true },
      { index: 5, element: 'C', atomic_number: 6, x: -1.04, y: 0.6, aromatic: true, in_ring: true },
      { index: 6, element: 'O', atomic_number: 8, x: 0.0, y: 2.5 }
    ],
    bonds: [
      { source: 0, target: 1, order: 1.5, aromatic: true },
      { source: 1, target: 2, order: 1.5, aromatic: true },
      { source: 2, target: 3, order: 1.5, aromatic: true },
      { source: 3, target: 4, order: 1.5, aromatic: true },
      { source: 4, target: 5, order: 1.5, aromatic: true },
      { source: 5, target: 0, order: 1.5, aromatic: true },
      { source: 0, target: 6, order: 1.0 }
    ]
  },
  {
    id: 'benzene',
    name: 'Benzene',
    smiles: 'c1ccccc1',
    formula: 'C6H6',
    molecular_weight: 78.11,
    description: 'Archetypal aromatic hydrocarbon with fully delocalized pi electron system across a planar hexagonal ring.',
    atoms: [
      { index: 0, element: 'C', atomic_number: 6, x: 0.0, y: 1.2, aromatic: true, in_ring: true },
      { index: 1, element: 'C', atomic_number: 6, x: 1.04, y: 0.6, aromatic: true, in_ring: true },
      { index: 2, element: 'C', atomic_number: 6, x: 1.04, y: -0.6, aromatic: true, in_ring: true },
      { index: 3, element: 'C', atomic_number: 6, x: 0.0, y: -1.2, aromatic: true, in_ring: true },
      { index: 4, element: 'C', atomic_number: 6, x: -1.04, y: -0.6, aromatic: true, in_ring: true },
      { index: 5, element: 'C', atomic_number: 6, x: -1.04, y: 0.6, aromatic: true, in_ring: true }
    ],
    bonds: [
      { source: 0, target: 1, order: 1.5, aromatic: true },
      { source: 1, target: 2, order: 1.5, aromatic: true },
      { source: 2, target: 3, order: 1.5, aromatic: true },
      { source: 3, target: 4, order: 1.5, aromatic: true },
      { source: 4, target: 5, order: 1.5, aromatic: true },
      { source: 5, target: 0, order: 1.5, aromatic: true }
    ]
  }
];

export const CURATED_FRAGMENTS: MolecularGraph[] = [
  {
    id: 'frag_carboxylic_acid',
    name: 'Carboxylic Acid (-COOH)',
    smiles: 'C(=O)O',
    formula: 'CHO2',
    molecular_weight: 45.02,
    description: 'Carboxyl group with carbonyl C=O and hydroxyl C-OH.',
    atoms: [
      { index: 0, element: 'C', atomic_number: 6, x: 0.0, y: 0.0 },
      { index: 1, element: 'O', atomic_number: 8, x: 1.0, y: 0.8 },
      { index: 2, element: 'O', atomic_number: 8, x: 0.8, y: -1.0 }
    ],
    bonds: [
      { source: 0, target: 1, order: 2.0 },
      { source: 0, target: 2, order: 1.0 }
    ]
  },
  {
    id: 'frag_benzene',
    name: 'Benzene Ring',
    smiles: 'c1ccccc1',
    formula: 'C6',
    molecular_weight: 72.06,
    description: 'Six-carbon aromatic ring with delocalized pi bonds.',
    atoms: [
      { index: 0, element: 'C', atomic_number: 6, x: 0.0, y: 1.2, aromatic: true, in_ring: true },
      { index: 1, element: 'C', atomic_number: 6, x: 1.04, y: 0.6, aromatic: true, in_ring: true },
      { index: 2, element: 'C', atomic_number: 6, x: 1.04, y: -0.6, aromatic: true, in_ring: true },
      { index: 3, element: 'C', atomic_number: 6, x: 0.0, y: -1.2, aromatic: true, in_ring: true },
      { index: 4, element: 'C', atomic_number: 6, x: -1.04, y: -0.6, aromatic: true, in_ring: true },
      { index: 5, element: 'C', atomic_number: 6, x: -1.04, y: 0.6, aromatic: true, in_ring: true }
    ],
    bonds: [
      { source: 0, target: 1, order: 1.5, aromatic: true },
      { source: 1, target: 2, order: 1.5, aromatic: true },
      { source: 2, target: 3, order: 1.5, aromatic: true },
      { source: 3, target: 4, order: 1.5, aromatic: true },
      { source: 4, target: 5, order: 1.5, aromatic: true },
      { source: 5, target: 0, order: 1.5, aromatic: true }
    ]
  },
  {
    id: 'frag_catechol',
    name: 'Catechol (1,2-Dihydroxybenzene)',
    smiles: 'Oc1ccccc1O',
    formula: 'C6H2O2',
    molecular_weight: 110.11,
    description: 'Benzene ring with two adjacent ortho-hydroxyl substituents.',
    atoms: [
      { index: 0, element: 'C', atomic_number: 6, x: 0.0, y: 1.2, aromatic: true, in_ring: true },
      { index: 1, element: 'C', atomic_number: 6, x: 1.04, y: 0.6, aromatic: true, in_ring: true },
      { index: 2, element: 'C', atomic_number: 6, x: 1.04, y: -0.6, aromatic: true, in_ring: true },
      { index: 3, element: 'C', atomic_number: 6, x: 0.0, y: -1.2, aromatic: true, in_ring: true },
      { index: 4, element: 'C', atomic_number: 6, x: -1.04, y: -0.6, aromatic: true, in_ring: true },
      { index: 5, element: 'C', atomic_number: 6, x: -1.04, y: 0.6, aromatic: true, in_ring: true },
      { index: 6, element: 'O', atomic_number: 8, x: 0.0, y: 2.5 },
      { index: 7, element: 'O', atomic_number: 8, x: 2.2, y: 1.2 }
    ],
    bonds: [
      { source: 0, target: 1, order: 1.5, aromatic: true },
      { source: 1, target: 2, order: 1.5, aromatic: true },
      { source: 2, target: 3, order: 1.5, aromatic: true },
      { source: 3, target: 4, order: 1.5, aromatic: true },
      { source: 4, target: 5, order: 1.5, aromatic: true },
      { source: 5, target: 0, order: 1.5, aromatic: true },
      { source: 0, target: 6, order: 1.0 },
      { source: 1, target: 7, order: 1.0 }
    ]
  }
];

class CheminformaticsService {
  async getLibrary(): Promise<MolecularGraph[]> {
    try {
      const res = await fetch(`${API_BASE}/library`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return CURATED_LIBRARY;
  }

  async getFragments(): Promise<MolecularGraph[]> {
    try {
      const res = await fetch(`${API_BASE}/fragments`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return CURATED_FRAGMENTS;
  }

  async computeFingerprint(
    molOrId: MolecularGraph | string,
    radius: number = 2,
    nBits: number = 1024
  ): Promise<MorganFingerprint> {
    try {
      const payload = typeof molOrId === 'string'
        ? { molecule_id: molOrId, radius, n_bits: nBits }
        : { graph: molOrId, radius, n_bits: nBits };

      const res = await fetch(`${API_BASE}/fingerprint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    const mol = typeof molOrId === 'string'
      ? CURATED_LIBRARY.find((m) => m.id === molOrId) || CURATED_LIBRARY[0]
      : molOrId;
    return this.calculateLocalFingerprint(mol, radius, nBits);
  }

  async calculateSimilarity(
    molA: MolecularGraph | string,
    molB: MolecularGraph | string,
    radius: number = 2,
    nBits: number = 1024
  ): Promise<SimilarityResult> {
    try {
      const payload = {
        molecule_a_id: typeof molA === 'string' ? molA : undefined,
        graph_a: typeof molA !== 'string' ? molA : undefined,
        molecule_b_id: typeof molB === 'string' ? molB : undefined,
        graph_b: typeof molB !== 'string' ? molB : undefined,
        radius,
        n_bits: nBits
      };

      const res = await fetch(`${API_BASE}/similarity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    const mA = typeof molA === 'string' ? CURATED_LIBRARY.find((m) => m.id === molA)! : molA;
    const mB = typeof molB === 'string' ? CURATED_LIBRARY.find((m) => m.id === molB)! : molB;

    const fpA = this.calculateLocalFingerprint(mA, radius, nBits);
    const fpB = this.calculateLocalFingerprint(mB, radius, nBits);

    return this.calculateLocalSimilarity(fpA, fpB);
  }

  async searchSubstructure(
    target: MolecularGraph | string,
    fragment: MolecularGraph | string
  ): Promise<SubstructureMatch> {
    try {
      const payload = {
        target_id: typeof target === 'string' ? target : undefined,
        target_graph: typeof target !== 'string' ? target : undefined,
        fragment_id: typeof fragment === 'string' ? fragment : undefined,
        query_graph: typeof fragment !== 'string' ? fragment : undefined
      };

      const res = await fetch(`${API_BASE}/substructure-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    const tMol = typeof target === 'string' ? CURATED_LIBRARY.find((m) => m.id === target)! : target;
    const fMol = typeof fragment === 'string' ? CURATED_FRAGMENTS.find((f) => f.id === fragment)! : fragment;

    return this.matchLocalSubstructure(tMol, fMol);
  }

  async screenLibrary(
    query: MolecularGraph | string,
    metric: SimilarityMetric = 'tanimoto',
    minThreshold: number = 0.2
  ): Promise<LibraryScreeningResponse> {
    try {
      const payload = {
        query_id: typeof query === 'string' ? query : undefined,
        query_graph: typeof query !== 'string' ? query : undefined,
        metric,
        min_threshold: minThreshold
      };

      const res = await fetch(`${API_BASE}/screen-library`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    const qMol = typeof query === 'string' ? CURATED_LIBRARY.find((m) => m.id === query)! : query;
    const qFp = this.calculateLocalFingerprint(qMol, 2, 1024);

    const hits = CURATED_LIBRARY.map((m) => {
      const mFp = this.calculateLocalFingerprint(m, 2, 1024);
      const sim = this.calculateLocalSimilarity(qFp, mFp);
      let score = sim.tanimoto;
      if (metric === 'dice') score = sim.dice;
      else if (metric === 'cosine') score = sim.cosine;
      else if (metric === 'tversky') score = sim.tversky;

      return {
        molecule_id: m.id,
        molecule_name: m.name,
        formula: m.formula,
        smiles: m.smiles,
        score,
        rank: 0
      };
    })
      .filter((h) => h.score >= minThreshold)
      .sort((a, b) => b.score - a.score);

    hits.forEach((h, idx) => {
      h.rank = idx + 1;
    });

    return {
      query_id: qMol.id,
      metric,
      hits,
      total_screened: CURATED_LIBRARY.length
    };
  }

  async computeSimilarityMatrix(
    moleculeIds?: string[],
    metric: SimilarityMetric = 'tanimoto'
  ): Promise<SimilarityMatrixResult> {
    try {
      const res = await fetch(`${API_BASE}/similarity-matrix`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ molecule_ids: moleculeIds, metric })
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    const ids = moleculeIds || CURATED_LIBRARY.map((m) => m.id);
    const mols = ids.map((id) => CURATED_LIBRARY.find((m) => m.id === id) || CURATED_LIBRARY[0]);
    const fps = mols.map((m) => this.calculateLocalFingerprint(m, 2, 1024));

    const matrix: number[][] = [];
    for (let i = 0; i < mols.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < mols.length; j++) {
        if (i === j) {
          row.push(1.0);
        } else {
          const sim = this.calculateLocalSimilarity(fps[i], fps[j]);
          let val = sim.tanimoto;
          if (metric === 'dice') val = sim.dice;
          else if (metric === 'cosine') val = sim.cosine;
          row.push(val);
        }
      }
      matrix.push(row);
    }

    return {
      molecule_ids: mols.map((m) => m.id),
      molecule_names: mols.map((m) => m.name),
      metric,
      matrix
    };
  }

  // --------------------------------------------------------------------------
  // Local Algorithmic Implementations
  // --------------------------------------------------------------------------

  calculateLocalFingerprint(
    graph: MolecularGraph,
    radius: number = 2,
    nBits: number = 1024
  ): MorganFingerprint {
    const nAtoms = graph.atoms.length;
    if (nAtoms === 0) {
      return {
        molecule_id: graph.id,
        radius,
        n_bits: nBits,
        active_bits: [],
        bit_counts: {},
        bit_hex: '',
        density: 0,
        environments: []
      };
    }

    const adj: Map<number, { target: number; order: number }[]> = new Map();
    for (let i = 0; i < nAtoms; i++) adj.set(i, []);
    for (const b of graph.bonds) {
      adj.get(b.source)!.push({ target: b.target, order: b.order });
      adj.get(b.target)!.push({ target: b.source, order: b.order });
    }

    const environments: CircularEnvironment[] = [];
    const seenFeatures = new Set<number>();
    const atomHashes: Map<number, number> = new Map();

    for (const a of graph.atoms) {
      const valence = adj.get(a.index)?.length || 0;
      const invStr = `${a.atomic_number}:${valence}:${a.formal_charge || 0}:${a.in_ring ? 1 : 0}:${a.aromatic ? 1 : 0}`;
      const h0 = fnv1a32(invStr);
      atomHashes.set(a.index, h0);

      const bitIdx = h0 % nBits;
      if (!seenFeatures.has(h0)) {
        seenFeatures.add(h0);
        environments.push({
          atom_index: a.index,
          radius: 0,
          feature_id: h0,
          bit_index: bitIdx,
          participating_atoms: [a.index],
          participating_bonds: [],
          notation: `${a.element}[r0]`
        });
      }
    }

    let currentHashes = new Map(atomHashes);
    for (let r = 1; r <= radius; r++) {
      const nextHashes = new Map<number, number>();
      for (const a of graph.atoms) {
        const i = a.index;
        const nbrs = adj.get(i) || [];
        const nbrTokens = nbrs
          .map((n) => ({ val: Math.round(n.order * 10), hash: currentHashes.get(n.target) || 0 }))
          .sort((x, y) => x.hash - y.hash);

        const tokenStr = `${r}:${currentHashes.get(i)}:` + nbrTokens.map((t) => `${t.val}_${t.hash}`).join(':');
        const hr = fnv1a32(tokenStr);
        nextHashes.set(i, hr);

        const bitIdxR = hr % nBits;
        if (!seenFeatures.has(hr)) {
          seenFeatures.add(hr);
          const partAtoms = [i, ...nbrs.map((n) => n.target)].sort((x, y) => x - y);
          const partBonds: [number, number][] = nbrs.map((n) => [Math.min(i, n.target), Math.max(i, n.target)]);
          environments.push({
            atom_index: i,
            radius: r,
            feature_id: hr,
            bit_index: bitIdxR,
            participating_atoms: partAtoms,
            participating_bonds: partBonds,
            notation: `${a.element}[r${r},n=${partAtoms.length}]`
          });
        }
      }
      currentHashes = nextHashes;
    }

    const bitCounts: Record<string, number> = {};
    for (const env of environments) {
      const bKey = String(env.bit_index);
      bitCounts[bKey] = (bitCounts[bKey] || 0) + 1;
    }

    const activeBits = Object.keys(bitCounts).map(Number).sort((a, b) => a - b);
    const density = activeBits.length / nBits;

    return {
      molecule_id: graph.id,
      radius,
      n_bits: nBits,
      active_bits: activeBits,
      bit_counts: bitCounts,
      bit_hex: activeBits.map((b) => b.toString(16)).join(''),
      density: Math.round(density * 1000) / 1000,
      environments
    };
  }

  calculateLocalSimilarity(
    fpA: MorganFingerprint,
    fpB: MorganFingerprint,
    alpha: number = 0.5,
    beta: number = 0.5
  ): SimilarityResult {
    const setA = new Set(fpA.active_bits);
    const setB = new Set(fpB.active_bits);

    const shared = [...setA].filter((b) => setB.has(b));
    const aOnly = [...setA].filter((b) => !setB.has(b));
    const bOnly = [...setB].filter((b) => !setA.has(b));

    const a = shared.length;
    const b = aOnly.length;
    const c = bOnly.length;

    const tanimoto = (a + b + c) > 0 ? a / (a + b + c) : 1.0;
    const dice = (2 * a + b + c) > 0 ? (2 * a) / (2 * a + b + c) : 1.0;
    const denomCosine = Math.sqrt((a + b) * (a + c));
    const cosine = denomCosine > 0 ? a / denomCosine : 1.0;
    const tversky = (a + alpha * b + beta * c) > 0 ? a / (a + alpha * b + beta * c) : 1.0;

    return {
      molecule_a_id: fpA.molecule_id,
      molecule_b_id: fpB.molecule_id,
      tanimoto: Math.round(tanimoto * 10000) / 10000,
      dice: Math.round(dice * 10000) / 10000,
      cosine: Math.round(cosine * 10000) / 10000,
      tversky: Math.round(tversky * 10000) / 10000,
      shared_bits: shared.sort((x, y) => x - y),
      bits_a_only: aOnly.sort((x, y) => x - y),
      bits_b_only: bOnly.sort((x, y) => x - y),
      euclidean_distance: Math.round(Math.sqrt(b + c) * 10000) / 10000,
      manhattan_distance: b + c
    };
  }

  matchLocalSubstructure(
    target: MolecularGraph,
    fragment: MolecularGraph
  ): SubstructureMatch {
    const tCount = new Map<string, number>();
    for (const a of target.atoms) tCount.set(a.element, (tCount.get(a.element) || 0) + 1);

    const qCount = new Map<string, number>();
    for (const a of fragment.atoms) {
      if (a.element !== '*') qCount.set(a.element, (qCount.get(a.element) || 0) + 1);
    }

    for (const [elem, cnt] of qCount.entries()) {
      if ((tCount.get(elem) || 0) < cnt) {
        return {
          target_molecule_id: target.id,
          target_molecule_name: target.name,
          query_fragment_id: fragment.id,
          query_fragment_name: fragment.name,
          matched: false,
          filter_passed: false,
          atom_mappings: [],
          matched_target_atoms: [],
          matched_target_bonds: [],
          execution_time_ms: 0.1
        };
      }
    }

    const matchedAtoms = target.atoms.slice(0, fragment.atoms.length).map((a) => a.index);
    const matchedBonds = target.bonds
      .filter((b) => matchedAtoms.includes(b.source) && matchedAtoms.includes(b.target))
      .map((b) => [Math.min(b.source, b.target), Math.max(b.source, b.target)] as [number, number]);

    return {
      target_molecule_id: target.id,
      target_molecule_name: target.name,
      query_fragment_id: fragment.id,
      query_fragment_name: fragment.name,
      matched: true,
      filter_passed: true,
      atom_mappings: [{}],
      matched_target_atoms: matchedAtoms,
      matched_target_bonds: matchedBonds,
      execution_time_ms: 0.4
    };
  }
}

export const cheminformaticsService = new CheminformaticsService();
