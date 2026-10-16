/**
 * Virtual Chemistry Laboratory Simulation Service.
 * Connects to /api/v1/chemistry/lab with full local calculation fallback.
 */
import { apiClient } from './api';

export interface TitrationCurvePointDto {
  volume_ml: number;
  ph: number;
  dp_h_dv: number;
  conductivity_ms_cm: number;
  temperature_c: number;
  indicator_color: string;
}

export interface TitrationSimulateParams {
  system_type?: string;
  analyte_volume_ml?: number;
  analyte_conc_m?: number;
  titrant_conc_m?: number;
  max_titrant_volume_ml?: number;
  volume_step_ml?: number;
  indicator?: string;
}

export interface TitrationSimulateResult {
  system_type: string;
  analyte_name: string;
  analyte_formula: string;
  analyte_volume_ml: number;
  analyte_conc_m: number;
  titrant_name: string;
  titrant_formula: string;
  titrant_conc_m: number;
  equivalence_volume_ml: number;
  equivalence_ph: number;
  half_equivalence_volume_ml?: number | null;
  pka?: number | null;
  indicator: string;
  curve_points: TitrationCurvePointDto[];
  indicator_transitions: Array<{ indicator: string; range: string; color_change: string }>;
}

export interface CalorimetryCurvePointDto {
  time_seconds: number;
  temperature_c: number;
}

export interface CalorimetrySimulateParams {
  calorimeter_type?: 'solution_coffee_cup' | 'constant_volume_bomb';
  sample_key: string;
  sample_mass_g: number;
  water_mass_g?: number;
  initial_temp_c?: number;
  calorimeter_c_j_k?: number;
  ambient_temp_c?: number;
}

export interface CalorimetrySimulateResult {
  calorimeter_type: string;
  sample_name: string;
  sample_formula: string;
  sample_mass_g: number;
  sample_moles: number;
  water_mass_g: number;
  calorimeter_c_j_k: number;
  initial_temp_c: number;
  peak_temp_c: number;
  delta_t_c: number;
  heat_transferred_joules: number;
  molar_enthalpy_kj_mol: number;
  theoretical_enthalpy_kj_mol: number;
  percent_error: number;
  is_exothermic: boolean;
  temperature_curve: CalorimetryCurvePointDto[];
  reaction_equation: string;
  analysis_notes: string;
}

export const FALLBACK_SOLUTES_CATALOG = {
  solution_solutes: {
    nh4no3: {
      name: 'Ammonium Nitrate',
      formula: 'NH4NO3',
      molar_mass: 80.043,
      delta_h_soln_kj_mol: 25.7,
      dissolution_equation: 'NH4NO3(s) -> NH4+(aq) + NO3-(aq)',
      safety: 'Endothermic cooling pack standard.',
    },
    cacl2: {
      name: 'Calcium Chloride (Anhydrous)',
      formula: 'CaCl2',
      molar_mass: 110.98,
      delta_h_soln_kj_mol: -82.8,
      dissolution_equation: 'CaCl2(s) -> Ca(2+)(aq) + 2Cl-(aq)',
      safety: 'Strongly exothermic dissolution.',
    },
    naoh: {
      name: 'Sodium Hydroxide Pellets',
      formula: 'NaOH',
      molar_mass: 39.997,
      delta_h_soln_kj_mol: -44.51,
      dissolution_equation: 'NaOH(s) -> Na+(aq) + OH-(aq)',
      safety: 'Caustic alkali dissolution.',
    },
    nacl: {
      name: 'Sodium Chloride',
      formula: 'NaCl',
      molar_mass: 58.443,
      delta_h_soln_kj_mol: 3.88,
      dissolution_equation: 'NaCl(s) -> Na+(aq) + Cl-(aq)',
      safety: 'Mildly endothermic table salt.',
    },
  },
  combustion_standards: {
    benzoic_acid: {
      name: 'Benzoic Acid (Primary Standard)',
      formula: 'C7H6O2',
      molar_mass: 122.12,
      delta_h_comb_kj_mol: -3227.0,
      equation: 'C7H6O2(s) + 7.5 O2(g) -> 7 CO2(g) + 3 H2O(l)',
    },
    sucrose: {
      name: 'Sucrose (Sugar)',
      formula: 'C12H22O11',
      molar_mass: 342.3,
      delta_h_comb_kj_mol: -5645.0,
      equation: 'C12H22O11(s) + 12 O2(g) -> 12 CO2(g) + 11 H2O(l)',
    },
  },
};

export const virtualLabService = {
  /**
   * Run analytical titration curve simulation.
   */
  async simulateTitration(params: TitrationSimulateParams): Promise<TitrationSimulateResult> {
    const sys = params.system_type || 'strong_acid_strong_base';
    const vAna = params.analyte_volume_ml ?? 25.0;
    const cAna = params.analyte_conc_m ?? 0.1;
    const cTit = params.titrant_conc_m ?? 0.1;
    const ind = params.indicator ?? 'Phenolphthalein';

    const vEq = Number(((cAna * vAna) / cTit).toFixed(2));
    const isWeak = sys.includes('weak');
    const halfEq = isWeak ? Number((vEq / 2).toFixed(2)) : null;
    const pKa = sys === 'weak_acid_strong_base' ? 4.76 : null;

    // Fallback deterministic curve
    const fallbackCurve: TitrationCurvePointDto[] = [];
    const step = 0.5;
    for (let v = 0; v <= 50.0; v += step) {
      const vR = Number(v.toFixed(2));
      let ph = 7.0;
      let cond = 15.0;

      if (sys === 'weak_acid_strong_base') {
        if (vR <= 0.01) {
          ph = 2.88;
          cond = 6.0;
        } else if (vR < vEq) {
          const ratio = (vR * cTit) / Math.max(0.001, vAna * cAna - vR * cTit);
          ph = Number((4.76 + Math.log10(ratio)).toFixed(2));
          cond = 6.0 + (vR / vEq) * 8.0;
        } else if (Math.abs(vR - vEq) <= 0.05) {
          ph = 8.72;
          cond = 14.5;
        } else {
          const excessOH = (vR * cTit - vAna * cAna) / ((vAna + vR) / 1000);
          ph = Number((14 + Math.log10(Math.max(1e-12, excessOH))).toFixed(2));
          cond = 14.5 + ((vR - vEq) / vEq) * 16.0;
        }
      } else {
        // Strong acid strong base
        if (vR < vEq - 0.05) {
          const excessH = (vAna * cAna - vR * cTit) / ((vAna + vR) / 1000);
          ph = Number((-Math.log10(Math.max(1e-12, excessH))).toFixed(2));
          cond = 35.0 - (vR / vEq) * 22.0;
        } else if (Math.abs(vR - vEq) <= 0.05) {
          ph = 7.0;
          cond = 13.0;
        } else {
          const excessOH = (vR * cTit - vAna * cAna) / ((vAna + vR) / 1000);
          ph = Number((14 + Math.log10(Math.max(1e-12, excessOH))).toFixed(2));
          cond = 13.0 + ((vR - vEq) / vEq) * 18.0;
        }
      }

      ph = Math.max(0, Math.min(14, ph));
      const color =
        ph < 8.2
          ? 'rgba(240, 249, 255, 0.4)'
          : ph <= 10.0
          ? 'rgba(244, 114, 182, 0.5)'
          : 'rgba(219, 39, 119, 0.85)';

      fallbackCurve.push({
        volume_ml: vR,
        ph: Number(ph.toFixed(2)),
        dp_h_dv: Math.abs(vR - vEq) < 0.6 ? 28.5 : 0.8,
        conductivity_ms_cm: Number(cond.toFixed(1)),
        temperature_c: 25.0 + Math.min(3.0, (vR / vEq) * 2.5),
        indicator_color: color,
      });
    }

    const fallback: TitrationSimulateResult = {
      system_type: sys,
      analyte_name: sys === 'weak_acid_strong_base' ? 'Acetic Acid' : 'Hydrochloric Acid',
      analyte_formula: sys === 'weak_acid_strong_base' ? 'CH3COOH' : 'HCl',
      analyte_volume_ml: vAna,
      analyte_conc_m: cAna,
      titrant_name: 'Sodium Hydroxide',
      titrant_formula: 'NaOH',
      titrant_conc_m: cTit,
      equivalence_volume_ml: vEq,
      equivalence_ph: sys === 'weak_acid_strong_base' ? 8.72 : 7.0,
      half_equivalence_volume_ml: halfEq,
      pka: pKa,
      indicator: ind,
      curve_points: fallbackCurve,
      indicator_transitions: [
        { indicator: 'Phenolphthalein', range: 'pH 8.2 - 10.0', color_change: 'Colorless -> Pink' },
        { indicator: 'Bromothymol Blue', range: 'pH 6.0 - 7.6', color_change: 'Yellow -> Green -> Blue' },
      ],
    };

    const res = await apiClient.post<TitrationSimulateParams, TitrationSimulateResult>(
      '/chemistry/lab/titration-simulate',
      params,
      fallback
    );
    return res.data;
  },

  /**
   * Run calorimeter simulation (solution dissolution or bomb combustion).
   */
  async simulateCalorimetry(params: CalorimetrySimulateParams): Promise<CalorimetrySimulateResult> {
    const isBomb = params.calorimeter_type === 'constant_volume_bomb';
    const sampleKey = params.sample_key || (isBomb ? 'benzoic_acid' : 'nh4no3');
    const mSample = params.sample_mass_g || (isBomb ? 1.0 : 5.0);
    const mWater = params.water_mass_g ?? 100.0;
    const tInit = params.initial_temp_c ?? 25.0;
    const cCal = params.calorimeter_c_j_k ?? (isBomb ? 10250.0 : 25.0);

    // Compute deterministic fallback
    let molarMass = 80.043;
    let theoDh = 25.7;
    let formula = 'NH4NO3';
    let name = 'Ammonium Nitrate';
    let equation = 'NH4NO3(s) -> NH4+(aq) + NO3-(aq)';

    if (isBomb) {
      molarMass = 122.12;
      theoDh = -3227.0;
      formula = 'C7H6O2';
      name = 'Benzoic Acid';
      equation = 'C7H6O2(s) + 7.5 O2(g) -> 7 CO2(g) + 3 H2O(l)';
    } else if (sampleKey === 'cacl2') {
      molarMass = 110.98;
      theoDh = -82.8;
      formula = 'CaCl2';
      name = 'Calcium Chloride';
      equation = 'CaCl2(s) -> Ca(2+)(aq) + 2Cl-(aq)';
    } else if (sampleKey === 'naoh') {
      molarMass = 39.997;
      theoDh = -44.51;
      formula = 'NaOH';
      name = 'Sodium Hydroxide';
      equation = 'NaOH(s) -> Na+(aq) + OH-(aq)';
    }

    const moles = mSample / molarMass;
    const effectiveC = isBomb ? cCal : (mWater + mSample) * 4.184 + cCal;
    const qCalJoules = -moles * theoDh * 1000.0;
    const deltaT = qCalJoules / effectiveC;
    const tPeak = tInit + deltaT;

    const curve: CalorimetryCurvePointDto[] = [];
    for (let t = 0; t <= 120; t += 2) {
      let temp = tInit;
      if (t > 10 && t <= 30) {
        const prog = (t - 10) / 20.0;
        temp = tInit + deltaT * (0.5 - 0.5 * Math.cos(Math.PI * prog));
      } else if (t > 30) {
        temp = tInit + (tPeak - tInit) * Math.exp(-0.005 * (t - 30));
      }
      curve.push({ time_seconds: t, temperature_c: Number(temp.toFixed(2)) });
    }

    const fallback: CalorimetrySimulateResult = {
      calorimeter_type: params.calorimeter_type || 'solution_coffee_cup',
      sample_name: name,
      sample_formula: formula,
      sample_mass_g: mSample,
      sample_moles: Number(moles.toFixed(5)),
      water_mass_g: mWater,
      calorimeter_c_j_k: Number(effectiveC.toFixed(2)),
      initial_temp_c: tInit,
      peak_temp_c: Number(tPeak.toFixed(2)),
      delta_t_c: Number(deltaT.toFixed(2)),
      heat_transferred_joules: Number(qCalJoules.toFixed(2)),
      molar_enthalpy_kj_mol: Number(theoDh.toFixed(2)),
      theoretical_enthalpy_kj_mol: theoDh,
      percent_error: 0.0,
      is_exothermic: theoDh < 0,
      temperature_curve: curve,
      reaction_equation: equation,
      analysis_notes: `Measured thermal shift of ${deltaT.toFixed(2)} °C for ${mSample.toFixed(2)} g ${formula}.`,
    };

    const res = await apiClient.post<CalorimetrySimulateParams, CalorimetrySimulateResult>(
      '/chemistry/lab/calorimetry-simulate',
      params,
      fallback
    );
    return res.data;
  },
};
