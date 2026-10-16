import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  ClipboardCheck,
  TrendingUp,
  AlertTriangle,
  PlusCircle,
  Download,
  BookOpen,
  CheckCircle,
  FileText
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { educationService } from '../services/educationService';
import { LabAssignment, LabSubmission } from '../types/education';
import { TEACHER_COHORTS, STUDENT_ROSTER_DATA } from '../data/teacherData';

export const TeacherDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cohorts' | 'assignments' | 'grading' | 'roster'>('cohorts');
  const [courses, setCourses] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<LabAssignment[]>([]);
  const [submissions, setSubmissions] = useState<LabSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal States
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseTerm, setNewCourseTerm] = useState('Fall 2026');

  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);
  const [assignmentCourseId, setAssignmentCourseId] = useState('crs-chem-101');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentType, setAssignmentType] = useState<'titration' | 'calorimetry' | 'mixer' | 'thermo'>('titration');
  const [assignmentPoints, setAssignmentPoints] = useState(100);
  const [assignmentDueDate, setAssignmentDueDate] = useState('2026-11-15');

  // Grading Drawer State
  const [selectedSubmission, setSelectedSubmission] = useState<LabSubmission | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(100);
  const [gradeFeedback, setGradeFeedback] = useState<string>('');
  const [isGradingSubmitting, setIsGradingSubmitting] = useState(false);

  // Search & Filter
  const [rosterSearch, setRosterSearch] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [coursesRes, assignmentsRes, submissionsRes] = await Promise.all([
        educationService.getTeacherCourses(),
        educationService.getStudentAssignments(),
        educationService.getTeacherSubmissions(),
      ]);
      setCourses(coursesRes);
      setAssignments(assignmentsRes);
      setSubmissions(submissionsRes);
    } catch (err) {
      console.error('Error fetching teacher data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode.trim() || !newCourseTitle.trim()) return;
    try {
      const created = await educationService.createCourse({
        code: newCourseCode.trim(),
        title: newCourseTitle.trim(),
        term: newCourseTerm
      });
      setCourses((prev) => [created, ...prev]);
      setShowCreateCourseModal(false);
      setNewCourseCode('');
      setNewCourseTitle('');
    } catch (err) {
      console.error('Failed to create course:', err);
    }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentTitle.trim()) return;
    try {
      const rubric = {
        experimentalPrecision: Math.round(assignmentPoints * 0.4),
        theoreticalAnalysis: Math.round(assignmentPoints * 0.3),
        labNotebookQuality: Math.round(assignmentPoints * 0.3)
      };
      const created = await educationService.createAssignment({
        course_id: assignmentCourseId,
        title: assignmentTitle.trim(),
        description: assignmentDescription.trim(),
        experiment_type: assignmentType,
        max_points: Number(assignmentPoints),
        rubric_json: JSON.stringify(rubric),
        due_date: new Date(assignmentDueDate).toISOString()
      });
      setAssignments((prev) => [created, ...prev]);
      setShowCreateAssignmentModal(false);
      setAssignmentTitle('');
      setAssignmentDescription('');
    } catch (err) {
      console.error('Failed to create assignment:', err);
    }
  };

  const handleOpenGrading = (sub: LabSubmission) => {
    setSelectedSubmission(sub);
    setGradeScore(sub.score ?? sub.maxPoints);
    setGradeFeedback(sub.teacherFeedback ?? '');
  };

  const handleSaveGrade = async () => {
    if (!selectedSubmission) return;
    setIsGradingSubmitting(true);
    try {
      const updated = await educationService.gradeSubmission(
        selectedSubmission.id,
        gradeScore,
        gradeFeedback,
        'graded'
      );
      setSubmissions((prev) =>
        prev.map((s) => (s.id === updated.id ? { ...s, score: updated.score, teacherFeedback: updated.teacherFeedback, status: 'graded' } : s))
      );
      setSelectedSubmission(null);
    } catch (err) {
      console.error('Failed to submit grade:', err);
    } finally {
      setIsGradingSubmitting(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Student ID', 'Student Name', 'Assignment', 'Score', 'Max Points', 'Status', 'Submitted At'];
    const rows = submissions.map((s) => [
      s.studentId,
      s.studentName || 'Student',
      s.assignmentTitle || s.assignmentId,
      s.score ?? 'N/A',
      s.maxPoints,
      s.status,
      s.submittedAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map(item => `"${item}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Proton_Chemistry_Gradebook_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRoster = STUDENT_ROSTER_DATA.filter((s) =>
    !rosterSearch ||
    s.name.toLowerCase().includes(rosterSearch.toLowerCase()) ||
    s.email.toLowerCase().includes(rosterSearch.toLowerCase()) ||
    s.course.toLowerCase().includes(rosterSearch.toLowerCase())
  );

  return (
    <div className="p-space-md lg:p-space-xl max-w-7xl mx-auto space-y-space-lg">
      {/* Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-on-surface flex items-center gap-2">
              <GraduationCap className="w-7 h-7 text-primary" /> Educator Management Console
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-code-sm font-semibold">
              Faculty Auth: Active
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Real-time cohort performance telemetry, automated grading pipelines, and ACS chemistry mastery benchmarks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowCreateCourseModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface border border-surface-container-high transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-secondary" /> Add Course
          </button>
          <button
            onClick={() => setShowCreateAssignmentModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-primary text-on-primary hover:opacity-95 shadow-sm transition"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Create Assignment
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-surface-container-lowest hover:bg-surface-container border border-surface-container-high text-on-surface transition"
          >
            <Download className="w-3.5 h-3.5 text-outline" /> Export Gradebook CSV
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Enrolled Students" value="142" change="+12% this term" isPositive icon={<Users className="w-4 h-4" />} />
        <StatCard title="Mean Exam Score" value="84.6%" change="+3.2%" isPositive icon={<TrendingUp className="w-4 h-4" />} />
        <StatCard title="Lab Submissions" value={`${submissions.length} Total`} subtitle="Live Queue Synced" icon={<ClipboardCheck className="w-4 h-4 text-secondary" />} />
        <StatCard title="Intervention Needed" value="7 Students" change="Needs support" isPositive={false} icon={<AlertTriangle className="w-4 h-4 text-amber-500" />} />
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-surface-container-high gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('cohorts')}
          className={`px-4 py-2 text-label-md font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'cohorts' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Cohort Telemetry & ACS Alerts
        </button>
        <button
          onClick={() => setActiveTab('assignments')}
          className={`px-4 py-2 text-label-md font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'assignments' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Virtual Lab Assignments ({assignments.length})
        </button>
        <button
          onClick={() => setActiveTab('grading')}
          className={`px-4 py-2 text-label-md font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'grading' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Submissions & Grading Queue ({submissions.length})
        </button>
        <button
          onClick={() => setActiveTab('roster')}
          className={`px-4 py-2 text-label-md font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'roster' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Student Roster ({STUDENT_ROSTER_DATA.length})
        </button>
      </div>

      {/* Tab 1: Cohorts & Diagnostic Alerts */}
      {activeTab === 'cohorts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-5 space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-on-surface">Active Course Cohorts</h3>
              <span className="font-code-sm text-xs text-outline">{courses.length} Active Courses</span>
            </div>
            <div className="space-y-3">
              {TEACHER_COHORTS.map((c) => (
                <div key={c.id} className="p-3 bg-surface-container-low rounded-lg border border-surface-container flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-on-surface">{c.name}</div>
                    <div className="text-on-surface-variant text-[11px]">{c.enrolled} students • {c.term}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-secondary">{c.averageScore}%</div>
                    <div className="text-[10px] text-outline">{c.completionRate}% completed</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-semibold text-on-surface">Recent Automated Diagnostic Alerts</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-on-surface">
                <span className="font-semibold text-amber-600 dark:text-amber-400">Stereochemistry Quiz #4:</span> 34% of students confused enantiomer optical rotation inversion with diastereomer physical separation.
              </div>
              <div className="p-3 bg-secondary-fixed/50 border border-secondary-fixed rounded-lg text-on-surface">
                <span className="font-semibold text-secondary">Titration Rig Experiment:</span> 12 students overshot phenolphthalein endpoint by &gt; 1.5 mL titrant volume.
              </div>
              <div className="p-3 bg-primary-fixed/50 border border-primary-fixed rounded-lg text-on-surface">
                <span className="font-semibold text-primary">Haber-Bosch Equilibrium Problem:</span> High class comprehension (92% pass rate) on Le Chatelier temperature perturbations.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Assignments Authoring */}
      {activeTab === 'assignments' && (
        <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-on-surface">Published Syllabus Assignments</h3>
            <button
              onClick={() => setShowCreateAssignmentModal(true)}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" /> New Lab Assignment
            </button>
          </div>
          <div className="divide-y divide-surface-container-low">
            {assignments.map((asg) => (
              <div key={asg.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-[10px] font-semibold uppercase">
                      {asg.experimentType}
                    </span>
                    <span className="text-xs font-semibold text-primary">{asg.courseCode || asg.courseId}</span>
                    <span className="text-sm font-bold text-on-surface">{asg.title}</span>
                  </div>
                  {asg.description && (
                    <p className="text-xs text-on-surface-variant">{asg.description}</p>
                  )}
                  <div className="text-[11px] text-outline font-code-sm flex items-center gap-3">
                    <span>Worth: {asg.maxPoints} pts</span>
                    {asg.dueDate && <span>Due: {new Date(asg.dueDate).toLocaleDateString()}</span>}
                    <span>Submissions: {asg.submissionCount || 0}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('grading')}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition"
                  >
                    View Submissions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Submissions & Live Grading Queue */}
      {activeTab === 'grading' && (
        <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 bg-surface-container-low border-b border-surface-container-high flex justify-between items-center">
            <h3 className="text-sm font-semibold text-on-surface">Student Virtual Lab Submissions</h3>
            <span className="text-xs text-outline font-code-sm">{submissions.length} Submissions Loaded</span>
          </div>

          <div className="divide-y divide-surface-container-low">
            {submissions.map((sub) => (
              <div key={sub.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-container-low/50 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-on-surface">{sub.studentName || sub.studentId}</span>
                    <span className="text-xs text-outline">• {sub.assignmentTitle || sub.assignmentId}</span>
                  </div>
                  {sub.submissionDataJson && (
                    <div className="p-2 rounded bg-surface-container-lowest border border-surface-container-low text-[11px] font-code-sm text-on-surface-variant max-w-xl truncate">
                      Telemetry: {sub.submissionDataJson}
                    </div>
                  )}
                  <div className="text-[11px] text-outline flex items-center gap-4">
                    <span>Submitted: {new Date(sub.submittedAt).toLocaleString()}</span>
                    {sub.teacherFeedback && (
                      <span className="text-primary italic">Feedback: "{sub.teacherFeedback}"</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {sub.status === 'graded' ? (
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-xs font-bold">
                        {sub.score} / {sub.maxPoints} pts
                      </span>
                      <button
                        onClick={() => handleOpenGrading(sub)}
                        className="px-3 py-1 rounded bg-surface-container hover:bg-surface-container-high text-xs font-medium text-on-surface"
                      >
                        Regrade
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenGrading(sub)}
                      className="px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:opacity-95 text-xs font-semibold shadow-xs"
                    >
                      Grade Submission
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Student Roster Telemetry */}
      {activeTab === 'roster' && (
        <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-on-surface">Enrolled Student Cohort Roster</h3>
            <input
              type="text"
              placeholder="Search by student name, email, or course..."
              value={rosterSearch}
              onChange={(e) => setRosterSearch(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-72"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface-variant font-label-sm border-b border-surface-container">
                <tr>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Course</th>
                  <th className="py-2.5 px-3">Mastery Score</th>
                  <th className="py-2.5 px-3">Lab Hours</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Weak Topics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {filteredRoster.map((st) => (
                  <tr key={st.id} className="hover:bg-surface-container-low/40">
                    <td className="py-2.5 px-3 font-semibold text-on-surface">{st.name}</td>
                    <td className="py-2.5 px-3 text-on-surface-variant">{st.course}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-primary">{st.masteryScore}%</td>
                    <td className="py-2.5 px-3 text-outline">{st.labHours} hrs</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full font-code-sm text-[10px] font-semibold ${
                        st.status === 'Proficient' ? 'bg-secondary-fixed text-on-secondary-fixed-variant' :
                        st.status === 'On Track' ? 'bg-primary-fixed text-on-primary-fixed' :
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        {st.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-outline truncate max-w-xs">{st.weakTopics.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Create Course */}
      {showCreateCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-surface-container-lowest border border-surface-container rounded-xl p-6 max-w-md w-full shadow-lg space-y-4">
            <h3 className="text-lg font-bold text-on-surface">Create New Academic Course</h3>
            <form onSubmit={handleCreateCourse} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Course Code</label>
                <input
                  type="text"
                  placeholder="e.g. CHEM-302"
                  value={newCourseCode}
                  onChange={(e) => setNewCourseCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Course Title</label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Quantum Chemistry & Spectroscopy"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Academic Term</label>
                <input
                  type="text"
                  value={newCourseTerm}
                  onChange={(e) => setNewCourseTerm(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateCourseModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-95"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Virtual Lab Assignment */}
      {showCreateAssignmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-surface-container-lowest border border-surface-container rounded-xl p-6 max-w-lg w-full shadow-lg space-y-4">
            <h3 className="text-lg font-bold text-on-surface">Author Virtual Lab Assignment</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Target Course</label>
                <select
                  value={assignmentCourseId}
                  onChange={(e) => setAssignmentCourseId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code}: {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Assignment Title</label>
                <input
                  type="text"
                  placeholder="e.g. Endothermic Calorimetry of Ammonium Salts"
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Laboratory Apparatus Rig</label>
                <select
                  value={assignmentType}
                  onChange={(e) => setAssignmentType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="titration">Volumetric Titration Rig (Buret & pH Probe)</option>
                  <option value="calorimetry">Calorimetry Rig (Coffee-Cup & Bomb)</option>
                  <option value="mixer">Solution Chemical Mixer</option>
                  <option value="thermo">Hess's Law & Reaction Thermochemistry</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">Max Points</label>
                  <input
                    type="number"
                    value={assignmentPoints}
                    onChange={(e) => setAssignmentPoints(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    min="10"
                    max="500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">Due Date</label>
                  <input
                    type="date"
                    value={assignmentDueDate}
                    onChange={(e) => setAssignmentDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Description & Worksheet Prompts</label>
                <textarea
                  placeholder="State the objectives, required calibration steps, and expected precision benchmarks..."
                  value={assignmentDescription}
                  onChange={(e) => setAssignmentDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary h-20 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateAssignmentModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-95"
                >
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Drawer / Modal: Submission Review & Live Grading */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-surface-container-lowest border border-surface-container rounded-xl p-6 max-w-lg w-full shadow-lg space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-on-surface">Evaluate Lab Submission</h3>
                <p className="text-xs text-on-surface-variant">
                  {selectedSubmission.studentName || selectedSubmission.studentId} • {selectedSubmission.assignmentTitle}
                </p>
              </div>
              <span className="font-code-sm text-xs px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant uppercase">
                Max: {selectedSubmission.maxPoints} pts
              </span>
            </div>

            {selectedSubmission.submissionDataJson && (
              <div className="p-3 bg-surface-container-low rounded-lg space-y-1">
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                  Submitted Telemetry & Experimental Record
                </span>
                <pre className="font-code-sm text-xs text-on-surface whitespace-pre-wrap break-all">
                  {selectedSubmission.submissionDataJson}
                </pre>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Assigned Score (0 - {selectedSubmission.maxPoints})
                </label>
                <input
                  type="number"
                  value={gradeScore}
                  onChange={(e) => setGradeScore(Number(e.target.value))}
                  min="0"
                  max={selectedSubmission.maxPoints}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container text-sm font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Qualitative Feedback & Corrections
                </label>
                <textarea
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  placeholder="e.g. Endpoint detection was within 0.05 mL. Solid stoichiometry calculation."
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary h-24 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-surface-container-low">
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveGrade}
                disabled={isGradingSubmitting}
                className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-95 disabled:opacity-50"
              >
                {isGradingSubmitting ? 'Saving...' : 'Save & Post Grade'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
