/**
 * Education, Dashboards, and Governance Data Types
 */

export interface StudentEnrollment {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  studentId: string;
  studentName?: string;
  status: 'enrolled' | 'completed' | 'dropped';
  progressPercent: number;
  gradeLetter?: string;
  enrolledAt: string;
}

export interface LabAssignment {
  id: string;
  courseId: string;
  courseCode?: string;
  courseTitle?: string;
  title: string;
  description?: string;
  experimentType: 'titration' | 'calorimetry' | 'mixer' | 'thermo';
  maxPoints: number;
  rubricJson?: string;
  dueDate?: string;
  submissionCount?: number;
  createdAt: string;
}

export interface LabSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle?: string;
  studentId: string;
  studentName?: string;
  experimentRecordId?: string;
  submissionDataJson?: string;
  status: 'submitted' | 'graded' | 'revision_requested';
  score?: number;
  maxPoints: number;
  teacherFeedback?: string;
  submittedAt: string;
  gradedAt?: string;
}

export interface AdminUserRecord {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: 'student' | 'teacher' | 'researcher' | 'admin';
  institution?: string;
  department?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuditLogRecord {
  id: string;
  actorId: string;
  actorName?: string;
  action: string;
  targetType: string;
  targetId: string;
  detailsJson?: string;
  ipAddress?: string;
  createdAt: string;
}

export interface CampusTelemetry {
  totalUsers: number;
  studentSeatsAllocated: number;
  studentSeatsTotal: number;
  facultyCount: number;
  activeCourses: number;
  totalExperimentsRun: number;
  ferpaCompliant: boolean;
}
