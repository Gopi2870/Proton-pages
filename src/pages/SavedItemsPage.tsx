import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  History,
  FlaskConical,
  Trash2,
  ExternalLink,
  Plus,
  Atom,
  TestTubes,
  Clock,
  CheckCircle2,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { NavigationPath } from '../types/navigation';
import {
  bookmarksApi,
  experimentsApi,
  ChemicalBookmarkItem,
  VirtualExperimentItem
} from '../services/api';

interface SavedItemsPageProps {
  onNavigate: (path: NavigationPath, meta?: any) => void;
}

export const SavedItemsPage: React.FC<SavedItemsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'bookmarks' | 'experiments'>('all');
  const [bookmarks, setBookmarks] = useState<ChemicalBookmarkItem[]>([]);
  const [experiments, setExperiments] = useState<VirtualExperimentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [bmData, expData] = await Promise.all([
        bookmarksApi.getBookmarks(),
        experimentsApi.getExperiments()
      ]);
      setBookmarks(bmData);
      setExperiments(expData);
    } catch (err) {
      console.warn('Failed to fetch saved workspace data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteBookmark = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await bookmarksApi.deleteBookmark(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteExperiment = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await experimentsApi.deleteExperiment(id);
      setExperiments((prev) => prev.filter((exp) => exp.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const getBookmarkNavigation = (item: ChemicalBookmarkItem): NavigationPath => {
    switch (item.item_type) {
      case 'element':
        return 'periodic-table';
      case 'compound':
      case 'molecule':
        return 'molecular-explorer';
      case 'reaction':
      case 'formula':
        return 'reaction-engine';
      default:
        return 'molecular-explorer';
    }
  };

  return (
    <div className="flex flex-col w-full p-space-md lg:p-space-lg space-y-space-md max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
              Workspace: Saved Items & History
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Archived chemical formulas, bookmarks, experimental simulations, and analytical telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-lg border border-surface-container-high bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition flex items-center gap-1.5"
            title="Refresh saved workspace"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>

          <button
            onClick={() => onNavigate('chemical-mixer')}
            className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-on-primary font-label-md text-label-md transition flex items-center gap-1.5 shadow-sm"
          >
            <FlaskConical className="w-4 h-4" />
            <span>New Reaction Run</span>
          </button>
        </div>
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex items-center gap-2 border-b border-surface-container-low pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition ${
            activeTab === 'all'
              ? 'bg-primary text-on-primary font-bold shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          All Activity ({bookmarks.length + experiments.length})
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition flex items-center gap-1.5 ${
            activeTab === 'bookmarks'
              ? 'bg-primary text-on-primary font-bold shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Chemical Bookmarks ({bookmarks.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('experiments')}
          className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition flex items-center gap-1.5 ${
            activeTab === 'experiments'
              ? 'bg-primary text-on-primary font-bold shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Laboratory Records ({experiments.length})</span>
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        {/* Saved Chemical Entities & Formulas */}
        {(activeTab === 'all' || activeTab === 'bookmarks') && (
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
              <div className="flex items-center gap-2">
                <Atom className="w-4 h-4 text-primary" />
                <h3 className="font-headline-sm text-label-md font-bold text-on-surface">
                  Chemical Bookmarks & Entities
                </h3>
              </div>
              <span className="font-code-sm text-[11px] px-2 py-0.5 rounded bg-surface-container text-on-surface">
                {bookmarks.length} Items
              </span>
            </div>

            {bookmarks.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <Bookmark className="w-8 h-8 mx-auto text-outline/40" />
                <p className="text-body-sm text-on-surface-variant">No chemical entities bookmarked yet.</p>
                <button
                  onClick={() => onNavigate('periodic-table')}
                  className="text-label-md text-primary hover:underline font-semibold"
                >
                  Explore the Periodic Table &rarr;
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {bookmarks.map((bm) => {
                  let metadata: any = {};
                  try {
                    if (bm.metadata_json) metadata = JSON.parse(bm.metadata_json);
                  } catch {
                    // Ignore parse error
                  }

                  const title = metadata.title || `${bm.item_type.toUpperCase()}: ${bm.item_identifier}`;
                  const formula = metadata.formula || bm.item_identifier;
                  const targetPath = getBookmarkNavigation(bm);

                  return (
                    <div
                      key={bm.id}
                      onClick={() => onNavigate(targetPath)}
                      className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer border border-transparent hover:border-surface-container-high flex items-center justify-between group"
                    >
                      <div className="flex-1 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md font-semibold text-on-surface">
                            {title}
                          </span>
                          <span className="font-code-sm text-[10px] uppercase px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                            {bm.item_type}
                          </span>
                        </div>
                        <div className="font-code-sm text-[12px] text-primary font-bold mt-0.5">
                          {formula}
                        </div>
                        {bm.notes && (
                          <p className="text-[11px] text-on-surface-variant mt-1 line-clamp-1 italic">
                            "{bm.notes}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleDeleteBookmark(e, bm.id)}
                          disabled={deletingId === bm.id}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-error/10 text-on-surface-variant hover:text-error transition"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <ExternalLink className="w-4 h-4 text-outline group-hover:text-primary transition" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Laboratory & Mixer Experiment Records */}
        {(activeTab === 'all' || activeTab === 'experiments') && (
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
              <div className="flex items-center gap-2">
                <TestTubes className="w-4 h-4 text-secondary" />
                <h3 className="font-headline-sm text-label-md font-bold text-on-surface">
                  Laboratory Notebook & Simulations
                </h3>
              </div>
              <span className="font-code-sm text-[11px] px-2 py-0.5 rounded bg-surface-container text-on-surface">
                {experiments.length} Records
              </span>
            </div>

            {experiments.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <FlaskConical className="w-8 h-8 mx-auto text-outline/40" />
                <p className="text-body-sm text-on-surface-variant">No laboratory trials recorded yet.</p>
                <button
                  onClick={() => onNavigate('chemical-mixer')}
                  className="text-label-md text-secondary hover:underline font-semibold"
                >
                  Start a Chemical Reaction Simulation &rarr;
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {experiments.map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => onNavigate(exp.experiment_type === 'mixer' ? 'chemical-mixer' : 'virtual-lab')}
                    className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer border border-transparent hover:border-surface-container-high flex items-center justify-between group"
                  >
                    <div className="flex-1 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          {exp.title}
                        </span>
                        <span className="font-code-sm text-[10px] uppercase px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-bold">
                          {exp.experiment_type}
                        </span>
                        {exp.status === 'completed' && (
                          <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-medium">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 font-code-sm text-[11px] text-outline mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(exp.created_at).toLocaleDateString()}</span>
                      </div>
                      {exp.observations && (
                        <p className="text-[11px] text-on-surface-variant mt-1 line-clamp-1">
                          {exp.observations}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleDeleteExperiment(e, exp.id)}
                        disabled={deletingId === exp.id}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-error/10 text-on-surface-variant hover:text-error transition"
                        title="Remove record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <ExternalLink className="w-4 h-4 text-outline group-hover:text-secondary transition" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Access Laboratory Banners */}
      <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-label-md text-label-md font-bold text-on-surface">
              Explore More Chemistry Intelligence Modules
            </div>
            <div className="text-body-sm text-on-surface-variant text-[12px]">
              Perform stoichiometry calculations, balance redox equations, or analyze aqueous ionic titrations.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('reaction-engine')}
            className="px-3 py-1.5 rounded-lg border border-surface-container-high bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition"
          >
            Reaction Engine
          </button>
          <button
            onClick={() => onNavigate('virtual-lab')}
            className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary-hover text-on-secondary font-label-md text-label-md transition"
          >
            Virtual Lab
          </button>
        </div>
      </div>
    </div>
  );
};
