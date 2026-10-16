import { describe, it, expect } from 'vitest';
import { educationService } from './educationService';

describe('EducationService Frontend Client', () => {
  it('fetches student courses and enrollments via fallback', async () => {
    const courses = await educationService.getStudentCourses();
    expect(courses).toBeDefined();
    expect(courses.length).toBeGreaterThanOrEqual(1);
    expect(courses[0].courseCode).toBe('CHEM 101');
    expect(courses[0].studentName).toBe('Elena Rostova');
    expect(courses[0].status).toBe('enrolled');
  });

  it('fetches student lab assignments with filtering support', async () => {
    const assignments = await educationService.getStudentAssignments();
    expect(assignments).toBeDefined();
    expect(assignments.length).toBeGreaterThanOrEqual(2);
    expect(assignments[0].experimentType).toBe('titration');
    expect(assignments[0].maxPoints).toBe(100);
  });

  it('submits a virtual laboratory assignment record', async () => {
    const submission = await educationService.submitLabAssignment('asg-titr-01', 'exp-500', {
      analyteMolarity: 0.1002,
      equivalenceVolume: 25.04
    });
    expect(submission).toBeDefined();
    expect(submission.assignmentId).toBe('asg-titr-01');
    expect(submission.status).toBe('submitted');
  });

  it('fetches teacher cohorts, assignments, and allows grading', async () => {
    const teacherCourses = await educationService.getTeacherCourses();
    expect(teacherCourses.length).toBeGreaterThanOrEqual(1);

    const submissions = await educationService.getTeacherSubmissions();
    expect(submissions.length).toBeGreaterThanOrEqual(1);

    const graded = await educationService.gradeSubmission('sub-002', 95.0, 'Solid thermodynamic calculations.');
    expect(graded.score).toBe(95.0);
    expect(graded.teacherFeedback).toContain('thermodynamic');
  });

  it('fetches administrative user roster and telemetry', async () => {
    const users = await educationService.getAdminUsers();
    expect(users.length).toBeGreaterThanOrEqual(3);
    expect(users.some((u) => u.role === 'admin')).toBe(true);

    const updated = await educationService.updateUserRole('usr-student-02', 'researcher');
    expect(updated.role).toBe('researcher');

    const campusStats = await educationService.getCampusStats();
    expect(campusStats.studentSeatsTotal).toBeGreaterThan(1000);
    expect(campusStats.ferpaCompliant).toBe(true);

    const auditLogs = await educationService.getAuditLogs();
    expect(auditLogs.length).toBeGreaterThanOrEqual(1);
    expect(auditLogs[0].action).toBeDefined();
  });
});
