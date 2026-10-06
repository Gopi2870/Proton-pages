import React, { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { NavigationPath, UserProfile } from './types/navigation';
import { CURRENT_USER } from './services/users';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { PeriodicTable } from './components/chemistry/periodic-table/PeriodicTable';
import { MolecularExplorerPage } from './pages/MolecularExplorerPage';
import { ReactionBalancer } from './components/chemistry/reactions/ReactionBalancer';
import { VirtualLabPage } from './pages/VirtualLabPage';
import { AiTutorChat } from './components/chemistry/ai-tutor/AiTutorChat';
import { CourseView } from './components/learning/CourseView';
import { QuizView } from './components/assessments/QuizView';
import { TeacherPortal } from './components/analytics/TeacherPortal';
import { SavedItemsPage } from './pages/SavedItemsPage';
import { ChemicalElement } from './types/chemistry';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<NavigationPath>('dashboard');
  const [user] = useState<UserProfile>(CURRENT_USER);
  const [activeElementMeta, setActiveElementMeta] = useState<ChemicalElement | undefined>();
  const [activeMoleculeIdMeta, setActiveMoleculeIdMeta] = useState<string | undefined>();

  const handleNavigate = (path: NavigationPath, meta?: any) => {
    setCurrentPath(path);
    if (meta?.element) {
      setActiveElementMeta(meta.element);
    }
    if (meta?.moleculeId) {
      setActiveMoleculeIdMeta(meta.moleculeId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentView = () => {
    switch (currentPath) {
      case 'dashboard':
        return (
          <DashboardPage
            user={user}
            onNavigate={handleNavigate}
            onOpenSearch={() => {
              // Trigger command palette via keyboard event simulation or state
              const evt = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
              window.dispatchEvent(evt);
            }}
          />
        );

      case 'periodic-table':
        return (
          <PeriodicTable
            initialSelectedElement={activeElementMeta}
            onAskAi={(element) => {
              setCurrentPath('ai-tutor');
            }}
          />
        );

      case 'molecular-explorer':
      case 'explore':
        return (
          <MolecularExplorerPage
            initialMoleculeId={activeMoleculeIdMeta}
            onAskAi={() => setCurrentPath('ai-tutor')}
          />
        );

      case 'reaction-engine':
        return <ReactionBalancer />;

      case 'virtual-lab':
      case 'my-experiments':
        return <VirtualLabPage onAskAi={() => setCurrentPath('ai-tutor')} />;

      case 'ai-tutor':
        return <AiTutorChat />;

      case 'learn-and-courses':
      case 'assignments':
        return (
          <CourseView
            onLaunchVirtualLab={() => setCurrentPath('virtual-lab')}
            onAskAi={() => setCurrentPath('ai-tutor')}
          />
        );

      case 'practice-and-quizzes':
        return <QuizView />;

      case 'progress-and-analytics':
      case 'teacher-portal':
      case 'institution-portal':
        return <TeacherPortal />;

      case 'saved-formulas':
      case 'recent-sessions':
      case 'help-and-documentation':
      case 'settings-and-preferences':
        return <SavedItemsPage onNavigate={handleNavigate} />;

      default:
        return (
          <DashboardPage
            user={user}
            onNavigate={handleNavigate}
            onOpenSearch={() => {
              const evt = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
              window.dispatchEvent(evt);
            }}
          />
        );
    }
  };

  return (
    <AppLayout currentPath={currentPath} onNavigate={handleNavigate}>
      {renderCurrentView()}
    </AppLayout>
  );
};

export default App;
