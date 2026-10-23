import { describe, it, expect } from 'vitest';
import { EducationProblemService } from './educationProblemService';

describe('EducationProblemService Frontend Client', () => {
  it('fetches problem summaries list with category and search filter', async () => {
    const all = await EducationProblemService.fetchProblemList();
    expect(all.length).toBeGreaterThanOrEqual(3);

    const phys = await EducationProblemService.fetchProblemList({ category: 'Physical Chemistry' });
    expect(phys.length).toBeGreaterThanOrEqual(1);
    expect(phys[0].category).toBe('Physical Chemistry');

    const search = await EducationProblemService.fetchProblemList({ search: 'Arrhenius' });
    expect(search.length).toBe(1);
    expect(search[0].id).toBe('prob-kin-001');
  });

  it('fetches problem detail and verifies structured step schemas', async () => {
    const detail = await EducationProblemService.fetchProblemDetail('prob-elec-001');
    expect(detail.id).toBe('prob-elec-001');
    expect(detail.reference_unit).toBe('V');
    expect(detail.steps.length).toBe(4);
    expect(detail.hints.length).toBeGreaterThanOrEqual(2);
    expect(detail.rubric.length).toBe(4);
  });

  it('evaluates perfect answer submission with full step scoring', async () => {
    const res = await EducationProblemService.verifySolution('prob-phys-001', {
      final_answer: 42.26,
      final_unit: 'kJ/mol',
      step_submissions: [
        { step_number: 1, submitted_value: 2.0837, submitted_unit: 'dimensionless' },
        { step_number: 2, submitted_value: -0.00040995, submitted_unit: 'K^-1' },
        { step_number: 3, submitted_value: 42261.0, submitted_unit: 'J/mol' },
        { step_number: 4, submitted_value: 42.26, submitted_unit: 'kJ/mol' },
      ],
      revealed_hint_tiers: [],
    });

    expect(res.is_correct).toBe(true);
    expect(res.score_percentage).toBe(100.0);
    expect(res.error_percentage).toBeLessThan(0.1);
    expect(res.step_results.length).toBe(4);
    expect(res.step_results.every((s) => s.is_correct)).toBe(true);
  });

  it('evaluates incorrect answer and applies hint penalty correctly', async () => {
    const res = await EducationProblemService.verifySolution('prob-phys-001', {
      final_answer: 50.0,
      final_unit: 'kJ/mol',
      step_submissions: [],
      revealed_hint_tiers: [2, 3], // 10% + 20% penalty
    });

    expect(res.is_correct).toBe(false);
    expect(res.error_percentage).toBeGreaterThan(10);
    expect(res.score_percentage).toBe(0);
  });
});
