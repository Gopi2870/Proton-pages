import React, { useState } from 'react';
import { Course } from '../../types/learning';
import { COURSES_DATA } from '../../data/coursesData';
import { StereoViewer } from './StereoViewer';

interface CourseViewProps {
  onLaunchVirtualLab?: () => void;
  onAskAi?: (topic: string) => void;
}

export const CourseView: React.FC<CourseViewProps> = ({
  onLaunchVirtualLab,
  onAskAi,
}) => {
  const [course] = useState<Course>(COURSES_DATA[0]);
  const [activeLessonId, setActiveLessonId] = useState('les-3-4');
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Subheader Navigation Bar matching Stitch */}
      <header className="px-space-md lg:px-space-lg py-3 bg-surface-container-lowest border-b border-surface-container-low shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <nav className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm flex-wrap">
            <span className="text-on-surface-variant">Learn & Courses</span>
            <span className="text-outline">/</span>
            <span className="text-on-surface-variant">{course.code}: {course.title}</span>
            <span className="text-outline">/</span>
            <span className="text-primary font-semibold truncate">
              Lesson 3.4: Chirality & Optical Activity
            </span>
          </nav>

          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-code-sm text-code-sm font-semibold">
              Lesson 4 of 7
            </span>
            <span className="text-outline text-label-sm">•</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full"
                  style={{ width: `${course.progressPercent}%` }}
                />
              </div>
              <span className="font-code-sm text-code-sm text-on-surface-variant font-medium">
                {course.progressPercent}% Completed
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-label-md text-label-md transition-colors ${
              isBookmarked
                ? 'bg-primary-fixed text-primary font-semibold'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Lecture summary notes downloaded (PDF).')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-[17px] text-outline">
              picture_as_pdf
            </span>
            <span>Download Notes</span>
          </button>

          {onLaunchVirtualLab && (
            <button
              type="button"
              onClick={onLaunchVirtualLab}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-code-sm font-semibold hover:bg-secondary-fixed/80 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
              <span>Sim Lab Linked: Active</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Pedagogy Layout */}
      <div className="flex flex-col lg:flex-row w-full p-space-md lg:p-space-lg gap-gutter flex-1">
        {/* Left Column: Syllabus & Course Tree (280px) */}
        <aside className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
          {/* Course Meta Card */}
          <div className="rounded-xl p-4 bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[24px]">science</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h2 className="font-headline-sm text-label-md text-on-surface font-bold leading-tight truncate">
                  {course.title}
                </h2>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {course.instructor} • MIT
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex justify-between items-center font-label-sm text-label-sm">
                <span className="text-on-surface-variant">Course Progress</span>
                <span className="font-code-sm text-code-sm font-bold text-primary">
                  {course.completedLessons}/{course.totalLessons} Lessons ({course.progressPercent}%)
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full"
                  style={{ width: `${course.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Syllabus Modules Navigator */}
          <div className="rounded-xl p-3 bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-2">
            <div className="px-2 py-1 flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Modules
              </span>
              <span className="font-code-sm text-code-sm text-on-surface-variant">
                {course.modules.length} Modules
              </span>
            </div>

            <div className="space-y-1.5">
              {course.modules.map((mod) => (
                <div key={mod.id} className="rounded-lg bg-surface-container-low/50 p-2 space-y-1">
                  <div className="flex items-center justify-between font-label-md text-label-md font-semibold text-on-surface">
                    <span className="truncate">{mod.title}</span>
                    <span className="font-code-sm text-[11px] text-outline">
                      {mod.completedCount}/{mod.totalCount}
                    </span>
                  </div>

                  {/* Lessons list */}
                  <div className="space-y-0.5 pt-1">
                    {mod.lessons.map((les) => {
                      const isActive = activeLessonId === les.id;
                      return (
                        <div
                          key={les.id}
                          onClick={() => setActiveLessonId(les.id)}
                          className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-colors text-body-sm ${
                            isActive
                              ? 'bg-primary-container text-on-primary font-semibold'
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span
                              className={`material-symbols-outlined text-[16px] shrink-0 ${
                                les.completed
                                  ? 'text-secondary'
                                  : isActive
                                  ? 'text-on-primary'
                                  : 'text-outline'
                              }`}
                            >
                              {les.completed
                                ? 'check_circle'
                                : isActive
                                ? 'radio_button_checked'
                                : 'radio_button_unchecked'}
                            </span>
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="font-code-sm text-[10px] shrink-0 opacity-80">
                            {les.duration}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right / Center Content Column: Lesson Content */}
        <main className="flex-1 space-y-space-md">
          {/* Main Lesson Card */}
          <article className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg border border-surface-container-low shadow-sm space-y-space-md">
            <div>
              <div className="flex items-center gap-2 font-code-sm text-code-sm text-secondary font-semibold mb-1">
                <span>MODULE 3.4</span>
                <span>•</span>
                <span>STEREOCHEMISTRY & MOLECULAR SYMMETRY</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                Chirality, Enantiomers, and Optical Activity
              </h1>
            </div>

            {/* Core Theory Text */}
            <div className="prose max-w-none text-body-lg text-on-surface-variant space-y-3 leading-relaxed">
              <p>
                A molecule is classified as <strong>chiral</strong> if it cannot be superimposed onto its mirror image by any combination of translations or rotations. The fundamental cause of molecular chirality is the presence of an asymmetric tetrahedral carbon center bonded to four chemically distinct substituents.
              </p>
              <p>
                Non-superimposable mirror image stereoisomers are termed <strong>enantiomers</strong>. While enantiomers exhibit identical boiling points, melting points, and NMR spectra in achiral environments, they interact distinctively with plane-polarized light and biological receptors (e.g., thalidomide, ibuprofen, and carvone).
              </p>
            </div>

            {/* Interactive Tetrahedral Simulator */}
            <StereoViewer />

            {/* Cahn-Ingold-Prelog (CIP) Rules Card */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high space-y-2">
              <h3 className="font-headline-sm text-body-md font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">rule</span>
                <span>Cahn-Ingold-Prelog (CIP) Priority Rules</span>
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-body-sm text-on-surface-variant">
                <li>Assign priorities (1 to 4) directly based on atomic number (Z): highest Z receives Priority 1.</li>
                <li>If atoms bonded directly to the chiral center are identical, compare atoms at the second point of difference.</li>
                <li>Multiple bonds (double/triple) are treated by duplicating or triplicating the bonded atoms.</li>
                <li>Orient the molecule so priority 4 points away from the observer (into the page on a dash).</li>
                <li>Trace priorities 1 ➔ 2 ➔ 3: Clockwise = <strong>(R)</strong> [Rectus], Counter-clockwise = <strong>(S)</strong> [Sinister].</li>
              </ol>
            </div>

            {/* Ask AI button for this lesson */}
            {onAskAi && (
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => onAskAi('Chirality and Cahn-Ingold-Prelog priority rules')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-tertiary-container to-tertiary text-on-tertiary font-label-md text-label-md font-semibold hover:opacity-95 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                  <span>Ask AI Tutor to Test My Chiral Assignments</span>
                </button>
              </div>
            )}
          </article>
        </main>
      </div>
    </div>
  );
};
