import React, { useState } from 'react';
import { LabReagent, TitrationSession } from '../types/chemistry';
import { experimentsService } from '../services/experiments';
import { LAB_REAGENTS } from '../data/labReagentsData';
import { ReagentShelf } from '../components/chemistry/virtual-lab/ReagentShelf';
import { TitrationRig } from '../components/chemistry/virtual-lab/TitrationRig';
import { ObservationLog } from '../components/chemistry/virtual-lab/ObservationLog';

import { CalorimeterRig } from '../components/chemistry/virtual-lab/CalorimeterRig';
import { SpectrophotometerRig } from '../components/chemistry/spectroscopy/SpectrophotometerRig';
import { GasLawsPistonRig } from '../components/chemistry/virtual-lab/GasLawsPistonRig';
import { ChromatographyWorkstation } from '../components/chemistry/chromatography/ChromatographyWorkstation';
import { ColligativeWorkstation } from '../components/chemistry/colligative/ColligativeWorkstation';
import { TernaryPhaseDiagramWorkstation } from '../components/chemistry/equilibria/TernaryPhaseDiagramWorkstation';
import { SurfaceChemistryWorkstation } from '../components/chemistry/surface/SurfaceChemistryWorkstation';
import { NuclearDecayWorkstation } from '../components/chemistry/nuclear/NuclearDecayWorkstation';
import { StatisticalThermoWorkstation } from '../components/chemistry/thermo/StatisticalThermoWorkstation';
import { NonEquilibriumThermoWorkstation } from '../components/chemistry/thermo/NonEquilibriumThermoWorkstation';
import { SupramolecularWorkstation } from '../components/chemistry/supramolecular/SupramolecularWorkstation';
import { DynamicCovalentWorkstation } from '../components/chemistry/dynamic-covalent/DynamicCovalentWorkstation';
import { PhotochemistryWorkstation } from '../components/chemistry/photochemistry/PhotochemistryWorkstation';
import { MicrofluidicsWorkstation } from '../components/chemistry/microfluidics/MicrofluidicsWorkstation';
import { HydrodynamicElectrochemistryWorkstation } from '../components/chemistry/electrochemistry/HydrodynamicElectrochemistryWorkstation';
import { MassSpectrometryWorkstation } from '../components/chemistry/analytical/MassSpectrometryWorkstation';

interface VirtualLabPageProps {
  onAskAi: (prompt: string) => void;
}

export const VirtualLabPage: React.FC<VirtualLabPageProps> = ({ onAskAi }) => {
  const [activeRig, setActiveRig] = useState<
    | 'titration'
    | 'calorimetry'
    | 'spectroscopy'
    | 'gas-laws'
    | 'chromatography'
    | 'colligative'
    | 'ternary-lle'
    | 'surface-chemistry'
    | 'nuclear-decay'
    | 'statistical-thermo'
    | 'non-equilibrium-thermo'
    | 'supramolecular'
    | 'dynamic-covalent'
    | 'photochemistry'
    | 'microfluidics'
    | 'hydrodynamic-electrochemistry'
    | 'mass-spectrometry'
  >('titration');
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
                {activeRig === 'titration'
                  ? 'Rig #2: Acid-Base Titration'
                  : activeRig === 'calorimetry'
                  ? 'Rig #1: Calorimetry'
                  : activeRig === 'spectroscopy'
                  ? 'Rig #3: UV-Vis Spectrophotometer'
                  : activeRig === 'gas-laws'
                  ? 'Rig #4: Gas Laws & Kinetic Theory'
                  : activeRig === 'chromatography'
                  ? 'Rig #5: Analytical Chromatography'
                  : activeRig === 'colligative'
                  ? 'Rig #6: Colligative Solutions & Osmometry'
                  : activeRig === 'ternary-lle'
                  ? 'Rig #7: Ternary LLE & Phase Equilibria'
                  : activeRig === 'surface-chemistry'
                  ? 'Rig #8: Surface Chemistry & BET Adsorption'
                  : activeRig === 'nuclear-decay'
                  ? 'Rig #9: Nuclear Decay & Radiochemistry'
                  : activeRig === 'statistical-thermo'
                  ? 'Rig #10: Statistical Thermodynamics & Partition Functions'
                  : activeRig === 'non-equilibrium-thermo'
                  ? 'Rig #11: Non-Equilibrium Thermodynamics & Onsager'
                  : activeRig === 'supramolecular'
                  ? 'Rig #12: Supramolecular Host-Guest Chemistry'
                  : activeRig === 'dynamic-covalent'
                  ? 'Rig #13: Dynamic Covalent & Constitutional Networks'
                  : activeRig === 'photochemistry'
                  ? 'Rig #14: Photochemistry & Jablonski Energy Diagram'
                  : activeRig === 'microfluidics'
                  ? 'Rig #15: Microfluidics & Droplet Flow Reactor'
                  : 'Rig #16: Electroanalytical Stripping & RDE Hydrodynamics'}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              High-precision simulation with volumetric glassware, automated burette stopcocks, and live electrodes
            </p>
          </div>
        </div>

        {/* Rig Switcher Tabs & Reset */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveRig('titration')}
              className={`px-3 py-1.5 rounded-md font-label-md text-xs font-semibold transition ${
                activeRig === 'titration'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Titration Workcell
            </button>
            <button
              type="button"
              onClick={() => setActiveRig('calorimetry')}
              className={`px-3 py-1.5 rounded-md font-label-md text-xs font-semibold transition ${
                activeRig === 'calorimetry'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Calorimeter Rig
            </button>
            <button
              type="button"
              onClick={() => setActiveRig('spectroscopy')}
              className={`px-3 py-1.5 rounded-md font-label-md text-xs font-semibold transition ${
                activeRig === 'spectroscopy'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Spectrophotometer
            </button>
            <button
              type="button"
              onClick={() => setActiveRig('gas-laws')}
              className={`px-3 py-1.5 rounded-md font-label-md text-xs font-semibold transition ${
                activeRig === 'gas-laws'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Piston Chamber
            </button>
            <button
              type="button"
              onClick={() => setActiveRig('chromatography')}
              className={`px-3 py-1.5 rounded-md font-label-md text-xs font-semibold transition ${
                activeRig === 'chromatography'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Chromatography Workstation
            </button>
            <button
              type="button"
              onClick={() => setActiveRig('colligative')}
              className={`px-3 py-1.5 rounded-md font-label-md text-xs font-semibold transition ${
                activeRig === 'colligative'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Colligative Solutions
            </button>
            <button
              type="button"
              onClick={() => setActiveRig('ternary-lle')}
              className={`px-3 py-1.5 rounded-md font-label-md text-xs font-semibold transition ${
                activeRig === 'ternary-lle'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Ternary LLE Rig
            </button>
            <button
              type="button"
              onClick={() => setActiveRig('surface-chemistry')}
              className={`px-3 py-1.5 rounded-md font-label-md text-xs font-semibold transition ${
                activeRig === 'surface-chemistry'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Surface Chemistry & BET
            </button>
            <button
              type="button"
              onClick={() => setActiveRig('nuclear-decay')}
              className={`px-3 py-1.5 rounded-md font-label-md text-xs font-semibold transition ${
                activeRig === 'nuclear-decay'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Nuclear Decay & Bateman
            </button>
            <button
              type="button"
              onClick={() => setActiveRig('statistical-thermo')}
              className={`px-3 py-1.5 rounded-md font-label-md text-xs font-semibold transition ${
                activeRig === 'statistical-thermo'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Statistical Thermodynamics
            </button>
            <button
              onClick={() => setActiveRig('non-equilibrium-thermo')}
              className={`px-3 py-1.5 rounded-lg text-label-md font-label-md transition-colors ${
                activeRig === 'non-equilibrium-thermo'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Non-Equilibrium Thermo
            </button>
            <button
              onClick={() => setActiveRig('supramolecular')}
              className={`px-3 py-1.5 rounded-lg text-label-md font-label-md transition-colors ${
                activeRig === 'supramolecular'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Supramolecular
            </button>
            <button
              onClick={() => setActiveRig('dynamic-covalent')}
              className={`px-3 py-1.5 rounded-lg text-label-md font-label-md transition-colors ${
                activeRig === 'dynamic-covalent'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Dynamic Covalent & DCL
            </button>
            <button
              onClick={() => setActiveRig('photochemistry')}
              className={`px-3 py-1.5 rounded-lg text-label-md font-label-md transition-colors ${
                activeRig === 'photochemistry'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Photochemistry & FRET
            </button>
            <button
              onClick={() => setActiveRig('microfluidics')}
              className={`px-3 py-1.5 rounded-lg text-label-md font-label-md transition-colors ${
                activeRig === 'microfluidics'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Microfluidics & Droplets
            </button>
            <button
              onClick={() => setActiveRig('hydrodynamic-electrochemistry')}
              className={`px-3 py-1.5 rounded-lg text-label-md font-label-md transition-colors ${
                activeRig === 'hydrodynamic-electrochemistry'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              RDE & Stripping
            </button>
            <button
              onClick={() => setActiveRig('mass-spectrometry')}
              className={`px-3 py-1.5 rounded-lg text-label-md font-label-md transition-colors ${
                activeRig === 'mass-spectrometry'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              GC/LC Mass Spec
            </button>
          </div>

          {activeRig === 'titration' && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              <span>Clean Glassware</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Laboratory Rig Viewport */}
      {activeRig === 'mass-spectrometry' ? (
        <MassSpectrometryWorkstation />
      ) : activeRig === 'hydrodynamic-electrochemistry' ? (
        <HydrodynamicElectrochemistryWorkstation />
      ) : activeRig === 'microfluidics' ? (
        <MicrofluidicsWorkstation />
      ) : activeRig === 'photochemistry' ? (
        <PhotochemistryWorkstation />
      ) : activeRig === 'dynamic-covalent' ? (
        <DynamicCovalentWorkstation />
      ) : activeRig === 'supramolecular' ? (
        <SupramolecularWorkstation />
      ) : activeRig === 'non-equilibrium-thermo' ? (
        <NonEquilibriumThermoWorkstation />
      ) : activeRig === 'statistical-thermo' ? (
        <StatisticalThermoWorkstation />
      ) : activeRig === 'nuclear-decay' ? (
        <NuclearDecayWorkstation />
      ) : activeRig === 'surface-chemistry' ? (
        <SurfaceChemistryWorkstation />
      ) : activeRig === 'ternary-lle' ? (
        <TernaryPhaseDiagramWorkstation />
      ) : activeRig === 'colligative' ? (
        <ColligativeWorkstation />
      ) : activeRig === 'chromatography' ? (
        <ChromatographyWorkstation />
      ) : activeRig === 'spectroscopy' ? (
        <SpectrophotometerRig />
      ) : activeRig === 'calorimetry' ? (
        <CalorimeterRig />
      ) : activeRig === 'gas-laws' ? (
        <GasLawsPistonRig />
      ) : (
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
    )}
  </div>
);
};
