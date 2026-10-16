import { apiClient } from './api';

export interface MixedReagentInput {
  name: string;
  formula: string;
  volume_ml: number;
  concentration_m: number;
  initial_ph?: number;
  temperature_c?: number;
}

export interface PrecipitateProduct {
  formula: string;
  name: string;
  color: string;
  ksp: number;
  mass_precipitated_g: number;
  description: string;
}

export interface GasProduct {
  formula: string;
  name: string;
  volume_liters_stp: number;
  odor: string;
  hazard?: string;
}

export interface MixerSimulationResult {
  total_volume_ml: number;
  final_ph: number;
  final_temperature_c: number;
  delta_temperature_c: number;
  is_exothermic: boolean;
  is_endothermic: boolean;
  precipitates: PrecipitateProduct[];
  gases: GasProduct[];
  balanced_equation?: string;
  net_ionic_equation?: string;
  safety_warnings: string[];
  chemical_explanation: string;
  aqueous_ions_remaining?: Record<string, number>;
}

export class MixerService {
  /**
   * Deterministic client-side fallback computation for offline/standalone execution.
   */
  static computeLocalSimulation(reagents: MixedReagentInput[]): MixerSimulationResult {
    if (!reagents.length) {
      return {
        total_volume_ml: 0,
        final_ph: 7.0,
        final_temperature_c: 25.0,
        delta_temperature_c: 0,
        is_exothermic: false,
        is_endothermic: false,
        precipitates: [],
        gases: [],
        safety_warnings: ['Reaction vessel empty.'],
        chemical_explanation: 'Empty reaction beaker.'
      };
    }

    const totalVolumeMl = reagents.reduce((acc, r) => acc + r.volume_ml, 0);
    const totalVolumeL = totalVolumeMl / 1000.0;

    // Track moles of H+ and OH-
    let molesH = 0;
    let molesOH = 0;
    const precipitates: PrecipitateProduct[] = [];
    const gases: GasProduct[] = [];
    const warnings: string[] = [];

    const normList = reagents.map((r) => ({
      ...r,
      norm: r.formula.replace(/\((aq|s|l|g)\)/gi, '').replace(/\s+/g, '').toLowerCase()
    }));

    for (const r of normList) {
      const volL = r.volume_ml / 1000.0;
      const moles = r.concentration_m * volL;

      if (r.norm === 'hcl' || r.norm === 'hno3') {
        molesH += moles;
      } else if (r.norm === 'h2so4') {
        molesH += moles * 2;
      } else if (r.norm === 'naoh' || r.norm === 'koh') {
        molesOH += moles;
      } else if (r.norm === 'caoh2') {
        molesOH += moles * 2;
      }
    }

    // Neutralization
    const neutralized = Math.min(molesH, molesOH);
    const remainingH = molesH - neutralized;
    const remainingOH = molesOH - neutralized;

    const heatJoules = neutralized * 55840.0;
    const deltaT = totalVolumeMl > 0 ? Number((heatJoules / (totalVolumeMl * 4.184)).toFixed(2)) : 0;
    const finalTemp = Number((25.0 + deltaT).toFixed(2));

    let finalPh = 7.0;
    if (totalVolumeL > 0) {
      if (remainingH > 1e-10) {
        finalPh = Number(Math.max(0, -Math.log10(remainingH / totalVolumeL)).toFixed(2));
      } else if (remainingOH > 1e-10) {
        const poh = -Math.log10(remainingOH / totalVolumeL);
        finalPh = Number(Math.min(14, 14.0 - poh).toFixed(2));
      }
    }

    // Precipitation check
    const hasAg = normList.some((r) => r.norm === 'agno3');
    const hasCl = normList.some((r) => r.norm === 'hcl' || r.norm === 'nacl' || r.norm === 'cacl2');
    const hasK2CrO4 = normList.some((r) => r.norm === 'k2cro4');
    const hasCu = normList.some((r) => r.norm === 'cuso4');
    const hasBase = normList.some((r) => r.norm === 'naoh' || r.norm === 'koh');
    const hasCarbonate = normList.some((r) => r.norm === 'na2co3' || r.norm === 'nahco3');

    if (hasAg && hasCl) {
      precipitates.push({
        formula: 'AgCl(s)',
        name: 'Silver Chloride',
        color: 'Curdy white',
        ksp: 1.77e-10,
        mass_precipitated_g: 0.143,
        description: 'Forms a dense, curdy white precipitate insoluble in dilute nitric acid.'
      });
    }

    if (hasAg && hasK2CrO4) {
      precipitates.push({
        formula: 'Ag2CrO4(s)',
        name: 'Silver Chromate',
        color: 'Brick red',
        ksp: 1.12e-12,
        mass_precipitated_g: 0.332,
        description: 'Distinctive brick-red precipitate used as Mohr indicator.'
      });
    }

    if (hasCu && hasBase) {
      precipitates.push({
        formula: 'Cu(OH)2(s)',
        name: 'Copper(II) Hydroxide',
        color: 'Pale blue',
        ksp: 2.2e-20,
        mass_precipitated_g: 0.098,
        description: 'Pale sky-blue gelatinous precipitate.'
      });
    }

    // Gas evolution
    if (hasCarbonate && molesH > 0) {
      gases.push({
        formula: 'CO2(g)',
        name: 'Carbon Dioxide Gas',
        volume_liters_stp: 0.224,
        odor: 'Odorless, vigorous effervescence',
        hazard: 'Asphyxiant at elevated concentrations in poorly ventilated areas.'
      });
    }

    // Safety warnings
    if (finalPh < 2.0) {
      warnings.push('STRONG ACID WARNING (pH < 2): Highly corrosive solution.');
    } else if (finalPh > 12.0) {
      warnings.push('STRONG BASE WARNING (pH > 12): Severe caustic chemical burn hazard.');
    }
    if (deltaT >= 4.0) {
      warnings.push(`EXOTHERMIC REACTION: Thermal shift of +${deltaT} °C observed.`);
    }

    const netIonic = [
      neutralized > 0 ? 'H+(aq) + OH-(aq) -> H2O(l)' : null,
      hasAg && hasCl ? 'Ag+(aq) + Cl-(aq) -> AgCl(s)' : null,
      hasCarbonate && molesH > 0 ? 'CO3^2-(aq) + 2H+(aq) -> H2O(l) + CO2(g)' : null
    ].filter(Boolean).join(' ; ') || 'No net ionic transformation.';

    return {
      total_volume_ml: totalVolumeMl,
      final_ph: finalPh,
      final_temperature_c: finalTemp,
      delta_temperature_c: deltaT,
      is_exothermic: deltaT > 0,
      is_endothermic: deltaT < 0,
      precipitates,
      gases,
      net_ionic_equation: netIonic,
      safety_warnings: warnings,
      chemical_explanation: `Aqueous mixture of ${reagents.length} species. Calculated equilibrium pH is ${finalPh}. Net thermal shift is +${deltaT} °C.`
    };
  }

  static async simulate(reagents: MixedReagentInput[]): Promise<MixerSimulationResult> {
    const fallback = this.computeLocalSimulation(reagents);
    try {
      const res = await apiClient.post<{ reagents: MixedReagentInput[] }, MixerSimulationResult>(
        '/chemistry/mixer/simulate',
        { reagents },
        fallback
      );
      return res.data;
    } catch {
      return fallback;
    }
  }
}
