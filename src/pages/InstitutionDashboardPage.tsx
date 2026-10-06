import React from 'react';
import { Building2, ShieldCheck, Key, Database, HardDrive, Activity } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';

export const InstitutionDashboardPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-teal-400" /> Academic Institution Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise campus seat allocation, LMS LTI-1.3 integration, and telemetry auditing.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition">
            Manage License Seats
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Seats" value="1,850 / 2,000" subtitle="92.5% utilization" icon={<Key className="w-4 h-4" />} />
        <StatCard title="Department Labs" value="14 Labs" subtitle="All systems operational" icon={<Database className="w-4 h-4" />} />
        <StatCard title="Simulations Run" value="142,890" change="+24% YoY" isPositive icon={<Activity className="w-4 h-4" />} />
        <StatCard title="Security Status" value="FERPA / SOC2" subtitle="Compliant & Encrypted" icon={<ShieldCheck className="w-4 h-4 text-emerald-400" />} />
      </div>
    </div>
  );
};
