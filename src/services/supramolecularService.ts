/**
 * Supramolecular Chemistry & Host-Guest Complexation Service (PR #045).
 * Dual-layer architecture: calls FastAPI backend when available, with
 * client-side equilibrium and non-covalent force evaluation offline fallback.
 */

import {
  HostMolecule,
  GuestMolecule,
  JobPlotPoint,
  JobPlotResult,
  BindingIsothermPoint,
  NonCovalentDecomposition,
  HostGuestComplexSystem,
  JobPlotRequest,
  JobPlotResponse,
  BindingSimulationRequest,
  BindingSimulationResponse,
} from '../types/supramolecular';

export const R_GAS = 8.314462618; // J / (mol K)

export const CURATED_HOSTS: HostMolecule[] = [
  {
    id: '18_crown_6',
    name: '18-Crown-6',
    category: 'crown_ether',
    formula: 'C12H24O6',
    molecularWeight: 264.32,
    cavityDiameterAngstrom: 2.8,
    donorSites: 6,
    donorAtomType: 'Ether Oxygen (sp³)',
    description: 'Prototypical macrocyclic polyether with peak size-complementary affinity for potassium (K⁺).',
  },
  {
    id: '15_crown_5',
    name: '15-Crown-5',
    category: 'crown_ether',
    formula: 'C10H20O5',
    molecularWeight: 220.26,
    cavityDiameterAngstrom: 1.95,
    donorSites: 5,
    donorAtomType: 'Ether Oxygen (sp³)',
    description: 'Five-oxygen crown ether possessing ideal cavity diameter for coordinating sodium (Na⁺).',
  },
  {
    id: '12_crown_4',
    name: '12-Crown-4',
    category: 'crown_ether',
    formula: 'C8H16O4',
    molecularWeight: 176.21,
    cavityDiameterAngstrom: 1.4,
    donorSites: 4,
    donorAtomType: 'Ether Oxygen (sp³)',
    description: 'Compact tetraoxa-macrocycle selective for the small lithium cation (Li⁺).',
  },
  {
    id: 'cryptand_222',
    name: 'Cryptand [2.2.2]',
    category: 'cryptand',
    formula: 'C18H36N2O6',
    molecularWeight: 376.49,
    cavityDiameterAngstrom: 2.8,
    donorSites: 8,
    donorAtomType: '6 Ether Oxygens + 2 Bridgehead Nitrogens',
    description: 'Three-dimensional bicyclic cage receptor exerting the macrobicyclic cryptate effect for K⁺.',
  },
  {
    id: 'beta_cyclodextrin',
    name: 'β-Cyclodextrin',
    category: 'cyclodextrin',
    formula: 'C42H70O35',
    molecularWeight: 1134.98,
    cavityDiameterAngstrom: 6.2,
    depthAngstrom: 7.9,
    donorSites: 21,
    donorAtomType: 'Secondary C2/C3 and Primary C6 Hydroxyls',
    description: 'Toroidal cyclic heptasaccharide hosting adamantyl, aromatic, and steroid pharmaceutical guests.',
  },
  {
    id: 'alpha_cyclodextrin',
    name: 'α-Cyclodextrin',
    category: 'cyclodextrin',
    formula: 'C36H60O30',
    molecularWeight: 972.84,
    cavityDiameterAngstrom: 4.9,
    depthAngstrom: 7.9,
    donorSites: 18,
    donorAtomType: 'Secondary C2/C3 and Primary C6 Hydroxyls',
    description: 'Hexasaccharide macrocycle with compact cavity selective for unbranched aliphatic chains and monosubstituted benzenes.',
  },
];

export const CURATED_GUESTS: GuestMolecule[] = [
  {
    id: 'potassium_cation',
    name: 'Potassium Cation (K⁺)',
    category: 'alkali_cation',
    formula: 'K⁺',
    molecularWeight: 39.098,
    effectiveRadiusAngstrom: 1.38,
    charge: 1,
    description: 'Spherical hard alkali cation with Pauling ionic radius 1.38 Å (diameter 2.76 Å).',
  },
  {
    id: 'sodium_cation',
    name: 'Sodium Cation (Na⁺)',
    category: 'alkali_cation',
    formula: 'Na⁺',
    molecularWeight: 22.99,
    effectiveRadiusAngstrom: 1.02,
    charge: 1,
    description: 'Moderate-sized alkali cation with Pauling ionic radius 1.02 Å (diameter 2.04 Å).',
  },
  {
    id: 'lithium_cation',
    name: 'Lithium Cation (Li⁺)',
    category: 'alkali_cation',
    formula: 'Li⁺',
    molecularWeight: 6.941,
    effectiveRadiusAngstrom: 0.76,
    charge: 1,
    description: 'Small, high charge density alkali cation with Pauling radius 0.76 Å (diameter 1.52 Å).',
  },
  {
    id: 'cesium_cation',
    name: 'Cesium Cation (Cs⁺)',
    category: 'alkali_cation',
    formula: 'Cs⁺',
    molecularWeight: 132.905,
    effectiveRadiusAngstrom: 1.67,
    charge: 1,
    description: 'Large, polarizable soft alkali cation with Pauling radius 1.67 Å (diameter 3.34 Å).',
  },
  {
    id: 'adamantanecarboxylate',
    name: '1-Adamantanecarboxylate',
    category: 'aromatic_guest',
    formula: 'C11H15O2⁻',
    molecularWeight: 179.24,
    effectiveRadiusAngstrom: 3.15,
    charge: -1,
    description: 'Rigid diamondoid cage substrate with optimal shape complementarity for β-cyclodextrin.',
  },
  {
    id: '4_nitrophenol',
    name: '4-Nitrophenol',
    category: 'aromatic_guest',
    formula: 'C6H5NO3',
    molecularWeight: 139.11,
    effectiveRadiusAngstrom: 2.5,
    charge: 0,
    description: 'Planar aromatic guest exhibiting prominent UV-Vis absorption shifts upon cyclodextrin inclusion.',
  },
];

export const EMPIRICAL_DATABASE: Record<string, { logKa: number; deltaH: number; ionDipole: number; hBond: number; piPi: number; desolv: number }> = {
  '18_crown_6:potassium_cation': { logKa: 6.1, deltaH: -56.0, ionDipole: -48.0, hBond: 0.0, piPi: 0.0, desolv: 15.0 },
  '18_crown_6:sodium_cation': { logKa: 4.32, deltaH: -35.0, ionDipole: -32.0, hBond: 0.0, piPi: 0.0, desolv: 12.0 },
  '18_crown_6:lithium_cation': { logKa: 2.05, deltaH: -14.0, ionDipole: -15.0, hBond: 0.0, piPi: 0.0, desolv: 8.0 },
  '18_crown_6:cesium_cation': { logKa: 4.62, deltaH: -40.0, ionDipole: -34.0, hBond: 0.0, piPi: 0.0, desolv: 10.0 },
  '15_crown_5:sodium_cation': { logKa: 3.75, deltaH: -29.0, ionDipole: -30.0, hBond: 0.0, piPi: 0.0, desolv: 10.0 },
  '15_crown_5:potassium_cation': { logKa: 3.2, deltaH: -22.0, ionDipole: -24.0, hBond: 0.0, piPi: 0.0, desolv: 8.0 },
  '12_crown_4:lithium_cation': { logKa: 3.1, deltaH: -24.0, ionDipole: -26.0, hBond: 0.0, piPi: 0.0, desolv: 9.0 },
  'cryptand_222:potassium_cation': { logKa: 9.75, deltaH: -84.0, ionDipole: -78.0, hBond: 0.0, piPi: 0.0, desolv: 22.0 },
  'beta_cyclodextrin:adamantanecarboxylate': { logKa: 4.9, deltaH: -22.5, ionDipole: 0.0, hBond: -8.0, piPi: 0.0, desolv: -20.0 },
  'beta_cyclodextrin:4_nitrophenol': { logKa: 2.92, deltaH: -15.0, ionDipole: 0.0, hBond: -10.5, piPi: -4.0, desolv: -7.5 },
  'alpha_cyclodextrin:4_nitrophenol': { logKa: 3.4, deltaH: -18.2, ionDipole: 0.0, hBond: -12.0, piPi: -3.5, desolv: -9.0 },
};

export class SupramolecularService {
  private baseUrl = '/api/v1/chemistry/supramolecular';

  public getCuratedHosts(): HostMolecule[] {
    return CURATED_HOSTS;
  }

  public getCuratedGuests(): GuestMolecule[] {
    return CURATED_GUESTS;
  }

  public solveQuadraticEquilibrium(h0M: number, g0M: number, kaMInv: number): number {
    if (kaMInv <= 0.0) return 0.0;
    const kd = 1.0 / kaMInv;
    const b = h0M + g0M + kd;
    const discriminant = Math.max(0.0, b * b - 4.0 * h0M * g0M);
    const hg = 0.5 * (b - Math.sqrt(discriminant));
    return Math.max(0.0, Math.min(Math.min(h0M, g0M), hg));
  }

  public evaluateHostGuestSystem(
    hostId: string,
    guestId: string,
    tempK: number = 298.15
  ): { ka: number; deltaH: number; decomp: NonCovalentDecomposition } {
    const host = CURATED_HOSTS.find((h) => h.id === hostId) || CURATED_HOSTS[0];
    const guest = CURATED_GUESTS.find((g) => g.id === guestId) || CURATED_GUESTS[0];

    const guestDiam = 2.0 * guest.effectiveRadiusAngstrom;
    const cavityDiam = host.cavityDiameterAngstrom;
    const sizeRatio = guestDiam / cavityDiam;

    const pairKey = `${hostId}:${guestId}`;
    let logKa: number;
    let deltaH: number;
    let ionDipole: number;
    let hBond: number;
    let piPi: number;
    let hydrophobic: number;
    let stericPenalty = 0.0;

    if (pairKey in EMPIRICAL_DATABASE) {
      const bm = EMPIRICAL_DATABASE[pairKey];
      logKa = bm.logKa;
      deltaH = bm.deltaH;
      ionDipole = bm.ionDipole;
      hBond = bm.hBond;
      piPi = bm.piPi;
      hydrophobic = bm.desolv;
    } else {
      const sizeMismatch = Math.abs(1.0 - sizeRatio);
      stericPenalty = Math.max(0.0, (sizeMismatch - 0.05) * 45.0);

      if (host.category === 'crown_ether' || host.category === 'cryptand') {
        const baseLogKa = host.category === 'crown_ether' ? 5.0 : 8.5;
        logKa = Math.max(1.2, baseLogKa - sizeMismatch * 8.0);
        ionDipole = -40.0 * (1.0 / Math.max(0.5, sizeRatio));
        hBond = 0.0;
        piPi = 0.0;
        hydrophobic = 8.0;
        deltaH = ionDipole + stericPenalty;
      } else {
        logKa = Math.max(1.0, 4.0 - sizeMismatch * 6.0);
        ionDipole = 0.0;
        hBond = -8.0;
        piPi = guest.category.includes('aromatic') ? -4.0 : 0.0;
        hydrophobic = -18.0 * (1.0 - Math.min(0.6, sizeMismatch));
        deltaH = hBond + piPi + hydrophobic * 0.4 + stericPenalty;
      }
    }

    const ka = Math.pow(10.0, logKa);
    const totalEnergy = ionDipole + hBond + piPi + hydrophobic + stericPenalty;

    const decomp: NonCovalentDecomposition = {
      ionDipoleElectrostaticKjMol: Number(ionDipole.toFixed(2)),
      hydrogenBondingKjMol: Number(hBond.toFixed(2)),
      piPiStackingKjMol: Number(piPi.toFixed(2)),
      hydrophobicDesolvationKjMol: Number(hydrophobic.toFixed(2)),
      stericCavityFitPenaltyKjMol: Number(stericPenalty.toFixed(2)),
      totalInteractionEnergyKjMol: Number(totalEnergy.toFixed(2)),
      cavitySizeMatchRatio: Number(sizeRatio.toFixed(3)),
    };

    return { ka, deltaH, decomp };
  }

  public generateJobPlotLocally(request: JobPlotRequest): JobPlotResponse {
    if (request.totalConcentrationMM <= 0) {
      throw new Error('Total concentration must be positive.');
    }
    if (request.pointsCount < 9) {
      throw new Error('Minimum 9 points required for continuous variation analysis.');
    }

    const host = CURATED_HOSTS.find((h) => h.id === request.hostId) || CURATED_HOSTS[0];
    const guest = CURATED_GUESTS.find((g) => g.id === request.guestId) || CURATED_GUESTS[0];

    const { ka } = this.evaluateHostGuestSystem(request.hostId, request.guestId, request.temperatureK);

    const cTotM = request.totalConcentrationMM * 1e-3;
    const points: JobPlotPoint[] = [];
    let maxSignal = -1.0;
    let peakR = 0.5;

    const steps = request.pointsCount;
    for (let i = 0; i < steps; i++) {
      const r = i / (steps - 1);
      const g0M = cTotM * r;
      const h0M = cTotM * (1.0 - r);

      const hgM = this.solveQuadraticEquilibrium(h0M, g0M, ka);
      const hgMM = hgM * 1e3;
      const signal = hgMM * 1.5;

      if (signal > maxSignal) {
        maxSignal = signal;
        peakR = r;
      }

      points.push({
        moleFractionGuest: Number(r.toFixed(4)),
        hostConcMM: Number((h0M * 1e3).toFixed(4)),
        guestConcMM: Number((g0M * 1e3).toFixed(4)),
        complexConcMM: Number(hgMM.toFixed(5)),
        signalIntensity: Number(signal.toFixed(5)),
      });
    }

    const stoichiometry = Math.abs(peakR - 0.5) <= 0.08 ? '1:1' : peakR > 0.58 ? '1:2' : '2:1';

    const expl = `Job's continuous variation plot for ${host.name} and ${guest.name}. Total concentration [H] + [G] = ${request.totalConcentrationMM} mM. Signal apex observed at guest mole fraction r = ${peakR.toFixed(2)}, strictly confirming ${stoichiometry} host-guest binding stoichiometry (theoretical 1:1 apex = 0.50).`;

    const result: JobPlotResult = {
      hostName: host.name,
      guestName: guest.name,
      totalConcentrationMM: request.totalConcentrationMM,
      peakMoleFraction: Number(peakR.toFixed(3)),
      determinedStoichiometry: stoichiometry,
      points,
      theoretical1To1Peak: 0.5,
      explanation: expl,
    };

    return { result };
  }

  public simulateBindingLocally(request: BindingSimulationRequest): BindingSimulationResponse {
    if (request.hostInitialConcMM <= 0 || request.guestMaxConcMM <= 0) {
      throw new Error('Concentrations must be positive.');
    }

    const host = CURATED_HOSTS.find((h) => h.id === request.hostId) || CURATED_HOSTS[0];
    const guest = CURATED_GUESTS.find((g) => g.id === request.guestId) || CURATED_GUESTS[0];

    const { ka, deltaH, decomp } = this.evaluateHostGuestSystem(
      request.hostId,
      request.guestId,
      request.temperatureK
    );

    const tempK = request.temperatureK;
    const deltaG = -(R_GAS * tempK * Math.log(ka)) / 1000.0;
    const minusTDeltaS = deltaG - deltaH;
    const kdUM = (1.0 / ka) * 1e6;

    const h0M = request.hostInitialConcMM * 1e-3;
    const gMaxM = request.guestMaxConcMM * 1e-3;

    const points: BindingIsothermPoint[] = [];
    for (let i = 0; i < request.titrationSteps; i++) {
      const g0M = (i / (request.titrationSteps - 1)) * gMaxM;
      const hgM = this.solveQuadraticEquilibrium(h0M, g0M, ka);
      const freeHM = Math.max(0.0, h0M - hgM);
      const freeGM = Math.max(0.0, g0M - hgM);
      const theta = h0M > 0 ? hgM / h0M : 0.0;

      points.push({
        guestTotalMM: Number((g0M * 1e3).toFixed(4)),
        freeHostMM: Number((freeHM * 1e3).toFixed(4)),
        freeGuestMM: Number((freeGM * 1e3).toFixed(4)),
        boundComplexMM: Number((hgM * 1e3).toFixed(4)),
        fractionBound: Number(theta.toFixed(4)),
        relativeSpectroscopicSignal: Number((theta * 100.0).toFixed(2)),
      });
    }

    const isH过 = deltaH < 0.0 && Math.abs(deltaH) > Math.abs(minusTDeltaS);
    const isS过 = minusTDeltaS < 0.0 && Math.abs(minusTDeltaS) > Math.abs(deltaH);

    const pedagogy = `Complexation of ${host.name} with ${guest.name} at T = ${tempK} K. Association constant Ka = ${ka.toExponential(2)} M⁻¹ (log Ka = ${Math.log10(ka).toFixed(2)}, Kd = ${kdUM.toFixed(2)} μM). Thermodynamics: ΔG° = ${deltaG.toFixed(2)} kJ/mol, ΔH° = ${deltaH.toFixed(2)} kJ/mol, -TΔS° = ${minusTDeltaS.toFixed(2)} kJ/mol. The inclusion is primarily ${
      isH过 ? 'enthalpy-driven (-ΔH° > 0)' : 'entropy-driven (hydrophobic desolvation)'
    }.`;

    const system: HostGuestComplexSystem = {
      host,
      guest,
      associationConstantKaMInv: Number(ka.toFixed(2)),
      logKa: Number(Math.log10(ka).toFixed(2)),
      dissociationConstantKdUM: Number(kdUM.toFixed(3)),
      gibbsFreeEnergyDeltaGKjMol: Number(deltaG.toFixed(2)),
      enthalpyDeltaHKjMol: Number(deltaH.toFixed(2)),
      entropyTermMinusTDeltaSKjMol: Number(minusTDeltaS.toFixed(2)),
      isEnthalpyDriven: isH过,
      isEntropyDriven: isS过,
      decomposition: decomp,
      stoichiometry: '1:1',
      isothermPoints: points,
      pedagogicalSummary: pedagogy,
    };

    return { system };
  }

  public async getCatalog(): Promise<{ hosts: HostMolecule[]; guests: GuestMolecule[] }> {
    try {
      const res = await fetch(`${this.baseUrl}/catalog`);
      if (res.ok) return await res.json();
    } catch {
      // Backend offline
    }
    return { hosts: this.getCuratedHosts(), guests: this.getCuratedGuests() };
  }

  public async generateJobPlot(request: JobPlotRequest): Promise<JobPlotResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/job-plot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) return await res.json();
    } catch {
      // Backend offline
    }
    return this.generateJobPlotLocally(request);
  }

  public async simulateBinding(request: BindingSimulationRequest): Promise<BindingSimulationResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/simulate-binding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) return await res.json();
    } catch {
      // Backend offline
    }
    return this.simulateBindingLocally(request);
  }
}

export const supramolecularService = new SupramolecularService();
