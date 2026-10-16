import { describe, it, expect } from 'vitest';
import { ChemicalFormulaValidator } from './chemicalValidators';

describe('ChemicalFormulaValidator', () => {
  describe('parseFormula', () => {
    it('parses simple binary and elemental formulas', () => {
      const h2o = ChemicalFormulaValidator.parseFormula('H2O');
      expect(h2o.isValid).toBe(true);
      expect(h2o.elementCounts).toEqual({ H: 2, O: 1 });
      expect(h2o.totalAtoms).toBe(3);

      const o2 = ChemicalFormulaValidator.parseFormula('O2');
      expect(o2.isValid).toBe(true);
      expect(o2.elementCounts).toEqual({ O: 2 });
    });

    it('correctly handles parentheses and subscripts like Ca(OH)2', () => {
      const caoh2 = ChemicalFormulaValidator.parseFormula('Ca(OH)2');
      expect(caoh2.isValid).toBe(true);
      expect(caoh2.elementCounts).toEqual({ Ca: 1, O: 2, H: 2 });
      expect(caoh2.totalAtoms).toBe(5);
    });

    it('handles nested polyatomic groups like Fe2(SO4)3', () => {
      const fe2so43 = ChemicalFormulaValidator.parseFormula('Fe2(SO4)3');
      expect(fe2so43.isValid).toBe(true);
      expect(fe2so43.elementCounts).toEqual({ Fe: 2, S: 3, O: 12 });
      expect(fe2so43.totalAtoms).toBe(17);
    });

    it('handles coordination complex brackets like [Co(NH3)6]Cl3', () => {
      const complex = ChemicalFormulaValidator.parseFormula('[Co(NH3)6]Cl3');
      expect(complex.isValid).toBe(true);
      expect(complex.elementCounts).toEqual({ Co: 1, N: 6, H: 18, Cl: 3 });
    });

    it('parses hydrates like CuSO4*5H2O and CuSO4·5H2O', () => {
      const hydrateAsterisk = ChemicalFormulaValidator.parseFormula('CuSO4*5H2O');
      expect(hydrateAsterisk.isValid).toBe(true);
      expect(hydrateAsterisk.elementCounts).toEqual({ Cu: 1, S: 1, O: 9, H: 10 });

      const hydrateDot = ChemicalFormulaValidator.parseFormula('CuSO4·5H2O');
      expect(hydrateDot.isValid).toBe(true);
      expect(hydrateDot.elementCounts).toEqual({ Cu: 1, S: 1, O: 9, H: 10 });
    });

    it('gracefully handles empty strings or malformed brackets', () => {
      const empty = ChemicalFormulaValidator.parseFormula('');
      expect(empty.isValid).toBe(false);

      const mismatched = ChemicalFormulaValidator.parseFormula('Ca(OH');
      expect(mismatched.isValid).toBe(false);
      expect(mismatched.errorMessage).toBeDefined();
    });
  });

  describe('validateEquilibriumString', () => {
    it('validates reversible and forward reaction arrows', () => {
      expect(ChemicalFormulaValidator.validateEquilibriumString('2H2 + O2 -> 2H2O')).toBe(true);
      expect(ChemicalFormulaValidator.validateEquilibriumString('N2 + 3H2 <=> 2NH3')).toBe(true);
      expect(ChemicalFormulaValidator.validateEquilibriumString('CH3COOH + H2O ⇌ CH3COO- + H3O+')).toBe(true);
    });

    it('returns false for equations missing reactants or products', () => {
      expect(ChemicalFormulaValidator.validateEquilibriumString('-> 2H2O')).toBe(false);
      expect(ChemicalFormulaValidator.validateEquilibriumString('2H2 + O2 ->')).toBe(false);
      expect(ChemicalFormulaValidator.validateEquilibriumString('Just A String')).toBe(false);
    });
  });
});
