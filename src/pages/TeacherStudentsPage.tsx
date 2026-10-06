import React from 'react';
import { Users, Search, Download, GraduationCap } from 'lucide-react';
import { TEACHER_STUDENTS } from '../data/teacherData';

export const TeacherStudentsPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-primary-400" /> Student Enrollment Roster
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Individual student diagnostic profiles, attendance logs, and laboratory progress metrics.
          </p>
        </div>
        <button className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition flex items-center gap-2">
          <Download className="w-3.5 h-3.5" /> Export Roster (.csv)
        </button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-200">Active Enrolled Students ({TEACHER_STUDENTS.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Cohort</th>
                <th className="p-3">Current Score</th>
                <th className="p-3">Attendance</th>
                <th className="p-3">Intervention Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {TEACHER_STUDENTS.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/20 transition">
                  <td className="p-3 font-semibold text-white">{s.name}</td>
                  <td className="p-3 text-slate-400 font-mono">{s.email}</td>
                  <td className="p-3">{s.cohort}</td>
                  <td className="p-3 font-mono font-bold text-teal-400">{s.grade}%</td>
                  <td className="p-3">{s.attendance}%</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      s.grade < 75 ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {s.grade < 75 ? 'Intervention Alert' : 'On Schedule'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
