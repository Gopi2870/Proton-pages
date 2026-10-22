/**
 * Nuclear Chemistry & Radioactive Decay Chains Service (PR #042).
 * Dual-layer architecture: calls FastAPI backend when available, with
 * client-side Bateman equation solver and radiocarbon dating offline fallback.
 */

import {
  Radioisotope,
  DecayChainPreset,
  ChainPresetSummary,
  BatemanSimulationRequest,
  BatemanSimulationResult,
  BatemanTrajectoryPoint,
  RadiocarbonDatingRequest,
  RadiocarbonDatingResult,
  TimeUnit,
} from '../types/nuclearChemistry';

export const SECONDS_PER_MINUTE = 60.0;
export const SECONDS_PER_HOUR = 3600.0;
export const SECONDS_PER_DAY = 86400.0;
export const SECONDS_PER_YEAR = 31557600.0; // 365.25 days

export const CAMBRIDGE_HALF_LIFE_YR = 5730.0;
export const LIBBY_HALF_LIFE_YR = 5568.0;
export const MODERN_14C_DPM_PER_G = 15.3;

export const CURATED_DECAY_PRESETS: DecayChainPreset[] = [
  {
    id: 'molybdenum_technetium',
    name: 'Molybdenum-99 / Technetium-99m Medical Generator',
    category: 'medical',
    description:
      'The primary radionuclide generator for diagnostic nuclear medicine (SPECT imaging). Exhibits classical transient equilibrium where daughter Tc-99m reaches peak activity around 23 hours.',
    defaultTimeHorizonS: 72.0 * SECONDS_PER_HOUR,
    defaultTimeUnit: 'hours',
    equilibriumType: 'transient',
    isotopes: [
      {
        symbol: 'Mo-99',
        name: 'Molybdenum-99',
        atomicNumber: 42,
        massNumber: 99,
        halfLifeSeconds: 65.94 * SECONDS_PER_HOUR,
        halfLifeDisplay: '65.94 hours',
        decayConstantSInv: Math.LN2 / (65.94 * SECONDS_PER_HOUR),
        decayMode: 'beta_minus',
        daughterIsotope: 'Tc-99m',
        branchingRatio: 0.876,
        isStable: false,
        energyMev: 1.23,
      },
      {
        symbol: 'Tc-99m',
        name: 'Technetium-99m (Metastable)',
        atomicNumber: 43,
        massNumber: 99,
        halfLifeSeconds: 6.007 * SECONDS_PER_HOUR,
        halfLifeDisplay: '6.01 hours',
        decayConstantSInv: Math.LN2 / (6.007 * SECONDS_PER_HOUR),
        decayMode: 'gamma',
        daughterIsotope: 'Tc-99g',
        branchingRatio: 0.9999,
        isStable: false,
        energyMev: 0.142,
      },
      {
        symbol: 'Tc-99g',
        name: 'Technetium-99 (Ground State)',
        atomicNumber: 43,
        massNumber: 99,
        halfLifeSeconds: 2.111e5 * SECONDS_PER_YEAR,
        halfLifeDisplay: '2.11 × 10⁵ years',
        decayConstantSInv: Math.LN2 / (2.111e5 * SECONDS_PER_YEAR),
        decayMode: 'beta_minus',
        daughterIsotope: 'Ru-99',
        branchingRatio: 1.0,
        isStable: false,
        energyMev: 0.294,
      },
      {
        symbol: 'Ru-99',
        name: 'Ruthenium-99',
        atomicNumber: 44,
        massNumber: 99,
        halfLifeSeconds: null,
        halfLifeDisplay: 'Stable',
        decayConstantSInv: 0.0,
        decayMode: 'stable',
        daughterIsotope: null,
        branchingRatio: 1.0,
        isStable: true,
      },
    ],
  },
  {
    id: 'radon_daughters',
    name: 'Radon-222 Short-Lived Progeny Cascade',
    category: 'primordial',
    description:
      'Inhalation radiation hazard series from decay of gaseous Rn-222 to lead-210. Achieves secular equilibrium within approximately 4 hours, where daughter activities equal that of Rn-222.',
    defaultTimeHorizonS: 6.0 * SECONDS_PER_HOUR,
    defaultTimeUnit: 'hours',
    equilibriumType: 'secular',
    isotopes: [
      {
        symbol: 'Rn-222',
        name: 'Radon-222',
        atomicNumber: 86,
        massNumber: 222,
        halfLifeSeconds: 3.8235 * SECONDS_PER_DAY,
        halfLifeDisplay: '3.82 days',
        decayConstantSInv: Math.LN2 / (3.8235 * SECONDS_PER_DAY),
        decayMode: 'alpha',
        daughterIsotope: 'Po-218',
        branchingRatio: 1.0,
        isStable: false,
        energyMev: 5.49,
      },
      {
        symbol: 'Po-218',
        name: 'Polonium-218',
        atomicNumber: 84,
        massNumber: 218,
        halfLifeSeconds: 3.10 * SECONDS_PER_MINUTE,
        halfLifeDisplay: '3.10 min',
        decayConstantSInv: Math.LN2 / (3.10 * SECONDS_PER_MINUTE),
        decayMode: 'alpha',
        daughterIsotope: 'Pb-214',
        branchingRatio: 0.9998,
        isStable: false,
        energyMev: 6.00,
      },
      {
        symbol: 'Pb-214',
        name: 'Lead-214',
        atomicNumber: 82,
        massNumber: 214,
        halfLifeSeconds: 26.8 * SECONDS_PER_MINUTE,
        halfLifeDisplay: '26.8 min',
        decayConstantSInv: Math.LN2 / (26.8 * SECONDS_PER_MINUTE),
        decayMode: 'beta_minus',
        daughterIsotope: 'Bi-214',
        branchingRatio: 1.0,
        isStable: false,
        energyMev: 1.02,
      },
      {
        symbol: 'Bi-214',
        name: 'Bismuth-214',
        atomicNumber: 83,
        massNumber: 214,
        halfLifeSeconds: 19.9 * SECONDS_PER_MINUTE,
        halfLifeDisplay: '19.9 min',
        decayConstantSInv: Math.LN2 / (19.9 * SECONDS_PER_MINUTE),
        decayMode: 'beta_minus',
        daughterIsotope: 'Pb-210',
        branchingRatio: 0.9998,
        isStable: false,
        energyMev: 3.27,
      },
      {
        symbol: 'Pb-210',
        name: 'Lead-210',
        atomicNumber: 82,
        massNumber: 210,
        halfLifeSeconds: 22.20 * SECONDS_PER_YEAR,
        halfLifeDisplay: '22.2 years',
        decayConstantSInv: Math.LN2 / (22.20 * SECONDS_PER_YEAR),
        decayMode: 'beta_minus',
        daughterIsotope: null,
        branchingRatio: 1.0,
        isStable: false,
      },
    ],
  },
  {
    id: 'uranium_actinides',
    name: 'Uranium-238 Sub-Series (U-238 to U-234)',
    category: 'actinide',
    description:
      'The initial steps of the primordial Uranium series: U-238 alpha decay followed by two rapid beta decays to long-lived Uranium-234.',
    defaultTimeHorizonS: 120.0 * SECONDS_PER_DAY,
    defaultTimeUnit: 'days',
    equilibriumType: 'secular',
    isotopes: [
      {
        symbol: 'U-238',
        name: 'Uranium-238',
        atomicNumber: 92,
        massNumber: 238,
        halfLifeSeconds: 4.468e9 * SECONDS_PER_YEAR,
        halfLifeDisplay: '4.47 × 10⁹ y',
        decayConstantSInv: Math.LN2 / (4.468e9 * SECONDS_PER_YEAR),
        decayMode: 'alpha',
        daughterIsotope: 'Th-234',
        branchingRatio: 1.0,
        isStable: false,
        energyMev: 4.27,
      },
      {
        symbol: 'Th-234',
        name: 'Thorium-234',
        atomicNumber: 90,
        massNumber: 234,
        halfLifeSeconds: 24.10 * SECONDS_PER_DAY,
        halfLifeDisplay: '24.10 days',
        decayConstantSInv: Math.LN2 / (24.10 * SECONDS_PER_DAY),
        decayMode: 'beta_minus',
        daughterIsotope: 'Pa-234m',
        branchingRatio: 1.0,
        isStable: false,
      },
      {
        symbol: 'Pa-234m',
        name: 'Protactinium-234m',
        atomicNumber: 91,
        massNumber: 234,
        halfLifeSeconds: 1.17 * SECONDS_PER_MINUTE,
        halfLifeDisplay: '1.17 min',
        decayConstantSInv: Math.LN2 / (1.17 * SECONDS_PER_MINUTE),
        decayMode: 'beta_minus',
        daughterIsotope: 'U-234',
        branchingRatio: 1.0,
        isStable: false,
      },
      {
        symbol: 'U-234',
        name: 'Uranium-234',
        atomicNumber: 92,
        massNumber: 234,
        halfLifeSeconds: 2.455e5 * SECONDS_PER_YEAR,
        halfLifeDisplay: '2.455 × 10⁵ y',
        decayConstantSInv: Math.LN2 / (2.455e5 * SECONDS_PER_YEAR),
        decayMode: 'alpha',
        daughterIsotope: null,
        branchingRatio: 1.0,
        isStable: false,
      },
    ],
  },
  {
    id: 'iodine_131',
    name: 'Iodine-131 Medical Radiotherapy',
    category: 'medical',
    description:
      'Targeted radiopharmaceutical used in thyroid carcinoma ablation. Decays by beta-minus emission with gamma rays directly to stable Xenon-131.',
    defaultTimeHorizonS: 40.0 * SECONDS_PER_DAY,
    defaultTimeUnit: 'days',
    equilibriumType: 'none',
    isotopes: [
      {
        symbol: 'I-131',
        name: 'Iodine-131',
        atomicNumber: 53,
        massNumber: 131,
        halfLifeSeconds: 8.025 * SECONDS_PER_DAY,
        halfLifeDisplay: '8.025 days',
        decayConstantSInv: Math.LN2 / (8.025 * SECONDS_PER_DAY),
        decayMode: 'beta_minus',
        daughterIsotope: 'Xe-131',
        branchingRatio: 1.0,
        isStable: false,
        energyMev: 0.971,
      },
      {
        symbol: 'Xe-131',
        name: 'Xenon-131',
        atomicNumber: 54,
        massNumber: 131,
        halfLifeSeconds: null,
        halfLifeDisplay: 'Stable',
        decayConstantSInv: 0.0,
        decayMode: 'stable',
        daughterIsotope: null,
        branchingRatio: 1.0,
        isStable: true,
      },
    ],
  },
];

class NuclearChemistryService {
  private readonly baseUrl = '/api/v1/chemistry/nuclear-decay';

  public convertTimeToSeconds(timeVal: number, unit: TimeUnit): number {
    switch (unit) {
      case 'minutes':
        return timeVal * SECONDS_PER_MINUTE;
      case 'hours':
        return timeVal * SECONDS_PER_HOUR;
      case 'days':
        return timeVal * SECONDS_PER_DAY;
      case 'years':
        return timeVal * SECONDS_PER_YEAR;
      case 'seconds':
      default:
        return timeVal;
    }
  }

  public getPresetSummaries(): ChainPresetSummary[] {
    return CURATED_DECAY_PRESETS.map((p) => {
      let tStr = `${p.defaultTimeHorizonS} s`;
      if (p.defaultTimeUnit === 'hours') {
        tStr = `${(p.defaultTimeHorizonS / SECONDS_PER_HOUR).toFixed(1)} hours`;
      } else if (p.defaultTimeUnit === 'days') {
        tStr = `${(p.defaultTimeHorizonS / SECONDS_PER_DAY).toFixed(1)} days`;
      } else if (p.defaultTimeUnit === 'years') {
        tStr = `${(p.defaultTimeHorizonS / SECONDS_PER_YEAR).toFixed(1)} years`;
      }

      return {
        id: p.id,
        name: p.name,
        category: p.category,
        description: p.description,
        isotopesCount: p.isotopes.length,
        firstNuclide: p.isotopes[0].symbol,
        stableEndProduct: p.isotopes[p.isotopes.length - 1].symbol,
        equilibriumType: p.equilibriumType,
        defaultTimeHorizonDisplay: tStr,
      };
    });
  }

  public getPreset(id: string): DecayChainPreset | undefined {
    return CURATED_DECAY_PRESETS.find((p) => p.id === id);
  }

  /**
   * Analytical Bateman cascade equation solver.
   * Superposes contributions from each isotope with nonzero initial population.
   * Uses regularized decay constants for degenerate lambdas.
   */
  public solveBatemanChain(
    isotopes: Radioisotope[],
    initialPopulations: Record<string, number>,
    tSeconds: number
  ): { populations: Record<string, number>; activities: Record<string, number> } {
    const n = isotopes.length;
    const symbols = isotopes.map((iso) => iso.symbol);
    const lambdas = isotopes.map((iso) => iso.decayConstantSInv);

    // Regularize degenerate decay constants to prevent zero denominators
    const adjLambdas = [...lambdas];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (adjLambdas[i] > 0 && adjLambdas[j] > 0) {
          const diff = Math.abs(adjLambdas[i] - adjLambdas[j]);
          if (diff / Math.max(adjLambdas[i], adjLambdas[j]) < 1e-6) {
            adjLambdas[j] *= 1.0 + 1e-6;
          }
        }
      }
    }

    const nOut: Record<string, number> = {};
    for (const sym of symbols) {
      nOut[sym] = 0.0;
    }

    for (let startIdx = 0; startIdx < n; startIdx++) {
      const n0 = initialPopulations[symbols[startIdx]] ?? 0.0;
      if (n0 <= 0.0) continue;

      for (let endIdx = startIdx; endIdx < n; endIdx++) {
        const chainLen = endIdx - startIdx + 1;

        if (chainLen === 1) {
          const lam = adjLambdas[startIdx];
          const pop = lam > 0 ? n0 * Math.exp(-lam * tSeconds) : n0;
          nOut[symbols[endIdx]] += pop;
        } else {
          const isEndStable = isotopes[endIdx].isStable || adjLambdas[endIdx] === 0.0;

          if (!isEndStable) {
            let prodBranchLam = 1.0;
            for (let k = startIdx; k < endIdx; k++) {
              prodBranchLam *= isotopes[k].branchingRatio * adjLambdas[k];
            }

            let sumExp = 0.0;
            for (let j = startIdx; j <= endIdx; j++) {
              let denom = 1.0;
              for (let p = startIdx; p <= endIdx; p++) {
                if (p !== j) {
                  denom *= adjLambdas[p] - adjLambdas[j];
                }
              }
              if (Math.abs(denom) > 1e-30) {
                sumExp += Math.exp(-adjLambdas[j] * tSeconds) / denom;
              }
            }
            nOut[symbols[endIdx]] += n0 * prodBranchLam * sumExp;
          } else {
            // Stable product accumulation via conservation
            let prodBranchLam = 1.0;
            for (let k = startIdx; k < endIdx; k++) {
              prodBranchLam *= isotopes[k].branchingRatio * (adjLambdas[k] || 1.0);
            }

            let termSum = 0.0;
            for (let j = startIdx; j < endIdx; j++) {
              let denom = adjLambdas[j];
              for (let p = startIdx; p < endIdx; p++) {
                if (p !== j) {
                  denom *= adjLambdas[p] - adjLambdas[j];
                }
              }
              if (Math.abs(denom) > 1e-30) {
                termSum += (1.0 - Math.exp(-adjLambdas[j] * tSeconds)) / denom;
              }
            }
            const deltaStable = n0 * prodBranchLam * termSum;
            nOut[symbols[endIdx]] += Math.max(0.0, deltaStable);
          }
        }
      }
    }

    // Calculate activities in Bq: A_i = lambda_i * N_i
    const activities: Record<string, number> = {};
    for (let i = 0; i < n; i++) {
      const sym = symbols[i];
      const pop = Math.max(0.0, nOut[sym]);
      nOut[sym] = pop;
      activities[sym] = lambdas[i] * pop;
    }

    return { populations: nOut, activities };
  }

  /**
   * Generates discrete time series trajectory over the specified horizon.
   */
  public simulateLocally(request: BatemanSimulationRequest): BatemanSimulationResult {
    let isotopes: Radioisotope[] = [];
    let chainName = 'Custom Radioactive Decay Chain';
    let eqType: 'secular' | 'transient' | 'none' = 'none';

    if (request.chainId) {
      const preset = this.getPreset(request.chainId);
      if (preset) {
        isotopes = preset.isotopes;
        chainName = preset.name;
        eqType = preset.equilibriumType;
      }
    }

    if (isotopes.length === 0 && request.customIsotopes && request.customIsotopes.length > 0) {
      isotopes = request.customIsotopes;
    }

    if (isotopes.length === 0) {
      throw new Error('Simulation requires at least one isotope in the decay chain.');
    }

    // Validation
    const initialPopulations = request.initialPopulations || { [isotopes[0].symbol]: 1.0e12 };
    for (const [sym, val] of Object.entries(initialPopulations)) {
      if (val < 0) {
        throw new Error(`Initial population for ${sym} cannot be negative (got ${val}).`);
      }
    }

    const totalSeconds = this.convertTimeToSeconds(request.timeHorizon, request.timeUnit);
    const pointsCount = Math.max(10, Math.min(300, request.pointsCount || 60));
    const dt = totalSeconds / pointsCount;

    const trajectory: BatemanTrajectoryPoint[] = [];
    let lastPopulations: Record<string, number> = {};
    let lastActivities: Record<string, number> = {};

    for (let step = 0; step <= pointsCount; step++) {
      const tSec = step * dt;
      let tDisp = tSec;
      if (request.timeUnit === 'minutes') tDisp = tSec / SECONDS_PER_MINUTE;
      else if (request.timeUnit === 'hours') tDisp = tSec / SECONDS_PER_HOUR;
      else if (request.timeUnit === 'days') tDisp = tSec / SECONDS_PER_DAY;
      else if (request.timeUnit === 'years') tDisp = tSec / SECONDS_PER_YEAR;

      const { populations, activities } = this.solveBatemanChain(isotopes, initialPopulations, tSec);
      lastPopulations = populations;
      lastActivities = activities;

      const totalAct = Object.values(activities).reduce((acc, v) => acc + v, 0);

      trajectory.push({
        timeSeconds: tSec,
        timeDisplay: Number(tDisp.toFixed(3)),
        populations,
        activitiesBq: activities,
        totalActivityBq: totalAct,
      });
    }

    // Pedagogical summary
    let pedagogicalSummary = `Analytical Bateman cascade for "${chainName}" computed over ${request.timeHorizon} ${request.timeUnit}. `;
    if (eqType === 'transient' && isotopes.length >= 2) {
      const l1 = isotopes[0].decayConstantSInv;
      const l2 = isotopes[1].decayConstantSInv;
      if (l2 > l1 && l1 > 0) {
        const tMaxH = Math.log(l2 / l1) / (l2 - l1) / SECONDS_PER_HOUR;
        pedagogicalSummary += `Transient equilibrium reached: ${isotopes[1].symbol} activity reaches peak at t = ${tMaxH.toFixed(1)} h.`;
      }
    } else if (eqType === 'secular' && isotopes.length >= 2) {
      pedagogicalSummary += `Secular equilibrium established: daughter activities asymptotically track parent activity because t_1/2(parent) >> t_1/2(daughter).`;
    }

    return {
      chainName,
      equilibriumType: eqType,
      timeUnit: request.timeUnit,
      isotopes: isotopes.map((iso) => ({
        symbol: iso.symbol,
        name: iso.name,
        atomicNumber: iso.atomicNumber,
        massNumber: iso.massNumber,
        halfLifeDisplay: iso.halfLifeDisplay,
        decayMode: iso.decayMode,
        daughterIsotope: iso.daughterIsotope,
        isStable: iso.isStable,
      })),
      timePointsCount: trajectory.length,
      trajectory,
      finalPopulations: lastPopulations,
      finalActivitiesBq: lastActivities,
      pedagogicalSummary,
    };
  }

  /**
   * Calculates uncalibrated radiocarbon age (BP) from 14C activity ratio.
   * Explicitly documents calibration caveats and assumptions.
   */
  public calculateRadiocarbonAgeLocally(request: RadiocarbonDatingRequest): RadiocarbonDatingResult {
    const useCambridge = request.useCambridgeHalfLife !== false;
    const halfLife = useCambridge ? CAMBRIDGE_HALF_LIFE_YR : LIBBY_HALF_LIFE_YR;
    const lambdaYr = Math.LN2 / halfLife;

    let fraction = request.fractionModernCarbon;
    if (fraction === undefined && request.measuredDpmPerG !== undefined) {
      fraction = request.measuredDpmPerG / MODERN_14C_DPM_PER_G;
    }
    if (fraction === undefined || fraction <= 0.0) {
      fraction = 1.0;
    }
    fraction = Math.min(1.5, Math.max(1e-6, fraction));

    // t_BP = -ln(F) / lambda
    const ageBp = -Math.log(fraction) / lambdaYr;
    const roundedAge = Math.round(ageBp);

    // Approximate uncertainty from counting statistics
    const sigmaYears = Math.max(30, Math.round(Math.sqrt(ageBp * 2.5) + 20));

    // Calendar era estimate
    const calendarYear = 1950 - roundedAge;
    let era = '';
    if (calendarYear > 0) {
      era = `c. ${calendarYear} CE`;
    } else {
      era = `c. ${Math.abs(calendarYear) + 1} BCE`;
    }

    const halfLifeName = useCambridge ? 'Cambridge (physical IUPAC)' : 'Libby (historical convention)';
    const calNotes = `Calculated using the ${halfLifeName} half-life of ${halfLife.toLocaleString()} years.`;

    const disclaimer =
      'IMPORTANT SCIENTIFIC LIMITATION: This is an UNCALIBRATED radiocarbon age reported in years Before Present (BP, where 0 BP = 1950 CE). ' +
      'It assumes constant atmospheric 14C/12C production over time. In real archaeological practice, dendrochronological calibration ' +
      'against tree-ring records (IntCal20 calibration curve) is required to account for past geomagnetic fluctuations, ' +
      'fossil-fuel carbon dilution (Suess effect post-1850), and atmospheric thermonuclear testing (bomb carbon post-1950).';

    return {
      fractionModernCarbon: Number(fraction.toFixed(4)),
      uncalibratedAgeYearsBp: roundedAge,
      uncertaintyYears: sigmaYears,
      halfLifeUsedYears: halfLife,
      decayConstantYrInv: lambdaYr,
      approximateCalendarEra: era,
      calibrationNotes: calNotes,
      scientificDisclaimer: disclaimer,
    };
  }

  /**
   * Dual-layer simulation: attempts backend API call first, falls back to local solver.
   */
  public async simulate(request: BatemanSimulationRequest): Promise<BatemanSimulationResult> {
    try {
      const response = await fetch(`${this.baseUrl}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Backend unavailable; fall through to local computation
    }
    return this.simulateLocally(request);
  }

  /**
   * Dual-layer radiocarbon dating: attempts backend API call first, falls back to local calculation.
   */
  public async calculateRadiocarbonAge(request: RadiocarbonDatingRequest): Promise<RadiocarbonDatingResult> {
    try {
      const response = await fetch(`${this.baseUrl}/radiocarbon-dating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (response.ok) {
        const data = await response.json();
        return data.dating_result || data;
      }
    } catch {
      // Backend unavailable; fall through
    }
    return this.calculateRadiocarbonAgeLocally(request);
  }
}

export const nuclearChemistryService = new NuclearChemistryService();
