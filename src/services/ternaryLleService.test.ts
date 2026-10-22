import { describe, it, expect } from 'vitest';
import {
  TernaryLleService,
  ternaryToCartesian,
  cartesianToTernary,
  FALLBACK_SYSTEMS,
} from './ternaryLleService';

describe('TernaryLleService Frontend Suite', () => {
  it('correctly projects ternary compositions to equilateral Cartesian coordinates', () => {
    // Vertex A: (1, 0, 0) -> (0, 0)
    const [ax, ay] = ternaryToCartesian({ x_a: 1.0, x_b: 0.0, x_c: 0.0 });
    expect(ax).toBeCloseTo(0.0, 5);
    expect(ay).toBeCloseTo(0.0, 5);

    // Vertex B: (0, 1, 0) -> (1, 0)
    const [bx, by] = ternaryToCartesian({ x_a: 0.0, x_b: 1.0, x_c: 0.0 });
    expect(bx).toBeCloseTo(1.0, 5);
    expect(by).toBeCloseTo(0.0, 5);

    // Vertex C: (0, 0, 1) -> (0.5, sqrt(3)/2)
    const [cx, cy] = ternaryToCartesian({ x_a: 0.0, x_b: 0.0, x_c: 1.0 });
    expect(cx).toBeCloseTo(0.5, 5);
    expect(cy).toBeCloseTo(Math.sqrt(3) / 2, 5);
  });

  it('inverts Cartesian coordinates back to ternary mole fractions', () => {
    const orig = { x_a: 0.4, x_b: 0.35, x_c: 0.25 };
    const [x, y] = ternaryToCartesian(orig);
    const [invA, invB, invC] = cartesianToTernary(x, y);

    expect(invA).toBeCloseTo(orig.x_a, 4);
    expect(invB).toBeCloseTo(orig.x_b, 4);
    expect(invC).toBeCloseTo(orig.x_c, 4);
    expect(invA + invB + invC).toBeCloseTo(1.0, 4);
  });

  it('retrieves fallback system presets when backend is offline', async () => {
    const systems = await TernaryLleService.getSystems();
    expect(systems.length).toBeGreaterThanOrEqual(2);
    const ids = systems.map((s) => s.id);
    expect(ids).toContain('water_toluene_acetic_acid');
    expect(ids).toContain('water_mibk_acetone');
  });

  it('fetches system details with valid Hand and Othmer-Tobias correlations', async () => {
    const detail = await TernaryLleService.getSystemDetail('water_toluene_acetic_acid');
    expect(detail.id).toBe('water_toluene_acetic_acid');
    expect(detail.binodal_curve.length).toBeGreaterThan(10);
    expect(detail.tie_lines.length).toBeGreaterThanOrEqual(5);
    expect(detail.hand_correlation.r_squared).toBeGreaterThanOrEqual(0.95);
    expect(detail.othmer_tobias_correlation.r_squared).toBeGreaterThanOrEqual(0.95);
  });

  it('simulates Hunter-Nash multistage countercurrent extraction with fallback engine', async () => {
    const res = await TernaryLleService.simulateHunterNash({
      system_id: 'water_toluene_acetic_acid',
      feed_rate_kg_h: 1000,
      feed_x_carrier: 0.7,
      feed_x_solvent: 0.0,
      feed_x_solute: 0.3,
      solvent_rate_kg_h: 1200,
      solvent_x_carrier: 0.0,
      solvent_x_solvent: 1.0,
      solvent_x_solute: 0.0,
      target_raffinate_solute_fraction: 0.05,
    });

    expect(res.system_id).toBe('water_toluene_acetic_acid');
    expect(res.theoretical_stages_count).toBeGreaterThanOrEqual(1);
    expect(res.stages.length).toBe(res.theoretical_stages_count);
    expect(res.solute_recovery_percent).toBeGreaterThan(70);
    expect(res.extract_rate_kg_h).toBeGreaterThan(0);
    expect(res.raffinate_rate_kg_h).toBeGreaterThan(0);
    expect(res.stages[res.stages.length - 1].raffinate.x_c).toBeLessThanOrEqual(0.06);
    expect(res.pedagogical_summary).toContain('Hunter-Nash');
  });
});
