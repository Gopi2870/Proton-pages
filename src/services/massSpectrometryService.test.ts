import { describe, it, expect, vi, beforeEach } from 'vitest';
import { massSpectrometryService } from './massSpectrometryService';

describe('massSpectrometryService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches catalog standards via fallback', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    const catalog = await massSpectrometryService.getCatalog();
    expect(catalog.length).toBeGreaterThanOrEqual(3);
    const names = catalog.map((s) => s.name);
    expect(names).toContain('Butylbenzene');
    expect(names).toContain('Chlorobenzene');
  });

  it('simulates 70eV EI mass spectrum via fallback', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    const res = await massSpectrometryService.simulateMs({ standard_id: 'butylbenzene' });
    expect(res.analyte_name).toBe('Butylbenzene');
    expect(res.base_peak_mz).toBe(91.0);
    expect(res.spectrum.length).toBeGreaterThanOrEqual(4);
  });

  it('calculates isotope pattern for chlorinated analyte via fallback', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    const res = await massSpectrometryService.calculateIsotopeEnvelope({ formula: 'C6H5Cl' });
    expect(res.pattern_signature).toContain('Chlorine');
    expect(res.m_plus_2_expected_pct).toBeGreaterThan(30);
  });

  it('calculates Van Deemter column hydrodynamics via fallback', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    const res = await massSpectrometryService.calculateVanDeemter({ particle_diameter_um: 3.5 });
    expect(res.a_term_um).toBeGreaterThan(0);
    expect(res.optimum_velocity_cm_s).toBeGreaterThan(0);
    expect(res.curve.length).toBeGreaterThan(10);
  });

  it('simulates multi-component chromatogram separation via fallback', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    const res = await massSpectrometryService.simulateChromatogram({ analyte_ids: ['benzene', 'toluene'] });
    expect(res.peaks.length).toBe(2);
    expect(res.resolution_pairs['Benzene/Toluene']).toBeGreaterThan(1.5);
  });
});
