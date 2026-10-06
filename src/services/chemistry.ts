import { apiClient } from './api';
import { ChemicalElement, MoleculeData, ElementCategory } from '../types/chemistry';
import { PERIODIC_TABLE_ELEMENTS } from '../data/periodicTableData';
import { MOLECULES_DATA } from '../data/moleculesData';

export const chemistryService = {
  async getAllElements(): Promise<ChemicalElement[]> {
    const res = await apiClient.get<ChemicalElement[]>('/chemistry/elements', PERIODIC_TABLE_ELEMENTS);
    return res.data;
  },

  async getElementByNumber(atomicNumber: number): Promise<ChemicalElement | undefined> {
    const elements = await this.getAllElements();
    return elements.find((e) => e.number === atomicNumber);
  },

  async searchElements(query: string, category?: ElementCategory | 'all'): Promise<ChemicalElement[]> {
    const elements = await this.getAllElements();
    const cleanQuery = query.toLowerCase().trim();

    return elements.filter((el) => {
      const matchesCategory = !category || category === 'all' || el.category === category;
      const matchesQuery =
        !cleanQuery ||
        el.name.toLowerCase().includes(cleanQuery) ||
        el.symbol.toLowerCase().includes(cleanQuery) ||
        el.number.toString() === cleanQuery ||
        el.summary.toLowerCase().includes(cleanQuery);
      return matchesCategory && matchesQuery;
    });
  },

  async getAllMolecules(): Promise<MoleculeData[]> {
    const res = await apiClient.get<MoleculeData[]>('/chemistry/molecules', MOLECULES_DATA);
    return res.data;
  },

  async getMoleculeById(id: string): Promise<MoleculeData | undefined> {
    const molecules = await this.getAllMolecules();
    return molecules.find((m) => m.id === id);
  },

  async searchMolecules(query: string): Promise<MoleculeData[]> {
    const molecules = await this.getAllMolecules();
    const clean = query.toLowerCase().trim();
    if (!clean) return molecules;
    return molecules.filter(
      (m) =>
        m.name.toLowerCase().includes(clean) ||
        m.formula.toLowerCase().includes(clean) ||
        m.smiles.toLowerCase().includes(clean) ||
        m.category.toLowerCase().includes(clean)
    );
  }
};
