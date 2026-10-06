import React from 'react';
import { TrendingUp, Award, BookOpen, Target, CheckCircle2 } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';

export const StudentProgressPage: React.FC = () => {
  const domains = [
    { title: 'Thermodynamics & Kinetics', mastery: 92, status: 'Advanced Mastery' },
    { title: 'Organic Reaction Mechanisms', mastery: 86, status: 'Proficient' },
    { title: 'Stereochemistry & Chirality', mastery: 78, status: 'Developing' },
    { title: 'Spectroscopic Structure Elucidation', mastery: 95, status: 'Mastery' },
    { title: 'Inorganic Coordination Chemistry', mastery: 82, status: 'Proficient' }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-teal-400" /> Academic Mastery & Telemetry
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Detailed cognitive domain progression metrics benchmarked against American Chemical Society (ACS) standards.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Overall Chemistry GPA" value="3.92" isPositive change="Top 3%" icon={<Award className="w-4 h-4 text-amber-400" />} />
        <StatCard title="Lessons Mastered" value="142 / 160" subtitle="88.7% syllabus coverage" icon={<BookOpen className="w-4 h-4" />} />
        <StatCard title="Virtual Lab Hours" value="28.5 hrs" subtitle="Accredited lab simulation" icon={<Target className="w-4 h-4" />} />
        <StatCard title="ACS Percentile" value="96th" change="+4% this term" isPositive icon={<TrendingUp className="w-4 h-4 text-teal-400" />} />
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-slate-200">Domain Competency Diagnostic Breakdown</h3>
        <div className="space-y-4">
          {domains.map((d, i) => (
            <div key={i} className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">{d.title}</span>
                <span className="font-mono text-teal-400 font-bold">{d.mastery}% • {d.status}</span>
              </div>
              <ProgressBar value={d.mastery} color={d.mastery > 90 ? 'teal' : 'primary'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
