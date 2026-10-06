import React from 'react';
import { ClipboardList, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';

interface AssignmentItem {
  id: string;
  course: string;
  title: string;
  dueDate: string;
  points: number;
  status: 'Completed' | 'Pending' | 'Graded';
  score?: number;
}

const ASSIGNMENTS_LIST: AssignmentItem[] = [
  { id: 'as-1', course: 'CHEM 201', title: 'Problem Set 4: SN1 vs SN2 Kinetic Regioselectivity', dueDate: 'Tomorrow, 11:59 PM', points: 50, status: 'Pending' },
  { id: 'as-2', course: 'CHEM 102', title: 'Virtual Titration Lab Report: Weak Acid Neutralization', dueDate: 'Oct 12, 2026', points: 100, status: 'Pending' },
  { id: 'as-3', course: 'CHEM 301', title: 'Carnot Engine & Gibbs Free Energy Derivation Set', dueDate: 'Oct 04, 2026', points: 75, status: 'Graded', score: 72 },
  { id: 'as-4', course: 'CHEM 202', title: 'Spectroscopic Unknown Elucidation (IR & 1H-NMR)', dueDate: 'Sep 28, 2026', points: 60, status: 'Graded', score: 58 }
];

export const AssignmentsPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-primary-400" /> Coursework & Problem Sets
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track upcoming assignment deadlines, submit virtual laboratory worksheets, and inspect graded rubrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Pending Assignments" value="2" subtitle="Due this week" icon={<Clock className="w-4 h-4 text-amber-400" />} />
        <StatCard title="Completed & Graded" value="14" subtitle="Mean: 94.2%" isPositive icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />} />
        <StatCard title="Total Course Points" value="840 / 900" change="A (4.0)" isPositive icon={<ClipboardList className="w-4 h-4 text-primary-400" />} />
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-200">Active Syllabus Deliverables</h3>
          <span className="text-xs text-slate-500">4 Items Registered</span>
        </div>
        <div className="divide-y divide-slate-800/60">
          {ASSIGNMENTS_LIST.map((item) => (
            <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-300 font-semibold">{item.course}</span>
                  <span className="text-sm font-bold text-white">{item.title}</span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-500" /> {item.dueDate}</span>
                  <span>Worth {item.points} pts</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {item.status === 'Graded' ? (
                  <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Graded: {item.score} / {item.points} pts
                  </span>
                ) : (
                  <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary-600 hover:bg-primary-500 text-white transition">
                    Open Assignment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
