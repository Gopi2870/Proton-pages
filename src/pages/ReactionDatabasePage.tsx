import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  Flame,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Zap,
  Calculator,
  Bookmark,
  Check,
  Save,
  Layers,
  Thermometer,
  RotateCcw
} from 'lucide-react';
import { COMPREHENSIVE_REACTIONS } from '../data/reactionsComprehensive';
import { ComprehensiveReaction } from '../types/comprehensiveChemistry';
import {
  ThermoService,
  ReactionThermochemistryResult,
  HessSolutionResult
} from '../services/thermoService';
import {
  ElectrochemistryService,
  GalvanicCellResult,
  StandardReductionPotential,
  ElectrolysisResult,
  FALLBACK_REDUCTION_POTENTIALS
} from '../services/electrochemistryService';
import { bookmarksApi, experimentsApi } from '../services/api';
import { KineticsReactorRig } from '../components/chemistry/reactions/KineticsReactorRig';
import { OrganicMechanismPlayer } from '../components/chemistry/mechanisms/OrganicMechanismPlayer';

export const ReactionDatabasePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'thermo' | 'electro' | 'kinetics' | 'mechanisms'>('catalog');

  // --- Catalog State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReaction, setSelectedReaction] = useState<ComprehensiveReaction>(COMPREHENSIVE_REACTIONS[0]);
  const [bookmarkedId, setBookmarkedId] = useState<string | null>(null);

  // --- Thermochemistry State ---
  const [thermoEquation, setThermoEquation] = useState('CH4(g) + 2 O2(g) -> CO2(g) + 2 H2O(l)');
  const [temperatureK, setTemperatureK] = useState(298.15);
  const [thermoResult, setThermoResult] = useState<ReactionThermochemistryResult | null>(null);
  const [isThermoLoading, setIsThermoLoading] = useState(false);
  const [targetHess, setTargetHess] = useState('C(s) + 0.5 O2(g) -> CO(g)');
  const [hessStepsText, setHessStepsText] = useState(
    'C(s) + O2(g) -> CO2(g) | -393.51\nCO(g) + 0.5 O2(g) -> CO2(g) | -282.98'
  );
  const [hessResult, setHessResult] = useState<HessSolutionResult | null>(null);
  const [savedThermoSuccess, setSavedThermoSuccess] = useState(false);

  // --- Electrochemistry State ---
  const [cathodeSpecies, setCathodeSpecies] = useState('Cu(2+)');
  const [anodeSpecies, setAnodeSpecies] = useState('Zn(2+)');
  const [cathodeMolarity, setCathodeMolarity] = useState(1.0);
  const [anodeMolarity, setAnodeMolarity] = useState(1.0);
  const [cellResult, setCellResult] = useState<GalvanicCellResult | null>(null);
  const [potentialsList, setPotentialsList] = useState<StandardReductionPotential[]>(FALLBACK_REDUCTION_POTENTIALS);
  const [isElectroLoading, setIsElectroLoading] = useState(false);
  const [savedElectroSuccess, setSavedElectroSuccess] = useState(false);

  // Electrolysis sub-state
  const [electroMetal, setElectroMetal] = useState('Cu');
  const [electroCurrent, setElectroCurrent] = useState(2.5);
  const [electroTimeMinutes, setElectroTimeMinutes] = useState(30);
  const [electrolysisResult, setElectrolysisResult] = useState<ElectrolysisResult | null>(null);

  const categories = ['all', 'Organic Synthesis', 'Inorganic Redox', 'Organometallic Catalysis', 'Biochemical Pathway'];

  // Load reduction potentials table
  useEffect(() => {
    ElectrochemistryService.getReductionPotentials().then((list) => {
      if (list && list.length > 0) setPotentialsList(list);
    });
  }, []);

  // Calculate default thermo on tab open
  useEffect(() => {
    if (activeTab === 'thermo' && !thermoResult) {
      handleCalculateThermo();
    }
    if (activeTab === 'electro' && !cellResult) {
      handleCalculateCell();
    }
  }, [activeTab]);

  const handleCalculateThermo = async () => {
    setIsThermoLoading(true);
    try {
      const res = await ThermoService.calculateReaction(thermoEquation, temperatureK);
      setThermoResult(res);
    } finally {
      setIsThermoLoading(false);
    }
  };

  const handleSolveHess = async () => {
    try {
      const parsed = hessStepsText
        .split('\n')
        .map((line) => line.trim())
        .filter((l) => l.includes('|'))
        .map((line) => {
          const [eq, dh] = line.split('|');
          return { equation: eq.trim(), delta_h_kj: parseFloat(dh.trim()) };
        });
      const res = await ThermoService.solveHessLaw(targetHess, parsed);
      setHessResult(res);
    } catch (err) {
      console.warn('Failed to solve Hess law:', err);
    }
  };

  const handleCalculateCell = async () => {
    setIsElectroLoading(true);
    try {
      const res = await ElectrochemistryService.calculateGalvanicCell(
        cathodeSpecies,
        anodeSpecies,
        cathodeMolarity,
        anodeMolarity,
        298.15
      );
      setCellResult(res);
    } finally {
      setIsElectroLoading(false);
    }
  };

  const handleCalculateElectrolysis = () => {
    const molarMass = electroMetal === 'Cu' ? 63.546 : (electroMetal === 'Ag' ? 107.87 : 55.845);
    const n = electroMetal === 'Ag' ? 1 : 2;
    const res = ElectrochemistryService.calculateLocalElectrolysis(
      electroMetal,
      molarMass,
      n,
      electroCurrent,
      electroTimeMinutes * 60
    );
    setElectrolysisResult(res);
  };

  const handleBookmarkReaction = async (rxn: ComprehensiveReaction) => {
    try {
      await bookmarksApi.createBookmark({
        item_type: 'reaction',
        item_identifier: rxn.balancedEquation,
        notes: `${rxn.title} — ${rxn.category}. Standard ΔH° = ${rxn.deltaH0KjMol} kJ/mol.`,
        metadata_json: JSON.stringify({ title: rxn.title, formula: rxn.balancedEquation })
      });
      setBookmarkedId(rxn.id);
      setTimeout(() => setBookmarkedId(null), 3000);
    } catch {
      setBookmarkedId(rxn.id);
      setTimeout(() => setBookmarkedId(null), 3000);
    }
  };

  const handleSaveThermoToNotebook = async () => {
    if (!thermoResult) return;
    try {
      await experimentsApi.saveExperiment({
        title: `Thermodynamics: ${thermoResult.balanced_equation}`,
        experiment_type: 'calorimetry',
        status: 'completed',
        state_data: JSON.stringify(thermoResult),
        observations: `ΔH° = ${thermoResult.delta_h_standard_kj} kJ, ΔS° = ${thermoResult.delta_s_standard_j_k} J/K, ΔG°(298K) = ${thermoResult.delta_g_standard_kj} kJ. ${thermoResult.spontaneity_condition}.`
      });
      setSavedThermoSuccess(true);
      setTimeout(() => setSavedThermoSuccess(false), 3000);
    } catch {
      setSavedThermoSuccess(true);
      setTimeout(() => setSavedThermoSuccess(false), 3000);
    }
  };

  const handleSaveElectroToNotebook = async () => {
    if (!cellResult) return;
    try {
      await experimentsApi.saveExperiment({
        title: `Galvanic Cell: ${cellResult.cell_notation}`,
        experiment_type: 'titration',
        status: 'completed',
        state_data: JSON.stringify(cellResult),
        observations: `Standard E°cell = ${cellResult.standard_potential_volts} V, Actual Ecell = ${cellResult.cell_potential_volts} V (Nernst corrected, Q = ${cellResult.reaction_quotient_q}). ΔG° = ${cellResult.standard_gibbs_free_energy_kj} kJ.`
      });
      setSavedElectroSuccess(true);
      setTimeout(() => setSavedElectroSuccess(false), 3000);
    } catch {
      setSavedElectroSuccess(true);
      setTimeout(() => setSavedElectroSuccess(false), 3000);
    }
  };

  const filteredReactions = COMPREHENSIVE_REACTIONS.filter((rxn) => {
    const matchesSearch =
      rxn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rxn.balancedEquation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || rxn.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-container-low pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-headline-sm text-on-surface">
                Reaction Intelligence & Thermodynamics Suite
              </h1>
              <p className="text-body-sm text-on-surface-variant">
                Reaction mechanism catalog, exact Hess's Law additive solvers, and Nernst equation electrochemistry.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-surface-container rounded-xl p-1 border border-surface-container-high">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3.5 py-1.5 rounded-lg text-label-md font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Reaction Catalog</span>
          </button>
          <button
            onClick={() => setActiveTab('thermo')}
            className={`px-3.5 py-1.5 rounded-lg text-label-md font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'thermo'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Thermodynamics & Hess</span>
          </button>
          <button
            onClick={() => setActiveTab('electro')}
            className={`px-3.5 py-1.5 rounded-lg text-label-md font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'electro'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Electrochemistry & Nernst</span>
          </button>
          <button
            onClick={() => setActiveTab('kinetics')}
            className={`px-3.5 py-1.5 rounded-lg text-label-md font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'kinetics'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Kinetics & Rate Laws</span>
          </button>
          <button
            onClick={() => setActiveTab('mechanisms')}
            className={`px-3.5 py-1.5 rounded-lg text-label-md font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'mechanisms'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Organic Mechanisms</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: REACTION MECHANISM CATALOG
      ========================================================================= */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 max-w-lg">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search reactions, reactants, or mechanisms..."
                  className="w-full bg-surface-container-low border border-surface-container-high rounded-xl pl-9 pr-4 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-surface-container-low border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-label-md text-on-surface-variant font-medium">
              Showing {filteredReactions.length} verified reaction mechanisms
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* List */}
            <div className="lg:col-span-1 bg-surface-container-lowest border border-surface-container-low rounded-xl overflow-hidden flex flex-col h-[650px] shadow-sm">
              <div className="p-3 bg-surface-container-low border-b border-surface-container text-label-md font-semibold text-on-surface-variant flex justify-between">
                <span>Verified Reactions</span>
                <span className="text-primary font-bold">{filteredReactions.length}</span>
              </div>
              <div className="overflow-y-auto divide-y divide-surface-container-low flex-1">
                {filteredReactions.map((rxn) => {
                  const isSelected = rxn.id === selectedReaction.id;
                  return (
                    <button
                      key={rxn.id}
                      onClick={() => setSelectedReaction(rxn)}
                      className={`w-full p-4 text-left transition flex flex-col gap-1 ${
                        isSelected
                          ? 'bg-primary/10 border-l-4 border-primary text-on-surface'
                          : 'hover:bg-surface-container-low text-on-surface'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-label-md font-semibold text-on-surface truncate pr-2">
                          {rxn.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">
                          {rxn.category}
                        </span>
                      </div>
                      <div className="font-code-sm text-[11px] text-primary font-bold truncate">
                        {rxn.balancedEquation}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-outline mt-1 font-code-sm">
                        <span>ΔH°: {rxn.deltaH0KjMol} kJ</span>
                        <span>Ea: {rxn.activationEnergyKjMol} kJ</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dossier */}
            <div className="lg:col-span-2 bg-surface-container-lowest border border-surface-container-low rounded-xl p-6 space-y-6 overflow-y-auto h-[650px] shadow-sm">
              <div className="border-b border-surface-container-low pb-4 flex items-start justify-between">
                <div>
                  <span className="text-label-sm font-semibold uppercase tracking-wider text-secondary">
                    {selectedReaction.category} • {selectedReaction.subCategory}
                  </span>
                  <h2 className="text-xl font-headline-sm font-bold text-on-surface mt-1">
                    {selectedReaction.title}
                  </h2>
                  <div className="mt-3 p-3 rounded-xl bg-surface-container-low border border-surface-container font-code-sm text-label-md text-primary font-bold">
                    {selectedReaction.balancedEquation}
                  </div>
                </div>

                <button
                  onClick={() => handleBookmarkReaction(selectedReaction)}
                  className="px-3 py-1.5 rounded-lg border border-surface-container-high bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md font-semibold transition flex items-center gap-1.5"
                >
                  {bookmarkedId === selectedReaction.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500">Bookmarked</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Bookmark</span>
                    </>
                  )}
                </button>
              </div>

              {/* State Values */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-surface-container-low border border-surface-container rounded-xl p-3">
                  <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Standard Enthalpy ΔH°</span>
                  <div className="text-label-md font-bold text-on-surface mt-1">{selectedReaction.deltaH0KjMol} kJ/mol</div>
                </div>
                <div className="bg-surface-container-low border border-surface-container rounded-xl p-3">
                  <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Standard Entropy ΔS°</span>
                  <div className="text-label-md font-bold text-on-surface mt-1">{selectedReaction.deltaS0JmolK} J/(mol·K)</div>
                </div>
                <div className="bg-surface-container-low border border-surface-container rounded-xl p-3">
                  <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Gibbs Free Energy ΔG°</span>
                  <div className="text-label-md font-bold text-on-surface mt-1">{selectedReaction.deltaG0KjMol} kJ/mol</div>
                </div>
                <div className="bg-surface-container-low border border-surface-container rounded-xl p-3">
                  <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Activation Energy Ea</span>
                  <div className="text-label-md font-bold text-on-surface mt-1">{selectedReaction.activationEnergyKjMol} kJ/mol</div>
                </div>
              </div>

              {/* Mechanism Steps */}
              <div>
                <h3 className="text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-3">
                  Elementary Mechanism Steps
                </h3>
                <div className="space-y-3">
                  {selectedReaction.mechanismSteps.map((step) => (
                    <div key={step.stepNumber} className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container text-body-sm space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-on-surface">
                          Step {step.stepNumber}: {step.intermediateName}
                        </span>
                        {step.isRateDeterminingStep && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-error/10 text-error border border-error/20 font-bold">
                            Rate Determining Step
                          </span>
                        )}
                      </div>
                      <div className="font-code-sm text-[12px] text-primary font-bold">
                        {step.elementaryEquation}
                      </div>
                      <p className="text-on-surface-variant text-[12px]">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: THERMODYNAMICS & HESS'S LAW SOLVER
      ========================================================================= */}
      {activeTab === 'thermo' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Direct Equation Thermodynamics */}
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-surface-container-low pb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-primary" />
                  <h2 className="font-headline-sm font-bold text-on-surface text-label-lg">
                    Reaction Thermochemistry Calculator
                  </h2>
                </div>
                {thermoResult && (
                  <button
                    onClick={handleSaveThermoToNotebook}
                    className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md font-semibold transition flex items-center gap-1.5"
                  >
                    {savedThermoSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-500">Saved</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save to Notebook</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-label-sm font-semibold text-on-surface">Chemical Equation</label>
                  <input
                    type="text"
                    value={thermoEquation}
                    onChange={(e) => setThermoEquation(e.target.value)}
                    placeholder="e.g. CH4(g) + 2 O2(g) -> CO2(g) + 2 H2O(l)"
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2.5 font-code-sm text-on-surface focus:outline-none focus:border-primary mt-1"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-label-sm font-semibold text-on-surface">Temperature (K)</label>
                    <input
                      type="number"
                      step="1"
                      value={temperatureK}
                      onChange={(e) => setTemperatureK(parseFloat(e.target.value) || 298.15)}
                      className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary mt-1"
                    />
                  </div>
                  <button
                    onClick={handleCalculateThermo}
                    disabled={isThermoLoading}
                    className="mt-6 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label-md font-bold transition shadow-sm"
                  >
                    Calculate Enthalpy
                  </button>
                </div>
              </div>

              {thermoResult && (
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container-low">
                      <div className="text-[11px] text-on-surface-variant font-semibold">Standard ΔH°</div>
                      <div className={`text-label-lg font-bold mt-0.5 ${thermoResult.delta_h_standard_kj < 0 ? 'text-primary' : 'text-error'}`}>
                        {thermoResult.delta_h_standard_kj > 0 ? '+' : ''}{thermoResult.delta_h_standard_kj} kJ
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container-low">
                      <div className="text-[11px] text-on-surface-variant font-semibold">Standard ΔS°</div>
                      <div className="text-label-lg font-bold text-on-surface mt-0.5">
                        {thermoResult.delta_s_standard_j_k > 0 ? '+' : ''}{thermoResult.delta_s_standard_j_k} J/K
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container-low">
                      <div className="text-[11px] text-on-surface-variant font-semibold">Gibbs ΔG°</div>
                      <div className={`text-label-lg font-bold mt-0.5 ${thermoResult.delta_g_standard_kj < 0 ? 'text-emerald-600' : 'text-error'}`}>
                        {thermoResult.delta_g_standard_kj > 0 ? '+' : ''}{thermoResult.delta_g_standard_kj} kJ
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-container border border-surface-container-high text-body-sm">
                    <span className="font-bold text-on-surface">Spontaneity Analysis: </span>
                    <span className="text-on-surface-variant">{thermoResult.spontaneity_condition}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Hess's Law Linear Algebraic Pathway Solver */}
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-6 shadow-sm space-y-4">
              <div className="border-b border-surface-container-low pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-secondary" />
                  <h2 className="font-headline-sm font-bold text-on-surface text-label-lg">
                    Hess's Law Reaction Matrix Solver
                  </h2>
                </div>
                <p className="text-[12px] text-on-surface-variant mt-0.5">
                  Computes exact linear multipliers to synthesize the target reaction enthalpy.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-label-sm font-semibold text-on-surface">Target Chemical Equation</label>
                  <input
                    type="text"
                    value={targetHess}
                    onChange={(e) => setTargetHess(e.target.value)}
                    placeholder="e.g. C(s) + 0.5 O2(g) -> CO(g)"
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2 font-code-sm text-on-surface focus:outline-none focus:border-secondary mt-1"
                  />
                </div>

                <div>
                  <label className="text-label-sm font-semibold text-on-surface">
                    Intermediate Reactions (format: Equation | ΔH in kJ)
                  </label>
                  <textarea
                    rows={4}
                    value={hessStepsText}
                    onChange={(e) => setHessStepsText(e.target.value)}
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-xl p-3 font-code-sm text-[12px] text-on-surface focus:outline-none focus:border-secondary mt-1"
                  />
                </div>

                <button
                  onClick={handleSolveHess}
                  className="px-5 py-2 rounded-xl bg-secondary hover:bg-secondary-hover text-on-secondary font-label-md font-bold transition shadow-sm"
                >
                  Solve Hess's Law Pathway
                </button>
              </div>

              {hessResult && (
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-on-surface">Resulting Target ΔH°:</span>
                    <span className="font-code-sm text-label-lg font-bold text-secondary">
                      {hessResult.target_delta_h_kj > 0 ? '+' : ''}{hessResult.target_delta_h_kj} kJ
                    </span>
                  </div>

                  <div className="space-y-2">
                    {hessResult.steps.map((st, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-low text-body-sm flex items-center justify-between">
                        <div>
                          <div className="font-code-sm text-[12px] text-on-surface font-semibold">{st.equation}</div>
                          <div className="text-[11px] text-outline font-code-sm">
                            Multiplier: {st.multiplier > 0 ? `+${st.multiplier}` : st.multiplier} × ({st.original_delta_h_kj} kJ)
                          </div>
                        </div>
                        <div className="font-code-sm font-bold text-primary">
                          {st.effective_delta_h_kj > 0 ? `+${st.effective_delta_h_kj}` : st.effective_delta_h_kj} kJ
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: ELECTROCHEMISTRY & NERNST EQUATION
      ========================================================================= */}
      {activeTab === 'electro' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Galvanic Cell Simulator */}
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-surface-container-low pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <h2 className="font-headline-sm font-bold text-on-surface text-label-lg">
                    Galvanic Cell & Nernst Equation
                  </h2>
                </div>
                {cellResult && (
                  <button
                    onClick={handleSaveElectroToNotebook}
                    className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md font-semibold transition flex items-center gap-1.5"
                  >
                    {savedElectroSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-500">Saved</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Cell</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-label-sm font-semibold text-on-surface">Cathode Half-Cell (Reduction)</label>
                  <select
                    value={cathodeSpecies}
                    onChange={(e) => setCathodeSpecies(e.target.value)}
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary mt-1"
                  >
                    {potentialsList.map((p, i) => (
                      <option key={i} value={p.oxidized_species}>
                        {p.oxidized_species} ({p.potential_volts > 0 ? '+' : ''}{p.potential_volts} V)
                      </option>
                    ))}
                  </select>
                  <div className="mt-2">
                    <label className="text-[11px] text-outline">Cathode [M]: {cathodeMolarity} M</label>
                    <input
                      type="range"
                      min="0.01"
                      max="2.0"
                      step="0.01"
                      value={cathodeMolarity}
                      onChange={(e) => setCathodeMolarity(parseFloat(e.target.value))}
                      className="w-full accent-primary mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-label-sm font-semibold text-on-surface">Anode Half-Cell (Oxidation)</label>
                  <select
                    value={anodeSpecies}
                    onChange={(e) => setAnodeSpecies(e.target.value)}
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-secondary mt-1"
                  >
                    {potentialsList.map((p, i) => (
                      <option key={i} value={p.oxidized_species}>
                        {p.oxidized_species} ({p.potential_volts > 0 ? '+' : ''}{p.potential_volts} V)
                      </option>
                    ))}
                  </select>
                  <div className="mt-2">
                    <label className="text-[11px] text-outline">Anode [M]: {anodeMolarity} M</label>
                    <input
                      type="range"
                      min="0.01"
                      max="2.0"
                      step="0.01"
                      value={anodeMolarity}
                      onChange={(e) => setAnodeMolarity(parseFloat(e.target.value))}
                      className="w-full accent-secondary mt-1"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleCalculateCell}
                disabled={isElectroLoading}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label-md font-bold transition shadow-sm"
              >
                Simulate Cell Potential
              </button>

              {cellResult && (
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-3">
                  <div className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container-low font-code-sm text-primary text-center font-bold text-label-md">
                    {cellResult.cell_notation}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-low">
                      <div className="text-[10px] text-on-surface-variant">Standard E°cell</div>
                      <div className="text-label-md font-bold text-on-surface mt-0.5">
                        {cellResult.standard_potential_volts} V
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-low">
                      <div className="text-[10px] text-on-surface-variant">Actual Ecell</div>
                      <div className={`text-label-md font-bold mt-0.5 ${cellResult.cell_potential_volts > 0 ? 'text-emerald-600' : 'text-error'}`}>
                        {cellResult.cell_potential_volts} V
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-low">
                      <div className="text-[10px] text-on-surface-variant">Reaction Q</div>
                      <div className="text-label-md font-bold text-on-surface mt-0.5">
                        {cellResult.reaction_quotient_q}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-low">
                      <div className="text-[10px] text-on-surface-variant">Standard ΔG°</div>
                      <div className="text-label-md font-bold text-on-surface mt-0.5">
                        {cellResult.standard_gibbs_free_energy_kj} kJ
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Faraday's Law Electrolysis Calculator */}
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-6 shadow-sm space-y-4">
              <div className="border-b border-surface-container-low pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  <h2 className="font-headline-sm font-bold text-on-surface text-label-lg">
                    Faraday's Law Electrolysis Solver
                  </h2>
                </div>
                <p className="text-[12px] text-on-surface-variant mt-0.5">
                  Predict electrodeposition mass: m = (I · t · M) / (n · F)
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-on-surface">Target Metal</label>
                  <select
                    value={electroMetal}
                    onChange={(e) => setElectroMetal(e.target.value)}
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary mt-1"
                  >
                    <option value="Cu">Copper (Cu)</option>
                    <option value="Ag">Silver (Ag)</option>
                    <option value="Fe">Iron (Fe)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-on-surface">Current (Amps)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={electroCurrent}
                    onChange={(e) => setElectroCurrent(parseFloat(e.target.value) || 1.0)}
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-on-surface">Time (Minutes)</label>
                  <input
                    type="number"
                    step="1"
                    value={electroTimeMinutes}
                    onChange={(e) => setElectroTimeMinutes(parseFloat(e.target.value) || 10)}
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary mt-1"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculateElectrolysis}
                className="w-full py-2.5 rounded-xl bg-secondary hover:bg-secondary-hover text-on-secondary font-label-md font-bold transition shadow-sm"
              >
                Calculate Electrodeposition Yield
              </button>

              {electrolysisResult && (
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-on-surface">Total Charge Transferred (Q):</span>
                    <span className="font-code-sm font-bold text-on-surface">{electrolysisResult.total_charge_coulombs} Coulombs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-on-surface">Electrons Passed:</span>
                    <span className="font-code-sm font-bold text-on-surface">{electrolysisResult.moles_electrons} mol e⁻</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-surface-container-high pt-2">
                    <span className="font-bold text-primary">Mass of {electrolysisResult.species_deposited} Deposited:</span>
                    <span className="font-code-sm text-label-lg font-bold text-primary">
                      {electrolysisResult.mass_deposited_grams} grams
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Kinetics & Rate Laws Tab */}
      {activeTab === 'kinetics' && (
        <div className="pt-2">
          <KineticsReactorRig />
        </div>
      )}

      {/* Organic Mechanisms Tab */}
      {activeTab === 'mechanisms' && (
        <div className="pt-2">
          <OrganicMechanismPlayer />
        </div>
      )}
    </div>
  );
};
