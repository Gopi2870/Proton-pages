/**
 * Coordination Chemistry & Crystal Field Theory (CFT) Service.
 * Dual-layer architecture: FastAPI client with client-side fallback simulation.
 */

import {
  TransitionMetalSummary,
  LigandSummary,
  ComplexPresetSummary,
  CoordinationAnalysisRequest,
  CoordinationAnalysisResponse,
} from '../types/coordinationCft';

const API_BASE = '/api/v1/chemistry/coordination-cft';
const CM_INV_TO_KJ_MOL = 0.0119626;

export const FALLBACK_METALS: TransitionMetalSummary[] = [
  { symbol: 'Ti', name: 'Titanium(III)', atomic_number: 22, group: 4, period: 4, oxidation_state: 3, d_electron_count: 1 },
  { symbol: 'V', name: 'Vanadium(III)', atomic_number: 23, group: 5, period: 4, oxidation_state: 3, d_electron_count: 2 },
  { symbol: 'Cr', name: 'Chromium(II)', atomic_number: 24, group: 6, period: 4, oxidation_state: 2, d_electron_count: 4 },
  { symbol: 'Cr', name: 'Chromium(III)', atomic_number: 24, group: 6, period: 4, oxidation_state: 3, d_electron_count: 3 },
  { symbol: 'Mn', name: 'Manganese(II)', atomic_number: 25, group: 7, period: 4, oxidation_state: 2, d_electron_count: 5 },
  { symbol: 'Fe', name: 'Iron(II)', atomic_number: 26, group: 8, period: 4, oxidation_state: 2, d_electron_count: 6 },
  { symbol: 'Fe', name: 'Iron(III)', atomic_number: 26, group: 8, period: 4, oxidation_state: 3, d_electron_count: 5 },
  { symbol: 'Co', name: 'Cobalt(II)', atomic_number: 27, group: 9, period: 4, oxidation_state: 2, d_electron_count: 7 },
  { symbol: 'Co', name: 'Cobalt(III)', atomic_number: 27, group: 9, period: 4, oxidation_state: 3, d_electron_count: 6 },
  { symbol: 'Ni', name: 'Nickel(II)', atomic_number: 28, group: 10, period: 4, oxidation_state: 2, d_electron_count: 8 },
  { symbol: 'Cu', name: 'Copper(II)', atomic_number: 29, group: 11, period: 4, oxidation_state: 2, d_electron_count: 9 },
  { symbol: 'Zn', name: 'Zinc(II)', atomic_number: 30, group: 12, period: 4, oxidation_state: 2, d_electron_count: 10 },
  { symbol: 'Pt', name: 'Platinum(II)', atomic_number: 78, group: 10, period: 6, oxidation_state: 2, d_electron_count: 8 },
];

export const FALLBACK_LIGANDS: LigandSummary[] = [
  { id: 'i', formula: 'I-', name: 'Iodide', denticity: 1, donor_atom: 'I', spectrochemical_rank: 1, field_strength: 'weak_field' },
  { id: 'br', formula: 'Br-', name: 'Bromide', denticity: 1, donor_atom: 'Br', spectrochemical_rank: 2, field_strength: 'weak_field' },
  { id: 'cl', formula: 'Cl-', name: 'Chloride', denticity: 1, donor_atom: 'Cl', spectrochemical_rank: 3, field_strength: 'weak_field' },
  { id: 'f', formula: 'F-', name: 'Fluoride', denticity: 1, donor_atom: 'F', spectrochemical_rank: 4, field_strength: 'weak_field' },
  { id: 'oh', formula: 'OH-', name: 'Hydroxide', denticity: 1, donor_atom: 'O', spectrochemical_rank: 5, field_strength: 'weak_field' },
  { id: 'h2o', formula: 'H2O', name: 'Water (Aqua)', denticity: 1, donor_atom: 'O', spectrochemical_rank: 6, field_strength: 'intermediate' },
  { id: 'nh3', formula: 'NH3', name: 'Ammine', denticity: 1, donor_atom: 'N', spectrochemical_rank: 7, field_strength: 'intermediate' },
  { id: 'en', formula: 'en', name: 'Ethylenediamine', denticity: 2, donor_atom: 'N', spectrochemical_rank: 8, field_strength: 'strong_field' },
  { id: 'no2', formula: 'NO2-', name: 'Nitro', denticity: 1, donor_atom: 'N', spectrochemical_rank: 9, field_strength: 'strong_field' },
  { id: 'cn', formula: 'CN-', name: 'Cyanide', denticity: 1, donor_atom: 'C', spectrochemical_rank: 10, field_strength: 'strong_field' },
  { id: 'co', formula: 'CO', name: 'Carbon Monoxide', denticity: 1, donor_atom: 'C', spectrochemical_rank: 11, field_strength: 'strong_field' },
];

export const FALLBACK_PRESETS: ComplexPresetSummary[] = [
  {
    id: 'fe_cn6_4',
    formula: '[Fe(CN)6]4-',
    name: 'Hexacyanoferrate(II)',
    geometry: 'octahedral',
    spin_state: 'low_spin',
    d_electron_count: 6,
    unpaired_electrons: 0,
    perceived_color_hex: '#EAB308',
    description: 'Classic low-spin diamagnetic complex with high CFSE (-2.4 Δo). Pale yellow appearance.',
  },
  {
    id: 'fe_h2o6_2',
    formula: '[Fe(H2O)6]2+',
    name: 'Hexaaquairon(II)',
    geometry: 'octahedral',
    spin_state: 'high_spin',
    d_electron_count: 6,
    unpaired_electrons: 4,
    perceived_color_hex: '#86EFAC',
    description: 'High-spin paramagnetic complex with weak aqua ligand field. Pale green appearance.',
  },
  {
    id: 'co_nh36_3',
    formula: '[Co(NH3)6]3+',
    name: 'Hexaamminecobalt(III)',
    geometry: 'octahedral',
    spin_state: 'low_spin',
    d_electron_count: 6,
    unpaired_electrons: 0,
    perceived_color_hex: '#F97316',
    description: 'Diamagnetic t2g6 complex with large Δo (~22,900 cm^-1). Distinct orange color.',
  },
  {
    id: 'cu_h2o6_2',
    formula: '[Cu(H2O)6]2+',
    name: 'Hexaaquacopper(II)',
    geometry: 'octahedral',
    spin_state: 'not_applicable',
    d_electron_count: 9,
    unpaired_electrons: 1,
    perceived_color_hex: '#38BDF8',
    description: 'Undergoes prominent Jahn-Teller tetragonal z-out elongation. Bright cyan blue.',
  },
  {
    id: 'ni_cl4_2',
    formula: '[NiCl4]2-',
    name: 'Tetrachloronickelate(II)',
    geometry: 'tetrahedral',
    spin_state: 'high_spin',
    d_electron_count: 8,
    unpaired_electrons: 2,
    perceived_color_hex: '#3B82F6',
    description: 'Tetrahedral geometry with inverse e4 t24 splitting. Deep blue paramagnetic.',
  },
  {
    id: 'pt_nh32_cl2',
    formula: '[Pt(NH3)2Cl2]',
    name: 'Cisplatin (Square Planar)',
    geometry: 'square_planar',
    spin_state: 'low_spin',
    d_electron_count: 8,
    unpaired_electrons: 0,
    perceived_color_hex: '#FDE047',
    description: 'D4h square planar chemotherapy agent. d8 diamagnetic with empty dx2-y2 orbital.',
  },
];

const LIGAND_F_FACTORS: Record<string, number> = {
  i: 0.78,
  br: 0.81,
  cl: 0.86,
  f: 0.9,
  oh: 0.92,
  h2o: 1.0,
  nh3: 1.25,
  en: 1.28,
  no2: 1.4,
  cn: 1.7,
  co: 1.9,
};

const METAL_G_FACTORS: Record<string, [number, number]> = {
  'Ti_3': [17.5, 18000],
  'V_3': [18.0, 19000],
  'Cr_2': [14.0, 20400],
  'Cr_3': [17.4, 21500],
  'Mn_2': [8.0, 25500],
  'Fe_2': [10.4, 17600],
  'Fe_3': [14.0, 30000],
  'Co_2': [9.0, 22500],
  'Co_3': [18.2, 21000],
  'Ni_2': [8.5, 19500],
  'Cu_2': [12.0, 20000],
  'Zn_2': [5.0, 20000],
  'Pt_2': [32.0, 15000],
};

export class CoordinationCftService {
  static async getMetals(): Promise<TransitionMetalSummary[]> {
    try {
      const res = await fetch(`${API_BASE}/metals`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return FALLBACK_METALS;
  }

  static async getLigands(): Promise<LigandSummary[]> {
    try {
      const res = await fetch(`${API_BASE}/ligands`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return FALLBACK_LIGANDS;
  }

  static async getPresets(): Promise<ComplexPresetSummary[]> {
    try {
      const res = await fetch(`${API_BASE}/presets`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return FALLBACK_PRESETS;
  }

  static async analyzeComplex(request: CoordinationAnalysisRequest): Promise<CoordinationAnalysisResponse> {
    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return this.analyzeFallbackComplex(request);
  }

  static analyzeFallbackComplex(request: CoordinationAnalysisRequest): CoordinationAnalysisResponse {
    const metal =
      FALLBACK_METALS.find(
        (m) => m.symbol === request.metal_symbol && m.oxidation_state === request.oxidation_state
      ) || FALLBACK_METALS[5]; // Fe(II)

    const ligand =
      FALLBACK_LIGANDS.find((l) => l.id === request.ligand_id.toLowerCase()) ||
      FALLBACK_LIGANDS[5]; // H2O

    const geom = (request.geometry || 'octahedral').toLowerCase();
    const [gVal, pVal] = METAL_G_FACTORS[`${metal.symbol}_${metal.oxidation_state}`] || [10.0, 20000];
    const fFactor = LIGAND_F_FACTORS[ligand.id] || 1.0;
    const deltaO = fFactor * gVal * 1000.0;

    let delta = deltaO;
    if (geom === 'tetrahedral') delta = (4.0 / 9.0) * deltaO;
    else if (geom === 'square_planar') delta = 1.74 * deltaO;

    const dCount = metal.d_electron_count;
    let spin = 'not_applicable';
    let cfseUnits = 0.0;
    let unp = 0;
    let cn = 6;
    const levels = [];

    if (geom === 'octahedral') {
      cn = 6;
      if (dCount <= 3) {
        cfseUnits = -0.4 * dCount;
        unp = dCount;
        levels.push({
          label: 't2g',
          orbitals: ['dxy', 'dyz', 'dxz'],
          energy_delta: -0.4,
          energy_cm_inv: Number((-0.4 * delta).toFixed(1)),
          degeneracy: 3,
          electron_count: dCount,
          unpaired_electrons: dCount,
        });
        levels.push({
          label: 'eg',
          orbitals: ['dz2', 'dx2-y2'],
          energy_delta: +0.6,
          energy_cm_inv: Number((+0.6 * delta).toFixed(1)),
          degeneracy: 2,
          electron_count: 0,
          unpaired_electrons: 0,
        });
      } else if (dCount >= 8) {
        const egElectrons = dCount - 6;
        cfseUnits = -0.4 * 6 + 0.6 * egElectrons;
        unp = dCount === 8 ? 2 : dCount === 9 ? 1 : 0;
        levels.push({
          label: 't2g',
          orbitals: ['dxy', 'dyz', 'dxz'],
          energy_delta: -0.4,
          energy_cm_inv: Number((-0.4 * delta).toFixed(1)),
          degeneracy: 3,
          electron_count: 6,
          unpaired_electrons: 0,
        });
        levels.push({
          label: 'eg',
          orbitals: ['dz2', 'dx2-y2'],
          energy_delta: +0.6,
          energy_cm_inv: Number((+0.6 * delta).toFixed(1)),
          degeneracy: 2,
          electron_count: egElectrons,
          unpaired_electrons: unp,
        });
      } else {
        // d4 - d7
        const isLowSpin = request.forced_spin_state === 'low_spin' || (!request.forced_spin_state && delta >= pVal);
        if (isLowSpin) {
          spin = 'low_spin';
          if (dCount === 4) { cfseUnits = -1.6; unp = 2; }
          else if (dCount === 5) { cfseUnits = -2.0; unp = 1; }
          else if (dCount === 6) { cfseUnits = -2.4; unp = 0; }
          else { cfseUnits = -1.8; unp = 1; } // d7

          const t2gElectrons = Math.min(6, dCount);
          const egElectrons = Math.max(0, dCount - 6);
          levels.push({
            label: 't2g',
            orbitals: ['dxy', 'dyz', 'dxz'],
            energy_delta: -0.4,
            energy_cm_inv: Number((-0.4 * delta).toFixed(1)),
            degeneracy: 3,
            electron_count: t2gElectrons,
            unpaired_electrons: dCount <= 6 ? (t2gElectrons <= 3 ? t2gElectrons : 6 - t2gElectrons) : 0,
          });
          levels.push({
            label: 'eg',
            orbitals: ['dz2', 'dx2-y2'],
            energy_delta: +0.6,
            energy_cm_inv: Number((+0.6 * delta).toFixed(1)),
            degeneracy: 2,
            electron_count: egElectrons,
            unpaired_electrons: egElectrons,
          });
        } else {
          spin = 'high_spin';
          if (dCount === 4) { cfseUnits = -0.6; unp = 4; }
          else if (dCount === 5) { cfseUnits = 0.0; unp = 5; }
          else if (dCount === 6) { cfseUnits = -0.4; unp = 4; }
          else { cfseUnits = -0.8; unp = 3; } // d7

          const egElectrons = Math.min(2, dCount - 3);
          const t2gElectrons = dCount - egElectrons;
          levels.push({
            label: 't2g',
            orbitals: ['dxy', 'dyz', 'dxz'],
            energy_delta: -0.4,
            energy_cm_inv: Number((-0.4 * delta).toFixed(1)),
            degeneracy: 3,
            electron_count: t2gElectrons,
            unpaired_electrons: t2gElectrons <= 3 ? t2gElectrons : 6 - t2gElectrons,
          });
          levels.push({
            label: 'eg',
            orbitals: ['dz2', 'dx2-y2'],
            energy_delta: +0.6,
            energy_cm_inv: Number((+0.6 * delta).toFixed(1)),
            degeneracy: 2,
            electron_count: egElectrons,
            unpaired_electrons: egElectrons,
          });
        }
      }
    } else if (geom === 'tetrahedral') {
      cn = 4;
      spin = 'high_spin';
      let nE = 0;
      let nT2 = 0;
      if (dCount <= 2) nE = dCount;
      else if (dCount <= 5) { nE = 2; nT2 = dCount - 2; }
      else if (dCount <= 7) { nE = 2 + (dCount - 5); nT2 = 3; }
      else { nE = 4; nT2 = 3 + (dCount - 7); }

      cfseUnits = -0.6 * nE + 0.4 * nT2;
      const eUnp = nE <= 2 ? nE : 4 - nE;
      const t2Unp = nT2 <= 3 ? nT2 : 6 - nT2;
      unp = eUnp + t2Unp;

      levels.push({
        label: 'e',
        orbitals: ['dz2', 'dx2-y2'],
        energy_delta: -0.6,
        energy_cm_inv: Number((-0.6 * delta).toFixed(1)),
        degeneracy: 2,
        electron_count: nE,
        unpaired_electrons: eUnp,
      });
      levels.push({
        label: 't2',
        orbitals: ['dxy', 'dyz', 'dxz'],
        energy_delta: +0.4,
        energy_cm_inv: Number((+0.4 * delta).toFixed(1)),
        degeneracy: 3,
        electron_count: nT2,
        unpaired_electrons: t2Unp,
      });
    } else {
      // Square Planar (D4h)
      cn = 4;
      spin = 'low_spin';
      unp = dCount === 8 ? 0 : 1;
      cfseUnits = -2.46;
      levels.push({
        label: 'dxz, dyz',
        orbitals: ['dxz', 'dyz'],
        energy_delta: -0.51,
        energy_cm_inv: Number((-0.51 * delta).toFixed(1)),
        degeneracy: 2,
        electron_count: 4,
        unpaired_electrons: 0,
      });
      levels.push({
        label: 'dz2',
        orbitals: ['dz2'],
        energy_delta: -0.43,
        energy_cm_inv: Number((-0.43 * delta).toFixed(1)),
        degeneracy: 1,
        electron_count: 2,
        unpaired_electrons: 0,
      });
      levels.push({
        label: 'dxy',
        orbitals: ['dxy'],
        energy_delta: +0.23,
        energy_cm_inv: Number((+0.23 * delta).toFixed(1)),
        degeneracy: 1,
        electron_count: 2,
        unpaired_electrons: 0,
      });
      levels.push({
        label: 'dx2-y2',
        orbitals: ['dx2-y2'],
        energy_delta: +1.23,
        energy_cm_inv: Number((+1.23 * delta).toFixed(1)),
        degeneracy: 1,
        electron_count: 0,
        unpaired_electrons: 0,
      });
    }

    const cfseKj = Number((cfseUnits * delta * CM_INV_TO_KJ_MOL).toFixed(1));
    const muBm = Number(Math.sqrt(unp * (unp + 2)).toFixed(2));
    const isParamag = unp > 0;

    let jt = 'none';
    if (geom === 'octahedral') {
      if (dCount === 9 || (dCount === 4 && spin === 'high_spin') || (dCount === 7 && spin === 'low_spin')) {
        jt = 'strong_elongation';
      } else if ([1, 2].includes(dCount) || (dCount === 6 && spin === 'high_spin')) {
        jt = 'weak_compression';
      }
    }

    const wl = delta > 0 ? Number((1e7 / delta).toFixed(1)) : undefined;
    let colorName = 'Colorless';
    let colorHex = '#F5F5F5';
    if (wl) {
      if (wl <= 435) { colorName = 'Yellow'; colorHex = '#EAB308'; }
      else if (wl <= 480) { colorName = 'Orange'; colorHex = '#F97316'; }
      else if (wl <= 560) { colorName = 'Purple / Magenta'; colorHex = '#9333EA'; }
      else if (wl <= 650) { colorName = 'Cyan / Blue'; colorHex = '#2563EB'; }
      else { colorName = 'Green'; colorHex = '#16A34A'; }
    }

    const ligSub = Math.floor(cn / ligand.denticity);
    const charge = metal.oxidation_state + (ligand.formula.includes('-') ? -1 : 0) * cn;
    const sign = charge > 0 ? '+' : charge < 0 ? '-' : '';
    const chgStr = Math.abs(charge) > 1 ? `${Math.abs(charge)}${sign}` : charge !== 0 ? sign : '';
    const formula = `[${metal.symbol}(${ligand.formula})${ligSub}]${chgStr}`;

    return {
      formula,
      name: `${ligand.name} ${metal.name} (${geom})`,
      metal,
      ligand,
      coordination_number: cn,
      geometry: geom,
      delta_cm_inv: Number(delta.toFixed(1)),
      pairing_energy_cm_inv: Number(pVal.toFixed(1)),
      spin_state: spin,
      orbital_levels: levels,
      cfse_delta_units: Number(cfseUnits.toFixed(2)),
      cfse_kj_mol: cfseKj,
      unpaired_electrons: unp,
      magnetic_moment_bm: muBm,
      is_paramagnetic: isParamag,
      jahn_teller_distortion: jt,
      absorption_wavelength_nm: wl,
      perceived_color_name: colorName,
      perceived_color_hex: colorHex,
      pedagogical_notes: `${metal.name} (d^${dCount}) with ${ligand.name} in ${geom} geometry. Crystal field splitting Δ = ${delta.toFixed(0)} cm^-1, CFSE = ${cfseUnits.toFixed(2)} Δ (${cfseKj} kJ/mol), μ_eff = ${muBm} BM (${unp} unpaired e-). Jahn-Teller effect: ${jt}.`,
    };
  }
}
