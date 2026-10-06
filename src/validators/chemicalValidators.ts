// Chemical Formula and Stoichiometric Validation Utilities

export interface FormulaParseResult {
  isValid: boolean;
  elementCounts: Record<string, number>;
  errorMessage?: string;
}

export class ChemicalFormulaValidator {
  static parseFormula(formula: string): FormulaParseResult {
    const counts: Record<string, number> = {};
    const regex = /([A-Z][a-z]*)(\d*)/g;
    let match: RegExpExecArray | null;
    let totalChars = 0;

    while ((match = regex.exec(formula)) !== null) {
      if (match[0].length === 0) break;
      const element = match[1];
      const count = match[2] ? parseInt(match[2], 10) : 1;
      counts[element] = (counts[element] || 0) + count;
      totalChars += match[0].length;
    }

    if (totalChars !== formula.replace(/[\s()+-]/g, '').length) {
      return {
        isValid: false,
        elementCounts: counts,
        errorMessage: 'Invalid characters or malformed stoichiometry in chemical formula.'
      };
    }

    return {
      isValid: Object.keys(counts).length > 0,
      elementCounts: counts
    };
  }

  static validateEquilibriumString(equation: string): boolean {
    const parts = equation.split(/->|<=>/);
    return parts.length === 2 && parts[0].trim().length > 0 && parts[1].trim().length > 0;
  }
}
