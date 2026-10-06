import { TEACHER_COHORTS, TEACHER_STUDENTS } from '../data/teacherData';

export class ComprehensiveAnalyticsService {
  static getCohortSummary() {
    const totalStudents = TEACHER_COHORTS.reduce((acc: number, c) => acc + c.enrolled, 0);
    const meanScore = TEACHER_COHORTS.reduce((acc: number, c) => acc + c.averageScore, 0) / TEACHER_COHORTS.length;
    return { totalStudents, meanScore: Number(meanScore.toFixed(1)) };
  }

  static getAtRiskStudents() {
    return TEACHER_STUDENTS.filter((s) => s.grade < 75);
  }
}
