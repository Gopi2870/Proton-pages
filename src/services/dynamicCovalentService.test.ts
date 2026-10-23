import { describe, it, expect } from 'vitest';
import { dynamicCovalentService } from './dynamicCovalentService';

describe('DynamicCovalentService Frontend Client', () => {
  it('retrieves curated dynamic covalent motifs and building blocks', async () => {
    const catalog = await dynamicCovalentService.getCatalog();
    expect(catalog.motifs.length).toBeGreaterThanOrEqual(4);
    expect(catalog.buildingBlocks.length).toBeGreaterThanOrEqual(6);
    expect(catalog.templates.length).toBeGreaterThanOrEqual(3);

    const motifIds = catalog.motifs.map((m) => m.id);
    expect(motifIds).toContain('imine_condensation');
    expect(motifIds).toContain('disulfide_exchange');
    expect(motifIds).toContain('boronate_ester');
  });

  it('simulates untemplated dynamic combinatorial library with diversity entropy', async () => {
    const res = await dynamicCovalentService.simulateDCL({
      motif_id: 'imine_condensation',
      building_block_concs_mM: { dialdehyde_A: 2.0, diamine_B: 2.0, monoamine_C: 1.0 },
      temperature_k: 298.15,
      ph: 6.5,
    });
    const result = res.result;

    expect(result.equilibriumConverged).toBe(true);
    expect(result.members.length).toBeGreaterThanOrEqual(4);
    expect(result.shannonDiversityEntropyUntemplated).toBeGreaterThan(0.5);
    expect(result.amplifiedMemberId).toBeNull();
  });

  it('triggers zinc(II) template constitutional selection and amplification', async () => {
    const res = await dynamicCovalentService.simulateDCL({
      motif_id: 'imine_condensation',
      building_block_concs_mM: { dialdehyde_A: 2.0, diamine_B: 2.0, monoamine_C: 1.0 },
      template_id: 'zinc_cation',
      template_concentration_mM: 2.0,
      temperature_k: 298.15,
      ph: 6.5,
    });
    const result = res.result;

    expect(result.amplifiedMemberId).toBe('macrocycle_2x2');
    expect(result.maxAmplificationFactor).toBeGreaterThan(1.2);

    const macro = result.members.find((m: { id: string }) => m.id === 'macrocycle_2x2');
    expect(macro).toBeDefined();
    expect(macro!.equilibriumFractionTemplated).toBeGreaterThan(
      macro!.equilibriumFractionUntemplated
    );
    expect(result.shannonDiversityEntropyTemplated).toBeLessThan(
      result.shannonDiversityEntropyUntemplated
    );
  });

  it('calculates thiol-disulfide exchange relaxation kinetics via RK4', async () => {
    const res = await dynamicCovalentService.calculateExchangeKinetics({
      motif_id: 'disulfide_exchange',
      initial_symmetric_1_mM: 5.0,
      initial_symmetric_2_mM: 5.0,
      initial_asymmetric_mM: 0.0,
      thiol_catalyst_conc_uM: 200.0,
      time_span_seconds: 3600.0,
      steps_count: 30,
    });
    const result = res.result;

    expect(result.halfLifeSeconds).toBeGreaterThan(0);
    expect(result.relaxationTimeTauSeconds).toBeGreaterThan(0);
    expect(result.trajectory.length).toBe(31);

    const finalSpecies = result.trajectory[result.trajectory.length - 1].speciesConcentrationsMM;
    expect(finalSpecies.asymmetric).toBeGreaterThan(1.0);
    expect(finalSpecies.symmetric_1).toBeLessThan(5.0);
  });

  it('simulates boronate ester pH-dependent equilibrium', async () => {
    const res = await dynamicCovalentService.simulateDCL({
      motif_id: 'boronate_ester',
      building_block_concs_mM: { catechol_F: 2.0, dialdehyde_A: 2.0 },
      temperature_k: 298.15,
      ph: 8.5,
    });
    expect(res.result.motif.id).toBe('boronate_ester');
    expect(res.result.members.length).toBeGreaterThanOrEqual(2);
  });
});
