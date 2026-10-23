import React, { useState, useEffect, useMemo } from 'react';
import {
  GitCommit,
  Layers,
  Sparkles,
  RotateCcw,
  Activity,
  Sliders,
  TrendingUp,
  Cpu,
  Info,
  CheckCircle2,
  Atom,
  Clock,
  Compass,
} from 'lucide-react';
import {
  dynamicCovalentService,
  CURATED_MOTIFS,
  CURATED_BUILDING_BLOCKS,
  CURATED_TEMPLATES,
} from '../../../services/dynamicCovalentService';
import {
  DCLSimulationResult,
  DynamicExchangeKineticsResult,
} from '../../../types/dynamicCovalent';

export const DynamicCovalentWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dcl_library' | 'exchange_kinetics' | 'mechanisms'>(
    'dcl_library'
  );

  // DCL Simulation parameters
  const [selectedMotifId, setSelectedMotifId] = useState<string>('imine_condensation');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('zinc_cation');
  const [templateConcentrationMM, setTemplateConcentrationMM] = useState<number>(2.0);
  const [temperatureK, setTemperatureK] = useState<number>(298.15);
  const [ph, setPh] = useState<number>(6.5);
  const [dialdehydeAConc, setDialdehydeAConc] = useState<number>(2.0);
  const [diamineBConc, setDiamineBConc] = useState<number>(2.0);
  const [monoamineCConc, setMonoamineCConc] = useState<number>(1.0);
  const [dclResult, setDclResult] = useState<DCLSimulationResult | null>(null);

  // Exchange Kinetics parameters
  const [kineticsMotifId, setKineticsMotifId] = useState<string>('disulfide_exchange');
  const [initialSym1, setInitialSym1] = useState<number>(5.0);
  const [initialSym2, setInitialSym2] = useState<number>(5.0);
  const [initialAsym, setInitialAsym] = useState<number>(0.0);
  const [catalystConcUM, setCatalystConcUM] = useState<number>(150.0);
  const [timeSpanSeconds, setTimeSpanSeconds] = useState<number>(3600.0);
  const [kineticsResult, setKineticsResult] = useState<DynamicExchangeKineticsResult | null>(null);

  // Run DCL calculation
  useEffect(() => {
    try {
      const res = dynamicCovalentService.simulateDclLocally({
        motif_id: selectedMotifId,
        building_block_concs_mM: {
          dialdehyde_A: dialdehydeAConc,
          diamine_B: diamineBConc,
          monoamine_C: monoamineCConc,
          dithiol_E: 2.0,
          catechol_F: 2.0,
          dialdehyde_D: 2.0,
        },
        template_id: selectedTemplateId === 'none' ? null : selectedTemplateId,
        template_concentration_mM: selectedTemplateId === 'none' ? 0.0 : templateConcentrationMM,
        temperature_k: temperatureK,
        ph,
      });
      setDclResult(res.result);
    } catch (err) {
      console.error('DCL simulation error:', err);
    }
  }, [
    selectedMotifId,
    selectedTemplateId,
    templateConcentrationMM,
    temperatureK,
    ph,
    dialdehydeAConc,
    diamineBConc,
    monoamineCConc,
  ]);

  // Run Kinetics calculation
  useEffect(() => {
    try {
      const res = dynamicCovalentService.calculateExchangeKineticsLocally({
        motif_id: kineticsMotifId,
        initial_symmetric_1_mM: initialSym1,
        initial_symmetric_2_mM: initialSym2,
        initial_asymmetric_mM: initialAsym,
        thiol_catalyst_conc_uM: catalystConcUM,
        temperature_k: temperatureK,
        time_span_seconds: timeSpanSeconds,
        steps_count: 50,
      });
      setKineticsResult(res.result);
    } catch (err) {
      console.error('Exchange kinetics error:', err);
    }
  }, [kineticsMotifId, initialSym1, initialSym2, initialAsym, catalystConcUM, temperatureK, timeSpanSeconds]);

  const selectedMotif = useMemo(
    () => CURATED_MOTIFS.find((m) => m.id === selectedMotifId) || CURATED_MOTIFS[0],
    [selectedMotifId]
  );

  const handleReset = () => {
    setSelectedMotifId('imine_condensation');
    setSelectedTemplateId('zinc_cation');
    setTemplateConcentrationMM(2.0);
    setTemperatureK(298.15);
    setPh(6.5);
    setDialdehydeAConc(2.0);
    setDiamineBConc(2.0);
    setMonoamineCConc(1.0);
    setInitialSym1(5.0);
    setInitialSym2(5.0);
    setInitialAsym(0.0);
    setCatalystConcUM(150.0);
    setTimeSpanSeconds(3600.0);
  };

  // SVG Data for Kinetics Plot
  const kineticsSvgData = useMemo(() => {
    if (!kineticsResult || kineticsResult.trajectory.length === 0) return null;
    const traj = kineticsResult.trajectory;
    const maxT = Math.max(...traj.map((p) => p.timeSeconds), 1.0);
    const maxConc = Math.max(
      ...traj.map((p) =>
        Math.max(
          p.speciesConcentrationsMM.symmetric_1 ?? 0,
          p.speciesConcentrationsMM.symmetric_2 ?? 0,
          p.speciesConcentrationsMM.asymmetric ?? 0
        )
      ),
      1.0
    );

    const width = 600;
    const height = 280;
    const padding = { top: 25, right: 35, bottom: 45, left: 55 };
    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    const toX = (t: number) => padding.left + (t / maxT) * plotW;
    const toY = (c: number) => padding.top + plotH - (c / maxConc) * plotH;

    const pathSym1 = traj
      .map(
        (p, i) =>
          `${i === 0 ? 'M' : 'L'} ${toX(p.timeSeconds).toFixed(1)} ${toY(
            p.speciesConcentrationsMM.symmetric_1 ?? 0
          ).toFixed(1)}`
      )
      .join(' ');

    const pathSym2 = traj
      .map(
        (p, i) =>
          `${i === 0 ? 'M' : 'L'} ${toX(p.timeSeconds).toFixed(1)} ${toY(
            p.speciesConcentrationsMM.symmetric_2 ?? 0
          ).toFixed(1)}`
      )
      .join(' ');

    const pathAsym = traj
      .map(
        (p, i) =>
          `${i === 0 ? 'M' : 'L'} ${toX(p.timeSeconds).toFixed(1)} ${toY(
            p.speciesConcentrationsMM.asymmetric ?? 0
          ).toFixed(1)}`
      )
      .join(' ');

    return {
      width,
      height,
      padding,
      plotW,
      plotH,
      maxT,
      maxConc,
      pathSym1,
      pathSym2,
      pathAsym,
      toX,
      toY,
    };
  }, [kineticsResult]);

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Workstation Header Bar */}
      <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
            <GitCommit className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-on-surface">
                Dynamic Covalent Chemistry & Constitutional Networks
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-xs font-semibold">
                Rig #13
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Reversible covalent bond exchanges under thermodynamic control, adaptive DCL self-sorting, and template-driven amplification
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2">
          <div className="flex bg-surface-container-low p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('dcl_library')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'dcl_library'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Constitutional Library (DCL)
            </button>
            <button
              onClick={() => setActiveTab('exchange_kinetics')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'exchange_kinetics'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Exchange Relaxation Kinetics
            </button>
            <button
              onClick={() => setActiveTab('mechanisms')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'mechanisms'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Motif Chemistries & Principles
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition text-xs font-semibold"
            title="Reset default simulation parameters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DCL LIBRARY & TEMPLATE AMPLIFICATION */}
      {activeTab === 'dcl_library' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Controls Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Motif & Conditions Panel */}
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary" />
                <span>Reaction Parameters & External Template</span>
              </h3>

              {/* Dynamic Motif Selector */}
              <div>
                <label className="text-xs font-medium text-on-surface-variant block mb-1">
                  Dynamic Bond Motif
                </label>
                <select
                  value={selectedMotifId}
                  onChange={(e) => setSelectedMotifId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-surface-container border border-surface-container-high text-on-surface focus:outline-hidden focus:ring-1 focus:ring-primary"
                >
                  {CURATED_MOTIFS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.reactionType})
                    </option>
                  ))}
                </select>
              </div>

              {/* Directing Template Selector */}
              <div>
                <label className="text-xs font-medium text-on-surface-variant block mb-1">
                  Directing Template Receptor
                </label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => setSelectedTemplateId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-surface-container border border-surface-container-high text-on-surface focus:outline-hidden focus:ring-1 focus:ring-primary"
                >
                  <option value="none">— None (Untemplated Library) —</option>
                  {CURATED_TEMPLATES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.templateType})
                    </option>
                  ))}
                </select>
              </div>

              {/* Template Concentration Slider */}
              {selectedTemplateId !== 'none' && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant">Template Concentration [T]</span>
                    <span className="font-mono font-bold text-primary">
                      {templateConcentrationMM.toFixed(2)} mM
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="10.0"
                    step="0.1"
                    value={templateConcentrationMM}
                    onChange={(e) => setTemplateConcentrationMM(parseFloat(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              )}

              {/* pH & Temperature */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant">Medium pH</span>
                    <span className="font-mono font-bold text-primary">{ph.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="3.0"
                    max="11.0"
                    step="0.5"
                    value={ph}
                    onChange={(e) => setPh(parseFloat(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant">Temp (K)</span>
                    <span className="font-mono font-bold text-primary">{temperatureK.toFixed(1)} K</span>
                  </div>
                  <input
                    type="range"
                    min="273.15"
                    max="373.15"
                    step="5"
                    value={temperatureK}
                    onChange={(e) => setTemperatureK(parseFloat(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>
            </div>

            {/* Building Block Feedstock Panel */}
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <Atom className="w-4 h-4 text-secondary" />
                <span>Building Block Concentrations</span>
              </h3>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Dialdehyde A (Terephthalaldehyde)</span>
                  <span className="font-mono font-bold text-on-surface">{dialdehydeAConc.toFixed(1)} mM</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.5"
                  value={dialdehydeAConc}
                  onChange={(e) => setDialdehydeAConc(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Diamine B (Ethylenediamine)</span>
                  <span className="font-mono font-bold text-on-surface">{diamineBConc.toFixed(1)} mM</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.5"
                  value={diamineBConc}
                  onChange={(e) => setDiamineBConc(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Monoamine C (Aniline terminator)</span>
                  <span className="font-mono font-bold text-on-surface">{monoamineCConc.toFixed(1)} mM</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="5.0"
                  step="0.5"
                  value={monoamineCConc}
                  onChange={(e) => setMonoamineCConc(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            {/* Motifs Info Banner */}
            <div className="bg-primary-container/20 border border-primary/20 rounded-xl p-3 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-primary">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Reversible Exchange Principle</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                {selectedMotif.pedagogicalDescription}
              </p>
            </div>
          </div>

          {/* DCL Analysis & Results Column (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-3 shadow-xs">
                <span className="text-xs text-on-surface-variant block mb-1">Untemplated Entropy</span>
                <span className="font-mono text-base font-bold text-on-surface">
                  {dclResult ? `${dclResult.shannonDiversityEntropyUntemplated.toFixed(3)} nats` : '—'}
                </span>
                <span className="text-[10px] text-on-surface-variant/80 block mt-0.5">Shannon diversity H</span>
              </div>

              <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-3 shadow-xs">
                <span className="text-xs text-on-surface-variant block mb-1">Templated Entropy</span>
                <span className="font-mono text-base font-bold text-primary">
                  {dclResult && dclResult.shannonDiversityEntropyTemplated != null
                    ? `${dclResult.shannonDiversityEntropyTemplated.toFixed(3)} nats`
                    : '—'}
                </span>
                <span className="text-[10px] text-on-surface-variant/80 block mt-0.5">
                  {dclResult?.shannonDiversityEntropyTemplated != null
                    ? 'Diversity collapse'
                    : 'No template added'}
                </span>
              </div>

              <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-3 shadow-xs">
                <span className="text-xs text-on-surface-variant block mb-1">Amplified Target</span>
                <span className="font-mono text-sm font-bold text-secondary truncate block">
                  {dclResult?.amplifiedMemberId || 'Statistical'}
                </span>
                <span className="text-[10px] text-on-surface-variant/80 block mt-0.5">
                  {dclResult?.amplifiedMemberId ? 'Selected receptor' : 'Unbiased'}
                </span>
              </div>

              <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-3 shadow-xs">
                <span className="text-xs text-on-surface-variant block mb-1">Max Amplification</span>
                <span className="font-mono text-base font-bold text-tertiary">
                  {dclResult?.maxAmplificationFactor ? `${dclResult.maxAmplificationFactor}x` : '1.00x'}
                </span>
                <span className="text-[10px] text-on-surface-variant/80 block mt-0.5">Equilibrium enrichment</span>
              </div>
            </div>

            {/* Component Distribution Comparison Chart */}
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Constitutional Member Equilibrium Distribution</span>
                </h3>
                <span className="text-xs text-on-surface-variant">
                  {selectedTemplateId !== 'none'
                    ? 'Side-by-side: Untemplated (gray) vs. Templated (colored)'
                    : 'Statistical untemplated mole fractions'}
                </span>
              </div>

              {/* Member Distribution Bars */}
              <div className="space-y-3">
                {dclResult?.members.map((member) => {
                  const isAmplified = member.id === dclResult.amplifiedMemberId;
                  const untempPct = Math.round(member.equilibriumFractionUntemplated * 100);
                  const tempPct = member.equilibriumFractionTemplated != null
                    ? Math.round(member.equilibriumFractionTemplated * 100)
                    : null;

                  return (
                    <div key={member.id} className="space-y-1.5 bg-surface-container-low/50 p-3 rounded-lg border border-surface-container">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-on-surface">{member.name}</span>
                          <span className="font-mono text-[10px] text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">
                            {member.formula}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-primary/80 bg-primary/10 px-1 rounded">
                            {member.topology}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-xs">
                          <span className="text-on-surface-variant">Untemplated: {untempPct}%</span>
                          {tempPct !== null && (
                            <span className={`font-bold ${isAmplified ? 'text-secondary' : 'text-primary'}`}>
                              Templated: {tempPct}%
                            </span>
                          )}
                          {member.amplificationFactor && (
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                                member.amplificationFactor >= 1.0
                                  ? 'bg-secondary/20 text-secondary'
                                  : 'bg-surface-container text-on-surface-variant'
                              }`}
                            >
                              {member.amplificationFactor.toFixed(2)}x
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stacked Progress Track */}
                      <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden flex relative">
                        {/* Untemplated bar */}
                        <div
                          className="h-full bg-on-surface-variant/30 transition-all duration-300"
                          style={{ width: `${untempPct}%` }}
                        />
                      </div>

                      {/* Templated bar (if active) */}
                      {tempPct !== null && (
                        <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden flex relative">
                          <div
                            className={`h-full transition-all duration-300 ${
                              isAmplified ? 'bg-secondary' : 'bg-primary'
                            }`}
                            style={{ width: `${tempPct}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanatory Banner */}
              <div className="text-xs text-on-surface-variant p-3 bg-surface-container rounded-lg flex items-start gap-2">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{dclResult?.selectionMechanism}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXCHANGE RELAXATION KINETICS */}
      {activeTab === 'exchange_kinetics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Kinetics Controls (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Kinetics Reaction Controls</span>
              </h3>

              <div>
                <label className="text-xs font-medium text-on-surface-variant block mb-1">
                  Exchange Motif System
                </label>
                <select
                  value={kineticsMotifId}
                  onChange={(e) => setKineticsMotifId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-surface-container border border-surface-container-high text-on-surface"
                >
                  <option value="disulfide_exchange">Thiol-Disulfide Exchange (R1-SS-R1 + R2-SS-R2 ⇌ 2 R1-SS-R2)</option>
                  <option value="imine_condensation">Transimination (Imine1 + Amine2 ⇌ Imine2 + Amine1)</option>
                  <option value="boronate_ester">Boronate Transesterification (RB-Diol1 + Diol2 ⇌ RB-Diol2 + Diol1)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Initial Homodimer [A]₀ (R1-SS-R1)</span>
                  <span className="font-mono font-bold text-on-surface">{initialSym1.toFixed(1)} mM</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="15.0"
                  step="0.5"
                  value={initialSym1}
                  onChange={(e) => setInitialSym1(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Initial Homodimer [B]₀ (R2-SS-R2)</span>
                  <span className="font-mono font-bold text-on-surface">{initialSym2.toFixed(1)} mM</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="15.0"
                  step="0.5"
                  value={initialSym2}
                  onChange={(e) => setInitialSym2(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Initial Heterodimer [C]₀ (R1-SS-R2)</span>
                  <span className="font-mono font-bold text-on-surface">{initialAsym.toFixed(1)} mM</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="10.0"
                  step="0.5"
                  value={initialAsym}
                  onChange={(e) => setInitialAsym(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Thiolate Catalyst [RS⁻]</span>
                  <span className="font-mono font-bold text-secondary">{catalystConcUM.toFixed(0)} μM</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="20"
                  value={catalystConcUM}
                  onChange={(e) => setCatalystConcUM(parseFloat(e.target.value))}
                  className="w-full accent-secondary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Reaction Observation Time</span>
                  <span className="font-mono font-bold text-primary">{(timeSpanSeconds / 60).toFixed(0)} min</span>
                </div>
                <input
                  type="range"
                  min="600"
                  max="7200"
                  step="300"
                  value={timeSpanSeconds}
                  onChange={(e) => setTimeSpanSeconds(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </div>

          {/* Kinetics SVG Plot (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span>Time-Course Component Concentration Relaxation</span>
                </h3>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-[#3b82f6]">
                    <span className="w-3 h-0.5 bg-[#3b82f6] inline-block" /> [R1-SS-R1]
                  </span>
                  <span className="flex items-center gap-1 text-[#8b5cf6]">
                    <span className="w-3 h-0.5 bg-[#8b5cf6] inline-block" /> [R2-SS-R2]
                  </span>
                  <span className="flex items-center gap-1 text-[#f59e0b] font-bold">
                    <span className="w-3 h-0.5 bg-[#f59e0b] inline-block" /> [R1-SS-R2] (Heterodimer)
                  </span>
                </div>
              </div>

              {/* Live SVG Graph */}
              {kineticsSvgData && (
                <div className="w-full overflow-x-auto flex justify-center py-2">
                  <svg
                    viewBox={`0 0 ${kineticsSvgData.width} ${kineticsSvgData.height}`}
                    className="w-full max-w-[620px] h-auto select-none"
                  >
                    {/* Grid Lines */}
                    {[0.25, 0.5, 0.75, 1.0].map((frac) => {
                      const y =
                        kineticsSvgData.padding.top +
                        kineticsSvgData.plotH * (1 - frac);
                      return (
                        <line
                          key={frac}
                          x1={kineticsSvgData.padding.left}
                          y1={y}
                          x2={kineticsSvgData.padding.left + kineticsSvgData.plotW}
                          y2={y}
                          stroke="currentColor"
                          className="text-surface-container-high"
                          strokeDasharray="4 4"
                        />
                      );
                    })}

                    {/* Axes */}
                    <line
                      x1={kineticsSvgData.padding.left}
                      y1={kineticsSvgData.padding.top + kineticsSvgData.plotH}
                      x2={kineticsSvgData.padding.left + kineticsSvgData.plotW}
                      y2={kineticsSvgData.padding.top + kineticsSvgData.plotH}
                      stroke="currentColor"
                      className="text-on-surface-variant/40"
                      strokeWidth="1.5"
                    />
                    <line
                      x1={kineticsSvgData.padding.left}
                      y1={kineticsSvgData.padding.top}
                      x2={kineticsSvgData.padding.left}
                      y2={kineticsSvgData.padding.top + kineticsSvgData.plotH}
                      stroke="currentColor"
                      className="text-on-surface-variant/40"
                      strokeWidth="1.5"
                    />

                    {/* Curves */}
                    <path
                      d={kineticsSvgData.pathSym1}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                    />
                    <path
                      d={kineticsSvgData.pathSym2}
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="2.5"
                    />
                    <path
                      d={kineticsSvgData.pathAsym}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                    />

                    {/* Axis Labels */}
                    <text
                      x={kineticsSvgData.padding.left + kineticsSvgData.plotW / 2}
                      y={kineticsSvgData.height - 10}
                      textAnchor="middle"
                      className="fill-on-surface-variant text-[11px]"
                    >
                      Time (seconds)
                    </text>
                    <text
                      x={-(kineticsSvgData.padding.top + kineticsSvgData.plotH / 2)}
                      y={18}
                      transform="rotate(-90)"
                      textAnchor="middle"
                      className="fill-on-surface-variant text-[11px]"
                    >
                      Concentration (mM)
                    </text>
                  </svg>
                </div>
              )}

              {/* Kinetics Telemetry Card */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-surface-container-low p-2.5 rounded-lg">
                  <span className="text-[10px] text-on-surface-variant block">Relaxation Time (τ)</span>
                  <span className="font-mono text-sm font-bold text-on-surface">
                    {kineticsResult?.relaxationTimeTauSeconds.toFixed(1)} s
                  </span>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-lg">
                  <span className="text-[10px] text-on-surface-variant block">Half-Life (t₁/₂)</span>
                  <span className="font-mono text-sm font-bold text-primary">
                    {kineticsResult?.halfLifeSeconds.toFixed(1)} s
                  </span>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-lg col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-on-surface-variant block">Statistical Equilibrium K</span>
                  <span className="font-mono text-sm font-bold text-secondary">K_eq = 4.00</span>
                </div>
              </div>

              <div className="text-xs text-on-surface-variant p-3 bg-surface-container rounded-lg">
                {kineticsResult?.rateLawDescription}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MOTIF CHEMISTRIES & PRINCIPLES */}
      {activeTab === 'mechanisms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURATED_MOTIFS.map((motif) => (
            <div
              key={motif.id}
              className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-on-surface text-sm">{motif.name}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono uppercase font-bold">
                  {motif.reactionType}
                </span>
              </div>

              <div className="bg-surface-container p-2.5 rounded-lg font-mono text-xs text-primary space-y-1">
                <div>
                  <span className="text-on-surface-variant text-[10px] block">Forward Reaction:</span>
                  {motif.forwardEquation}
                </div>
                <div>
                  <span className="text-on-surface-variant text-[10px] block">Exchange Reaction:</span>
                  {motif.exchangeEquation}
                </div>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                {motif.pedagogicalDescription}
              </p>

              <div className="grid grid-cols-3 gap-2 text-xs pt-1 border-t border-surface-container">
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Optimum pH</span>
                  <span className="font-mono font-bold text-on-surface">{motif.typicalPhOptimum}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Rate k_ex</span>
                  <span className="font-mono font-bold text-on-surface">{motif.exchangeRateConstantKEx} M⁻¹s⁻¹</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">E_a</span>
                  <span className="font-mono font-bold text-on-surface">{motif.activationEnergyEaKjMol} kJ/mol</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
