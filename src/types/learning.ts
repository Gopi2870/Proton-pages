export interface LessonItem {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  active?: boolean;
}

export interface ModuleItem {
  id: string;
  title: string;
  completedCount: number;
  totalCount: number;
  lessons: LessonItem[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  institution: string;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  activeModuleId: string;
  activeLessonId: string;
  modules: ModuleItem[];
}

export interface QuizQuestion {
  id: string;
  number: number;
  topic: string;
  subtopic: string;
  difficulty: 'Easy' | 'Medium' | 'Medium-High' | 'Advanced';
  points: number;
  prompt: string;
  mechanismTitle: string;
  solvent: string;
  temperature: string;
  options: {
    id: string;
    label: string;
    nomenclature: string;
    rationale: string;
    isCorrect: boolean;
  }[];
  hint: string;
}

export interface QuizAssessment {
  id: string;
  title: string;
  courseCode: string;
  totalQuestions: number;
  timeRemainingSeconds: number;
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  answeredQuestions: Record<string, string>; // questionId -> optionId
}
