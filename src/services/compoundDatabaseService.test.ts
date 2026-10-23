import { describe, it, expect, vi, beforeEach } from 'vitest';
import { compoundDatabaseService } from './compoundDatabaseService';

describe('compoundDatabaseService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('calculates database stats in offline fallback mode', async () => {
    // Force network failure to exercise client fallback calculation
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    const stats = await compoundDatabaseService.getDatabaseStats();
    expect(stats.total_compounds).toBeGreaterThanOrEqual(8);
    expect(stats.categories['Pharmaceutical']).toBeGreaterThanOrEqual(2);
    expect(stats.categories['Organic']).toBeGreaterThanOrEqual(3);
    expect(stats.compounds_with_uv).toBeGreaterThanOrEqual(6);
    expect(stats.compounds_with_ir).toBeGreaterThanOrEqual(6);
    expect(stats.compounds_with_nmr).toBeGreaterThanOrEqual(6);
    expect(stats.average_molecular_weight).toBeGreaterThan(50);
  });

  it('searches compounds by name in offline fallback mode', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    const res = await compoundDatabaseService.searchCompounds({ query: 'aspirin' });
    expect(res.total_matches).toBeGreaterThanOrEqual(1);
    expect(res.compounds[0].name).toBe('Aspirin');
    expect(res.compounds[0].formula).toBe('C9H8O4');
    expect(res.compounds[0].uv_vis_peaks.length).toBe(2);
  });

  it('filters by category and MW bounds in offline fallback mode', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    const res = await compoundDatabaseService.searchCompounds({
      category: 'Pharmaceutical',
      min_mw: 100,
      max_mw: 200,
    });
    expect(res.total_matches).toBe(2); // Aspirin and Paracetamol
    res.compounds.forEach((c) => {
      expect(c.category).toBe('Pharmaceutical');
      expect(c.molecular_weight).toBeGreaterThanOrEqual(100);
      expect(c.molecular_weight).toBeLessThanOrEqual(200);
    });
  });

  it('matches unknown spectroscopic peak via matchSpectroscopy', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    // 273 nm is characteristic for caffeine
    const res = await compoundDatabaseService.matchSpectroscopy({
      target_uv_wavelength_nm: 273.0,
      tolerance_percent: 5.0,
    });
    expect(res.total_matches).toBeGreaterThanOrEqual(1);
    const ids = res.compounds.map((c) => c.id);
    expect(ids).toContain('cmpd_caffeine');
  });

  it('retrieves single compound by ID', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    const cmpd = await compoundDatabaseService.getCompoundById('cmpd_ferrocene');
    expect(cmpd).not.toBeNull();
    expect(cmpd?.name).toBe('Ferrocene');
    expect(cmpd?.nmr_1h_shifts[0].chemical_shift_ppm).toBe(4.15);
  });
});
