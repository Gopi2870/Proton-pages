import React, { useState, useEffect } from 'react';
import { NavigationPath, UserProfile } from '../types/navigation';
import { educationService } from '../services/educationService';
import { StudentEnrollment, LabAssignment } from '../types/education';
import { experimentsApi, VirtualExperimentItem, bookmarksApi, ChemicalBookmarkItem } from '../services/api';

interface DashboardPageProps {
  user: UserProfile;
  onNavigate: (path: NavigationPath, meta?: any) => void;
  onOpenSearch: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  onNavigate,
  onOpenSearch,
}) => {
  const [courses, setCourses] = useState<StudentEnrollment[]>([]);
  const [assignments, setAssignments] = useState<LabAssignment[]>([]);
  const [experiments, setExperiments] = useState<VirtualExperimentItem[]>([]);
  const [bookmarks, setBookmarks] = useState<ChemicalBookmarkItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const [coursesData, assignmentsData, experimentsData, bookmarksData] = await Promise.all([
        educationService.getStudentCourses(),
        educationService.getStudentAssignments(),
        experimentsApi.getExperiments(),
        bookmarksApi.getBookmarks(),
      ]);
      setCourses(coursesData);
      setAssignments(assignmentsData);
      setExperiments(experimentsData);
      setBookmarks(bookmarksData);
    } catch (err: any) {
      console.error('Failed to load dashboard data:', err);
      setLoadError('Failed to synchronize cloud telemetry. Using cached workspace data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const pendingAssignments = assignments.filter((a) => !a.submissionCount || a.submissionCount < 50);

  return (
    <div className="flex flex-col w-full p-space-md lg:p-space-xl space-y-space-xl">
      {/* 1. Welcome & Daily Briefing Banner matching Stitch */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-surface-container-high via-surface-container-low to-surface-container p-space-lg shadow-sm border border-surface-container-high">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-20 w-72 h-72 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-space-lg">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface shadow-xs">
                <span
                  className="material-symbols-outlined text-[16px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
                <span className="font-code-sm text-code-sm font-semibold tracking-wide">
                  {user.streakDays}-DAY STREAK
                </span>
                <span className="text-outline text-body-sm">•</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  +{user.xpEarned} XP this week
                </span>
              </div>

              {/* Student Role / Permission Verification Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>Student Access Level • FERPA Protected</span>
              </div>
            </div>

            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
              Good morning, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Welcome back to {user.institution || 'Proton Chemistry Institute'}. Your virtual lab workstations, active problem sets, and molecular notebooks are synced.
            </p>
          </div>

          {/* Quick Ask / Element Launcher */}
          <div className="w-full xl:w-auto xl:min-w-[460px] bg-surface-container-lowest p-2.5 rounded-xl shadow-md border border-surface-container-high">
            <div
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-low text-on-surface-variant cursor-pointer hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">search</span>
              <span className="w-full font-body-sm text-body-sm text-outline">
                Ask AI, query CAS#, reaction, or molecular weight...
              </span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-[10px]">
                CTRL + K
              </kbd>
            </div>

            <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-0.5 scrollbar-none text-nowrap">
              <span className="font-label-sm text-[10px] uppercase text-outline px-1">
                Shortcuts:
              </span>
              <button
                onClick={() => onNavigate('periodic-table')}
                className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-code-sm text-[11px] hover:bg-secondary-fixed hover:text-on-secondary-fixed-variant transition-colors"
              >
                Elements
              </button>
              <button
                onClick={() => onNavigate('reaction-engine')}
                className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-code-sm text-[11px] hover:bg-secondary-fixed hover:text-on-secondary-fixed-variant transition-colors"
              >
                Reactions
              </button>
              <button
                onClick={() => onNavigate('ai-tutor')}
                className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-code-sm text-[11px] hover:bg-secondary-fixed hover:text-on-secondary-fixed-variant transition-colors"
              >
                AI Assistant
              </button>
              <button
                onClick={() => onNavigate('molecular-explorer')}
                className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-code-sm text-[11px] hover:bg-secondary-fixed hover:text-on-secondary-fixed-variant transition-colors"
              >
                3D Models
              </button>
              <button
                onClick={() => onNavigate('virtual-lab')}
                className="px-2.5 py-0.5 rounded-full bg-secondary-fixed/70 text-on-secondary-fixed-variant font-code-sm text-[11px] font-semibold hover:bg-secondary-fixed transition-colors"
              >
                Virtual Lab
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Error Banner with Retry */}
      {loadError && (
        <div className="p-space-md rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-on-surface">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-500 text-[24px]">warning</span>
            <span className="text-body-sm font-medium">{loadError}</span>
          </div>
          <button
            onClick={fetchDashboardData}
            className="px-3 py-1 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container transition-colors"
          >
            Retry Sync
          </button>
        </div>
      )}

      {/* 2. Instrument Deck & Core Tools (5 Cards) matching Stitch */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
            Instrument Deck & Core Workstations
          </h2>
          <span className="font-code-sm text-code-sm text-outline font-semibold">
            WORKSPACE SUITE 4.1
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm">
          {/* Card 1: Periodic Table */}
          <div
            onClick={() => onNavigate('periodic-table')}
            className="group p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 shadow-sm border border-surface-container-low flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">grid_view</span>
              </div>
              <span className="font-code-sm text-[11px] px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-medium">
                118 EL
              </span>
            </div>
            <div className="mt-4">
              <div className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                Periodic Table
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Quick elemental trends, electronegativity, orbitals
              </div>
            </div>
          </div>

          {/* Card 2: Molecule Explorer */}
          <div
            onClick={() => onNavigate('molecular-explorer')}
            className="group p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 shadow-sm border border-surface-container-low flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">hub</span>
              </div>
              <span className="font-code-sm text-[11px] px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-medium">
                3D GL
              </span>
            </div>
            <div className="mt-4">
              <div className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-secondary transition-colors">
                Molecule Explorer
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Caffeine, Aspirin, ATP raycasting & distance measurement
              </div>
            </div>
          </div>

          {/* Card 3: Reaction Balancer */}
          <div
            onClick={() => onNavigate('reaction-engine')}
            className="group p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 shadow-sm border border-surface-container-low flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">balance</span>
              </div>
              <span className="font-code-sm text-[11px] px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">
                ΔG / Keq
              </span>
            </div>
            <div className="mt-4">
              <div className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-tertiary transition-colors">
                Reaction Balancer
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Hess's Law thermochemistry, Nernst potentials & yield
              </div>
            </div>
          </div>

          {/* Card 4: Virtual Lab */}
          <div
            onClick={() => onNavigate('virtual-lab')}
            className="group p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 shadow-sm border border-surface-container-low flex flex-col justify-between relative overflow-hidden cursor-pointer"
          >
            <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-secondary-fixed/50 pointer-events-none" />
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">science</span>
              </div>
              <span className="inline-flex items-center gap-1 font-code-sm text-[11px] px-1.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" /> LIVE
              </span>
            </div>
            <div className="mt-4">
              <div className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-secondary transition-colors">
                Virtual Lab
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Volumetric titration buret & dual-mode calorimeter rigs
              </div>
            </div>
          </div>

          {/* Card 5: Ask AI Assistant */}
          <div
            onClick={() => onNavigate('ai-tutor')}
            className="group p-space-md rounded-xl bg-gradient-to-br from-tertiary-fixed via-surface-container-lowest to-surface-container-lowest hover:shadow-md transition-all duration-200 shadow-sm border border-surface-container-low flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center text-on-tertiary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">psychology</span>
              </div>
              <span className="font-code-sm text-[11px] px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                GROUNDED AI
              </span>
            </div>
            <div className="mt-4">
              <div className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-tertiary transition-colors">
                AI Chemistry Tutor
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Step-by-step problem solver with verified stoichiometry
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Enrolled Courses & Learning Progress Section */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              Enrolled Academic Courses
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Track your syllabus completion, current GPA standing, and curriculum modules.
            </p>
          </div>
          <button
            onClick={() => onNavigate('learn-and-courses')}
            className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-label-sm font-semibold transition-colors"
          >
            View All Courses
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-xl bg-surface-container-low animate-pulse" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-surface-container-low text-center space-y-2">
            <span className="material-symbols-outlined text-outline text-[32px]">school</span>
            <p className="font-body-md text-on-surface-variant">No enrolled courses registered for this term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
            {courses.map((c) => (
              <div
                key={c.id}
                onClick={() => onNavigate('learn-and-courses')}
                className="p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container-low shadow-sm cursor-pointer transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-code-sm text-[11px] font-bold">
                      {c.courseCode}
                    </span>
                    <h3 className="font-label-md text-label-md font-bold text-on-surface mt-1.5 line-clamp-1">
                      {c.courseTitle}
                    </h3>
                  </div>
                  {c.gradeLetter && (
                    <span className="font-code-sm text-headline-sm font-bold text-primary">
                      {c.gradeLetter}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-label-sm font-label-sm">
                    <span className="text-on-surface-variant">Progress</span>
                    <span className="font-code-sm font-semibold text-on-surface">
                      {c.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary-container h-full rounded-full transition-all duration-500"
                      style={{ width: `${c.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-surface-container-low flex justify-between items-center text-body-sm text-on-surface-variant">
                  <span className="text-[11px] capitalize">Status: {c.status}</span>
                  <span className="text-[11px] font-medium text-primary hover:underline">
                    Open Syllabus →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Assignments & Virtual Lab History Two-Column Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column: Upcoming Virtual Lab Assignments (7 cols) */}
        <div className="lg:col-span-7 space-y-space-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-label-lg font-bold text-on-surface">
              Virtual Lab Assignments & Problem Sets
            </h3>
            <button
              onClick={() => onNavigate('assignments')}
              className="text-label-sm text-primary font-semibold hover:underline"
            >
              All Assignments ({assignments.length})
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 rounded-xl bg-surface-container-low animate-pulse" />
              ))}
            </div>
          ) : pendingAssignments.length === 0 ? (
            <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-surface-container-low text-center space-y-2">
              <span className="material-symbols-outlined text-outline text-[32px]">task_alt</span>
              <p className="font-body-md text-on-surface-variant">All laboratory assignments are up to date!</p>
            </div>
          ) : (
            <div className="space-y-space-sm">
              {pendingAssignments.map((asg) => (
                <div
                  key={asg.id}
                  className="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-md hover:bg-surface-container-low transition-colors"
                >
                  <div className="space-y-1 max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-[10px] font-semibold uppercase">
                        {asg.experimentType} Lab
                      </span>
                      <span className="text-body-sm text-on-surface-variant font-medium">
                        {asg.courseCode}
                      </span>
                    </div>
                    <h4 className="font-label-md text-label-md font-bold text-on-surface">
                      {asg.title}
                    </h4>
                    {asg.description && (
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                        {asg.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-body-sm text-[12px] text-outline font-code-sm">
                      <span>Max: {asg.maxPoints} pts</span>
                      {asg.dueDate && (
                        <span>Due: {new Date(asg.dueDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('virtual-lab')}
                    className="px-4 py-2 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:opacity-95 transition-opacity shadow-xs shrink-0 self-start sm:self-center"
                  >
                    Open Lab Rig
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Experiment History & Saved Compounds (5 cols) */}
        <div className="lg:col-span-5 space-y-space-md">
          {/* Virtual Lab Notebook History */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-low shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  biotech
                </span>
                <h4 className="font-label-md text-label-md font-bold text-on-surface">
                  Experiment Notebook History
                </h4>
              </div>
              <button
                onClick={() => onNavigate('my-experiments')}
                className="text-label-sm text-primary font-semibold hover:underline"
              >
                Notebook
              </button>
            </div>

            {isLoading ? (
              <div className="h-20 rounded-lg bg-surface-container-low animate-pulse" />
            ) : experiments.length === 0 ? (
              <div className="p-4 text-center text-body-sm text-on-surface-variant">
                No recent laboratory runs recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-surface-container-low">
                {experiments.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm font-semibold text-on-surface line-clamp-1">
                        {exp.title}
                      </span>
                      <span className="font-code-sm text-[10px] px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant uppercase">
                        {exp.status}
                      </span>
                    </div>
                    {exp.observations && (
                      <p className="font-body-sm text-[11px] text-on-surface-variant line-clamp-1">
                        {exp.observations}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Compounds & Bookmarks */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-low shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  bookmark
                </span>
                <h4 className="font-label-md text-label-md font-bold text-on-surface">
                  Saved Formulas & Compounds
                </h4>
              </div>
              <button
                onClick={() => onNavigate('saved-formulas')}
                className="text-label-sm text-secondary font-semibold hover:underline"
              >
                View ({bookmarks.length})
              </button>
            </div>

            {isLoading ? (
              <div className="h-20 rounded-lg bg-surface-container-low animate-pulse" />
            ) : bookmarks.length === 0 ? (
              <div className="p-4 text-center text-body-sm text-on-surface-variant">
                No saved compounds yet. Star molecules in Explorer to save.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {bookmarks.slice(0, 6).map((bm) => (
                  <span
                    key={bm.id}
                    onClick={() => onNavigate('saved-formulas')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-code-sm text-code-sm cursor-pointer transition-colors"
                  >
                    <span className="text-secondary font-semibold">{bm.item_identifier}</span>
                    <span className="text-[10px] text-outline capitalize">{bm.item_type}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
