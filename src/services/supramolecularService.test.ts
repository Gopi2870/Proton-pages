import { describe, it, expect } from 'vitest';
import {
  supramolecularService,
  CURATED_HOSTS,
  CURATED_GUESTS,
} from './supramolecularService';

describe('SupramolecularService Frontend Client', () => {
  it('loads curated hosts and guests catalog', () => {
    expect(CURATED_HOSTS.length).toBeGreaterThanOrEqual(6);
    expect(CURATED_GUESTS.length).toBeGreaterThanOrEqual(6);

    const hostIds = supramolecularService.getCuratedHosts().map((h) => h.id);
    expect(hostIds).toContain('18_crown_6');
    expect(hostIds).toContain('cryptand_222');
    expect(hostIds).toContain('beta_cyclodextrin');

    const guestIds = supramolecularService.getCuratedGuests().map((g) => g.id);
    expect(guestIds).toContain('potassium_cation');
    expect(guestIds).toContain('adamantanecarboxylate');
  });

  it('demonstrates crown ether size selectivity for potassium with 18-crown-6', () => {
    const kRes = supramolecularService.evaluateHostGuestSystem('18_crown_6', 'potassium_cation');
    const naRes = supramolecularService.evaluateHostGuestSystem('18_crown_6', 'sodium_cation');
    const liRes = supramolecularService.evaluateHostGuestSystem('18_crown_6', 'lithium_cation');

    expect(kRes.ka).toBeGreaterThan(naRes.ka);
    expect(naRes.ka).toBeGreaterThan(liRes.ka);
    expect(kRes.decomp.cavitySizeMatchRatio).toBeCloseTo(0.985, 2);
  });

  it('exhibits astronomical cryptate effect for Cryptand [2.2.2] over 18-crown-6', () => {
    const crownRes = supramolecularService.evaluateHostGuestSystem('18_crown_6', 'potassium_cation');
    const cryptRes = supramolecularService.evaluateHostGuestSystem('cryptand_222', 'potassium_cation');

    expect(Math.log10(cryptRes.ka)).toBeGreaterThanOrEqual(9.0);
    expect(cryptRes.ka).toBeGreaterThan(crownRes.ka * 1000.0);
    expect(cryptRes.decomp.ionDipoleElectrostaticKjMol).toBeLessThan(-50.0);
  });

  it('demonstrates hydrophobic desolvation driving cyclodextrin inclusion', () => {
    const cdRes = supramolecularService.evaluateHostGuestSystem('beta_cyclodextrin', 'adamantanecarboxylate');
    expect(Math.log10(cdRes.ka)).toBeGreaterThanOrEqual(4.5);
    expect(cdRes.decomp.hydrophobicDesolvationKjMol).toBeLessThan(-10.0);
  });

  it('identifies 1:1 binding stoichiometry via Jobs continuous variation plot', () => {
    const jobRes = supramolecularService.generateJobPlotLocally({
      hostId: '18_crown_6',
      guestId: 'potassium_cation',
      totalConcentrationMM: 1.0,
      pointsCount: 21,
      temperatureK: 298.15,
    });

    expect(jobRes.result.determinedStoichiometry).toBe('1:1');
    expect(jobRes.result.peakMoleFraction).toBeCloseTo(0.5, 1);
    expect(jobRes.result.points.length).toBe(21);
    expect(jobRes.result.points[0].complexConcMM).toBe(0);
    expect(jobRes.result.points[20].complexConcMM).toBe(0);
  });

  it('simulates binding isotherm with mass conservation and fractional saturation', () => {
    const bindRes = supramolecularService.simulateBindingLocally({
      hostId: 'beta_cyclodextrin',
      guestId: 'adamantanecarboxylate',
      hostInitialConcMM: 0.5,
      guestMaxConcMM: 3.0,
      temperatureK: 298.15,
      titrationSteps: 20,
    });

    expect(bindRes.system.associationConstantKaMInv).toBeGreaterThan(1000.0);
    expect(bindRes.system.gibbsFreeEnergyDeltaGKjMol).toBeLessThan(0.0);
    expect(bindRes.system.isothermPoints.length).toBe(20);

    for (const pt of bindRes.system.isothermPoints) {
      expect(pt.boundComplexMM).toBeLessThanOrEqual(0.501);
      expect(pt.fractionBound).toBeLessThanOrEqual(1.001);
    }
  });

  it('handles validation errors for invalid inputs', () => {
    expect(() =>
      supramolecularService.generateJobPlotLocally({
        hostId: '18_crown_6',
        guestId: 'potassium_cation',
        totalConcentrationMM: -2.0,
        pointsCount: 21,
        temperatureK: 298.15,
      })
    ).toThrow('positive');

    expect(() =>
      supramolecularService.simulateBindingLocally({
        hostId: '18_crown_6',
        guestId: 'potassium_cation',
        hostInitialConcMM: -1.0,
        guestMaxConcMM: 2.0,
        temperatureK: 298.15,
        titrationSteps: 20,
      })
    ).toThrow('positive');
  });
});
