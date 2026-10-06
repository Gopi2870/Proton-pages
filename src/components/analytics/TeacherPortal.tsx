import React, { useState, useEffect } from 'react';
import { usersService } from '../../services/users';
import { StudentProgressRecord, TeacherPortalMetrics } from '../../types/teacher';

export const TeacherPortal: React.FC = () => {
  const [metrics, setMetrics] = useState<TeacherPortalMetrics | null>(null);
  const [students, setStudents] = useState<StudentProgressRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  useEffect(() => {
    usersService.getTeacherMetrics().then(setMetrics);
    usersService.getStudentRoster().then(setStudents);
  }, []);

  const filteredStudents = students.filter((s) => {
    const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;
    const clean = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !clean ||
      s.name.toLowerCase().includes(clean) ||
      s.email.toLowerCase().includes(clean) ||
      s.course.toLowerCase().includes(clean);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full p-space-md lg:p-space-lg space-y-space-lg">
      {/* Portal Header */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
              Institutional & Faculty Analytics Portal
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-code-sm font-semibold">
              ACS Benchmark Sync: Live
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            MIT Department of Chemistry • Cohort Academic Performance & Virtual Lab Hours
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert('Exporting Department Compliance ACS Summary (CSV/PDF)...')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export ACS Report</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Metric Cards matching Stitch */}
      {metrics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
          {/* Card 1: Active Enrollment */}
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm border border-surface-container-low space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Active Cohort
              </span>
              <span className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">groups</span>
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-headline-lg text-on-surface">
                  {metrics.activeStudentsToday}
                </span>
                <span className="text-outline font-normal text-sm">/ {metrics.enrolledStudents}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-1">
                <span className="inline-flex items-center text-secondary font-medium font-code-sm text-[11px] bg-secondary-fixed/50 px-1.5 py-0.5 rounded">
                  +4.2%
                </span>
                <span>vs previous term (97.6%)</span>
              </p>
            </div>
            <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-primary h-full rounded-full w-[97.6%]" />
            </div>
          </div>

          {/* Card 2: Average Mastery */}
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm border border-surface-container-low space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Average Mastery
              </span>
              <span className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">insights</span>
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-headline-lg text-on-surface">
                  {metrics.averageMastery}%
                </span>
                <span className="font-code-sm text-code-sm text-secondary font-bold">Tier A-</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-1">
                <span className="inline-flex items-center text-secondary font-medium font-code-sm text-[11px] bg-secondary-fixed/50 px-1.5 py-0.5 rounded">
                  Top 12%
                </span>
                <span>National ACS benchmark</span>
              </p>
            </div>
            <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-secondary h-full rounded-full w-[79.4%]" />
            </div>
          </div>

          {/* Card 3: Simulated Lab Volume */}
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm border border-surface-container-low space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Simulated Lab Volume
              </span>
              <span className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[20px]">science</span>
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-headline-lg text-on-surface">
                  {metrics.simulatedLabHours}
                </span>
                <span className="text-outline font-normal text-sm">hrs logged</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-1">
                Highest in <span className="font-semibold text-on-surface">Titration</span> & <span className="font-semibold text-on-surface">Reaction Balancer</span>
              </p>
            </div>
            <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-tertiary h-full rounded-full w-[86%]" />
            </div>
          </div>

          {/* Card 4: Intervention Queue */}
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm border border-surface-container-low space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Intervention Queue
              </span>
              <span className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-headline-lg text-error">
                  {metrics.interventionQueueCount}
                </span>
                <span className="text-outline font-normal text-sm">Students flagged</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-1">
                Need review in stereochemistry inversion
              </p>
            </div>
            <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-error h-full rounded-full w-[25%]" />
            </div>
          </div>
        </div>
      )}

      {/* Student Roster Table matching Stitch */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low space-y-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
            <h3 className="font-headline-sm text-label-md font-bold text-on-surface">
              Enrolled Student Roster & Academic Telemetry
            </h3>
          </div>

          {/* Search & filter */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by student name, email..."
              className="px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm border border-surface-container-high focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Proficient">Proficient</option>
              <option value="On Track">On Track</option>
              <option value="Intervention Required">Intervention Required</option>
              <option value="Review Needed">Review Needed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-surface-container-low text-outline font-label-sm text-[11px] uppercase">
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Mastery Score</th>
                <th className="py-2.5 px-3">Lab Hours</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Flagged Focus Areas</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low font-body-sm">
              {filteredStudents.map((stu) => (
                <tr key={stu.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        alt={stu.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-primary-fixed"
                        src={stu.avatar}
                      />
                      <div>
                        <div className="font-semibold text-on-surface">{stu.name}</div>
                        <div className="text-outline text-[11px]">{stu.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-code-sm font-bold text-on-surface">
                      {stu.masteryScore}%
                    </div>
                    <div className="w-16 bg-surface-container-high h-1 rounded-full overflow-hidden mt-0.5">
                      <div
                        className={`h-full rounded-full ${
                          stu.masteryScore > 80
                            ? 'bg-secondary'
                            : stu.masteryScore > 65
                            ? 'bg-primary'
                            : 'bg-error'
                        }`}
                        style={{ width: `${stu.masteryScore}%` }}
                      />
                    </div>
                  </td>

                  <td className="py-3 px-3 font-code-sm text-on-surface font-semibold">
                    {stu.labHours} hrs
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-code-sm text-[11px] font-semibold ${
                        stu.status === 'Proficient'
                          ? 'bg-emerald-100 text-emerald-800'
                          : stu.status === 'On Track'
                          ? 'bg-blue-100 text-blue-800'
                          : stu.status === 'Intervention Required'
                          ? 'bg-error-container text-error'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {stu.status}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-[11px] text-on-surface-variant font-code-sm">
                    {stu.weakTopics.join(', ')}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Opening student profile & assessment dossier for ${stu.name}`)}
                      className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-[11px] font-semibold"
                    >
                      Inspect
                    </button>
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
