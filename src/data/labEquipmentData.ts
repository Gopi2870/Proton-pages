export interface LabApparatus {
  id: string;
  name: string;
  category: 'Glassware' | 'Analytical Instruments' | 'Thermal & Mixing' | 'Safety & Containment';
  modelNumber: string;
  manufacturer: string;
  capacityOrRange: string;
  precision: string;
  operatingTempRangeC: string;
  materialComposition: string;
  standardCalibrationIntervalDays: number;
  maintenanceProcedures: string[];
  safetyPrecautions: string[];
  primaryAnalyticalUse: string;
}

export const LAB_EQUIPMENT_REGISTRY: LabApparatus[] = [
  {
    id: 'app-001',
    name: 'Analytical Dual-Range Microbalance (Unit #1)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1000',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '25 mL / 10 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +200 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-002',
    name: 'Digital Variable-Speed Burette 50mL (Unit #2)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1001',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '50 mL / 20 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +205 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-003',
    name: 'Double-Beam UV-Vis Spectrophotometer (Unit #3)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1002',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '75 mL / 30 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +210 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-004',
    name: 'Rotary Vacuum Evaporator with Chiller (Unit #4)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1003',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '100 mL / 40 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +215 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-005',
    name: 'Inert Atmosphere Argon Glovebox (Unit #5)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1004',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '125 mL / 50 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +220 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-006',
    name: 'Benchtop High-Speed Refrigerated Centrifuge (Unit #6)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1005',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '150 mL / 60 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +225 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-007',
    name: 'Magnetic Hotplate Stirrer with PT1000 Probe (Unit #7)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1006',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '175 mL / 70 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +230 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-008',
    name: 'Fourier-Transform Infrared Spectrometer (FTIR) (Unit #8)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1007',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '200 mL / 80 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +235 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-009',
    name: 'Precision pH/ISE Benchtop Meter with ATC (Unit #9)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1008',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '225 mL / 90 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +240 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-010',
    name: 'Differential Scanning Calorimeter (DSC) (Unit #10)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1009',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '250 mL / 100 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +245 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-011',
    name: 'Jacketed Glass Chemical Reactor 2L (Unit #11)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1010',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '275 mL / 110 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +250 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-012',
    name: 'Schlenk Line High-Vacuum Manifold (Unit #12)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1011',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '300 mL / 120 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +255 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-013',
    name: 'Analytical Dual-Range Microbalance (Unit #13)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1012',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '325 mL / 130 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +260 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-014',
    name: 'Digital Variable-Speed Burette 50mL (Unit #14)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1013',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '350 mL / 140 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +265 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-015',
    name: 'Double-Beam UV-Vis Spectrophotometer (Unit #15)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1014',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '375 mL / 150 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +270 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-016',
    name: 'Rotary Vacuum Evaporator with Chiller (Unit #16)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1015',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '400 mL / 160 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +275 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-017',
    name: 'Inert Atmosphere Argon Glovebox (Unit #17)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1016',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '425 mL / 170 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +280 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-018',
    name: 'Benchtop High-Speed Refrigerated Centrifuge (Unit #18)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1017',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '450 mL / 180 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +285 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-019',
    name: 'Magnetic Hotplate Stirrer with PT1000 Probe (Unit #19)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1018',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '475 mL / 190 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +290 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-020',
    name: 'Fourier-Transform Infrared Spectrometer (FTIR) (Unit #20)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1019',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '500 mL / 200 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +295 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-021',
    name: 'Precision pH/ISE Benchtop Meter with ATC (Unit #21)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1020',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '525 mL / 210 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +300 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-022',
    name: 'Differential Scanning Calorimeter (DSC) (Unit #22)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1021',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '550 mL / 220 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +305 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-023',
    name: 'Jacketed Glass Chemical Reactor 2L (Unit #23)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1022',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '575 mL / 230 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +310 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-024',
    name: 'Schlenk Line High-Vacuum Manifold (Unit #24)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1023',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '600 mL / 240 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +315 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-025',
    name: 'Analytical Dual-Range Microbalance (Unit #25)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1024',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '625 mL / 250 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +320 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-026',
    name: 'Digital Variable-Speed Burette 50mL (Unit #26)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1025',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '650 mL / 260 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +325 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-027',
    name: 'Double-Beam UV-Vis Spectrophotometer (Unit #27)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1026',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '675 mL / 270 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +330 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-028',
    name: 'Rotary Vacuum Evaporator with Chiller (Unit #28)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1027',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '700 mL / 280 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +335 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-029',
    name: 'Inert Atmosphere Argon Glovebox (Unit #29)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1028',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '725 mL / 290 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +340 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-030',
    name: 'Benchtop High-Speed Refrigerated Centrifuge (Unit #30)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1029',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '750 mL / 300 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +345 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-031',
    name: 'Magnetic Hotplate Stirrer with PT1000 Probe (Unit #31)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1030',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '775 mL / 310 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +350 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-032',
    name: 'Fourier-Transform Infrared Spectrometer (FTIR) (Unit #32)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1031',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '800 mL / 320 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +355 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-033',
    name: 'Precision pH/ISE Benchtop Meter with ATC (Unit #33)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1032',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '825 mL / 330 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +360 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-034',
    name: 'Differential Scanning Calorimeter (DSC) (Unit #34)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1033',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '850 mL / 340 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +365 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-035',
    name: 'Jacketed Glass Chemical Reactor 2L (Unit #35)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1034',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '875 mL / 350 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +370 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-036',
    name: 'Schlenk Line High-Vacuum Manifold (Unit #36)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1035',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '900 mL / 360 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +375 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-037',
    name: 'Analytical Dual-Range Microbalance (Unit #37)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1036',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '925 mL / 370 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +380 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-038',
    name: 'Digital Variable-Speed Burette 50mL (Unit #38)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1037',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '950 mL / 380 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +385 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-039',
    name: 'Double-Beam UV-Vis Spectrophotometer (Unit #39)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1038',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '975 mL / 390 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +390 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-040',
    name: 'Rotary Vacuum Evaporator with Chiller (Unit #40)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1039',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1000 mL / 400 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +395 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-041',
    name: 'Inert Atmosphere Argon Glovebox (Unit #41)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1040',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1025 mL / 410 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +400 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-042',
    name: 'Benchtop High-Speed Refrigerated Centrifuge (Unit #42)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1041',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1050 mL / 420 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +405 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-043',
    name: 'Magnetic Hotplate Stirrer with PT1000 Probe (Unit #43)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1042',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1075 mL / 430 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +410 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-044',
    name: 'Fourier-Transform Infrared Spectrometer (FTIR) (Unit #44)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1043',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1100 mL / 440 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +415 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-045',
    name: 'Precision pH/ISE Benchtop Meter with ATC (Unit #45)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1044',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1125 mL / 450 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +420 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-046',
    name: 'Differential Scanning Calorimeter (DSC) (Unit #46)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1045',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1150 mL / 460 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +425 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-047',
    name: 'Jacketed Glass Chemical Reactor 2L (Unit #47)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1046',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1175 mL / 470 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +430 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-048',
    name: 'Schlenk Line High-Vacuum Manifold (Unit #48)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1047',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1200 mL / 480 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +435 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-049',
    name: 'Analytical Dual-Range Microbalance (Unit #49)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1048',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1225 mL / 490 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +440 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-050',
    name: 'Digital Variable-Speed Burette 50mL (Unit #50)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1049',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1250 mL / 500 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +445 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-051',
    name: 'Double-Beam UV-Vis Spectrophotometer (Unit #51)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1050',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1275 mL / 510 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +450 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-052',
    name: 'Rotary Vacuum Evaporator with Chiller (Unit #52)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1051',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1300 mL / 520 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +455 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-053',
    name: 'Inert Atmosphere Argon Glovebox (Unit #53)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1052',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1325 mL / 530 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +460 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-054',
    name: 'Benchtop High-Speed Refrigerated Centrifuge (Unit #54)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1053',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1350 mL / 540 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +465 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-055',
    name: 'Magnetic Hotplate Stirrer with PT1000 Probe (Unit #55)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1054',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1375 mL / 550 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +470 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-056',
    name: 'Fourier-Transform Infrared Spectrometer (FTIR) (Unit #56)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1055',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1400 mL / 560 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +475 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-057',
    name: 'Precision pH/ISE Benchtop Meter with ATC (Unit #57)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1056',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1425 mL / 570 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +480 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-058',
    name: 'Differential Scanning Calorimeter (DSC) (Unit #58)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1057',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1450 mL / 580 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +485 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-059',
    name: 'Jacketed Glass Chemical Reactor 2L (Unit #59)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1058',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1475 mL / 590 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +490 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-060',
    name: 'Schlenk Line High-Vacuum Manifold (Unit #60)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1059',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1500 mL / 600 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +495 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-061',
    name: 'Analytical Dual-Range Microbalance (Unit #61)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1060',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1525 mL / 610 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +500 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-062',
    name: 'Digital Variable-Speed Burette 50mL (Unit #62)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1061',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1550 mL / 620 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +505 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-063',
    name: 'Double-Beam UV-Vis Spectrophotometer (Unit #63)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1062',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1575 mL / 630 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +510 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-064',
    name: 'Rotary Vacuum Evaporator with Chiller (Unit #64)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1063',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1600 mL / 640 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +515 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-065',
    name: 'Inert Atmosphere Argon Glovebox (Unit #65)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1064',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1625 mL / 650 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +520 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-066',
    name: 'Benchtop High-Speed Refrigerated Centrifuge (Unit #66)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1065',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1650 mL / 660 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +525 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-067',
    name: 'Magnetic Hotplate Stirrer with PT1000 Probe (Unit #67)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1066',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1675 mL / 670 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +530 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-068',
    name: 'Fourier-Transform Infrared Spectrometer (FTIR) (Unit #68)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1067',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1700 mL / 680 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +535 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-069',
    name: 'Precision pH/ISE Benchtop Meter with ATC (Unit #69)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1068',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1725 mL / 690 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +540 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-070',
    name: 'Differential Scanning Calorimeter (DSC) (Unit #70)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1069',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1750 mL / 700 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +545 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-071',
    name: 'Jacketed Glass Chemical Reactor 2L (Unit #71)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1070',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1775 mL / 710 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +550 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-072',
    name: 'Schlenk Line High-Vacuum Manifold (Unit #72)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1071',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1800 mL / 720 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +555 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-073',
    name: 'Analytical Dual-Range Microbalance (Unit #73)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1072',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1825 mL / 730 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +560 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-074',
    name: 'Digital Variable-Speed Burette 50mL (Unit #74)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1073',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1850 mL / 740 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +565 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-075',
    name: 'Double-Beam UV-Vis Spectrophotometer (Unit #75)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1074',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1875 mL / 750 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +570 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-076',
    name: 'Rotary Vacuum Evaporator with Chiller (Unit #76)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1075',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1900 mL / 760 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +575 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-077',
    name: 'Inert Atmosphere Argon Glovebox (Unit #77)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1076',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1925 mL / 770 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +580 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-078',
    name: 'Benchtop High-Speed Refrigerated Centrifuge (Unit #78)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1077',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1950 mL / 780 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +585 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-079',
    name: 'Magnetic Hotplate Stirrer with PT1000 Probe (Unit #79)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1078',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '1975 mL / 790 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +590 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-080',
    name: 'Fourier-Transform Infrared Spectrometer (FTIR) (Unit #80)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1079',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2000 mL / 800 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +595 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-081',
    name: 'Precision pH/ISE Benchtop Meter with ATC (Unit #81)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1080',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2025 mL / 810 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +600 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-082',
    name: 'Differential Scanning Calorimeter (DSC) (Unit #82)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1081',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2050 mL / 820 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +605 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-083',
    name: 'Jacketed Glass Chemical Reactor 2L (Unit #83)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1082',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2075 mL / 830 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +610 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-084',
    name: 'Schlenk Line High-Vacuum Manifold (Unit #84)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1083',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2100 mL / 840 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +615 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-085',
    name: 'Analytical Dual-Range Microbalance (Unit #85)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1084',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2125 mL / 850 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +620 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-086',
    name: 'Digital Variable-Speed Burette 50mL (Unit #86)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1085',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2150 mL / 860 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +625 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-087',
    name: 'Double-Beam UV-Vis Spectrophotometer (Unit #87)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1086',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2175 mL / 870 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +630 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-088',
    name: 'Rotary Vacuum Evaporator with Chiller (Unit #88)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1087',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2200 mL / 880 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +635 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-089',
    name: 'Inert Atmosphere Argon Glovebox (Unit #89)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1088',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2225 mL / 890 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +640 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-090',
    name: 'Benchtop High-Speed Refrigerated Centrifuge (Unit #90)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1089',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2250 mL / 900 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +645 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-091',
    name: 'Magnetic Hotplate Stirrer with PT1000 Probe (Unit #91)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1090',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2275 mL / 910 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +650 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-092',
    name: 'Fourier-Transform Infrared Spectrometer (FTIR) (Unit #92)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1091',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2300 mL / 920 g dynamic span',
    precision: '±0.0020 analytical units',
    operatingTempRangeC: '-20 °C to +655 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-093',
    name: 'Precision pH/ISE Benchtop Meter with ATC (Unit #93)',
    category: 'Glassware',
    modelNumber: 'PR-EQ-1092',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2325 mL / 930 g dynamic span',
    precision: '±0.0030 analytical units',
    operatingTempRangeC: '-20 °C to +660 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 90,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-094',
    name: 'Differential Scanning Calorimeter (DSC) (Unit #94)',
    category: 'Analytical Instruments',
    modelNumber: 'PR-EQ-1093',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2350 mL / 940 g dynamic span',
    precision: '±0.0040 analytical units',
    operatingTempRangeC: '-20 °C to +665 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 120,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-095',
    name: 'Jacketed Glass Chemical Reactor 2L (Unit #95)',
    category: 'Thermal & Mixing',
    modelNumber: 'PR-EQ-1094',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2375 mL / 950 g dynamic span',
    precision: '±0.0050 analytical units',
    operatingTempRangeC: '-20 °C to +670 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 150,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
  {
    id: 'app-096',
    name: 'Schlenk Line High-Vacuum Manifold (Unit #96)',
    category: 'Safety & Containment',
    modelNumber: 'PR-EQ-1095',
    manufacturer: 'Proton Analytical Scientific Instruments Corp.',
    capacityOrRange: '2400 mL / 960 g dynamic span',
    precision: '±0.0010 analytical units',
    operatingTempRangeC: '-20 °C to +675 °C',
    materialComposition: 'Borosilicate 3.3 Glass with PTFE chemically inert seals',
    standardCalibrationIntervalDays: 180,
    maintenanceProcedures: [
      'Inspect O-ring gaskets and lubricate with high-vacuum fluorosilicone grease.',
      'Perform zero-point baseline zero calibration with certified NIST traceable standards.',
      'Flush capillary manifold lines with spectroscopic-grade HPLC methanol.'
    ],
    safetyPrecautions: [
      'Ensure exhaust interlock sash is below 200 mm before energizing vacuum pumps.',
      'Wear thermal cryo-gloves when manipulating liquid nitrogen cold traps.'
    ],
    primaryAnalyticalUse: 'Precision analytical characterization of chemical solutions and synthesis products.'
  },
];
