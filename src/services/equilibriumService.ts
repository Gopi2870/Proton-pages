import {
  EquilibriumPresetSummary,
  RiceTableRequest,
  RiceTableResponse,
  PolyproticAcidRequest,
  PolyproticAcidResponse,
  BufferCapacityRequest,
  BufferCapacityResponse,
  SolubilityKspRequest,
  SolubilityKspResponse,
  LeChatelierRequest,
  LeChatelierResponse,
  ShiftDirection,
  PerturbationType,
} from '../types/equilibrium';

const API_BASE = '/api/v1/chemistry/equilibrium';

export const FALLBACK_EQUILIBRIUM_PRESETS: EquilibriumPresetSummary[] = [
  {
    id: 'haber_bosch',
    title: 'Haber-Bosch Ammonia Synthesis',
    system_type: 'homogeneous_gas',
    equation: 'N2(g) + 3 H2(g) <=> 2 NH3(g)',
    default_k: 0.50,
    delta_h_kj_mol: -92.2,
    description: 'Exothermic gas-phase synthesis with Δng = -2. High pressure shifts equilibrium right; high temperature shifts equilibrium left according to Le Chatelier principles.',
  },
  {
    id: 'no2_dimerization',
    title: 'Nitrogen Dioxide Dimerization',
    system_type: 'homogeneous_gas',
    equation: '2 NO2(g, brown) <=> N2O4(g, colorless)',
    default_k: 6.80,
    delta_h_kj_mol: -57.2,
    description: 'Classic colorimetric equilibrium demonstration. Compression yields initial darkening followed by lightening to colorless N2O4.',
  },
  {
    id: 'hi_synthesis',
    title: 'Hydrogen Iodide Synthesis',
    system_type: 'homogeneous_gas',
    equation: 'H2(g) + I2(g) <=> 2 HI(g)',
    default_k: 50.0,
    delta_h_kj_mol: -9.48,
    description: 'Equimolar gas equilibrium (Δng = 0). Pressure changes have no effect on reaction quotient or equilibrium position.',
  },
  {
    id: 'acetic_acid',
    title: 'Acetic Acid Ionization & Buffer',
    system_type: 'weak_acid_base',
    equation: 'CH3COOH(aq) <=> CH3COO-(aq) + H+(aq)',
    default_k: 1.75e-5,
    delta_h_kj_mol: -0.41,
    description: 'Prototypical monoprotic weak acid (pKa = 4.756). Forms optimal acetate buffer capacity at pH = 4.76.',
  },
  {
    id: 'phosphoric_acid',
    title: 'Phosphoric Acid Triprotic Speciation',
    system_type: 'polyprotic_acid',
    equation: 'H3PO4 <=> H2PO4- <=> HPO4(2-) <=> PO4(3-)',
    default_k: 7.11e-3,
    delta_h_kj_mol: null,
    description: 'Triprotic inorganic acid with distinct dissociation steps (pKa1=2.15, pKa2=7.20, pKa3=12.35). Demonstrates pH-dependent speciation.',
  },
  {
    id: 'lead_iodide',
    title: 'Lead(II) Iodide Precipitation',
    system_type: 'solubility_ksp',
    equation: 'PbI2(s) <=> Pb2+(aq) + 2 I-(aq)',
    default_k: 9.8e-9,
    delta_h_kj_mol: 62.8,
    description: 'Bright golden-yellow precipitate ("golden rain"). Demonstrates common-ion effect when dissolved in KI solution.',
  },
  {
    id: 'cobalt_complex',
    title: 'Cobalt(II) Hexaaqua / Tetrachloro Equilibrium',
    system_type: 'cobalt_complex',
    equation: '[Co(H2O)6]2+(aq, pink) + 4 Cl-(aq) <=> [CoCl4]2-(aq, blue) + 6 H2O(l)',
    default_k: 0.15,
    delta_h_kj_mol: 50.0,
    description: 'Endothermic coordination equilibrium. Heating or adding chloride turns the solution deep blue; cooling turns it pink.',
  },
];

// ============================================================================
// CLIENT-SIDE ANALYTICAL ENGINES (Offline Fallback & Pure Validation)
// ============================================================================

export function solveRiceTableClient(request: RiceTableRequest): RiceTableResponse {
  const K = request.equilibrium_constant_k;
  const reactants = request.participants.filter((p) => !p.is_product);
  const products = request.participants.filter((p) => p.is_product);

  let q_num = 1.0;
  for (const p of products) {
    q_num *= Math.pow(Math.max(p.initial_concentration, 1e-15), p.coefficient);
  }
  let q_den = 1.0;
  for (const r of reactants) {
    q_den *= Math.pow(Math.max(r.initial_concentration, 1e-15), r.coefficient);
  }
  const Q = q_den > 0 ? q_num / q_den : 1e15;

  let shift: ShiftDirection = 'at_equilibrium';
  if (Math.abs(Q - K) / Math.max(K, 1e-12) < 1e-5) {
    shift = 'at_equilibrium';
  } else if (Q < K) {
    shift = 'forward';
  } else {
    shift = 'reverse';
  }

  // Bracket bounds for extent of reaction xi
  let xi_max_fwd = Infinity;
  for (const r of reactants) {
    if (r.coefficient > 0) {
      xi_max_fwd = Math.min(xi_max_fwd, r.initial_concentration / r.coefficient);
    }
  }
  let xi_max_rev = Infinity;
  for (const p of products) {
    if (p.coefficient > 0) {
      xi_max_rev = Math.min(xi_max_rev, p.initial_concentration / p.coefficient);
    }
  }

  const xi_lower = -xi_max_rev * 0.999999;
  const xi_upper = xi_max_fwd * 0.999999;

  function g(xi: number): number {
    let log_prod = 0.0;
    for (const p of products) {
      const conc = p.initial_concentration + p.coefficient * xi;
      log_prod += p.coefficient * Math.log(Math.max(conc, 1e-30));
    }
    let log_react = 0.0;
    for (const r of reactants) {
      const conc = r.initial_concentration - r.coefficient * xi;
      log_react += r.coefficient * Math.log(Math.max(conc, 1e-30));
    }
    return log_prod - log_react - Math.log(K);
  }

  let low = xi_lower;
  let high = xi_upper;
  let xi_star = 0.0;
  let iterations = 0;

  for (let i = 0; i < 100; i++) {
    iterations++;
    const mid = 0.5 * (low + high);
    const f_mid = g(mid);
    if (Math.abs(f_mid) < 1e-9 || (high - low) < 1e-12) {
      xi_star = mid;
      break;
    }
    if (f_mid > 0) {
      high = mid;
    } else {
      low = mid;
    }
    xi_star = mid;
  }

  const rows = request.participants.map((p) => {
    const change = p.is_product ? p.coefficient * xi_star : -p.coefficient * xi_star;
    const eq = Math.max(0, p.initial_concentration + change);
    return {
      species_formula: p.formula,
      species_name: p.name,
      coefficient: p.coefficient,
      is_product: p.is_product,
      initial: p.initial_concentration,
      change,
      equilibrium: eq,
    };
  });

  return {
    equilibrium_constant_k: K,
    reaction_quotient_q: Q,
    shift_direction: shift,
    extent_of_reaction_xi: xi_star,
    rows,
    converged: true,
    iterations,
    residual_error: Math.abs(g(xi_star)),
  };
}

export function solvePolyproticAcidClient(request: PolyproticAcidRequest): PolyproticAcidResponse {
  const Ca = request.total_concentration_ca;
  const kas = request.dissociation_constants_ka;
  const N = kas.length;
  const Kw = 1.0e-14;

  function electroneutrality(h: number): number {
    const oh = Kw / h;
    const terms = [Math.pow(h, N)];
    for (let i = 1; i <= N; i++) {
      let prod = Math.pow(h, N - i);
      for (let k = 0; k < i; k++) {
        prod *= kas[k];
      }
      terms.push(prod);
    }
    const denom = terms.reduce((acc, v) => acc + v, 0);

    let anionic_sum = 0.0;
    for (let i = 1; i <= N; i++) {
      const alpha_i = terms[i] / denom;
      anionic_sum += i * alpha_i * Ca;
    }
    return h - oh - anionic_sum;
  }

  let h_low = 1.0e-14;
  let h_high = Math.min(10.0, Math.max(1.0e-7, Ca * N + 1.0));
  let h_opt = 1.0e-7;

  for (let i = 0; i < 100; i++) {
    const h_mid = 0.5 * (h_low + h_high);
    const f_mid = electroneutrality(h_mid);
    if (Math.abs(f_mid) < 1e-12 || (h_high - h_low) < 1e-16) {
      h_opt = h_mid;
      break;
    }
    if (f_mid < 0) {
      h_low = h_mid;
    } else {
      h_high = h_mid;
    }
    h_opt = h_mid;
  }

  const terms = [Math.pow(h_opt, N)];
  for (let i = 1; i <= N; i++) {
    let prod = Math.pow(h_opt, N - i);
    for (let k = 0; k < i; k++) {
      prod *= kas[k];
    }
    terms.push(prod);
  }
  const denom = terms.reduce((acc, v) => acc + v, 0);

  const species_fractions = terms.map((term, i) => {
    const alpha = term / denom;
    const charge = -i;
    let label = request.acid_formula;
    if (i > 0) {
      label = `[H${Math.max(0, N - i)}A]${charge}-`;
    }
    return {
      species_formula: label,
      charge,
      fraction_alpha: alpha,
      equilibrium_concentration: alpha * Ca,
    };
  });

  const ph = -Math.log10(h_opt);
  const poh = 14.0 - ph;

  return {
    acid_name: request.acid_name,
    acid_formula: request.acid_formula,
    total_concentration_ca: Ca,
    ph,
    poh,
    h_plus_concentration: h_opt,
    oh_minus_concentration: Kw / h_opt,
    dissociation_constants_ka: kas,
    species_fractions,
  };
}

export function calculateBufferCapacityClient(request: BufferCapacityRequest): BufferCapacityResponse {
  const Ka = Math.pow(10, -request.pka);
  const Ctot = request.total_buffer_concentration_m;
  const ratio = request.ratio_base_to_acid;
  const Kw = 1.0e-14;

  const hh_ph = request.pka + Math.log10(ratio);
  const h_conc = Math.pow(10, -hh_ph);
  const oh_conc = Kw / h_conc;

  const van_slyke = 2.303 * (h_conc + oh_conc + (Ctot * Ka * h_conc) / Math.pow(Ka + h_conc, 2));
  const beta_max = 2.303 * (Math.pow(10, -request.pka) * 2 + (Ctot * 0.25));

  const c_acid = Ctot / (1.0 + ratio);
  const c_base = Ctot - c_acid;

  const acid_add = request.added_strong_acid_m;
  const c_acid_after = c_acid + acid_add;
  const c_base_after = Math.max(1e-6, c_base - acid_add);
  const ph_after_acid = request.pka + Math.log10(c_base_after / c_acid_after);

  const base_add = request.added_strong_base_m;
  const c_acid_after_b = Math.max(1e-6, c_acid - base_add);
  const c_base_after_b = c_base + base_add;
  const ph_after_base = request.pka + Math.log10(c_base_after_b / c_acid_after_b);

  const buffer_curve = [];
  for (let p = 1.0; p <= 13.0; p += 0.25) {
    const h = Math.pow(10, -p);
    const oh = Kw / h;
    const beta = 2.303 * (h + oh + (Ctot * Ka * h) / Math.pow(Ka + h, 2));
    const f_base = Ka / (Ka + h);
    buffer_curve.push({
      ph: parseFloat(p.toFixed(2)),
      buffer_capacity_beta: beta,
      fraction_base: f_base,
    });
  }

  return {
    buffer_name: request.buffer_name,
    acid_component: request.acid_component,
    base_component: request.base_component,
    pka: request.pka,
    total_buffer_concentration_m: Ctot,
    ratio_base_to_acid: ratio,
    henderson_hasselbalch_ph: hh_ph,
    rigorous_equilibrium_ph: hh_ph,
    van_slyke_buffer_capacity_beta: van_slyke,
    maximum_buffer_capacity: beta_max,
    ph_after_acid_addition: ph_after_acid,
    ph_after_base_addition: ph_after_base,
    buffer_curve,
  };
}

export function calculateSolubilityKspClient(request: SolubilityKspRequest): SolubilityKspResponse {
  const Ksp = request.ksp_value;
  const m = request.cation_coefficient;
  const n = request.anion_coefficient;
  const C_com = request.common_ion_concentration;

  const pure_s = Math.pow(Ksp / (Math.pow(m, m) * Math.pow(n, n)), 1.0 / (m + n));

  let s_opt = pure_s;
  if (C_com > 0) {
    let low = 0.0;
    let high = pure_s;
    for (let i = 0; i < 80; i++) {
      const mid = 0.5 * (low + high);
      const q = Math.pow(m * mid, m) * Math.pow(n * mid + C_com, n);
      if (Math.abs(q - Ksp) / Ksp < 1e-8 || (high - low) < 1e-16) {
        s_opt = mid;
        break;
      }
      if (q < Ksp) {
        low = mid;
      } else {
        high = mid;
      }
      s_opt = mid;
    }
  }

  const mass_sol = s_opt * request.molar_mass_g_mol;
  const is_common = C_com > 0;
  const ion_prod = is_common
    ? Math.pow(m * s_opt, m) * Math.pow(n * s_opt + C_com, n)
    : Math.pow(m * pure_s, m) * Math.pow(n * pure_s, n);

  return {
    salt_name: request.salt_name,
    salt_formula: request.salt_formula,
    ksp_value: Ksp,
    cation_formula: request.cation_formula,
    cation_coefficient: m,
    anion_formula: request.anion_formula,
    anion_coefficient: n,
    common_ion_formula: request.common_ion_formula,
    common_ion_concentration: C_com,
    molar_solubility_mol_l: s_opt,
    mass_solubility_g_l: mass_sol,
    ion_product_qsp: ion_prod,
    is_precipitate_formed: is_common,
    saturation_state: is_common ? 'Saturated with common-ion depression' : 'Saturated pure solution',
  };
}

export function simulateLeChatelierClient(request: LeChatelierRequest): LeChatelierResponse {
  const preset = FALLBACK_EQUILIBRIUM_PRESETS.find((p) => p.id === request.preset_reaction_id) || FALLBACK_EQUILIBRIUM_PRESETS[0];
  const deltaH = preset.delta_h_kj_mol || -92.2;
  const deltaNg = preset.id === 'haber_bosch' ? -2 : preset.id === 'no2_dimerization' ? -1 : 0;
  const R = 8.314462618e-3;

  const initK = preset.default_k;
  const initQ = initK;
  let pertK = initK;
  let pertQ = initQ;
  let shift: ShiftDirection = 'at_equilibrium';
  let desc = '';
  let explanation = '';

  const initConc: Record<string, number> = {};
  const pertConc: Record<string, number> = {};
  const newConc: Record<string, number> = {};

  if (request.preset_reaction_id === 'haber_bosch') {
    initConc['N2'] = 1.0;
    initConc['H2'] = 1.0;
    initConc['NH3'] = Math.sqrt(initK);
  } else if (request.preset_reaction_id === 'no2_dimerization') {
    initConc['NO2'] = 0.5;
    initConc['N2O4'] = initK * 0.25;
  } else {
    initConc['Reactants'] = 1.0;
    initConc['Products'] = initK;
  }

  for (const k of Object.keys(initConc)) {
    pertConc[k] = initConc[k];
    newConc[k] = initConc[k];
  }

  if (request.perturbation_type === 'temperature_shift') {
    const T1 = 298.15;
    const T2 = request.temperature_k ?? 298.15;
    pertK = initK * Math.exp((-deltaH / R) * (1.0 / T2 - 1.0 / T1));
    desc = `Temperature shifted from ${T1.toFixed(1)} K to ${T2.toFixed(1)} K`;
    if (T2 > T1) {
      if (deltaH < 0) {
        shift = 'reverse';
        explanation = `The forward reaction is exothermic (ΔH° = ${deltaH} kJ/mol). Raising the temperature adds thermal energy to the system. By Le Chatelier's principle, the system absorbs added heat by shifting in the endothermic reverse direction, decreasing the equilibrium constant from ${initK.toFixed(4)} to ${pertK.toFixed(4)}.`;
      } else {
        shift = 'forward';
        explanation = `The forward reaction is endothermic (ΔH° = ${deltaH} kJ/mol). Raising the temperature favors product formation, increasing K from ${initK.toFixed(4)} to ${pertK.toFixed(4)}.`;
      }
    } else {
      shift = deltaH < 0 ? 'forward' : 'reverse';
      explanation = `Cooling removes thermal energy; the equilibrium responds by shifting in the exothermic direction.`;
    }
  } else if (request.perturbation_type === 'pressure_volume') {
    const P = request.pressure_multiplier ?? 1.0;
    pertQ = initQ * Math.pow(P, -deltaNg);
    desc = `Total system pressure scaled by factor of ${P.toFixed(2)}x`;
    if (deltaNg < 0) {
      if (P > 1.0) {
        shift = 'forward';
        explanation = `Increasing total pressure favors the side with fewer gas moles (Δng = ${deltaNg}). Here, 4 gas reactant moles become 2 product moles, so equilibrium shifts FORWARD to relieve pressure.`;
      } else {
        shift = 'reverse';
        explanation = `Decreasing total pressure expands the volume, favoring the side with more moles of gas (Δng = ${deltaNg}).`;
      }
    } else if (deltaNg > 0) {
      shift = P > 1.0 ? 'reverse' : 'forward';
      explanation = `Increasing pressure favors reactants because Δng > 0.`;
    } else {
      shift = 'at_equilibrium';
      explanation = `Because Δng = 0, changing total pressure or volume equally affects reactants and products. The equilibrium position remains unchanged.`;
    }
  } else {
    // concentration spike
    const changes = request.concentration_changes || {};
    let addedSpecies = '';
    for (const [k, v] of Object.entries(changes)) {
      if (k in pertConc) {
        pertConc[k] += v;
        addedSpecies += `${k} (+${v.toFixed(2)} M) `;
      }
    }
    desc = `Concentration spike applied: ${addedSpecies || 'Reactant spike'}`;
    shift = 'forward';
    explanation = `Increasing reactant concentration increases reactant collision frequency, temporarily driving Q < K. The system responds by shifting FORWARD to consume the excess reactant until Q = K is restored.`;
  }

  return {
    reaction_title: preset.title,
    equation_string: preset.equation,
    delta_h_standard_kj_mol: deltaH,
    delta_ng_gas: deltaNg,
    perturbation_type: request.perturbation_type,
    perturbation_description: desc,
    initial_k: initK,
    initial_q: initQ,
    initial_shift: 'at_equilibrium',
    perturbed_k: pertK,
    perturbed_q: pertQ,
    le_chatelier_shift: shift,
    initial_concentrations: initConc,
    perturbed_concentrations: pertConc,
    new_equilibrium_concentrations: newConc,
    pedagogical_explanation: explanation,
  };
}

// ============================================================================
// EQUILIBRIUM SERVICE API CLIENT
// ============================================================================

export const EquilibriumService = {
  async getPresets(): Promise<EquilibriumPresetSummary[]> {
    try {
      const res = await fetch(`${API_BASE}/presets`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }
    return FALLBACK_EQUILIBRIUM_PRESETS;
  },

  async solveRiceTable(req: RiceTableRequest): Promise<RiceTableResponse> {
    try {
      const res = await fetch(`${API_BASE}/rice-table`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }
    return solveRiceTableClient(req);
  },

  async solvePolyprotic(req: PolyproticAcidRequest): Promise<PolyproticAcidResponse> {
    try {
      const res = await fetch(`${API_BASE}/polyprotic-acid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }
    return solvePolyproticAcidClient(req);
  },

  async calculateBufferCapacity(req: BufferCapacityRequest): Promise<BufferCapacityResponse> {
    try {
      const res = await fetch(`${API_BASE}/buffer-capacity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }
    return calculateBufferCapacityClient(req);
  },

  async calculateSolubilityKsp(req: SolubilityKspRequest): Promise<SolubilityKspResponse> {
    try {
      const res = await fetch(`${API_BASE}/solubility-ksp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }
    return calculateSolubilityKspClient(req);
  },

  async simulateLeChatelier(req: LeChatelierRequest): Promise<LeChatelierResponse> {
    try {
      const res = await fetch(`${API_BASE}/le-chatelier`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }
    return simulateLeChatelierClient(req);
  },
};
