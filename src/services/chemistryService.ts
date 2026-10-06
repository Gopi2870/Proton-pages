import { COMPREHENSIVE_ELEMENTS } from '../data/elementsComprehensive';
import { COMPREHENSIVE_REACTIONS } from '../data/reactionsComprehensive';
import { COMPREHENSIVE_MOLECULES } from '../data/moleculesComprehensive';
import { ComprehensiveElement, ComprehensiveReaction, ComprehensiveMolecule } from '../types/comprehensiveChemistry';

export class ComprehensiveChemistryService {
  static getElementByNumber(num: number): ComprehensiveElement | undefined {
    return COMPREHENSIVE_ELEMENTS.find(e => e.number === num);
  }

  static getElementBySymbol(sym: string): ComprehensiveElement | undefined {
    return COMPREHENSIVE_ELEMENTS.find(e => e.symbol.toLowerCase() === sym.toLowerCase());
  }

  static searchReactions(query: string): ComprehensiveReaction[] {
    const q = query.toLowerCase();
    return COMPREHENSIVE_REACTIONS.filter(r => r.title.toLowerCase().includes(q) || r.balancedEquation.toLowerCase().includes(q));
  }

  static getMoleculeById(id: string): ComprehensiveMolecule | undefined {
    return COMPREHENSIVE_MOLECULES.find(m => m.id === id);
  }
}
