/**
 * 2D Chemical Structure Drawing Canvas Types
 */

export interface CanvasAtom {
  id: string;
  element: string;
  x: number;
  y: number;
  charge: number;
  isotope?: number;
  implicitHydrogens?: number;
}

export interface CanvasBond {
  id: string;
  atom1Id: string;
  atom2Id: string;
  order: 1 | 2 | 3;
  stereo?: 'none' | 'wedge' | 'dash';
  isAromatic?: boolean;
}

export interface MoleculeGraph {
  atoms: CanvasAtom[];
  bonds: CanvasBond[];
}

export interface StructureValidationReport {
  isValid: boolean;
  totalAtoms: number;
  totalBonds: number;
  formula: string;
  molecularWeight: number;
  smiles: string;
  valenceWarnings: string[];
}
