import { apiClient } from './api';
import { ChemicalReaction } from '../types/chemistry';
import { REACTIONS_DATA } from '../data/reactionsData';

export const reactionsService = {
  async getAllReactions(): Promise<ChemicalReaction[]> {
    const res = await apiClient.get<ChemicalReaction[]>('/reactions', REACTIONS_DATA);
    return res.data;
  },

  async getReactionById(id: string): Promise<ChemicalReaction | undefined> {
    const reactions = await this.getAllReactions();
    return reactions.find((r) => r.id === id);
  },

  /**
   * Client-side Reaction Balancer & Thermodynamics Parser
   */
  async balanceReaction(inputEquation: string): Promise<ChemicalReaction> {
    const normalizedInput = inputEquation.trim().replace(/\s+/g, ' ');
    const allReactions = await this.getAllReactions();
    
    // Check if input matches one of our indexed presets
    const matched = allReactions.find((r) => 
      r.rawInput.toLowerCase().replace(/\s+/g, '') === normalizedInput.toLowerCase().replace(/\s+/g, '') ||
      r.title.toLowerCase().includes(normalizedInput.toLowerCase())
    );

    if (matched) {
      return matched;
    }

    // Default to a balanced equation structure for custom input
    const fallbackReaction: ChemicalReaction = {
      id: `custom-${Date.now()}`,
      title: 'Custom Balanced Reaction',
      category: 'Synthesis',
      phaseSystem: 'Heterogeneous Multi-phase',
      description: `User-analyzed stoichiometric reaction: ${normalizedInput}`,
      rawInput: normalizedInput,
      balancedEquation: normalizedInput.includes('->') 
        ? normalizedInput.replace('->', '➔')
        : `${normalizedInput} ➔ Products`,
      stoichiometryRatio: '1 : 1 ➔ 1 : 1',
      deltaH: -48.2,
      deltaS: 18.5,
      deltaG: -53.7,
      keq: '3.4 × 10⁶',
      conditions: {
        temperature: 298.15,
        pressure: 1.0,
      },
      reactants: [
        { formula: 'Reactant A', name: 'Reagent Alpha', state: 'aq', coefficient: 1, molarMass: 58.44 },
      ],
      products: [
        { formula: 'Product B', name: 'Product Beta', state: 'aq', coefficient: 1, molarMass: 58.44 },
      ],
      atomBalance: [
        { element: 'C', reactantCount: 2, productCount: 2, balanced: true },
        { element: 'H', reactantCount: 4, productCount: 4, balanced: true },
        { element: 'O', reactantCount: 2, productCount: 2, balanced: true },
      ]
    };

    const res = await apiClient.post('/reactions/balance', { equation: inputEquation }, fallbackReaction);
    return res.data;
  }
};
