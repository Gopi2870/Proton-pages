import React from 'react';
import { NavigationPath, UserProfile } from '../../types/navigation';

interface SidebarProps {
  currentPath: NavigationPath;
  onNavigate: (path: NavigationPath) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  user: UserProfile;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  collapsed,
  onToggleCollapse,
  user,
  mobileOpen,
  onCloseMobile,
}) => {
  const scientificNavItems: { path: NavigationPath; label: string; icon: string; badge?: string; isLive?: boolean }[] = [
    { path: 'dashboard', label: 'Dashboard', icon: 'space_dashboard' },
    { path: 'explore', label: 'Explore', icon: 'explore' },
    { path: 'periodic-table', label: 'Periodic Table', icon: 'grid_view' },
    { path: 'molecular-explorer', label: 'Molecular Explorer', icon: 'hub' },
    { path: 'reaction-engine', label: 'Reaction Engine', icon: 'science' },
    { path: 'virtual-lab', label: 'Virtual Lab', icon: 'experiment', isLive: true },
    { path: 'ai-tutor', label: 'AI Tutor', icon: 'psychology', badge: 'AI' },
    { path: 'learn-and-courses', label: 'Learn & Courses', icon: 'school' },
    { path: 'practice-and-quizzes', label: 'Practice & Quizzes', icon: 'quiz' },
    { path: 'assignments', label: 'Assignments', icon: 'assignment' },
    { path: 'progress-and-analytics', label: 'Progress & Analytics', icon: 'trending_up' },
    { path: 'teacher-portal', label: 'Teacher & Faculty', icon: 'supervisor_account' },
  ];

  const workspaceNavItems: { path: NavigationPath; label: string; icon: string }[] = [
    { path: 'saved-formulas', label: 'Saved Formulas & Items', icon: 'bookmark' },
    { path: 'recent-sessions', label: 'Recent Sessions', icon: 'history' },
    { path: 'my-experiments', label: 'My Experiments', icon: 'biotech' },
  ];

  const sidebarWidthClass = collapsed ? 'w-20' : 'w-72';

  const content = (
    <div className="flex flex-col h-full justify-between overflow-hidden bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-surface-container-low">
      {/* Brand & Collapse Header */}
      <div className="h-16 px-space-md flex items-center justify-between border-b border-surface-container-low shrink-0">
        <div
          className="flex items-center gap-space-sm cursor-pointer select-none"
          onClick={() => {
            onNavigate('dashboard');
            onCloseMobile();
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[20px]">science</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-label-md font-bold tracking-tight text-on-surface">
                  Proton Pages
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-[10px] font-semibold">
                  v2.4 PRO
                </span>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container transition-colors hidden lg:block"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">
            {collapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'}
          </span>
        </button>
        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Navigation Scrollable Area */}
      <div className="px-space-md py-space-sm flex-1 overflow-y-auto overflow-x-hidden space-y-space-md">
        {/* Scientific Platform Group */}
        <div>
          {!collapsed && (
            <div className="mb-1.5 px-space-sm">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                Scientific Platform
              </span>
            </div>
          )}
          <nav className="space-y-0.5">
            {scientificNavItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    onCloseMobile();
                  }}
                  type="button"
                  title={item.label}
                  className={`w-full flex items-center ${
                    collapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-space-sm py-2'
                  } rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`material-symbols-outlined text-[19px] shrink-0 ${
                        item.path === 'ai-tutor' && !isActive ? 'text-tertiary-container' : ''
                      }`}
                    >
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className="font-label-md text-label-md truncate">{item.label}</span>
                    )}
                  </div>
                  {!collapsed && (
                    <>
                      {item.isLive && (
                        <span className="w-2 h-2 rounded-full bg-secondary shrink-0 animate-pulse" />
                      )}
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-code-sm text-[10px] font-bold shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Workspace Group */}
        <div className="pt-space-sm border-t border-surface-container-low">
          {!collapsed && (
            <div className="mb-1.5 px-space-sm">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                Workspace
              </span>
            </div>
          )}
          <nav className="space-y-0.5">
            {workspaceNavItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    onCloseMobile();
                  }}
                  type="button"
                  title={item.label}
                  className={`w-full flex items-center ${
                    collapsed ? 'justify-center px-2 py-2' : 'gap-2.5 px-space-sm py-2'
                  } rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[19px] shrink-0">{item.icon}</span>
                  {!collapsed && (
                    <span className="font-label-md text-label-md truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Footer & Profile Section */}
      <div className="p-space-sm border-t border-surface-container-low bg-surface-container-lowest shrink-0">
        <nav className="space-y-0.5 mb-space-sm">
          <button
            onClick={() => {
              onNavigate('help-and-documentation');
              onCloseMobile();
            }}
            type="button"
            className={`w-full flex items-center ${
              collapsed ? 'justify-center px-2 py-1.5' : 'gap-2.5 px-space-sm py-1.5'
            } rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors`}
            title="Help & Documentation"
          >
            <span className="material-symbols-outlined text-[18px]">help</span>
            {!collapsed && (
              <span className="font-label-md text-label-md">Help & Documentation</span>
            )}
          </button>
          <button
            onClick={() => {
              onNavigate('settings-and-preferences');
              onCloseMobile();
            }}
            type="button"
            className={`w-full flex items-center ${
              collapsed ? 'justify-center px-2 py-1.5' : 'gap-2.5 px-space-sm py-1.5'
            } rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors`}
            title="Settings & Preferences"
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            {!collapsed && (
              <span className="font-label-md text-label-md">Settings & Preferences</span>
            )}
          </button>
        </nav>

        {/* User Card */}
        <div
          className={`flex items-center gap-3 p-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer select-none ${
            collapsed ? 'justify-center' : ''
          }`}
          onClick={() => {
            onNavigate('settings-and-preferences');
            onCloseMobile();
          }}
        >
          <img
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-primary/20"
            src={user.avatarUrl}
          />
          {!collapsed && (
            <>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                  {user.name}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {user.role}
                </span>
              </div>
              <span className="material-symbols-outlined text-outline text-[18px] shrink-0">
                unfold_more
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen ${sidebarWidthClass} z-50 hidden lg:block transition-all duration-300`}
      >
        {content}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs z-50 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer Off-Canvas */}
      <aside
        className={`fixed left-0 top-0 h-screen w-72 z-50 lg:hidden transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {content}
      </aside>
    </>
  );
};
