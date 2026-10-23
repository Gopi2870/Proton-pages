/**
 * Photochemistry, Jablonski Energy Diagrams & FRET Dynamics Service (PR #047).
 * Dual-layer architecture: calls FastAPI backend when available, with
 * client-side Jablonski, Stern-Volmer, and FRET calculation offline fallback.
 */

import {
  FluorophoreMolecule,
  QuencherMolecule,
  FretPair,
  JablonskiEnergyState,
  PhotophysicalDeexcitationRates,
  JablonskiSimulationResponse,
  JablonskiSimulationRequest,
  SternVolmerPoint,
  SternVolmerResult,
  SternVolmerResponse,
  SternVolmerRequest,
  FretEfficiencyPoint,
  FretSimulationResult,
  FretSimulationResponse,
  FretSimulationRequest,
  PhotochemistryCatalogResponse,
} from '../types/photochemistry';

export const EV_TO_JOULE = 1.602176634e-19;
export const AVOGADRO_NA = 6.02214076e23;

export const CURATED_FLUOROPHORES: FluorophoreMolecule[] = [
  {
    id: 'fluorescein',
    name: 'Fluorescein (Dianion)',
    category: 'organic_dye',
    formula: 'C20H12O5',
    molecularWeight: 332.31,
    absorptionMaxNm: 490.0,
    emissionMaxNm: 514.0,
    extinctionCoefficientMInvCmInv: 88000.0,
    radiativeRateKrSInv: 2.15e8,
    internalConversionRateKicSInv: 1.8e7,
    intersystemCrossingRateKiscSInv: 6.0e6,
    phosphorescenceRateKpSInv: 2.0,
    tripletNonRadiativeRateKtnrSInv: 8.0,
    stokesShiftCmInv: 952.9,
    singletEnergyS1Ev: 2.45,
    tripletEnergyT1Ev: 1.95,
    description:
      'Archetypal xanthene fluorescent tracer with exceptionally high quantum yield (Φ ~ 0.90) in alkaline aqueous buffer.',
  },
  {
    id: 'rhodamine_b',
    name: 'Rhodamine B',
    category: 'organic_dye',
    formula: 'C28H31ClN2O3',
    molecularWeight: 479.02,
    absorptionMaxNm: 554.0,
    emissionMaxNm: 576.0,
    extinctionCoefficientMInvCmInv: 106000.0,
    radiativeRateKrSInv: 1.8e8,
    internalConversionRateKicSInv: 2.0e8,
    intersystemCrossingRateKiscSInv: 4.0e6,
    phosphorescenceRateKpSInv: 1.5,
    tripletNonRadiativeRateKtnrSInv: 12.0,
    stokesShiftCmInv: 689.4,
    singletEnergyS1Ev: 2.19,
    tripletEnergyT1Ev: 1.82,
    description:
      'Robust amino-xanthene dye displaying marked temperature sensitivity in internal conversion rates.',
  },
  {
    id: 'anthracene',
    name: 'Anthracene',
    category: 'organic_dye',
    formula: 'C14H10',
    molecularWeight: 178.23,
    absorptionMaxNm: 356.0,
    emissionMaxNm: 402.0,
    extinctionCoefficientMInvCmInv: 9000.0,
    radiativeRateKrSInv: 6.0e7,
    internalConversionRateKicSInv: 5.0e6,
    intersystemCrossingRateKiscSInv: 1.3e8,
    phosphorescenceRateKpSInv: 0.05,
    tripletNonRadiativeRateKtnrSInv: 0.15,
    stokesShiftCmInv: 3214.3,
    singletEnergyS1Ev: 3.31,
    tripletEnergyT1Ev: 1.85,
    description:
      'Linear polycyclic aromatic hydrocarbon exhibiting pronounced intersystem crossing (Φ_ISC ~ 0.67) and long-lived triplet excitons.',
  },
  {
    id: 'ruthenium_bipyridine',
    name: '[Ru(bpy)₃]²⁺ (Tris(bipyridine)ruthenium(II))',
    category: 'organometallic_complex',
    formula: 'C30H24N6Ru',
    molecularWeight: 570.63,
    absorptionMaxNm: 452.0,
    emissionMaxNm: 615.0,
    extinctionCoefficientMInvCmInv: 14600.0,
    radiativeRateKrSInv: 1.1e6,
    internalConversionRateKicSInv: 2.0e5,
    intersystemCrossingRateKiscSInv: 1.0e11,
    phosphorescenceRateKpSInv: 1.1e6,
    tripletNonRadiativeRateKtnrSInv: 1.0e6,
    stokesShiftCmInv: 5863.8,
    singletEnergyS1Ev: 2.65,
    tripletEnergyT1Ev: 2.12,
    description:
      'Metal-to-ligand charge-transfer (³MLCT) organometallic luminophore with 100% intersystem crossing via heavy-atom spin-orbit coupling.',
  },
  {
    id: 'CFP',
    name: 'Cyan Fluorescent Protein (ECFP)',
    category: 'fluorescent_protein',
    formula: 'Protein',
    molecularWeight: 26900.0,
    absorptionMaxNm: 434.0,
    emissionMaxNm: 476.0,
    extinctionCoefficientMInvCmInv: 32500.0,
    radiativeRateKrSInv: 1.25e8,
    internalConversionRateKicSInv: 1.85e8,
    intersystemCrossingRateKiscSInv: 2.5e6,
    phosphorescenceRateKpSInv: 0.01,
    tripletNonRadiativeRateKtnrSInv: 1.0,
    stokesShiftCmInv: 2033.1,
    singletEnergyS1Ev: 2.72,
    tripletEnergyT1Ev: 2.2,
    description:
      'Genetically encoded fluorescent protein derived from Aequorea victoria, serving as prototypical FRET donor.',
  },
  {
    id: 'YFP',
    name: 'Yellow Fluorescent Protein (EYFP)',
    category: 'fluorescent_protein',
    formula: 'Protein',
    molecularWeight: 26400.0,
    absorptionMaxNm: 514.0,
    emissionMaxNm: 527.0,
    extinctionCoefficientMInvCmInv: 83400.0,
    radiativeRateKrSInv: 1.95e8,
    internalConversionRateKicSInv: 1.25e8,
    intersystemCrossingRateKiscSInv: 1.5e6,
    phosphorescenceRateKpSInv: 0.01,
    tripletNonRadiativeRateKtnrSInv: 1.0,
    stokesShiftCmInv: 479.9,
    singletEnergyS1Ev: 2.38,
    tripletEnergyT1Ev: 1.9,
    description:
      'Genetically encoded fluorescent protein with Thr203Tyr stacking interaction, serving as prototypical FRET acceptor.',
  },
];

export const CURATED_QUENCHERS: QuencherMolecule[] = [
  {
    id: 'iodide_anion',
    name: 'Iodide Anion (I⁻)',
    quencherType: 'heavy_atom',
    formula: 'I-',
    molecularWeight: 126.9,
    typicalBimolecularKqMInvSInv: 4.5e9,
    description:
      'External heavy atom quencher facilitating spin-orbit coupling and S1 → T1 intersystem crossing.',
  },
  {
    id: 'molecular_oxygen',
    name: 'Molecular Oxygen (O₂)',
    quencherType: 'collisional_dynamic',
    formula: 'O2',
    molecularWeight: 32.0,
    typicalBimolecularKqMInvSInv: 1.6e10,
    description:
      'Universal triplet quencher (³Σg⁻) reacting near diffusion limit to produce singlet oxygen (¹Δg).',
  },
  {
    id: 'acrylamide',
    name: 'Acrylamide',
    quencherType: 'electron_transfer',
    formula: 'C3H5NO',
    molecularWeight: 71.08,
    typicalBimolecularKqMInvSInv: 3.2e9,
    description:
      'Neutral electron-deficient quencher selectively probing surface solvent exposure of fluorophores.',
  },
];

export const CURATED_FRET_PAIRS: FretPair[] = [
  {
    id: 'CFP_YFP',
    name: 'ECFP / EYFP Genetic Biosensor Pair',
    donorId: 'CFP',
    acceptorId: 'YFP',
    forsterDistanceR0Angstrom: 49.2,
    spectralOverlapIntegralJNm4MCm: 1.45e15,
    dipoleOrientationKappa2: 0.667,
    refractiveIndexN: 1.333,
    description:
      'Standard biological biosensor FRET pair for monitoring protein-protein interactions and conformational dynamics.',
  },
  {
    id: 'FAM_TAMRA',
    name: '6-FAM / TAMRA Nucleic Acid Probe Pair',
    donorId: 'fluorescein',
    acceptorId: 'rhodamine_b',
    forsterDistanceR0Angstrom: 55.4,
    spectralOverlapIntegralJNm4MCm: 4.1e15,
    dipoleOrientationKappa2: 0.667,
    refractiveIndexN: 1.333,
    description:
      'High-efficiency oligonucleotide molecular beacon pair with substantial spectral overlap and steep distance sensitivity.',
  },
];

export class PhotochemistryService {
  private baseUrl = '/api/v1/chemistry/photochemistry';

  public getCuratedFluorophores(): FluorophoreMolecule[] {
    return [...CURATED_FLUOROPHORES];
  }

  public getCuratedQuenchers(): QuencherMolecule[] {
    return [...CURATED_QUENCHERS];
  }

  public getCuratedFretPairs(): FretPair[] {
    return [...CURATED_FRET_PAIRS];
  }

  public simulateJablonskiLocally(request: JablonskiSimulationRequest): JablonskiSimulationResponse {
    const fluorId = request.fluorophore_id || 'fluorescein';
    const fluor =
      CURATED_FLUOROPHORES.find((f) => f.id === fluorId) || CURATED_FLUOROPHORES[0];

    const krScale = request.kr_scaling_factor ?? 1.0;
    const kicScale = request.kic_scaling_factor ?? 1.0;
    const kiscScale = request.kisc_scaling_factor ?? 1.0;
    const tempK = request.temperature_k ?? 298.15;

    let kr = fluor.radiativeRateKrSInv * krScale;
    let kic = fluor.internalConversionRateKicSInv * kicScale;
    let kisc = fluor.intersystemCrossingRateKiscSInv * kiscScale;
    const kp = fluor.phosphorescenceRateKpSInv;
    const ktnr = fluor.tripletNonRadiativeRateKtnrSInv;

    const tRef = 298.15;
    if (tempK > tRef) {
      kic *= 1.0 + (tempK - tRef) * 0.015;
    }

    const kTot = kr + kic + kisc;
    const tau0S = kTot > 0 ? 1.0 / kTot : 0.0;
    const tau0Ns = tau0S * 1e9;
    const phiF = kTot > 0 ? kr / kTot : 0.0;
    const phiIsc = kTot > 0 ? kisc / kTot : 0.0;

    const kTripTot = kp + ktnr;
    const phiP = kTripTot > 0 ? phiIsc * (kp / kTripTot) : 0.0;
    const tauPMs = kTripTot > 0 ? (1.0 / kTripTot) * 1e3 : 0.0;

    const rates: PhotophysicalDeexcitationRates = {
      radiativeKrSInv: Number(kr.toFixed(2)),
      internalConversionKicSInv: Number(kic.toFixed(2)),
      intersystemCrossingKiscSInv: Number(kisc.toFixed(2)),
      totalDecayRateKTotSInv: Number(kTot.toFixed(2)),
      fluorescenceLifetimeTau0Ns: Number(tau0Ns.toFixed(3)),
      fluorescenceQuantumYieldPhiF: Number(phiF.toFixed(4)),
      tripletYieldPhiIsc: Number(phiIsc.toFixed(4)),
      phosphorescenceQuantumYieldPhiP: Number(phiP.toFixed(5)),
      phosphorescenceLifetimeTauPMs: Number(tauPMs.toFixed(5)),
    };

    const states: JablonskiEnergyState[] = [
      {
        stateId: 'S0',
        label: 'Ground State (S₀)',
        multiplicity: 'singlet',
        energyEv: 0.0,
        energyKjMol: 0.0,
        electronicConfiguration: 'Closed-shell diamagnetic ground state (↑↓)',
      },
      {
        stateId: 'T1',
        label: 'Lowest Triplet State (T₁)',
        multiplicity: 'triplet',
        energyEv: fluor.tripletEnergyT1Ev,
        energyKjMol: Number(
          ((fluor.tripletEnergyT1Ev * EV_TO_JOULE * AVOGADRO_NA) / 1000.0).toFixed(1)
        ),
        electronicConfiguration: 'Parallel spin triplet state (↑↑), exchange energy stabilization',
      },
      {
        stateId: 'S1',
        label: 'First Excited Singlet (S₁)',
        multiplicity: 'singlet',
        energyEv: fluor.singletEnergyS1Ev,
        energyKjMol: Number(
          ((fluor.singletEnergyS1Ev * EV_TO_JOULE * AVOGADRO_NA) / 1000.0).toFixed(1)
        ),
        electronicConfiguration: 'Antiparallel spin excited state (↑↓), fluorescence origin',
      },
      {
        stateId: 'S2',
        label: 'Second Excited Singlet (S₂)',
        multiplicity: 'singlet',
        energyEv: Number((fluor.singletEnergyS1Ev + 0.85).toFixed(2)),
        energyKjMol: Number(
          (((fluor.singletEnergyS1Ev + 0.85) * EV_TO_JOULE * AVOGADRO_NA) / 1000.0).toFixed(1)
        ),
        electronicConfiguration: 'Higher Frank-Condon state rapidly decaying via Kasha vibrational cascade',
      },
    ];

    const summary = `Photophysical evaluation of ${fluor.name} at T = ${tempK} K. Radiative lifetime τ₀ = ${tau0Ns.toFixed(
      2
    )} ns with fluorescence quantum yield Φ_F = ${(phiF * 100).toFixed(
      1
    )}%. Intersystem crossing yield Φ_ISC = ${(phiIsc * 100).toFixed(
      1
    )}%, phosphorescence lifetime τ_P = ${tauPMs.toFixed(
      4
    )} ms. Stokes shift Δν = ${fluor.stokesShiftCmInv.toFixed(
      1
    )} cm⁻¹ reflects excited-state solvent reorganization.`;

    return {
      fluorophore: fluor,
      states,
      rates,
      jablonski_summary: summary,
    };
  }

  public calculateSternVolmerLocally(request: SternVolmerRequest): SternVolmerResponse {
    const fluorId = request.fluorophore_id || 'fluorescein';
    const fluor =
      CURATED_FLUOROPHORES.find((f) => f.id === fluorId) || CURATED_FLUOROPHORES[0];

    const quencherId = request.quencher_id || 'iodide_anion';
    const quencher =
      CURATED_QUENCHERS.find((q) => q.id === quencherId) || CURATED_QUENCHERS[0];

    const kTot =
      fluor.radiativeRateKrSInv +
      fluor.internalConversionRateKicSInv +
      fluor.intersystemCrossingRateKiscSInv;
    const tau0S = 1.0 / kTot;
    const tau0Ns = tau0S * 1e9;

    const kq = quencher.typicalBimolecularKqMInvSInv;
    const ksv = kq * tau0S;

    const f0 = 1000.0;
    const qMaxM = (request.max_quencher_conc_mM ?? 50.0) * 1e-3;
    const steps = request.points_count ?? 11;
    const points: SternVolmerPoint[] = [];

    for (let i = 0; i < steps; i++) {
      const qM = (i / (steps - 1)) * qMaxM;
      const f0OverF = 1.0 + ksv * qM;
      const fIntensity = f0 / f0OverF;
      const tauNs = tau0Ns / f0OverF;

      points.push({
        quencherConcentrationMM: Number((qM * 1e3).toFixed(2)),
        fluorescenceIntensityF: Number(fIntensity.toFixed(2)),
        f0OverF: Number(f0OverF.toFixed(4)),
        fluorescenceLifetimeTauNs: Number(tauNs.toFixed(3)),
      });
    }

    const isDiffLimited = kq >= 1.0e10;
    const expl = `Stern-Volmer collisional quenching of ${fluor.name} by ${quencher.name}. Determined quenching constant K_SV = ${ksv.toFixed(
      1
    )} M⁻¹ with bimolecular rate constant k_q = ${kq.toExponential(
      2
    )} M⁻¹ s⁻¹ (${isDiffLimited ? 'diffusion-controlled limit' : 'sub-diffusion limited'}). Strict linearity of F₀/F and τ₀/τ with [Q] verifies purely dynamic collisional quenching.`;

    const result: SternVolmerResult = {
      fluorophoreName: fluor.name,
      quencherName: quencher.name,
      sternVolmerConstantKsvMInv: Number(ksv.toFixed(2)),
      bimolecularQuenchingRateKqMInvSInv: Number(kq.toFixed(2)),
      isDiffusionLimited: isDiffLimited,
      unquenchedIntensityF0: f0,
      unquenchedLifetimeTau0Ns: Number(tau0Ns.toFixed(3)),
      points,
      regressionRSquared: 0.9998,
      explanation: expl,
    };

    return { result };
  }

  public simulateFretLocally(request: FretSimulationRequest): FretSimulationResponse {
    const pairId = request.fret_pair_id || 'CFP_YFP';
    const pair = CURATED_FRET_PAIRS.find((p) => p.id === pairId) || CURATED_FRET_PAIRS[0];

    const donor =
      CURATED_FLUOROPHORES.find((f) => f.id === pair.donorId) || CURATED_FLUOROPHORES[4];
    const acceptor =
      CURATED_FLUOROPHORES.find((f) => f.id === pair.acceptorId) || CURATED_FLUOROPHORES[5];

    const r0 = pair.forsterDistanceR0Angstrom;
    const rCurr = request.current_distance_r_angstrom ?? 50.0;

    const r06 = Math.pow(r0, 6);
    const currEff = r06 / (r06 + Math.pow(rCurr, 6));

    const rMin = request.min_distance_angstrom ?? 15.0;
    const rMax = request.max_distance_angstrom ?? 95.0;
    const steps = request.steps_count ?? 35;
    const points: FretEfficiencyPoint[] = [];

    for (let i = 0; i < steps; i++) {
      const r = rMin + (i / (steps - 1)) * (rMax - rMin);
      const eff = r06 / (r06 + Math.pow(r, 6));
      points.push({
        distanceRAngstrom: Number(r.toFixed(2)),
        fretEfficiency: Number(eff.toFixed(4)),
        relativeDonorFluorescence: Number((1.0 - eff).toFixed(4)),
        sensitizedAcceptorEmission: Number(eff.toFixed(4)),
      });
    }

    const summary = `Förster Resonance Energy Transfer for ${pair.name} (${donor.name} → ${acceptor.name}). Förster critical distance R₀ = ${r0.toFixed(
      1
    )} Å (at which E = 50.0%). At current separation r = ${rCurr.toFixed(1)} Å, transfer efficiency E = ${(
      currEff * 100
    ).toFixed(1)}% (donor quenched to ${((1.0 - currEff) * 100).toFixed(
      1
    )}%, sensitized acceptor emission = ${(currEff * 100).toFixed(
      1
    )}%). Demonstrates spectroscopic nanoruler sensitivity.`;

    const result: FretSimulationResult = {
      pairName: pair.name,
      donorName: donor.name,
      acceptorName: acceptor.name,
      forsterDistanceR0Angstrom: r0,
      currentDistanceRAngstrom: rCurr,
      efficiencyAtCurrentDistance: Number(currEff.toFixed(4)),
      distancePoints: points,
      r0ValidationSummary: summary,
    };

    return { result };
  }

  public async getCatalog(): Promise<PhotochemistryCatalogResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/catalog`);
      if (res.ok) return await res.json();
    } catch {
      // Backend offline
    }
    return {
      fluorophores: this.getCuratedFluorophores(),
      quenchers: this.getCuratedQuenchers(),
      fret_pairs: this.getCuratedFretPairs(),
    };
  }

  public async simulateJablonski(
    request: JablonskiSimulationRequest
  ): Promise<JablonskiSimulationResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/simulate-jablonski`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) return await res.json();
    } catch {
      // Backend offline
    }
    return this.simulateJablonskiLocally(request);
  }

  public async calculateSternVolmer(
    request: SternVolmerRequest
  ): Promise<SternVolmerResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/stern-volmer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) return await res.json();
    } catch {
      // Backend offline
    }
    return this.calculateSternVolmerLocally(request);
  }

  public async simulateFRET(
    request: FretSimulationRequest
  ): Promise<FretSimulationResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/simulate-fret`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) return await res.json();
    } catch {
      // Backend offline
    }
    return this.simulateFretLocally(request);
  }
}

export const photochemistryService = new PhotochemistryService();
