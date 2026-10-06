import React, { useState } from 'react';
import { LabReagent, TitrationSession } from '../types/chemistry';
import { experimentsService } from '../services/experiments';
import { LAB_REAGENTS } from '../data/labReagentsData';
import { ReagentShelf } from '../components/chemistry/virtual-lab/ReagentShelf';
import { TitrationRig } from '../components/chemistry/virtual-lab/TitrationRig';
import { ObservationLog } from '../components/chemistry/virtual-lab/ObservationLog';

interface VirtualLabPageProps {
  onAskAi: (prompt: string) => void;
}

export const VirtualLabPage: React.FC<VirtualLabPageProps> = ({ onAskAi }) => {
  const [reagents] = useState<LabReagent[]>(LAB_REAGENTS);
  const [session, setSession] = useState<TitrationSession>(() =>
    experimentsService.createInitialSession()
  );

  const handleDispense = (volumeMl: number) => {
    const newVolume = Math.min(50.0, session.titrantVolumeAdded + volumeMl);
    const newStep = experimentsService.calculateTitrationStep(newVolume);

    setSession((prev) => ({
      ...prev,
      titrantVolumeAdded: newVolume,
      currentPh: newStep.pH,
      isEndpointReached: newStep.pH >= 8.2,
      dataPoints: [...prev.dataPoints, newStep],
    }));
  };

  const handleToggleStirrer = () => {
    setSession((prev) => ({ ...prev, stirrerActive: !prev.stirrerActive }));
  };

  const handleReset = () => {
    setSession(experimentsService.createInitialSession());
  };

  const handleSelectTitrant = (reagent: LabReagent) => {
    setSession((prev) => ({ ...prev, titrant: reagent }));
  };

  const handleSelectAnalyte = (reagent: LabReagent) => {
    setSession((prev) => ({ ...prev, analyte: reagent }));
  };

  return (
    <div className="flex flex-col w-full p-space-md lg:p-space-lg space-y-space-md">
      {/* Top Header Command Strip */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined text-[24px]">experiment</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
                Virtual Chemistry Laboratory
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-code-sm font-semibold">
                Rig #2: Acid-Base Titration
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              High-precision simulation with volumetric glassware, automated burette stopcocks, and live electrodes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>Clean Glassware</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Laboratory Rig (Col 3 / Col 6 / Col 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        {/* Left Column: Inventory & Reagent Rack (3 cols) */}
        <div className="lg:col-span-3">
          <ReagentShelf
            reagents={reagents}
            activeTitrant={session.titrant}
            activeAnalyte={session.analyte}
            onSelectTitrant={handleSelectTitrant}
            onSelectAnalyte={handleSelectAnalyte}
          />
        </div>

        {/* Center Column: Central Glassware Viewport & Controls (6 cols) */}
        <div className="lg:col-span-6">
          <TitrationRig
            session={session}
            onDispense={handleDispense}
            onToggleStirrer={handleToggleStirrer}
          />
        </div>

        {/* Right Column: Sensor Metrics & Experiment Log (3 cols) */}
        <div className="lg:col-span-3">
          <ObservationLog
            session={session}
            onReset={handleReset}
            onAskAi={() =>
              onAskAi(
                `Analyze the acid-base titration of 0.1 M HCl with 0.1 M NaOH using phenolphthalein indicator at equivalence point V = ${session.titrantVolumeAdded.toFixed(
                  2
                )} mL`
              )
            }
          />
        </div>
      </div>
    </div>
  );
};
