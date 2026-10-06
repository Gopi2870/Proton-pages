import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CommandPalette } from './CommandPalette';
import { NotificationsModal } from './NotificationsModal';
import { SettingsModal } from './SettingsModal';
import { NavigationPath, UserProfile } from '../../types/navigation';
import { CURRENT_USER } from '../../services/users';

interface AppLayoutProps {
  currentPath: NavigationPath;
  onNavigate: (path: NavigationPath, meta?: any) => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentPath,
  onNavigate,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [user] = useState<UserProfile>(CURRENT_USER);

  // Global keyboard listener for ⌘K and Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const contentPaddingLeft = collapsed ? 'lg:pl-20' : 'lg:pl-72';

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col">
      {/* Sidebar */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={onNavigate}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        user={user}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main View Area */}
      <div className={`flex-1 flex flex-col ${contentPaddingLeft} transition-all duration-300`}>
        {/* Top Header */}
        <Header
          currentPath={currentPath}
          user={user}
          collapsed={collapsed}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenAiAsk={() => onNavigate('ai-tutor')}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenMobileSidebar={() => setMobileOpen(true)}
        />

        {/* Content Viewport */}
        <main className="w-full pt-16 flex-1 flex flex-col bg-surface">
          {children}
        </main>
      </div>

      {/* Global Modals */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={onNavigate}
      />

      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        user={user}
      />
    </div>
  );
};
