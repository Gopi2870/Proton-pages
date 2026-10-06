export type NavigationPath =
  | 'dashboard'
  | 'explore'
  | 'periodic-table'
  | 'molecular-explorer'
  | 'reaction-engine'
  | 'virtual-lab'
  | 'ai-tutor'
  | 'learn-and-courses'
  | 'practice-and-quizzes'
  | 'assignments'
  | 'progress-and-analytics'
  | 'saved-formulas'
  | 'recent-sessions'
  | 'my-experiments'
  | 'help-and-documentation'
  | 'settings-and-preferences'
  | 'teacher-portal'
  | 'institution-portal';

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  streakDays: number;
  xpEarned: number;
  institution: string;
  department: string;
}
