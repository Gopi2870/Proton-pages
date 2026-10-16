/**
 * 2D Chemical Structure Drawing & Graph Algorithm Service
 * Handles bond orders, valence validation, Hill formula calculation,
 * SMILES generation, and template stamp generation.
 */

import {
  CanvasAtom,
  CanvasBond,
  MoleculeGraph,
  StructureValidationReport
} from '../types/structureEditor';

const ATOMIC_DATA: Record<string, { mass: number; normalValence: number; maxValence: number }> = {
  C: { mass: 12.011, normalValence: 4, maxValence: 4 },
  N: { mass: 14.007, normalValence: 3, maxValence: 4 },
  O: { mass: 15.999, normalValence: 2, maxValence: 3 },
  H: { mass: 1.008, normalValence: 1, maxValence: 1 },
  F: { mass: 18.998, normalValence: 1, maxValence: 1 },
  Cl: { mass: 35.45, normalValence: 1, maxValence: 1 },
  Br: { mass: 79.904, normalValence: 1, maxValence: 1 },
  I: { mass: 126.904, normalValence: 1, maxValence: 1 },
  S: { mass: 32.06, normalValence: 2, maxValence: 6 },
  P: { mass: 30.974, normalValence: 3, maxValence: 5 }
};

export class StructureEditorService {
  /**
   * Computes the sum of bond orders connected to a specific atom.
   */
  static getConnectedBondSum(atomId: string, bonds: CanvasBond[]): number {
    return bonds
      .filter((b) => b.atom1Id === atomId || b.atom2Id === atomId)
      .reduce((sum, b) => sum + b.order, 0);
  }

  /**
   * Computes implicit hydrogen count for an atom based on typical octet rules.
   */
  static getImplicitHydrogens(atom: CanvasAtom, bonds: CanvasBond[]): number {
    if (atom.element === 'H') return 0;
    const info = ATOMIC_DATA[atom.element] || { mass: 12.0, normalValence: 4, maxValence: 4 };
    const bondSum = this.getConnectedBondSum(atom.id, bonds);

    // Charge adjustment (e.g. C+ or C- has 3 valence electrons for bonding, N+ has 4)
    let effectiveNormal = info.normalValence;
    if (atom.element === 'N' && atom.charge === 1) effectiveNormal = 4;
    if (atom.element === 'O' && atom.charge === 1) effectiveNormal = 3;
    if (atom.element === 'O' && atom.charge === -1) effectiveNormal = 1;
    if (atom.element === 'C' && Math.abs(atom.charge) === 1) effectiveNormal = 3;

    return Math.max(0, effectiveNormal - bondSum);
  }

  /**
   * Validates structure, checks valence limits, computes Hill formula and molecular weight.
   */
  static validateStructure(graph: MoleculeGraph): StructureValidationReport {
    if (graph.atoms.length === 0) {
      return {
        isValid: true,
        totalAtoms: 0,
        totalBonds: 0,
        formula: '',
        molecularWeight: 0,
        smiles: '',
        valenceWarnings: []
      };
    }

    const valenceWarnings: string[] = [];
    const elementCounts: Record<string, number> = {};
    let molecularWeight = 0;

    for (const atom of graph.atoms) {
      const info = ATOMIC_DATA[atom.element] || { mass: 12.0, normalValence: 4, maxValence: 4 };
      const bondSum = this.getConnectedBondSum(atom.id, graph.bonds);

      // Check max valence overflow
      if (bondSum > info.maxValence) {
        valenceWarnings.push(
          `Atom ${atom.element} (ID: ${atom.id.slice(-4)}) has bond order sum ${bondSum}, which exceeds maximum valence of ${info.maxValence}.`
        );
      }

      // Tally heavy atom
      elementCounts[atom.element] = (elementCounts[atom.element] || 0) + 1;
      molecularWeight += info.mass;

      // Add implicit hydrogens
      const implicitH = this.getImplicitHydrogens(atom, graph.bonds);
      if (implicitH > 0) {
        elementCounts['H'] = (elementCounts['H'] || 0) + implicitH;
        molecularWeight += implicitH * 1.008;
      }
    }

    // Format formula in Hill notation (C first, H second, then alphabetical)
    const formulaParts: string[] = [];
    if (elementCounts['C']) {
      formulaParts.push(`C${elementCounts['C'] > 1 ? elementCounts['C'] : ''}`);
      delete elementCounts['C'];
      if (elementCounts['H']) {
        formulaParts.push(`H${elementCounts['H'] > 1 ? elementCounts['H'] : ''}`);
        delete elementCounts['H'];
      }
    }

    const sortedRemaining = Object.keys(elementCounts).sort();
    for (const el of sortedRemaining) {
      formulaParts.push(`${el}${elementCounts[el] > 1 ? elementCounts[el] : ''}`);
    }

    const formula = formulaParts.join('');
    const smiles = this.generateSmiles(graph);

    return {
      isValid: valenceWarnings.length === 0,
      totalAtoms: graph.atoms.length,
      totalBonds: graph.bonds.length,
      formula,
      molecularWeight: Math.round(molecularWeight * 1000) / 1000,
      smiles,
      valenceWarnings
    };
  }

  /**
   * Generates a simplified canonical SMILES string from the molecular graph.
   */
  static generateSmiles(graph: MoleculeGraph): string {
    if (graph.atoms.length === 0) return '';
    if (graph.atoms.length === 1) {
      const atom = graph.atoms[0];
      return atom.element;
    }

    // Detect if this is a benzene ring (6 carbons in a single cycle with alternating or aromatic bonds)
    if (graph.atoms.length === 6 && graph.bonds.length === 6 && graph.atoms.every((a) => a.element === 'C')) {
      const hasDoubleBonds = graph.bonds.filter((b) => b.order === 2).length === 3;
      const isAromatic = graph.bonds.some((b) => b.isAromatic);
      if (hasDoubleBonds || isAromatic) {
        return 'c1ccccc1';
      }
    }

    // Depth-first traversal for acyclic and small ring structures
    const visited = new Set<string>();
    const ringClosures = new Map<string, number>();
    let ringCounter = 1;
    const pieces: string[] = [];

    const startAtom = graph.atoms[0];

    const traverse = (currentId: string, parentId?: string) => {
      visited.add(currentId);
      const atom = graph.atoms.find((a) => a.id === currentId);
      if (!atom) return;

      pieces.push(atom.element);

      // Find adjacent bonds
      const adjacentBonds = graph.bonds.filter(
        (b) => b.atom1Id === currentId || b.atom2Id === currentId
      );

      for (const bond of adjacentBonds) {
        const neighborId = bond.atom1Id === currentId ? bond.atom2Id : bond.atom1Id;
        if (neighborId === parentId) continue;

        if (visited.has(neighborId)) {
          // Ring closure detected
          if (!ringClosures.has(`${currentId}-${neighborId}`) && !ringClosures.has(`${neighborId}-${currentId}`)) {
            const ringNum = ringCounter++;
            ringClosures.set(`${currentId}-${neighborId}`, ringNum);
            pieces.push(ringNum.toString());
          }
        } else {
          // Bond symbol
          if (bond.order === 2) pieces.push('=');
          if (bond.order === 3) pieces.push('#');
          traverse(neighborId, currentId);
        }
      }
    };

    traverse(startAtom.id);
    return pieces.join('');
  }

  /**
   * Creates a predefined Benzene ring stamp (6 carbon atoms with alternating double bonds).
   */
  static createBenzeneStamp(centerX: number, centerY: number, radius = 50): MoleculeGraph {
    const atoms: CanvasAtom[] = [];
    const bonds: CanvasBond[] = [];
    const idPrefix = `c_${Date.now()}`;

    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 6;
      atoms.push({
        id: `${idPrefix}_${i}`,
        element: 'C',
        x: Math.round(centerX + radius * Math.cos(angle)),
        y: Math.round(centerY + radius * Math.sin(angle)),
        charge: 0
      });
    }

    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      const order = i % 2 === 0 ? 2 : 1;
      bonds.push({
        id: `b_${idPrefix}_${i}`,
        atom1Id: atoms[i].id,
        atom2Id: atoms[next].id,
        order: order as 1 | 2,
        isAromatic: true
      });
    }

    return { atoms, bonds };
  }

  /**
   * Creates a predefined Cyclohexane ring stamp (saturated 6-carbon ring).
   */
  static createCyclohexaneStamp(centerX: number, centerY: number, radius = 50): MoleculeGraph {
    const atoms: CanvasAtom[] = [];
    const bonds: CanvasBond[] = [];
    const idPrefix = `chx_${Date.now()}`;

    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 6;
      atoms.push({
        id: `${idPrefix}_${i}`,
        element: 'C',
        x: Math.round(centerX + radius * Math.cos(angle)),
        y: Math.round(centerY + radius * Math.sin(angle)),
        charge: 0
      });
    }

    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      bonds.push({
        id: `b_${idPrefix}_${i}`,
        atom1Id: atoms[i].id,
        atom2Id: atoms[next].id,
        order: 1
      });
    }

    return { atoms, bonds };
  }

  /**
   * Parses simple linear/branched SMILES strings into a 2D layout graph.
   */
  static importSimpleSmiles(smiles: string, startX = 200, startY = 200, bondLength = 45): MoleculeGraph {
    const clean = smiles.trim();
    if (!clean) return { atoms: [], bonds: [] };

    if (clean === 'c1ccccc1' || clean === 'C1=CC=CC=C1') {
      return this.createBenzeneStamp(startX, startY, bondLength);
    }

    const atoms: CanvasAtom[] = [];
    const bonds: CanvasBond[] = [];
    let currentX = startX;
    let currentY = startY;
    let angle = 0;
    let prevAtom: CanvasAtom | null = null;
    let nextBondOrder: 1 | 2 | 3 = 1;

    let i = 0;
    while (i < clean.length) {
      const ch = clean[i];

      if (ch === '=') {
        nextBondOrder = 2;
        i++;
        continue;
      } else if (ch === '#') {
        nextBondOrder = 3;
        i++;
        continue;
      } else if (/[A-Z]/.test(ch)) {
        let el = ch;
        if (i + 1 < clean.length && /[a-z]/.test(clean[i + 1])) {
          el += clean[i + 1];
          i++;
        }

        const atom: CanvasAtom = {
          id: `atm_${Date.now()}_${atoms.length}`,
          element: el,
          x: Math.round(currentX),
          y: Math.round(currentY),
          charge: 0
        };
        atoms.push(atom);

        if (prevAtom) {
          bonds.push({
            id: `bnd_${Date.now()}_${bonds.length}`,
            atom1Id: prevAtom.id,
            atom2Id: atom.id,
            order: nextBondOrder
          });
          nextBondOrder = 1;
        }

        prevAtom = atom;
        // Alternating zigzag angle for nice 2D projection
        angle = (atoms.length % 2 === 0 ? -1 : 1) * (Math.PI / 6);
        currentX += bondLength * Math.cos(angle);
        currentY += bondLength * Math.sin(angle);
      }
      i++;
    }

    return { atoms, bonds };
  }
}
