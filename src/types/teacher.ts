export interface StudentProgressRecord {
  id: string;
  name: string;
  email: string;
  avatar: string;
  course: string;
  masteryScore: number;
  labHours: number;
  lastActive: string;
  status: 'Proficient' | 'On Track' | 'Intervention Required' | 'Review Needed';
  weakTopics: string[];
}

export interface TeacherPortalMetrics {
  enrolledStudents: number;
  activeStudentsToday: number;
  averageMastery: number;
  percentileRank: string;
  simulatedLabHours: number;
  topLabModules: string[];
  interventionQueueCount: number;
}
