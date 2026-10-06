import React from 'react';
import { Building2, Activity, HardDrive, ShieldAlert } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';

export const InstitutionAnalyticsPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary-400" /> Enterprise Campus Telemetry & Lab Audits
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Aggregated usage statistics across chemistry lecture sections, virtual lab instances, and LMS sync.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Monthly Virtual Labs Run" value="14,290" change="+18% vs last month" isPositive icon={<Activity className="w-4 h-4 text-teal-400" />} />
        <StatCard title="Simulated Titrations" value="48,100" subtitle="Zero hazardous chemical waste" icon={<HardDrive className="w-4 h-4 text-primary-400" />} />
        <StatCard title="Safety Incidents" value="0" subtitle="Virtual containment verified" icon={<ShieldAlert className="w-4 h-4 text-emerald-400" />} />
      </div>
    </div>
  );
};
