/**
 * Education, Dashboards, and Governance API Client Service
 * Connects frontend views to backend FastAPI endpoints with full fallback support.
 */

import { apiClient } from './api';
import {
  StudentEnrollment,
  LabAssignment,
  LabSubmission,
  AdminUserRecord,
  AuditLogRecord,
  CampusTelemetry
} from '../types/education';

// ============================================================================
// Fallback Datasets for Offline and Resilient Operation
// ============================================================================

export const FALLBACK_STUDENT_ENROLLMENTS: StudentEnrollment[] = [
  {
    id: 'enr-101',
    courseId: 'crs-chem-101',
    courseCode: 'CHEM 101',
    courseTitle: 'General Chemistry & Quantitative Analysis',
    studentId: 'usr-elena-rostova',
    studentName: 'Elena Rostova',
    status: 'enrolled',
    progressPercent: 78.5,
    gradeLetter: 'A-',
    enrolledAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'enr-204',
    courseId: 'crs-chem-204',
    courseCode: 'CHEM 204',
    courseTitle: 'Organic Chemistry II: Stereochemistry & Synthesis',
    studentId: 'usr-elena-rostova',
    studentName: 'Elena Rostova',
    status: 'enrolled',
    progressPercent: 68.0,
    gradeLetter: 'B+',
    enrolledAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'enr-301',
    courseId: 'crs-chem-301',
    courseCode: 'CHEM 301',
    courseTitle: 'Physical Chemistry: Thermodynamics & Kinetics',
    studentId: 'usr-elena-rostova',
    studentName: 'Elena Rostova',
    status: 'enrolled',
    progressPercent: 91.2,
    gradeLetter: 'A',
    enrolledAt: '2026-09-01T08:00:00Z'
  }
];

export const FALLBACK_ASSIGNMENTS: LabAssignment[] = [
  {
    id: 'asg-titr-01',
    courseId: 'crs-chem-101',
    courseCode: 'CHEM 101',
    courseTitle: 'General Chemistry & Quantitative Analysis',
    title: 'Volumetric Titration: Standardization of NaOH & HCl',
    description: 'Determine exact analyte concentration with phenolphthalein colorimetric indicator.',
    experimentType: 'titration',
    maxPoints: 100,
    rubricJson: JSON.stringify({
      equivalencePointAccuracy: 40,
      pHCurveQuality: 30,
      experimentalErrorUnder3Pct: 30
    }),
    dueDate: '2026-10-24T23:59:59Z',
    submissionCount: 42,
    createdAt: '2026-10-01T10:00:00Z'
  },
  {
    id: 'asg-cal-02',
    courseId: 'crs-chem-301',
    courseCode: 'CHEM 301',
    courseTitle: 'Physical Chemistry: Thermodynamics & Kinetics',
    title: 'Calorimetry: Enthalpy of Solution & Bomb Combustion',
    description: 'Measure ΔHsol for ammonium nitrate and combustion heat for benzoic acid standard.',
    experimentType: 'calorimetry',
    maxPoints: 100,
    rubricJson: JSON.stringify({
      temperatureDeltaPrecision: 35,
      heatCapacityCorrection: 35,
      labNotebookCompleteness: 30
    }),
    dueDate: '2026-10-28T23:59:59Z',
    submissionCount: 38,
    createdAt: '2026-10-05T14:30:00Z'
  },
  {
    id: 'asg-mix-03',
    courseId: 'crs-chem-204',
    courseCode: 'CHEM 204',
    courseTitle: 'Organic Chemistry II: Stereochemistry & Synthesis',
    title: 'Nucleophilic Substitution & Solution Mixing Thermodynamics',
    description: 'Predict aqueous solubility and heat of mixing across polar and nonpolar solutes.',
    experimentType: 'mixer',
    maxPoints: 75,
    dueDate: '2026-11-04T23:59:59Z',
    submissionCount: 19,
    createdAt: '2026-10-10T09:00:00Z'
  }
];

export const FALLBACK_SUBMISSIONS: LabSubmission[] = [
  {
    id: 'sub-001',
    assignmentId: 'asg-titr-01',
    assignmentTitle: 'Volumetric Titration: Standardization of NaOH & HCl',
    studentId: 'usr-elena-rostova',
    studentName: 'Elena Rostova',
    experimentRecordId: 'exp-titr-551',
    submissionDataJson: JSON.stringify({
      titrantVolumeUsedMl: 24.95,
      analyteMolarityCalculated: 0.0998,
      indicatorEndpointColor: 'faint pink'
    }),
    status: 'graded',
    score: 98.0,
    maxPoints: 100,
    teacherFeedback: 'Excellent precision! Endpoint detected within 0.05 mL of theoretical equivalence.',
    submittedAt: '2026-10-14T16:22:10Z',
    gradedAt: '2026-10-15T09:15:00Z'
  },
  {
    id: 'sub-002',
    assignmentId: 'asg-cal-02',
    assignmentTitle: 'Calorimetry: Enthalpy of Solution & Bomb Combustion',
    studentId: 'usr-alex-chen',
    studentName: 'Alex Chen',
    experimentRecordId: 'exp-cal-902',
    submissionDataJson: JSON.stringify({
      measuredDeltaT: -3.85,
      calculatedDeltaHsol: 25.8
    }),
    status: 'submitted',
    maxPoints: 100,
    submittedAt: '2026-10-15T19:40:00Z'
  }
];

export const FALLBACK_ADMIN_USERS: AdminUserRecord[] = [
  {
    id: 'usr-admin-01',
    email: 'mendeleev@proton.edu',
    username: 'dean_mendeleev',
    fullName: 'Dean Dmitri Mendeleev',
    role: 'admin',
    institution: 'Proton Institute of Technology',
    department: 'School of Chemical Sciences',
    isActive: true,
    createdAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'usr-teacher-01',
    email: 'marie.curie@proton.edu',
    username: 'prof_curie',
    fullName: 'Prof. Marie Curie',
    role: 'teacher',
    institution: 'Proton Institute of Technology',
    department: 'Radiochemistry & Physical Chemistry',
    isActive: true,
    createdAt: '2026-08-15T00:00:00Z'
  },
  {
    id: 'usr-student-01',
    email: 'elena.rostova@proton.edu',
    username: 'elena_rostova',
    fullName: 'Elena Rostova',
    role: 'student',
    institution: 'Proton Institute of Technology',
    department: 'Biochemistry & Molecular Biophysics',
    isActive: true,
    createdAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'usr-student-02',
    email: 'alex.chen@proton.edu',
    username: 'alex_chen',
    fullName: 'Alex Chen',
    role: 'student',
    institution: 'Proton Institute of Technology',
    department: 'Chemical Engineering',
    isActive: true,
    createdAt: '2026-09-02T00:00:00Z'
  }
];

export const FALLBACK_AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: 'log-101',
    actorId: 'usr-admin-01',
    actorName: 'Dean Dmitri Mendeleev',
    action: 'role_update',
    targetType: 'user',
    targetId: 'usr-teacher-01',
    detailsJson: JSON.stringify({ previousRole: 'researcher', newRole: 'teacher' }),
    ipAddress: '192.168.1.10',
    createdAt: '2026-10-15T11:20:00Z'
  },
  {
    id: 'log-102',
    actorId: 'usr-admin-01',
    actorName: 'Dean Dmitri Mendeleev',
    action: 'seat_allocation_expand',
    targetType: 'campus',
    targetId: 'pit-chem-dept',
    detailsJson: JSON.stringify({ expandedSeats: 250, licenseType: 'enterprise_academic' }),
    ipAddress: '192.168.1.10',
    createdAt: '2026-10-14T09:00:00Z'
  }
];

export const FALLBACK_CAMPUS_STATS: CampusTelemetry = {
  totalUsers: 1980,
  studentSeatsAllocated: 1850,
  studentSeatsTotal: 2000,
  facultyCount: 42,
  activeCourses: 14,
  totalExperimentsRun: 142890,
  ferpaCompliant: true
};

// ============================================================================
// Education Service Implementation
// ============================================================================

export const educationService = {
  // --- Student Methods ---
  async getStudentCourses(): Promise<StudentEnrollment[]> {
    const res = await apiClient.get<StudentEnrollment[]>(
      '/education/student/courses',
      FALLBACK_STUDENT_ENROLLMENTS
    );
    return res.data;
  },

  async getStudentAssignments(courseId?: string): Promise<LabAssignment[]> {
    const endpoint = courseId
      ? `/education/assignments?course_id=${encodeURIComponent(courseId)}`
      : '/education/assignments';
    const res = await apiClient.get<LabAssignment[]>(endpoint, FALLBACK_ASSIGNMENTS);
    return res.data;
  },

  async submitLabAssignment(
    assignmentId: string,
    experimentRecordId?: string,
    submissionData?: Record<string, any>
  ): Promise<LabSubmission> {
    const fallbackSubmission: LabSubmission = {
      id: `sub-${Date.now()}`,
      assignmentId,
      studentId: 'usr-elena-rostova',
      studentName: 'Elena Rostova',
      experimentRecordId,
      submissionDataJson: submissionData ? JSON.stringify(submissionData) : undefined,
      status: 'submitted',
      maxPoints: 100,
      submittedAt: new Date().toISOString()
    };

    const res = await apiClient.post<
      { assignment_id: string; experiment_record_id?: string; submission_data_json?: string },
      LabSubmission
    >(
      '/education/submit',
      {
        assignment_id: assignmentId,
        experiment_record_id: experimentRecordId,
        submission_data_json: submissionData ? JSON.stringify(submissionData) : undefined
      },
      fallbackSubmission
    );
    return res.data;
  },

  // --- Teacher Methods ---
  async getTeacherCourses(): Promise<any[]> {
    const fallbackCourses = [
      {
        id: 'crs-chem-101',
        code: 'CHEM 101',
        title: 'General Chemistry & Quantitative Analysis',
        term: 'Fall 2026',
        student_count: 84,
        assignment_count: 5,
        instructor_id: 'usr-teacher-01'
      },
      {
        id: 'crs-chem-204',
        code: 'CHEM 204',
        title: 'Organic Chemistry II',
        term: 'Fall 2026',
        student_count: 58,
        assignment_count: 4,
        instructor_id: 'usr-teacher-01'
      }
    ];
    const res = await apiClient.get<any[]>('/education/teacher/courses', fallbackCourses);
    return res.data;
  },

  async createCourse(course: {
    code: string;
    title: string;
    description?: string;
    term?: string;
  }): Promise<any> {
    const fallback = {
      id: `crs-${Date.now()}`,
      ...course,
      term: course.term || 'Fall 2026',
      instructor_id: 'usr-teacher-01',
      created_at: new Date().toISOString()
    };
    const res = await apiClient.post<typeof course, any>(
      '/education/teacher/courses',
      course,
      fallback
    );
    return res.data;
  },

  async createAssignment(assignment: {
    course_id: string;
    title: string;
    description?: string;
    experiment_type: string;
    max_points: number;
    rubric_json?: string;
    due_date?: string;
  }): Promise<LabAssignment> {
    const fallback: LabAssignment = {
      id: `asg-${Date.now()}`,
      courseId: assignment.course_id,
      title: assignment.title,
      description: assignment.description,
      experimentType: assignment.experiment_type as any,
      maxPoints: assignment.max_points,
      rubricJson: assignment.rubric_json,
      dueDate: assignment.due_date,
      createdAt: new Date().toISOString()
    };
    const res = await apiClient.post<typeof assignment, LabAssignment>(
      '/education/assignments',
      assignment,
      fallback
    );
    return res.data;
  },

  async getTeacherSubmissions(assignmentId?: string): Promise<LabSubmission[]> {
    const endpoint = assignmentId
      ? `/education/submissions?assignment_id=${encodeURIComponent(assignmentId)}`
      : '/education/submissions';
    const res = await apiClient.get<LabSubmission[]>(endpoint, FALLBACK_SUBMISSIONS);
    return res.data;
  },

  async gradeSubmission(
    submissionId: string,
    score: number,
    feedback?: string,
    status: 'graded' | 'revision_requested' = 'graded'
  ): Promise<LabSubmission> {
    const fallback: LabSubmission = {
      ...FALLBACK_SUBMISSIONS[0],
      id: submissionId,
      score,
      teacherFeedback: feedback,
      status,
      gradedAt: new Date().toISOString()
    };

    const res = await apiClient.post<
      { score: number; teacher_feedback?: string; status: string },
      LabSubmission
    >(
      `/education/submissions/${submissionId}/grade`,
      {
        score,
        teacher_feedback: feedback,
        status
      },
      fallback
    );
    return res.data;
  },

  // --- Admin Governance & Telemetry Methods ---
  async getAdminUsers(): Promise<AdminUserRecord[]> {
    const res = await apiClient.get<AdminUserRecord[]>('/admin/users', FALLBACK_ADMIN_USERS);
    return res.data;
  },

  async updateUserRole(
    userId: string,
    role: 'student' | 'teacher' | 'researcher' | 'admin',
    institution?: string,
    department?: string
  ): Promise<AdminUserRecord> {
    const fallback: AdminUserRecord = {
      ...FALLBACK_ADMIN_USERS.find((u) => u.id === userId) || FALLBACK_ADMIN_USERS[0],
      role,
      institution,
      department
    };

    const res = await apiClient.patch<
      { role: string; institution?: string; department?: string },
      AdminUserRecord
    >(
      `/admin/users/${userId}/role`,
      { role, institution, department },
      fallback
    );
    return res.data;
  },

  async updateUserStatus(userId: string, isActive: boolean): Promise<AdminUserRecord> {
    const fallback: AdminUserRecord = {
      ...FALLBACK_ADMIN_USERS.find((u) => u.id === userId) || FALLBACK_ADMIN_USERS[0],
      isActive
    };

    const res = await apiClient.patch<{ is_active: boolean }, AdminUserRecord>(
      `/admin/users/${userId}/status`,
      { is_active: isActive },
      fallback
    );
    return res.data;
  },

  async getAuditLogs(limit = 50): Promise<AuditLogRecord[]> {
    const res = await apiClient.get<AuditLogRecord[]>(
      `/admin/audit-logs?limit=${limit}`,
      FALLBACK_AUDIT_LOGS
    );
    return res.data;
  },

  async getCampusStats(): Promise<CampusTelemetry> {
    const res = await apiClient.get<CampusTelemetry>('/admin/campus-stats', FALLBACK_CAMPUS_STATS);
    return res.data;
  }
};
