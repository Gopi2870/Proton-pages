/**
 * Electrochemistry and Nernst Equation Client Service.
 * Connects to /api/v1/chemistry/electrochemistry with comprehensive client-side calculation.
 */
import { apiClient } from './api';

export interface StandardReductionPotential {
  half_reaction_str: string;
  oxidized_species: string;
  reduced_species: string;
  electrons: number;
  potential_volts: number;
  state: string;
  description: string;
}

export interface GalvanicCellResult {
  anode_half_reaction: string;
  cathode_half_reaction: string;
  overall_reaction: string;
  cell_notation: string;
  electrons_transferred_n: number;
  standard_potential_volts: number;
  cell_potential_volts: number;
  reaction_quotient_q: number;
  standard_gibbs_free_energy_kj: number;
  equilibrium_constant_k: number;
  is_spontaneous: boolean;
  temperature_kelvin: number;
  nernst_correction_volts: number;
}

export interface ElectrolysisResult {
  species_deposited: string;
  molar_mass_g_mol: number;
  electrons_per_ion_n: number;
  current_amperes: number;
  time_seconds: number;
  total_charge_coulombs: number;
  moles_electrons: number;
  moles_substance: number;
  mass_deposited_grams: number;
  gas_volume_liters_stp?: number;
}

export const FALLBACK_REDUCTION_POTENTIALS: StandardReductionPotential[] = [
  { half_reaction_str: 'F2(g) + 2e- -> 2F-(aq)', oxidized_species: 'F2', reduced_species: 'F-', electrons: 2, potential_volts: 2.87, state: 'aq', description: 'Fluorine reduction' },
  { half_reaction_str: 'Cl2(g) + 2e- -> 2Cl-(aq)', oxidized_species: 'Cl2', reduced_species: 'Cl-', electrons: 2, potential_volts: 1.358, state: 'aq', description: 'Chlorine reduction' },
  { half_reaction_str: 'Ag+(aq) + e- -> Ag(s)', oxidized_species: 'Ag+', reduced_species: 'Ag', electrons: 1, potential_volts: 0.7996, state: 'aq', description: 'Silver(I) reduction' },
  { half_reaction_str: 'Cu(2+)(aq) + 2e- -> Cu(s)', oxidized_species: 'Cu(2+)', reduced_species: 'Cu', electrons: 2, potential_volts: 0.3419, state: 'aq', description: 'Copper(II) reduction' },
  { half_reaction_str: '2H+(aq) + 2e- -> H2(g)', oxidized_species: 'H+', reduced_species: 'H2', electrons: 2, potential_volts: 0.0000, state: 'aq', description: 'SHE Reference' },
  { half_reaction_str: 'Pb(2+)(aq) + 2e- -> Pb(s)', oxidized_species: 'Pb(2+)', reduced_species: 'Pb', electrons: 2, potential_volts: -0.1262, state: 'aq', description: 'Lead(II) reduction' },
  { half_reaction_str: 'Ni(2+)(aq) + 2e- -> Ni(s)', oxidized_species: 'Ni(2+)', reduced_species: 'Ni', electrons: 2, potential_volts: -0.257, state: 'aq', description: 'Nickel(II) reduction' },
  { half_reaction_str: 'Fe(2+)(aq) + 2e- -> Fe(s)', oxidized_species: 'Fe(2+)', reduced_species: 'Fe', electrons: 2, potential_volts: -0.447, state: 'aq', description: 'Iron(II) reduction' },
  { half_reaction_str: 'Zn(2+)(aq) + 2e- -> Zn(s)', oxidized_species: 'Zn(2+)', reduced_species: 'Zn', electrons: 2, potential_volts: -0.7618, state: 'aq', description: 'Zinc(II) reduction' },
  { half_reaction_str: 'Al(3+)(aq) + 3e- -> Al(s)', oxidized_species: 'Al(3+)', reduced_species: 'Al', electrons: 3, potential_volts: -1.662, state: 'aq', description: 'Aluminum(III) reduction' },
  { half_reaction_str: 'Mg(2+)(aq) + 2e- -> Mg(s)', oxidized_species: 'Mg(2+)', reduced_species: 'Mg', electrons: 2, potential_volts: -2.372, state: 'aq', description: 'Magnesium(II) reduction' },
  { half_reaction_str: 'Na+(aq) + e- -> Na(s)', oxidized_species: 'Na+', reduced_species: 'Na', electrons: 1, potential_volts: -2.71, state: 'aq', description: 'Sodium(I) reduction' },
];

export class ElectrochemistryService {
  /**
   * Deterministic client-side Nernst equation computation.
   */
  static calculateLocalGalvanicCell(
    cathodeSpecies: string,
    anodeSpecies: string,
    cathodeMolarity: number = 1.0,
    anodeMolarity: number = 1.0,
    temperatureK: number = 298.15
  ): GalvanicCellResult {
    const cathodePot = cathodeSpecies.includes('Ag') ? 0.80 : 0.3419;
    const anodePot = anodeSpecies.includes('Mg') ? -2.37 : -0.7618;
    const eStandard = cathodePot - anodePot;
    const n = 2;
    const q = anodeMolarity / cathodeMolarity;
    const nernstCorr = (0.05916 / n) * Math.log10(q || 1);
    const eCell = eStandard - nernstCorr;
    const deltaG = -(n * 96485.33 * eStandard) / 1000.0;

    return {
      anode_half_reaction: `${anodeSpecies} + 2e- -> Anode(s)`,
      cathode_half_reaction: `${cathodeSpecies} + 2e- -> Cathode(s)`,
      overall_reaction: `Anode(s) + ${cathodeSpecies} -> Anode(aq) + Cathode(s)`,
      cell_notation: `${anodeSpecies}(s) | ${anodeSpecies}(aq, ${anodeMolarity} M) || ${cathodeSpecies}(aq, ${cathodeMolarity} M) | ${cathodeSpecies}(s)`,
      electrons_transferred_n: n,
      standard_potential_volts: parseFloat(eStandard.toFixed(4)),
      cell_potential_volts: parseFloat(eCell.toFixed(4)),
      reaction_quotient_q: parseFloat(q.toFixed(6)),
      standard_gibbs_free_energy_kj: parseFloat(deltaG.toFixed(2)),
      equilibrium_constant_k: Math.pow(10, (n * eStandard) / 0.05916),
      is_spontaneous: eCell > 0,
      temperature_kelvin: temperatureK,
      nernst_correction_volts: parseFloat(nernstCorr.toFixed(4))
    };
  }

  static async calculateGalvanicCell(
    cathodeSpecies: string,
    anodeSpecies: string,
    cathodeMolarity: number = 1.0,
    anodeMolarity: number = 1.0,
    temperatureK: number = 298.15
  ): Promise<GalvanicCellResult> {
    const fallback = ElectrochemistryService.calculateLocalGalvanicCell(
      cathodeSpecies,
      anodeSpecies,
      cathodeMolarity,
      anodeMolarity,
      temperatureK
    );

    try {
      const res = await apiClient.post<
        {
          cathode_species: string;
          anode_species: string;
          cathode_molarity: number;
          anode_molarity: number;
          temperature_kelvin: number;
        },
        GalvanicCellResult
      >(
        '/chemistry/electrochemistry/cell-potential',
        {
          cathode_species: cathodeSpecies,
          anode_species: anodeSpecies,
          cathode_molarity: cathodeMolarity,
          anode_molarity: anodeMolarity,
          temperature_kelvin: temperatureK
        },
        fallback
      );
      return res.data;
    } catch {
      return fallback;
    }
  }

  static async getReductionPotentials(): Promise<StandardReductionPotential[]> {
    try {
      const res = await apiClient.get<StandardReductionPotential[]>(
        '/chemistry/electrochemistry/reduction-potentials',
        FALLBACK_REDUCTION_POTENTIALS
      );
      return res.data;
    } catch {
      return FALLBACK_REDUCTION_POTENTIALS;
    }
  }

  static calculateLocalElectrolysis(
    species: string,
    molarMass: number,
    n: number,
    currentAmperes: number,
    timeSeconds: number
  ): ElectrolysisResult {
    const totalCharge = currentAmperes * timeSeconds;
    const molesE = totalCharge / 96485.33;
    const molesSub = molesE / n;
    const mass = molesSub * molarMass;
    const isGas = ['h2', 'o2', 'cl2'].includes(species.toLowerCase());

    return {
      species_deposited: species,
      molar_mass_g_mol: molarMass,
      electrons_per_ion_n: n,
      current_amperes: currentAmperes,
      time_seconds: timeSeconds,
      total_charge_coulombs: parseFloat(totalCharge.toFixed(2)),
      moles_electrons: parseFloat(molesE.toFixed(6)),
      moles_substance: parseFloat(molesSub.toFixed(6)),
      mass_deposited_grams: parseFloat(mass.toFixed(4)),
      gas_volume_liters_stp: isGas ? parseFloat((molesSub * 22.414).toFixed(4)) : undefined
    };
  }

  static async calculateElectrolysis(
    species: string,
    molarMass: number,
    n: number,
    currentAmperes: number,
    timeSeconds: number
  ): Promise<ElectrolysisResult> {
    const fallback = ElectrochemistryService.calculateLocalElectrolysis(
      species,
      molarMass,
      n,
      currentAmperes,
      timeSeconds
    );

    try {
      const res = await apiClient.post<
        {
          species: string;
          molar_mass_g_mol: number;
          electrons_per_ion_n: number;
          current_amperes: number;
          time_seconds: number;
        },
        ElectrolysisResult
      >(
        '/chemistry/electrochemistry/electrolysis',
        {
          species,
          molar_mass_g_mol: molarMass,
          electrons_per_ion_n: n,
          current_amperes: currentAmperes,
          time_seconds: timeSeconds
        },
        fallback
      );
      return res.data;
    } catch {
      return fallback;
    }
  }
}
