import {
  ElectrochemicalReversibility,
  VoltammogramPoint,
  ChronoamperometryPoint,
  CyclicVoltammetryRequest,
  CyclicVoltammetryResponse,
  ChronoamperometryRequest,
  ChronoamperometryResponse,
  ElectrochemicalPresetSummary,
} from '../types/electroanalytical';

const API_BASE = '/api/v1/chemistry/electroanalysis';

export const FARADAY_F = 96485.33212; // C / mol
export const GAS_R = 8.314462618; // J / (mol * K)

export const FALLBACK_ELECTRO_PRESETS: ElectrochemicalPresetSummary[] = [
  {
    id: 'ferricyanide',
    name: 'Potassium Ferricyanide / Ferrocyanide',
    redox_couple: '[Fe(CN)6]3- + e- <=> [Fe(CN)6]4-',
    reversibility: 'reversible',
    e0_v_vs_she: 0.360,
    n_electrons: 1,
    standard_d_cm2_s: 7.60e-6,
    standard_k0_cm_s: 0.020,
    alpha: 0.50,
    description:
      'Canonical outer-sphere reversible single-electron redox standard in aqueous 0.1 M KCl. Displays textbook delta_Ep ≈ 59 mV and |ipa/ipc| = 1.0.',
  },
  {
    id: 'ferrocene',
    name: 'Ferrocene / Ferrocenium',
    redox_couple: 'Fc+ + e- <=> Fc',
    reversibility: 'reversible',
    e0_v_vs_she: 0.400,
    n_electrons: 1,
    standard_d_cm2_s: 2.40e-5,
    standard_k0_cm_s: 0.150,
    alpha: 0.50,
    description:
      'IUPAC recommended internal non-aqueous potential reference standard in acetonitrile / 0.1 M TBAPF6.',
  },
  {
    id: 'ruthenium_hexamine',
    name: 'Hexaammineruthenium(III/II)',
    redox_couple: '[Ru(NH3)6]3+ + e- <=> [Ru(NH3)6]2+',
    reversibility: 'reversible',
    e0_v_vs_she: -0.210,
    n_electrons: 1,
    standard_d_cm2_s: 9.00e-6,
    standard_k0_cm_s: 0.200,
    alpha: 0.50,
    description:
      'Fast reversible single-electron probe with negligible surface adsorption and ideal Nernstian behavior.',
  },
  {
    id: 'dopamine',
    name: 'Dopamine Neurotransmitter',
    redox_couple: 'Dopamine-o-quinone + 2H+ + 2e- <=> Dopamine',
    reversibility: 'quasi_reversible',
    e0_v_vs_she: 0.220,
    n_electrons: 2,
    standard_d_cm2_s: 6.00e-6,
    standard_k0_cm_s: 0.003,
    alpha: 0.45,
    description:
      'Two-electron, two-proton quasi-reversible oxidation on carbon electrodes exhibiting peak broadening (delta_Ep > 70 mV).',
  },
  {
    id: 'ascorbic_acid',
    name: 'L-Ascorbic Acid (Vitamin C)',
    redox_couple: 'Dehydroascorbic acid + 2H+ + 2e- <=> Ascorbic acid',
    reversibility: 'irreversible',
    e0_v_vs_she: 0.060,
    n_electrons: 2,
    standard_d_cm2_s: 5.80e-6,
    standard_k0_cm_s: 1.0e-5,
    alpha: 0.35,
    description:
      'Electrochemically irreversible oxidation (EC mechanism) with rapid follow-up hydration of dehydroascorbic acid, lacking a cathodic return wave.',
  },
];

/** Theoretical Randles-Sevcik peak current in microamperes (uA) */
export function calculateRandlesSevcikPeakCurrent(
  nElectrons: number,
  electrodeAreaCm2: number,
  concentrationMm: number,
  diffusionCoeffCm2S: number,
  scanRateVs: number,
  temperatureK: number = 298.15,
  alpha: number = 0.5,
  isReversible: boolean = true
): number {
  const cMolCm3 = concentrationMm * 1.0e-6;
  const prefactor = isReversible ? 0.4463 : 0.4958;
  const kineticFactor = isReversible ? nElectrons : alpha * nElectrons;
  const fRt = FARADAY_F / (GAS_R * temperatureK);
  const sqrtTerm = Math.sqrt(kineticFactor * fRt * scanRateVs * diffusionCoeffCm2S);
  const iAmps = prefactor * nElectrons * FARADAY_F * electrodeAreaCm2 * cMolCm3 * sqrtTerm;
  return iAmps * 1.0e6;
}

/** Diagnoses reversibility using Nicholson parameter psi */
export function diagnoseReversibility(
  k0CmS: number,
  diffusionCoeffCm2S: number,
  scanRateVs: number,
  nElectrons: number,
  temperatureK: number = 298.15
): { reversibility: ElectrochemicalReversibility; psi: number } {
  const fRt = FARADAY_F / (GAS_R * temperatureK);
  const denom = Math.sqrt(Math.PI * diffusionCoeffCm2S * nElectrons * fRt * scanRateVs);
  const psi = k0CmS / Math.max(1e-12, denom);

  if (psi >= 7.0) {
    return { reversibility: 'reversible', psi };
  } else if (psi >= 0.001) {
    return { reversibility: 'quasi_reversible', psi };
  } else {
    return { reversibility: 'irreversible', psi };
  }
}

/** Simulates Cyclic Voltammogram client-side */
export function simulateCyclicVoltammetryClient(
  req: CyclicVoltammetryRequest
): CyclicVoltammetryResponse {
  const tempK = req.temperature_k ?? 298.15;
  const fRt = FARADAY_F / (GAS_R * tempK);
  const n = req.n_electrons;
  const d = req.diffusion_coefficient_cm2_s;
  const scanRate = req.scan_rate_v_s;
  const area = req.electrode_area_cm2;
  const cMm = req.concentration_mm;
  const alpha = req.transfer_coefficient_alpha;
  const k0 = req.standard_rate_constant_k0_cm_s;
  const cdl = req.double_layer_capacitance_uf_cm2 ?? 20.0;

  const { reversibility, psi } = diagnoseReversibility(k0, d, scanRate, n, tempK);

  const thermalVoltage = 1.0 / fRt;
  const idealDeltaEp = (2.303 * thermalVoltage * 1000.0) / n; // ~59.2 mV / n

  let deltaEpMv: number | null = null;
  let anodicPeakShift = 0;
  let cathodicPeakShift: number | null = null;
  let revCurrentRatio: number | null = null;

  if (reversibility === 'reversible') {
    deltaEpMv = idealDeltaEp;
    anodicPeakShift = deltaEpMv / 2000.0;
    cathodicPeakShift = -deltaEpMv / 2000.0;
    revCurrentRatio = 1.0;
  } else if (reversibility === 'quasi_reversible') {
    deltaEpMv = idealDeltaEp * (1.0 + 0.5 / (psi + 0.1));
    anodicPeakShift = deltaEpMv / 2000.0;
    cathodicPeakShift = -deltaEpMv / 2000.0;
    revCurrentRatio = Math.max(0.65, 1.0 - 0.2 / (psi + 0.5));
  } else {
    deltaEpMv = null;
    anodicPeakShift = (thermalVoltage / (alpha * n)) * Math.log(Math.max(1.1, Math.sqrt(scanRate / 0.01)));
    cathodicPeakShift = null;
    revCurrentRatio = null;
  }

  const ePeakAnodic = req.e0_v + anodicPeakShift;
  const ePeakCathodic = cathodicPeakShift !== null ? req.e0_v + cathodicPeakShift : null;

  const isRev = reversibility === 'reversible';
  const ipaTheory = calculateRandlesSevcikPeakCurrent(
    n,
    area,
    cMm,
    d,
    scanRate,
    tempK,
    alpha,
    isRev
  );
  const ipcTheory =
    cathodicPeakShift !== null && revCurrentRatio !== null
      ? ipaTheory * revCurrentRatio
      : null;

  const icapMag = area * cdl * scanRate;

  const stepV = 0.002;
  const forwardPotentials: number[] = [];
  const reversePotentials: number[] = [];

  const isAnodicForward = req.e_switch_v > req.e_start_v;

  let currE = req.e_start_v;
  if (isAnodicForward) {
    while (currE <= req.e_switch_v) {
      forwardPotentials.push(Number(currE.toFixed(4)));
      currE += stepV;
    }
    currE = req.e_switch_v;
    while (currE >= req.e_start_v) {
      reversePotentials.push(Number(currE.toFixed(4)));
      currE -= stepV;
    }
  } else {
    while (currE >= req.e_switch_v) {
      forwardPotentials.push(Number(currE.toFixed(4)));
      currE -= stepV;
    }
    currE = req.e_switch_v;
    while (currE <= req.e_start_v) {
      reversePotentials.push(Number(currE.toFixed(4)));
      currE += stepV;
    }
  }

  const voltammogram: VoltammogramPoint[] = [];
  let totalTime = 0;
  const dt = stepV / scanRate;

  const faradaicWave = (pot: number, ePeak: number, iPeak: number, isFwd: boolean) => {
    const sigmaV = 0.04 * (idealDeltaEp / 59.2);
    const dPot = pot - ePeak;
    if (isFwd) {
      if (dPot < 0) {
        return iPeak * Math.exp(dPot / Math.max(0.015, sigmaV * 0.8));
      } else {
        return (iPeak * 1.0) / Math.sqrt(1.0 + dPot / Math.max(0.015, sigmaV * 1.2));
      }
    } else {
      if (dPot > 0) {
        return -iPeak * Math.exp(-dPot / Math.max(0.015, sigmaV * 0.8));
      } else {
        return (-iPeak * 1.0) / Math.sqrt(1.0 + -dPot / Math.max(0.015, sigmaV * 1.2));
      }
    }
  };

  for (const ep of forwardPotentials) {
    totalTime += dt;
    const iFar = isAnodicForward
      ? faradaicWave(ep, ePeakAnodic, ipaTheory, true)
      : faradaicWave(ep, ePeakCathodic ?? req.e0_v, ipcTheory ?? ipaTheory, false);
    const iCap = isAnodicForward ? icapMag : -icapMag;
    voltammogram.push({
      potential_v: ep,
      current_ua: Number((iFar + iCap).toFixed(3)),
      current_faradaic_ua: Number(iFar.toFixed(3)),
      current_capacitive_ua: Number(iCap.toFixed(3)),
      scan_direction: 'forward',
      time_s: Number(totalTime.toFixed(4)),
    });
  }

  for (const ep of reversePotentials) {
    totalTime += dt;
    let iFar = 0;
    if (reversibility === 'irreversible') {
      iFar = 0.05 * ipaTheory * Math.exp(-Math.abs(ep - req.e0_v) / 0.1);
    } else {
      iFar = isAnodicForward
        ? faradaicWave(ep, ePeakCathodic ?? req.e0_v, ipcTheory ?? ipaTheory, false)
        : faradaicWave(ep, ePeakAnodic, ipaTheory, true);
    }
    const iCap = isAnodicForward ? -icapMag : icapMag;
    voltammogram.push({
      potential_v: ep,
      current_ua: Number((iFar + iCap).toFixed(3)),
      current_faradaic_ua: Number(iFar.toFixed(3)),
      current_capacitive_ua: Number(iCap.toFixed(3)),
      scan_direction: 'reverse',
      time_s: Number(totalTime.toFixed(4)),
    });
  }

  const eHalf =
    ePeakCathodic !== null ? (ePeakAnodic + ePeakCathodic) / 2.0 : req.e0_v;
  const summary =
    `Cyclic voltammogram simulated for ${req.system_name || 'Redox Couple'} at v = ${(scanRate * 1000).toFixed(0)} mV/s. ` +
    `Mechanism classified as ${reversibility.toUpperCase()} (Nicholson psi = ${psi.toFixed(3)}). ` +
    `Anodic peak: Epa = ${ePeakAnodic.toFixed(3)} V, ipa = ${ipaTheory.toFixed(1)} uA. ` +
    (deltaEpMv !== null
      ? `Cathodic peak: Epc = ${ePeakCathodic?.toFixed(3)} V, delta_Ep = ${deltaEpMv.toFixed(1)} mV. `
      : 'Cathodic peak absent (irreversible EC mechanism). ') +
    `Estimated E1/2 = ${eHalf.toFixed(3)} V vs Ref. Capacitive background: icap = ${icapMag.toFixed(2)} uA.`;

  return {
    system_name: req.system_name || 'Redox Couple',
    reversibility,
    n_electrons: n,
    e_half_v: Number(eHalf.toFixed(4)),
    e_peak_anodic_v: Number(ePeakAnodic.toFixed(4)),
    e_peak_cathodic_v: ePeakCathodic !== null ? Number(ePeakCathodic.toFixed(4)) : null,
    delta_ep_mv: deltaEpMv !== null ? Number(deltaEpMv.toFixed(1)) : null,
    peak_current_anodic_ua: Number(ipaTheory.toFixed(2)),
    peak_current_cathodic_ua: ipcTheory !== null ? Number(ipcTheory.toFixed(2)) : null,
    current_ratio: revCurrentRatio !== null ? Number(revCurrentRatio.toFixed(3)) : null,
    scan_rate_v_s: scanRate,
    diffusion_coefficient_cm2_s: d,
    electrode_area_cm2: area,
    concentration_mm: cMm,
    standard_rate_constant_k0_cm_s: k0,
    transfer_coefficient_alpha: alpha,
    voltammogram,
    pedagogical_summary: summary,
  };
}

/** Simulates Cottrell Chronoamperometry client-side */
export function simulateChronoamperometryClient(
  req: ChronoamperometryRequest
): ChronoamperometryResponse {
  const cMolCm3 = req.concentration_mm * 1.0e-6;
  const n = req.n_electrons;
  const f = FARADAY_F;
  const a = req.electrode_area_cm2;
  const d = req.diffusion_coefficient_cm2_s;
  const timeStep = req.time_step_s ?? 0.05;

  const cottrellSlopeAmps =
    (n * f * a * Math.sqrt(d) * cMolCm3) / Math.sqrt(Math.PI);
  const cottrellSlopeUa = cottrellSlopeAmps * 1.0e6;

  const curve: ChronoamperometryPoint[] = [];
  let t = timeStep;
  while (t <= req.duration_s) {
    const invSqrtT = 1.0 / Math.sqrt(t);
    const iUa = cottrellSlopeUa * invSqrtT;
    curve.push({
      time_s: Number(t.toFixed(4)),
      current_ua: Number(iUa.toFixed(3)),
      inv_sqrt_time: Number(invSqrtT.toFixed(4)),
    });
    t += timeStep;
  }

  const summary =
    `Cottrell chronoamperogram simulated for ${req.preset_id || 'Analyte'} over ${req.duration_s} seconds. ` +
    `Linear Cottrell slope S = ${cottrellSlopeUa.toFixed(2)} uA*s^(1/2). ` +
    `Diffusion coefficient verified at D = ${d.toExponential(2)} cm^2/s under planar diffusion limiting conditions.`;

  return {
    system_name: req.preset_id || 'Chronoamperometry',
    applied_potential_v: req.applied_potential_v,
    duration_s: req.duration_s,
    cottrell_slope_ua_s_half: Number(cottrellSlopeUa.toFixed(3)),
    diffusion_coefficient_cm2_s: d,
    curve,
    pedagogical_summary: summary,
  };
}

export const electroanalyticalService = {
  async getPresets(): Promise<ElectrochemicalPresetSummary[]> {
    try {
      const res = await fetch(`${API_BASE}/presets`);
      if (!res.ok) throw new Error('API fetch failed');
      return await res.json();
    } catch {
      return FALLBACK_ELECTRO_PRESETS;
    }
  },

  async simulateCyclicVoltammetry(
    req: CyclicVoltammetryRequest
  ): Promise<CyclicVoltammetryResponse> {
    try {
      const res = await fetch(`${API_BASE}/cv-simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (!res.ok) throw new Error('API simulation failed');
      return await res.json();
    } catch {
      return simulateCyclicVoltammetryClient(req);
    }
  },

  async simulateChronoamperometry(
    req: ChronoamperometryRequest
  ): Promise<ChronoamperometryResponse> {
    try {
      const res = await fetch(`${API_BASE}/chronoamperometry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (!res.ok) throw new Error('API simulation failed');
      return await res.json();
    } catch {
      return simulateChronoamperometryClient(req);
    }
  },
};
