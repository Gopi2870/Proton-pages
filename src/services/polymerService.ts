import {
  PolymerizationMechanism,
  RadicalTerminationMode,
  CarothersAnalysis,
  RadicalKineticsAnalysis,
  MolecularWeightPoint,
  FloryHugginsPoint,
  FloryHugginsAnalysis,
  PolymerSimulationResult,
  PolymerPresetSummary,
} from '../types/polymers';

const API_BASE = '/api/v1/chemistry/polymers';

export const FALLBACK_POLYMER_PRESETS: PolymerPresetSummary[] = [
  {
    id: 'nylon_6_6',
    name: 'Nylon 6,6 (Polyhexamethylene Adipamide)',
    classification: 'Polyamide (Engineering Thermoplastic)',
    mechanism: 'step_growth',
    repeat_unit_formula: '[C12H22N2O2]n',
    repeat_unit_mw: 226.32,
    typical_applications: ['Textile fibers', 'Automotive gears', 'High-strength engineering plastics'],
    description: 'Synthesized via condensation of adipic acid and hexamethylenediamine. Requires high conversion (p > 0.98) to achieve fiber-forming molecular weights.',
  },
  {
    id: 'pet',
    name: 'Poly(ethylene terephthalate) (PET)',
    classification: 'Polyester (Packaging & Fibers)',
    mechanism: 'step_growth',
    repeat_unit_formula: '[C10H8O4]n',
    repeat_unit_mw: 192.17,
    typical_applications: ['Beverage bottles', 'Dacron polyester fibers', 'Mylar films'],
    description: 'Condensation copolymerization of terephthalic acid and ethylene glycol with transesterification under vacuum.',
  },
  {
    id: 'pmma',
    name: 'Poly(methyl methacrylate) (PMMA / Plexiglas)',
    classification: 'Acrylic Thermoplastic',
    mechanism: 'chain_growth_radical',
    repeat_unit_formula: '[C5H8O2]n',
    repeat_unit_mw: 100.12,
    typical_applications: ['Optical lenses', 'Aircraft canopies', 'Shatterproof acrylic sheets'],
    description: 'Radical polymerization initiated by AIBN. Demonstrates pronounced Trommsdorff autoacceleration (gel effect) at conversions above 40%.',
  },
  {
    id: 'polystyrene',
    name: 'Polystyrene (PS)',
    classification: 'General Purpose Aromatic Thermoplastic',
    mechanism: 'chain_growth_radical',
    repeat_unit_formula: '[C8H8]n',
    repeat_unit_mw: 104.15,
    typical_applications: ['Disposable cutlery', 'Insulating foam (EPS)', 'Petri dishes'],
    description: 'Radical chain-growth polymerization of styrene initiated by benzoyl peroxide with combination termination.',
  },
  {
    id: 'pla',
    name: 'Poly(lactic acid) (PLA)',
    classification: 'Aliphatic Biodegradable Polyester',
    mechanism: 'step_growth',
    repeat_unit_formula: '[C3H4O2]n',
    repeat_unit_mw: 72.06,
    typical_applications: ['3D printing filament', 'Biodegradable packaging', 'Bioabsorbable sutures'],
    description: 'Produced from renewable agricultural feedstocks via ring-opening polymerization of lactide or direct polycondensation.',
  },
  {
    id: 'polyurethane_network',
    name: 'Crosslinked Polyurethane Elastomer Network',
    classification: 'Thermoset Crosslinked Network',
    mechanism: 'step_growth',
    repeat_unit_formula: '[C15H22N2O5]n',
    repeat_unit_mw: 310.35,
    typical_applications: ['Flexible foams', 'Elastomeric wheel treads', 'Structural adhesives'],
    description: 'Step-growth reaction between toluene diisocyanate (f=2) and a polyether triol (f=3). Demonstrates Flory-Stockmayer gelation.',
  },
];

interface PresetConfig {
  name: string;
  classification: string;
  mechanism: PolymerizationMechanism;
  repeat_unit_formula: string;
  repeat_unit_mw: number;
  default_conversion: number;
  stoichiometric_ratio_r: number;
  average_functionality: number;
  default_chi: number;
  kp?: number;
  kt?: number;
  kd?: number;
  f_eff?: number;
  c_monomer?: number;
  c_initiator?: number;
  temp_c?: number;
  term_mode?: RadicalTerminationMode;
  pedagogical_notes: string;
}

const PRESET_CONFIGS: Record<string, PresetConfig> = {
  nylon_6_6: {
    name: 'Nylon 6,6 (Polyhexamethylene Adipamide)',
    classification: 'Polyamide (Engineering Thermoplastic)',
    mechanism: 'step_growth',
    repeat_unit_formula: '[C12H22N2O2]n',
    repeat_unit_mw: 226.32,
    default_conversion: 0.985,
    stoichiometric_ratio_r: 1.0,
    average_functionality: 2.0,
    default_chi: 0.42,
    pedagogical_notes: 'Follows the Carothers equation Xn = 1/(1 - p). At p = 0.985, Xn = 66.7 and Mn ~ 15,100 g/mol with a theoretical Flory-Schulz PDI = 1 + p ~ 1.985.',
  },
  pet: {
    name: 'Poly(ethylene terephthalate) (PET)',
    classification: 'Polyester (Packaging & Fibers)',
    mechanism: 'step_growth',
    repeat_unit_formula: '[C10H8O4]n',
    repeat_unit_mw: 192.17,
    default_conversion: 0.982,
    stoichiometric_ratio_r: 1.0,
    average_functionality: 2.0,
    default_chi: 0.40,
    pedagogical_notes: 'Stoichiometric balance is essential: even a 1% imbalance (r = 0.99) caps the maximum degree of polymerization at Xn = (1 + r)/(1 - r) = 199.',
  },
  pmma: {
    name: 'Poly(methyl methacrylate) (PMMA / Plexiglas)',
    classification: 'Acrylic Thermoplastic',
    mechanism: 'chain_growth_radical',
    repeat_unit_formula: '[C5H8O2]n',
    repeat_unit_mw: 100.12,
    default_conversion: 0.80,
    stoichiometric_ratio_r: 1.0,
    average_functionality: 2.0,
    default_chi: 0.38,
    kp: 515.0,
    kt: 2.5e7,
    kd: 1.2e-5,
    f_eff: 0.60,
    c_monomer: 7.0,
    c_initiator: 0.008,
    temp_c: 60.0,
    term_mode: 'disproportionation',
    pedagogical_notes: 'Termination in PMMA occurs predominantly via radical disproportionation (producing one saturated and one unsaturated chain end), resulting in Xn = nu and PDI ~ 2.0.',
  },
  polystyrene: {
    name: 'Polystyrene (PS)',
    classification: 'General Purpose Aromatic Thermoplastic',
    mechanism: 'chain_growth_radical',
    repeat_unit_formula: '[C8H8]n',
    repeat_unit_mw: 104.15,
    default_conversion: 0.85,
    stoichiometric_ratio_r: 1.0,
    average_functionality: 2.0,
    default_chi: 0.35,
    kp: 165.0,
    kt: 4.0e7,
    kd: 1.5e-5,
    f_eff: 0.70,
    c_monomer: 8.0,
    c_initiator: 0.012,
    temp_c: 70.0,
    term_mode: 'combination',
    pedagogical_notes: 'Because radical coupling couples two active chains, Xn = 2 * nu and the theoretical polydispersity index is narrower (PDI ~ 1.5) than disproportionation.',
  },
  pla: {
    name: 'Poly(lactic acid) (PLA)',
    classification: 'Aliphatic Biodegradable Polyester',
    mechanism: 'step_growth',
    repeat_unit_formula: '[C3H4O2]n',
    repeat_unit_mw: 72.06,
    default_conversion: 0.990,
    stoichiometric_ratio_r: 1.0,
    average_functionality: 2.0,
    default_chi: 0.46,
    pedagogical_notes: 'Direct polycondensation requires high vacuum to shift esterification equilibrium by continuous water removal; Xn = 100 yields Mn ~ 7,200 g/mol.',
  },
  polyurethane_network: {
    name: 'Crosslinked Polyurethane Elastomer Network',
    classification: 'Thermoset Crosslinked Network',
    mechanism: 'step_growth',
    repeat_unit_formula: '[C15H22N2O5]n',
    repeat_unit_mw: 310.35,
    default_conversion: 0.88,
    stoichiometric_ratio_r: 1.0,
    average_functionality: 2.4,
    default_chi: 0.52,
    pedagogical_notes: 'With an average functionality fav = 2.4, the gel point conversion is pc = 2 / fav = 0.833 (83.3%). Beyond this critical conversion, an infinite macroscopic gel network is formed.',
  },
};

export class PolymerService {
  async getPresets(): Promise<PolymerPresetSummary[]> {
    try {
      const resp = await fetch(`${API_BASE}/presets`);
      if (resp.ok) {
        return await resp.json();
      }
    } catch {
      // Fallback
    }
    return FALLBACK_POLYMER_PRESETS;
  }

  async getPresetSimulation(
    presetId: string,
    conversion?: number,
    stoichiometryR?: number,
    chi?: number
  ): Promise<PolymerSimulationResult> {
    const params = new URLSearchParams();
    if (conversion !== undefined) params.append('conversion', conversion.toString());
    if (stoichiometryR !== undefined) params.append('stoichiometric_ratio', stoichiometryR.toString());
    if (chi !== undefined) params.append('chi', chi.toString());

    try {
      const url = `${API_BASE}/presets/${presetId}${params.toString() ? '?' + params.toString() : ''}`;
      const resp = await fetch(url);
      if (resp.ok) {
        return await resp.json();
      }
    } catch {
      // Fallback
    }

    return this.simulateFallbackPreset(presetId, conversion, stoichiometryR, chi);
  }

  evaluateCarothers(p: number, r: number, fav: number, monomerMw: number): CarothersAnalysis {
    const rClamped = Math.max(0.1, Math.min(1.0, r));
    const pClamped = Math.max(0.0, Math.min(0.9999, p));
    const favClamped = Math.max(1.5, fav);

    const gelPointPc = favClamped > 2.0 ? 2.0 / favClamped : null;
    const isGelled = gelPointPc !== null && pClamped >= gelPointPc;

    const denom = 1.0 + rClamped - 2.0 * rClamped * pClamped;
    const xn = denom <= 0.0001 ? 10000.0 : (1.0 + rClamped) / denom;
    const xw = rClamped === 1.0 ? (1.0 + pClamped) / Math.max(1.0 - pClamped, 0.0001) : (1.0 + rClamped * pClamped) / Math.max(denom, 0.0001);
    const pdi = xw / Math.max(xn, 1.0);

    return {
      stoichiometric_ratio_r: Number(rClamped.toFixed(4)),
      average_functionality_fav: Number(favClamped.toFixed(2)),
      conversion_p: Number(pClamped.toFixed(4)),
      gel_point_pc: gelPointPc !== null ? Number(gelPointPc.toFixed(4)) : null,
      is_gel_formed: isGelled,
      degree_of_polymerization_xn: Number(xn.toFixed(2)),
      weight_degree_of_polymerization_xw: Number(xw.toFixed(2)),
      polydispersity_index: Number(pdi.toFixed(3)),
    };
  }

  evaluateFloryHuggins(n: number, chi: number, pointsCount = 60): FloryHugginsAnalysis {
    const nClamped = Math.max(10, n);
    const sqrtN = Math.sqrt(nClamped);
    const chiC = 0.5 * Math.pow(1.0 + 1.0 / sqrtN, 2);
    const phi2c = 1.0 / (1.0 + sqrtN);
    const isPhaseSep = chi > chiC;

    const curve: FloryHugginsPoint[] = [];
    const dPhi = 0.98 / (pointsCount - 1);

    for (let i = 0; i < pointsCount; i++) {
      const phi2 = 0.01 + i * dPhi;
      const phi1 = 1.0 - phi2;
      const dgRt = phi1 * Math.log(Math.max(phi1, 1e-6)) + (phi2 / nClamped) * Math.log(Math.max(phi2, 1e-6)) + chi * phi1 * phi2;
      const chiSpinodal = 0.5 * (1.0 / Math.max(phi1, 1e-6) + 1.0 / (nClamped * Math.max(phi2, 1e-6)));

      curve.push({
        phi_polymer: Number(phi2.toFixed(3)),
        delta_g_mix_rt: Number(dgRt.toFixed(5)),
        spinodal_chi: Number(chiSpinodal.toFixed(4)),
      });
    }

    return {
      chi_parameter: Number(chi.toFixed(4)),
      critical_chi: Number(chiC.toFixed(4)),
      critical_phi_polymer: Number(phi2c.toFixed(4)),
      is_phase_separated: isPhaseSep,
      curve_points: curve,
    };
  }

  simulateFallbackPreset(
    presetId: string,
    conversion?: number,
    stoichiometryR?: number,
    chi?: number
  ): PolymerSimulationResult {
    const config = PRESET_CONFIGS[presetId] || PRESET_CONFIGS.nylon_6_6;
    const p = Math.max(0.01, Math.min(0.999, conversion ?? config.default_conversion));
    const r = stoichiometryR ?? config.stoichiometric_ratio_r;
    const chiVal = chi ?? config.default_chi;

    let carothers: CarothersAnalysis | null = null;
    let radicalKinetics: RadicalKineticsAnalysis | null = null;
    let xn = 50.0;
    let xw = 99.0;
    let pdi = 1.98;

    if (config.mechanism === 'step_growth') {
      carothers = this.evaluateCarothers(p, r, config.average_functionality, config.repeat_unit_mw);
      xn = carothers.degree_of_polymerization_xn;
      xw = carothers.weight_degree_of_polymerization_xw;
      pdi = carothers.polydispersity_index;
    } else {
      const kp = config.kp ?? 500.0;
      const kt = config.kt ?? 2.5e7;
      const kd = config.kd ?? 1.2e-5;
      const fEff = config.f_eff ?? 0.65;
      const autoaccel = p >= 0.40;
      const ktEff = kt * (autoaccel ? 0.1 : 1.0);
      const cMonomer = (config.c_monomer ?? 6.0) * (1.0 - p * 0.8);
      const cInit = config.c_initiator ?? 0.01;

      const rConc = Math.sqrt((fEff * kd * cInit) / Math.max(ktEff, 1.0));
      const rp = kp * cMonomer * rConc;
      const ri = 2.0 * fEff * kd * cInit;
      const nu = rp / Math.max(ri, 1e-12);
      xn = config.term_mode === 'combination' ? 2.0 * nu : nu;
      pdi = config.term_mode === 'combination' ? 1.5 : 2.0;
      xw = xn * pdi;

      radicalKinetics = {
        temperature_c: config.temp_c ?? 60.0,
        monomer_concentration_m: Number(cMonomer.toFixed(3)),
        initiator_concentration_m: Number(cInit.toFixed(5)),
        propagation_kp_l_mol_s: kp,
        termination_kt_l_mol_s: ktEff,
        radical_concentration_m: Number(rConc.toFixed(10)),
        polymerization_rate_rp_mol_l_s: Number(rp.toFixed(6)),
        kinetic_chain_length_nu: Number(nu.toFixed(2)),
        predicted_xn: Number(xn.toFixed(1)),
        autoacceleration_trommsdorff: autoaccel,
      };
    }

    const mn = xn * config.repeat_unit_mw;
    const mw = xw * config.repeat_unit_mw;
    const mz = mw * 1.5;

    // Molecular weight distribution
    const maxChain = Math.max(100, Math.round(xn * 3.5));
    const step = Math.max(1, Math.floor(maxChain / 120));
    const distribution: MolecularWeightPoint[] = [];
    let cumW = 0.0;

    for (let i = 1; i <= maxChain; i += step) {
      const power = Math.pow(p, Math.max(0, i - 1));
      const xi = (1.0 - p) * power;
      const wi = i * Math.pow(1.0 - p, 2) * power;
      cumW += wi * step;
      distribution.push({
        chain_length_i: i,
        molecular_weight: Number((i * config.repeat_unit_mw).toFixed(1)),
        mole_fraction: Number(xi.toFixed(6)),
        weight_fraction: Number(wi.toFixed(6)),
        cumulative_weight_fraction: Number(Math.min(1.0, cumW).toFixed(4)),
      });
    }

    const floryHuggins = this.evaluateFloryHuggins(Math.max(10, Math.round(xn)), chiVal);

    return {
      simulation_id: `poly-${presetId}-${Math.round(p * 1000)}`,
      polymer_name: config.name,
      repeat_unit_formula: config.repeat_unit_formula,
      repeat_unit_mw: config.repeat_unit_mw,
      mechanism: config.mechanism,
      conversion_p: Number(p.toFixed(4)),
      number_average_mn: Number(mn.toFixed(1)),
      weight_average_mw: Number(mw.toFixed(1)),
      z_average_mz: Number(mz.toFixed(1)),
      polydispersity_index: Number(pdi.toFixed(3)),
      carothers,
      radical_kinetics: radicalKinetics,
      flory_huggins: floryHuggins,
      distribution_curve: distribution,
      pedagogical_notes: config.pedagogical_notes,
    };
  }
}

export const polymerService = new PolymerService();
