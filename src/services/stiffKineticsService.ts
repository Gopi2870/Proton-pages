/**
 * Stiff Kinetics Reaction Networks & Stiff ODE Solvers Service.
 * Dual-layer architecture: FastAPI client with client-side Rosenbrock-W fallback.
 */

import {
  KineticSpecies,
  ElementaryReaction,
  KineticsPresetSummary,
  StiffKineticsPresetDetail,
  StiffKineticsSimulationRequest,
  StiffKineticsSimulationResponse,
} from '../types/stiffKinetics';

const API_BASE = '/api/v1/chemistry/stiff-kinetics';

export const FALLBACK_PRESETS: Record<string, StiffKineticsPresetDetail> = {
  robertson_stiff: {
    id: 'robertson_stiff',
    name: 'Robertson Autocatalytic Stiff System (1966)',
    category: 'stiff_benchmark',
    description: 'The classical benchmark for stiff numerical ODE solvers. Rate constants differ by 9 orders of magnitude (k1 = 0.04, k2 = 3e7, k3 = 1e4).',
    species_count: 3,
    reactions_count: 3,
    estimated_stiffness_ratio: 7.5e8,
    default_total_time_s: 100.0,
    total_time_s: 100.0,
    species: [
      { name: 'A', initial_concentration_m: 1.0, color_hex: '#2563EB' },
      { name: 'B', initial_concentration_m: 0.0, color_hex: '#D47942' },
      { name: 'C', initial_concentration_m: 0.0, color_hex: '#059669' },
    ],
    reactions: [
      { id: 'r1', equation_str: 'A -> B', reactants: { A: 1.0 }, products: { B: 1.0 }, rate_constant: 0.04 },
      { id: 'r2', equation_str: '2 B -> B + C', reactants: { B: 2.0 }, products: { B: 1.0, C: 1.0 }, rate_constant: 3.0e7 },
      { id: 'r3', equation_str: 'B + C -> A + C', reactants: { B: 1.0, C: 1.0 }, products: { A: 1.0, C: 1.0 }, rate_constant: 1.0e4 },
    ],
  },
  chapman_ozone: {
    id: 'chapman_ozone',
    name: 'Chapman Photochemical Stratospheric Ozone Cycle',
    category: 'atmospheric',
    description: 'Atmospheric oxygen-ozone cycle driven by solar UV radiation. Fast atomic oxygen radical turnover vs slow catalytic sink.',
    species_count: 3,
    reactions_count: 4,
    estimated_stiffness_ratio: 2.5e8,
    default_total_time_s: 1000.0,
    total_time_s: 1000.0,
    species: [
      { name: 'O2', initial_concentration_m: 0.21, color_hex: '#3B82F6' },
      { name: 'O', initial_concentration_m: 1e-8, color_hex: '#EF4444' },
      { name: 'O3', initial_concentration_m: 1e-6, color_hex: '#8B572A' },
    ],
    reactions: [
      { id: 'r1', equation_str: 'O2 + hv -> 2 O', reactants: { O2: 1.0 }, products: { O: 2.0 }, rate_constant: 2.0e-5 },
      { id: 'r2', equation_str: 'O + O2 -> O3', reactants: { O: 1.0, O2: 1.0 }, products: { O3: 1.0 }, rate_constant: 5.0e3 },
      { id: 'r3', equation_str: 'O3 + hv -> O + O2', reactants: { O3: 1.0 }, products: { O: 1.0, O2: 1.0 }, rate_constant: 1.0e-2 },
      { id: 'r4', equation_str: 'O + O3 -> 2 O2', reactants: { O: 1.0, O3: 1.0 }, products: { O2: 2.0 }, rate_constant: 1.5e2 },
    ],
  },
  oregonator_bz: {
    id: 'oregonator_bz',
    name: 'Field-Noyes Oregonator (Belousov-Zhabotinsky Oscillation)',
    category: 'oscillatory',
    description: 'Reduced five-step kinetic model of the oscillating Belousov-Zhabotinsky reaction (bromate-malonic acid-cerium).',
    species_count: 3,
    reactions_count: 5,
    estimated_stiffness_ratio: 4.0e7,
    default_total_time_s: 60.0,
    total_time_s: 60.0,
    species: [
      { name: 'X', initial_concentration_m: 1e-8, color_hex: '#E11D48' },
      { name: 'Y', initial_concentration_m: 2e-7, color_hex: '#D97706' },
      { name: 'Z', initial_concentration_m: 1e-7, color_hex: '#0D9488' },
    ],
    reactions: [
      { id: 'r1', equation_str: 'Y -> X', reactants: { Y: 1.0 }, products: { X: 1.0 }, rate_constant: 2.0 },
      { id: 'r2', equation_str: 'X + Y -> P', reactants: { X: 1.0, Y: 1.0 }, products: {}, rate_constant: 1.0e6 },
      { id: 'r3', equation_str: 'X -> 2 X + 2 Z', reactants: { X: 1.0 }, products: { X: 2.0, Z: 2.0 }, rate_constant: 10.0 },
      { id: 'r4', equation_str: '2 X -> P', reactants: { X: 2.0 }, products: {}, rate_constant: 4.0e7 },
      { id: 'r5', equation_str: 'Z -> Y', reactants: { Z: 1.0 }, products: { Y: 1.0 }, rate_constant: 1.0 },
    ],
  },
  zeldovich_nox: {
    id: 'zeldovich_nox',
    name: 'Extended Zeldovich Thermal NOx Mechanism (2200 K)',
    category: 'combustion',
    description: 'High-temperature kinetic mechanism for atmospheric nitrogen oxidation during combustion at 2200 K.',
    species_count: 5,
    reactions_count: 3,
    estimated_stiffness_ratio: 1.6e4,
    default_total_time_s: 0.05,
    total_time_s: 0.05,
    species: [
      { name: 'N2', initial_concentration_m: 0.78, color_hex: '#3B82F6' },
      { name: 'O2', initial_concentration_m: 0.05, color_hex: '#10B981' },
      { name: 'O', initial_concentration_m: 1e-4, color_hex: '#EF4444' },
      { name: 'NO', initial_concentration_m: 0.0, color_hex: '#F97316' },
      { name: 'N', initial_concentration_m: 0.0, color_hex: '#8B5CF6' },
    ],
    reactions: [
      { id: 'r1', equation_str: 'O + N2 -> NO + N', reactants: { O: 1.0, N2: 1.0 }, products: { NO: 1.0, N: 1.0 }, rate_constant: 1.8e3 },
      { id: 'r2', equation_str: 'N + O2 -> NO + O', reactants: { N: 1.0, O2: 1.0 }, products: { NO: 1.0, O: 1.0 }, rate_constant: 2.5e6 },
      { id: 'r3', equation_str: 'NO + N -> N2 + O', reactants: { NO: 1.0, N: 1.0 }, products: { N2: 1.0, O: 1.0 }, rate_constant: 3.0e7 },
    ],
  },
};

/**
 * Solves A x = b using Gaussian elimination with partial row pivoting.
 */
export function solveLinearSystem(aMat: number[][], bVec: number[]): number[] {
  const n = bVec.length;
  const a = aMat.map((row) => [...row]);
  const b = [...bVec];

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    let maxVal = Math.abs(a[i][i]);
    for (let r = i + 1; r < n; r++) {
      if (Math.abs(a[r][i]) > maxVal) {
        maxVal = Math.abs(a[r][i]);
        maxRow = r;
      }
    }

    if (maxRow !== i) {
      [a[i], a[maxRow]] = [a[maxRow], a[i]];
      [b[i], b[maxRow]] = [b[maxRow], b[i]];
    }

    let pivot = a[i][i];
    if (Math.abs(pivot) < 1e-14) {
      pivot = pivot >= 0 ? 1e-14 : -1e-14;
    }

    for (let r = i + 1; r < n; r++) {
      const factor = a[r][i] / pivot;
      for (let c = i; c < n; c++) {
        a[r][c] -= factor * a[i][c];
      }
      b[r] -= factor * b[i];
    }
  }

  // Back-substitution
  const x = new Array(n).fill(0.0);
  for (let i = n - 1; i >= 0; i--) {
    let val = b[i];
    for (let c = i + 1; c < n; c++) {
      val -= a[i][c] * x[c];
    }
    const pivot = Math.abs(a[i][i]) > 1e-14 ? a[i][i] : 1e-14;
    x[i] = val / pivot;
  }
  return x;
}

/**
 * Evaluates reaction rate vector F(c) and exact analytic Jacobian J = dF/dc.
 */
export function evaluateDerivatives(
  speciesNames: string[],
  reactions: ElementaryReaction[],
  concentrations: Record<string, number>
): { fVec: number[]; jMat: number[][] } {
  const n = speciesNames.length;
  const idxMap: Record<string, number> = {};
  speciesNames.forEach((name, i) => {
    idxMap[name] = i;
  });

  const fVec = new Array(n).fill(0.0);
  const jMat = Array.from({ length: n }, () => new Array(n).fill(0.0));

  for (const rxn of reactions) {
    let v = rxn.rate_constant;
    for (const [sp, stoich] of Object.entries(rxn.reactants)) {
      const cVal = Math.max(0.0, concentrations[sp] || 0.0);
      v *= Math.pow(cVal, stoich);
    }

    const netStoich: Record<string, number> = {};
    for (const [sp, stoich] of Object.entries(rxn.products)) {
      netStoich[sp] = (netStoich[sp] || 0.0) + stoich;
    }
    for (const [sp, stoich] of Object.entries(rxn.reactants)) {
      netStoich[sp] = (netStoich[sp] || 0.0) - stoich;
    }

    for (const [sp, nu] of Object.entries(netStoich)) {
      if (idxMap[sp] !== undefined) {
        fVec[idxMap[sp]] += nu * v;
      }
    }

    for (const [rSp, rStoich] of Object.entries(rxn.reactants)) {
      if (idxMap[rSp] !== undefined) {
        const kIdx = idxMap[rSp];
        const cK = concentrations[rSp] || 0.0;
        if (cK > 1e-18) {
          const dvDck = (rStoich * v) / cK;
          for (const [sp, nu] of Object.entries(netStoich)) {
            if (idxMap[sp] !== undefined) {
              const iIdx = idxMap[sp];
              jMat[iIdx][kIdx] += nu * dvDck;
            }
          }
        }
      }
    }
  }

  return { fVec, jMat };
}

/**
 * Simulates stiff reaction network offline using Rosenbrock-W ROS2 integrator.
 */
export function simulateOffline(
  request: StiffKineticsSimulationRequest
): StiffKineticsSimulationResponse {
  let networkName = 'Custom Reaction Network';
  let species: KineticSpecies[] = [];
  let reactions: ElementaryReaction[] = [];
  let totalTime = request.total_time_s || 100.0;
  let estStiffness = 1.0e6;

  if (request.preset_id && FALLBACK_PRESETS[request.preset_id]) {
    const preset = FALLBACK_PRESETS[request.preset_id];
    networkName = preset.name;
    species = preset.species;
    reactions = preset.reactions;
    totalTime = request.total_time_s && request.total_time_s !== 100.0 ? request.total_time_s : preset.total_time_s;
    estStiffness = preset.estimated_stiffness_ratio;
  } else {
    species = request.species || [];
    reactions = request.reactions || [];
  }

  const speciesNames = species.map((s) => s.name);
  const nSp = speciesNames.length;
  const currConc: Record<string, number> = {};
  species.forEach((s) => {
    currConc[s.name] = s.initial_concentration_m;
  });

  let currTime = 0.0;
  let h = request.initial_step_s || 1e-4;
  const gamma = 1.0 - 1.0 / Math.SQRT2; // 0.2928932

  const trajectory: Record<string, number>[] = [
    {
      time_s: 0.0,
      ...Object.fromEntries(speciesNames.map((s) => [s, Number(currConc[s].toFixed(8))])),
    },
  ];

  const maxSteps = request.max_steps || 500;
  const recordInterval = totalTime / maxSteps;
  let nextRecordTime = recordInterval;
  let lastJacobian = Array.from({ length: nSp }, () => new Array(nSp).fill(0.0));

  let safetyCounter = 0;
  while (currTime < totalTime && safetyCounter < 15000) {
    safetyCounter++;
    if (currTime + h > totalTime) {
      h = totalTime - currTime;
    }
    if (h <= 1e-15) break;

    const { fVec: fN, jMat: jN } = evaluateDerivatives(speciesNames, reactions, currConc);
    lastJacobian = jN;

    if (request.solver_method === 'explicit_rk4') {
      const k1 = fN;
      const y1: Record<string, number> = {};
      speciesNames.forEach((s, i) => {
        y1[s] = Math.max(0.0, currConc[s] + 0.5 * h * k1[i]);
      });
      const { fVec: k2 } = evaluateDerivatives(speciesNames, reactions, y1);
      const y2: Record<string, number> = {};
      speciesNames.forEach((s, i) => {
        y2[s] = Math.max(0.0, currConc[s] + 0.5 * h * k2[i]);
      });
      const { fVec: k3 } = evaluateDerivatives(speciesNames, reactions, y2);
      const y3: Record<string, number> = {};
      speciesNames.forEach((s, i) => {
        y3[s] = Math.max(0.0, currConc[s] + h * k3[i]);
      });
      const { fVec: k4 } = evaluateDerivatives(speciesNames, reactions, y3);

      speciesNames.forEach((s, i) => {
        currConc[s] = Math.max(0.0, currConc[s] + (h / 6.0) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
      });
    } else {
      // Rosenbrock-W ROS2 Stiff Integrator
      const aMat = Array.from({ length: nSp }, (_, r) =>
        Array.from({ length: nSp }, (_, c) => {
          const ident = r === c ? 1.0 : 0.0;
          return ident - gamma * h * jN[r][c];
        })
      );

      const k1 = solveLinearSystem(aMat, fN);

      const yMid: Record<string, number> = {};
      speciesNames.forEach((s, i) => {
        yMid[s] = Math.max(0.0, currConc[s] + 0.5 * h * k1[i]);
      });
      const { fVec: fMid } = evaluateDerivatives(speciesNames, reactions, yMid);

      const jk1 = Array.from({ length: nSp }, (_, r) =>
        speciesNames.reduce((acc, _, c) => acc + jN[r][c] * k1[c], 0.0)
      );
      const rhs2 = Array.from({ length: nSp }, (_, r) => fMid[r] - gamma * h * jk1[r]);
      const k2 = solveLinearSystem(aMat, rhs2);

      speciesNames.forEach((s, i) => {
        currConc[s] = Math.max(0.0, currConc[s] + h * k2[i]);
      });
    }

    currTime += h;

    if (request.solver_method !== 'explicit_rk4') {
      h = Math.min(h * 1.05, totalTime / 50.0);
    }

    if (currTime >= nextRecordTime || currTime >= totalTime) {
      const pt: Record<string, number> = { time_s: Number(currTime.toFixed(5)) };
      speciesNames.forEach((s) => {
        pt[s] = Number(currConc[s].toFixed(8));
      });
      trajectory.push(pt);
      nextRecordTime += recordInterval;
    }
  }

  const finalConcs: Record<string, number> = {};
  speciesNames.forEach((s) => {
    finalConcs[s] = Number(currConc[s].toFixed(8));
  });

  const summary =
    `Stiff kinetic integration of '${networkName}' successfully computed ${trajectory.length} ` +
    `points over ${totalTime}s using the ${request.solver_method === 'explicit_rk4' ? 'Explicit RK4' : 'Rosenbrock-W (ROS2)'} integrator. ` +
    `Estimated stiffness ratio is ${estStiffness.toExponential(1)}.`;

  return {
    network_name: networkName,
    solver_method: request.solver_method,
    stiffness_ratio: estStiffness,
    is_stiff: estStiffness >= 1.0e4,
    species_names: speciesNames,
    time_points_count: trajectory.length,
    trajectory,
    final_concentrations: finalConcs,
    jacobian_matrix: lastJacobian.map((row) => row.map((v) => Number(v.toFixed(4)))),
    pedagogical_summary: summary,
  };
}

export const stiffKineticsService = {
  async getPresets(): Promise<KineticsPresetSummary[]> {
    try {
      const res = await fetch(`${API_BASE}/presets`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return Object.values(FALLBACK_PRESETS).map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      description: p.description,
      species_count: p.species_count,
      reactions_count: p.reactions_count,
      estimated_stiffness_ratio: p.estimated_stiffness_ratio,
      default_total_time_s: p.default_total_time_s,
    }));
  },

  async getPresetDetail(presetId: string): Promise<StiffKineticsPresetDetail | null> {
    try {
      const res = await fetch(`${API_BASE}/presets/${presetId}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return FALLBACK_PRESETS[presetId] || null;
  },

  async simulate(request: StiffKineticsSimulationRequest): Promise<StiffKineticsSimulationResponse> {
    try {
      const res = await fetch(`${API_BASE}/simulate`, {
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
    return simulateOffline(request);
  },
};
