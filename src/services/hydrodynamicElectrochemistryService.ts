/**
 * Hydrodynamic Electrochemistry Frontend Service.
 * Implements dual-layer architecture with full offline fallback computation for RDE, RRDE, and ASV.
 */

import {
  RdeSimulationRequest,
  RdeSimulationResult,
  StrippingVoltammetryRequest,
  StrippingVoltammetryResult,
  ChronocoulometryRequest,
  ChronocoulometryResult,
  CuratedMetalStandard,
  HydrodynamicElectrochemistryCatalogResponse,
  StrippingPeak,
  StrippingPoint,
  RdeHydrodynamicPoint,
  KouteckyLevichPoint,
  VoltammogramWavePoint,
  AnsonPoint,
} from '../types/hydrodynamicElectrochemistry';

const FARADAY = 96485.33212;
const R_GAS = 8.314462618;
const T_STD = 298.15;

export const CURATED_METALS: CuratedMetalStandard[] = [
  {
    metal: 'Zinc',
    symbol: 'Zn',
    redox_couple: 'Zn2+ / Zn(Hg)',
    standard_potential_v_she: -0.763,
    asv_peak_potential_v: -1.02,
    who_drinking_water_limit_ppb: 3000.0,
    description: 'Active divalent cation forming amalgams with mercury and bismuth, giving sharp anodic stripping peak.',
  },
  {
    metal: 'Cadmium',
    symbol: 'Cd',
    redox_couple: 'Cd2+ / Cd(Hg)',
    standard_potential_v_she: -0.403,
    asv_peak_potential_v: -0.64,
    who_drinking_water_limit_ppb: 3.0,
    description: 'Highly toxic environmental pollutant, easily resolved from lead and zinc at sub-ppb concentrations.',
  },
  {
    metal: 'Lead',
    symbol: 'Pb',
    redox_couple: 'Pb2+ / Pb(Hg)',
    standard_potential_v_she: -0.126,
    asv_peak_potential_v: -0.44,
    who_drinking_water_limit_ppb: 10.0,
    description: 'Priority heavy metal contaminant with high preconcentration efficiency and steep stripping signal.',
  },
  {
    metal: 'Copper',
    symbol: 'Cu',
    redox_couple: 'Cu2+ / Cu(Hg)',
    standard_potential_v_she: 0.342,
    asv_peak_potential_v: 0.02,
    who_drinking_water_limit_ppb: 2000.0,
    description: 'Noble-shifted transition metal stripped near zero volts vs Ag/AgCl, demonstrating broad working potential window.',
  },
];

export const ELECTRODES_INFO = [
  { type: 'glassy_carbon', name: 'Glassy Carbon (GC)', window: '-0.8 V to +1.2 V vs Ag/AgCl', best_for: 'RDE / RRDE kinetics' },
  { type: 'platinum_disk', name: 'Platinum Disk (Pt)', window: '-0.2 V to +1.3 V vs Ag/AgCl', best_for: 'Ferrocyanide & ORR' },
  { type: 'gold_disk', name: 'Gold Disk (Au)', window: '-0.5 V to +1.4 V vs Ag/AgCl', best_for: 'Arsenic & Mercury ASV' },
  { type: 'bismuth_film', name: 'Bismuth Film Electrode (BiFE)', window: '-1.4 V to -0.1 V vs Ag/AgCl', best_for: 'Green heavy metal ASV' },
  { type: 'mercury_film', name: 'Mercury Film (MFE)', window: '-1.6 V to +0.2 V vs Ag/AgCl', best_for: 'High hydrogen overpotential ASV' },
  { type: 'boron_doped_diamond', name: 'Boron-Doped Diamond (BDD)', window: '-1.5 V to +2.5 V vs Ag/AgCl', best_for: 'Extreme wide potential window' },
];

class HydrodynamicElectrochemistryService {
  private baseUrl = '/api/v1/chemistry/hydrodynamic-electrochemistry';

  async getCatalog(): Promise<HydrodynamicElectrochemistryCatalogResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/catalog`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return {
      metals: CURATED_METALS,
      electrodes: ELECTRODES_INFO,
    };
  }

  async simulateRde(req: RdeSimulationRequest): Promise<RdeSimulationResult> {
    try {
      const res = await fetch(`${this.baseUrl}/simulate-rde`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return this.simulateRdeLocally(req);
  }

  simulateRdeLocally(req: RdeSimulationRequest): RdeSimulationResult {
    const rCm = req.electrode_radius_mm * 0.1;
    const areaCm2 = Math.PI * Math.pow(rCm, 2);
    const cBulk = req.concentration_mm * 1e-6;
    const d = req.diffusion_coefficient_cm2_s;
    const nu = req.kinematic_viscosity_cm2_s;
    const n = req.n_electrons;

    const bLevich = 0.62 * n * FARADAY * areaCm2 * Math.pow(d, 2.0 / 3.0) * Math.pow(nu, -1.0 / 6.0) * cBulk;
    const bLevichUa = bLevich * 1e6;

    const etaV = (req.overpotential_mv ?? 250.0) * 1e-3;
    const alpha = req.transfer_coefficient_alpha ?? 0.5;
    const k0 = req.heterogeneous_rate_constant_k0_cm_s ?? 0.02;
    const kEta = k0 * Math.exp(((1.0 - alpha) * n * FARADAY * etaV) / (R_GAS * T_STD));
    const iKAmp = n * FARADAY * areaCm2 * kEta * cBulk;
    const iKUa = iKAmp * 1e6;

    const levichPoints: RdeHydrodynamicPoint[] = [];
    const klPoints: KouteckyLevichPoint[] = [];

    for (const rpm of req.rotation_speeds_rpm) {
      const omega = rpm * ((2.0 * Math.PI) / 60.0);
      const sqrtOmega = Math.sqrt(omega);
      const iLUa = bLevichUa * sqrtOmega;
      const iTotUa = (iKUa * iLUa) / (iKUa + iLUa);

      const deltaHCm = (1.61 * Math.pow(d, 1.0 / 3.0) * Math.pow(nu, 1.0 / 6.0)) / Math.max(sqrtOmega, 1e-6);
      const deltaHUm = deltaHCm * 1e4;

      levichPoints.push({
        rotation_speed_rpm: Number(rpm.toFixed(1)),
        angular_velocity_rad_s: Number(omega.toFixed(2)),
        sqrt_angular_velocity: Number(sqrtOmega.toFixed(3)),
        limiting_current_ua: Number(iTotUa.toFixed(2)),
        hydrodynamic_boundary_layer_um: Number(deltaHUm.toFixed(2)),
        kinetic_current_ua: Number(iKUa.toFixed(2)),
      });

      klPoints.push({
        inv_sqrt_omega: Number((1.0 / Math.max(sqrtOmega, 1e-6)).toFixed(4)),
        inv_current_ua: Number((1.0 / Math.max(iTotUa, 1e-6)).toFixed(5)),
      });
    }

    const polarizationWaves: Record<string, VoltammogramWavePoint[]>[] = [];
    const eHalf = 0.22;
    const potentials: number[] = [];
    for (let i = 0; i <= 40; i++) {
      potentials.push(Number((eHalf - 0.2 + i * 0.01).toFixed(3)));
    }

    for (const pt of levichPoints) {
      const wavePts: VoltammogramWavePoint[] = [];
      const iLim = pt.limiting_current_ua;
      for (const pot of potentials) {
        const expArg = Math.max(-30.0, Math.min(30.0, (n * FARADAY * (pot - eHalf)) / (R_GAS * T_STD)));
        const iDisk = iLim / (1.0 + Math.exp(-expArg));
        const iRing = -0.38 * iDisk;
        wavePts.push({
          potential_v: pot,
          current_disk_ua: Number(iDisk.toFixed(3)),
          current_ring_ua: Number(iRing.toFixed(3)),
        });
      }
      polarizationWaves.push({ [`${Math.round(pt.rotation_speed_rpm)}_rpm`]: wavePts });
    }

    return {
      system_name: req.system_name ?? 'RDE System',
      electrode_type: req.electrode_type,
      electrode_area_cm2: Number(areaCm2.toFixed(4)),
      diffusion_coefficient_cm2_s: d,
      kinematic_viscosity_cm2_s: nu,
      concentration_mm: req.concentration_mm,
      n_electrons: n,
      levich_slope_ua_s_half: Number(bLevichUa.toFixed(4)),
      levich_points: levichPoints,
      koutecky_levich_points: klPoints,
      heterogeneous_rate_constant_k0_cm_s: k0,
      rrde_collection_efficiency_theoretical: 0.38,
      polarization_waves: polarizationWaves,
    };
  }

  async simulateStripping(req: StrippingVoltammetryRequest): Promise<StrippingVoltammetryResult> {
    try {
      const res = await fetch(`${this.baseUrl}/simulate-stripping`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return this.simulateStrippingLocally(req);
  }

  simulateStrippingLocally(req: StrippingVoltammetryRequest): StrippingVoltammetryResult {
    const preconcFactor = 1.0 + (req.deposition_time_s / 10.0) * 8.5;

    const metalConfigs = [
      { name: 'Zinc', sym: 'Zn', ePeak: -1.02, conc: req.zn_concentration_ppb, lod: 0.5 },
      { name: 'Cadmium', sym: 'Cd', ePeak: -0.64, conc: req.cd_concentration_ppb, lod: 0.05 },
      { name: 'Lead', sym: 'Pb', ePeak: -0.44, conc: req.pb_concentration_ppb, lod: 0.08 },
      { name: 'Copper', sym: 'Cu', ePeak: 0.02, conc: req.cu_concentration_ppb, lod: 0.2 },
    ];

    const detectedPeaks: StrippingPeak[] = [];
    const freq = req.square_wave_frequency_hz ?? 25.0;
    const amp = req.square_wave_amplitude_mv ?? 25.0;

    for (const m of metalConfigs) {
      if (m.conc > 0) {
        const sens = 0.0085 * 4.0 * (freq / 25.0) * (amp / 25.0) * (req.deposition_time_s / 60.0);
        const ipUa = m.conc * sens;
        detectedPeaks.push({
          metal_ion: `${m.name} (${m.sym}2+)`,
          symbol: m.sym,
          peak_potential_v: m.ePeak,
          peak_current_ua: Number(ipUa.toFixed(3)),
          fwhm_mv: 55.0,
          concentration_ppb: Number(m.conc.toFixed(2)),
          detection_limit_ppb: m.lod,
        });
      }
    }

    const strippingCurve: StrippingPoint[] = [];
    const nSteps = 151;
    const eStart = -1.25;
    const eEnd = 0.25;
    const stepV = (eEnd - eStart) / (nSteps - 1);
    const sigma = 0.0233;

    for (let i = 0; i < nSteps; i++) {
      const eCurr = eStart + i * stepV;
      const iBg = 0.05 + 0.04 * (eCurr + 1.25);
      let iFaradaic = 0;
      for (const pk of detectedPeaks) {
        const dE = eCurr - pk.peak_potential_v;
        iFaradaic += pk.peak_current_ua * Math.exp(-Math.pow(dE, 2) / (2.0 * Math.pow(sigma, 2)));
      }
      const iTot = iBg + iFaradaic;
      strippingCurve.push({
        potential_v: Number(eCurr.toFixed(3)),
        current_total_ua: Number(iTot.toFixed(4)),
        current_background_ua: Number(iBg.toFixed(4)),
        current_stripping_ua: Number(iFaradaic.toFixed(4)),
      });
    }

    return {
      analyte_name: req.sample_name ?? 'Water Sample',
      deposition_potential_v: req.deposition_potential_v,
      deposition_time_s: req.deposition_time_s,
      stripping_mode: req.stripping_mode,
      peaks_detected: detectedPeaks,
      stripping_curve: strippingCurve,
      preconcentration_factor: Number(preconcFactor.toFixed(1)),
      pedagogical_insights: `Anodic Stripping Voltammetry with ${req.electrode_type} yielded a ${preconcFactor.toFixed(0)}× preconcentration enhancement.`,
    };
  }

  async simulateChronocoulometry(req: ChronocoulometryRequest): Promise<ChronocoulometryResult> {
    try {
      const res = await fetch(`${this.baseUrl}/simulate-chronocoulometry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return this.simulateChronocoulometryLocally(req);
  }

  simulateChronocoulometryLocally(req: ChronocoulometryRequest): ChronocoulometryResult {
    const cBulk = req.concentration_mm * 1e-6;
    const area = req.electrode_area_cm2;
    const n = req.n_electrons;
    const d = req.diffusion_coefficient_cm2_s;

    const ansonSlopeC = (2.0 * n * FARADAY * area * Math.sqrt(d) * cBulk) / Math.sqrt(Math.PI);
    const ansonSlopeUc = ansonSlopeC * 1e6;

    const qDlUc = req.double_layer_capacitance_uf_cm2 * area * req.potential_step_v;
    const qAdsC = n * FARADAY * area * req.surface_excess_gamma_mol_cm2;
    const qAdsUc = qAdsC * 1e6;

    const ansonPoints: AnsonPoint[] = [];
    const nPts = 30;
    for (let i = 1; i <= nPts; i++) {
      const tS = (i / nPts) * req.step_duration_s;
      const sqrtT = Math.sqrt(tS);
      const qDiffUc = ansonSlopeUc * sqrtT;
      const qTotUc = qDiffUc + qDlUc + qAdsUc;

      ansonPoints.push({
        time_s: Number(tS.toFixed(4)),
        sqrt_time_s: Number(sqrtT.toFixed(4)),
        charge_total_uc: Number(qTotUc.toFixed(3)),
        charge_diffusional_uc: Number(qDiffUc.toFixed(3)),
        charge_double_layer_uc: Number(qDlUc.toFixed(3)),
        charge_adsorption_uc: Number(qAdsUc.toFixed(3)),
      });
    }

    return {
      system_name: req.system_name ?? 'Chronocoulometry System',
      double_layer_charge_uc: Number(qDlUc.toFixed(3)),
      surface_excess_gamma_mol_cm2: req.surface_excess_gamma_mol_cm2,
      diffusion_coefficient_cm2_s: req.diffusion_coefficient_cm2_s,
      anson_slope_uc_s_half: Number(ansonSlopeUc.toFixed(3)),
      anson_points: ansonPoints,
    };
  }
}

export const hydrodynamicElectrochemistryService = new HydrodynamicElectrochemistryService();
