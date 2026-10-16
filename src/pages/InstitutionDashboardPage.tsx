import React, { useState, useEffect } from 'react';
import {
  Building2,
  ShieldCheck,
  Key,
  Database,
  Activity,
  UserCheck,
  AlertOctagon,
  Clock,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { educationService } from '../services/educationService';
import { AdminUserRecord, AuditLogRecord, CampusTelemetry } from '../types/education';

export const InstitutionDashboardPage: React.FC = () => {
  const [telemetry, setTelemetry] = useState<CampusTelemetry | null>(null);
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'audit'>('overview');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  // Edit Role Modal
  const [editingUser, setEditingUser] = useState<AdminUserRecord | null>(null);
  const [targetRole, setTargetRole] = useState<'student' | 'teacher' | 'researcher' | 'admin'>('student');
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, usersRes, logsRes] = await Promise.all([
        educationService.getCampusStats(),
        educationService.getAdminUsers(),
        educationService.getAuditLogs(),
      ]);
      setTelemetry(statsRes);
      setUsers(usersRes);
      setAuditLogs(logsRes);
    } catch (err) {
      console.error('Failed to load institution data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenRoleModal = (user: AdminUserRecord) => {
    setEditingUser(user);
    setTargetRole(user.role);
  };

  const handleConfirmRoleChange = async () => {
    if (!editingUser) return;
    setIsUpdatingRole(true);
    try {
      const updated = await educationService.updateUserRole(
        editingUser.id,
        targetRole,
        editingUser.institution,
        editingUser.department
      );
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? { ...u, role: updated.role } : u)));

      // Add instant local audit log record
      const newLog: AuditLogRecord = {
        id: `log-${Date.now()}`,
        actorId: 'usr-admin-01',
        actorName: 'Dean Dmitri Mendeleev',
        action: 'role_update',
        targetType: 'user',
        targetId: editingUser.id,
        detailsJson: JSON.stringify({ previousRole: editingUser.role, newRole: targetRole, userEmail: editingUser.email }),
        ipAddress: '127.0.0.1',
        createdAt: new Date().toISOString(),
      };
      setAuditLogs((prev) => [newLog, ...prev]);
      setEditingUser(null);
    } catch (err) {
      console.error('Failed to update user role:', err);
    } finally {
      setIsUpdatingRole(false);
    }
  };

  const handleToggleStatus = async (user: AdminUserRecord) => {
    try {
      const nextStatus = !user.isActive;
      const updated = await educationService.updateUserStatus(user.id, nextStatus);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? { ...u, isActive: updated.isActive } : u)));

      const newLog: AuditLogRecord = {
        id: `log-${Date.now()}`,
        actorId: 'usr-admin-01',
        actorName: 'Dean Dmitri Mendeleev',
        action: nextStatus ? 'user_activated' : 'user_suspended',
        targetType: 'user',
        targetId: user.id,
        detailsJson: JSON.stringify({ userEmail: user.email }),
        ipAddress: '127.0.0.1',
        createdAt: new Date().toISOString(),
      };
      setAuditLogs((prev) => [newLog, ...prev]);
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const clean = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !clean ||
      u.fullName.toLowerCase().includes(clean) ||
      u.email.toLowerCase().includes(clean) ||
      (u.department && u.department.toLowerCase().includes(clean));
    return matchesRole && matchesSearch;
  });

  return (
    <div className="p-space-md lg:p-space-xl max-w-7xl mx-auto space-y-space-lg">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-on-surface flex items-center gap-2">
              <Building2 className="w-7 h-7 text-primary" /> Academic Institution Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-code-sm font-semibold">
              Root Governance
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Enterprise campus seat allocation, user role governance, FERPA compliance auditing, and LMS integration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface transition border border-surface-container-high"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Telemetry
          </button>
        </div>
      </div>

      {/* Top Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Seats"
          value={telemetry ? `${telemetry.studentSeatsAllocated} / ${telemetry.studentSeatsTotal}` : '1,850 / 2,000'}
          subtitle={telemetry ? `${((telemetry.studentSeatsAllocated / telemetry.studentSeatsTotal) * 100).toFixed(1)}% utilization` : '92.5% utilization'}
          icon={<Key className="w-4 h-4 text-primary" />}
        />
        <StatCard
          title="Faculty Roster"
          value={telemetry ? `${telemetry.facultyCount} Instructors` : '42 Instructors'}
          subtitle={`${telemetry?.activeCourses || 14} active courses`}
          icon={<Database className="w-4 h-4 text-secondary" />}
        />
        <StatCard
          title="Simulations Run"
          value={telemetry ? telemetry.totalExperimentsRun.toLocaleString() : '142,890'}
          change="+24% YoY"
          isPositive
          icon={<Activity className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Security & Governance"
          value="FERPA / SOC2"
          subtitle="Compliant & Audit-Logged"
          icon={<ShieldCheck className="w-4 h-4 text-secondary" />}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-surface-container-high gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-label-md font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Campus Overview & Seat Pool
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-label-md font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'users' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          User Roster & Role Governance ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 text-label-md font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'audit' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Security Audit Logs ({auditLogs.length})
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-semibold text-on-surface">Departmental Seat Quota Allocation</h3>
            <div className="space-y-3">
              <div className="p-3 bg-surface-container-low rounded-lg border border-surface-container flex justify-between items-center text-xs">
                <div>
                  <div className="font-semibold text-on-surface">School of Chemical Sciences (General Chemistry)</div>
                  <div className="text-on-surface-variant text-[11px]">850 Seats • 98% active</div>
                </div>
                <span className="font-code-sm font-bold text-primary">832 / 850</span>
              </div>
              <div className="p-3 bg-surface-container-low rounded-lg border border-surface-container flex justify-between items-center text-xs">
                <div>
                  <div className="font-semibold text-on-surface">Biochemistry & Molecular Biophysics</div>
                  <div className="text-on-surface-variant text-[11px]">650 Seats • 92% active</div>
                </div>
                <span className="font-code-sm font-bold text-secondary">598 / 650</span>
              </div>
              <div className="p-3 bg-surface-container-low rounded-lg border border-surface-container flex justify-between items-center text-xs">
                <div>
                  <div className="font-semibold text-on-surface">Chemical & Biomolecular Engineering</div>
                  <div className="text-on-surface-variant text-[11px]">500 Seats • 84% active</div>
                </div>
                <span className="font-code-sm font-bold text-outline">420 / 500</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-semibold text-on-surface">LMS & Institutional Single Sign-On</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-surface-container-low rounded-lg border border-surface-container flex items-center justify-between">
                <div>
                  <div className="font-semibold text-on-surface">Canvas LTI 1.3 Advantage</div>
                  <div className="text-on-surface-variant text-[11px]">Grade passback & roster sync enabled</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-[10px] font-bold">
                  CONNECTED
                </span>
              </div>
              <div className="p-3 bg-surface-container-low rounded-lg border border-surface-container flex items-center justify-between">
                <div>
                  <div className="font-semibold text-on-surface">Shibboleth / InCommon SAML SSO</div>
                  <div className="text-on-surface-variant text-[11px]">Automated 2FA credential federation</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-[10px] font-bold">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: User Roster & Role Governance */}
      {activeTab === 'users' && (
        <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-3.5 h-3.5 text-outline absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter users by name, email, department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-outline" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">All Roles</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher / Faculty</option>
                <option value="researcher">Researcher</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface-variant font-label-sm border-b border-surface-container">
                <tr>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-surface-container-low/40">
                    <td className="py-2.5 px-3 font-semibold text-on-surface">{u.fullName}</td>
                    <td className="py-2.5 px-3 text-on-surface-variant font-code-sm">{u.email}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full font-code-sm text-[10px] font-bold uppercase ${
                        u.role === 'admin' ? 'bg-primary-fixed text-on-primary-fixed' :
                        u.role === 'teacher' ? 'bg-secondary-fixed text-on-secondary-fixed-variant' :
                        u.role === 'researcher' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-surface-container-high text-on-surface-variant'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-outline truncate max-w-xs">{u.department || 'General'}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full font-code-sm text-[10px] font-semibold ${
                        u.isActive ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}>
                        {u.isActive ? 'Active' : 'Suspended'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenRoleModal(u)}
                        className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] font-medium"
                      >
                        Change Role
                      </button>
                      <button
                        onClick={() => handleToggleStatus(u)}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium ${
                          u.isActive
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                        }`}
                      >
                        {u.isActive ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Security Audit Logs Feed */}
      {activeTab === 'audit' && (
        <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-on-surface">Administrative Audit Trail</h3>
            <span className="font-code-sm text-xs text-outline">{auditLogs.length} Events Logged</span>
          </div>

          <div className="divide-y divide-surface-container-low">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-surface-container-high font-code-sm text-[10px] font-semibold uppercase text-on-surface">
                      {log.action}
                    </span>
                    <span className="font-semibold text-on-surface">{log.actorName || log.actorId}</span>
                    <span className="text-outline">targeted {log.targetType}</span>
                    <span className="font-code-sm text-primary">{log.targetId}</span>
                  </div>
                  {log.detailsJson && (
                    <div className="font-code-sm text-[11px] text-on-surface-variant break-all">
                      {log.detailsJson}
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-outline flex items-center gap-3 shrink-0">
                  {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                  <span>{new Date(log.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Change Role */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-surface-container-lowest border border-surface-container rounded-xl p-6 max-w-md w-full shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-on-surface">Modify User Security Role</h3>
            </div>
            <p className="text-xs text-on-surface-variant">
              Changing permissions for <strong className="text-on-surface">{editingUser.fullName}</strong> ({editingUser.email}).
              Role changes take effect immediately and are permanently recorded in the campus compliance audit trail.
            </p>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">Select New Role</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-semibold"
              >
                <option value="student">Student (Standard Coursework & Virtual Lab Access)</option>
                <option value="teacher">Teacher / Faculty (Course Management & Grading Access)</option>
                <option value="researcher">Researcher (Advanced Chemical Intelligence Access)</option>
                <option value="admin">Administrator (Root Campus & User Provisioning Access)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-surface-container-low">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRoleChange}
                disabled={isUpdatingRole}
                className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-95 disabled:opacity-50"
              >
                {isUpdatingRole ? 'Updating...' : 'Confirm Role Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
