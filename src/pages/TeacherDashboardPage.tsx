import React from 'react';
import { Users, GraduationCap, ClipboardCheck, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { TEACHER_COHORTS } from '../data/teacherData';

export const TeacherDashboardPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary-400" /> Educator Management Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time cohort performance telemetry, automated grading pipelines, and ACS chemistry mastery benchmarks.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary-600 hover:bg-primary-500 text-white transition">
            Create Assignment
          </button>
          <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
            Export Gradebook CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Enrolled Students" value="142" change="+12% this term" isPositive icon={<Users className="w-4 h-4" />} />
        <StatCard title="Mean Exam Score" value="84.6%" change="+3.2%" isPositive icon={<TrendingUp className="w-4 h-4" />} />
        <StatCard title="Lab Submissions" value="98.1%" subtitle="4 pending review" icon={<ClipboardCheck className="w-4 h-4" />} />
        <StatCard title="Intervention Needed" value="7 Students" change="Needs support" isPositive={false} icon={<AlertTriangle className="w-4 h-4 text-rose-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200">Active Course Cohorts</h3>
          <div className="space-y-3">
            {TEACHER_COHORTS.map((c) => (
              <div key={c.id} className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">{c.name}</div>
                  <div className="text-slate-400 text-[11px]">{c.enrolled} students • {c.term}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-teal-400">{c.averageScore}%</div>
                  <div className="text-[10px] text-slate-500">{c.completionRate}% completed</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200">Recent Automated Diagnostic Alerts</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-slate-300">
              <span className="font-semibold text-rose-400">Stereochemistry Quiz #4:</span> 34% of students confused enantiomer optical rotation inversion with diastereomer physical separation.
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-slate-300">
              <span className="font-semibold text-amber-400">Titration Rig Experiment:</span> 12 students overshot phenolphthalein endpoint by &gt; 1.5 mL titrant volume.
            </div>
            <div className="p-3 bg-primary-500/10 border border-primary-500/20 rounded-lg text-slate-300">
              <span className="font-semibold text-primary-400">Haber-Bosch Equilibrium Problem:</span> High class comprehension (92% pass rate) on Le Chatelier temperature perturbations.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
