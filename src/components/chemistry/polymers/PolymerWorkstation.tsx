import React, { useState, useEffect, useMemo } from 'react';
import {
  PolymerSimulationResult,
  PolymerPresetSummary,
} from '../../../types/polymers';
import { polymerService } from '../../../services/polymerService';
import { experimentsApi } from '../../../services/api';

export const PolymerWorkstation: React.FC = () => {
  const [presets, setPresets] = useState<PolymerPresetSummary[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('nylon_6_6');
  const [simulation, setSimulation] = useState<PolymerSimulationResult | null>(null);

  // Reaction sliders
  const [conversionP, setConversionP] = useState<number>(0.985);
  const [stoichiometricRatioR, setStoichiometricRatioR] = useState<number>(1.0);
  const [chiParameter, setChiParameter] = useState<number>(0.42);

  // Visualization tab switcher
  const [activeTab, setActiveTab] = useState<'distribution' | 'flory_huggins'>('distribution');

  // Notebook persistence state
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load presets on mount
  useEffect(() => {
    polymerService.getPresets().then((list) => {
      setPresets(list);
    });
  }, []);

  // Sync simulation whenever preset or parameters change
  useEffect(() => {
    polymerService
      .getPresetSimulation(selectedPresetId, conversionP, stoichiometricRatioR, chiParameter)
      .then((res) => {
        setSimulation(res);
      });
  }, [selectedPresetId, conversionP, stoichiometricRatioR, chiParameter]);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    if (presetId === 'nylon_6_6') {
      setConversionP(0.985);
      setStoichiometricRatioR(1.0);
      setChiParameter(0.42);
    } else if (presetId === 'pet') {
      setConversionP(0.982);
      setStoichiometricRatioR(1.0);
      setChiParameter(0.40);
    } else if (presetId === 'pmma') {
      setConversionP(0.80);
      setStoichiometricRatioR(1.0);
      setChiParameter(0.38);
    } else if (presetId === 'polystyrene') {
      setConversionP(0.85);
      setStoichiometricRatioR(1.0);
      setChiParameter(0.35);
    } else if (presetId === 'pla') {
      setConversionP(0.990);
      setStoichiometricRatioR(1.0);
      setChiParameter(0.46);
    } else if (presetId === 'polyurethane_network') {
      setConversionP(0.88);
      setStoichiometricRatioR(1.0);
      setChiParameter(0.52);
    }
  };

  const handleSaveToNotebook = async () => {
    if (!simulation) return;
    setIsSaving(true);
    setSaveStatus(null);
    try {
      await experimentsApi.saveExperiment({
        title: `Macromolecules: ${simulation.polymer_name}`,
        experiment_type: 'materials',
        status: 'completed',
        observations: `Polymer: ${simulation.polymer_name} (${simulation.mechanism}). Conversion p=${simulation.conversion_p}. Mn=${simulation.number_average_mn} g/mol, Mw=${simulation.weight_average_mw} g/mol, PDI=${simulation.polydispersity_index}. Gelation: ${simulation.carothers?.is_gel_formed ? 'GEL FORMED' : 'Sol phase'}.`,
        state_data: JSON.stringify({
          polymer_id: selectedPresetId,
          formula: simulation.repeat_unit_formula,
          conversion_p: simulation.conversion_p,
          mn: simulation.number_average_mn,
          mw: simulation.weight_average_mw,
          pdi: simulation.polydispersity_index,
          is_gelled: simulation.carothers?.is_gel_formed ?? false,
        }),
      });
      setSaveStatus('Logged to Notebook');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus('Logged locally');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // SVG dimensions for charts
  const svgWidth = 720;
  const svgHeight = 260;
  const pad = { top: 25, right: 35, bottom: 40, left: 55 };
  const plotW = svgWidth - pad.left - pad.right;
  const plotH = svgHeight - pad.top - pad.bottom;

  // Distribution chart paths
  const distCurve = simulation?.distribution_curve || [];
  const maxMw = useMemo(() => {
    if (distCurve.length === 0) return 50000;
    return Math.max(...distCurve.map((pt) => pt.molecular_weight)) * 1.05;
  }, [distCurve]);

  const maxWi = useMemo(() => {
    if (distCurve.length === 0) return 0.05;
    const maxVal = Math.max(...distCurve.map((pt) => pt.weight_fraction));
    return Math.max(maxVal * 1.15, 0.001);
  }, [distCurve]);

  const scaleMwX = (mw: number) => pad.left + (mw / maxMw) * plotW;
  const scaleWiY = (wi: number) => pad.top + plotH - (wi / maxWi) * plotH;

  const distributionPath = useMemo(() => {
    if (distCurve.length === 0) return '';
    return distCurve
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${scaleMwX(pt.molecular_weight).toFixed(1)} ${scaleWiY(pt.weight_fraction).toFixed(1)}`)
      .join(' ');
  }, [distCurve, maxMw, maxWi]);

  // Flory-Huggins free energy curve path
  const fhPoints = simulation?.flory_huggins?.curve_points || [];
  const minDg = useMemo(() => {
    if (fhPoints.length === 0) return -0.1;
    return Math.min(...fhPoints.map((pt) => pt.delta_g_mix_rt), -0.05);
  }, [fhPoints]);
  const maxDg = useMemo(() => {
    if (fhPoints.length === 0) return 0.1;
    return Math.max(...fhPoints.map((pt) => pt.delta_g_mix_rt), 0.05);
  }, [fhPoints]);

  const scalePhiX = (phi: number) => pad.left + phi * plotW;
  const scaleDgY = (dg: number) => pad.top + plotH - ((dg - minDg) / (maxDg - minDg)) * plotH;

  const floryHugginsPath = useMemo(() => {
    if (fhPoints.length === 0) return '';
    return fhPoints
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${scalePhiX(pt.phi_polymer).toFixed(1)} ${scaleDgY(pt.delta_g_mix_rt).toFixed(1)}`)
      .join(' ');
  }, [fhPoints, minDg, maxDg]);

  return (
    <div className="flex flex-col w-full space-y-space-md">
      {/* Top Header Command Strip */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-headline-md text-base sm:text-lg text-on-surface font-bold">
              Polymer Chemistry & Macromolecular Architecture
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-code-sm text-xs font-semibold uppercase">
              {simulation?.mechanism.replace('_', ' ').toUpperCase()}
            </span>
            {simulation?.carothers?.is_gel_formed && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                Macroscopic Gel Network Formed
              </span>
            )}
            {simulation?.radical_kinetics?.autoacceleration_trommsdorff && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                Trommsdorff Gel Effect Active
              </span>
            )}
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
            Carothers step-growth polycondensation, Flory-Stockmayer gelation point, radical chain kinetics (QSSA), and Flory-Huggins solution thermodynamics
          </p>
        </div>

        {/* Notebook Button */}
        <div className="flex items-center gap-2">
          {saveStatus && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {saveStatus}
            </span>
          )}
          <button
            type="button"
            onClick={handleSaveToNotebook}
            disabled={isSaving || !simulation}
            className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container border border-surface-container text-xs font-semibold text-on-surface flex items-center gap-1 transition"
          >
            <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
            {isSaving ? 'Logging...' : 'Log to Notebook'}
          </button>
        </div>
      </div>

      {/* Preset Application Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {presets.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-primary text-on-primary border-primary shadow-xs'
                  : 'bg-surface-container-lowest text-on-surface-variant border-surface-container hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {preset.mechanism === 'step_growth' ? 'link' : 'scatter_plot'}
              </span>
              <span>{preset.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: 8 cols (Visualizer Canvas & Tab) + 4 cols (Reaction Controls & Telemetry) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
        {/* Left Column (8 cols): Visualization Viewport with Dual Tabs */}
        <div className="lg:col-span-8 space-y-space-md">
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm">
            {/* Viewport Header with Tabs */}
            <div className="flex items-center justify-between mb-3 border-b border-surface-container pb-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('distribution')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                    activeTab === 'distribution'
                      ? 'bg-primary text-on-primary'
                      : 'text-outline hover:text-on-surface'
                  }`}
                >
                  Molecular Weight Distribution (Flory-Schulz)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('flory_huggins')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                    activeTab === 'flory_huggins'
                      ? 'bg-primary text-on-primary'
                      : 'text-outline hover:text-on-surface'
                  }`}
                >
                  Flory-Huggins Solution Thermodynamics
                </button>
              </div>

              {simulation && (
                <div className="text-xs text-outline font-mono">
                  Formula: <strong className="text-on-surface">{simulation.repeat_unit_formula}</strong>
                </div>
              )}
            </div>

            {/* Tab 1: Molecular Weight Distribution SVG */}
            {activeTab === 'distribution' && (
              <div className="space-y-2">
                <div className="w-full overflow-x-auto bg-surface-container-low/40 rounded-lg p-2 border border-surface-container">
                  <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[500px]">
                    {/* Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
                      const y = pad.top + plotH * frac;
                      return (
                        <line
                          key={frac}
                          x1={pad.left}
                          y1={y}
                          x2={svgWidth - pad.right}
                          y2={y}
                          stroke="currentColor"
                          strokeOpacity="0.1"
                          strokeDasharray="3 3"
                        />
                      );
                    })}

                    {/* Weight fraction curve */}
                    {distributionPath && (
                      <path d={distributionPath} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinejoin="round" />
                    )}

                    {/* Number-average Mn vertical line */}
                    {simulation && (
                      <g>
                        <line
                          x1={scaleMwX(simulation.number_average_mn)}
                          y1={pad.top}
                          x2={scaleMwX(simulation.number_average_mn)}
                          y2={pad.top + plotH}
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeDasharray="4 3"
                        />
                        <text
                          x={scaleMwX(simulation.number_average_mn) + 4}
                          y={pad.top + 18}
                          fill="#10b981"
                          fontSize="10"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          Mn ({simulation.number_average_mn.toLocaleString()} g/mol)
                        </text>
                      </g>
                    )}

                    {/* Weight-average Mw vertical line */}
                    {simulation && (
                      <g>
                        <line
                          x1={scaleMwX(simulation.weight_average_mw)}
                          y1={pad.top}
                          x2={scaleMwX(simulation.weight_average_mw)}
                          y2={pad.top + plotH}
                          stroke="#8b5cf6"
                          strokeWidth="2"
                          strokeDasharray="4 3"
                        />
                        <text
                          x={scaleMwX(simulation.weight_average_mw) + 4}
                          y={pad.top + 34}
                          fill="#8b5cf6"
                          fontSize="10"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          Mw ({simulation.weight_average_mw.toLocaleString()} g/mol)
                        </text>
                      </g>
                    )}

                    {/* X Axis */}
                    <line x1={pad.left} y1={pad.top + plotH} x2={svgWidth - pad.right} y2={pad.top + plotH} stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
                    <text x={pad.left + plotW / 2} y={svgHeight - 6} textAnchor="middle" fill="currentColor" opacity="0.7" fontSize="11" fontWeight="bold">
                      Molecular Weight M (g/mol)
                    </text>

                    {/* Y Axis */}
                    <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
                    <text x={-(pad.top + plotH / 2)} y={16} transform="rotate(-90)" textAnchor="middle" fill="currentColor" opacity="0.7" fontSize="11" fontWeight="bold">
                      Weight Fraction w_i
                    </text>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs text-outline px-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span>
                    Differential Weight Distribution (w<sub>i</sub>)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    Number-Average M<sub>n</sub>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>
                    Weight-Average M<sub>w</sub>
                  </span>
                </div>
              </div>
            )}

            {/* Tab 2: Flory-Huggins Solution Thermodynamics SVG */}
            {activeTab === 'flory_huggins' && (
              <div className="space-y-2">
                <div className="w-full overflow-x-auto bg-surface-container-low/40 rounded-lg p-2 border border-surface-container">
                  <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[500px]">
                    {/* Zero Free Energy Line */}
                    <line
                      x1={pad.left}
                      y1={scaleDgY(0)}
                      x2={svgWidth - pad.right}
                      y2={scaleDgY(0)}
                      stroke="currentColor"
                      strokeOpacity="0.2"
                      strokeWidth="1"
                    />

                    {/* Flory-Huggins Free Energy Curve */}
                    {floryHugginsPath && (
                      <path d={floryHugginsPath} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
                    )}

                    {/* Critical volume fraction marker */}
                    {simulation?.flory_huggins && (
                      <g>
                        <line
                          x1={scalePhiX(simulation.flory_huggins.critical_phi_polymer)}
                          y1={pad.top}
                          x2={scalePhiX(simulation.flory_huggins.critical_phi_polymer)}
                          y2={pad.top + plotH}
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          strokeDasharray="4 3"
                        />
                        <text
                          x={scalePhiX(simulation.flory_huggins.critical_phi_polymer) + 4}
                          y={pad.top + 18}
                          fill="#ef4444"
                          fontSize="10"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          &phi;2,c ({simulation.flory_huggins.critical_phi_polymer})
                        </text>
                      </g>
                    )}

                    {/* X Axis */}
                    <line x1={pad.left} y1={pad.top + plotH} x2={svgWidth - pad.right} y2={pad.top + plotH} stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
                    <text x={pad.left + plotW / 2} y={svgHeight - 6} textAnchor="middle" fill="currentColor" opacity="0.7" fontSize="11" fontWeight="bold">
                      Polymer Volume Fraction (&phi;<sub>2</sub>)
                    </text>

                    {/* Y Axis */}
                    <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
                    <text x={-(pad.top + plotH / 2)} y={16} transform="rotate(-90)" textAnchor="middle" fill="currentColor" opacity="0.7" fontSize="11" fontWeight="bold">
                      &Delta;G<sub>mix</sub> / RT
                    </text>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs text-outline px-1">
                  <span>
                    Interaction Parameter: <strong className="text-on-surface font-mono">&chi; = {chiParameter}</strong>
                  </span>
                  <span>
                    Critical Parameter: <strong className="text-on-surface font-mono">&chi;<sub>c</sub> = {simulation?.flory_huggins?.critical_chi}</strong>
                  </span>
                  <span className={`font-semibold ${simulation?.flory_huggins?.is_phase_separated ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {simulation?.flory_huggins?.is_phase_separated ? 'Phase Separated (Demixed)' : 'Homogeneous Solution'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics Dashboard Strip */}
          {simulation && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-surface-container-lowest rounded-xl p-3 border border-surface-container-low shadow-sm">
                <span className="text-[10px] text-outline uppercase font-semibold block">Number-Average (Mn)</span>
                <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                  {simulation.number_average_mn.toLocaleString()} g/mol
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-3 border border-surface-container-low shadow-sm">
                <span className="text-[10px] text-outline uppercase font-semibold block">Weight-Average (Mw)</span>
                <div className="text-base font-bold text-purple-600 dark:text-purple-400 font-mono mt-0.5">
                  {simulation.weight_average_mw.toLocaleString()} g/mol
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-3 border border-surface-container-low shadow-sm">
                <span className="text-[10px] text-outline uppercase font-semibold block">Polydispersity (PDI)</span>
                <div className="text-base font-bold text-primary font-mono mt-0.5">
                  {simulation.polydispersity_index}
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-3 border border-surface-container-low shadow-sm">
                <span className="text-[10px] text-outline uppercase font-semibold block">Degree of Polym. (Xn)</span>
                <div className="text-base font-bold text-on-surface font-mono mt-0.5">
                  {simulation.carothers?.degree_of_polymerization_xn ?? simulation.radical_kinetics?.predicted_xn ?? 50}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Reaction Controls, Kinetics & Pedagogical Notes */}
        <div className="lg:col-span-4 space-y-space-md">
          {/* Reaction Controls Card */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              Polymerization Reaction Controls
            </span>

            {/* Conversion p Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant font-medium">Functional Group Conversion (p)</span>
                <span className="font-mono font-bold text-primary">{(conversionP * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.50"
                max="0.999"
                step="0.001"
                value={conversionP}
                onChange={(e) => setConversionP(parseFloat(e.target.value))}
                className="w-full accent-primary h-1.5 bg-surface-container rounded-lg cursor-pointer"
              />
            </div>

            {/* Stoichiometric Ratio r Slider (for step growth) */}
            {simulation?.mechanism === 'step_growth' && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant font-medium">Stoichiometric Ratio (r = N_A / N_B)</span>
                  <span className="font-mono font-bold text-on-surface">{stoichiometricRatioR.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0.80"
                  max="1.0"
                  step="0.005"
                  value={stoichiometricRatioR}
                  onChange={(e) => setStoichiometricRatioR(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container rounded-lg cursor-pointer"
                />
              </div>
            )}

            {/* Flory-Huggins Chi Parameter Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant font-medium">Flory-Huggins Interaction (&chi;)</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{chiParameter.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.80"
                step="0.02"
                value={chiParameter}
                onChange={(e) => setChiParameter(parseFloat(e.target.value))}
                className="w-full accent-amber-600 h-1.5 bg-surface-container rounded-lg cursor-pointer"
              />
            </div>

            {/* Carothers / Radical Details Box */}
            {simulation?.carothers && (
              <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-outline">Average Functionality (f<sub>av</sub>):</span>
                  <span className="font-mono font-bold text-on-surface">{simulation.carothers.average_functionality_fav}</span>
                </div>
                {simulation.carothers.gel_point_pc !== null && (
                  <div className="flex justify-between">
                    <span className="text-outline">Theoretical Gel Point (p<sub>c</sub>):</span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                      {(simulation.carothers.gel_point_pc * 100).toFixed(1)}%
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-outline">Carothers Formula:</span>
                  <span className="font-mono text-on-surface">X<sub>n</sub> = (1+r)/(1+r-2rp)</span>
                </div>
              </div>
            )}

            {simulation?.radical_kinetics && (
              <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-outline">Polymerization Rate (R<sub>p</sub>):</span>
                  <span className="font-mono font-bold text-on-surface">{simulation.radical_kinetics.polymerization_rate_rp_mol_l_s} mol/(L&middot;s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Kinetic Chain Length (&nu;):</span>
                  <span className="font-mono font-bold text-primary">{simulation.radical_kinetics.kinetic_chain_length_nu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Radical Conc. ([M&bull;]):</span>
                  <span className="font-mono text-outline">{simulation.radical_kinetics.radical_concentration_m.toExponential(2)} M</span>
                </div>
              </div>
            )}
          </div>

          {/* Pedagogical Insights Card */}
          {simulation && (
            <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-outline tracking-wider block">
                Macromolecular Mechanism & Theory
              </span>
              <p className="text-on-surface-variant leading-relaxed">
                {simulation.pedagogical_notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
