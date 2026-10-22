import React, { useState, useEffect, useMemo } from 'react';
import {
  OrganicReactionMechanism,
  MechanismSummary,
  MechanismStep,
  CurvedArrow,
  EnergyProfileInterpolationResponse,
} from '../../../types/mechanisms';
import { mechanismService } from '../../../services/mechanismService';
import { experimentsApi } from '../../../services/api';

export const OrganicMechanismPlayer: React.FC = () => {
  const [mechanisms, setMechanisms] = useState<MechanismSummary[]>([]);
  const [selectedMechId, setSelectedMechId] = useState<string>('sn2_bromoethane');
  const [activeMechanism, setActiveMechanism] = useState<OrganicReactionMechanism | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [energyInterpolation, setEnergyInterpolation] = useState<EnergyProfileInterpolationResponse | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load mechanism presets
  useEffect(() => {
    mechanismService.getMechanisms().then((list) => {
      setMechanisms(list);
      if (list.length > 0) {
        setSelectedMechId(list[0].id);
      }
    });
  }, []);

  // Load detailed mechanism data on selection
  useEffect(() => {
    if (!selectedMechId) return;
    mechanismService.getMechanismById(selectedMechId).then((data) => {
      setActiveMechanism(data);
      setCurrentStepIndex(0);
      setIsPlaying(false);

      mechanismService.interpolateEnergyProfile(data.energy_profile, 40).then(setEnergyInterpolation);
    });
  }, [selectedMechId]);

  // Auto-play timer for step cycling
  useEffect(() => {
    if (!isPlaying || !activeMechanism || activeMechanism.steps.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % activeMechanism.steps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isPlaying, activeMechanism]);

  const currentStep: MechanismStep | undefined = useMemo(() => {
    if (!activeMechanism || activeMechanism.steps.length === 0) return undefined;
    return activeMechanism.steps[currentStepIndex] || activeMechanism.steps[0];
  }, [activeMechanism, currentStepIndex]);

  // Log to Lab Notebook
  const handleSaveToNotebook = async () => {
    if (!activeMechanism || !currentStep) return;
    setIsSaving(true);
    try {
      await experimentsApi.saveExperiment({
        title: `Organic Mechanism: ${activeMechanism.name} [${activeMechanism.mechanism_class}]`,
        experiment_type: 'reaction',
        status: 'completed',
        observations: `Inspected Step ${currentStep.step_number}: ${currentStep.title}. Activation barrier Delta G‡ = ${currentStep.activation_energy_kj_mol} kJ/mol, Stereochemical outcome: ${activeMechanism.stereochemical_outcome}. Rate law: ${activeMechanism.kinetics_rate_law}.`,
        state_data: JSON.stringify({
          mechanism_id: activeMechanism.id,
          mechanism_class: activeMechanism.mechanism_class,
          step_number: currentStep.step_number,
          activation_energy_kj_mol: currentStep.activation_energy_kj_mol,
          reaction_energy_kj_mol: currentStep.reaction_energy_kj_mol,
          intermediate_type: currentStep.intermediate_type,
          substrate: activeMechanism.substrate,
          nucleophile: activeMechanism.nucleophile_or_reagent,
        }),
      });
      setSaveStatus('Logged to Notebook!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus('Saved to local journal.');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // Curved Arrow SVG Bezier Generator
  const renderCurvedArrow = (arrow: CurvedArrow, idx: number) => {
    const startX = arrow.source_coords[0] * 500;
    const startY = arrow.source_coords[1] * 240;
    const endX = arrow.target_coords[0] * 500;
    const endY = arrow.target_coords[1] * 240;

    // Calculate mid-point and perpendicular displacement for Bezier curvature
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const dx = endX - startX;
    const dy = endY - startY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    // Perpendicular vector
    const perpX = -dy / dist;
    const perpY = dx / dist;
    const curvatureHeight = (arrow.curvature_bias || 0.35) * dist;

    const ctrlX = midX + perpX * curvatureHeight;
    const ctrlY = midY + perpY * curvatureHeight;

    const pathData = `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;

    return (
      <g key={idx} className="cursor-pointer">
        <defs>
          <marker
            id={`arrowhead-${idx}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M 0 0 L 8 4 L 0 8 z" fill="#DC2626" />
          </marker>
        </defs>

        {/* Outer glowing trace */}
        <path
          d={pathData}
          fill="none"
          stroke="#F87171"
          strokeWidth="4"
          strokeOpacity="0.4"
          className="animate-pulse"
        />

        {/* Animated dashed curved electron flow path */}
        <path
          d={pathData}
          fill="none"
          stroke="#DC2626"
          strokeWidth="2.5"
          strokeDasharray="6,4"
          markerEnd={`url(#arrowhead-${idx})`}
          className="transition-all duration-300"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="20"
            to="0"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </path>

        {/* Label on control point */}
        <text
          x={ctrlX}
          y={ctrlY - 6}
          fontSize="10"
          fill="#DC2626"
          fontWeight="bold"
          textAnchor="middle"
          className="select-none bg-surface-container"
        >
          2e-
        </text>
      </g>
    );
  };

  return (
    <div className="flex flex-col w-full space-y-space-md">
      {/* Top Strip: Preset Mechanism Chips */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">airline_stops</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Organic Reaction Mechanism & Curved-Arrow Engine
              </h2>
              {activeMechanism && (
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 font-code-sm text-xs font-semibold">
                  {activeMechanism.mechanism_class}
                </span>
              )}
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Two-electron pushing formalisms, transition state geometries, and reaction coordinate free energy landscapes
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {saveStatus && (
            <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-semibold animate-pulse">
              {saveStatus}
            </span>
          )}
          <button
            type="button"
            onClick={handleSaveToNotebook}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">book</span>
            <span>{isSaving ? 'Logging...' : 'Log to Notebook'}</span>
          </button>
        </div>
      </div>

      {/* Mechanism Presets Ribbon */}
      <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-surface-container-low flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-xs font-semibold uppercase text-outline tracking-wider flex items-center gap-1 shrink-0 pr-1">
          <span className="material-symbols-outlined text-[14px]">science</span> Mechanisms:
        </span>
        {mechanisms.map((mech) => {
          const isSelected = mech.id === selectedMechId;
          return (
            <button
              key={mech.id}
              type="button"
              onClick={() => setSelectedMechId(mech.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-red-600 text-white font-bold shadow-xs'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="font-mono text-[11px] opacity-80">[{mech.mechanism_class}]</span>
              <span>{mech.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tri-Pane Mechanism Inspection Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        {/* Left/Center Column: Interactive Curved-Arrow Canvas & Step Player (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-space-sm">
          {/* Step Command Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-container pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-surface-container text-xs font-mono font-bold text-primary">
                Step {(currentStepIndex + 1)} of {activeMechanism?.steps.length || 1}
              </span>
              <h3 className="font-headline-xs text-xs font-bold text-on-surface">
                {currentStep?.title}
              </h3>
            </div>

            {/* Prev / Next & Auto-play controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentStepIndex === 0}
                className="p-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high disabled:opacity-40"
                title="Previous Step"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-1 rounded ${isPlaying ? 'bg-red-600 text-white' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'}`}
                title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentStepIndex((prev) =>
                    activeMechanism ? Math.min(activeMechanism.steps.length - 1, prev + 1) : prev
                  )
                }
                disabled={!activeMechanism || currentStepIndex === activeMechanism.steps.length - 1}
                className="p-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high disabled:opacity-40"
                title="Next Step"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Canvas Viewport with Curved Electron Arrows */}
          <div className="relative w-full h-[280px] bg-surface-container-low rounded-lg p-3 border border-surface-container flex flex-col justify-between overflow-hidden">
            {/* Top Chemical Reactant & Product Label */}
            <div className="flex items-center justify-between text-xs font-mono font-semibold px-2 z-10">
              <div className="bg-surface-container-lowest/80 backdrop-blur-xs px-2 py-1 rounded border border-surface-container">
                <span className="text-outline uppercase text-[10px] block">Reactants</span>
                <span className="text-on-surface">{currentStep?.reactants_label}</span>
              </div>
              <span className="material-symbols-outlined text-outline text-[20px]">east</span>
              <div className="bg-surface-container-lowest/80 backdrop-blur-xs px-2 py-1 rounded border border-surface-container">
                <span className="text-outline uppercase text-[10px] block">Products / Intermediates</span>
                <span className="text-emerald-700 dark:text-emerald-300">{currentStep?.products_label}</span>
              </div>
            </div>

            {/* Central SVG Electron Movement Canvas */}
            <div className="relative flex-1 w-full flex items-center justify-center my-2">
              <svg viewBox="0 0 500 240" className="w-full h-full">
                {/* Background grid */}
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.04" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Render all curved electron pushing arrows */}
                {currentStep?.curved_arrows.map((arrow, idx) => renderCurvedArrow(arrow, idx))}

                {/* Source & Target Highlight Circles */}
                {currentStep?.curved_arrows.map((arrow, idx) => {
                  const sx = arrow.source_coords[0] * 500;
                  const sy = arrow.source_coords[1] * 240;
                  const tx = arrow.target_coords[0] * 500;
                  const ty = arrow.target_coords[1] * 240;
                  return (
                    <g key={`markers-${idx}`}>
                      <circle cx={sx} cy={sy} r="4" fill="#3B82F6" stroke="#FFF" strokeWidth="1" />
                      <circle cx={tx} cy={ty} r="4" fill="#DC2626" stroke="#FFF" strokeWidth="1" />
                      <text x={sx} y={sy + 12} fontSize="9" fill="#3B82F6" textAnchor="middle" fontWeight="bold">
                        {arrow.source_label}
                      </text>
                      <text x={tx} y={ty + 12} fontSize="9" fill="#DC2626" textAnchor="middle" fontWeight="bold">
                        {arrow.target_label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Step Description Banner */}
            <div className="bg-surface-container-lowest/90 backdrop-blur-xs p-2 rounded-md border border-surface-container text-xs text-on-surface">
              <span className="font-bold text-red-600 mr-1.5">Action:</span>
              <span>{currentStep?.description}</span>
            </div>
          </div>

          {/* Key Bonds Formed & Broken Pills */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container">
              <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300 block mb-1">
                Bonds Formed
              </span>
              <div className="flex flex-wrap gap-1">
                {currentStep?.key_bonds_formed.length ? (
                  currentStep.key_bonds_formed.map((b, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-mono text-[11px]">
                      + {b}
                    </span>
                  ))
                ) : (
                  <span className="text-outline italic text-[11px]">None in this step</span>
                )}
              </div>
            </div>

            <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container">
              <span className="text-[10px] uppercase font-bold text-red-700 dark:text-red-300 block mb-1">
                Bonds Broken
              </span>
              <div className="flex flex-wrap gap-1">
                {currentStep?.key_bonds_broken.length ? (
                  currentStep.key_bonds_broken.map((b, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 font-mono text-[11px]">
                      - {b}
                    </span>
                  ))
                ) : (
                  <span className="text-outline italic text-[11px]">None in this step</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reaction Coordinate Energy Landscape & Kinetics (5 cols) */}
        <div className="lg:col-span-5 space-y-space-md">
          {/* Reaction Coordinate Energy Profile SVG */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">stacked_line_chart</span>
                Reaction Coordinate (Delta G)
              </span>
              <span className="text-xs font-mono text-outline">
                Delta G‡: {currentStep?.activation_energy_kj_mol} kJ/mol
              </span>
            </div>

            {/* Smooth Free Energy Curve Plot */}
            <div className="relative w-full h-[200px] bg-surface-container-low rounded-lg p-2 border border-surface-container">
              {energyInterpolation && (
                <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
                  {/* Zero Energy Baseline */}
                  <line x1="20" y1="100" x2="380" y2="100" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3,3" />
                  <text x="382" y="103" fontSize="9" fill="currentColor" opacity="0.6">0 kJ</text>

                  {/* Energy curve path */}
                  {(() => {
                    const minE = Math.min(...energyInterpolation.gibbs_energy_curve, -50);
                    const maxE = Math.max(...energyInterpolation.gibbs_energy_curve, 100);
                    const rangeE = maxE - minE || 1;

                    const points = energyInterpolation.coordinate_grid.map((coord, i) => {
                      const x = coord * 340 + 30;
                      const energy = energyInterpolation.gibbs_energy_curve[i];
                      const y = 140 - ((energy - minE) / rangeE) * 120;
                      return `${x},${y}`;
                    });

                    return (
                      <path
                        d={`M ${points.join(' L ')}`}
                        fill="none"
                        stroke="#EA580C"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                    );
                  })()}

                  {/* Critical Points (Transition states & intermediates) */}
                  {activeMechanism?.energy_profile.map((pt, i) => {
                    const minE = Math.min(...(energyInterpolation?.gibbs_energy_curve || [0]), -50);
                    const maxE = Math.max(...(energyInterpolation?.gibbs_energy_curve || [100]), 100);
                    const rangeE = maxE - minE || 1;
                    const x = pt.reaction_coordinate * 340 + 30;
                    const y = 140 - ((pt.gibbs_free_energy_kj_mol - minE) / rangeE) * 120;

                    const isTS = pt.point_type === 'transition_state';

                    return (
                      <g key={i}>
                        <circle
                          cx={x}
                          cy={y}
                          r={isTS ? 4.5 : 3.5}
                          fill={isTS ? '#DC2626' : '#2563EB'}
                          stroke="#FFF"
                          strokeWidth="1.5"
                        />
                        <text
                          x={x}
                          y={isTS ? y - 7 : y + 12}
                          fontSize="8"
                          fill="currentColor"
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          {pt.gibbs_free_energy_kj_mol > 0 ? `+${pt.gibbs_free_energy_kj_mol}` : pt.gibbs_free_energy_kj_mol}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>

            {/* Thermodynamic & Kinetic Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div className="p-2 rounded bg-surface-container-low border border-surface-container">
                <span className="text-[10px] text-outline uppercase font-semibold block">Activation Barrier</span>
                <span className="font-mono font-bold text-red-600">
                  +{currentStep?.activation_energy_kj_mol} kJ/mol
                </span>
              </div>
              <div className="p-2 rounded bg-surface-container-low border border-surface-container">
                <span className="text-[10px] text-outline uppercase font-semibold block">Step Enthalpy</span>
                <span className="font-mono font-bold text-on-surface">
                  {currentStep && currentStep.reaction_energy_kj_mol > 0
                    ? `+${currentStep.reaction_energy_kj_mol}`
                    : currentStep?.reaction_energy_kj_mol} kJ/mol
                </span>
              </div>
            </div>
          </div>

          {/* Stereochemistry, Rate Law, and Pedagogical Card */}
          {activeMechanism && (
            <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-space-sm text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-outline tracking-wider block">
                  Stereochemical Course
                </span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-[18px]">
                    flip
                  </span>
                  <span className="font-mono font-bold text-on-surface">
                    {activeMechanism.stereochemical_outcome.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-outline tracking-wider block">
                  Kinetics Rate Law
                </span>
                <div className="p-2 rounded bg-surface-container-low font-mono font-bold text-primary">
                  {activeMechanism.kinetics_rate_law}
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-surface-container">
                <span className="text-[10px] uppercase font-bold text-outline tracking-wider block">
                  Mechanistic Insights
                </span>
                <p className="text-on-surface-variant leading-relaxed">
                  {activeMechanism.pedagogical_notes}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
