import {
  ColligativePresetSummary,
  SolventProperties,
  SoluteProperties,
  VaporPressureRequest,
  VaporPressureResponse,
  BoilingFreezingRequest,
  BoilingFreezingResponse,
  OsmoticPressureRequest,
  OsmoticPressureResponse,
  IonicStrengthRequest,
  IonicStrengthResponse,
  SolutionModelType,
  VlePoint,
} from '../types/colligative';

const API_BASE = '/api/v1/chemistry/colligative';

export const FALLBACK_COLLIGATIVE_PRESETS: ColligativePresetSummary[] = [
  {
    id: 'ethanol_water_vle',
    title: 'Ethanol-Water Azeotropic Binary Mixture',
    category: 'Vapor Pressure & Raoult Deviations',
    description: 'Positive deviation from Raoult\'s law (A12 = 1.25) producing a minimum-boiling azeotrope at 78.15 °C (89 mol% ethanol).',
  },
  {
    id: 'acetone_chloroform_vle',
    title: 'Acetone-Chloroform Maximum-Boiling Azeotrope',
    category: 'Vapor Pressure & Raoult Deviations',
    description: 'Negative deviation from Raoult\'s law (A12 = -0.75) due to intermolecular C-H...O=C hydrogen bonding.',
  },
  {
    id: 'benzene_toluene_ideal',
    title: 'Benzene-Toluene Ideal Binary Solution',
    category: 'Vapor Pressure & Raoult Deviations',
    description: 'Classical textbook ideal solution obeying Raoult\'s law with zero enthalpy of mixing (A12 = 0.0).',
  },
  {
    id: 'seawater_freezing',
    title: 'Seawater Saline Freezing Depression & Osmosis',
    category: 'Cryoscopy & Osmometry',
    description: 'Saline solution (0.60 M NaCl, i = 2) exhibiting freezing point depression to -2.08 °C and high osmotic pressure (29.4 atm).',
  },
  {
    id: 'antifreeze_glycol',
    title: 'Automotive Antifreeze (Ethylene Glycol)',
    category: 'Cryoscopy & Ebullioscopy',
    description: '30 mass% non-volatile ethylene glycol in water protecting engine coolant down to -14.2 °C.',
  },
  {
    id: 'camphor_rast_method',
    title: 'Camphor Rast Cryoscopic Molar Mass Determination',
    category: 'Molecular Mass Determination',
    description: 'Micro-determination of organic molar mass exploiting camphor\'s immense cryoscopic constant (Kf = 39.7 °C*kg/mol).',
  },
  {
    id: 'blood_isotonic_saline',
    title: 'Physiological Normal Saline (0.9% NaCl)',
    category: 'Osmotic Pressure & Tonicity',
    description: 'Isotonic electrolyte solution (0.154 M NaCl) maintaining erythrocyte membrane integrity at Pi = 7.7 atm.',
  },
  {
    id: 'bsa_osmotic_pressure',
    title: 'Bovine Serum Albumin Macromolecular Osmometry',
    category: 'Macromolecular Chemistry',
    description: 'Protein colloid osmotic pressure (oncotic pressure) determination for high-molecular-weight biopolymers (66.5 kDa).',
  },
  {
    id: 'cacl2_ionic_strength',
    title: 'Calcium Chloride (1:2 Electrolyte) Activity',
    category: 'Debye-Hückel Activity',
    description: 'Multivalent electrolyte (z+ = 2, z- = 1) generating high ionic strength (I = 3M) and sharp Debye-Hückel activity coefficient depression.',
  },
];

export const FALLBACK_SOLVENTS: SolventProperties[] = [
  {
    name: 'Water',
    formula: 'H2O',
    molar_mass_g_mol: 18.015,
    normal_boiling_point_c: 100.0,
    kb_c_kg_mol: 0.512,
    normal_freezing_point_c: 0.0,
    kf_c_kg_mol: 1.86,
    density_g_cm3: 0.997,
    description: 'Universal polar protic solvent with strong hydrogen bonding network.',
  },
  {
    name: 'Ethanol',
    formula: 'C2H5OH',
    molar_mass_g_mol: 46.069,
    normal_boiling_point_c: 78.37,
    kb_c_kg_mol: 1.22,
    normal_freezing_point_c: -114.1,
    kf_c_kg_mol: 1.99,
    density_g_cm3: 0.789,
    description: 'Polar organic solvent forming minimum-boiling azeotrope with water.',
  },
  {
    name: 'Benzene',
    formula: 'C6H6',
    molar_mass_g_mol: 78.114,
    normal_boiling_point_c: 80.10,
    kb_c_kg_mol: 2.53,
    normal_freezing_point_c: 5.50,
    kf_c_kg_mol: 5.12,
    density_g_cm3: 0.876,
    description: 'Aromatic non-polar solvent; classical ideal solution partner with toluene.',
  },
  {
    name: 'Toluene',
    formula: 'C7H8',
    molar_mass_g_mol: 92.141,
    normal_boiling_point_c: 110.60,
    kb_c_kg_mol: 3.33,
    normal_freezing_point_c: -95.0,
    kf_c_kg_mol: 3.55,
    density_g_cm3: 0.867,
    description: 'Methylbenzene solvent; obeys Raoult\'s law ideally in benzene mixtures.',
  },
  {
    name: 'Cyclohexane',
    formula: 'C6H12',
    molar_mass_g_mol: 84.161,
    normal_boiling_point_c: 80.74,
    kb_c_kg_mol: 2.79,
    normal_freezing_point_c: 6.55,
    kf_c_kg_mol: 20.0,
    density_g_cm3: 0.778,
    description: 'High cryoscopic constant (Kf = 20.0 °C*kg/mol) ideal for freezing point experiments.',
  },
  {
    name: 'Camphor',
    formula: 'C10H16O',
    molar_mass_g_mol: 152.23,
    normal_boiling_point_c: 204.0,
    kb_c_kg_mol: 5.95,
    normal_freezing_point_c: 179.8,
    kf_c_kg_mol: 39.7,
    density_g_cm3: 0.990,
    description: 'Exceptionally large Kf (39.7 °C*kg/mol) used in the classical Rast micro-method.',
  },
  {
    name: 'Acetic Acid (Glacial)',
    formula: 'CH3COOH',
    molar_mass_g_mol: 60.052,
    normal_boiling_point_c: 117.9,
    kb_c_kg_mol: 3.07,
    normal_freezing_point_c: 16.6,
    kf_c_kg_mol: 3.90,
    density_g_cm3: 1.049,
    description: 'Weak carboxylic acid solvent exhibiting partial dimerization in non-polar solutions.',
  },
  {
    name: 'Acetone',
    formula: 'C3H6O',
    molar_mass_g_mol: 58.08,
    normal_boiling_point_c: 56.08,
    kb_c_kg_mol: 1.71,
    normal_freezing_point_c: -94.7,
    kf_c_kg_mol: 2.40,
    density_g_cm3: 0.784,
    description: 'Polar aprotic solvent forming maximum-boiling azeotrope with chloroform.',
  },
  {
    name: 'Chloroform',
    formula: 'CHCl3',
    molar_mass_g_mol: 119.38,
    normal_boiling_point_c: 61.15,
    kb_c_kg_mol: 3.63,
    normal_freezing_point_c: -63.5,
    kf_c_kg_mol: 4.70,
    density_g_cm3: 1.489,
    description: 'Dense chlorocarbon forming strong hydrogen bonds with acetone (A12 < 0).',
  },
];

export const FALLBACK_SOLUTES: SoluteProperties[] = [
  {
    name: 'Sodium Chloride',
    formula: 'NaCl',
    molar_mass_g_mol: 58.443,
    van_t_hoff_i: 2.0,
    is_electrolyte: true,
    cation_charge: 1,
    anion_charge: 1,
    cation_count: 1,
    anion_count: 1,
  },
  {
    name: 'Calcium Chloride',
    formula: 'CaCl2',
    molar_mass_g_mol: 110.98,
    van_t_hoff_i: 3.0,
    is_electrolyte: true,
    cation_charge: 2,
    anion_charge: 1,
    cation_count: 1,
    anion_count: 2,
  },
  {
    name: 'Iron(III) Chloride',
    formula: 'FeCl3',
    molar_mass_g_mol: 162.20,
    van_t_hoff_i: 4.0,
    is_electrolyte: true,
    cation_charge: 3,
    anion_charge: 1,
    cation_count: 1,
    anion_count: 3,
  },
  {
    name: 'Magnesium Sulfate',
    formula: 'MgSO4',
    molar_mass_g_mol: 120.366,
    van_t_hoff_i: 2.0,
    is_electrolyte: true,
    cation_charge: 2,
    anion_charge: 2,
    cation_count: 1,
    anion_count: 1,
  },
  {
    name: 'D-Glucose',
    formula: 'C6H12O6',
    molar_mass_g_mol: 180.156,
    van_t_hoff_i: 1.0,
    is_electrolyte: false,
  },
  {
    name: 'Sucrose (Table Sugar)',
    formula: 'C12H22O11',
    molar_mass_g_mol: 342.30,
    van_t_hoff_i: 1.0,
    is_electrolyte: false,
  },
  {
    name: 'Urea',
    formula: 'CH4N2O',
    molar_mass_g_mol: 60.055,
    van_t_hoff_i: 1.0,
    is_electrolyte: false,
  },
  {
    name: 'Ethylene Glycol (Antifreeze)',
    formula: 'C2H6O2',
    molar_mass_g_mol: 62.068,
    van_t_hoff_i: 1.0,
    is_electrolyte: false,
  },
];

const ANTOINE_PARAMS: Record<string, { A: number; B: number; C: number }> = {
  water: { A: 8.07131, B: 1730.63, C: 233.426 },
  ethanol: { A: 8.20417, B: 1642.89, C: 230.300 },
  benzene: { A: 6.90565, B: 1211.033, C: 220.790 },
  toluene: { A: 6.95464, B: 1344.800, C: 219.482 },
  cyclohexane: { A: 6.84498, B: 1203.526, C: 222.863 },
  camphor: { A: 7.1120, B: 1740.0, C: 215.0 },
  acetic_acid: { A: 7.18807, B: 1416.7, C: 211.0 },
  acetone: { A: 7.02447, B: 1161.0, C: 224.0 },
  chloroform: { A: 6.95465, B: 1170.966, C: 226.232 },
};

export function calculatePureVaporPressureMmHg(solventId: string, tempC: number): number {
  const p = ANTOINE_PARAMS[solventId] || ANTOINE_PARAMS.water;
  const cDenom = tempC + p.C;
  const logP = p.A - p.B / (cDenom === 0 ? 1e-6 : cDenom);
  return Math.max(1e-6, Math.pow(10, logP));
}

export function calculateVaporPressureClient(req: VaporPressureRequest): VaporPressureResponse {
  const s1 = FALLBACK_SOLVENTS.find((s) => s.formula.toLowerCase().includes(req.solvent1_id) || req.solvent1_id.includes(s.name.toLowerCase())) || FALLBACK_SOLVENTS[1];
  const s2 = FALLBACK_SOLVENTS.find((s) => s.formula.toLowerCase().includes(req.solvent2_id) || req.solvent2_id.includes(s.name.toLowerCase())) || FALLBACK_SOLVENTS[0];

  const x1 = Math.max(0.0, Math.min(1.0, req.x1_mole_fraction));
  const x2 = 1.0 - x1;

  const mmhgToKpa = 101.325 / 760.0;
  const p1PureKpa = calculatePureVaporPressureMmHg(req.solvent1_id, req.temperature_c) * mmhgToKpa;
  const p2PureKpa = calculatePureVaporPressureMmHg(req.solvent2_id, req.temperature_c) * mmhgToKpa;

  const a12 = req.non_ideal_parameter_a12 ?? 0.0;
  const gamma1 = Math.exp(a12 * Math.pow(x2, 2));
  const gamma2 = Math.exp(a12 * Math.pow(x1, 2));

  const p1Partial = gamma1 * x1 * p1PureKpa;
  const p2Partial = gamma2 * x2 * p2PureKpa;
  const pTotKpa = p1Partial + p2Partial;

  const y1 = pTotKpa > 0 ? p1Partial / pTotKpa : 0.0;
  const y2 = 1.0 - y1;

  const vle_curve: VlePoint[] = [];
  let azeotrope_detected = false;
  let azeotrope_x1: number | null = null;
  let prevDiff: number | null = null;

  for (let i = 0; i <= 20; i++) {
    const xi = i * 0.05;
    const xj = 1.0 - xi;
    const g1 = Math.exp(a12 * Math.pow(xj, 2));
    const g2 = Math.exp(a12 * Math.pow(xi, 2));
    const p1 = g1 * xi * p1PureKpa;
    const p2 = g2 * xj * p2PureKpa;
    const pTot = p1 + p2;
    const y1_i = pTot > 0 ? p1 / pTot : 0.0;

    vle_curve.push({
      x1_liquid: parseFloat(xi.toFixed(2)),
      y1_vapor: parseFloat(y1_i.toFixed(4)),
      pressure_kpa: parseFloat(pTot.toFixed(3)),
      pressure_mmhg: parseFloat((pTot / mmhgToKpa).toFixed(2)),
      activity_coeff_1: parseFloat(g1.toFixed(4)),
      activity_coeff_2: parseFloat(g2.toFixed(4)),
    });

    if (i > 0 && i < 20) {
      const diff = y1_i - xi;
      if (prevDiff !== null && prevDiff * diff <= 0) {
        azeotrope_detected = true;
        azeotrope_x1 = parseFloat(xi.toFixed(2));
      }
      prevDiff = diff;
    }
  }

  const model_type: SolutionModelType = Math.abs(a12) < 1e-4 ? 'ideal_raoult' : 'margules_two_suffix';

  return {
    solvent1_name: s1.name,
    solvent2_name: s2.name,
    temperature_c: req.temperature_c,
    x1_mole_fraction: parseFloat(x1.toFixed(4)),
    x2_mole_fraction: parseFloat(x2.toFixed(4)),
    p1_pure_kpa: parseFloat(p1PureKpa.toFixed(3)),
    p2_pure_kpa: parseFloat(p2PureKpa.toFixed(3)),
    activity_coeff_1: parseFloat(gamma1.toFixed(4)),
    activity_coeff_2: parseFloat(gamma2.toFixed(4)),
    p1_partial_kpa: parseFloat(p1Partial.toFixed(3)),
    p2_partial_kpa: parseFloat(p2Partial.toFixed(3)),
    total_vapor_pressure_kpa: parseFloat(pTotKpa.toFixed(3)),
    total_vapor_pressure_mmhg: parseFloat((pTotKpa / mmhgToKpa).toFixed(2)),
    y1_vapor_mole_fraction: parseFloat(y1.toFixed(4)),
    y2_vapor_mole_fraction: parseFloat(y2.toFixed(4)),
    azeotrope_detected,
    azeotrope_x1,
    model_type,
    vle_curve,
  };
}

export function calculateBoilingFreezingClient(req: BoilingFreezingRequest): BoilingFreezingResponse {
  const solvent = FALLBACK_SOLVENTS.find((s) => s.formula.toLowerCase().includes(req.solvent_id) || req.solvent_id.includes(s.name.toLowerCase())) || FALLBACK_SOLVENTS[0];
  const solute = FALLBACK_SOLUTES.find((s) => s.formula.toLowerCase().includes(req.solute_id) || req.solute_id.includes(s.name.toLowerCase())) || FALLBACK_SOLUTES[0];

  const solventKg = req.solvent_mass_g / 1000.0;
  const nSolute = req.solute_mass_g / solute.molar_mass_g_mol;
  const molality = solventKg > 0 ? nSolute / solventKg : 0.0;
  const iFactor = req.custom_van_t_hoff_i ?? solute.van_t_hoff_i;

  const deltaTb = iFactor * solvent.kb_c_kg_mol * molality;
  const deltaTf = iFactor * solvent.kf_c_kg_mol * molality;

  const solTb = solvent.normal_boiling_point_c + deltaTb;
  const solTf = solvent.normal_freezing_point_c - deltaTf;

  const diluteLimit = molality > 1.0;
  const warning = diluteLimit
    ? `Molality m = ${molality.toFixed(2)} mol/kg exceeds the dilute limit (m <= 1.0 mol/kg). Calculated values are approximations.`
    : null;

  let mwEstimate: number | null = null;
  if (req.observed_delta_tf_c && req.observed_delta_tf_c > 0) {
    mwEstimate = (iFactor * solvent.kf_c_kg_mol * req.solute_mass_g) / (req.observed_delta_tf_c * solventKg);
  }

  return {
    solvent_name: solvent.name,
    solute_name: solute.name,
    solute_mass_g: req.solute_mass_g,
    solvent_mass_g: req.solvent_mass_g,
    molality_m: parseFloat(molality.toFixed(4)),
    van_t_hoff_factor_i: iFactor,
    pure_boiling_point_c: solvent.normal_boiling_point_c,
    delta_tb_c: parseFloat(deltaTb.toFixed(4)),
    solution_boiling_point_c: parseFloat(solTb.toFixed(4)),
    pure_freezing_point_c: solvent.normal_freezing_point_c,
    delta_tf_c: parseFloat(deltaTf.toFixed(4)),
    solution_freezing_point_c: parseFloat(solTf.toFixed(4)),
    dilute_limit_exceeded: diluteLimit,
    applicability_warning: warning,
    estimated_molar_mass_g_mol: mwEstimate ? parseFloat(mwEstimate.toFixed(2)) : null,
  };
}

export function calculateOsmoticPressureClient(req: OsmoticPressureRequest): OsmoticPressureResponse {
  const mw = req.solute_molar_mass_g_mol ?? 66500.0;
  const nMoles = req.solute_mass_g / mw;
  const molarity = req.solution_volume_l > 0 ? nMoles / req.solution_volume_l : 0.0;

  const tempK = req.temperature_c + 273.15;
  const R = 0.082057366;
  const iFactor = req.van_t_hoff_i ?? 1.0;
  const rho = req.solvent_density_g_cm3 ?? 0.997;

  const piAtm = iFactor * molarity * R * tempK;
  const solvKg = Math.max(0.01, (req.solution_volume_l * rho * 1000.0 - req.solute_mass_g) / 1000.0);
  const molality = nMoles / solvKg;
  const piMorseAtm = iFactor * molality * rho * R * tempK;

  const isIsotonic = piAtm >= 7.4 && piAtm <= 8.0;
  const tonicity = piAtm < 7.4 ? 'Hypotonic (< 7.4 atm)' : piAtm > 8.0 ? 'Hypertonic (> 8.0 atm)' : 'Isotonic (7.4 - 8.0 atm)';

  const mwEstimate = piAtm > 0 ? ((req.solute_mass_g / req.solution_volume_l) * R * tempK) / piAtm : null;

  return {
    solute_name: req.solute_name,
    temperature_c: req.temperature_c,
    molarity_m: parseFloat(molarity.toFixed(6)),
    molality_m: parseFloat(molality.toFixed(6)),
    van_t_hoff_i: iFactor,
    osmotic_pressure_atm: parseFloat(piAtm.toFixed(4)),
    osmotic_pressure_bar: parseFloat((piAtm * 1.01325).toFixed(4)),
    osmotic_pressure_kpa: parseFloat((piAtm * 101.325).toFixed(3)),
    osmotic_pressure_mmhg: parseFloat((piAtm * 760.0).toFixed(2)),
    morse_corrected_pressure_atm: parseFloat(piMorseAtm.toFixed(4)),
    is_isotonic_blood: isIsotonic,
    tonicity_category: tonicity,
    macromolecule_mw_estimate: mwEstimate ? parseFloat(mwEstimate.toFixed(1)) : null,
  };
}

export function calculateIonicStrengthClient(req: IonicStrengthRequest): IonicStrengthResponse {
  const solute = FALLBACK_SOLUTES.find((s) => s.formula.toLowerCase().includes(req.electrolyte_id) || req.electrolyte_id.includes(s.name.toLowerCase())) || FALLBACK_SOLUTES[1];
  const zPlus = solute.cation_charge ?? 2;
  const zMinus = solute.anion_charge ?? 1;
  const nuPlus = solute.cation_count ?? 1;
  const nuMinus = solute.anion_count ?? 2;

  const m = req.molarity_m;
  const I = 0.5 * (m * nuPlus * Math.pow(zPlus, 2) + m * nuMinus * Math.pow(zMinus, 2));

  const tempK = (req.temperature_c ?? 25.0) + 273.15;
  const aDh = 0.509 * Math.pow(298.15 / tempK, 1.5);
  const bDh = 0.328;
  const zProd = Math.abs(zPlus * zMinus);
  const sqrtI = Math.sqrt(Math.max(1e-9, I));

  const logDhll = -aDh * zProd * sqrtI;
  const gammaDhll = Math.pow(10, logDhll);

  const aAngstrom = req.ion_radius_angstrom ?? 3.0;
  const logExt = (-aDh * zProd * sqrtI) / (1.0 + bDh * aAngstrom * sqrtI);
  const gammaExt = Math.pow(10, logExt);

  const logDavies = -aDh * zProd * (sqrtI / (1.0 + sqrtI) - 0.30 * I);
  const gammaDavies = Math.pow(10, logDavies);

  let selected = gammaDavies;
  let regime = 'Concentrated ionic solution: Davies equation valid.';
  let warning: string | null = null;

  if (I <= 0.01) {
    selected = gammaDhll;
    regime = 'Dilute electrolyte regime: Debye-Hückel Limiting Law accurate.';
  } else if (I <= 0.10) {
    selected = gammaExt;
    regime = 'Moderate ionic strength: Extended Debye-Hückel valid.';
  } else if (I > 0.50) {
    warning = `Ionic strength I = ${I.toFixed(3)} M exceeds standard Debye-Hückel range (I <= 0.50 M).`;
  }

  const activity_curve = [0.001, 0.005, 0.01, 0.02, 0.05, 0.10, 0.20, 0.30, 0.50].map((step) => {
    const iStep = 0.5 * (step * nuPlus * Math.pow(zPlus, 2) + step * nuMinus * Math.pow(zMinus, 2));
    const sq = Math.sqrt(iStep);
    const lg = -aDh * zProd * (sq / (1.0 + sq) - 0.30 * iStep);
    return {
      concentration_m: step,
      ionic_strength: parseFloat(iStep.toFixed(4)),
      gamma_plus_minus: parseFloat(Math.pow(10, lg).toFixed(4)),
    };
  });

  return {
    electrolyte_formula: solute.formula,
    molarity_m: m,
    ionic_strength_i: parseFloat(I.toFixed(4)),
    cation_charge_z_plus: zPlus,
    anion_charge_z_minus: zMinus,
    dhll_gamma_plus_minus: parseFloat(gammaDhll.toFixed(4)),
    extended_dh_gamma_plus_minus: parseFloat(gammaExt.toFixed(4)),
    davies_gamma_plus_minus: parseFloat(gammaDavies.toFixed(4)),
    selected_gamma: parseFloat(selected.toFixed(4)),
    regime_description: regime,
    validity_warning: warning,
    activity_curve,
  };
}

export const ColligativeService = {
  async getPresets(): Promise<ColligativePresetSummary[]> {
    try {
      const res = await fetch(`${API_BASE}/presets`);
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }
    return FALLBACK_COLLIGATIVE_PRESETS;
  },

  async getSolvents(): Promise<SolventProperties[]> {
    try {
      const res = await fetch(`${API_BASE}/solvents`);
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }
    return FALLBACK_SOLVENTS;
  },

  async getSolutes(): Promise<SoluteProperties[]> {
    try {
      const res = await fetch(`${API_BASE}/solutes`);
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }
    return FALLBACK_SOLUTES;
  },

  async calculateVaporPressure(req: VaporPressureRequest): Promise<VaporPressureResponse> {
    try {
      const res = await fetch(`${API_BASE}/vapor-pressure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }
    return calculateVaporPressureClient(req);
  },

  async calculateBoilingFreezing(req: BoilingFreezingRequest): Promise<BoilingFreezingResponse> {
    try {
      const res = await fetch(`${API_BASE}/boiling-freezing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }
    return calculateBoilingFreezingClient(req);
  },

  async calculateOsmoticPressure(req: OsmoticPressureRequest): Promise<OsmoticPressureResponse> {
    try {
      const res = await fetch(`${API_BASE}/osmotic-pressure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }
    return calculateOsmoticPressureClient(req);
  },

  async calculateIonicStrength(req: IonicStrengthRequest): Promise<IonicStrengthResponse> {
    try {
      const res = await fetch(`${API_BASE}/ionic-strength`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }
    return calculateIonicStrengthClient(req);
  },
};
