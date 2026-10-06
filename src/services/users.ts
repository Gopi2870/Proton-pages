import { apiClient } from './api';
import { UserProfile } from '../types/navigation';
import { StudentProgressRecord, TeacherPortalMetrics } from '../types/teacher';
import { STUDENT_ROSTER_DATA, TEACHER_PORTAL_METRICS } from '../data/teacherData';

export const CURRENT_USER: UserProfile = {
  id: 'usr-elena-rostova',
  name: 'Elena Rostova',
  role: 'Biochem Student (Year 3)',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChKSj7fI-Bz8bA3XtvzyDasZouiZIX9BB8tuEbNQqkeh_r9cdDLNJ_VdS2lyvEcOeHn0gjfbq0J6zOzwsS8VDsUBu43BD1OU_MOJgbREb-VtoIL12bA_2sW88s-SZRl9bgOoFdC2EMQqanaxUSYL6Qe_XnoIDOvgtHTJrY1aQiglNAkyx7xZm11ApBLOpNZNUf01kvQvut8M5_Bw-7GiRpdOc8WaIK1rPP1EhLN92UIe4AhamROij1',
  streakDays: 14,
  xpEarned: 850,
  institution: 'MIT Department of Chemistry',
  department: 'Biochemistry & Molecular Biophysics'
};

export const usersService = {
  async getCurrentUser(): Promise<UserProfile> {
    const res = await apiClient.get<UserProfile>('/users/me', CURRENT_USER);
    return res.data;
  },

  async getTeacherMetrics(): Promise<TeacherPortalMetrics> {
    const res = await apiClient.get<TeacherPortalMetrics>('/teacher/metrics', TEACHER_PORTAL_METRICS);
    return res.data;
  },

  async getStudentRoster(): Promise<StudentProgressRecord[]> {
    const res = await apiClient.get<StudentProgressRecord[]>('/teacher/students', STUDENT_ROSTER_DATA);
    return res.data;
  }
};
