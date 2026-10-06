import { apiClient } from './api';
import { Course, QuizAssessment } from '../types/learning';
import { COURSES_DATA } from '../data/coursesData';
import { QUIZ_ASSESSMENT_DATA } from '../data/quizData';

export const learningService = {
  async getCourses(): Promise<Course[]> {
    const res = await apiClient.get<Course[]>('/courses', COURSES_DATA);
    return res.data;
  },

  async getCourseById(id: string): Promise<Course | undefined> {
    const courses = await this.getCourses();
    return courses.find((c) => c.id === id);
  },

  async getQuizAssessment(quizId = 'quiz-sn2-mechanisms'): Promise<QuizAssessment> {
    const res = await apiClient.get<QuizAssessment>(`/quizzes/${quizId}`, QUIZ_ASSESSMENT_DATA);
    return res.data;
  },

  async submitQuizAnswer(quizId: string, questionId: string, optionId: string): Promise<{ success: boolean; scoreDelta: number }> {
    const res = await apiClient.post(`/quizzes/${quizId}/answer`, { questionId, optionId }, {
      success: true,
      scoreDelta: 10
    });
    return res.data;
  }
};
