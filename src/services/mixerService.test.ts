import { describe, it, expect } from 'vitest';
import { MixerService } from './mixerService';

describe('MixerService Suite', () => {
  it('handles empty reaction vessel', () => {
    const res = MixerService.computeLocalSimulation([]);
    expect(res.total_volume_ml).toBe(0);
    expect(res.final_ph).toBe(7.0);
    expect(res.precipitates).toHaveLength(0);
  });

  it('correctly calculates logarithmic pH and temperature rise for acid-base neutralization', () => {
    const res = MixerService.computeLocalSimulation([
      { name: 'Hydrochloric Acid', formula: 'HCl (aq)', volume_ml: 50, concentration_m: 1.0 },
      { name: 'Sodium Hydroxide', formula: 'NaOH (aq)', volume_ml: 50, concentration_m: 1.0 }
    ]);
    expect(res.total_volume_ml).toBe(100);
    expect(res.final_ph).toBe(7.0);
    expect(res.is_exothermic).toBe(true);
    expect(res.delta_temperature_c).toBeGreaterThan(0);
    expect(res.net_ionic_equation).toContain('H+(aq) + OH-(aq) -> H2O(l)');
  });

  it('identifies Silver Chloride curdy white precipitate', () => {
    const res = MixerService.computeLocalSimulation([
      { name: 'Silver Nitrate', formula: 'AgNO3 (aq)', volume_ml: 25, concentration_m: 0.1 },
      { name: 'Sodium Chloride', formula: 'NaCl (aq)', volume_ml: 25, concentration_m: 0.1 }
    ]);
    expect(res.precipitates).toHaveLength(1);
    expect(res.precipitates[0].formula).toBe('AgCl(s)');
    expect(res.precipitates[0].color).toContain('white');
  });

  it('detects effervescence with carbonate and acid', () => {
    const res = MixerService.computeLocalSimulation([
      { name: 'Sodium Carbonate', formula: 'Na2CO3 (aq)', volume_ml: 20, concentration_m: 0.5 },
      { name: 'Hydrochloric Acid', formula: 'HCl (aq)', volume_ml: 20, concentration_m: 1.0 }
    ]);
    expect(res.gases).toHaveLength(1);
    expect(res.gases[0].formula).toBe('CO2(g)');
  });
});
