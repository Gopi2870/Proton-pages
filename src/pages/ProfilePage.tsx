import React from 'react';
import { User, Mail, Shield, BookOpen, Key, Calendar } from 'lucide-react';
import { CURRENT_USER } from '../services/users';

export const ProfilePage: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <User className="w-6 h-6 text-primary-400" /> Academic Profile & Credentials
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Identity management, institutional affiliation, and research permissions.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-600 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
            {CURRENT_USER.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{CURRENT_USER.name}</h2>
            <p className="text-xs text-slate-400">{CURRENT_USER.email} • {CURRENT_USER.role.toUpperCase()}</p>
            <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
              Department of Chemistry & Chemical Engineering
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <span className="text-slate-500 block mb-1">Student / Scholar ID</span>
            <span className="font-mono text-slate-200">PR-2026-CH-88219</span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <span className="text-slate-500 block mb-1">Institution License Tier</span>
            <span className="font-mono text-teal-400">Enterprise Academic Unlimited</span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <span className="text-slate-500 block mb-1">Enrolled University Term</span>
            <span className="text-slate-200">Fall Semester 2026</span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <span className="text-slate-500 block mb-1">Safety Clearance Level</span>
            <span className="text-emerald-400 font-semibold">Tier 3 Hazardous Chemicals Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
