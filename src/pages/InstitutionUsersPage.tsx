import React from 'react';
import { Building2, ShieldCheck, UserCheck, Key } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';

export const InstitutionUsersPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Building2 className="w-6 h-6 text-teal-400" /> Campus User Roster & Seat Allocation
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage faculty instructors, lab teaching assistants, and enrolled student account provisions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Allocated Student Seats" value="1,850 / 2,000" subtitle="150 seats available" icon={<UserCheck className="w-4 h-4 text-teal-400" />} />
        <StatCard title="Faculty Instructors" value="42 Active" subtitle="Full curriculum access" icon={<ShieldCheck className="w-4 h-4 text-primary-400" />} />
        <StatCard title="SSO SAML Status" value="Operational" subtitle="Shibboleth / InCommon" icon={<Key className="w-4 h-4 text-emerald-400" />} />
      </div>
    </div>
  );
};
