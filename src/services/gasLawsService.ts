/**
 * Gas Laws & Phase Equilibria Frontend Client.
 * Connects to /api/v1/chemistry/gas-laws with analytical offline fallback calculations.
 */
import {
  IdealGasResult,
  VanDerWaalsResult,
  MaxwellBoltzmannResult,
  PhaseEquilibriumResult,
  RealGasConstants,
} from '../types/gasLaws';

const API_BASE = (import.meta.env?.VITE_API_URL || 'http://localhost:8000') + '/api/v1/chemistry/gas-laws';

export const FALLBACK_GAS_CONSTANTS: RealGasConstants[] = [
  { id: 'he', name: 'Helium', formula: 'He', molar_mass_g_mol: 4.003, vdw_a_l2_atm_mol2: 0.0346, vdw_b_l_mol: 0.0238, t_c_k: 5.19, p_c_atm: 2.24 },
  { id: 'h2', name: 'Hydrogen', formula: 'H2', molar_mass_g_mol: 2.016, vdw_a_l2_atm_mol2: 0.2450, vdw_b_l_mol: 0.0265, t_c_k: 33.2, p_c_atm: 12.8 },
  { id: 'n2', name: 'Nitrogen', formula: 'N2', molar_mass_g_mol: 28.013, vdw_a_l2_atm_mol2: 1.3700, vdw_b_l_mol: 0.0387, t_c_k: 126.2, p_c_atm: 33.5 },
  { id: 'o2', name: 'Oxygen', formula: 'O2', molar_mass_g_mol: 31.999, vdw_a_l2_atm_mol2: 1.3820, vdw_b_l_mol: 0.0319, t_c_k: 154.6, p_c_atm: 49.8 },
  { id: 'ch4', name: 'Methane', formula: 'CH4', molar_mass_g_mol: 16.043, vdw_a_l2_atm_mol2: 2.3030, vdw_b_l_mol: 0.0431, t_c_k: 190.6, p_c_atm: 45.4 },
  { id: 'co2', name: 'Carbon Dioxide', formula: 'CO2', molar_mass_g_mol: 44.010, vdw_a_l2_atm_mol2: 3.6580, vdw_b_l_mol: 0.0429, t_c_k: 304.2, p_c_atm: 72.8 },
  { id: 'nh3', name: 'Ammonia', formula: 'NH3', molar_mass_g_mol: 17.031, vdw_a_l2_atm_mol2: 4.2250, vdw_b_l_mol: 0.0371, t_c_k: 405.5, p_c_atm: 111.3 },
  { id: 'h2o', name: 'Water Vapor', formula: 'H2O', molar_mass_g_mol: 18.015, vdw_a_l2_atm_mol2: 5.5370, vdw_b_l_mol: 0.0305, t_c_k: 647.1, p_c_atm: 217.7 },
];

export const GasLawsService = {
  /**
   * Fetch real gas constants database.
   */
  async getConstants(): Promise<RealGasConstants[]> {
    try {
      const res = await fetch(`${API_BASE}/constants`);
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }
    return FALLBACK_GAS_CONSTANTS;
  },

  /**
   * Solve Ideal Gas Equation of State (PV = nRT).
   */
  async calculateIdealGas(
    pressureAtm?: number,
    volumeLiters?: number,
    moles?: number,
    temperatureK?: number,
    molarMassGMol?: number
  ): Promise<IdealGasResult> {
    try {
      const res = await fetch(`${API_BASE}/ideal/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pressure_atm: pressureAtm,
          volume_liters: volumeLiters,
          moles,
          temperature_k: temperatureK,
          molar_mass_g_mol: molarMassGMol,
        }),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    const R = 0.082057338;
    let p = pressureAtm;
    let v = volumeLiters;
    let n = moles;
    let t = temperatureK || 298.15;

    if (p === undefined && v && n) p = (n * R * t) / v;
    else if (v === undefined && p && n) v = (n * R * t) / p;
    else if (n === undefined && p && v) n = (p * v) / (R * t);
    else if (temperatureK === undefined && p && v && n) t = (p * v) / (n * R);

    p = p || 1.0;
    v = v || 24.465;
    n = n || 1.0;

    const density = molarMassGMol ? (p * molarMassGMol) / (R * t) : undefined;

    return {
      pressure_atm: Math.round(p * 10000) / 10000,
      volume_liters: Math.round(v * 10000) / 10000,
      moles: Math.round(n * 10000) / 10000,
      temperature_k: Math.round(t * 100) / 100,
      temperature_c: Math.round((t - 273.15) * 100) / 100,
      molar_volume_l_mol: Math.round((v / n) * 1000) / 1000,
      density_g_l: density ? Math.round(density * 1000) / 1000 : undefined,
      equation: 'PV = nRT',
      notes: 'Ideal gas behavior solved analytically.',
    };
  },

  /**
   * Simulate Van der Waals real gas compressibility and pressure.
   */
  async simulateVanDerWaals(
    gasId: string,
    moles: number = 1.0,
    temperatureK: number = 298.15,
    volumeLiters: number = 1.0
  ): Promise<VanDerWaalsResult> {
    try {
      const res = await fetch(`${API_BASE}/vanderwaals/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gas_id: gasId,
          moles,
          temperature_k: temperatureK,
          current_volume_liters: volumeLiters,
        }),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    const gas = FALLBACK_GAS_CONSTANTS.find((g) => g.id === gasId) || FALLBACK_GAS_CONSTANTS[5]; // CO2
    const R = 0.082057338;
    const nb = moles * gas.vdw_b_l_mol;
    const safeV = Math.max(volumeLiters, nb * 1.05);

    const pIdeal = (moles * R * temperatureK) / safeV;
    const pVdw = (moles * R * temperatureK) / (safeV - nb) - (gas.vdw_a_l2_atm_mol2 * moles * moles) / (safeV * safeV);
    const z = (pVdw * safeV) / (moles * R * temperatureK);
    const devPct = ((pVdw - pIdeal) / pIdeal) * 100;

    const points = [];
    for (let vol = Math.max(0.2, nb * 1.2); vol <= 5.0; vol += 0.2) {
      const pId = (moles * R * temperatureK) / vol;
      const pVd = (moles * R * temperatureK) / (vol - nb) - (gas.vdw_a_l2_atm_mol2 * moles * moles) / (vol * vol);
      points.push({
        volume_liters: Math.round(vol * 100) / 100,
        pressure_ideal_atm: Math.round(pId * 100) / 100,
        pressure_vdw_atm: Math.round(Math.max(0, pVd) * 100) / 100,
        compressibility_z: Math.round(((pVd * vol) / (moles * R * temperatureK)) * 1000) / 1000,
      });
    }

    return {
      gas_id: gas.id,
      gas_name: gas.name,
      moles,
      temperature_k: temperatureK,
      vdw_a_l2_atm_mol2: gas.vdw_a_l2_atm_mol2,
      vdw_b_l_mol: gas.vdw_b_l_mol,
      p_ideal_atm: Math.round(pIdeal * 1000) / 1000,
      p_vdw_atm: Math.round(pVdw * 1000) / 1000,
      compressibility_z: Math.round(z * 10000) / 10000,
      deviation_percent: Math.round(devPct * 100) / 100,
      regime: z < 1.0 ? 'Intermolecular attraction dominated (Z < 1)' : 'Excluded volume repulsion dominated (Z > 1)',
      isotherm_points: points,
      notes: `Van der Waals equation of state for ${gas.name}.`,
    };
  },

  /**
   * Calculate Maxwell-Boltzmann molecular velocity distribution.
   */
  async calculateMaxwellBoltzmann(
    gasName: string,
    molarMassGMol: number,
    temperatureK: number
  ): Promise<MaxwellBoltzmannResult> {
    try {
      const res = await fetch(`${API_BASE}/maxwell-boltzmann/distribution`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gas_name: gasName,
          molar_mass_g_mol: molarMassGMol,
          temperature_k: temperatureK,
        }),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    const mKg = molarMassGMol / 1000.0;
    const R_SI = 8.314462618;
    const vMp = Math.sqrt((2 * R_SI * temperatureK) / mKg);
    const vAvg = Math.sqrt((8 * R_SI * temperatureK) / (Math.PI * mKg));
    const vRms = Math.sqrt((3 * R_SI * temperatureK) / mKg);

    const points = [];
    const prefactor = 4 * Math.PI * Math.pow(mKg / (2 * Math.PI * R_SI * temperatureK), 1.5);
    for (let v = 0; v <= 2000; v += 40) {
      const exponent = -(mKg * v * v) / (2 * R_SI * temperatureK);
      const prob = prefactor * v * v * Math.exp(exponent);
      points.push({
        speed_m_s: v,
        probability_density: prob,
      });
    }

    return {
      gas_name: gasName,
      molar_mass_g_mol: molarMassGMol,
      temperature_k: temperatureK,
      v_mp_m_s: Math.round(vMp * 10) / 10,
      v_avg_m_s: Math.round(vAvg * 10) / 10,
      v_rms_m_s: Math.round(vRms * 10) / 10,
      mean_kinetic_energy_j: 1.5 * 1.380649e-23 * temperatureK,
      distribution_points: points,
    };
  },

  /**
   * Retrieve phase boundaries and Clausius-Clapeyron vapor pressure curve.
   */
  async getPhaseEquilibrium(substanceId: string): Promise<PhaseEquilibriumResult> {
    try {
      const res = await fetch(`${API_BASE}/phase-equilibrium`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ substance_id: substanceId }),
      });
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }

    return {
      substance_name: 'Water',
      formula: 'H2O',
      normal_boiling_point_c: 100.0,
      delta_h_vap_kj_mol: 40.66,
      normal_melting_point_c: 0.0,
      triple_point_t_c: 0.01,
      triple_point_p_kpa: 0.6117,
      critical_point_t_c: 374.0,
      critical_point_p_mpa: 22.06,
      vapor_pressure_curve: [
        { temperature_c: 20, temperature_k: 293.15, vapor_pressure_kpa: 2.34, vapor_pressure_atm: 0.0231 },
        { temperature_c: 50, temperature_k: 323.15, vapor_pressure_kpa: 12.35, vapor_pressure_atm: 0.1219 },
        { temperature_c: 100, temperature_k: 373.15, vapor_pressure_kpa: 101.33, vapor_pressure_atm: 1.0 },
      ],
    };
  },
};
