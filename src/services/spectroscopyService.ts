/**
 * Spectroscopy & Instrumental Analysis Frontend Client Service.
 * Connects to /api/v1/chemistry/spectroscopy endpoints with deterministic offline fallbacks.
 */
import {
  UvVisStandard,
  UvVisSimulationResult,
  CalibrationPoint,
  CalibrationCurveResult,
  FtirSimulationResult,
  FtirPeakIdentificationResult,
  NmrSimulationResult,
  SpectroscopyChallenge,
} from '../types/spectroscopy';

const API_BASE = (import.meta.env?.VITE_API_URL || 'http://localhost:8000') + '/api/v1/chemistry/spectroscopy';

export const FALLBACK_UV_VIS_STANDARDS: UvVisStandard[] = [
  {
    id: 'kmno4',
    name: 'Potassium Permanganate',
    formula: 'KMnO4',
    color: '#7D26CD',
    lambda_max_nm: 525.0,
    molar_absorptivity: 2380.0,
    description: 'Permanganate ion visible vibronic progression at 525 nm.',
  },
  {
    id: 'riboflavin',
    name: 'Riboflavin (Vitamin B2)',
    formula: 'C17H20N4O6',
    color: '#FFD700',
    lambda_max_nm: 445.0,
    molar_absorptivity: 12500.0,
    description: 'Isoalloxazine conjugated ring system pi -> pi* transition.',
  },
  {
    id: 'cuso4',
    name: 'Copper(II) Sulfate Pentahydrate',
    formula: 'CuSO4·5H2O',
    color: '#0099FF',
    lambda_max_nm: 810.0,
    molar_absorptivity: 12.3,
    description: 'Jahn-Teller distorted d-d electronic transition.',
  },
  {
    id: 'methyl_orange',
    name: 'Methyl Orange',
    formula: 'C14H14N3NaO3S',
    color: '#FF5722',
    lambda_max_nm: 464.0,
    molar_absorptivity: 25000.0,
    description: 'Azo dye chromophore conjugated system.',
  },
];

export const SpectroscopyService = {
  /**
   * Fetch catalog of standard UV-Vis chromophores.
   */
  async getStandards(): Promise<UvVisStandard[]> {
    try {
      const res = await fetch(`${API_BASE}/uv-vis/standards`);
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }
    return FALLBACK_UV_VIS_STANDARDS;
  },

  /**
   * Simulate UV-Vis spectrum for an analyte.
   */
  async simulateUvVis(
    analyteId: string,
    concentrationM: number,
    pathLengthCm: number = 1.0,
    startNm: number = 350.0,
    endNm: number = 750.0,
    stepNm: number = 2.0
  ): Promise<UvVisSimulationResult> {
    try {
      const res = await fetch(`${API_BASE}/uv-vis/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analyte_id: analyteId,
          concentration_m: concentrationM,
          path_length_cm: pathLengthCm,
          start_wavelength_nm: startNm,
          end_wavelength_nm: endNm,
          step_nm: stepNm,
        }),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    // Deterministic fallback
    const std = FALLBACK_UV_VIS_STANDARDS.find((s) => s.id === analyteId) || FALLBACK_UV_VIS_STANDARDS[0];
    const absMax = std.molar_absorptivity * pathLengthCm * concentrationM;
    const transMax = Math.max(0, Math.min(100, Math.pow(10, -absMax) * 100));

    const points = [];
    for (let wl = startNm; wl <= endNm; wl += stepNm) {
      const gauss = Math.exp(-0.5 * Math.pow((wl - std.lambda_max_nm) / 22.0, 2));
      const ptAbs = absMax * gauss;
      const ptTrans = Math.max(0, Math.min(100, Math.pow(10, -ptAbs) * 100));
      points.push({
        wavelength_nm: Math.round(wl * 10) / 10,
        absorbance: Math.round(ptAbs * 10000) / 10000,
        transmittance_pct: Math.round(ptTrans * 100) / 100,
      });
    }

    return {
      analyte_id: std.id,
      analyte_name: std.name,
      analyte_formula: std.formula,
      concentration_m: concentrationM,
      path_length_cm: pathLengthCm,
      molar_absorptivity_l_mol_cm: std.molar_absorptivity,
      lambda_max_nm: std.lambda_max_nm,
      absorbance_at_lambda_max: Math.round(absMax * 10000) / 10000,
      transmittance_at_lambda_max: Math.round(transMax * 100) / 100,
      chemical_color: std.color,
      spectrum_points: points,
      notes: std.description,
    };
  },

  /**
   * Calculate standard calibration linear regression curve.
   */
  async computeCalibrationCurve(
    analyteName: string,
    standardPoints: CalibrationPoint[],
    unknownAbsorbance?: number
  ): Promise<CalibrationCurveResult> {
    try {
      const res = await fetch(`${API_BASE}/uv-vis/calibration-curve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analyte_name: analyteName,
          standard_points: standardPoints,
          unknown_absorbance: unknownAbsorbance,
        }),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    // Fallback least squares
    const n = standardPoints.length;
    const meanX = standardPoints.reduce((acc, p) => acc + p.concentration_m, 0) / n;
    const meanY = standardPoints.reduce((acc, p) => acc + p.absorbance, 0) / n;

    const sxx = standardPoints.reduce((acc, p) => acc + Math.pow(p.concentration_m - meanX, 2), 0);
    const sxy = standardPoints.reduce((acc, p) => acc + (p.concentration_m - meanX) * (p.absorbance - meanY), 0);
    const syy = standardPoints.reduce((acc, p) => acc + Math.pow(p.absorbance - meanY, 2), 0);

    const slope = sxx !== 0 ? sxy / sxx : 0;
    const intercept = meanY - slope * meanX;
    const r2 = sxx > 0 && syy > 0 ? Math.pow(sxy, 2) / (sxx * syy) : 1.0;

    let calcConc = undefined;
    if (unknownAbsorbance !== undefined && slope !== 0) {
      calcConc = Math.max(0, (unknownAbsorbance - intercept) / slope);
    }

    return {
      analyte_name: analyteName,
      slope: Math.round(slope * 10000) / 10000,
      intercept: Math.round(intercept * 100000) / 100000,
      r_squared: Math.round(r2 * 10000) / 10000,
      equation: `A = ${slope.toFixed(2)} × c + ${intercept.toFixed(4)} (R² = ${r2.toFixed(4)})`,
      standard_points: standardPoints,
      unknown_absorbance: unknownAbsorbance,
      calculated_concentration_m: calcConc !== undefined ? Math.round(calcConc * 1000000) / 1000000 : undefined,
      analysis_notes: `Linear Beer-Lambert calibration model with sensitivity slope ${slope.toFixed(2)} L/(mol·cm).`,
    };
  },

  /**
   * Simulate FTIR spectrum.
   */
  async simulateFtir(compoundId: string): Promise<FtirSimulationResult> {
    try {
      const res = await fetch(`${API_BASE}/ftir/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ compound_id: compoundId }),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    return {
      compound_name: 'Ethanol',
      compound_formula: 'C2H5OH',
      detected_bands: [
        { wavenumber_cm1: 3350, transmittance_pct: 12, intensity: 'broad', assigned_bond: 'O-H stretch', functional_group: 'Alcohol' },
        { wavenumber_cm1: 2975, transmittance_pct: 28, intensity: 'strong', assigned_bond: 'C-H sp3 stretch', functional_group: 'Alkyl' },
        { wavenumber_cm1: 1050, transmittance_pct: 18, intensity: 'strong', assigned_bond: 'C-O stretch', functional_group: 'Primary Alcohol' },
      ],
      spectrum_points: [
        { wavenumber_cm1: 4000, transmittance_pct: 98 },
        { wavenumber_cm1: 3350, transmittance_pct: 12 },
        { wavenumber_cm1: 2975, transmittance_pct: 28 },
        { wavenumber_cm1: 1050, transmittance_pct: 18 },
        { wavenumber_cm1: 400, transmittance_pct: 98 },
      ],
      fingerprint_summary: 'Broad O-H absorption band at 3350 cm-1 and strong C-O stretch at 1050 cm-1.',
    };
  },

  /**
   * Identify functional groups from peaks.
   */
  async identifyFtirPeaks(peaks: number[], toleranceCm1: number = 40.0): Promise<FtirPeakIdentificationResult> {
    try {
      const res = await fetch(`${API_BASE}/ftir/identify-peaks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experimental_peaks_cm1: peaks, tolerance_cm1: toleranceCm1 }),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    const matches = [];
    for (const p of peaks) {
      if (p >= 1680 && p <= 1750) {
        matches.push({
          experimental_peak_cm1: p,
          matched_group: 'Ketone / Aldehyde / Ester',
          typical_range_cm1: '1680-1750 cm⁻¹',
          bond_vibration: 'C=O stretch',
          confidence: 0.95,
        });
      }
      if (p >= 3200 && p <= 3650) {
        matches.push({
          experimental_peak_cm1: p,
          matched_group: 'Alcohol / Phenol',
          typical_range_cm1: '3200-3650 cm⁻¹',
          bond_vibration: 'O-H stretch',
          confidence: 0.92,
        });
      }
    }

    const hasCarbonyl = matches.some((m) => m.bond_vibration.includes('C=O'));
    const hasHydroxyl = matches.some((m) => m.bond_vibration.includes('O-H'));
    const assessmentParts = [];
    if (hasCarbonyl) assessmentParts.push('Carbonyl oxygenated compound detected.');
    if (hasHydroxyl) assessmentParts.push('Hydroxyl functional group present.');
    const diagnostic = assessmentParts.length > 0 ? assessmentParts.join(' ') : 'Skeletal vibrations detected.';

    return {
      matches,
      diagnostic_assessment: diagnostic,
    };
  },

  /**
   * Simulate NMR spectrum.
   */
  async simulateNmr(compoundId: string, nucleus: string = '1H', freqMhz: number = 400.0): Promise<NmrSimulationResult> {
    try {
      const res = await fetch(`${API_BASE}/nmr/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ compound_id: compoundId, nucleus, spectrometer_freq_mhz: freqMhz }),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    return {
      nucleus,
      compound_name: 'Ethanol',
      solvent: 'CDCl3',
      spectrometer_freq_mhz: freqMhz,
      total_integrated_nuclei: 6,
      signals: [
        { chemical_shift_ppm: 1.25, multiplicity: 'triplet', integration_protons: 3, coupling_constant_hz: 7.1, assignment: 'CH3 protons' },
        { chemical_shift_ppm: 3.69, multiplicity: 'quartet', integration_protons: 2, coupling_constant_hz: 7.1, assignment: 'CH2 protons' },
        { chemical_shift_ppm: 2.58, multiplicity: 'singlet', integration_protons: 1, assignment: 'OH proton' },
      ],
      spectrum_points: [
        { chemical_shift_ppm: 0, intensity: 0 },
        { chemical_shift_ppm: 1.25, intensity: 3 },
        { chemical_shift_ppm: 2.58, intensity: 1 },
        { chemical_shift_ppm: 3.69, intensity: 2 },
        { chemical_shift_ppm: 12, intensity: 0 },
      ],
    };
  },

  /**
   * Fetch unknown compound identification challenges.
   */
  async getChallenges(): Promise<SpectroscopyChallenge[]> {
    try {
      const res = await fetch(`${API_BASE}/challenges`);
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    return [
      {
        challenge_id: 'chall-001',
        title: 'Unknown Carbonyl Compound (C3H6O)',
        difficulty: 'Introductory',
        molecular_formula: 'C3H6O',
        molecular_weight: 58.08,
        uv_vis_summary: 'Weak n -> pi* transition at 279 nm.',
        ftir_prominent_peaks: [2925.0, 1715.0, 1365.0, 1220.0],
        nmr_signals: [{ shift: 2.17, multiplicity: 'singlet', integration: 6, assignment: '6H singlet' }],
        candidate_structures: [
          { name: 'Acetone', formula: 'C3H6O', smiles: 'CC(=O)C', iupac: 'Propan-2-one' },
          { name: 'Propanal', formula: 'C3H6O', smiles: 'CCC=O', iupac: 'Propanal' },
        ],
        correct_compound_name: 'Acetone',
        explanation: 'Intense 1715 cm-1 FTIR peak indicates ketone carbonyl. 1H NMR 6H singlet proves acetone.',
      },
    ];
  },
};
