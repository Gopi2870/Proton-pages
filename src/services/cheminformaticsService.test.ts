import { describe, it, expect } from 'vitest';
import {
  cheminformaticsService,
  CURATED_LIBRARY,
  CURATED_FRAGMENTS
} from './cheminformaticsService';

describe('CheminformaticsService Frontend Client', () => {
  it('loads curated library and functional group fragments', async () => {
    const library = await cheminformaticsService.getLibrary();
    expect(library.length).toBeGreaterThanOrEqual(5);

    const fragments = await cheminformaticsService.getFragments();
    expect(fragments.length).toBeGreaterThanOrEqual(3);
  });

  it('computes Morgan circular fingerprint with active bits and environments', async () => {
    const aspirin = CURATED_LIBRARY.find((m) => m.id === 'aspirin')!;
    expect(aspirin).toBeDefined();

    const fp = await cheminformaticsService.computeFingerprint(aspirin, 2, 1024);
    expect(fp.active_bits.length).toBeGreaterThan(0);
    expect(fp.density).toBeGreaterThan(0);
    expect(fp.environments.length).toBeGreaterThan(0);

    // Verify bit indices are within range [0, 1024)
    fp.active_bits.forEach((bit) => {
      expect(bit).toBeGreaterThanOrEqual(0);
      expect(bit).toBeLessThan(1024);
    });
  });

  it('calculates self-similarity as 1.0 across all metrics', async () => {
    const caffeine = CURATED_LIBRARY.find((m) => m.id === 'paracetamol')!;
    const sim = await cheminformaticsService.calculateSimilarity(caffeine, caffeine);

    expect(sim.tanimoto).toBe(1.0);
    expect(sim.dice).toBe(1.0);
    expect(sim.cosine).toBe(1.0);
    expect(sim.tversky).toBe(1.0);
    expect(sim.euclidean_distance).toBe(0.0);
  });

  it('verifies chemical similarity symmetry: Sim(A, B) === Sim(B, A)', async () => {
    const aspirin = CURATED_LIBRARY.find((m) => m.id === 'aspirin')!;
    const ibuprofen = CURATED_LIBRARY.find((m) => m.id === 'ibuprofen')!;

    const simAB = await cheminformaticsService.calculateSimilarity(aspirin, ibuprofen);
    const simBA = await cheminformaticsService.calculateSimilarity(ibuprofen, aspirin);

    expect(simAB.tanimoto).toBe(simBA.tanimoto);
    expect(simAB.dice).toBe(simBA.dice);
    expect(simAB.cosine).toBe(simBA.cosine);
    expect(simAB.tanimoto).toBeGreaterThan(0);
    expect(simAB.tanimoto).toBeLessThan(1.0);
  });

  it('performs substructure search matching and detects atom highlights', async () => {
    const aspirin = CURATED_LIBRARY.find((m) => m.id === 'aspirin')!;
    const cooh = CURATED_FRAGMENTS.find((f) => f.id === 'frag_carboxylic_acid')!;

    const match = await cheminformaticsService.searchSubstructure(aspirin, cooh);
    expect(match.matched).toBe(true);
    expect(match.matched_target_atoms.length).toBeGreaterThanOrEqual(3);
  });

  it('generates symmetric similarity matrix with 1.0 on diagonal', async () => {
    const matrixRes = await cheminformaticsService.computeSimilarityMatrix(['aspirin', 'paracetamol', 'phenol']);
    expect(matrixRes.matrix.length).toBe(3);
    expect(matrixRes.matrix[0][0]).toBe(1.0);
    expect(matrixRes.matrix[1][1]).toBe(1.0);
    expect(matrixRes.matrix[2][2]).toBe(1.0);
    expect(matrixRes.matrix[0][1]).toBe(matrixRes.matrix[1][0]);
  });
});
