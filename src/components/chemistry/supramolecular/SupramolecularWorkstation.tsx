import React, { useState, useEffect, useMemo } from 'react';
import {
  Layers,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Shield,
  Activity,
  Sliders,
  Maximize2,
  Info,
} from 'lucide-react';
import {
  supramolecularService,
  CURATED_HOSTS,
  CURATED_GUESTS,
} from '../../../services/supramolecularService';
import {
  HostGuestComplexSystem,
  JobPlotResult,
} from '../../../types/supramolecular';

export const SupramolecularWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'isotherm' | 'job_plot' | 'cavity_fit'>('isotherm');

  // Common selection state
  const [selectedHostId, setSelectedHostId] = useState<string>('18_crown_6');
  const [selectedGuestId, setSelectedGuestId] = useState<string>('potassium_cation');
  const [temperatureK, setTemperatureK] = useState<number>(298.15);

  // Isotherm parameters
  const [hostConcMM, setHostConcMM] = useState<number>(0.5);
  const [guestMaxConcMM, setGuestMaxConcMM] = useState<number>(2.5);
  const [isothermResult, setIsothermResult] = useState<HostGuestComplexSystem | null>(null);

  // Job plot parameters
  const [jobTotalConcMM, setJobTotalConcMM] = useState<number>(1.0);
  const [jobResult, setJobResult] = useState<JobPlotResult | null>(null);

  // Calculate Isotherm
  useEffect(() => {
    try {
      const res = supramolecularService.simulateBindingLocally({
        hostId: selectedHostId,
        guestId: selectedGuestId,
        hostInitialConcMM: hostConcMM,
        guestMaxConcMM: guestMaxConcMM,
        temperatureK,
        titrationSteps: 25,
      });
      setIsothermResult(res.system);
    } catch (err) {
      console.error('Isotherm simulation error:', err);
    }
  }, [selectedHostId, selectedGuestId, hostConcMM, guestMaxConcMM, temperatureK]);

  // Calculate Job Plot
  useEffect(() => {
    try {
      const res = supramolecularService.generateJobPlotLocally({
        hostId: selectedHostId,
        guestId: selectedGuestId,
        totalConcentrationMM: jobTotalConcMM,
        pointsCount: 25,
        temperatureK,
      });
      setJobResult(res.result);
    } catch (err) {
      console.error('Job plot calculation error:', err);
    }
  }, [selectedHostId, selectedGuestId, jobTotalConcMM, temperatureK]);

  const selectedHost = useMemo(
    () => CURATED_HOSTS.find((h) => h.id === selectedHostId) || CURATED_HOSTS[0],
    [selectedHostId]
  );

  const selectedGuest = useMemo(
    () => CURATED_GUESTS.find((g) => g.id === selectedGuestId) || CURATED_GUESTS[0],
    [selectedGuestId]
  );

  const handleReset = () => {
    setSelectedHostId('18_crown_6');
    setSelectedGuestId('potassium_cation');
    setTemperatureK(298.15);
    setHostConcMM(0.5);
    setGuestMaxConcMM(2.5);
    setJobTotalConcMM(1.0);
  };

  // SVG dimensions for isotherm plot
  const isothermSvgData = useMemo(() => {
    if (!isothermResult || isothermResult.isothermPoints.length === 0) return null;
    const pts = isothermResult.isothermPoints;
    const maxG = Math.max(...pts.map((p) => p.guestTotalMM), 1e-4);
    const maxBound = Math.max(...pts.map((p) => p.boundComplexMM), 1e-4);

    const width = 360;
    const height = 160;
    const padL = 40;
    const padB = 25;
    const padT = 15;
    const padR = 15;

    const scaleX = (g: number) => padL + (g / maxG) * (width - padL - padR);
    const scaleY = (b: number) => height - padB - (b / maxBound) * (height - padT - padB);

    const pathBound = pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.guestTotalMM)} ${scaleY(p.boundComplexMM)}`)
      .join(' ');

    return { pathBound, maxG, maxBound, width, height, pts, scaleX, scaleY };
  }, [isothermResult]);

  // SVG dimensions for Job plot
  const jobSvgData = useMemo(() => {
    if (!jobResult || jobResult.points.length === 0) return null;
    const pts = jobResult.points;
    const maxSig = Math.max(...pts.map((p) => p.signalIntensity), 1e-4);

    const width = 360;
    const height = 160;
    const padL = 40;
    const padB = 25;
    const padT = 15;
    const padR = 15;

    const scaleX = (r: number) => padL + r * (width - padL - padR);
    const scaleY = (s: number) => height - padB - (s / maxSig) * (height - padT - padB);

    const pathCurve = pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.moleFractionGuest)} ${scaleY(p.signalIntensity)}`)
      .join(' ');

    const peakPt = pts.reduce((max, p) => (p.signalIntensity > max.signalIntensity ? p : max), pts[0]);

    return { pathCurve, width, height, scaleX, scaleY, peakPt };
  }, [jobResult]);

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Top Banner & Mode Tabs */}
      <div className="bg-[#FDF8F5] border border-[#8B572A]/20 rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#D47942]/10 text-[#D47942]">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-[#2C302E]">
              Supramolecular Chemistry & Host-Guest Complexation
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#D47942] text-white">
              PR #045
            </span>
          </div>
          <p className="text-xs text-[#8B572A] mt-1">
            Macrocyclic inclusion equilibria (crown ethers, cyclodextrins, cryptands), Job&apos;s continuous variation stoichiometry, and non-covalent force decomposition
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#8B572A]/10 p-1 rounded-lg flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('isotherm')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'isotherm'
                  ? 'bg-white text-[#D47942] shadow-xs'
                  : 'text-[#2C302E] hover:text-[#D47942]'
              }`}
            >
              Binding Isotherms (Ka)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('job_plot')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'job_plot'
                  ? 'bg-white text-[#D47942] shadow-xs'
                  : 'text-[#2C302E] hover:text-[#D47942]'
              }`}
            >
              Job&apos;s Plot (Stoichiometry)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cavity_fit')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'cavity_fit'
                  ? 'bg-white text-[#D47942] shadow-xs'
                  : 'text-[#2C302E] hover:text-[#D47942]'
              }`}
            >
              Cavity Size-Fit & Selectivity
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-[#8B572A] hover:text-[#2C302E] hover:bg-[#8B572A]/10 rounded-lg transition"
            title="Reset to default conditions"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Host/Guest Selectors + Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Receptors & Substrates Pickers (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Host Receptors */}
          <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Macrocyclic Host Receptor
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CURATED_HOSTS.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setSelectedHostId(h.id)}
                  className={`p-2 rounded-lg border text-left transition ${
                    selectedHostId === h.id
                      ? 'border-[#D47942] bg-[#D47942]/5'
                      : 'border-[#8B572A]/10 hover:border-[#8B572A]/30 bg-[#FDF8F5]'
                  }`}
                >
                  <div className="font-bold text-xs text-[#2C302E]">{h.name}</div>
                  <div className="text-[10px] text-[#8B572A] mt-0.5">
                    Ø = {h.cavityDiameterAngstrom.toFixed(2)} Å
                  </div>
                  <div className="text-[9px] text-stone-500 capitalize">{h.category.replace('_', ' ')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Guest Substrates */}
          <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Guest Substrate / Ion
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CURATED_GUESTS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedGuestId(g.id)}
                  className={`p-2 rounded-lg border text-left transition ${
                    selectedGuestId === g.id
                      ? 'border-[#D47942] bg-[#D47942]/5'
                      : 'border-[#8B572A]/10 hover:border-[#8B572A]/30 bg-[#FDF8F5]'
                  }`}
                >
                  <div className="font-bold text-xs text-[#2C302E] truncate">{g.name}</div>
                  <div className="text-[10px] text-[#8B572A] mt-0.5">
                    Ø = {(2 * g.effectiveRadiusAngstrom).toFixed(2)} Å
                  </div>
                  <div className="text-[9px] text-stone-500">{g.formula}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Common Sliders */}
          <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
            <div>
              <div className="flex justify-between text-xs text-[#2C302E]">
                <span>Temperature T</span>
                <span className="font-mono font-bold">{temperatureK} K</span>
              </div>
              <input
                type="range"
                min="273.15"
                max="373.15"
                step="5"
                value={temperatureK}
                onChange={(e) => setTemperatureK(parseFloat(e.target.value))}
                className="w-full accent-[#D47942] mt-1"
              />
            </div>

            {activeTab === 'isotherm' && (
              <>
                <div>
                  <div className="flex justify-between text-xs text-[#2C302E]">
                    <span>Host Initial [H]₀</span>
                    <span className="font-mono font-bold">{hostConcMM} mM</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="5.0"
                    step="0.1"
                    value={hostConcMM}
                    onChange={(e) => setHostConcMM(parseFloat(e.target.value))}
                    className="w-full accent-[#D47942] mt-1"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-[#2C302E]">
                    <span>Titrated Guest Max [G]ₘₐₓ</span>
                    <span className="font-mono font-bold">{guestMaxConcMM} mM</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10.0"
                    step="0.5"
                    value={guestMaxConcMM}
                    onChange={(e) => setGuestMaxConcMM(parseFloat(e.target.value))}
                    className="w-full accent-[#D47942] mt-1"
                  />
                </div>
              </>
            )}

            {activeTab === 'job_plot' && (
              <div>
                <div className="flex justify-between text-xs text-[#2C302E]">
                  <span>Total Concentration [H] + [G]</span>
                  <span className="font-mono font-bold">{jobTotalConcMM} mM</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="5.0"
                  step="0.2"
                  value={jobTotalConcMM}
                  onChange={(e) => setJobTotalConcMM(parseFloat(e.target.value))}
                  className="w-full accent-[#D47942] mt-1"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Viewport & Diagnostics (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* TAB 1: Binding Isotherms & Energetics */}
          {activeTab === 'isotherm' && isothermResult && (
            <>
              {/* Thermodynamic Indicators HUD */}
              <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> Thermodynamic State & Binding Constants
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isothermResult.isEnthalpyDriven
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isothermResult.isEnthalpyDriven ? 'Enthalpy Driven (ΔH° < 0)' : 'Entropy Driven (ΔS° > 0)'}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">Binding Constant (Ka)</div>
                    <div className="text-base font-mono font-bold text-[#D47942] mt-0.5">
                      {isothermResult.associationConstantKaMInv.toExponential(2)}
                    </div>
                    <div className="text-[10px] text-[#8B572A]">log Ka = {isothermResult.logKa.toFixed(2)}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">Dissociation (Kd)</div>
                    <div className="text-base font-mono font-bold text-[#2C302E] mt-0.5">
                      {isothermResult.dissociationConstantKdUM.toFixed(2)} μM
                    </div>
                    <div className="text-[10px] text-[#8B572A]">Kd = 1/Ka</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">Gibbs Energy ΔG°</div>
                    <div className="text-base font-mono font-bold text-rose-700 mt-0.5">
                      {isothermResult.gibbsFreeEnergyDeltaGKjMol.toFixed(1)} kJ/mol
                    </div>
                    <div className="text-[10px] text-[#8B572A]">-RT ln Ka</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">Enthalpy ΔH°</div>
                    <div className="text-base font-mono font-bold text-[#2C302E] mt-0.5">
                      {isothermResult.enthalpyDeltaHKjMol.toFixed(1)} kJ/mol
                    </div>
                    <div className="text-[10px] text-[#8B572A]">
                      -TΔS° = {isothermResult.entropyTermMinusTDeltaSKjMol.toFixed(1)} kJ/mol
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#2C302E] p-2.5 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10 font-mono">
                  {isothermResult.pedagogicalSummary}
                </p>
              </div>

              {/* SVG Titration Binding Isotherm Plot */}
              {isothermSvgData && (
                <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8B572A] mb-2 flex items-center justify-between">
                    <span>Titration Binding Isotherm ([HG] vs Titrated [G]₀)</span>
                    <span className="text-[10px] text-stone-500 font-normal">Exact Quadratic Analytical Solution</span>
                  </div>

                  <div className="relative w-full h-48 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/15 overflow-hidden flex items-center justify-center p-2">
                    <svg viewBox={`0 0 ${isothermSvgData.width} ${isothermSvgData.height}`} className="w-full h-full">
                      {/* Grid / Axes */}
                      <line x1="40" y1="135" x2="345" y2="135" stroke="#8B572A" strokeWidth="1" />
                      <line x1="40" y1="15" x2="40" y2="135" stroke="#8B572A" strokeWidth="1" />

                      {/* Asymptotic saturation line */}
                      <line x1="40" y1="20" x2="345" y2="20" stroke="#8B572A" strokeDasharray="3,3" opacity="0.4" />
                      <text x="340" y="18" fill="#8B572A" fontSize="8" textAnchor="end">
                        [H]₀ Saturation limit ({hostConcMM} mM)
                      </text>

                      {/* Binding Curve */}
                      <path d={isothermSvgData.pathBound} fill="none" stroke="#D47942" strokeWidth="2.5" />

                      {/* X and Y labels */}
                      <text x="195" y="152" fill="#8B572A" fontSize="9" textAnchor="middle">
                        Added Guest Concentration [G]₀ (mM)
                      </text>
                      <text x="15" y="80" fill="#8B572A" fontSize="9" textAnchor="middle" transform="rotate(-90 15 80)">
                        [HG] (mM)
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* Non-covalent Decomposition Breakdown */}
              <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8B572A]">
                  Non-Covalent Interaction Energy Breakdown
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">Ion-Dipole</div>
                    <div className="font-mono font-bold text-[#2C302E]">
                      {isothermResult.decomposition.ionDipoleElectrostaticKjMol} kJ/mol
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">H-Bonding</div>
                    <div className="font-mono font-bold text-[#2C302E]">
                      {isothermResult.decomposition.hydrogenBondingKjMol} kJ/mol
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">π-π Stacking</div>
                    <div className="font-mono font-bold text-[#2C302E]">
                      {isothermResult.decomposition.piPiStackingKjMol} kJ/mol
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">Hydrophobic Desolv.</div>
                    <div className="font-mono font-bold text-[#2C302E]">
                      {isothermResult.decomposition.hydrophobicDesolvationKjMol} kJ/mol
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">Steric Penalty</div>
                    <div className="font-mono font-bold text-rose-700">
                      +{isothermResult.decomposition.stericCavityFitPenaltyKjMol} kJ/mol
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: Job's Plot Stoichiometry */}
          {activeTab === 'job_plot' && jobResult && jobSvgData && (
            <div className="space-y-4">
              <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Job&apos;s Method of Continuous Variation
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Determined Stoichiometry: {jobResult.determinedStoichiometry}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">Observed Peak (r_peak)</div>
                    <div className="text-lg font-mono font-bold text-[#D47942] mt-0.5">
                      {jobResult.peakMoleFraction.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-[#8B572A]">mole fraction of guest</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">Theoretical 1:1 Apex</div>
                    <div className="text-lg font-mono font-bold text-[#2C302E] mt-0.5">0.50</div>
                    <div className="text-[10px] text-[#8B572A]">r = [G] / ([H] + [G])</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">Total Concentration</div>
                    <div className="text-lg font-mono font-bold text-[#2C302E] mt-0.5">
                      {jobResult.totalConcentrationMM} mM
                    </div>
                    <div className="text-[10px] text-[#8B572A]">constant equimolar sum</div>
                  </div>
                </div>

                <p className="text-xs text-[#2C302E] p-2.5 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10 font-mono">
                  {jobResult.explanation}
                </p>
              </div>

              {/* SVG Job's Plot */}
              <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8B572A] mb-2 flex items-center justify-between">
                  <span>Continuous Variation Bell Curve (Signal vs r_guest)</span>
                  <span className="text-[10px] text-stone-500 font-normal">Apex at r = 0.50 corresponds to 1:1 binding</span>
                </div>

                <div className="relative w-full h-52 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/15 overflow-hidden flex items-center justify-center p-2">
                  <svg viewBox={`0 0 ${jobSvgData.width} ${jobSvgData.height}`} className="w-full h-full">
                    <line x1="40" y1="135" x2="345" y2="135" stroke="#8B572A" strokeWidth="1" />
                    <line x1="40" y1="15" x2="40" y2="135" stroke="#8B572A" strokeWidth="1" />

                    {/* Vertical reference line at r = 0.50 */}
                    <line
                      x1={jobSvgData.scaleX(0.5)}
                      y1="15"
                      x2={jobSvgData.scaleX(0.5)}
                      y2="135"
                      stroke="#8B572A"
                      strokeDasharray="2,2"
                      opacity="0.5"
                    />
                    <text x={jobSvgData.scaleX(0.5)} y="12" fill="#8B572A" fontSize="8" textAnchor="middle">
                      r = 0.50 (1:1)
                    </text>

                    {/* Job's curve */}
                    <path d={jobSvgData.pathCurve} fill="none" stroke="#D47942" strokeWidth="3" />

                    {/* Peak Dot */}
                    <circle
                      cx={jobSvgData.scaleX(jobSvgData.peakPt.moleFractionGuest)}
                      cy={jobSvgData.scaleY(jobSvgData.peakPt.signalIntensity)}
                      r="4"
                      fill="#D47942"
                    />

                    {/* Labels */}
                    <text x="195" y="152" fill="#8B572A" fontSize="9" textAnchor="middle">
                      Guest Mole Fraction: r = [G] / ([H] + [G])
                    </text>
                    <text x="15" y="80" fill="#8B572A" fontSize="9" textAnchor="middle" transform="rotate(-90 15 80)">
                      Signal ~ [HG]
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Cavity Size-Fit & Selectivity */}
          {activeTab === 'cavity_fit' && (
            <div className="space-y-4">
              <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" /> Host-Guest Size Complementarity Ratio
                  </span>
                  <span className="text-xs font-mono font-bold text-[#D47942]">
                    Fit Ratio: {((2 * selectedGuest.effectiveRadiusAngstrom) / selectedHost.cavityDiameterAngstrom).toFixed(3)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">Host Cavity Diameter</div>
                    <div className="text-base font-mono font-bold text-[#2C302E] mt-0.5">
                      {selectedHost.cavityDiameterAngstrom.toFixed(2)} Å
                    </div>
                    <div className="text-[10px] text-[#8B572A]">{selectedHost.name}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">Guest Substrate Diameter</div>
                    <div className="text-base font-mono font-bold text-[#D47942] mt-0.5">
                      {(2 * selectedGuest.effectiveRadiusAngstrom).toFixed(2)} Å
                    </div>
                    <div className="text-[10px] text-[#8B572A]">{selectedGuest.name}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                    <div className="text-[10px] text-[#8B572A]">Coordination Sites</div>
                    <div className="text-base font-mono font-bold text-emerald-700 mt-0.5">
                      {selectedHost.donorSites} sites
                    </div>
                    <div className="text-[10px] text-[#8B572A]">{selectedHost.donorAtomType}</div>
                  </div>
                </div>
              </div>

              {/* 2D Cavity Schematic Projection SVG */}
              <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8B572A] mb-2 flex items-center justify-between">
                  <span>2D Macrocyclic Cavity vs Guest Ion Ingress Projection</span>
                  <span className="text-[10px] text-stone-500 font-normal">Spatial Cross-Section</span>
                </div>

                <div className="relative w-full h-56 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/15 overflow-hidden flex items-center justify-center p-4">
                  <svg viewBox="-100 -100 200 200" className="w-full h-full">
                    {/* Host Cavity Circle */}
                    <circle
                      cx="0"
                      cy="0"
                      r={Math.min(75, selectedHost.cavityDiameterAngstrom * 12)}
                      fill="#8B572A"
                      fillOpacity="0.08"
                      stroke="#8B572A"
                      strokeWidth="2.5"
                      strokeDasharray="4,2"
                    />

                    {/* Donor site atoms on perimeter */}
                    {Array.from({ length: selectedHost.donorSites }).map((_, idx) => {
                      const angle = (idx * 2 * Math.PI) / selectedHost.donorSites;
                      const rad = Math.min(75, selectedHost.cavityDiameterAngstrom * 12);
                      const x = rad * Math.cos(angle);
                      const y = rad * Math.sin(angle);
                      return (
                        <g key={idx}>
                          <circle cx={x} cy={y} r="6" fill="#D47942" stroke="#FFFFFF" strokeWidth="1.5" />
                          <text x={x} y={y + 3} fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">
                            O
                          </text>
                        </g>
                      );
                    })}

                    {/* Guest Ion / Molecule inside cavity */}
                    <circle
                      cx="0"
                      cy="0"
                      r={Math.min(85, selectedGuest.effectiveRadiusAngstrom * 24)}
                      fill="#3B82F6"
                      fillOpacity="0.25"
                      stroke="#3B82F6"
                      strokeWidth="2"
                    />
                    <text x="0" y="3" fill="#1E40AF" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {selectedGuest.formula}
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
