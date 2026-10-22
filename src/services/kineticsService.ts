/**
 * Reaction Kinetics & Catalytic Dynamics Frontend Client.
 * Connects to /api/v1/chemistry/kinetics endpoints with deterministic offline fallbacks.
 */
import {
  RateLawSimulationResult,
  ArrheniusResult,
  MichaelisMentenResult,
  ConsecutiveKineticsResult,
  PresetKineticsReaction,
} from '../types/kinetics';

const API_BASE = (import.meta.env?.VITE_API_URL || 'http://localhost:8000') + '/api/v1/chemistry/kinetics';

export const FALLBACK_PRESET_REACTIONS: PresetKineticsReaction[] = [
  {
    id: 'h2o2_decomp',
    name: 'Hydrogen Peroxide Decomposition (2H2O2 -> 2H2O + O2)',
    order: 1,
    typical_k: 0.05,
    k_units: 's⁻¹',
    ea_kj_mol: 75.0,
    description: 'First-order disproportionation reaction with constant half-life.',
  },
  {
    id: 'ester_saponification',
    name: 'Alkaline Ester Saponification (CH3COOC2H5 + OH- -> CH3COO- + C2H5OH)',
    order: 2,
    typical_k: 0.11,
    k_units: 'M⁻¹ s⁻¹',
    ea_kj_mol: 48.2,
    description: 'Bimolecular nucleophilic acyl substitution following second-order kinetics.',
  },
  {
    id: 'surface_nh3_decomp',
    name: 'Tungsten Surface Ammonia Decomposition (2NH3 -> N2 + 3H2)',
    order: 0,
    typical_k: 0.002,
    k_units: 'M s⁻¹',
    ea_kj_mol: 163.0,
    description: 'Zero-order heterogeneous catalytic cracking with saturated binding sites.',
  },
  {
    id: 'catalase_enzyme',
    name: 'Catalase Peroxidase System (Enzyme Catalysis)',
    is_enzyme: true,
    v_max: 250.0,
    k_m: 25.0,
    description: 'Ultra-fast biological catalyst converting H2O2 into water and oxygen.',
  },
];

export const KineticsService = {
  /**
   * Fetch benchmark preset reactions.
   */
  async getPresetReactions(): Promise<PresetKineticsReaction[]> {
    try {
      const res = await fetch(`${API_BASE}/reactions`);
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }
    return FALLBACK_PRESET_REACTIONS;
  },

  /**
   * Simulate zero, first, or second order integrated rate law.
   */
  async simulateRateLaw(
    reactionName: string,
    order: number,
    initialConcM: number,
    rateConstantK: number,
    totalTimeSeconds: number = 100.0,
    timeSteps: number = 50
  ): Promise<RateLawSimulationResult> {
    try {
      const res = await fetch(`${API_BASE}/rate-law/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reaction_name: reactionName,
          order,
          initial_conc_m: initialConcM,
          rate_constant_k: rateConstantK,
          total_time_seconds: totalTimeSeconds,
          time_steps: timeSteps,
        }),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    // Offline analytical calculation
    const dt = totalTimeSeconds / timeSteps;
    const timeSeries = [];
    let kUnits = 'M·s⁻¹';
    let diffEq = '-d[A]/dt = k';
    let intEq = '[A]t = [A]0 - k·t';
    let halfLife = initialConcM / (2 * rateConstantK);

    if (order === 0) {
      for (let i = 0; i <= timeSteps; i++) {
        const t = i * dt;
        const c = Math.max(0, initialConcM - rateConstantK * t);
        timeSeries.push({
          time_seconds: Math.round(t * 100) / 100,
          concentration_m: Math.round(c * 100000) / 100000,
          rate_m_s: c > 0 ? rateConstantK : 0,
          ln_conc: c > 0 ? Math.round(Math.log(c) * 10000) / 10000 : undefined,
          inv_conc: c > 0 ? Math.round((1 / c) * 100) / 100 : undefined,
        });
      }
    } else if (order === 1) {
      kUnits = 's⁻¹';
      diffEq = '-d[A]/dt = k·[A]';
      intEq = '[A]t = [A]0 · exp(-k·t)';
      halfLife = Math.LN2 / rateConstantK;
      for (let i = 0; i <= timeSteps; i++) {
        const t = i * dt;
        const c = initialConcM * Math.exp(-rateConstantK * t);
        timeSeries.push({
          time_seconds: Math.round(t * 100) / 100,
          concentration_m: Math.round(c * 100000) / 100000,
          rate_m_s: Math.round(rateConstantK * c * 1000000) / 1000000,
          ln_conc: Math.round(Math.log(c) * 10000) / 10000,
          inv_conc: Math.round((1 / c) * 100) / 100,
        });
      }
    } else {
      kUnits = 'M⁻¹·s⁻¹';
      diffEq = '-d[A]/dt = k·[A]²';
      intEq = '1/[A]t = 1/[A]0 + k·t';
      halfLife = 1 / (rateConstantK * initialConcM);
      for (let i = 0; i <= timeSteps; i++) {
        const t = i * dt;
        const c = initialConcM / (1 + rateConstantK * initialConcM * t);
        timeSeries.push({
          time_seconds: Math.round(t * 100) / 100,
          concentration_m: Math.round(c * 100000) / 100000,
          rate_m_s: Math.round(rateConstantK * c * c * 1000000) / 1000000,
          ln_conc: Math.round(Math.log(c) * 10000) / 10000,
          inv_conc: Math.round((1 / c) * 100) / 100,
        });
      }
    }

    return {
      reaction_name: reactionName,
      order,
      initial_conc_m: initialConcM,
      rate_constant_k: rateConstantK,
      k_units: kUnits,
      half_life_seconds: Math.round(halfLife * 1000) / 1000,
      differential_rate_equation: diffEq,
      integrated_rate_equation: intEq,
      time_series: timeSeries,
      notes: `Order ${order} reaction progress modeled analytically.`,
    };
  },

  /**
   * Solve Arrhenius activation energy from two experimental temperatures.
   */
  async calculateArrhenius(
    t1C: number,
    k1: number,
    t2C: number,
    k2: number,
    targetTC?: number
  ): Promise<ArrheniusResult> {
    try {
      const res = await fetch(`${API_BASE}/arrhenius/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          t1_c: t1C,
          k1,
          t2_c: t2C,
          k2,
          target_t_c: targetTC,
        }),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    const t1K = t1C + 273.15;
    const t2K = t2C + 273.15;
    const deltaInvT = 1 / t2K - 1 / t1K;
    const eaJ = (-8.314462618 * Math.log(k2 / k1)) / deltaInvT;
    const aFactor = k1 * Math.exp(eaJ / (8.314462618 * t1K));

    let predK = undefined;
    if (targetTC !== undefined) {
      predK = aFactor * Math.exp(-eaJ / (8.314462618 * (targetTC + 273.15)));
    }

    return {
      activation_energy_j_mol: Math.round(eaJ * 100) / 100,
      activation_energy_kj_mol: Math.round((eaJ / 1000) * 100) / 100,
      pre_exponential_factor_a: aFactor,
      target_temperature_c: targetTC,
      predicted_k_at_target: predK,
      equation: `k(T) = ${aFactor.toExponential(2)} × exp(-${(eaJ / 1000).toFixed(1)} kJ/mol / RT)`,
      temp_curve: [
        { temp_c: 20, temp_k: 293.15, rate_constant_k: k1 },
        { temp_c: 40, temp_k: 313.15, rate_constant_k: k2 },
      ],
    };
  },

  /**
   * Simulate Michaelis-Menten enzyme kinetics.
   */
  async simulateMichaelisMenten(
    enzymeName: string,
    vMax: number,
    kM: number,
    inhibitionType?: string,
    inhibitorConcUm: number = 0,
    kIUm: number = 1.0,
    maxSubstrateUm: number = 100.0,
    steps: number = 30
  ): Promise<MichaelisMentenResult> {
    try {
      const res = await fetch(`${API_BASE}/michaelis-menten/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enzyme_name: enzymeName,
          v_max: vMax,
          k_m: kM,
          inhibition_type: inhibitionType,
          inhibitor_conc_um: inhibitorConcUm,
          k_i_um: kIUm,
          max_substrate_um: maxSubstrateUm,
          steps,
        }),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    let alpha = 1.0;
    let alphaPrime = 1.0;
    if (inhibitionType && inhibitorConcUm > 0 && kIUm > 0) {
      const ratio = inhibitorConcUm / kIUm;
      if (inhibitionType === 'competitive') alpha = 1.0 + ratio;
      else if (inhibitionType === 'uncompetitive') alphaPrime = 1.0 + ratio;
      else if (inhibitionType === 'noncompetitive') {
        alpha = 1.0 + ratio;
        alphaPrime = 1.0 + ratio;
      }
    }

    const appVmax = vMax / alphaPrime;
    const appKm = (kM * alpha) / alphaPrime;
    const points = [];
    const ds = maxSubstrateUm / steps;

    for (let i = 1; i <= steps; i++) {
      const s = i * ds;
      const v = (appVmax * s) / (appKm + s);
      points.push({
        substrate_conc_um: Math.round(s * 100) / 100,
        velocity_um_s: Math.round(v * 10000) / 10000,
        inv_substrate: Math.round((1 / s) * 100000) / 100000,
        inv_velocity: Math.round((1 / v) * 100000) / 100000,
      });
    }

    return {
      enzyme_name: enzymeName,
      v_max: vMax,
      k_m: kM,
      inhibition_type: inhibitionType,
      inhibitor_conc_um: inhibitorConcUm,
      k_i_um: kIUm,
      apparent_v_max: Math.round(appVmax * 10000) / 10000,
      apparent_k_m: Math.round(appKm * 10000) / 10000,
      lineweaver_burk_slope: Math.round((appKm / appVmax) * 100000) / 100000,
      lineweaver_burk_intercept: Math.round((1 / appVmax) * 100000) / 100000,
      saturation_points: points,
    };
  },

  /**
   * Simulate consecutive reaction dynamics A -> B -> C.
   */
  async simulateConsecutive(
    initialAM: number,
    k1: number,
    k2: number,
    totalTimeSeconds: number = 60.0,
    steps: number = 60
  ): Promise<ConsecutiveKineticsResult> {
    try {
      const res = await fetch(`${API_BASE}/consecutive/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initial_a_m: initialAM,
          k1,
          k2,
          total_time_seconds: totalTimeSeconds,
          steps,
        }),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    const tMax = Math.log(k1 / k2) / (k1 - k2);
    const bMax = initialAM * Math.pow(k2 / k1, k2 / (k1 - k2));
    const dt = totalTimeSeconds / steps;
    const points = [];

    for (let i = 0; i <= steps; i++) {
      const t = i * dt;
      const cA = initialAM * Math.exp(-k1 * t);
      const cB = initialAM * (k1 / (k2 - k1)) * (Math.exp(-k1 * t) - Math.exp(-k2 * t));
      const cC = initialAM * (1 - (k2 * Math.exp(-k1 * t) - k1 * Math.exp(-k2 * t)) / (k2 - k1));
      points.push({
        time_seconds: Math.round(t * 100) / 100,
        conc_a: Math.round(cA * 100000) / 100000,
        conc_b: Math.round(cB * 100000) / 100000,
        conc_c: Math.round(cC * 100000) / 100000,
      });
    }

    return {
      initial_a_m: initialAM,
      k1,
      k2,
      t_max_intermediate_seconds: Math.round(tMax * 1000) / 1000,
      max_intermediate_conc_m: Math.round(bMax * 100000) / 100000,
      time_series: points,
      description: `Sequential reaction A -> B -> C with intermediate [B] peaking at t = ${tMax.toFixed(2)} s.`,
    };
  },
};
