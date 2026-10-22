import { describe, it, expect } from 'vitest';
import { SpectroscopyService } from './spectroscopyService';

describe('SpectroscopyService Frontend Client', () => {
  it('retrieves UV-Vis standard chromophores', async () => {
    const standards = await SpectroscopyService.getStandards();
    expect(standards.length).toBeGreaterThanOrEqual(4);
    const kmno4 = standards.find((s) => s.id === 'kmno4');
    expect(kmno4).toBeDefined();
    expect(kmno4?.lambda_max_nm).toBe(525.0);
  });

  it('simulates Beer-Lambert UV-Vis absorption spectrum with accurate absorbance', async () => {
    const conc = 0.0002;
    const res = await SpectroscopyService.simulateUvVis('kmno4', conc, 1.0, 400.0, 700.0, 10.0);
    expect(res.analyte_name).toBe('Potassium Permanganate');
    expect(res.lambda_max_nm).toBe(525.0);
    expect(res.absorbance_at_lambda_max).toBeGreaterThan(0.4);
    expect(res.spectrum_points.length).toBeGreaterThan(10);
  });

  it('computes linear calibration curve regression and unknown concentration', async () => {
    const standards = [
      { concentration_m: 0.00005, absorbance: 0.119 },
      { concentration_m: 0.00010, absorbance: 0.238 },
      { concentration_m: 0.00015, absorbance: 0.357 },
      { concentration_m: 0.00020, absorbance: 0.476 },
    ];
    const curve = await SpectroscopyService.computeCalibrationCurve('KMnO4', standards, 0.300);
    expect(curve.slope).toBeGreaterThan(2000.0);
    expect(curve.r_squared).toBeGreaterThan(0.99);
    expect(curve.calculated_concentration_m).toBeDefined();
    expect(curve.calculated_concentration_m).toBeGreaterThan(0.0001);
  });

  it('simulates FTIR spectrum and correlates functional group bands', async () => {
    const ftir = await SpectroscopyService.simulateFtir('ethanol');
    expect(ftir.compound_name).toBe('Ethanol');
    expect(ftir.detected_bands.length).toBeGreaterThanOrEqual(3);
    const ohBand = ftir.detected_bands.find((b) => b.assigned_bond.includes('O-H'));
    expect(ohBand).toBeDefined();
    expect(ohBand?.wavenumber_cm1).toBe(3350);

    const idResult = await SpectroscopyService.identifyFtirPeaks([1715, 2920]);
    expect(idResult.matches.length).toBeGreaterThan(0);
    expect(idResult.diagnostic_assessment).toContain('Carbonyl');
  });

  it('simulates 1H NMR chemical shifts and multiplicities', async () => {
    const nmr = await SpectroscopyService.simulateNmr('ethanol', '1H');
    expect(nmr.nucleus).toBe('1H');
    expect(nmr.signals.length).toBe(3);
    const triplet = nmr.signals.find((s) => s.multiplicity === 'triplet');
    expect(triplet).toBeDefined();
    expect(triplet?.integration_protons).toBe(3);
  });

  it('retrieves unknown compound identification challenges', async () => {
    const challenges = await SpectroscopyService.getChallenges();
    expect(challenges.length).toBeGreaterThanOrEqual(1);
    expect(challenges[0].challenge_id).toBe('chall-001');
    expect(challenges[0].candidate_structures.length).toBeGreaterThanOrEqual(2);
  });
});
