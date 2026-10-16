import React, { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { NavigationPath, UserProfile } from './types/navigation';
import { CURRENT_USER } from './services/users';

// Core Chemistry & Platform Pages
import { DashboardPage } from './pages/DashboardPage';
import { PeriodicTable } from './components/chemistry/periodic-table/PeriodicTable';
import { MolecularExplorerPage } from './pages/MolecularExplorerPage';
import { ReactionBalancer } from './components/chemistry/reactions/ReactionBalancer';
import { VirtualLabPage } from './pages/VirtualLabPage';
import { AiTutorChat } from './components/chemistry/ai-tutor/AiTutorChat';
import { CourseView } from './components/learning/CourseView';
import { QuizView } from './components/assessments/QuizView';
import { TeacherDashboardPage } from './pages/TeacherDashboardPage';
import { SavedItemsPage } from './pages/SavedItemsPage';
import { AssignmentsPage } from './pages/AssignmentsPage';
import { ChemicalMixerPage } from './pages/ChemicalMixerPage';
import { ReactionDatabasePage } from './pages/ReactionDatabasePage';
import { FunctionalGroupsPage } from './pages/FunctionalGroupsPage';
import { CarbonStructuresPage } from './pages/CarbonStructuresPage';
import { IsomersPage } from './pages/IsomersPage';
import { StructureEditorCanvas } from './components/chemistry/structure-editor/StructureEditorCanvas';
import { HelpDocsPage } from './pages/HelpDocsPage';
import { SettingsPage } from './pages/SettingsPage';
import { InstitutionDashboardPage } from './pages/InstitutionDashboardPage';
import { StudentProgressPage } from './pages/StudentProgressPage';
import { GlobalSearchPage } from './pages/GlobalSearchPage';

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

  const handleOpenSearch = () => {
    const evt = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
    window.dispatchEvent(evt);
  };

  const renderCurrentView = () => {
    switch (currentPath) {
      case 'dashboard':
        return (
          <DashboardPage
            user={user}
            onNavigate={handleNavigate}
            onOpenSearch={handleOpenSearch}
          />
        );

      case 'periodic-table':
        return (
          <PeriodicTable
            initialSelectedElement={activeElementMeta}
            onAskAi={() => setCurrentPath('ai-tutor')}
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

      case 'chemical-mixer':
        return <ChemicalMixerPage />;

      case 'reaction-database':
        return <ReactionDatabasePage />;

      case 'functional-groups':
        return <FunctionalGroupsPage />;

      case 'carbon-structures':
        return <CarbonStructuresPage />;

      case 'isomers':
        return <IsomersPage />;

      case 'structure-editor':
        return <StructureEditorCanvas onAskAi={() => setCurrentPath('ai-tutor')} />;

      case 'virtual-lab':
      case 'my-experiments':
        return <VirtualLabPage onAskAi={() => setCurrentPath('ai-tutor')} />;

      case 'ai-tutor':
        return <AiTutorChat />;

      case 'learn-and-courses':
        return (
          <CourseView
            onLaunchVirtualLab={() => setCurrentPath('virtual-lab')}
            onAskAi={() => setCurrentPath('ai-tutor')}
          />
        );

      case 'practice-and-quizzes':
        return <QuizView />;

      case 'assignments':
        return <AssignmentsPage />;

      case 'progress-and-analytics':
        return <StudentProgressPage />;

      case 'teacher-portal':
        return <TeacherDashboardPage />;

      case 'institution-portal':
        return <InstitutionDashboardPage />;

      case 'global-search':
        return <GlobalSearchPage />;

      case 'saved-formulas':
      case 'recent-sessions':
        return <SavedItemsPage onNavigate={handleNavigate} />;

      case 'help-and-documentation':
        return <HelpDocsPage />;

      case 'settings-and-preferences':
        return <SettingsPage />;

      default:
        return (
          <DashboardPage
            user={user}
            onNavigate={handleNavigate}
            onOpenSearch={handleOpenSearch}
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
