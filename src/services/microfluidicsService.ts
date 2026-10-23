/**
 * Microfluidics & Continuous Flow Reactor Service.
 * Implements dual-layer architecture with full offline fallback computation.
 */

import {
  MicrofluidicChip,
  BenchmarkReactionInfo,
  HydrodynamicsRequest,
  HydrodynamicResult,
  DropletGenerationRequest,
  DropletGenerationResult,
  FlowReactionRequest,
  FlowReactionResult,
  MicrofluidicsCatalogResponse,
  FlowRegime,
  DropletRegime,
} from '../types/microfluidics';

export const CURATED_CHIPS: MicrofluidicChip[] = [
  {
    id: 'chip_pdms_t_junction',
    name: 'PDMS Microfluidic T-Junction',
    material: 'Polydimethylsiloxane (PDMS) / Glass',
    geometry: 't_junction',
    channel_width_um: 100.0,
    channel_height_um: 50.0,
    channel_length_mm: 30.0,
    description: 'Standard soft-lithography microfluidic chip for monodisperse water-in-oil emulsion droplet generation.',
  },
  {
    id: 'chip_quartz_flow_focusing',
    name: 'Quartz Flow-Focusing Droplet Generator',
    material: 'Fused Silica Quartz',
    geometry: 'flow_focusing',
    channel_width_um: 50.0,
    channel_height_um: 50.0,
    channel_length_mm: 45.0,
    description: 'Symmetric cross-junction hydrodynamic flow-focusing chip with high solvent compatibility and narrow orifice.',
  },
  {
    id: 'chip_capillary_tubular_reactor',
    name: 'Silicon/PTFE Micro-Tubular Flow Reactor',
    material: 'PTFE / Silicon-Pyrex',
    geometry: 'co_flow',
    channel_width_um: 250.0,
    channel_height_um: 250.0,
    channel_length_mm: 1500.0,
    description: 'High-throughput continuous-flow microcapillary reactor for synthetic intermediates, high pressure and thermal stability.',
  },
  {
    id: 'chip_chaotic_mixer_serpentine',
    name: 'Staggered Herringbone Serpentine Micro-Mixer',
    material: 'Cyclic Olefin Copolymer (COC)',
    geometry: 't_junction',
    channel_width_um: 200.0,
    channel_height_um: 75.0,
    channel_length_mm: 120.0,
    description: 'Passive micromixer with chaotic 3D streamlines promoting rapid transverse mass transfer under laminar flow.',
  },
];

export const CURATED_REACTIONS: BenchmarkReactionInfo[] = [
  {
    id: 'rxn_aunp_synthesis',
    name: 'Gold Nanoparticle (AuNP) Nucleation & Growth',
    reaction_type: 'Nanomaterial Synthesis',
    reagents: 'HAuCl4 (aq) + NaBH4 (aq) in segmented oil slugs',
    typical_temperature_c: 25.0,
    typical_residence_time_s: 12.0,
    k1_at_ref_temp: 0.45,
    k2_at_ref_temp: 0.03,
    description: 'Millisecond mixing in segmented microdroplets eliminates size polydispersity, producing monodisperse 4 nm gold seeds.',
  },
  {
    id: 'rxn_ester_saponification',
    name: 'Ethyl Acetate Saponification',
    reaction_type: 'Nucleophilic Acyl Substitution',
    reagents: 'CH3COOC2H5 + NaOH -> CH3COONa + C2H5OH',
    typical_temperature_c: 35.0,
    typical_residence_time_s: 45.0,
    k1_at_ref_temp: 0.11,
    k2_at_ref_temp: 0.0,
    description: 'Classic second-order alkaline hydrolysis bench flow benchmark with high thermal control.',
  },
  {
    id: 'rxn_azo_coupling',
    name: 'Fast Exothermic Azo-Dye Coupling',
    reaction_type: 'Electrophilic Aromatic Substitution (EAS)',
    reagents: '4-Nitrobenzenediazonium + 2-Naphthol -> Para Red',
    typical_temperature_c: 5.0,
    typical_residence_time_s: 4.5,
    k1_at_ref_temp: 1.20,
    k2_at_ref_temp: 0.08,
    description: 'Extremely rapid, highly exothermic reaction where microchannel heat dissipation (A/V > 10,000 m^-1) prevents thermal degradation.',
  },
  {
    id: 'rxn_ddpcr_emulsion',
    name: 'Droplet Digital PCR (ddPCR) Thermal Cycling',
    reaction_type: 'Enzymatic DNA Amplification',
    reagents: 'DNA Template, Taq Polymerase, Primers, EvaGreen in Fluorinated Oil',
    typical_temperature_c: 95.0,
    typical_residence_time_s: 60.0,
    k1_at_ref_temp: 0.08,
    k2_at_ref_temp: 0.002,
    description: 'Monodisperse 65 pL water-in-oil droplets partition genome copies into discrete single-molecule microreactors.',
  },
];

class MicrofluidicsService {
  private baseUrl = '/api/v1/chemistry/microfluidics';

  async getCatalog(): Promise<MicrofluidicsCatalogResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/catalog`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback to local catalog
    }
    return {
      chips: CURATED_CHIPS,
      reactions: CURATED_REACTIONS,
    };
  }

  async calculateHydrodynamics(req: HydrodynamicsRequest): Promise<HydrodynamicResult> {
    try {
      const res = await fetch(`${this.baseUrl}/hydrodynamics`, {
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
    return this.calculateHydrodynamicsLocally(req);
  }

  calculateHydrodynamicsLocally(req: HydrodynamicsRequest): HydrodynamicResult {
    const w = req.channel_width_um * 1e-6;
    const h = req.channel_height_um * 1e-6;
    const lM = req.channel_length_mm * 1e-3;

    const areaM2 = w * h;
    const dHM = (2.0 * w * h) / (w + h);
    const qM3S = (req.flow_rate_ul_min * 1e-9) / 60.0;
    const vMS = qM3S / areaM2;

    const re = (req.density_kg_m3 * vMS * dHM) / req.viscosity_pa_s;
    const ca = (req.viscosity_pa_s * vMS) / req.interfacial_tension_n_m;
    const pe = (vMS * dHM) / req.diffusion_coefficient_m2_s;

    let regime: FlowRegime = 'laminar';
    if (re < 1.0) regime = 'creeping_laminar';
    else if (re < 2000.0) regime = 'laminar';
    else if (re < 4000.0) regime = 'transitional';
    else regime = 'turbulent';

    const dimMin = Math.min(w, h);
    const dimMax = Math.max(w, h);
    const alpha = dimMin / dimMax;

    const denom = dimMax * Math.pow(dimMin, 3) * (1.0 - 0.63 * alpha);
    const deltaPPa = (12.0 * req.viscosity_pa_s * lM * qM3S) / Math.max(denom, 1e-25);
    const deltaPKpa = deltaPPa / 1000.0;
    const rH = deltaPPa / Math.max(qM3S, 1e-25);
    const tauW = (6.0 * req.viscosity_pa_s * vMS) / dimMin;

    return {
      reynolds_number: Number(re.toFixed(5)),
      capillary_number: Number(ca.toFixed(6)),
      peclet_number: Number(pe.toFixed(2)),
      flow_regime: regime,
      hydraulic_diameter_um: Number((dHM * 1e6).toFixed(2)),
      mean_velocity_m_s: Number(vMS.toFixed(6)),
      pressure_drop_kpa: Number(deltaPKpa.toFixed(4)),
      hydraulic_resistance_pa_s_m3: Number(rH.toFixed(2)),
      wall_shear_stress_pa: Number(tauW.toFixed(4)),
    };
  }

  async simulateDroplets(req: DropletGenerationRequest): Promise<DropletGenerationResult> {
    try {
      const res = await fetch(`${this.baseUrl}/droplet-generation`, {
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
    return this.simulateDropletsLocally(req);
  }

  simulateDropletsLocally(req: DropletGenerationRequest): DropletGenerationResult {
    const wM = req.channel_width_um * 1e-6;
    const hM = req.channel_height_um * 1e-6;
    const areaM2 = wM * hM;

    const qD = (req.dispersed_flow_rate_ul_min * 1e-9) / 60.0;
    const qC = (req.continuous_flow_rate_ul_min * 1e-9) / 60.0;
    const qTot = qD + qC;

    const vC = qC / areaM2;
    const vSlug = qTot / areaM2;

    const caC = (req.continuous_viscosity_pa_s * vC) / req.interfacial_tension_n_m;
    const flowRatio = qD / Math.max(qC, 1e-12);

    let regime: DropletRegime = 'squeezing';
    let alphaGeom = 1.35;
    if (caC < 0.015) {
      regime = 'squeezing';
      alphaGeom = req.geometry === 't_junction' ? 1.35 : 0.95;
    } else if (caC <= 0.12) {
      regime = 'dripping';
      alphaGeom = req.geometry === 't_junction' ? 1.05 : 0.7;
    } else {
      regime = 'jetting';
      alphaGeom = req.geometry === 't_junction' ? 0.65 : 0.45;
    }

    const lDropRatio = 1.0 + alphaGeom * flowRatio;
    const lDropM = lDropRatio * wM;

    let vDropM3 = wM * hM * lDropM - (1.0 - Math.PI / 4.0) * Math.pow(wM, 2) * hM;
    const vMin = (Math.PI / 6.0) * Math.pow(Math.min(wM, hM), 3);
    vDropM3 = Math.max(vDropM3, vMin);

    const vDropPl = vDropM3 / 1e-15;
    const freqHz = qD / Math.max(vDropM3, 1e-25);
    const dEqM = Math.pow((6.0 * vDropM3) / Math.PI, 1.0 / 3.0);
    const dEqUm = dEqM * 1e6;

    const dM2S = req.diffusion_coefficient_m2_s;
    const tauDiffS = Math.pow(wM, 2) / (Math.PI * Math.PI * dM2S);
    const unsegmentedMixMs = tauDiffS * 1000.0;

    const peDrop = (vSlug * wM) / dM2S;
    let tauMixS = (wM / Math.max(vSlug, 1e-6)) * Math.log(Math.max(peDrop, 2.0));
    tauMixS = Math.max(0.0001, Math.min(tauMixS, tauDiffS));
    const segmentedMixMs = tauMixS * 1000.0;
    const accelerationFold = unsegmentedMixMs / Math.max(segmentedMixMs, 1e-3);

    return {
      regime,
      droplet_volume_pl: Number(vDropPl.toFixed(2)),
      droplet_diameter_um: Number(dEqUm.toFixed(2)),
      generation_frequency_hz: Number(freqHz.toFixed(2)),
      droplet_length_um: Number((lDropM * 1e6).toFixed(2)),
      slug_velocity_m_s: Number(vSlug.toFixed(4)),
      mixing_time_ms: Number(segmentedMixMs.toFixed(2)),
      unsegmented_mixing_time_ms: Number(unsegmentedMixMs.toFixed(2)),
      mixing_acceleration_fold: Number(accelerationFold.toFixed(1)),
    };
  }

  async simulateFlowReactor(req: FlowReactionRequest): Promise<FlowReactionResult> {
    try {
      const res = await fetch(`${this.baseUrl}/flow-reactor`, {
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
    return this.simulateFlowReactorLocally(req);
  }

  simulateFlowReactorLocally(req: FlowReactionRequest): FlowReactionResult {
    const wM = req.channel_width_um * 1e-6;
    const hM = req.channel_height_um * 1e-6;
    const lM = req.channel_length_mm * 1e-3;
    const areaM2 = wM * hM;
    const volReactorM3 = areaM2 * lM;

    const qM3S = (req.total_flow_rate_ul_min * 1e-9) / 60.0;
    const vMS = qM3S / areaM2;
    const tauS = volReactorM3 / Math.max(qM3S, 1e-25);

    const dHM = (2.0 * wM * hM) / (wM + hM);
    const rho = 1000.0;
    const mu = 0.001;
    const re = (rho * vMS * dHM) / mu;

    const dM = 1.0e-9;
    const dAx = dM + (Math.pow(vMS, 2) * Math.pow(dHM, 2)) / (192.0 * dM);
    const bo = (vMS * lM) / Math.max(dAx, 1e-20);

    const tRef = 298.15;
    const eaJMol = 45000.0;
    const rGas = 8.314462618;
    const arrhenius = Math.exp(-(eaJMol / rGas) * (1.0 / req.temperature_k - 1.0 / tRef));

    const k1 = req.rate_constant_k1 * arrhenius;
    const k2 = req.rate_constant_k2 * arrhenius;

    const cA0 = req.initial_concentration_m;
    const cAEnd = cA0 * Math.exp(-k1 * tauS);
    const conversion = 1.0 - cAEnd / cA0;

    let cPEnd = 0;
    if (Math.abs(k1 - k2) > 1e-7) {
      cPEnd = cA0 * (k1 / (k2 - k1)) * (Math.exp(-k1 * tauS) - Math.exp(-k2 * tauS));
    } else {
      cPEnd = cA0 * k1 * tauS * Math.exp(-k1 * tauS);
    }
    cPEnd = Math.max(0.0, cPEnd);
    const cSEnd = Math.max(0.0, cA0 - cAEnd - cPEnd);

    const yieldP = cPEnd / cA0;
    const yieldS = cSEnd / cA0;
    const sty = ((cPEnd * req.molecular_weight_g_mol) / Math.max(tauS, 1e-4)) * 3600.0;

    const axialProfiles = [];
    const nPts = 21;
    for (let i = 0; i < nPts; i++) {
      const zFrac = i / (nPts - 1);
      const zM = zFrac * lM;
      const tLoc = zFrac * tauS;
      const caZ = cA0 * Math.exp(-k1 * tLoc);
      let cpZ = 0;
      if (Math.abs(k1 - k2) > 1e-7) {
        cpZ = cA0 * (k1 / (k2 - k1)) * (Math.exp(-k1 * tLoc) - Math.exp(-k2 * tLoc));
      } else {
        cpZ = cA0 * k1 * tLoc * Math.exp(-k1 * tLoc);
      }
      cpZ = Math.max(0.0, cpZ);
      const csZ = Math.max(0.0, cA0 - caZ - cpZ);

      axialProfiles.push({
        z_position_mm: Number((zM * 1000.0).toFixed(2)),
        fractional_length: Number(zFrac.toFixed(3)),
        residence_time_s: Number(tLoc.toFixed(3)),
        c_reactant_m: Number(caZ.toFixed(4)),
        c_product_m: Number(cpZ.toFixed(4)),
        c_byproduct_m: Number(csZ.toFixed(4)),
      });
    }

    const rtdCurve = [];
    const thetaSteps = 30;
    for (let j = 1; j <= thetaSteps; j++) {
      const theta = (j / thetaSteps) * 2.5;
      const variance = Math.max((4.0 * theta) / Math.max(bo, 1.0), 1e-6);
      const coeff = 1.0 / (2.0 * Math.sqrt((Math.PI * theta) / Math.max(bo, 1.0)));
      const expTerm = Math.exp(-Math.pow(1.0 - theta, 2) / variance);
      const eTheta = coeff * expTerm;

      rtdCurve.push({
        theta: Number(theta.toFixed(3)),
        time_s: Number((theta * tauS).toFixed(2)),
        e_theta: Number(eTheta.toFixed(4)),
      });
    }

    return {
      residence_time_s: Number(tauS.toFixed(3)),
      reynolds_number: Number(re.toFixed(4)),
      bodenstein_number: Number(bo.toFixed(2)),
      conversion: Number(conversion.toFixed(4)),
      intermediate_yield: Number(yieldP.toFixed(4)),
      byproduct_yield: Number(yieldS.toFixed(4)),
      space_time_yield_kg_m3_h: Number(sty.toFixed(2)),
      rtd_curve: rtdCurve,
      axial_concentration_profile: axialProfiles,
    };
  }
}

export const microfluidicsService = new MicrofluidicsService();
