import { describe, it, expect } from 'vitest';
import { chromatographyService } from './chromatographyService';

describe('ChromatographyService Frontend Client', () => {
  it('loads preset separation catalogs', async () => {
    const presets = await chromatographyService.getPresets();
    expect(presets.length).toBeGreaterThanOrEqual(5);

    const ids = presets.map((p) => p.id);
    expect(ids).toContain('analgesics_hplc');
    expect(ids).toContain('parabens_hplc');
    expect(ids).toContain('btex_gc');
  });

  it('calculates van Deemter parameters for packed HPLC and capillary GC columns', () => {
    const hplcCol = {
      name: 'Eclipse C18',
      length_mm: 150.0,
      inner_diameter_mm: 4.6,
      particle_size_um: 3.5,
      film_thickness_um: 0.25,
      stationary_phase: 'c18_octadecyl' as const,
      void_volume_ml: 1.45,
    };
    const hplcCond = {
      flow_rate_ml_min: 1.0,
      modality: 'hplc' as const,
      elution_mode: 'isocratic' as const,
      solvent_a_name: 'Water',
      solvent_b_name: 'Acetonitrile',
      organic_percent: 50.0,
      gradient_start_percent: 10.0,
      gradient_end_percent: 90.0,
      gradient_time_min: 15.0,
      temperature_c: 30.0,
      temp_ramp_rate_c_min: 10.0,
      final_temperature_c: 250.0,
      carrier_gas: 'Helium',
    };

    const vdHplc = chromatographyService.calculateVanDeemter(hplcCol, hplcCond);
    expect(vdHplc.term_a_um).toBeGreaterThan(0);
    expect(vdHplc.optimal_velocity_mm_s).toBeGreaterThan(0);
    expect(vdHplc.operating_plate_height_um).toBeGreaterThanOrEqual(vdHplc.minimum_plate_height_um);

    const gcCol = {
      name: 'Capillary DB-5',
      length_mm: 30000.0,
      inner_diameter_mm: 0.25,
      particle_size_um: 0.0,
      film_thickness_um: 0.25,
      stationary_phase: 'db_5_5_phenyl' as const,
      void_volume_ml: 1.2,
    };
    const gcCond = {
      ...hplcCond,
      modality: 'gc' as const,
      carrier_gas: 'Helium',
    };
    const vdGc = chromatographyService.calculateVanDeemter(gcCol, gcCond);
    // Open tubular Golay A term is 0
    expect(vdGc.term_a_um).toBe(0);
    expect(vdGc.optimal_velocity_mm_s).toBeGreaterThan(vdHplc.optimal_velocity_mm_s);
  });

  it('simulates OTC Analgesics HPLC separation with resolution and peak integration', async () => {
    const sim = await chromatographyService.getPresetSimulation('analgesics_hplc', 1.0, 45.0, 30.0);
    expect(sim.sample_name).toContain('Analgesics');
    expect(sim.modality).toBe('hplc');
    expect(sim.peaks.length).toBe(4);

    // Retention times should be sorted
    const trs = sim.peaks.map((p) => p.retention_time_min);
    expect(trs).toEqual([...trs].sort((a, b) => a - b));

    // Ibuprofen should elute last due to high hydrophobicity
    expect(sim.peaks[3].compound_id).toBe('ibuprofen');
    expect(sim.peaks[3].retention_time_min).toBeGreaterThan(sim.peaks[0].retention_time_min);
    expect(sim.chromatogram_trace.length).toBeGreaterThan(100);
  });

  it('simulates BTEX GC separation and temperature programming effects', async () => {
    const sim = await chromatographyService.getPresetSimulation('btex_gc');
    expect(sim.modality).toBe('gc');
    expect(sim.peaks.length).toBe(5);

    // Benzene elutes first, o-Xylene elutes last
    expect(sim.peaks[0].compound_id).toBe('benzene');
    expect(sim.peaks[4].compound_id).toBe('o_xylene');
    expect(sim.mean_theoretical_plates).toBeGreaterThan(1000);
  });
});
