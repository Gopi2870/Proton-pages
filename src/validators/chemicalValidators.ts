// Chemical Formula and Stoichiometric Validation Utilities

export interface FormulaParseResult {
  isValid: boolean;
  elementCounts: Record<string, number>;
  errorMessage?: string;
  totalAtoms?: number;
}

export class ChemicalFormulaValidator {
  /**
   * Deterministic recursive descent parser for chemical formulas.
   * Handles nested parentheses, brackets, hydrates (* or ·), and element counts accurately.
   * Example: Ca(OH)2 -> { Ca: 1, O: 2, H: 2 }
   * Example: Fe2(SO4)3 -> { Fe: 2, S: 3, O: 12 }
   * Example: CuSO4*5H2O -> { Cu: 1, S: 1, O: 9, H: 10 }
   */
  static parseFormula(formulaStr: string): FormulaParseResult {
    const raw = formulaStr.trim();
    if (!raw) {
      return {
        isValid: false,
        elementCounts: {},
        errorMessage: 'Chemical formula cannot be empty.'
      };
    }

    try {
      // Split on hydrate dots if present (e.g., CuSO4*5H2O or CuSO4·5H2O)
      const hydrateParts = raw.split(/[*·•]/);
      const combinedCounts: Record<string, number> = {};

      for (let i = 0; i < hydrateParts.length; i++) {
        let part = hydrateParts[i].trim();
        let hydrateCoefficient = 1;

        if (i > 0) {
          // Check for leading coefficient on hydrate (e.g. 5H2O)
          const coeffMatch = part.match(/^(\d+)(.*)$/);
          if (coeffMatch) {
            hydrateCoefficient = parseInt(coeffMatch[1], 10);
            part = coeffMatch[2].trim();
          }
        }

        const partCounts = this.parseFormulaPart(part);
        for (const [elem, count] of Object.entries(partCounts)) {
          combinedCounts[elem] = (combinedCounts[elem] || 0) + count * hydrateCoefficient;
        }
      }

      const totalAtoms = Object.values(combinedCounts).reduce((acc, c) => acc + c, 0);

      return {
        isValid: Object.keys(combinedCounts).length > 0,
        elementCounts: combinedCounts,
        totalAtoms
      };
    } catch (err: any) {
      return {
        isValid: false,
        elementCounts: {},
        errorMessage: err.message || 'Malformed chemical formula syntax.'
      };
    }
  }

  private static parseFormulaPart(formula: string): Record<string, number> {
    let index = 0;
    const len = formula.length;

    function parseSubGroup(): Record<string, number> {
      const counts: Record<string, number> = {};

      while (index < len) {
        const ch = formula[index];

        if (ch === '(' || ch === '[' || ch === '{') {
          const closingChar = ch === '(' ? ')' : ch === '[' ? ']' : '}';
          index++; // Consume open bracket
          const innerCounts = parseSubGroup();

          if (index >= len || formula[index] !== closingChar) {
            throw new Error(`Mismatched bracket in formula. Expected '${closingChar}'`);
          }
          index++; // Consume closing bracket

          // Parse multiplier after bracket if present
          let multiplier = 1;
          const numMatch = formula.slice(index).match(/^(\d+)/);
          if (numMatch) {
            multiplier = parseInt(numMatch[1], 10);
            index += numMatch[1].length;
          }

          for (const [el, cnt] of Object.entries(innerCounts)) {
            counts[el] = (counts[el] || 0) + cnt * multiplier;
          }
        } else if (ch === ')' || ch === ']' || ch === '}') {
          // Return to caller for closing
          break;
        } else if (/[A-Z]/.test(ch)) {
          // Parse element symbol (1 uppercase followed by optional lowercase letters)
          let symbol = ch;
          index++;
          while (index < len && /[a-z]/.test(formula[index])) {
            symbol += formula[index];
            index++;
          }

          // Parse subscript number
          let count = 1;
          const numMatch = formula.slice(index).match(/^(\d+)/);
          if (numMatch) {
            count = parseInt(numMatch[1], 10);
            index += numMatch[1].length;
          }

          counts[symbol] = (counts[symbol] || 0) + count;
        } else if (ch === '+' || ch === '-' || ch === '^') {
          // Skip charge notation at end of species (e.g., SO4^2- or Fe3+)
          index++;
          while (index < len && /[\d+\-]/.test(formula[index])) {
            index++;
          }
        } else if (/\s/.test(ch)) {
          index++; // Ignore whitespace
        } else {
          throw new Error(`Unexpected character '${ch}' at index ${index} in '${formula}'`);
        }
      }

      return counts;
    }

    return parseSubGroup();
  }

  static validateEquilibriumString(equation: string): boolean {
    const parts = equation.split(/->|<=>|⇌|⇄|=/);
    return parts.length === 2 && parts[0].trim().length > 0 && parts[1].trim().length > 0;
  }
}
