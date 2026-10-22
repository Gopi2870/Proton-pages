/**
 * Surface Chemistry, Heterogeneous Catalysis & Langmuir-BET Adsorption Service.
 * Dual-layer architecture: FastAPI client with client-side fallback simulation.
 */

import {
  MaterialSummary,
  AdsorbentMaterial,
  BetCalculationRequest,
  BetCalculationResponse,
  IsothermComparisonResponse,
  CatalysisSimulationRequest,
  CatalysisSimulationResponse,
} from '../types/surfaceChemistry';

const API_BASE = '/api/v1/chemistry/surface-chemistry';
const AVOGADRO_CONSTANT = 6.02214076e23;
const MOLAR_VOLUME_STP_CM3 = 22414.0;

export const FALLBACK_MATERIALS: Record<string, AdsorbentMaterial> = {
  mcm_41: {
    id: 'mcm_41',
    name: 'MCM-41 Ordered Mesoporous Silica',
    material_type: 'mesoporous_silica',
    description: 'Well-ordered hexagonal cylindrical mesopore channels (~3.5 nm). Typical IUPAC Type IV isotherm with steep capillary condensation step.',
    literature_bet_surface_area_m2_g: 985.0,
    monolayer_volume_cm3_g: 226.0,
    c_constant: 85.0,
    isotherm_type: 'Type IV',
    sample_points: [
      { relative_pressure: 0.01, volume_adsorbed_cm3_g: 62.0 },
      { relative_pressure: 0.05, volume_adsorbed_cm3_g: 135.0 },
      { relative_pressure: 0.10, volume_adsorbed_cm3_g: 178.0 },
      { relative_pressure: 0.15, volume_adsorbed_cm3_g: 205.0 },
      { relative_pressure: 0.20, volume_adsorbed_cm3_g: 228.0 },
      { relative_pressure: 0.25, volume_adsorbed_cm3_g: 252.0 },
      { relative_pressure: 0.30, volume_adsorbed_cm3_g: 276.0 },
      { relative_pressure: 0.35, volume_adsorbed_cm3_g: 305.0 },
      { relative_pressure: 0.42, volume_adsorbed_cm3_g: 410.0 },
      { relative_pressure: 0.50, volume_adsorbed_cm3_g: 480.0 },
      { relative_pressure: 0.65, volume_adsorbed_cm3_g: 505.0 },
      { relative_pressure: 0.80, volume_adsorbed_cm3_g: 520.0 },
    ],
  },
  activated_carbon: {
    id: 'activated_carbon',
    name: 'BPL Commercial Activated Carbon',
    material_type: 'activated_carbon',
    description: 'Highly microporous carbonaceous adsorbent. Characterized by IUPAC Type I isotherm with rapid uptake at low relative pressure.',
    literature_bet_surface_area_m2_g: 1150.0,
    monolayer_volume_cm3_g: 264.0,
    c_constant: 120.0,
    isotherm_type: 'Type I',
    sample_points: [
      { relative_pressure: 0.01, volume_adsorbed_cm3_g: 145.0 },
      { relative_pressure: 0.05, volume_adsorbed_cm3_g: 210.0 },
      { relative_pressure: 0.10, volume_adsorbed_cm3_g: 245.0 },
      { relative_pressure: 0.15, volume_adsorbed_cm3_g: 268.0 },
      { relative_pressure: 0.20, volume_adsorbed_cm3_g: 285.0 },
      { relative_pressure: 0.25, volume_adsorbed_cm3_g: 298.0 },
      { relative_pressure: 0.30, volume_adsorbed_cm3_g: 310.0 },
      { relative_pressure: 0.35, volume_adsorbed_cm3_g: 320.0 },
      { relative_pressure: 0.50, volume_adsorbed_cm3_g: 345.0 },
      { relative_pressure: 0.70, volume_adsorbed_cm3_g: 370.0 },
      { relative_pressure: 0.90, volume_adsorbed_cm3_g: 415.0 },
    ],
  },
  zeolite_zsm5: {
    id: 'zeolite_zsm5',
    name: 'Zeolite ZSM-5 (MFI Framework)',
    material_type: 'zeolite',
    description: 'Shape-selective crystalline aluminosilicate with 10-membered ring channels (~0.55 nm). Steep Type I micropore filling.',
    literature_bet_surface_area_m2_g: 425.0,
    monolayer_volume_cm3_g: 97.5,
    c_constant: 150.0,
    isotherm_type: 'Type I',
    sample_points: [
      { relative_pressure: 0.01, volume_adsorbed_cm3_g: 75.0 },
      { relative_pressure: 0.05, volume_adsorbed_cm3_g: 92.0 },
      { relative_pressure: 0.10, volume_adsorbed_cm3_g: 102.0 },
      { relative_pressure: 0.15, volume_adsorbed_cm3_g: 108.0 },
      { relative_pressure: 0.20, volume_adsorbed_cm3_g: 112.0 },
      { relative_pressure: 0.25, volume_adsorbed_cm3_g: 115.0 },
      { relative_pressure: 0.30, volume_adsorbed_cm3_g: 118.0 },
      { relative_pressure: 0.50, volume_adsorbed_cm3_g: 126.0 },
      { relative_pressure: 0.80, volume_adsorbed_cm3_g: 138.0 },
    ],
  },
  gamma_alumina: {
    id: 'gamma_alumina',
    name: 'Gamma-Alumina Catalyst Support (γ-Al2O3)',
    material_type: 'metal_oxide',
    description: 'High-temperature transition alumina with defective spinel lattice. Broad mesopores delivering moderate surface area.',
    literature_bet_surface_area_m2_g: 210.0,
    monolayer_volume_cm3_g: 48.2,
    c_constant: 65.0,
    isotherm_type: 'Type IV',
    sample_points: [
      { relative_pressure: 0.02, volume_adsorbed_cm3_g: 18.0 },
      { relative_pressure: 0.06, volume_adsorbed_cm3_g: 32.0 },
      { relative_pressure: 0.12, volume_adsorbed_cm3_g: 45.0 },
      { relative_pressure: 0.18, volume_adsorbed_cm3_g: 54.0 },
      { relative_pressure: 0.25, volume_adsorbed_cm3_g: 62.0 },
      { relative_pressure: 0.32, volume_adsorbed_cm3_g: 71.0 },
      { relative_pressure: 0.45, volume_adsorbed_cm3_g: 88.0 },
      { relative_pressure: 0.60, volume_adsorbed_cm3_g: 110.0 },
      { relative_pressure: 0.75, volume_adsorbed_cm3_g: 135.0 },
      { relative_pressure: 0.90, volume_adsorbed_cm3_g: 170.0 },
    ],
  },
};

export function linearRegression(
  xVals: number[],
  yVals: number[]
): { slope: number; intercept: number; rSquared: number } {
  const n = xVals.length;
  if (n < 2) return { slope: 0, intercept: 0, rSquared: 0 };

  const meanX = xVals.reduce((a, b) => a + b, 0) / n;
  const meanY = yVals.reduce((a, b) => a + b, 0) / n;

  let ssXy = 0;
  let ssXx = 0;
  let ssYy = 0;

  for (let i = 0; i < n; i++) {
    const dx = xVals[i] - meanX;
    const dy = yVals[i] - meanY;
    ssXy += dx * dy;
    ssXx += dx * dx;
    ssYy += dy * dy;
  }

  if (Math.abs(ssXx) < 1e-15) return { slope: 0, intercept: meanY, rSquared: 0 };

  const slope = ssXy / ssXx;
  const intercept = meanY - slope * meanX;
  const rSquared = ssYy > 1e-15 ? Math.min(1.0, Math.max(0.0, (ssXy * ssXy) / (ssXx * ssYy))) : 1.0;

  return { slope, intercept, rSquared };
}

export function calculateBetFallback(request: BetCalculationRequest): BetCalculationResponse {
  let matName = 'Custom Adsorption Sample';
  let isoType = 'Type IV';
  let rawPts = request.sample_points || [];
  const mass = request.sample_mass_g || 1.0;
  const crossSection = request.adsorbate_cross_section_nm2 || 0.162;

  if (request.material_id && FALLBACK_MATERIALS[request.material_id]) {
    const m = FALLBACK_MATERIALS[request.material_id];
    matName = m.name;
    isoType = m.isotherm_type;
    rawPts = m.sample_points;
  }

  const minP = isoType === 'Type I' ? 0.009 : 0.049;
  const maxP = isoType === 'Type I' ? 0.151 : 0.351;

  const betX: number[] = [];
  const betY: number[] = [];
  const plotPoints = [];

  for (const pt of rawPts) {
    const x = pt.relative_pressure;
    const v = pt.volume_adsorbed_cm3_g;
    if (x > 0.001 && x < 0.999 && v > 0) {
      const y = x / (v * (1.0 - x));
      const inRange = x >= minP && x <= maxP;
      if (inRange) {
        betX.push(x);
        betY.push(y);
      }
      plotPoints.push({
        relative_pressure: Number(x.toFixed(4)),
        volume_adsorbed: Number(v.toFixed(2)),
        bet_transform_y: Number(y.toFixed(6)),
        is_in_bet_range: inRange,
      });
    }
  }

  const { slope, intercept, rSquared } = linearRegression(betX, betY);
  const denom = slope + intercept;
  const vm = denom > 1e-12 ? 1.0 / denom : 0.0;
  const cParam = Math.abs(intercept) > 1e-15 ? 1.0 + slope / intercept : 1.0;

  const sigmaM2 = crossSection * 1e-18;
  const sBet = (vm * AVOGADRO_CONSTANT * sigmaM2) / (MOLAR_VOLUME_STP_CM3 * mass);

  const fit = {
    slope: Number(slope.toFixed(6)),
    intercept: Number(intercept.toFixed(6)),
    r_squared: Number(rSquared.toFixed(4)),
    monolayer_capacity_vm: Number(vm.toFixed(2)),
    c_parameter: Number(cParam.toFixed(2)),
    specific_surface_area_m2_g: Number(sBet.toFixed(2)),
    is_c_positive: cParam > 0,
    is_valid_bet_range: betX.length >= 3 && rSquared >= 0.98,
  };

  const summary =
    `Multi-point BET analysis of '${matName}' evaluated over ${betX.length} points in range 0.05-0.35 P/P0. ` +
    `Monolayer capacity V_m = ${fit.monolayer_capacity_vm} cm³(STP)/g, BET C = ${fit.c_parameter.toFixed(1)}, ` +
    `yielding a specific surface area S_BET = ${fit.specific_surface_area_m2_g} m²/g (R² = ${fit.r_squared.toFixed(4)}).`;

  return {
    material_name: matName,
    isotherm_type: isoType,
    sample_mass_g: mass,
    bet_fit: fit,
    linear_plot_points: plotPoints,
    pedagogical_summary: summary,
  };
}

export function compareIsothermsFallback(materialId: string = 'mcm_41'): IsothermComparisonResponse {
  const mat = FALLBACK_MATERIALS[materialId] || FALLBACK_MATERIALS['mcm_41'];
  const rawPts = mat.sample_points;
  const xVals = rawPts.map((p) => p.relative_pressure);
  const vVals = rawPts.map((p) => p.volume_adsorbed_cm3_g);

  // Langmuir fit
  const langX: number[] = [];
  const langY: number[] = [];
  for (let i = 0; i < xVals.length; i++) {
    if (xVals[i] > 0 && vVals[i] > 0) {
      langX.push(xVals[i]);
      langY.push(xVals[i] / vVals[i]);
    }
  }
  const { slope: lSlope, intercept: lInt, rSquared: lR2 } = linearRegression(langX, langY);
  const vmLang = lSlope > 1e-12 ? 1.0 / lSlope : 200.0;
  const kLang = lInt > 1e-12 ? lSlope / lInt : 10.0;

  // Freundlich fit
  const freuX: number[] = [];
  const freuY: number[] = [];
  for (let i = 0; i < xVals.length; i++) {
    if (xVals[i] > 0 && vVals[i] > 0) {
      freuX.push(Math.log(xVals[i]));
      freuY.push(Math.log(vVals[i]));
    }
  }
  const { slope: fSlope, intercept: fInt, rSquared: fR2 } = linearRegression(freuX, freuY);
  const kFreu = fInt < 20 ? Math.exp(fInt) : 100.0;
  const invN = fSlope;

  // BET fit
  const minP = mat.isotherm_type === 'Type I' ? 0.009 : 0.049;
  const maxP = mat.isotherm_type === 'Type I' ? 0.151 : 0.351;
  const betX: number[] = [];
  const betY: number[] = [];
  for (let i = 0; i < xVals.length; i++) {
    if (xVals[i] >= minP && xVals[i] <= maxP && vVals[i] > 0) {
      betX.push(xVals[i]);
      betY.push(xVals[i] / (vVals[i] * (1.0 - xVals[i])));
    }
  }
  const { slope: bSlope, intercept: bInt, rSquared: bR2 } = linearRegression(betX, betY);
  const vmBet = bSlope + bInt > 1e-12 ? 1.0 / (bSlope + bInt) : 200.0;
  const cBet = Math.abs(bInt) > 1e-12 ? 1.0 + bSlope / bInt : 50.0;

  const testPressures = [0.02, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
  const langPred = testPressures.map((x) => ({
    relative_pressure: x,
    volume_pred: Number(((vmLang * kLang * x) / (1.0 + kLang * x)).toFixed(2)),
  }));
  const freuPred = testPressures.map((x) => ({
    relative_pressure: x,
    volume_pred: Number((kFreu * Math.pow(x, invN)).toFixed(2)),
  }));
  const betPred = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35].map((x) => {
    const denom = (1.0 - x) * (1.0 + (cBet - 1.0) * x);
    const predV = Math.abs(denom) > 1e-6 ? (vmBet * cBet * x) / denom : 0.0;
    return { relative_pressure: x, volume_pred: Number(predV.toFixed(2)) };
  });

  const r2Map: Record<string, number> = { Langmuir: lR2, Freundlich: fR2, BET: bR2 };
  const bestModel = Object.keys(r2Map).reduce((a, b) => (r2Map[a] > r2Map[b] ? a : b));

  return {
    material_name: mat.name,
    experimental_points: rawPts.map((p) => ({
      relative_pressure: Number(p.relative_pressure.toFixed(4)),
      volume_adsorbed: Number(p.volume_adsorbed_cm3_g.toFixed(2)),
    })),
    langmuir_fit: {
      model_name: 'Langmuir',
      parameters: { V_m: Number(vmLang.toFixed(2)), K_L: Number(kLang.toFixed(2)) },
      r_squared: Number(lR2.toFixed(4)),
      predicted_points: langPred,
      equation_display: `V = (${vmLang.toFixed(1)} · ${kLang.toFixed(1)} · x) / (1 + ${kLang.toFixed(1)} · x)`,
    },
    freundlich_fit: {
      model_name: 'Freundlich',
      parameters: { K_F: Number(kFreu.toFixed(2)), '1/n': Number(invN.toFixed(4)) },
      r_squared: Number(fR2.toFixed(4)),
      predicted_points: freuPred,
      equation_display: `V = ${kFreu.toFixed(1)} · x^{${invN.toFixed(3)}}`,
    },
    bet_fit: {
      model_name: 'BET',
      parameters: { V_m: Number(vmBet.toFixed(2)), C: Number(cBet.toFixed(2)) },
      r_squared: Number(bR2.toFixed(4)),
      predicted_points: betPred,
      equation_display: `V = (${vmBet.toFixed(1)} · ${cBet.toFixed(1)} · x) / [(1 - x)(1 + ${(cBet - 1).toFixed(1)} · x)]`,
    },
    best_fitting_model: bestModel,
  };
}

export function simulateCatalysisFallback(
  request: CatalysisSimulationRequest
): CatalysisSimulationResponse {
  const k = request.rate_constant_k || 1.5e-3;
  const ka = request.adsorption_constant_ka || 0.08;
  const kb = request.adsorption_constant_kb || 0.02;
  const pb = request.fixed_partial_pressure_b_kpa || 20.0;
  const pMax = request.max_pressure_a_kpa || 100.0;
  const count = request.points_count || 50;

  const dp = pMax / count;
  const points = [];
  let maxLhRate = 0.0;
  let peakPa = 0.0;

  for (let i = 0; i <= count; i++) {
    const pa = i * dp;
    const denom = 1.0 + ka * pa + kb * pb;
    const thetaA = (ka * pa) / denom;
    const thetaB = (kb * pb) / denom;
    const thetaV = 1.0 / denom;

    const rLh = k * thetaA * thetaB;
    const rEr = k * thetaA * pb;

    if (rLh > maxLhRate) {
      maxLhRate = rLh;
      peakPa = pa;
    }

    points.push({
      partial_pressure_a_kpa: Number(pa.toFixed(2)),
      rate_langmuir_hinshelwood: Number(rLh.toFixed(6)),
      rate_eley_rideal: Number(rEr.toFixed(6)),
      coverage_theta_a: Number(thetaA.toFixed(4)),
      coverage_theta_b: Number(thetaB.toFixed(4)),
      fraction_vacant_theta_v: Number(thetaV.toFixed(4)),
    });
  }

  const theoPeak = ka > 0 ? (1.0 + kb * pb) / ka : 0.0;
  const summary =
    `Heterogeneous catalytic simulation for fixed P_B = ${pb} kPa. ` +
    `Langmuir-Hinshelwood dual-site mechanism exhibits a characteristic volcanic peak at ` +
    `P_A ≈ ${theoPeak.toFixed(1)} kPa (maximum rate = ${maxLhRate.toExponential(3)}) due to competitive self-poisoning. ` +
    `Eley-Rideal single-site impact mechanism approaches asymptotic saturation without rate decline.`;

  return {
    kinetics_curve: points,
    lh_peak_pressure_a_kpa: Number(theoPeak.toFixed(2)),
    lh_maximum_rate: Number(maxLhRate.toFixed(6)),
    summary,
  };
}

export const surfaceChemistryService = {
  async getMaterials(): Promise<MaterialSummary[]> {
    try {
      const res = await fetch(`${API_BASE}/materials`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return Object.values(FALLBACK_MATERIALS).map((m) => ({
      id: m.id,
      name: m.name,
      material_type: m.material_type,
      description: m.description,
      isotherm_type: m.isotherm_type,
      literature_bet_surface_area_m2_g: m.literature_bet_surface_area_m2_g,
    }));
  },

  async getMaterialDetail(materialId: string): Promise<AdsorbentMaterial | null> {
    try {
      const res = await fetch(`${API_BASE}/materials/${materialId}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return FALLBACK_MATERIALS[materialId] || null;
  },

  async calculateBet(request: BetCalculationRequest): Promise<BetCalculationResponse> {
    try {
      const res = await fetch(`${API_BASE}/bet-analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return calculateBetFallback(request);
  },

  async compareIsotherms(materialId: string): Promise<IsothermComparisonResponse> {
    try {
      const res = await fetch(`${API_BASE}/isotherm-compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ material_id: materialId }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return compareIsothermsFallback(materialId);
  },

  async simulateCatalysis(request: CatalysisSimulationRequest): Promise<CatalysisSimulationResponse> {
    try {
      const res = await fetch(`${API_BASE}/catalysis-kinetics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return simulateCatalysisFallback(request);
  },
};
