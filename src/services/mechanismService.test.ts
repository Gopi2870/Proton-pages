import { describe, it, expect } from 'vitest';
import { mechanismService } from './mechanismService';

describe('MechanismService Frontend Client', () => {
  it('loads organic reaction mechanism presets with fallback availability', async () => {
    const list = await mechanismService.getMechanisms();
    expect(list.length).toBeGreaterThanOrEqual(4);

    const sn2 = list.find((m) => m.id === 'sn2_bromoethane');
    expect(sn2).toBeDefined();
    expect(sn2?.mechanism_class).toBe('SN2');
    expect(sn2?.stereochemical_outcome).toBe('inversion_walden');
  });

  it('retrieves detailed mechanism with steps and curved arrows', async () => {
    const mech = await mechanismService.getMechanismById('sn2_bromoethane');
    expect(mech).toBeDefined();
    expect(mech.steps.length).toBe(1);

    const step = mech.steps[0];
    expect(step.curved_arrows.length).toBe(2);
    expect(step.activation_energy_kj_mol).toBeGreaterThan(50.0);
    expect(step.intermediate_type).toBe('transition_state');
  });

  it('retrieves multi-step unimolecular SN1 mechanism with distinct intermediates', async () => {
    const sn1 = await mechanismService.getMechanismById('sn1_tertbutyl_chloride');
    expect(sn1).toBeDefined();
    expect(sn1.steps.length).toBe(3);
    expect(sn1.steps[0].intermediate_type).toBe('carbocation');
    expect(sn1.steps[1].intermediate_type).toBe('oxonium');
  });

  it('interpolates reaction coordinate free energy landscape', async () => {
    const points = [
      { reaction_coordinate: 0.0, gibbs_free_energy_kj_mol: 0.0, point_type: 'ground_state', label: 'R' },
      { reaction_coordinate: 0.5, gibbs_free_energy_kj_mol: 75.0, point_type: 'transition_state', label: 'TS' },
      { reaction_coordinate: 1.0, gibbs_free_energy_kj_mol: -45.0, point_type: 'ground_state', label: 'P' },
    ];

    const res = await mechanismService.interpolateEnergyProfile(points, 25);
    expect(res.coordinate_grid.length).toBe(25);
    expect(res.gibbs_energy_curve.length).toBe(25);
    expect(res.transition_state_peaks.length).toBe(1);
    expect(res.gibbs_energy_curve[0]).toBe(0.0);
    expect(res.gibbs_energy_curve[res.gibbs_energy_curve.length - 1]).toBe(-45.0);
  });
});
