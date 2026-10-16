import { describe, it, expect } from 'vitest';
import { StructureEditorService } from './structureEditorService';
import { MoleculeGraph } from '../types/structureEditor';

describe('StructureEditorService', () => {
  it('validates benzene ring template with correct Hill formula and molecular weight', () => {
    const benzene = StructureEditorService.createBenzeneStamp(250, 250, 50);
    expect(benzene.atoms.length).toBe(6);
    expect(benzene.bonds.length).toBe(6);

    const report = StructureEditorService.validateStructure(benzene);
    expect(report.isValid).toBe(true);
    expect(report.formula).toBe('C6H6');
    // C6H6: 6*12.011 + 6*1.008 = 72.066 + 6.048 = 78.114 g/mol
    expect(report.molecularWeight).toBeCloseTo(78.114, 2);
    expect(report.smiles).toBe('c1ccccc1');
    expect(report.valenceWarnings.length).toBe(0);
  });

  it('validates saturated cyclohexane ring with C6H12 formula', () => {
    const cyclohexane = StructureEditorService.createCyclohexaneStamp(200, 200, 45);
    expect(cyclohexane.atoms.length).toBe(6);
    expect(cyclohexane.bonds.length).toBe(6);

    const report = StructureEditorService.validateStructure(cyclohexane);
    expect(report.isValid).toBe(true);
    expect(report.formula).toBe('C6H12');
    // C6H12: 6*12.011 + 12*1.008 = 72.066 + 12.096 = 84.162 g/mol
    expect(report.molecularWeight).toBeCloseTo(84.162, 2);
    expect(report.valenceWarnings.length).toBe(0);
  });

  it('detects carbon valence overflow (hypervalent carbon with 5 bonds)', () => {
    const graph: MoleculeGraph = {
      atoms: [
        { id: 'c0', element: 'C', x: 100, y: 100, charge: 0 },
        { id: 'h1', element: 'H', x: 100, y: 50, charge: 0 },
        { id: 'h2', element: 'H', x: 150, y: 100, charge: 0 },
        { id: 'h3', element: 'H', x: 100, y: 150, charge: 0 },
        { id: 'h4', element: 'H', x: 50, y: 100, charge: 0 },
        { id: 'h5', element: 'H', x: 135, y: 135, charge: 0 }
      ],
      bonds: [
        { id: 'b1', atom1Id: 'c0', atom2Id: 'h1', order: 1 },
        { id: 'b2', atom1Id: 'c0', atom2Id: 'h2', order: 1 },
        { id: 'b3', atom1Id: 'c0', atom2Id: 'h3', order: 1 },
        { id: 'b4', atom1Id: 'c0', atom2Id: 'h4', order: 1 },
        { id: 'b5', atom1Id: 'c0', atom2Id: 'h5', order: 1 }
      ]
    };

    const report = StructureEditorService.validateStructure(graph);
    expect(report.isValid).toBe(false);
    expect(report.valenceWarnings.length).toBeGreaterThan(0);
    expect(report.valenceWarnings[0]).toContain('exceeds maximum valence of 4');
  });

  it('imports simple linear and double bonded SMILES string into 2D layout', () => {
    // Ethene: C=C
    const ethene = StructureEditorService.importSimpleSmiles('C=C');
    expect(ethene.atoms.length).toBe(2);
    expect(ethene.bonds.length).toBe(1);
    expect(ethene.bonds[0].order).toBe(2);

    const report = StructureEditorService.validateStructure(ethene);
    expect(report.formula).toBe('C2H4');
    expect(report.isValid).toBe(true);
  });
});
