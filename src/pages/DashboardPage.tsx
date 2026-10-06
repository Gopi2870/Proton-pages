import React from 'react';
import { NavigationPath, UserProfile } from '../types/navigation';

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
  return (
    <div className="flex flex-col w-full p-space-md lg:p-space-xl space-y-space-xl">
      {/* 1. Welcome & Daily Briefing Banner matching Stitch */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-surface-container-high via-surface-container-low to-surface-container p-space-lg shadow-sm border border-surface-container-high">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-20 w-72 h-72 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-space-lg">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface shadow-xs">
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

            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
              Good morning, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Your biochem synthesis queue is steady. Titration endpoint verification is waiting in Virtual Lab #2.
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
                Mechanisms
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

      {/* 2. Instrument Deck & Core Tools (5 Cards) matching Stitch */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
            Instrument Deck & Core Tools
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
                Caffeine, Aspirin, ATP conformation & electrostatic maps
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
                Stoichiometric yield, enthalpy, entropy & Gibbs free energy
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
                Interactive burettes, pH meters, titration setups
              </div>
            </div>
          </div>

          {/* Card 5: Ask AI Tutor */}
          <div
            onClick={() => onNavigate('ai-tutor')}
            className="group p-space-md rounded-xl bg-gradient-to-br from-tertiary-fixed via-surface-container-lowest to-surface-container-lowest hover:shadow-md transition-all duration-200 shadow-sm border border-surface-container-low flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center text-on-tertiary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">psychology</span>
              </div>
              <span className="font-code-sm text-[11px] px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                AI CO-PILOT
              </span>
            </div>
            <div className="mt-4">
              <div className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-tertiary transition-colors">
                Ask AI Tutor
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Mechanistic breakdowns, electron curved arrows, orbital symmetry
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Continue Learning Hero & Assignments Two-Column Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column: Active Course Hero Card (7 cols) */}
        <div className="lg:col-span-7 space-y-space-md">
          <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col justify-between gap-space-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-code-sm text-code-sm font-semibold">
                  RESUME LECTURE • CHEM 204
                </span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface mt-2">
                  Lesson 3.4: Chirality & Optical Activity
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Prof. Elena Alvarez • Module 3: Functional Groups & Stereochemistry
                </p>
              </div>

              <span className="font-code-sm text-headline-sm font-bold text-primary shrink-0">
                68%
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-label-sm font-label-sm">
                <span className="text-on-surface-variant">Course Progress</span>
                <span className="font-code-sm text-on-surface font-semibold">12 of 18 completed</span>
              </div>
              <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full w-[68%]" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-surface-container-low">
              <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  timer
                </span>
                <span>~40 min remaining</span>
              </div>
              <button
                onClick={() => onNavigate('learn-and-courses')}
                className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors shadow-xs"
              >
                Continue Lesson 3.4
              </button>
            </div>
          </div>

          {/* Quick Practice Quiz Card */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex items-center justify-between gap-space-md">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">quiz</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-label-md text-label-md font-bold text-on-surface truncate">
                  Midterm Practice: SN2 Reaction Mechanisms
                </h4>
                <p className="font-body-sm text-[12px] text-on-surface-variant truncate">
                  Question 6 active • Stereochemical inversion in polar aprotic solvents
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('practice-and-quizzes')}
              className="px-3 py-1.5 rounded-lg bg-tertiary-container text-on-tertiary font-label-sm text-label-sm font-semibold shrink-0 hover:opacity-95"
            >
              Resume Quiz
            </button>
          </div>
        </div>

        {/* Right Column: Live Lab Status & Upcoming Deadlines (5 cols) */}
        <div className="lg:col-span-5 space-y-space-md">
          {/* Virtual Lab Card */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-low shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  experiment
                </span>
                <h4 className="font-headline-sm text-label-md font-bold text-on-surface">
                  Live Virtual Lab #2
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-[11px] font-bold">
                STANDBY
              </span>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Acid-base volumetric titration ready for endpoint validation (0.1000 M NaOH vs 0.1000 M HCl).
            </p>

            <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between font-code-sm text-[11px]">
              <span className="text-on-surface-variant">Analyte in flask: 25.00 mL HCl</span>
              <span className="text-secondary font-bold">pH 1.00</span>
            </div>

            <button
              onClick={() => onNavigate('virtual-lab')}
              className="w-full py-2 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:opacity-95 transition-opacity shadow-xs"
            >
              Launch Lab Apparatus
            </button>
          </div>

          {/* Institutional Faculty Portal link for teaching assistants / teachers */}
          <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high flex items-center justify-between">
            <div>
              <div className="font-label-md text-label-md font-bold text-on-surface">
                Faculty & Teaching Portal
              </div>
              <div className="font-body-sm text-[11px] text-on-surface-variant">
                Cohort telemetry, ACS reports, 84 active students
              </div>
            </div>
            <button
              onClick={() => onNavigate('teacher-portal')}
              className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container"
            >
              Portal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
