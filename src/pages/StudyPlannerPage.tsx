import React from 'react';
import { Calendar, Clock, CheckCircle2, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';

interface StudyTask {
  id: string;
  course: string;
  topic: string;
  timeWindow: string;
  durationMinutes: number;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

const SCHEDULED_TASKS: StudyTask[] = [
  { id: 't1', course: 'CHEM 201', topic: 'Review E1 vs E2 Zaitsev Elimination Regiochemistry', timeWindow: '09:00 AM - 10:30 AM', durationMinutes: 90, priority: 'High', completed: true },
  { id: 't2', course: 'CHEM 102', topic: 'Practice Problem Set: Polyprotic Buffer Henderson-Hasselbalch', timeWindow: '11:00 AM - 12:15 PM', durationMinutes: 75, priority: 'High', completed: true },
  { id: 't3', course: 'CHEM 301', topic: 'Derivation of Maxwell Relations from Fundamental Thermodynamic Equations', timeWindow: '02:00 PM - 03:30 PM', durationMinutes: 90, priority: 'Medium', completed: false },
  { id: 't4', course: 'CHEM 202', topic: 'FTIR Spectroscopy Interpretation Unknown Spectra #12', timeWindow: '04:00 PM - 05:00 PM', durationMinutes: 60, priority: 'Low', completed: false }
];

export const StudyPlannerPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary-400" /> Cognitive Study Planner & Timetable
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Algorithmically generated spaced repetition schedule optimized for ACS exam retention.
          </p>
        </div>
        <button className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-primary-600 hover:bg-primary-500 text-white transition">
          + Add Study Block
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Today's Target" value="5.25 hrs" subtitle="3.75 hrs completed" icon={<Clock className="w-4 h-4 text-teal-400" />} />
        <StatCard title="Retention Streak" value="18 Days" change="Top 5% Cohort" isPositive icon={<Sparkles className="w-4 h-4 text-amber-400" />} />
        <StatCard title="Exam Countdown" value="12 Days" subtitle="Midterm 2: Org Chem" icon={<AlertCircle className="w-4 h-4 text-primary-400" />} />
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-200">Daily Spaced Repetition Queue</h3>
          <span className="text-xs text-slate-400">Tuesday, October 06, 2026</span>
        </div>
        <div className="divide-y divide-slate-800/60">
          {SCHEDULED_TASKS.map((task) => (
            <div key={task.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/20 transition">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="mt-1 rounded border-slate-700 bg-slate-900 text-primary-600 focus:ring-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-teal-400 font-semibold">{task.course}</span>
                    <span className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>{task.topic}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-3">
                    <span>{task.timeWindow}</span>
                    <span>• {task.durationMinutes} mins</span>
                  </div>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                task.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-slate-400'
              }`}>
                {task.priority} Priority
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
