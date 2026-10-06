import React from 'react';
import { BarChart3, TrendingUp, Award, Layers } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';

export const TeacherAnalyticsPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-teal-400" /> Cohort Psychometrics & ACS Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Item discrimination indexes (point biserial correlation), question difficulty curves, and ACS cohort norms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Mean Exam Score" value="82.4%" change="+4.1%" isPositive icon={<TrendingUp className="w-4 h-4 text-emerald-400" />} />
        <StatCard title="Cronbach's Alpha" value="0.91" subtitle="Excellent reliability" icon={<Layers className="w-4 h-4 text-primary-400" />} />
        <StatCard title="Item Discrimination" value="0.48" subtitle="Highly discriminating" icon={<Award className="w-4 h-4 text-teal-400" />} />
        <StatCard title="National ACS Median" value="+8.2 pts" change="Above average" isPositive icon={<BarChart3 className="w-4 h-4 text-amber-400" />} />
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200">Question Topic Vulnerability Breakdown</h3>
        <p className="text-xs text-slate-400">
          Topics exhibiting lower cohort discrimination requiring targeted pedagogical review:
        </p>
        <div className="space-y-3 text-xs pt-2">
          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex justify-between items-center">
            <span>Electrophilic Aromatic Substitution (SEAr) Regioselectivity</span>
            <span className="font-mono text-rose-400 font-bold">58% Pass Rate</span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex justify-between items-center">
            <span>Polyprotic Acid Equilibrium Fraction (Alpha Plot) Calculation</span>
            <span className="font-mono text-amber-400 font-bold">67% Pass Rate</span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex justify-between items-center">
            <span>Cycloaddition Frontier Molecular Orbital Symmetry Alignment</span>
            <span className="font-mono text-teal-400 font-bold">89% Pass Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
