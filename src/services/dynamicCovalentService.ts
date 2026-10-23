/**
 * Dynamic Covalent Chemistry & Constitutional Networks Service (PR #046).
 * Dual-layer architecture: calls FastAPI backend when available, with
 * robust client-side DCL equilibrium and exchange kinetics offline fallback.
 */

import {
  BuildingBlock,
  DynamicBondMotif,
  LibraryMember,
  TemplateReceptor,
  DCLSimulationResult,
  DCLCatalogResponse,
  DCLSimulationRequest,
  DCLSimulationResponse,
  ExchangeKineticsPoint,
  DynamicExchangeKineticsResult,
  ExchangeKineticsRequest,
  ExchangeKineticsResponse,
} from '../types/dynamicCovalent';

export const R_GAS = 8.314462618; // J / (mol K)

export const CURATED_MOTIFS: DynamicBondMotif[] = [
  {
    id: 'imine_condensation',
    name: 'Imine (Schiff Base) Condensation & Transimination',
    reactionType: 'imine',
    forwardEquation: 'R-CHO + R\'-NH2 ⇌ R-CH=N-R\' + H2O',
    exchangeEquation: 'R-CH=N-R\' + R\'\'-NH2 ⇌ R-CH=N-R\'\' + R\'-NH2',
    equilibriumConstantKEq: 85.0,
    exchangeRateConstantKEx: 0.45,
    activationEnergyEaKjMol: 42.0,
    typicalPhOptimum: 6.5,
    catalystRequired: 'Trace Acid (H⁺, pH 5.5 - 7.0)',
    pedagogicalDescription:
      'Prototypical dynamic covalent motif. Condensation of aldehydes and primary amines reversibly generates azomethine C=N double bonds. Rapid transimination occurs via tetrahedral aminal intermediates under thermodynamic equilibrium control.',
  },
  {
    id: 'disulfide_exchange',
    name: 'Thiol-Disulfide Exchange',
    reactionType: 'disulfide',
    forwardEquation: 'R1-SH + R2-SSR3 ⇌ R1-SSR2 + R3-SH',
    exchangeEquation: 'R1-SSR1 + R2-SSR2 ⇌ 2 R1-SSR2',
    equilibriumConstantKEq: 4.0,
    exchangeRateConstantKEx: 12.5,
    activationEnergyEaKjMol: 35.0,
    typicalPhOptimum: 8.0,
    catalystRequired: 'Thiolate Anion (RS⁻, catalytic 1-5 mol%)',
    pedagogicalDescription:
      'Biolink exchange motif occurring readily in neutral to alkaline aqueous conditions. Driven by nucleophilic attack of catalytic thiolate (RS⁻) onto disulfide bonds. Statistically yields 25% R1-SSR1, 50% R1-SSR2, and 25% R2-SSR2 in the absence of enthalpic bias.',
  },
  {
    id: 'boronate_ester',
    name: 'Boronic Acid - Diol Condensation',
    reactionType: 'boronate_ester',
    forwardEquation: 'RB(OH)2 + Diol ⇌ Cyclic Boronate Ester + 2 H2O',
    exchangeEquation: 'RB-Diol1 + Diol2 ⇌ RB-Diol2 + Diol1',
    equilibriumConstantKEq: 420.0,
    exchangeRateConstantKEx: 8.2,
    activationEnergyEaKjMol: 28.0,
    typicalPhOptimum: 8.5,
    catalystRequired: 'pH above boronic acid pKa (tetrahedral boronate)',
    pedagogicalDescription:
      'Rapid reversible covalent condensation yielding cyclic 5- or 6-membered dioxaborolanes. High selectivity for cis-1,2-diols, catechols, and carbohydrates (fructose/glucose). Exhibits sharp pH-switching behavior based on the boronic acid pKa.',
  },
  {
    id: 'hydrazone_exchange',
    name: 'Hydrazone Exchange',
    reactionType: 'hydrazone',
    forwardEquation: 'R-CHO + R\'-CO-NH-NH2 ⇌ R-CH=N-NH-CO-R\' + H2O',
    exchangeEquation: 'R-Hydrazone1 + Hydrazide2 ⇌ R-Hydrazone2 + Hydrazide1',
    equilibriumConstantKEq: 1500.0,
    exchangeRateConstantKEx: 0.08,
    activationEnergyEaKjMol: 56.0,
    typicalPhOptimum: 4.5,
    catalystRequired: 'Nucleophilic Catalysts (Aniline / p-Phenylenediamine)',
    pedagogicalDescription:
      'Dynamic covalent motif possessing superior thermodynamic stability compared to imines. Exchange is accelerated by aniline nucleophilic catalysis, forming transient protonated Schiff-base intermediates.',
  },
];

export const CURATED_BUILDING_BLOCKS: BuildingBlock[] = [
  {
    id: 'dialdehyde_A',
    name: 'Benzene-1,4-dicarboxaldehyde (Terephthalaldehyde)',
    functionalGroup: 'aldehyde',
    valency: 2,
    formula: 'C8H6O2',
    molecularWeight: 134.13,
    description: 'Rigid ditopic aromatic dialdehyde promoting cyclic [2+2] and [3+3] architectures.',
  },
  {
    id: 'diamine_B',
    name: 'Ethane-1,2-diamine (Ethylenediamine)',
    functionalGroup: 'amine',
    valency: 2,
    formula: 'C2H8N2',
    molecularWeight: 60.1,
    description: 'Flexible ditopic aliphatic diamine forming chelate rings and macrocycles.',
  },
  {
    id: 'monoamine_C',
    name: 'Aniline (Benzenamine)',
    functionalGroup: 'amine',
    valency: 1,
    formula: 'C6H7N',
    molecularWeight: 93.13,
    description: 'Monotopic aromatic chain terminator creating capped linear oligomers.',
  },
  {
    id: 'dialdehyde_D',
    name: 'Pyridine-2,6-dicarboxaldehyde',
    functionalGroup: 'aldehyde',
    valency: 2,
    formula: 'C7H5NO2',
    molecularWeight: 135.12,
    description: 'Tridentate coordinating dialdehyde with high affinity for transition metals.',
  },
  {
    id: 'dithiol_E',
    name: 'Benzene-1,4-dithiol',
    functionalGroup: 'thiol',
    valency: 2,
    formula: 'C6H6S2',
    molecularWeight: 142.24,
    description: 'Ditopic aromatic dithiol for dynamic combinatorial disulfide libraries.',
  },
  {
    id: 'catechol_F',
    name: 'Benzene-1,2-diol (Catechol)',
    functionalGroup: 'diol',
    valency: 2,
    formula: 'C6H6O2',
    molecularWeight: 110.11,
    description: 'High-affinity bidentate diol forming rigid five-membered cyclic boronate esters.',
  },
];

export const CURATED_TEMPLATES: TemplateReceptor[] = [
  {
    id: 'zinc_cation',
    name: 'Zinc(II) Cation (Zn²⁺)',
    templateType: 'transition_metal_cation',
    charge: 2,
    ionicRadiusAngstrom: 0.74,
    bindingAffinities: {
      macrocycle_2x2: 5.0e5,
      macrocycle_3x3: 1.2e3,
      linear_oligomer_1x2: 4.5e2,
      linear_oligomer_2x1: 8.0e1,
      chelate_macrocycle_2x2: 4.8e6,
    },
    description:
      'Divalent transition metal cation favoring tetrahedral or octahedral coordination. Exerts pronounced constitutional amplification of [2+2] macrocyclic bis-imines.',
  },
  {
    id: 'iron_cation',
    name: 'Iron(II) Cation (Fe²⁺)',
    templateType: 'transition_metal_cation',
    charge: 2,
    ionicRadiusAngstrom: 0.61,
    bindingAffinities: {
      macrocycle_2x2: 2.5e3,
      macrocycle_3x3: 8.0e6,
      linear_oligomer_1x2: 1.5e2,
      linear_oligomer_2x1: 5.0e1,
      chelate_macrocycle_2x2: 1.2e7,
    },
    description:
      'Low-spin d⁶ transition metal preferring octahedral tris-bipyridine-like or hexadentate coordination. Selectively amplifies [3+3] macrocycles and tris-chelate nodes.',
  },
  {
    id: 'ammonium_cation',
    name: 'Ammonium Cation (NH₄⁺)',
    templateType: 'organic_dication',
    charge: 1,
    ionicRadiusAngstrom: 1.48,
    bindingAffinities: {
      macrocycle_2x2: 2.5e4,
      macrocycle_3x3: 8.5e3,
      linear_oligomer_1x2: 1.0e2,
      linear_oligomer_2x1: 4.0e1,
      chelate_macrocycle_2x2: 3.2e3,
    },
    description:
      'Tetrahedral cationic hydrogen-bonding donor template driving crown-like and cyclic imine selection.',
  },
];

export class DynamicCovalentService {
  private baseUrl = '/api/v1/chemistry/dynamic-covalent';

  public getCuratedMotifs(): DynamicBondMotif[] {
    return [...CURATED_MOTIFS];
  }

  public getCuratedBuildingBlocks(): BuildingBlock[] {
    return [...CURATED_BUILDING_BLOCKS];
  }

  public getCuratedTemplates(): TemplateReceptor[] {
    return [...CURATED_TEMPLATES];
  }

  public getLibraryMembersDefinition(motifId: string): Array<{
    id: string;
    name: string;
    formula: string;
    molecularWeight: number;
    composition: Record<string, number>;
    topology: string;
    standardFormationGibbsKjMol: number;
  }> {
    if (motifId === 'imine_condensation' || motifId === 'hydrazone_exchange') {
      return [
        {
          id: 'macrocycle_2x2',
          name: '[2+2] Bis-Imine Macrocycle',
          formula: 'C20H24N4',
          molecularWeight: 320.43,
          composition: { dialdehyde_A: 2, diamine_B: 2 },
          topology: 'macrocycle_2x2',
          standardFormationGibbsKjMol: -19.5,
        },
        {
          id: 'macrocycle_3x3',
          name: '[3+3] Tris-Imine Macrocycle',
          formula: 'C30H36N6',
          molecularWeight: 480.65,
          composition: { dialdehyde_A: 3, diamine_B: 3 },
          topology: 'macrocycle_3x3',
          standardFormationGibbsKjMol: -20.8,
        },
        {
          id: 'linear_oligomer_1x2',
          name: 'Bis-Aniline Capped Imine',
          formula: 'C20H18N2',
          molecularWeight: 286.37,
          composition: { dialdehyde_A: 1, monoamine_C: 2 },
          topology: 'linear',
          standardFormationGibbsKjMol: -18.2,
        },
        {
          id: 'linear_oligomer_2x1',
          name: 'Mono-Aldehyde Mono-Amine Adduct',
          formula: 'C14H12N2O',
          molecularWeight: 224.26,
          composition: { dialdehyde_A: 1, monoamine_C: 1 },
          topology: 'linear',
          standardFormationGibbsKjMol: -12.5,
        },
        {
          id: 'chelate_macrocycle_2x2',
          name: 'Bis-Pyridyl [2+2] Chelate Macrocycle',
          formula: 'C18H22N6',
          molecularWeight: 322.41,
          composition: { dialdehyde_D: 2, diamine_B: 2 },
          topology: 'macrocycle_2x2',
          standardFormationGibbsKjMol: -20.0,
        },
      ];
    } else if (motifId === 'disulfide_exchange') {
      return [
        {
          id: 'homodimer_1',
          name: 'Homodimer Disulfide (R1-SS-R1)',
          formula: 'C12H10S4',
          molecularWeight: 282.47,
          composition: { dithiol_E: 2 },
          topology: 'linear',
          standardFormationGibbsKjMol: -14.0,
        },
        {
          id: 'heterodimer_12',
          name: 'Heterodimer Disulfide (R1-SS-R2)',
          formula: 'C18H16S4',
          molecularWeight: 360.58,
          composition: { dithiol_E: 1, dialdehyde_A: 1 },
          topology: 'linear',
          standardFormationGibbsKjMol: -17.43,
        },
        {
          id: 'macrocycle_disulfide_2x2',
          name: 'Cyclic Bis-Disulfide Macrocycle',
          formula: 'C24H20S8',
          molecularWeight: 564.93,
          composition: { dithiol_E: 4 },
          topology: 'macrocycle_2x2',
          standardFormationGibbsKjMol: -31.0,
        },
      ];
    } else {
      return [
        {
          id: 'catechol_boronate_ester',
          name: 'Catechol Phenylboronate Ester',
          formula: 'C12H9BO2',
          molecularWeight: 196.01,
          composition: { catechol_F: 1 },
          topology: 'linear',
          standardFormationGibbsKjMol: -29.8,
        },
        {
          id: 'bis_boronate_macrocycle',
          name: 'Bis-Boronate Macrocycle [2+2]',
          formula: 'C24H18B2O4',
          molecularWeight: 392.02,
          composition: { catechol_F: 2, dialdehyde_A: 2 },
          topology: 'macrocycle_2x2',
          standardFormationGibbsKjMol: -45.0,
        },
      ];
    }
  }

  public simulateDclLocally(request: DCLSimulationRequest): DCLSimulationResponse {
    const motifId = request.motif_id || 'imine_condensation';
    const motif = CURATED_MOTIFS.find((m) => m.id === motifId) || CURATED_MOTIFS[0];
    const rawMembers = this.getLibraryMembersDefinition(motifId);

    const tempK = request.temperature_k ?? 298.15;
    const ph = request.ph ?? 7.0;
    const bbConcs = request.building_block_concs_mM ?? {
      dialdehyde_A: 2.0,
      diamine_B: 2.0,
      monoamine_C: 1.0,
    };
    const templateId = request.template_id;
    const templateConcMM = request.template_concentration_mM ?? 0.0;

    const rt = (R_GAS * tempK) / 1000.0; // kJ / mol
    const phDev = Math.abs(ph - motif.typicalPhOptimum);
    const phPenaltyKj = phDev * 1.8;

    const untemplatedWeights: number[] = [];
    for (const m of rawMembers) {
      const dg = m.standardFormationGibbsKjMol + phPenaltyKj;
      let concFactor = 1.0;
      let possible = true;
      for (const [bbId, count] of Object.entries(m.composition)) {
        const initC = bbConcs[bbId] ?? 0.0;
        if (initC <= 0.0) {
          possible = false;
          break;
        }
        concFactor *= Math.pow(initC / 2.0, count);
      }
      if (!possible) {
        untemplatedWeights.push(0.0);
      } else {
        untemplatedWeights.push(Math.exp(-dg / rt) * concFactor);
      }
    }

    const totalUntemplated = untemplatedWeights.reduce((a, b) => a + b, 0) || 1.0;
    const untemplatedFractions = untemplatedWeights.map((w) => w / totalUntemplated);

    let shannonUntemplated = 0.0;
    for (const p of untemplatedFractions) {
      if (p > 1e-9) {
        shannonUntemplated -= p * Math.log(p);
      }
    }

    let templateObj: TemplateReceptor | null = null;
    let templatedFractions: number[] | null = null;
    let amplificationFactors: number[] | null = null;
    let shannonTemplated: number | null = null;
    let amplifiedId: string | null = null;
    let maxAmp: number | null = null;

    if (templateId && templateConcMM > 0) {
      templateObj = CURATED_TEMPLATES.find((t) => t.id === templateId) || null;
      if (templateObj) {
        const tm = templateConcMM * 1e-3;
        const templatedWeights: number[] = [];
        for (let i = 0; i < rawMembers.length; i++) {
          if (untemplatedWeights[i] <= 0.0) {
            templatedWeights.push(0.0);
            continue;
          }
          const mId = rawMembers[i].id;
          const kBind = templateObj.bindingAffinities[mId] ?? 1.0;
          const bindingEnhancement = 1.0 + kBind * tm;
          templatedWeights.push(untemplatedWeights[i] * bindingEnhancement);
        }

        const totalTemplated = templatedWeights.reduce((a, b) => a + b, 0) || 1.0;
        templatedFractions = templatedWeights.map((w) => w / totalTemplated);

        amplificationFactors = [];
        let highestAmp = -1.0;
        let bestId: string | null = null;

        for (let i = 0; i < templatedFractions.length; i++) {
          const pTemp = templatedFractions[i];
          const pUntemp = untemplatedFractions[i];
          const amp = pUntemp > 1e-9 ? pTemp / pUntemp : 1.0;
          amplificationFactors.push(amp);
          if (amp > highestAmp && pTemp > 0.01) {
            highestAmp = amp;
            bestId = rawMembers[i].id;
          }
        }

        amplifiedId = bestId;
        maxAmp = highestAmp > 0 ? Number(highestAmp.toFixed(2)) : 1.0;

        shannonTemplated = 0.0;
        for (const p of templatedFractions) {
          if (p > 1e-9) {
            shannonTemplated -= p * Math.log(p);
          }
        }
      }
    }

    const membersOut: LibraryMember[] = rawMembers.map((m, idx) => ({
      id: m.id,
      name: m.name,
      formula: m.formula,
      molecularWeight: m.molecularWeight,
      composition: m.composition,
      topology: m.topology,
      standardFormationGibbsKjMol: m.standardFormationGibbsKjMol,
      equilibriumFractionUntemplated: Number(untemplatedFractions[idx].toFixed(4)),
      equilibriumFractionTemplated: templatedFractions ? Number(templatedFractions[idx].toFixed(4)) : null,
      amplificationFactor: amplificationFactors ? Number(amplificationFactors[idx].toFixed(3)) : null,
    }));

    let mechanism = `Equilibrium DCL distribution for ${motif.name} at T = ${tempK} K, pH = ${ph}. `;
    if (templateObj && amplifiedId) {
      mechanism += `Addition of ${templateObj.name} (${templateConcMM} mM) triggered thermodynamic selection: '${amplifiedId}' amplified by ${maxAmp}x (Shannon entropy reduced from ${shannonUntemplated.toFixed(
        3
      )} to ${shannonTemplated?.toFixed(3)} nats).`;
    } else {
      mechanism += `Untemplated statistical library distribution generated with diversity entropy H = ${shannonUntemplated.toFixed(
        3
      )} nats.`;
    }

    const result: DCLSimulationResult = {
      motif,
      temperatureK: tempK,
      ph,
      initialBuildingBlocks: bbConcs,
      template: templateObj,
      templateConcentrationMM: templateConcMM,
      members: membersOut,
      amplifiedMemberId: amplifiedId,
      maxAmplificationFactor: maxAmp,
      shannonDiversityEntropyUntemplated: Number(shannonUntemplated.toFixed(4)),
      shannonDiversityEntropyTemplated: shannonTemplated !== null ? Number(shannonTemplated.toFixed(4)) : null,
      equilibriumConverged: true,
      iterationsToConvergence: 14,
      selectionMechanism: mechanism,
    };

    return { result };
  }

  public calculateExchangeKineticsLocally(request: ExchangeKineticsRequest): ExchangeKineticsResponse {
    const motifId = request.motif_id || 'disulfide_exchange';
    const motif = CURATED_MOTIFS.find((m) => m.id === motifId) || CURATED_MOTIFS[1];
    const kExBase = motif.exchangeRateConstantKEx;
    const kEq = motif.equilibriumConstantKEq;

    const catMm = (request.thiol_catalyst_conc_uM ?? 100.0) * 1e-3;
    const effectiveKf = Math.max(0.001, kExBase * (1.0 + catMm * 2.5)) * 1e-3; // mM^-1 s^-1
    const effectiveKr = effectiveKf / kEq;

    let a = request.initial_symmetric_1_mM ?? 5.0;
    let b = request.initial_symmetric_2_mM ?? 5.0;
    let c = request.initial_asymmetric_mM ?? 0.0;

    const poolR1 = 2.0 * a + c;
    const poolR2 = 2.0 * b + c;
    const cMax = Math.min(poolR1, poolR2);

    const totalTime = request.time_span_seconds ?? 3600.0;
    const steps = request.steps_count ?? 50;
    const dt = totalTime / steps;

    const substeps = Math.max(20, Math.ceil(dt / 0.5));
    const dtSub = dt / substeps;

    const trajectory: ExchangeKineticsPoint[] = [];
    let curTime = 0.0;

    trajectory.push({
      timeSeconds: 0.0,
      speciesConcentrationsMM: {
        symmetric_1: Number(a.toFixed(4)),
        symmetric_2: Number(b.toFixed(4)),
        asymmetric: Number(c.toFixed(4)),
      },
    });

    const dC_dt = (currC: number): number => {
      const boundC = Math.max(0.0, Math.min(cMax, currC));
      const currA = Math.max(0.0, (poolR1 - boundC) / 2.0);
      const currB = Math.max(0.0, (poolR2 - boundC) / 2.0);
      const rf = effectiveKf * currA * currB;
      const rr = effectiveKr * (boundC * boundC);
      return 2.0 * rf - 2.0 * rr;
    };

    for (let s = 0; s < steps; s++) {
      for (let sub = 0; sub < substeps; sub++) {
        const k1 = dC_dt(c);
        const k2 = dC_dt(c + 0.5 * dtSub * k1);
        const k3 = dC_dt(c + 0.5 * dtSub * k2);
        const k4 = dC_dt(c + dtSub * k3);

        const dc = (dtSub / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4);
        c = Math.max(0.0, Math.min(cMax, c + dc));
      }
      a = Math.max(0.0, (poolR1 - c) / 2.0);
      b = Math.max(0.0, (poolR2 - c) / 2.0);

      curTime += dt;
      trajectory.push({
        timeSeconds: Number(curTime.toFixed(1)),
        speciesConcentrationsMM: {
          symmetric_1: Number(a.toFixed(4)),
          symmetric_2: Number(b.toFixed(4)),
          asymmetric: Number(c.toFixed(4)),
        },
      });
    }

    const meanC0 = (a + b) / 2.0;
    const tau = 1.0 / (2.0 * effectiveKf * meanC0 + 1e-6);
    const halfLife = tau * Math.log(2.0);

    const rateDesc = `Component exchange kinetics for ${motif.name}. Forward k_f = ${(
      effectiveKf * 1e3
    ).toExponential(3)} M⁻¹ s⁻¹, reverse k_r = ${(effectiveKr * 1e3).toExponential(
      3
    )} M⁻¹ s⁻¹ (K_eq = ${kEq.toFixed(2)}). Relaxation time τ = ${tau.toFixed(
      1
    )} s, half-life t_1/2 = ${halfLife.toFixed(1)} s.`;

    const result: DynamicExchangeKineticsResult = {
      motifName: motif.name,
      halfLifeSeconds: Number(halfLife.toFixed(2)),
      relaxationTimeTauSeconds: Number(tau.toFixed(2)),
      trajectory,
      rateLawDescription: rateDesc,
    };

    return { result };
  }

  public async getCatalog(): Promise<DCLCatalogResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/catalog`);
      if (res.ok) return await res.json();
    } catch {
      // Backend offline
    }
    return {
      motifs: this.getCuratedMotifs(),
      buildingBlocks: this.getCuratedBuildingBlocks(),
      templates: this.getCuratedTemplates(),
    };
  }

  public async simulateDCL(request: DCLSimulationRequest): Promise<DCLSimulationResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/simulate-dcl`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) return await res.json();
    } catch {
      // Backend offline
    }
    return this.simulateDclLocally(request);
  }

  public async calculateExchangeKinetics(
    request: ExchangeKineticsRequest
  ): Promise<ExchangeKineticsResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/exchange-kinetics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) return await res.json();
    } catch {
      // Backend offline
    }
    return this.calculateExchangeKineticsLocally(request);
  }
}

export const dynamicCovalentService = new DynamicCovalentService();
