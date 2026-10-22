import {
  ChromatographyModality,
  ElutionMode,
  DetectorType,
  StationaryPhaseType,
  ColumnParameters,
  MobilePhaseConditions,
  VanDeemterParameters,
  AnalytePeak,
  ChromatogramDataPoint,
  ChromatographySimulationResult,
  ChromatographyPresetSummary,
  AnalyteCompoundInput,
} from '../types/chromatography';

const API_BASE = '/api/v1/chemistry/chromatography';

export const FALLBACK_CHROMATOGRAPHY_PRESETS: ChromatographyPresetSummary[] = [
  {
    id: 'analgesics_hplc',
    name: 'Over-the-Counter Analgesics Mixture',
    modality: 'hplc',
    elution_mode: 'isocratic',
    target_compounds: ['Acetaminophen', 'Caffeine', 'Aspirin', 'Ibuprofen'],
    description: 'Standard pharmaceutical QC separation of common analgesics on reversed-phase C18 with UV detection at 254 nm.',
    recommended_column: 'Zorbax Eclipse Plus C18 (150 x 4.6 mm, 3.5 µm)',
    recommended_conditions: 'Isocratic 45% Acetonitrile / 55% Acidified Water, 1.0 mL/min, 30°C.',
  },
  {
    id: 'parabens_hplc',
    name: 'Alkyl Paraben Preservatives Series',
    modality: 'hplc',
    elution_mode: 'gradient',
    target_compounds: ['Methylparaben', 'Ethylparaben', 'Propylparaben', 'Butylparaben'],
    description: 'Homologous alkyl 4-hydroxybenzoates demonstrating the linear free energy relationship between alkyl chain length and retention.',
    recommended_column: 'Hypersil GOLD C18 (100 x 3.0 mm, 3.0 µm)',
    recommended_conditions: 'Linear gradient 30% -> 85% Methanol over 10 min, 1.2 mL/min, 35°C.',
  },
  {
    id: 'nucleobases_hplc',
    name: 'DNA/RNA Nucleobases & Void Volume Marker',
    modality: 'hplc',
    elution_mode: 'isocratic',
    target_compounds: ['Uracil (t0 Marker)', 'Cytosine', 'Guanine', 'Thymine', 'Adenine'],
    description: 'Separation of fundamental nitrogenous bases with Uracil serving as the unretained void time (t0) column marker.',
    recommended_column: 'Inertsil ODS-3 (150 x 4.6 mm, 5.0 µm)',
    recommended_conditions: 'Isocratic 5% Acetonitrile / 95% 20 mM Phosphate Buffer pH 4.0, 0.8 mL/min, 25°C.',
  },
  {
    id: 'btex_gc',
    name: 'BTEX Volatile Monoaromatic Hydrocarbons',
    modality: 'gc',
    elution_mode: 'temperature_programmed',
    target_compounds: ['Benzene', 'Toluene', 'Ethylbenzene', 'p-Xylene', 'o-Xylene'],
    description: 'Environmental EPA 8260 GC-FID separation of benzene, toluene, ethylbenzene, and xylene isomers on a 5% diphenyl capillary column.',
    recommended_column: 'DB-5 Capillary (30 m x 0.25 mm x 0.25 µm)',
    recommended_conditions: 'Helium 1.2 mL/min, Temp 45°C -> 140°C at 8°C/min.',
  },
  {
    id: 'alcohols_gc',
    name: 'Aliphatic C1-C5 Alcohols Series',
    modality: 'gc',
    elution_mode: 'isothermal',
    target_compounds: ['Methanol', 'Ethanol', '1-Propanol', '1-Butanol', '1-Pentanol'],
    description: 'Homologous alcohol series demonstrating gas-phase partition equilibrium and hydrogen-bonding interactions on a polar Carbowax column.',
    recommended_column: 'DB-WAX Polyethylene Glycol (30 m x 0.32 mm x 0.5 µm)',
    recommended_conditions: 'Nitrogen 1.5 mL/min, Isothermal 85°C.',
  },
];

interface PresetConfig {
  name: string;
  modality: ChromatographyModality;
  elution_mode: ElutionMode;
  detector: DetectorType;
  column: ColumnParameters;
  conditions: MobilePhaseConditions;
  analytes: AnalyteCompoundInput[];
  pedagogical_notes: string;
}

const PRESET_CONFIGS: Record<string, PresetConfig> = {
  analgesics_hplc: {
    name: 'Over-the-Counter Analgesics Mixture',
    modality: 'hplc',
    elution_mode: 'isocratic',
    detector: 'uv_dad',
    column: {
      name: 'Zorbax Eclipse Plus C18',
      length_mm: 150.0,
      inner_diameter_mm: 4.6,
      particle_size_um: 3.5,
      film_thickness_um: 0.25,
      stationary_phase: 'c18_octadecyl',
      void_volume_ml: 1.45,
    },
    conditions: {
      flow_rate_ml_min: 1.0,
      modality: 'hplc',
      elution_mode: 'isocratic',
      solvent_a_name: 'Water (0.1% Formic Acid)',
      solvent_b_name: 'Acetonitrile',
      organic_percent: 45.0,
      gradient_start_percent: 10.0,
      gradient_end_percent: 90.0,
      gradient_time_min: 12.0,
      temperature_c: 30.0,
      temp_ramp_rate_c_min: 10.0,
      final_temperature_c: 250.0,
      carrier_gas: 'Helium',
    },
    analytes: [
      { compound_id: 'acetaminophen', compound_name: 'Acetaminophen (Paracetamol)', chemical_formula: 'C8H9NO2', molecular_weight: 151.16, log_kow: 0.46, concentration_mg_l: 40.0 },
      { compound_id: 'caffeine', compound_name: 'Caffeine', chemical_formula: 'C8H10N4O2', molecular_weight: 194.19, log_kow: -0.07, concentration_mg_l: 25.0 },
      { compound_id: 'aspirin', compound_name: 'Aspirin (Acetylsalicylic Acid)', chemical_formula: 'C9H8O4', molecular_weight: 180.16, log_kow: 1.19, concentration_mg_l: 50.0 },
      { compound_id: 'ibuprofen', compound_name: 'Ibuprofen', chemical_formula: 'C13H18O2', molecular_weight: 206.28, log_kow: 3.50, concentration_mg_l: 60.0 },
    ],
    pedagogical_notes: 'In reversed-phase C18 HPLC, retention order is primarily governed by analyte hydrophobicity (log Kow). More polar molecules (caffeine, acetaminophen) elute first, while lipophilic ibuprofen is strongly retained by the octadecyl stationary phase.',
  },
  parabens_hplc: {
    name: 'Alkyl Paraben Preservatives Series',
    modality: 'hplc',
    elution_mode: 'gradient',
    detector: 'uv_dad',
    column: {
      name: 'Hypersil GOLD C18',
      length_mm: 100.0,
      inner_diameter_mm: 3.0,
      particle_size_um: 3.0,
      film_thickness_um: 0.25,
      stationary_phase: 'c18_octadecyl',
      void_volume_ml: 0.95,
    },
    conditions: {
      flow_rate_ml_min: 1.2,
      modality: 'hplc',
      elution_mode: 'gradient',
      solvent_a_name: 'Water',
      solvent_b_name: 'Methanol',
      organic_percent: 50.0,
      gradient_start_percent: 30.0,
      gradient_end_percent: 85.0,
      gradient_time_min: 10.0,
      temperature_c: 35.0,
      temp_ramp_rate_c_min: 10.0,
      final_temperature_c: 250.0,
      carrier_gas: 'Helium',
    },
    analytes: [
      { compound_id: 'methylparaben', compound_name: 'Methylparaben', chemical_formula: 'C8H8O3', molecular_weight: 152.15, log_kow: 1.96, concentration_mg_l: 30.0 },
      { compound_id: 'ethylparaben', compound_name: 'Ethylparaben', chemical_formula: 'C9H10O3', molecular_weight: 166.17, log_kow: 2.47, concentration_mg_l: 30.0 },
      { compound_id: 'propylparaben', compound_name: 'Propylparaben', chemical_formula: 'C10H12O3', molecular_weight: 180.20, log_kow: 3.04, concentration_mg_l: 30.0 },
      { compound_id: 'butylparaben', compound_name: 'Butylparaben', chemical_formula: 'C11H14O3', molecular_weight: 194.23, log_kow: 3.57, concentration_mg_l: 30.0 },
    ],
    pedagogical_notes: 'Each additional methylene (-CH2-) unit in the alkyl ester tail contributes ~0.5 units to log Kow, extending retention on the nonpolar C18 phase. Gradient elution compresses later-eluting peaks, maintaining constant peak widths.',
  },
  nucleobases_hplc: {
    name: 'DNA/RNA Nucleobases & Void Volume Marker',
    modality: 'hplc',
    elution_mode: 'isocratic',
    detector: 'uv_dad',
    column: {
      name: 'Inertsil ODS-3',
      length_mm: 150.0,
      inner_diameter_mm: 4.6,
      particle_size_um: 5.0,
      film_thickness_um: 0.25,
      stationary_phase: 'c18_octadecyl',
      void_volume_ml: 1.60,
    },
    conditions: {
      flow_rate_ml_min: 0.8,
      modality: 'hplc',
      elution_mode: 'isocratic',
      solvent_a_name: '20 mM Phosphate Buffer (pH 4.0)',
      solvent_b_name: 'Acetonitrile',
      organic_percent: 5.0,
      gradient_start_percent: 5.0,
      gradient_end_percent: 40.0,
      gradient_time_min: 15.0,
      temperature_c: 25.0,
      temp_ramp_rate_c_min: 10.0,
      final_temperature_c: 250.0,
      carrier_gas: 'Helium',
    },
    analytes: [
      { compound_id: 'uracil', compound_name: 'Uracil (t0 Marker)', chemical_formula: 'C4H4N2O2', molecular_weight: 112.09, log_kow: -1.07, concentration_mg_l: 20.0 },
      { compound_id: 'cytosine', compound_name: 'Cytosine', chemical_formula: 'C4H5N3O', molecular_weight: 111.10, log_kow: -1.73, concentration_mg_l: 25.0 },
      { compound_id: 'guanine', compound_name: 'Guanine', chemical_formula: 'C5H5N5O', molecular_weight: 151.13, log_kow: -1.25, concentration_mg_l: 20.0 },
      { compound_id: 'thymine', compound_name: 'Thymine', chemical_formula: 'C5H6N2O2', molecular_weight: 126.11, log_kow: -0.17, concentration_mg_l: 25.0 },
      { compound_id: 'adenine', compound_name: 'Adenine', chemical_formula: 'C5H5N5', molecular_weight: 135.13, log_kow: -0.09, concentration_mg_l: 30.0 },
    ],
    pedagogical_notes: 'Uracil is completely unretained on reversed-phase columns in high-aqueous buffers, providing the standard experimental benchmark for dead volume (V0) and dead time (t0).',
  },
  btex_gc: {
    name: 'BTEX Volatile Monoaromatic Hydrocarbons',
    modality: 'gc',
    elution_mode: 'temperature_programmed',
    detector: 'fid',
    column: {
      name: 'DB-5 Capillary (5% Phenyl)',
      length_mm: 30000.0,
      inner_diameter_mm: 0.25,
      particle_size_um: 0.0,
      film_thickness_um: 0.25,
      stationary_phase: 'db_5_5_phenyl',
      void_volume_ml: 1.20,
    },
    conditions: {
      flow_rate_ml_min: 1.2,
      modality: 'gc',
      elution_mode: 'temperature_programmed',
      solvent_a_name: 'Helium',
      solvent_b_name: 'Helium',
      organic_percent: 100.0,
      gradient_start_percent: 0.0,
      gradient_end_percent: 0.0,
      gradient_time_min: 0.0,
      temperature_c: 45.0,
      temp_ramp_rate_c_min: 8.0,
      final_temperature_c: 140.0,
      carrier_gas: 'Helium',
    },
    analytes: [
      { compound_id: 'benzene', compound_name: 'Benzene', chemical_formula: 'C6H6', molecular_weight: 78.11, log_kow: 2.13, boiling_point_c: 80.1, concentration_mg_l: 50.0 },
      { compound_id: 'toluene', compound_name: 'Toluene', chemical_formula: 'C7H8', molecular_weight: 92.14, log_kow: 2.73, boiling_point_c: 110.6, concentration_mg_l: 50.0 },
      { compound_id: 'ethylbenzene', compound_name: 'Ethylbenzene', chemical_formula: 'C8H10', molecular_weight: 106.17, log_kow: 3.15, boiling_point_c: 136.2, concentration_mg_l: 50.0 },
      { compound_id: 'p_xylene', compound_name: 'p-Xylene', chemical_formula: 'C8H10', molecular_weight: 106.17, log_kow: 3.15, boiling_point_c: 138.4, concentration_mg_l: 45.0 },
      { compound_id: 'o_xylene', compound_name: 'o-Xylene', chemical_formula: 'C8H10', molecular_weight: 106.17, log_kow: 3.12, boiling_point_c: 144.4, concentration_mg_l: 50.0 },
    ],
    pedagogical_notes: 'In nonpolar capillary GC, elution order mirrors compound boiling points and vapor pressures. Temperature programming accelerates the elution of higher-boiling xylenes while preventing peak broadening.',
  },
  alcohols_gc: {
    name: 'Aliphatic C1-C5 Alcohols Series',
    modality: 'gc',
    elution_mode: 'isothermal',
    detector: 'fid',
    column: {
      name: 'DB-WAX Polyethylene Glycol',
      length_mm: 30000.0,
      inner_diameter_mm: 0.32,
      particle_size_um: 0.0,
      film_thickness_um: 0.50,
      stationary_phase: 'wax_polyethylene_glycol',
      void_volume_ml: 1.40,
    },
    conditions: {
      flow_rate_ml_min: 1.5,
      modality: 'gc',
      elution_mode: 'isothermal',
      solvent_a_name: 'Nitrogen',
      solvent_b_name: 'Nitrogen',
      organic_percent: 100.0,
      gradient_start_percent: 0.0,
      gradient_end_percent: 0.0,
      gradient_time_min: 0.0,
      temperature_c: 85.0,
      temp_ramp_rate_c_min: 0.0,
      final_temperature_c: 85.0,
      carrier_gas: 'Nitrogen',
    },
    analytes: [
      { compound_id: 'methanol', compound_name: 'Methanol', chemical_formula: 'CH4O', molecular_weight: 32.04, log_kow: -0.77, boiling_point_c: 64.7, concentration_mg_l: 30.0 },
      { compound_id: 'ethanol', compound_name: 'Ethanol', chemical_formula: 'C2H6O', molecular_weight: 46.07, log_kow: -0.31, boiling_point_c: 78.4, concentration_mg_l: 40.0 },
      { compound_id: '1_propanol', compound_name: '1-Propanol', chemical_formula: 'C3H8O', molecular_weight: 60.10, log_kow: 0.25, boiling_point_c: 97.2, concentration_mg_l: 40.0 },
      { compound_id: '1_butanol', compound_name: '1-Butanol', chemical_formula: 'C4H10O', molecular_weight: 74.12, log_kow: 0.88, boiling_point_c: 117.7, concentration_mg_l: 40.0 },
      { compound_id: '1_pentanol', compound_name: '1-Pentanol', chemical_formula: 'C5H12O', molecular_weight: 88.15, log_kow: 1.51, boiling_point_c: 138.0, concentration_mg_l: 45.0 },
    ],
    pedagogical_notes: 'Flame Ionization Detectors (FID) generate current from ion formation in a hydrogen-air flame, proportional to the number of reduced carbon atoms in the molecule.',
  },
};

export class ChromatographyService {
  async getPresets(): Promise<ChromatographyPresetSummary[]> {
    try {
      const resp = await fetch(`${API_BASE}/presets`);
      if (resp.ok) {
        return await resp.json();
      }
    } catch {
      // Fallback
    }
    return FALLBACK_CHROMATOGRAPHY_PRESETS;
  }

  async getPresetSimulation(
    presetId: string,
    flowRate?: number,
    organicPct?: number,
    tempC?: number
  ): Promise<ChromatographySimulationResult> {
    const params = new URLSearchParams();
    if (flowRate !== undefined) params.append('flow_rate', flowRate.toString());
    if (organicPct !== undefined) params.append('organic_percent', organicPct.toString());
    if (tempC !== undefined) params.append('temperature_c', tempC.toString());

    try {
      const url = `${API_BASE}/presets/${presetId}${params.toString() ? '?' + params.toString() : ''}`;
      const resp = await fetch(url);
      if (resp.ok) {
        return await resp.json();
      }
    } catch {
      // Fallback
    }

    return this.simulateFallbackPreset(presetId, flowRate, organicPct, tempC);
  }

  calculateVanDeemter(col: ColumnParameters, cond: MobilePhaseConditions): VanDeemterParameters {
    const colRadiusMm = col.inner_diameter_mm / 2.0;
    const colAreaMm2 = Math.PI * (colRadiusMm * colRadiusMm);

    let termA = 0;
    let termB = 0;
    let termC = 0;
    let linearVelocityMmS = 0;

    if (cond.modality === 'hplc') {
      const flowMm3S = (cond.flow_rate_ml_min * 1000.0) / 60.0;
      const porosity = 0.42;
      linearVelocityMmS = flowMm3S / (colAreaMm2 * porosity);
      termA = 1.8 * col.particle_size_um;
      termB = 2.4;
      termC = (col.particle_size_um * col.particle_size_um) / 30000.0;
    } else {
      const flowMm3S = (cond.flow_rate_ml_min * 1000.0) / 60.0;
      linearVelocityMmS = flowMm3S / colAreaMm2;
      termA = 0.0;
      const carrier = (cond.carrier_gas || '').toLowerCase();
      if (carrier.includes('hydrogen') || carrier.includes('h2')) {
        termB = 180.0;
        termC = 0.0008;
      } else if (carrier.includes('nitrogen') || carrier.includes('n2')) {
        termB = 50.0;
        termC = 0.0035;
      } else {
        termB = 120.0;
        termC = 0.0015;
      }
    }

    const uOpt = Math.sqrt(termB / Math.max(termC, 1e-6));
    const hMin = termA + 2.0 * Math.sqrt(termB * termC);
    const uClamped = Math.max(linearVelocityMmS, 0.05);
    const hOperating = termA + termB / uClamped + termC * uClamped;

    return {
      term_a_um: Number(termA.toFixed(2)),
      term_b_um_mm_s: Number(termB.toFixed(2)),
      term_c_s: Number(termC.toFixed(6)),
      optimal_velocity_mm_s: Number(uOpt.toFixed(2)),
      minimum_plate_height_um: Number(hMin.toFixed(2)),
      tested_velocity_mm_s: Number(linearVelocityMmS.toFixed(2)),
      operating_plate_height_um: Number(hOperating.toFixed(2)),
    };
  }

  simulateFallbackPreset(
    presetId: string,
    flowRate?: number,
    organicPct?: number,
    tempC?: number
  ): ChromatographySimulationResult {
    const config = PRESET_CONFIGS[presetId] || PRESET_CONFIGS.analgesics_hplc;
    const col = { ...config.column };
    const cond = { ...config.conditions };

    if (flowRate !== undefined && flowRate > 0) cond.flow_rate_ml_min = flowRate;
    if (organicPct !== undefined && organicPct >= 0) cond.organic_percent = organicPct;
    if (tempC !== undefined) cond.temperature_c = tempC;

    const vanDeemter = this.calculateVanDeemter(col, cond);
    const colLengthUm = col.length_mm * 1000.0;
    const nPlates = Math.max(500, Math.round(colLengthUm / Math.max(vanDeemter.operating_plate_height_um, 1.0)));
    const t0Min = col.void_volume_ml / Math.max(cond.flow_rate_ml_min, 0.05);

    const peaks: AnalytePeak[] = config.analytes.map((analyte) => {
      let kPrime = 0.1;
      if (cond.modality === 'hplc') {
        if (analyte.compound_id.toLowerCase().includes('uracil') || analyte.compound_name.toLowerCase().includes('marker')) {
          kPrime = 0.05;
        } else {
          const logKw = 0.65 * analyte.log_kow + 0.60;
          const sFactor = 0.20 * Math.sqrt(Math.max(analyte.molecular_weight, 50.0));
          if (cond.elution_mode === 'gradient') {
            const phiAvg = (cond.gradient_start_percent + cond.gradient_end_percent) / 200.0;
            kPrime = Math.pow(10.0, logKw - sFactor * phiAvg);
            const bGrad = (cond.gradient_end_percent - cond.gradient_start_percent) / (100.0 * Math.max(cond.gradient_time_min, 1.0));
            kPrime = kPrime / (1.0 + 2.3 * bGrad * kPrime);
          } else {
            const phi = cond.organic_percent / 100.0;
            kPrime = Math.pow(10.0, logKw - sFactor * phi);
          }
          const tempDelta = cond.temperature_c - 25.0;
          kPrime = kPrime * Math.exp(-0.018 * tempDelta);
        }
      } else {
        const bpC = analyte.boiling_point_c ?? analyte.molecular_weight * 1.5;
        if (cond.elution_mode === 'temperature_programmed') {
          const effectiveTemp = cond.temperature_c + (bpC - cond.temperature_c) * 0.35;
          kPrime = 0.8 * Math.exp(0.015 * (bpC - effectiveTemp));
        } else {
          kPrime = 0.5 * Math.exp(0.022 * (bpC - cond.temperature_c));
        }
      }
      kPrime = Math.max(kPrime, 0.05);

      const retentionTimeMin = t0Min * (1.0 + kPrime);
      const peakWidthBase = (4.0 * retentionTimeMin) / Math.sqrt(nPlates);
      const peakWidthHalf = (2.355 * retentionTimeMin) / Math.sqrt(nPlates);
      const area = analyte.concentration_mg_l * 12.0;
      const sigma = peakWidthBase / 4.0;
      const height = area / (sigma * Math.sqrt(2.0 * Math.PI) * 60.0);
      const tailing = 1.02 + 0.02 * Math.max(0.0, analyte.log_kow);

      return {
        compound_id: analyte.compound_id,
        compound_name: analyte.compound_name,
        chemical_formula: analyte.chemical_formula,
        molecular_weight: analyte.molecular_weight,
        retention_time_min: Number(retentionTimeMin.toFixed(3)),
        retention_factor_k: Number(kPrime.toFixed(3)),
        theoretical_plates_n: nPlates,
        peak_width_base_min: Number(peakWidthBase.toFixed(3)),
        peak_width_half_min: Number(peakWidthHalf.toFixed(3)),
        peak_height_mau: Number(height.toFixed(2)),
        peak_area_mau_s: Number(area.toFixed(2)),
        tailing_factor: Number(tailing.toFixed(2)),
      };
    });

    peaks.sort((a, b) => a.retention_time_min - b.retention_time_min);

    let minResolution = 999.0;
    for (let i = 1; i < peaks.length; i++) {
      const prev = peaks[i - 1];
      const curr = peaks[i];
      const deltaTr = curr.retention_time_min - prev.retention_time_min;
      const sumW = prev.peak_width_base_min + curr.peak_width_base_min;
      const rs = (2.0 * deltaTr) / Math.max(sumW, 0.001);
      const alpha = curr.retention_factor_k / Math.max(prev.retention_factor_k, 0.01);

      curr.resolution_with_previous = Number(rs.toFixed(2));
      curr.selectivity_with_previous = Number(alpha.toFixed(2));
      if (rs < minResolution) minResolution = rs;
    }
    if (peaks.length <= 1) minResolution = 3.0;

    let quality: 'baseline_resolved' | 'partial_overlap' | 'co_eluting' = 'baseline_resolved';
    if (minResolution < 1.0) quality = 'co_eluting';
    else if (minResolution < 1.5) quality = 'partial_overlap';

    const lastPeak = peaks[peaks.length - 1];
    const maxTr = lastPeak ? lastPeak.retention_time_min + 3.0 * lastPeak.peak_width_base_min : 10.0;
    const runTimeMin = Math.max(maxTr * 1.15, 6.0);

    // Generate chromatogram digitized profile
    const traceCount = 350;
    const dt = runTimeMin / (traceCount - 1);
    const trace: ChromatogramDataPoint[] = [];

    for (let i = 0; i < traceCount; i++) {
      const t = i * dt;
      let signal = 0;

      // Void volume disturbance
      if (Math.abs(t - t0Min) < 0.2) {
        signal += -0.5 * Math.exp(-0.5 * Math.pow((t - t0Min) / 0.05, 2));
      }

      for (const p of peaks) {
        const sigma = p.peak_width_base_min / 4.0;
        const tDiff = t - p.retention_time_min;
        const sigmaEff = tDiff > 0 ? sigma * p.tailing_factor : sigma;
        const exponent = -0.5 * Math.pow(tDiff / Math.max(sigmaEff, 0.005), 2);
        if (exponent > -12.0) {
          signal += p.peak_height_mau * Math.exp(exponent);
        }
      }

      const noise = Math.sin(t * 30.0) * 0.03 + Math.cos(t * 75.0) * 0.02;
      trace.push({
        time_min: Number(t.toFixed(3)),
        signal_intensity: Number(Math.max(0.0, signal + noise).toFixed(3)),
      });
    }

    return {
      simulation_id: `chrom-${cond.modality}-${Math.round(t0Min * 100)}`,
      sample_name: config.name,
      modality: cond.modality,
      elution_mode: cond.elution_mode,
      detector: config.detector,
      run_time_min: Number(runTimeMin.toFixed(2)),
      dead_time_t0_min: Number(t0Min.toFixed(3)),
      column: col,
      conditions: cond,
      van_deemter: vanDeemter,
      peaks,
      chromatogram_trace: trace,
      mean_theoretical_plates: nPlates,
      minimum_resolution: Number(minResolution.toFixed(2)),
      separation_quality: quality,
      pedagogical_notes: config.pedagogical_notes,
    };
  }
}

export const chromatographyService = new ChromatographyService();
