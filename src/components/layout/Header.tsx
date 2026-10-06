import React from 'react';
import { NavigationPath, UserProfile } from '../../types/navigation';

interface HeaderProps {
  currentPath: NavigationPath;
  user: UserProfile;
  collapsed: boolean;
  onOpenSearch: () => void;
  onOpenAiAsk: () => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  user,
  collapsed,
  onOpenSearch,
  onOpenAiAsk,
  onOpenNotifications,
  onOpenSettings,
  onOpenMobileSidebar,
}) => {
  const leftPaddingClass = collapsed ? 'lg:left-20' : 'lg:left-72';

  const formatPathBreadcrumb = (path: NavigationPath): string => {
    switch (path) {
      case 'dashboard':
        return 'Console';
      case 'explore':
        return 'Explorer Deck';
      case 'periodic-table':
        return 'Periodic Table';
      case 'molecular-explorer':
        return 'Molecular Topology';
      case 'reaction-engine':
        return 'Reaction Engine';
      case 'virtual-lab':
        return 'Virtual Apparatus';
      case 'ai-tutor':
        return 'AI Tutor';
      case 'learn-and-courses':
        return 'Courses & Pedagogy';
      case 'practice-and-quizzes':
        return 'Assessment Matrix';
      case 'assignments':
        return 'Assignments';
      case 'progress-and-analytics':
        return 'Analytics';
      case 'teacher-portal':
        return 'Institutional Faculty Portal';
      default:
        return 'Console';
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 ${leftPaddingClass} h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-low z-40 flex items-center justify-between px-space-md transition-all duration-300`}
    >
      {/* Left: Mobile hamburger & breadcrumbs */}
      <div className="flex items-center gap-space-md">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          type="button"
          title="Open menu"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
          <span className="material-symbols-outlined text-[18px]">science</span>
          <span>Workbench</span>
          <span className="text-outline">/</span>
          <span className="text-on-surface font-semibold truncate">
            {formatPathBreadcrumb(currentPath)}
          </span>
        </div>

        {/* Engine status pill */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed-variant">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="font-code-sm text-code-sm font-medium">
            Virtual Lab Engine: Online / GPU Active
          </span>
        </div>
      </div>

      {/* Right: Search, AI Ask, Notifications, Profile */}
      <div className="flex items-center gap-space-sm">
        {/* Search trigger button */}
        <button
          onClick={onOpenSearch}
          type="button"
          className="relative hidden md:flex items-center w-72 lg:w-96 pl-9 pr-12 py-1.5 rounded-lg bg-surface-container-low text-outline text-left font-body-sm text-body-sm hover:bg-surface-container hover:text-on-surface transition-all group"
        >
          <span className="material-symbols-outlined absolute left-3 text-outline group-hover:text-primary text-[18px] transition-colors">
            search
          </span>
          <span className="truncate">Search elements, compounds, or ask AI...</span>
          <span className="absolute right-2 px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-[11px]">
            ⌘K
          </span>
        </button>

        {/* Mobile search icon */}
        <button
          onClick={onOpenSearch}
          className="md:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          title="Search"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>

        {/* AI Ask button */}
        <button
          onClick={onOpenAiAsk}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tertiary-container text-on-tertiary font-label-md text-label-md shadow-sm hover:opacity-95 transition-opacity"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span className="hidden sm:inline">AI Ask</span>
        </button>

        {/* Notifications bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          title="Notifications"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error font-code-sm text-[10px] rounded-full flex items-center justify-center font-bold">
            3
          </span>
        </button>

        {/* Profile Avatar trigger */}
        <div className="flex items-center pl-2 ml-1 border-l border-surface-container-high">
          <img
            alt={user.name}
            onClick={onOpenSettings}
            className="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-primary-container transition-all"
            src={user.avatarUrl}
            title={`${user.name} (${user.role})`}
          />
        </div>
      </div>
    </header>
  );
};
