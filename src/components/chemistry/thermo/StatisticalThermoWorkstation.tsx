import React, { useState, useEffect, useMemo } from 'react';
import {
  Thermometer,
  Layers,
  Sparkles,
  RotateCcw,
  Info,
  TrendingUp,
  Compass,
  Cpu,
  Flame,
  Activity,
} from 'lucide-react';
import {
  statisticalThermoService,
  CURATED_MOLECULES,
  R_GAS,
} from '../../../services/statisticalThermoService';
import {
  MoleculeSummary,
  PartitionFunctionCalculationResponse,
  TemperatureSweepResponse,
} from '../../../types/statisticalThermo';

export const StatisticalThermoWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'state' | 'sweep'>('state');

  // Calculation parameters
  const [molecules, setMolecules] = useState<MoleculeSummary[]>([]);
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>('n2');
  const [temperatureK, setTemperatureK] = useState<number>(298.15);
  const [pressurePa, setPressurePa] = useState<number>(100000.0); // 1 bar

  // Sweep parameters
  const [sweepMinT, setSweepMinT] = useState<number>(20.0);
  const [sweepMaxT, setSweepMaxT] = useState<number>(2500.0);

  // Results
  const [calcResult, setCalcResult] = useState<PartitionFunctionCalculationResponse | null>(null);
  const [sweepResult, setSweepResult] = useState<TemperatureSweepResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Hover index on temperature sweep SVG plot
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Load molecules list
  useEffect(() => {
    const list = statisticalThermoService.getMolecules();
    setMolecules(list);
  }, []);

  // Compute partition functions and thermodynamic state
  useEffect(() => {
    let isCancelled = false;
    const runCalculation = async () => {
      setIsLoading(true);
      try {
        const res = await statisticalThermoService.calculate({
          moleculeId: selectedMoleculeId,
          temperatureK,
          pressurePa,
        });
        if (!isCancelled) {
          setCalcResult(res);
        }
      } catch (err) {
        console.error('Statistical thermo calculation error:', err);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    runCalculation();
    return () => {
      isCancelled = true;
    };
  }, [selectedMoleculeId, temperatureK, pressurePa]);

  // Compute temperature sweep
  useEffect(() => {
    let isCancelled = false;
    const runSweep = async () => {
      try {
        const res = await statisticalThermoService.temperatureSweep({
          moleculeId: selectedMoleculeId,
          tempMinK: sweepMinT,
          tempMaxK: sweepMaxT,
          pointsCount: 80,
          pressurePa,
        });
        if (!isCancelled) {
          setSweepResult(res);
        }
      } catch (err) {
        console.error('Temperature sweep error:', err);
      }
    };

    runSweep();
    return () => {
      isCancelled = true;
    };
  }, [selectedMoleculeId, sweepMinT, sweepMaxT, pressurePa]);

  // Reset to standard states
  const handleReset = () => {
    setSelectedMoleculeId('n2');
    setTemperatureK(298.15);
    setPressurePa(100000.0);
    setSweepMinT(20.0);
    setSweepMaxT(2500.0);
  };

  // SVG Chart bounds and scales for Temperature Sweep
  const chartData = useMemo(() => {
    if (!sweepResult || sweepResult.curve.length === 0) return null;

    const curve = sweepResult.curve;
    const width = 640;
    const height = 300;
    const padding = { top: 25, right: 35, bottom: 45, left: 65 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;

    const minX = curve[0].temperatureK;
    const maxX = curve[curve.length - 1].temperatureK;

    const maxCv = Math.max(...curve.map((pt) => pt.cpJMolK), sweepResult.equipartitionCvLimit + R_GAS);
    const maxY = maxCv * 1.08;

    const scaleX = (x: number) => padding.left + ((x - minX) / (maxX - minX)) * plotWidth;
    const scaleY = (y: number) => padding.top + plotHeight - (y / maxY) * plotHeight;

    const cvPts = curve.map((pt) => `${scaleX(pt.temperatureK).toFixed(1)},${scaleY(pt.cvJMolK).toFixed(1)}`);
    const cpPts = curve.map((pt) => `${scaleX(pt.temperatureK).toFixed(1)},${scaleY(pt.cpJMolK).toFixed(1)}`);

    const pathCv = `M ${cvPts.join(' L ')}`;
    const pathCp = `M ${cpPts.join(' L ')}`;

    return {
      width,
      height,
      padding,
      plotWidth,
      plotHeight,
      minX,
      maxX,
      maxY,
      scaleX,
      scaleY,
      pathCv,
      pathCp,
      curve,
    };
  }, [sweepResult]);

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Top Banner & Mode Tabs */}
      <div className="bg-[#FDF8F5] border border-[#8B572A]/20 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#D47942]/10 text-[#D47942]">
              <Thermometer className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-[#2C302E]">
              Statistical Thermodynamics & Molecular Partition Functions
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#D47942] text-white">
              PR #043
            </span>
          </div>
          <p className="text-xs text-[#8B572A] mt-1">
            Canonical molecular partition functions (q_trans, q_rot, q_vib, q_elec), Sackur-Tetrode entropy, and quantum freeze-out
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#8B572A]/10 p-1 rounded-lg flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('state')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'state'
                  ? 'bg-white text-[#D47942] shadow-xs'
                  : 'text-[#2C302E] hover:text-[#D47942]'
              }`}
            >
              Canonical State & States
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sweep')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'sweep'
                  ? 'bg-white text-[#D47942] shadow-xs'
                  : 'text-[#2C302E] hover:text-[#D47942]'
              }`}
            >
              Quantum Freeze-out (Cv vs T)
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-[#8B572A] hover:text-[#2C302E] hover:bg-[#8B572A]/10 rounded-lg transition"
            title="Reset to standard conditions"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      {activeTab === 'state' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Controls Column */}
          <div className="lg:col-span-4 space-y-4">
            {/* Molecule Selector */}
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Curated Molecular Catalog
              </label>

              <div className="grid grid-cols-2 gap-2">
                {molecules.map((mol) => (
                  <button
                    key={mol.id}
                    type="button"
                    onClick={() => setSelectedMoleculeId(mol.id)}
                    className={`p-2.5 rounded-lg border text-left transition ${
                      selectedMoleculeId === mol.id
                        ? 'border-[#D47942] bg-[#D47942]/5'
                        : 'border-[#8B572A]/10 hover:border-[#8B572A]/30 bg-[#FDF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#2C302E]">{mol.formula}</span>
                      <span className="text-[10px] text-[#8B572A] capitalize font-medium">
                        {mol.geometry.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#8B572A] truncate mt-0.5">{mol.name}</div>
                    <div className="text-[10px] text-stone-500 font-mono mt-1">
                      M = {mol.molarMassGMol.toFixed(2)} g/mol
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Thermodynamic State Variables */}
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5" /> State Conditions (T, P)
              </label>

              {/* Temperature Slider */}
              <div>
                <div className="flex justify-between text-xs text-[#2C302E] font-medium mb-1">
                  <span>Temperature (T)</span>
                  <span className="font-mono text-[#D47942] font-bold">
                    {temperatureK.toFixed(1)} K ({(temperatureK - 273.15).toFixed(1)} °C)
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={2500}
                  step={5}
                  value={temperatureK}
                  onChange={(e) => setTemperatureK(parseFloat(e.target.value))}
                  className="w-full accent-[#D47942] h-1.5 bg-[#8B572A]/10 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {[
                    { label: '77 K (LN₂)', t: 77.35 },
                    { label: '195 K (CO₂)', t: 194.65 },
                    { label: '298.15 K (Std)', t: 298.15 },
                    { label: '500 K', t: 500.0 },
                    { label: '1000 K', t: 1000.0 },
                    { label: '2000 K', t: 2000.0 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setTemperatureK(preset.t)}
                      className={`text-[10px] px-2 py-0.5 rounded border transition ${
                        Math.abs(temperatureK - preset.t) < 0.1
                          ? 'border-[#D47942] bg-[#D47942] text-white font-semibold'
                          : 'border-[#8B572A]/20 bg-[#FDF8F5] text-[#2C302E] hover:border-[#D47942]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pressure Input */}
              <div>
                <div className="flex justify-between text-xs text-[#2C302E] font-medium mb-1">
                  <span>Pressure (P)</span>
                  <span className="font-mono text-[#D47942] font-bold">
                    {(pressurePa / 1000.0).toFixed(1)} kPa ({(pressurePa / 100000.0).toFixed(2)} bar)
                  </span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={pressurePa}
                  onChange={(e) => setPressurePa(parseFloat(e.target.value))}
                  className="w-full accent-[#D47942] h-1.5 bg-[#8B572A]/10 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right Data HUD Column */}
          <div className="lg:col-span-8 space-y-4">
            {calcResult && (
              <>
                {/* Partition Functions Decomposition Grid */}
                <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#8B572A]/10 pb-2">
                    <div className="flex items-center gap-1.5 font-bold text-xs uppercase text-[#8B572A]">
                      <Sparkles className="w-4 h-4 text-[#D47942]" />
                      Canonical Molecular Partition Functions: q(V, T)
                    </div>
                    <span className="text-xs font-mono font-bold text-[#D47942]">
                      q_total = {calcResult.partitionFunctions.qTotal.toExponential(3)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/15">
                      <div className="text-[11px] text-[#8B572A] font-semibold">q_trans (Translation)</div>
                      <div className="font-mono text-sm font-bold text-[#2C302E] mt-1">
                        {calcResult.partitionFunctions.qTrans.toExponential(2)}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        Λ = {calcResult.partitionFunctions.thermalWavelengthPm.toFixed(2)} pm
                      </div>
                    </div>

                    <div className="p-3 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/15">
                      <div className="text-[11px] text-[#8B572A] font-semibold">q_rot (Rotation)</div>
                      <div className="font-mono text-sm font-bold text-[#2C302E] mt-1">
                        {calcResult.partitionFunctions.qRot.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        σ = {calcResult.molecule.symmetryNumber}
                      </div>
                    </div>

                    <div className="p-3 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/15">
                      <div className="text-[11px] text-[#8B572A] font-semibold">q_vib (Vibration)</div>
                      <div className="font-mono text-sm font-bold text-[#2C302E] mt-1">
                        {calcResult.partitionFunctions.qVib.toFixed(4)}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        {calcResult.molecule.vibrationalModesCount} normal modes
                      </div>
                    </div>

                    <div className="p-3 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/15">
                      <div className="text-[11px] text-[#8B572A] font-semibold">q_elec (Electronic)</div>
                      <div className="font-mono text-sm font-bold text-[#2C302E] mt-1">
                        {calcResult.partitionFunctions.qElec.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        g₀ ground degeneracy
                      </div>
                    </div>
                  </div>
                </div>

                {/* Macroscopic State Functions HUD */}
                <div className="bg-white border border-[#8B572A]/20 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#8B572A]/10 pb-3 mb-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-[#8B572A]">
                        Standard Molar Entropy (S°)
                      </div>
                      <div className="text-3xl font-bold font-mono text-[#D47942] mt-1">
                        {calcResult.thermodynamicState.entropyStandardJMolK.toFixed(2)}{' '}
                        <span className="text-sm font-sans font-normal text-[#8B572A]">J / (mol K)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#8B572A]">Heat Capacity (Cv)</div>
                      <div className="text-2xl font-bold font-mono text-[#2C302E] mt-1">
                        {calcResult.heatCapacity.cvTotal.toFixed(2)}{' '}
                        <span className="text-sm font-sans font-normal text-[#8B572A]">J / (mol K)</span>
                      </div>
                      <div className="text-[10px] text-[#8B572A]">
                        {(calcResult.classicalEquipartitionRatio * 100).toFixed(1)}% of equipartition ceiling
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 bg-[#FDF8F5] rounded border border-[#8B572A]/15">
                      <div className="text-[#8B572A]">Cp (Isobaric)</div>
                      <div className="font-mono font-bold text-[#2C302E] mt-0.5">
                        {calcResult.heatCapacity.cpTotal.toFixed(2)} J/(mol K)
                      </div>
                      <div className="text-[10px] text-stone-500">Cp = Cv + R</div>
                    </div>

                    <div className="p-2.5 bg-[#FDF8F5] rounded border border-[#8B572A]/15">
                      <div className="text-[#8B572A]">Thermal Energy U - U(0)</div>
                      <div className="font-mono font-bold text-[#2C302E] mt-0.5">
                        {(calcResult.thermodynamicState.internalEnergyThermalJMol / 1000.0).toFixed(2)} kJ/mol
                      </div>
                      <div className="text-[10px] text-stone-500">Translation + Rotation + Vib</div>
                    </div>

                    <div className="p-2.5 bg-[#FDF8F5] rounded border border-[#8B572A]/15">
                      <div className="text-[#8B572A]">Thermal Enthalpy H - H(0)</div>
                      <div className="font-mono font-bold text-[#2C302E] mt-0.5">
                        {(calcResult.thermodynamicState.enthalpyThermalJMol / 1000.0).toFixed(2)} kJ/mol
                      </div>
                      <div className="text-[10px] text-stone-500">U(T) + RT</div>
                    </div>

                    <div className="p-2.5 bg-[#FDF8F5] rounded border border-[#8B572A]/15">
                      <div className="text-[#8B572A]">Zero-Point Energy (ZPE)</div>
                      <div className="font-mono font-bold text-[#2C302E] mt-0.5">
                        {(calcResult.thermodynamicState.zeroPointEnergyJMol / 1000.0).toFixed(2)} kJ/mol
                      </div>
                      <div className="text-[10px] text-stone-500">1/2 Σ h ν_i</div>
                    </div>
                  </div>
                </div>

                {/* Pedagogical Summary Card */}
                <div className="bg-[#FDF8F5] border border-[#8B572A]/20 rounded-xl p-4 text-xs text-[#2C302E] leading-relaxed">
                  <div className="font-semibold text-[#8B572A] mb-1 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-[#D47942]" /> Statistical Mechanics Analysis
                  </div>
                  {calcResult.pedagogicalSummary}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Quantum Freeze-out & Temperature Dependence View */
        <div className="space-y-4">
          <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="text-sm font-bold text-[#2C302E] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#D47942]" />
                  Quantum Freeze-out of Molecular Heat Capacity: Cv(T) and Cp(T)
                </h3>
                <p className="text-xs text-[#8B572A]">
                  Shows transitions from cryogenic translational plateaus to high-temperature classical equipartition limits
                </p>
              </div>

              {sweepResult && (
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#D47942]" />
                    <span className="font-semibold text-[#2C302E]">Cv(T)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#8B572A]" />
                    <span className="font-semibold text-[#2C302E]">Cp(T)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-t border-dashed border-stone-400" />
                    <span className="text-stone-500">Equipartition Limit</span>
                  </div>
                </div>
              )}
            </div>

            {chartData && sweepResult && (
              <div className="relative">
                <svg
                  viewBox={`0 0 ${chartData.width} ${chartData.height}`}
                  className="w-full h-auto bg-[#FDF8F5]/60 rounded-lg border border-[#8B572A]/10"
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {/* Horizontal Gridlines */}
                  {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
                    const y = chartData.padding.top + frac * chartData.plotHeight;
                    const val = (1 - frac) * chartData.maxY;
                    return (
                      <g key={frac}>
                        <line
                          x1={chartData.padding.left}
                          y1={y}
                          x2={chartData.width - chartData.padding.right}
                          y2={y}
                          stroke="#8B572A"
                          strokeOpacity={0.1}
                          strokeDasharray="2,2"
                        />
                        <text
                          x={chartData.padding.left - 8}
                          y={y + 3}
                          fill="#8B572A"
                          fontSize={9}
                          textAnchor="end"
                          fontFamily="monospace"
                        >
                          {val.toFixed(1)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Vertical Gridlines & X ticks */}
                  {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
                    const x = chartData.padding.left + frac * chartData.plotWidth;
                    const tVal = chartData.minX + frac * (chartData.maxX - chartData.minX);
                    return (
                      <g key={frac}>
                        <line
                          x1={x}
                          y1={chartData.padding.top}
                          x2={x}
                          y2={chartData.padding.top + chartData.plotHeight}
                          stroke="#8B572A"
                          strokeOpacity={0.1}
                          strokeDasharray="2,2"
                        />
                        <text
                          x={x}
                          y={chartData.padding.top + chartData.plotHeight + 16}
                          fill="#8B572A"
                          fontSize={9}
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {tVal.toFixed(0)} K
                        </text>
                      </g>
                    );
                  })}

                  {/* Equipartition limit dashed line */}
                  <line
                    x1={chartData.padding.left}
                    y1={chartData.scaleY(sweepResult.equipartitionCvLimit)}
                    x2={chartData.width - chartData.padding.right}
                    y2={chartData.scaleY(sweepResult.equipartitionCvLimit)}
                    stroke="#2C302E"
                    strokeWidth={1.2}
                    strokeDasharray="4,4"
                    strokeOpacity={0.6}
                  />
                  <text
                    x={chartData.width - chartData.padding.right - 5}
                    y={chartData.scaleY(sweepResult.equipartitionCvLimit) - 4}
                    fill="#2C302E"
                    fontSize={9}
                    textAnchor="end"
                    fontWeight="bold"
                  >
                    Equipartition Limit: {sweepResult.equipartitionCvLimit.toFixed(2)} J/(mol K)
                  </text>

                  {/* Axis Titles */}
                  <text
                    x={chartData.width / 2}
                    y={chartData.height - 8}
                    fill="#2C302E"
                    fontSize={11}
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Temperature [K]
                  </text>
                  <text
                    transform={`rotate(-90) translate(-${chartData.height / 2}, 16)`}
                    fill="#2C302E"
                    fontSize={11}
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Molar Heat Capacity [J / (mol K)]
                  </text>

                  {/* Curves */}
                  <path d={chartData.pathCp} fill="none" stroke="#8B572A" strokeWidth={2.2} />
                  <path d={chartData.pathCv} fill="none" stroke="#D47942" strokeWidth={2.4} />

                  {/* Hover vertical crosshair */}
                  {hoverIndex !== null && chartData.curve[hoverIndex] && (
                    <line
                      x1={chartData.scaleX(chartData.curve[hoverIndex].temperatureK)}
                      y1={chartData.padding.top}
                      x2={chartData.scaleX(chartData.curve[hoverIndex].temperatureK)}
                      y2={chartData.padding.top + chartData.plotHeight}
                      stroke="#D47942"
                      strokeWidth={1.5}
                      strokeDasharray="3,3"
                    />
                  )}

                  {/* Interactive overlay */}
                  <rect
                    x={chartData.padding.left}
                    y={chartData.padding.top}
                    width={chartData.plotWidth}
                    height={chartData.plotHeight}
                    fill="transparent"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const frac = (e.clientX - rect.left) / rect.width;
                      const idx = Math.min(
                        chartData.curve.length - 1,
                        Math.max(0, Math.round(frac * (chartData.curve.length - 1)))
                      );
                      setHoverIndex(idx);
                    }}
                  />
                </svg>

                {/* Hover HUD Bar */}
                {hoverIndex !== null && chartData.curve[hoverIndex] && (
                  <div className="mt-2 p-3 bg-[#FDF8F5] border border-[#D47942]/30 rounded-lg text-xs grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div>
                      <span className="text-[#8B572A]">Temperature:</span>{' '}
                      <span className="font-mono font-bold text-[#2C302E]">
                        {chartData.curve[hoverIndex].temperatureK} K
                      </span>
                    </div>
                    <div>
                      <span className="text-[#D47942] font-semibold">Cv:</span>{' '}
                      <span className="font-mono font-bold text-[#2C302E]">
                        {chartData.curve[hoverIndex].cvJMolK} J/(mol K)
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8B572A] font-semibold">Cp:</span>{' '}
                      <span className="font-mono font-bold text-[#2C302E]">
                        {chartData.curve[hoverIndex].cpJMolK} J/(mol K)
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8B572A]">Entropy S°:</span>{' '}
                      <span className="font-mono font-bold text-[#2C302E]">
                        {chartData.curve[hoverIndex].entropyJMolK} J/(mol K)
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8B572A]">Equipartition:</span>{' '}
                      <span className="font-mono font-bold text-[#D47942]">
                        {(chartData.curve[hoverIndex].fractionEquipartition * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Analysis Card */}
          {sweepResult && (
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 text-xs text-[#2C302E] leading-relaxed space-y-2">
              <div className="font-semibold text-[#8B572A] flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#D47942]" /> Microscopic Freeze-out Interpretation
              </div>
              <p>{sweepResult.analysis}</p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[#8B572A]/10 text-[11px] text-[#8B572A]">
                <span>
                  Characteristic Vibrational Temperatures: [
                  {sweepResult.vibrationalTemperaturesK.join(', ')} K]
                </span>
                <span>•</span>
                <span>
                  Rotational Temperatures: [{sweepResult.rotationalTemperaturesK.join(', ')} K]
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
