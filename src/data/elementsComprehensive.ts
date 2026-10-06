import { ComprehensiveElement } from '../types/comprehensiveChemistry';

export const COMPREHENSIVE_ELEMENTS: ComprehensiveElement[] = [
  {
    number: 1,
    symbol: 'H',
    name: 'Hydrogen',
    atomicMass: 1.008,
    category: 'reactive-nonmetal',
    period: 1,
    group: 1,
    block: 's',
    electronConfiguration: '1s¹',
    electronegativityPauling: 2.2,
    electronegativityAllen: 2.31,
    ionizationEnergiesKjMol: [
      424,
      892,
      1585,
      3065
    ],
    oxidationStates: [1, 0, 1],
    covalentRadiusPm: 62,
    vanDerWaalsRadiusPm: 138,
    atomicRadiusEmpiricalPm: 64,
    meltingPointK: 14.01,
    boilingPointK: 20.28,
    densityGcm3: 0.00008988,
    heatOfFusionKjMol: 0.16,
    heatOfVaporizationKjMol: 0.89,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7441-1-1',
    discoveredYear: 1766,
    discoverer: 'Henry Cavendish',
    summary: 'Hydrogen (symbol H) is an element in Group 1, Period 1. Classified under reactive-nonmetal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 909.09,
    geochemicalAbundanceOceanMgL: 9.0909,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Warning',
    isotopes: [
      {
        massNumber: 1,
        atomicMassU: 1.008,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 7.9,
        magneticMomentNu: 0.08
      },
      {
        massNumber: 2,
        atomicMassU: 2.01,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 15.7,
        magneticMomentNu: 0.14
      },
      {
        massNumber: 3,
        atomicMassU: 3.016,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 23.34,
        magneticMomentNu: 0.195
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 384.3,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 455.1,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 591.7,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'HO2',
        name: 'Hydrogen Dioxide',
        oxidationState: 4,
        molarMassGmol: 33.006,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'HCl3',
        name: 'Hydrogen Trichloride',
        oxidationState: 3,
        molarMassGmol: 107.358,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'H(NO3)2',
        name: 'Hydrogen Dinitrate',
        oxidationState: 2,
        molarMassGmol: 125.018,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 2,
    symbol: 'He',
    name: 'Helium',
    atomicMass: 4.0026,
    category: 'noble-gas',
    period: 1,
    group: 18,
    block: 's',
    electronConfiguration: '1s²',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      448,
      934,
      1650,
      3150
    ],
    oxidationStates: [8, 2, 1],
    covalentRadiusPm: 62,
    vanDerWaalsRadiusPm: 138,
    atomicRadiusEmpiricalPm: 43,
    meltingPointK: 0.95,
    boilingPointK: 4.22,
    densityGcm3: 0.0001785,
    heatOfFusionKjMol: 0.64,
    heatOfVaporizationKjMol: 3.52,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7442-2-1',
    discoveredYear: 1868,
    discoverer: 'Pierre Janssen, Norman Lockyer',
    summary: 'Helium (symbol He) is an element in Group 18, Period 1. Classified under noble-gas, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 476.19,
    geochemicalAbundanceOceanMgL: 4.7619,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Warning',
    isotopes: [
      {
        massNumber: 4,
        atomicMassU: 4.0026,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 15.8,
        magneticMomentNu: 0.16
      },
      {
        massNumber: 5,
        atomicMassU: 5.0046,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 23.55,
        magneticMomentNu: 0.21
      },
      {
        massNumber: 6,
        atomicMassU: 6.0106,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 31.12,
        magneticMomentNu: 0.26
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 388.6,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 460.2,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 594.4,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'HeO2',
        name: 'Helium Dioxide',
        oxidationState: 4,
        molarMassGmol: 36.001,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'HeCl3',
        name: 'Helium Trichloride',
        oxidationState: 3,
        molarMassGmol: 110.353,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'He(NO3)2',
        name: 'Helium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 128.013,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 3,
    symbol: 'Li',
    name: 'Lithium',
    atomicMass: 6.94,
    category: 'alkali-metal',
    period: 2,
    group: 1,
    block: 's',
    electronConfiguration: '[He] 2s¹',
    electronegativityPauling: 0.98,
    electronegativityAllen: 1.03,
    ionizationEnergiesKjMol: [
      472,
      976,
      1715,
      3235
    ],
    oxidationStates: [1, 0, 1],
    covalentRadiusPm: 84,
    vanDerWaalsRadiusPm: 156,
    atomicRadiusEmpiricalPm: 84,
    meltingPointK: 453.69,
    boilingPointK: 1603,
    densityGcm3: 0.534,
    heatOfFusionKjMol: 1.11,
    heatOfVaporizationKjMol: 6.11,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7443-3-1',
    discoveredYear: 1817,
    discoverer: 'Johan August Arfwedson',
    summary: 'Lithium (symbol Li) is an element in Group 1, Period 2. Classified under alkali-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 322.58,
    geochemicalAbundanceOceanMgL: 3.2258,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Warning',
    isotopes: [
      {
        massNumber: 7,
        atomicMassU: 6.94,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 23.7,
        magneticMomentNu: 0.24
      },
      {
        massNumber: 8,
        atomicMassU: 7.942,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 31.4,
        magneticMomentNu: 0.28
      },
      {
        massNumber: 9,
        atomicMassU: 8.948,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 38.9,
        magneticMomentNu: 0.325
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 392.9,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 465.3,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 597.1,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'LiO2',
        name: 'Lithium Dioxide',
        oxidationState: 4,
        molarMassGmol: 38.938,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'LiCl3',
        name: 'Lithium Trichloride',
        oxidationState: 3,
        molarMassGmol: 113.29,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Li(NO3)2',
        name: 'Lithium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 130.95,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 4,
    symbol: 'Be',
    name: 'Beryllium',
    atomicMass: 9.0122,
    category: 'alkaline-earth',
    period: 2,
    group: 2,
    block: 's',
    electronConfiguration: '[He] 2s²',
    electronegativityPauling: 1.57,
    electronegativityAllen: 1.65,
    ionizationEnergiesKjMol: [
      496,
      1018,
      1780,
      3320
    ],
    oxidationStates: [2, 0, 1],
    covalentRadiusPm: 84,
    vanDerWaalsRadiusPm: 156,
    atomicRadiusEmpiricalPm: 83,
    meltingPointK: 1560,
    boilingPointK: 2742,
    densityGcm3: 1.85,
    heatOfFusionKjMol: 1.44,
    heatOfVaporizationKjMol: 7.93,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7444-4-1',
    discoveredYear: 1798,
    discoverer: 'Louis-Nicolas Vauquelin',
    summary: 'Beryllium (symbol Be) is an element in Group 2, Period 2. Classified under alkaline-earth, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 243.9,
    geochemicalAbundanceOceanMgL: 2.439,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Warning',
    isotopes: [
      {
        massNumber: 9,
        atomicMassU: 9.0122,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 31.6,
        magneticMomentNu: 0.32
      },
      {
        massNumber: 10,
        atomicMassU: 10.0142,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 39.25,
        magneticMomentNu: 0.35
      },
      {
        massNumber: 11,
        atomicMassU: 11.0202,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 46.68,
        magneticMomentNu: 0.39
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 397.2,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 470.4,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 599.8,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'BeO2',
        name: 'Beryllium Dioxide',
        oxidationState: 4,
        molarMassGmol: 41.01,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'BeCl3',
        name: 'Beryllium Trichloride',
        oxidationState: 3,
        molarMassGmol: 115.362,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Be(NO3)2',
        name: 'Beryllium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 133.022,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 5,
    symbol: 'B',
    name: 'Boron',
    atomicMass: 10.81,
    category: 'metalloid',
    period: 2,
    group: 13,
    block: 'p',
    electronConfiguration: '[He] 2s² 2p¹',
    electronegativityPauling: 2.04,
    electronegativityAllen: 2.14,
    ionizationEnergiesKjMol: [
      520,
      1060,
      1845,
      3405
    ],
    oxidationStates: [3, 2, 1],
    covalentRadiusPm: 84,
    vanDerWaalsRadiusPm: 156,
    atomicRadiusEmpiricalPm: 69,
    meltingPointK: 2349,
    boilingPointK: 4200,
    densityGcm3: 2.34,
    heatOfFusionKjMol: 1.73,
    heatOfVaporizationKjMol: 9.51,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7445-5-1',
    discoveredYear: 1808,
    discoverer: 'Gay-Lussac, Thénard',
    summary: 'Boron (symbol B) is an element in Group 13, Period 2. Classified under metalloid, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 196.08,
    geochemicalAbundanceOceanMgL: 1.9608,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Warning',
    isotopes: [
      {
        massNumber: 11,
        atomicMassU: 10.81,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 39.5,
        magneticMomentNu: 0.4
      },
      {
        massNumber: 12,
        atomicMassU: 11.812,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 47.1,
        magneticMomentNu: 0.42
      },
      {
        massNumber: 13,
        atomicMassU: 12.818,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 54.46,
        magneticMomentNu: 0.455
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 401.5,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 475.5,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 602.5,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'BO2',
        name: 'Boron Dioxide',
        oxidationState: 4,
        molarMassGmol: 42.808,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'BCl3',
        name: 'Boron Trichloride',
        oxidationState: 3,
        molarMassGmol: 117.16,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'B(NO3)2',
        name: 'Boron Dinitrate',
        oxidationState: 2,
        molarMassGmol: 134.82,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 6,
    symbol: 'C',
    name: 'Carbon',
    atomicMass: 12.011,
    category: 'reactive-nonmetal',
    period: 2,
    group: 14,
    block: 'p',
    electronConfiguration: '[He] 2s² 2p²',
    electronegativityPauling: 2.55,
    electronegativityAllen: 2.68,
    ionizationEnergiesKjMol: [
      544,
      1102,
      1910,
      3490
    ],
    oxidationStates: [4, 2, 1],
    covalentRadiusPm: 84,
    vanDerWaalsRadiusPm: 156,
    atomicRadiusEmpiricalPm: 68,
    meltingPointK: 3823,
    boilingPointK: 4098,
    densityGcm3: 2.267,
    heatOfFusionKjMol: 1.92,
    heatOfVaporizationKjMol: 10.57,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7446-6-1',
    discoveredYear: -2500,
    discoverer: 'Ancient civilizations',
    summary: 'Carbon (symbol C) is an element in Group 14, Period 2. Classified under reactive-nonmetal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 163.93,
    geochemicalAbundanceOceanMgL: 1.6393,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Warning',
    isotopes: [
      {
        massNumber: 12,
        atomicMassU: 12.011,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 47.4,
        magneticMomentNu: 0.48
      },
      {
        massNumber: 13,
        atomicMassU: 13.013,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 54.95,
        magneticMomentNu: 0.49
      },
      {
        massNumber: 14,
        atomicMassU: 14.019,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 62.24,
        magneticMomentNu: 0.52
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 405.8,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 480.6,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 605.2,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'CO2',
        name: 'Carbon Dioxide',
        oxidationState: 4,
        molarMassGmol: 44.009,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'CCl3',
        name: 'Carbon Trichloride',
        oxidationState: 3,
        molarMassGmol: 118.361,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'C(NO3)2',
        name: 'Carbon Dinitrate',
        oxidationState: 2,
        molarMassGmol: 136.021,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 7,
    symbol: 'N',
    name: 'Nitrogen',
    atomicMass: 14.007,
    category: 'reactive-nonmetal',
    period: 2,
    group: 15,
    block: 'p',
    electronConfiguration: '[He] 2s² 2p³',
    electronegativityPauling: 3.04,
    electronegativityAllen: 3.19,
    ionizationEnergiesKjMol: [
      568,
      1144,
      1975,
      3575
    ],
    oxidationStates: [5, 2, 1],
    covalentRadiusPm: 84,
    vanDerWaalsRadiusPm: 156,
    atomicRadiusEmpiricalPm: 67,
    meltingPointK: 63.15,
    boilingPointK: 77.36,
    densityGcm3: 0.00125,
    heatOfFusionKjMol: 2.24,
    heatOfVaporizationKjMol: 12.33,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7447-7-1',
    discoveredYear: 1772,
    discoverer: 'Daniel Rutherford',
    summary: 'Nitrogen (symbol N) is an element in Group 15, Period 2. Classified under reactive-nonmetal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 140.85,
    geochemicalAbundanceOceanMgL: 1.4085,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Warning',
    isotopes: [
      {
        massNumber: 14,
        atomicMassU: 14.007,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 55.3,
        magneticMomentNu: 0.56
      },
      {
        massNumber: 15,
        atomicMassU: 15.009,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 62.8,
        magneticMomentNu: 0.56
      },
      {
        massNumber: 16,
        atomicMassU: 16.015,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 70.02,
        magneticMomentNu: 0.585
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 410.1,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 485.7,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 607.9,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'NO2',
        name: 'Nitrogen Dioxide',
        oxidationState: 4,
        molarMassGmol: 46.005,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'NCl3',
        name: 'Nitrogen Trichloride',
        oxidationState: 3,
        molarMassGmol: 120.357,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'N(NO3)2',
        name: 'Nitrogen Dinitrate',
        oxidationState: 2,
        molarMassGmol: 138.017,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 8,
    symbol: 'O',
    name: 'Oxygen',
    atomicMass: 15.999,
    category: 'reactive-nonmetal',
    period: 2,
    group: 16,
    block: 'p',
    electronConfiguration: '[He] 2s² 2p⁴',
    electronegativityPauling: 3.44,
    electronegativityAllen: 3.61,
    ionizationEnergiesKjMol: [
      592,
      1186,
      2040,
      3660
    ],
    oxidationStates: [6, 2, 1],
    covalentRadiusPm: 84,
    vanDerWaalsRadiusPm: 156,
    atomicRadiusEmpiricalPm: 66,
    meltingPointK: 54.36,
    boilingPointK: 90.2,
    densityGcm3: 0.00143,
    heatOfFusionKjMol: 2.56,
    heatOfVaporizationKjMol: 14.08,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7448-8-1',
    discoveredYear: 1774,
    discoverer: 'Joseph Priestley, Scheele',
    summary: 'Oxygen (symbol O) is an element in Group 16, Period 2. Classified under reactive-nonmetal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 123.46,
    geochemicalAbundanceOceanMgL: 1.2346,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Warning',
    isotopes: [
      {
        massNumber: 16,
        atomicMassU: 15.999,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 63.2,
        magneticMomentNu: 0.64
      },
      {
        massNumber: 17,
        atomicMassU: 17.001,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 70.65,
        magneticMomentNu: 0.63
      },
      {
        massNumber: 18,
        atomicMassU: 18.007,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 77.8,
        magneticMomentNu: 0.65
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 414.4,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 490.8,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 610.6,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'OO2',
        name: 'Oxygen Dioxide',
        oxidationState: 4,
        molarMassGmol: 47.997,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'OCl3',
        name: 'Oxygen Trichloride',
        oxidationState: 3,
        molarMassGmol: 122.349,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'O(NO3)2',
        name: 'Oxygen Dinitrate',
        oxidationState: 2,
        molarMassGmol: 140.009,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 9,
    symbol: 'F',
    name: 'Fluorine',
    atomicMass: 18.998,
    category: 'reactive-nonmetal',
    period: 2,
    group: 17,
    block: 'p',
    electronConfiguration: '[He] 2s² 2p⁵',
    electronegativityPauling: 3.98,
    electronegativityAllen: 4.18,
    ionizationEnergiesKjMol: [
      616,
      1228,
      2105,
      3745
    ],
    oxidationStates: [7, 2, 1],
    covalentRadiusPm: 84,
    vanDerWaalsRadiusPm: 156,
    atomicRadiusEmpiricalPm: 65,
    meltingPointK: 53.53,
    boilingPointK: 85.03,
    densityGcm3: 0.0017,
    heatOfFusionKjMol: 3.04,
    heatOfVaporizationKjMol: 16.72,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7449-9-1',
    discoveredYear: 1886,
    discoverer: 'Henri Moissan',
    summary: 'Fluorine (symbol F) is an element in Group 17, Period 2. Classified under reactive-nonmetal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 109.89,
    geochemicalAbundanceOceanMgL: 1.0989,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Warning',
    isotopes: [
      {
        massNumber: 19,
        atomicMassU: 18.998,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 71.1,
        magneticMomentNu: 0.72
      },
      {
        massNumber: 20,
        atomicMassU: 20,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 78.5,
        magneticMomentNu: 0.7
      },
      {
        massNumber: 21,
        atomicMassU: 21.006,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 85.58,
        magneticMomentNu: 0.715
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 418.7,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 495.9,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 613.3,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'FO2',
        name: 'Fluorine Dioxide',
        oxidationState: 4,
        molarMassGmol: 50.996,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'FCl3',
        name: 'Fluorine Trichloride',
        oxidationState: 3,
        molarMassGmol: 125.348,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'F(NO3)2',
        name: 'Fluorine Dinitrate',
        oxidationState: 2,
        molarMassGmol: 143.008,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 10,
    symbol: 'Ne',
    name: 'Neon',
    atomicMass: 20.18,
    category: 'noble-gas',
    period: 2,
    group: 18,
    block: 'p',
    electronConfiguration: '[He] 2s² 2p⁶',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      640,
      1270,
      2170,
      3830
    ],
    oxidationStates: [8, 2, 1],
    covalentRadiusPm: 84,
    vanDerWaalsRadiusPm: 156,
    atomicRadiusEmpiricalPm: 63,
    meltingPointK: 24.56,
    boilingPointK: 27.07,
    densityGcm3: 0.0009,
    heatOfFusionKjMol: 3.23,
    heatOfVaporizationKjMol: 17.76,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7450-0-1',
    discoveredYear: 1898,
    discoverer: 'William Ramsay, Morris Travers',
    summary: 'Neon (symbol Ne) is an element in Group 18, Period 2. Classified under noble-gas, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 99.01,
    geochemicalAbundanceOceanMgL: 0.9901,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 20,
        atomicMassU: 20.18,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 79,
        magneticMomentNu: 0.8
      },
      {
        massNumber: 21,
        atomicMassU: 21.182,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 86.35,
        magneticMomentNu: 0.77
      },
      {
        massNumber: 22,
        atomicMassU: 22.188,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 93.36,
        magneticMomentNu: 0.78
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 423,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 501,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 616,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'NeO2',
        name: 'Neon Dioxide',
        oxidationState: 4,
        molarMassGmol: 52.178,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'NeCl3',
        name: 'Neon Trichloride',
        oxidationState: 3,
        molarMassGmol: 126.53,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ne(NO3)2',
        name: 'Neon Dinitrate',
        oxidationState: 2,
        molarMassGmol: 144.19,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 11,
    symbol: 'Na',
    name: 'Sodium',
    atomicMass: 22.99,
    category: 'alkali-metal',
    period: 3,
    group: 1,
    block: 's',
    electronConfiguration: '[Ne] 3s¹',
    electronegativityPauling: 0.93,
    electronegativityAllen: 0.98,
    ionizationEnergiesKjMol: [
      664,
      1312,
      2235,
      3915
    ],
    oxidationStates: [1, 0, 1],
    covalentRadiusPm: 106,
    vanDerWaalsRadiusPm: 174,
    atomicRadiusEmpiricalPm: 104,
    meltingPointK: 370.87,
    boilingPointK: 1156,
    densityGcm3: 0.971,
    heatOfFusionKjMol: 3.68,
    heatOfVaporizationKjMol: 20.23,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7451-1-1',
    discoveredYear: 1807,
    discoverer: 'Humphry Davy',
    summary: 'Sodium (symbol Na) is an element in Group 1, Period 3. Classified under alkali-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 90.09,
    geochemicalAbundanceOceanMgL: 0.9009,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 23,
        atomicMassU: 22.99,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 86.9,
        magneticMomentNu: 0.88
      },
      {
        massNumber: 24,
        atomicMassU: 23.992,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 94.2,
        magneticMomentNu: 0.84
      },
      {
        massNumber: 25,
        atomicMassU: 24.998,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 101.14,
        magneticMomentNu: 0.845
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 427.3,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 506.1,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 618.7,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'NaO2',
        name: 'Sodium Dioxide',
        oxidationState: 4,
        molarMassGmol: 54.988,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'NaCl3',
        name: 'Sodium Trichloride',
        oxidationState: 3,
        molarMassGmol: 129.34,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Na(NO3)2',
        name: 'Sodium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 147,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 12,
    symbol: 'Mg',
    name: 'Magnesium',
    atomicMass: 24.305,
    category: 'alkaline-earth',
    period: 3,
    group: 2,
    block: 's',
    electronConfiguration: '[Ne] 3s²',
    electronegativityPauling: 1.31,
    electronegativityAllen: 1.38,
    ionizationEnergiesKjMol: [
      688,
      1354,
      2300,
      4000
    ],
    oxidationStates: [2, 0, 1],
    covalentRadiusPm: 106,
    vanDerWaalsRadiusPm: 174,
    atomicRadiusEmpiricalPm: 103,
    meltingPointK: 923,
    boilingPointK: 1363,
    densityGcm3: 1.738,
    heatOfFusionKjMol: 3.89,
    heatOfVaporizationKjMol: 21.39,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7452-2-1',
    discoveredYear: 1755,
    discoverer: 'Joseph Black',
    summary: 'Magnesium (symbol Mg) is an element in Group 2, Period 3. Classified under alkaline-earth, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 82.64,
    geochemicalAbundanceOceanMgL: 0.8264,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 24,
        atomicMassU: 24.305,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 94.8,
        magneticMomentNu: 0.96
      },
      {
        massNumber: 25,
        atomicMassU: 25.307,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 102.05,
        magneticMomentNu: 0.91
      },
      {
        massNumber: 26,
        atomicMassU: 26.313,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 108.92,
        magneticMomentNu: 0.91
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 431.6,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 511.2,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 621.4,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'MgO2',
        name: 'Magnesium Dioxide',
        oxidationState: 4,
        molarMassGmol: 56.303,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'MgCl3',
        name: 'Magnesium Trichloride',
        oxidationState: 3,
        molarMassGmol: 130.655,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Mg(NO3)2',
        name: 'Magnesium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 148.315,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 13,
    symbol: 'Al',
    name: 'Aluminium',
    atomicMass: 26.982,
    category: 'post-transition-metal',
    period: 3,
    group: 13,
    block: 'p',
    electronConfiguration: '[Ne] 3s² 3p¹',
    electronegativityPauling: 1.61,
    electronegativityAllen: 1.69,
    ionizationEnergiesKjMol: [
      712,
      1396,
      2365,
      4085
    ],
    oxidationStates: [3, 2, 1],
    covalentRadiusPm: 106,
    vanDerWaalsRadiusPm: 174,
    atomicRadiusEmpiricalPm: 89,
    meltingPointK: 933.47,
    boilingPointK: 2792,
    densityGcm3: 2.698,
    heatOfFusionKjMol: 4.32,
    heatOfVaporizationKjMol: 23.74,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7453-3-1',
    discoveredYear: 1825,
    discoverer: 'Hans Christian Ørsted',
    summary: 'Aluminium (symbol Al) is an element in Group 13, Period 3. Classified under post-transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 76.34,
    geochemicalAbundanceOceanMgL: 0.7634,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 27,
        atomicMassU: 26.982,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 102.7,
        magneticMomentNu: 1.04
      },
      {
        massNumber: 28,
        atomicMassU: 27.984,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 109.9,
        magneticMomentNu: 0.98
      },
      {
        massNumber: 29,
        atomicMassU: 28.99,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 116.7,
        magneticMomentNu: 0.975
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 435.9,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 516.3,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 624.1,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'AlO2',
        name: 'Aluminium Dioxide',
        oxidationState: 4,
        molarMassGmol: 58.98,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'AlCl3',
        name: 'Aluminium Trichloride',
        oxidationState: 3,
        molarMassGmol: 133.332,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Al(NO3)2',
        name: 'Aluminium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 150.992,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 14,
    symbol: 'Si',
    name: 'Silicon',
    atomicMass: 28.085,
    category: 'metalloid',
    period: 3,
    group: 14,
    block: 'p',
    electronConfiguration: '[Ne] 3s² 3p²',
    electronegativityPauling: 1.9,
    electronegativityAllen: 1.99,
    ionizationEnergiesKjMol: [
      736,
      1438,
      2430,
      4170
    ],
    oxidationStates: [4, 2, 1],
    covalentRadiusPm: 106,
    vanDerWaalsRadiusPm: 174,
    atomicRadiusEmpiricalPm: 88,
    meltingPointK: 1687,
    boilingPointK: 3538,
    densityGcm3: 2.329,
    heatOfFusionKjMol: 4.49,
    heatOfVaporizationKjMol: 24.71,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7454-4-1',
    discoveredYear: 1824,
    discoverer: 'Jöns Jacob Berzelius',
    summary: 'Silicon (symbol Si) is an element in Group 14, Period 3. Classified under metalloid, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 70.92,
    geochemicalAbundanceOceanMgL: 0.7092,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 28,
        atomicMassU: 28.085,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 110.6,
        magneticMomentNu: 1.12
      },
      {
        massNumber: 29,
        atomicMassU: 29.087,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 117.75,
        magneticMomentNu: 1.05
      },
      {
        massNumber: 30,
        atomicMassU: 30.093,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 124.48,
        magneticMomentNu: 1.04
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 440.2,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 521.4,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 626.8,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'SiO2',
        name: 'Silicon Dioxide',
        oxidationState: 4,
        molarMassGmol: 60.083,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'SiCl3',
        name: 'Silicon Trichloride',
        oxidationState: 3,
        molarMassGmol: 134.435,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Si(NO3)2',
        name: 'Silicon Dinitrate',
        oxidationState: 2,
        molarMassGmol: 152.095,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 15,
    symbol: 'P',
    name: 'Phosphorus',
    atomicMass: 30.974,
    category: 'reactive-nonmetal',
    period: 3,
    group: 15,
    block: 'p',
    electronConfiguration: '[Ne] 3s² 3p³',
    electronegativityPauling: 2.19,
    electronegativityAllen: 2.3,
    ionizationEnergiesKjMol: [
      760,
      1480,
      2495,
      4255
    ],
    oxidationStates: [5, 2, 1],
    covalentRadiusPm: 106,
    vanDerWaalsRadiusPm: 174,
    atomicRadiusEmpiricalPm: 87,
    meltingPointK: 317.3,
    boilingPointK: 553.6,
    densityGcm3: 1.82,
    heatOfFusionKjMol: 4.96,
    heatOfVaporizationKjMol: 27.26,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7455-5-1',
    discoveredYear: 1669,
    discoverer: 'Hennig Brand',
    summary: 'Phosphorus (symbol P) is an element in Group 15, Period 3. Classified under reactive-nonmetal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 66.23,
    geochemicalAbundanceOceanMgL: 0.6623,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 31,
        atomicMassU: 30.974,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 118.5,
        magneticMomentNu: 1.2
      },
      {
        massNumber: 32,
        atomicMassU: 31.976,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 125.6,
        magneticMomentNu: 1.12
      },
      {
        massNumber: 33,
        atomicMassU: 32.982,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 132.26,
        magneticMomentNu: 1.105
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 444.5,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 526.5,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 629.5,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'PO2',
        name: 'Phosphorus Dioxide',
        oxidationState: 4,
        molarMassGmol: 62.972,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'PCl3',
        name: 'Phosphorus Trichloride',
        oxidationState: 3,
        molarMassGmol: 137.324,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'P(NO3)2',
        name: 'Phosphorus Dinitrate',
        oxidationState: 2,
        molarMassGmol: 154.984,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 16,
    symbol: 'S',
    name: 'Sulfur',
    atomicMass: 32.06,
    category: 'reactive-nonmetal',
    period: 3,
    group: 16,
    block: 'p',
    electronConfiguration: '[Ne] 3s² 3p⁴',
    electronegativityPauling: 2.58,
    electronegativityAllen: 2.71,
    ionizationEnergiesKjMol: [
      784,
      1522,
      2560,
      4340
    ],
    oxidationStates: [6, 2, 1],
    covalentRadiusPm: 106,
    vanDerWaalsRadiusPm: 174,
    atomicRadiusEmpiricalPm: 86,
    meltingPointK: 388.36,
    boilingPointK: 717.8,
    densityGcm3: 2.067,
    heatOfFusionKjMol: 5.13,
    heatOfVaporizationKjMol: 28.21,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7456-6-1',
    discoveredYear: -2000,
    discoverer: 'Ancient civilizations',
    summary: 'Sulfur (symbol S) is an element in Group 16, Period 3. Classified under reactive-nonmetal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 62.11,
    geochemicalAbundanceOceanMgL: 0.6211,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 32,
        atomicMassU: 32.06,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 126.4,
        magneticMomentNu: 1.28
      },
      {
        massNumber: 33,
        atomicMassU: 33.062,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 133.45,
        magneticMomentNu: 1.19
      },
      {
        massNumber: 34,
        atomicMassU: 34.068,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 140.04,
        magneticMomentNu: 1.17
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 448.8,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 531.6,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 632.2,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'SO2',
        name: 'Sulfur Dioxide',
        oxidationState: 4,
        molarMassGmol: 64.058,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'SCl3',
        name: 'Sulfur Trichloride',
        oxidationState: 3,
        molarMassGmol: 138.41,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'S(NO3)2',
        name: 'Sulfur Dinitrate',
        oxidationState: 2,
        molarMassGmol: 156.07,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 17,
    symbol: 'Cl',
    name: 'Chlorine',
    atomicMass: 35.45,
    category: 'reactive-nonmetal',
    period: 3,
    group: 17,
    block: 'p',
    electronConfiguration: '[Ne] 3s² 3p⁵',
    electronegativityPauling: 3.16,
    electronegativityAllen: 3.32,
    ionizationEnergiesKjMol: [
      808,
      1564,
      2625,
      4425
    ],
    oxidationStates: [7, 2, 1],
    covalentRadiusPm: 106,
    vanDerWaalsRadiusPm: 174,
    atomicRadiusEmpiricalPm: 85,
    meltingPointK: 171.6,
    boilingPointK: 239.11,
    densityGcm3: 0.0032,
    heatOfFusionKjMol: 5.67,
    heatOfVaporizationKjMol: 31.2,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7457-7-1',
    discoveredYear: 1774,
    discoverer: 'Carl Wilhelm Scheele',
    summary: 'Chlorine (symbol Cl) is an element in Group 17, Period 3. Classified under reactive-nonmetal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 58.48,
    geochemicalAbundanceOceanMgL: 0.5848,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 35,
        atomicMassU: 35.45,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 134.3,
        magneticMomentNu: 1.36
      },
      {
        massNumber: 36,
        atomicMassU: 36.452,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 141.3,
        magneticMomentNu: 1.26
      },
      {
        massNumber: 37,
        atomicMassU: 37.458,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 147.82,
        magneticMomentNu: 1.235
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 453.1,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 536.7,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 634.9,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'ClO2',
        name: 'Chlorine Dioxide',
        oxidationState: 4,
        molarMassGmol: 67.448,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'ClCl3',
        name: 'Chlorine Trichloride',
        oxidationState: 3,
        molarMassGmol: 141.8,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Cl(NO3)2',
        name: 'Chlorine Dinitrate',
        oxidationState: 2,
        molarMassGmol: 159.46,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 18,
    symbol: 'Ar',
    name: 'Argon',
    atomicMass: 39.948,
    category: 'noble-gas',
    period: 3,
    group: 18,
    block: 'p',
    electronConfiguration: '[Ne] 3s² 3p⁶',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      832,
      1606,
      2690,
      4510
    ],
    oxidationStates: [8, 2, 1],
    covalentRadiusPm: 106,
    vanDerWaalsRadiusPm: 174,
    atomicRadiusEmpiricalPm: 83,
    meltingPointK: 83.8,
    boilingPointK: 87.3,
    densityGcm3: 0.00178,
    heatOfFusionKjMol: 6.39,
    heatOfVaporizationKjMol: 35.15,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7458-8-1',
    discoveredYear: 1894,
    discoverer: 'Lord Rayleigh, William Ramsay',
    summary: 'Argon (symbol Ar) is an element in Group 18, Period 3. Classified under noble-gas, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 55.25,
    geochemicalAbundanceOceanMgL: 0.5525,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 40,
        atomicMassU: 39.948,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 142.2,
        magneticMomentNu: 1.44
      },
      {
        massNumber: 41,
        atomicMassU: 40.95,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 149.15,
        magneticMomentNu: 1.33
      },
      {
        massNumber: 42,
        atomicMassU: 41.956,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 155.6,
        magneticMomentNu: 1.3
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 457.4,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 541.8,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 637.6,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'ArO2',
        name: 'Argon Dioxide',
        oxidationState: 4,
        molarMassGmol: 71.946,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'ArCl3',
        name: 'Argon Trichloride',
        oxidationState: 3,
        molarMassGmol: 146.298,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ar(NO3)2',
        name: 'Argon Dinitrate',
        oxidationState: 2,
        molarMassGmol: 163.958,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 19,
    symbol: 'K',
    name: 'Potassium',
    atomicMass: 39.098,
    category: 'alkali-metal',
    period: 4,
    group: 1,
    block: 's',
    electronConfiguration: '[Ar] 4s¹',
    electronegativityPauling: 0.82,
    electronegativityAllen: 0.86,
    ionizationEnergiesKjMol: [
      856,
      1648,
      2755,
      4595
    ],
    oxidationStates: [1, 0, 1],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 124,
    meltingPointK: 336.53,
    boilingPointK: 1032,
    densityGcm3: 0.862,
    heatOfFusionKjMol: 6.26,
    heatOfVaporizationKjMol: 34.41,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7459-9-1',
    discoveredYear: 1807,
    discoverer: 'Humphry Davy',
    summary: 'Potassium (symbol K) is an element in Group 1, Period 4. Classified under alkali-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 52.36,
    geochemicalAbundanceOceanMgL: 0.5236,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 39,
        atomicMassU: 39.098,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 150.1,
        magneticMomentNu: 1.52
      },
      {
        massNumber: 40,
        atomicMassU: 40.1,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 157,
        magneticMomentNu: 1.4
      },
      {
        massNumber: 41,
        atomicMassU: 41.106,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 163.38,
        magneticMomentNu: 1.365
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 461.7,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 546.9,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 640.3,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'KO2',
        name: 'Potassium Dioxide',
        oxidationState: 4,
        molarMassGmol: 71.096,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'KCl3',
        name: 'Potassium Trichloride',
        oxidationState: 3,
        molarMassGmol: 145.448,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'K(NO3)2',
        name: 'Potassium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 163.108,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 20,
    symbol: 'Ca',
    name: 'Calcium',
    atomicMass: 40.078,
    category: 'alkaline-earth',
    period: 4,
    group: 2,
    block: 's',
    electronConfiguration: '[Ar] 4s²',
    electronegativityPauling: 1,
    electronegativityAllen: 1.05,
    ionizationEnergiesKjMol: [
      880,
      1690,
      2820,
      4680
    ],
    oxidationStates: [2, 0, 1],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 123,
    meltingPointK: 1115,
    boilingPointK: 1757,
    densityGcm3: 1.54,
    heatOfFusionKjMol: 6.41,
    heatOfVaporizationKjMol: 35.27,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7460-0-1',
    discoveredYear: 1808,
    discoverer: 'Humphry Davy',
    summary: 'Calcium (symbol Ca) is an element in Group 2, Period 4. Classified under alkaline-earth, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 49.75,
    geochemicalAbundanceOceanMgL: 0.4975,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 40,
        atomicMassU: 40.078,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 158,
        magneticMomentNu: 1.6
      },
      {
        massNumber: 41,
        atomicMassU: 41.08,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 164.85,
        magneticMomentNu: 1.47
      },
      {
        massNumber: 42,
        atomicMassU: 42.086,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 171.16,
        magneticMomentNu: 1.43
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 466,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 552,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 643,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'CaO2',
        name: 'Calcium Dioxide',
        oxidationState: 4,
        molarMassGmol: 72.076,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'CaCl3',
        name: 'Calcium Trichloride',
        oxidationState: 3,
        molarMassGmol: 146.428,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ca(NO3)2',
        name: 'Calcium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 164.088,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 21,
    symbol: 'Sc',
    name: 'Scandium',
    atomicMass: 44.956,
    category: 'transition-metal',
    period: 4,
    group: 3,
    block: 'd',
    electronConfiguration: '[Ar] 3d¹ 4s²',
    electronegativityPauling: 1.36,
    electronegativityAllen: 1.43,
    ionizationEnergiesKjMol: [
      904,
      1732,
      2885,
      4765
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 121,
    meltingPointK: 1814,
    boilingPointK: 3109,
    densityGcm3: 2.985,
    heatOfFusionKjMol: 7.19,
    heatOfVaporizationKjMol: 39.56,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7461-1-1',
    discoveredYear: 1879,
    discoverer: 'Lars Fredrik Nilson',
    summary: 'Scandium (symbol Sc) is an element in Group 3, Period 4. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 47.39,
    geochemicalAbundanceOceanMgL: 0.4739,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 45,
        atomicMassU: 44.956,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 165.9,
        magneticMomentNu: 1.68
      },
      {
        massNumber: 46,
        atomicMassU: 45.958,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 172.7,
        magneticMomentNu: 1.54
      },
      {
        massNumber: 47,
        atomicMassU: 46.964,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 178.94,
        magneticMomentNu: 1.495
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 470.3,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 557.1,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 645.7,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'ScO2',
        name: 'Scandium Dioxide',
        oxidationState: 4,
        molarMassGmol: 76.954,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'ScCl3',
        name: 'Scandium Trichloride',
        oxidationState: 3,
        molarMassGmol: 151.306,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Sc(NO3)2',
        name: 'Scandium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 168.966,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 22,
    symbol: 'Ti',
    name: 'Titanium',
    atomicMass: 47.867,
    category: 'transition-metal',
    period: 4,
    group: 4,
    block: 'd',
    electronConfiguration: '[Ar] 3d² 4s²',
    electronegativityPauling: 1.54,
    electronegativityAllen: 1.62,
    ionizationEnergiesKjMol: [
      928,
      1774,
      2950,
      4850
    ],
    oxidationStates: [-6, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 120,
    meltingPointK: 1941,
    boilingPointK: 3560,
    densityGcm3: 4.506,
    heatOfFusionKjMol: 7.66,
    heatOfVaporizationKjMol: 42.12,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7462-2-1',
    discoveredYear: 1791,
    discoverer: 'William Gregor',
    summary: 'Titanium (symbol Ti) is an element in Group 4, Period 4. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 45.25,
    geochemicalAbundanceOceanMgL: 0.4525,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 48,
        atomicMassU: 47.867,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 173.8,
        magneticMomentNu: 1.76
      },
      {
        massNumber: 49,
        atomicMassU: 48.869,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 180.55,
        magneticMomentNu: 1.61
      },
      {
        massNumber: 50,
        atomicMassU: 49.875,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 186.72,
        magneticMomentNu: 1.56
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 474.6,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 562.2,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 648.4,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'TiO2',
        name: 'Titanium Dioxide',
        oxidationState: 4,
        molarMassGmol: 79.865,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'TiCl3',
        name: 'Titanium Trichloride',
        oxidationState: 3,
        molarMassGmol: 154.217,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ti(NO3)2',
        name: 'Titanium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 171.877,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 23,
    symbol: 'V',
    name: 'Vanadium',
    atomicMass: 50.942,
    category: 'transition-metal',
    period: 4,
    group: 5,
    block: 'd',
    electronConfiguration: '[Ar] 3d³ 4s²',
    electronegativityPauling: 1.63,
    electronegativityAllen: 1.71,
    ionizationEnergiesKjMol: [
      952,
      1816,
      3015,
      4935
    ],
    oxidationStates: [-5, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 119,
    meltingPointK: 2183,
    boilingPointK: 3680,
    densityGcm3: 6.11,
    heatOfFusionKjMol: 8.15,
    heatOfVaporizationKjMol: 44.83,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7463-3-1',
    discoveredYear: 1801,
    discoverer: 'Andrés Manuel del Río',
    summary: 'Vanadium (symbol V) is an element in Group 5, Period 4. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 43.29,
    geochemicalAbundanceOceanMgL: 0.4329,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 51,
        atomicMassU: 50.942,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 181.7,
        magneticMomentNu: 1.84
      },
      {
        massNumber: 52,
        atomicMassU: 51.944,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 188.4,
        magneticMomentNu: 1.68
      },
      {
        massNumber: 53,
        atomicMassU: 52.95,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 194.5,
        magneticMomentNu: 1.625
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 478.9,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 567.3,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 651.1,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'VO2',
        name: 'Vanadium Dioxide',
        oxidationState: 4,
        molarMassGmol: 82.94,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'VCl3',
        name: 'Vanadium Trichloride',
        oxidationState: 3,
        molarMassGmol: 157.292,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'V(NO3)2',
        name: 'Vanadium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 174.952,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 24,
    symbol: 'Cr',
    name: 'Chromium',
    atomicMass: 51.996,
    category: 'transition-metal',
    period: 4,
    group: 6,
    block: 'd',
    electronConfiguration: '[Ar] 3d⁵ 4s¹',
    electronegativityPauling: 1.66,
    electronegativityAllen: 1.74,
    ionizationEnergiesKjMol: [
      976,
      1858,
      3080,
      5020
    ],
    oxidationStates: [-4, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 118,
    meltingPointK: 2180,
    boilingPointK: 2944,
    densityGcm3: 7.19,
    heatOfFusionKjMol: 8.32,
    heatOfVaporizationKjMol: 45.76,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7464-4-1',
    discoveredYear: 1797,
    discoverer: 'Louis-Nicolas Vauquelin',
    summary: 'Chromium (symbol Cr) is an element in Group 6, Period 4. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 41.49,
    geochemicalAbundanceOceanMgL: 0.4149,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 52,
        atomicMassU: 51.996,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 189.6,
        magneticMomentNu: 1.92
      },
      {
        massNumber: 53,
        atomicMassU: 52.998,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 196.25,
        magneticMomentNu: 1.75
      },
      {
        massNumber: 54,
        atomicMassU: 54.004,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 202.28,
        magneticMomentNu: 1.69
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 483.2,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 572.4,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 653.8,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'CrO2',
        name: 'Chromium Dioxide',
        oxidationState: 4,
        molarMassGmol: 83.994,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'CrCl3',
        name: 'Chromium Trichloride',
        oxidationState: 3,
        molarMassGmol: 158.346,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Cr(NO3)2',
        name: 'Chromium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 176.006,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 25,
    symbol: 'Mn',
    name: 'Manganese',
    atomicMass: 54.938,
    category: 'transition-metal',
    period: 4,
    group: 7,
    block: 'd',
    electronConfiguration: '[Ar] 3d⁵ 4s²',
    electronegativityPauling: 1.55,
    electronegativityAllen: 1.63,
    ionizationEnergiesKjMol: [
      1000,
      1900,
      3145,
      5105
    ],
    oxidationStates: [-3, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 117,
    meltingPointK: 1519,
    boilingPointK: 2334,
    densityGcm3: 7.21,
    heatOfFusionKjMol: 8.79,
    heatOfVaporizationKjMol: 48.35,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7465-5-1',
    discoveredYear: 1774,
    discoverer: 'Johan Gottlieb Gahn',
    summary: 'Manganese (symbol Mn) is an element in Group 7, Period 4. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 39.84,
    geochemicalAbundanceOceanMgL: 0.3984,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 55,
        atomicMassU: 54.938,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 197.5,
        magneticMomentNu: 2
      },
      {
        massNumber: 56,
        atomicMassU: 55.94,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 204.1,
        magneticMomentNu: 1.82
      },
      {
        massNumber: 57,
        atomicMassU: 56.946,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 210.06,
        magneticMomentNu: 1.755
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 487.5,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 577.5,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 656.5,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'MnO2',
        name: 'Manganese Dioxide',
        oxidationState: 4,
        molarMassGmol: 86.936,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'MnCl3',
        name: 'Manganese Trichloride',
        oxidationState: 3,
        molarMassGmol: 161.288,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Mn(NO3)2',
        name: 'Manganese Dinitrate',
        oxidationState: 2,
        molarMassGmol: 178.948,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 26,
    symbol: 'Fe',
    name: 'Iron',
    atomicMass: 55.845,
    category: 'transition-metal',
    period: 4,
    group: 8,
    block: 'd',
    electronConfiguration: '[Ar] 3d⁶ 4s²',
    electronegativityPauling: 1.83,
    electronegativityAllen: 1.92,
    ionizationEnergiesKjMol: [
      1024,
      1942,
      3210,
      5190
    ],
    oxidationStates: [-2, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 115,
    meltingPointK: 1811,
    boilingPointK: 3134,
    densityGcm3: 7.874,
    heatOfFusionKjMol: 8.94,
    heatOfVaporizationKjMol: 49.14,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7466-6-1',
    discoveredYear: -3000,
    discoverer: 'Ancient civilizations',
    summary: 'Iron (symbol Fe) is an element in Group 8, Period 4. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 38.31,
    geochemicalAbundanceOceanMgL: 0.3831,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 56,
        atomicMassU: 55.845,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 205.4,
        magneticMomentNu: 2.08
      },
      {
        massNumber: 57,
        atomicMassU: 56.847,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 211.95,
        magneticMomentNu: 1.89
      },
      {
        massNumber: 58,
        atomicMassU: 57.853,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 217.84,
        magneticMomentNu: 1.82
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 491.8,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 582.6,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 659.2,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'FeO2',
        name: 'Iron Dioxide',
        oxidationState: 4,
        molarMassGmol: 87.843,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'FeCl3',
        name: 'Iron Trichloride',
        oxidationState: 3,
        molarMassGmol: 162.195,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Fe(NO3)2',
        name: 'Iron Dinitrate',
        oxidationState: 2,
        molarMassGmol: 179.855,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 27,
    symbol: 'Co',
    name: 'Cobalt',
    atomicMass: 58.933,
    category: 'transition-metal',
    period: 4,
    group: 9,
    block: 'd',
    electronConfiguration: '[Ar] 3d⁷ 4s²',
    electronegativityPauling: 1.88,
    electronegativityAllen: 1.97,
    ionizationEnergiesKjMol: [
      1048,
      1984,
      3275,
      5275
    ],
    oxidationStates: [-1, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 114,
    meltingPointK: 1768,
    boilingPointK: 3200,
    densityGcm3: 8.9,
    heatOfFusionKjMol: 9.43,
    heatOfVaporizationKjMol: 51.86,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7467-7-1',
    discoveredYear: 1735,
    discoverer: 'Georg Brandt',
    summary: 'Cobalt (symbol Co) is an element in Group 9, Period 4. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 36.9,
    geochemicalAbundanceOceanMgL: 0.369,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 59,
        atomicMassU: 58.933,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 213.3,
        magneticMomentNu: 2.16
      },
      {
        massNumber: 60,
        atomicMassU: 59.935,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 219.8,
        magneticMomentNu: 1.96
      },
      {
        massNumber: 61,
        atomicMassU: 60.941,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 225.62,
        magneticMomentNu: 1.885
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 496.1,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 587.7,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 661.9,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'CoO2',
        name: 'Cobalt Dioxide',
        oxidationState: 4,
        molarMassGmol: 90.931,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'CoCl3',
        name: 'Cobalt Trichloride',
        oxidationState: 3,
        molarMassGmol: 165.283,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Co(NO3)2',
        name: 'Cobalt Dinitrate',
        oxidationState: 2,
        molarMassGmol: 182.943,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 28,
    symbol: 'Ni',
    name: 'Nickel',
    atomicMass: 58.693,
    category: 'transition-metal',
    period: 4,
    group: 10,
    block: 'd',
    electronConfiguration: '[Ar] 3d⁸ 4s²',
    electronegativityPauling: 1.91,
    electronegativityAllen: 2.01,
    ionizationEnergiesKjMol: [
      1072,
      2026,
      3340,
      5360
    ],
    oxidationStates: [0, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 113,
    meltingPointK: 1728,
    boilingPointK: 3186,
    densityGcm3: 8.908,
    heatOfFusionKjMol: 9.39,
    heatOfVaporizationKjMol: 51.65,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7468-8-1',
    discoveredYear: 1751,
    discoverer: 'Axel Fredrik Cronstedt',
    summary: 'Nickel (symbol Ni) is an element in Group 10, Period 4. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 35.59,
    geochemicalAbundanceOceanMgL: 0.3559,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 59,
        atomicMassU: 58.693,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 221.2,
        magneticMomentNu: 2.24
      },
      {
        massNumber: 60,
        atomicMassU: 59.695,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 227.65,
        magneticMomentNu: 2.03
      },
      {
        massNumber: 61,
        atomicMassU: 60.701,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 233.4,
        magneticMomentNu: 1.95
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 500.4,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 592.8,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 664.6,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'NiO2',
        name: 'Nickel Dioxide',
        oxidationState: 4,
        molarMassGmol: 90.691,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'NiCl3',
        name: 'Nickel Trichloride',
        oxidationState: 3,
        molarMassGmol: 165.043,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ni(NO3)2',
        name: 'Nickel Dinitrate',
        oxidationState: 2,
        molarMassGmol: 182.703,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 29,
    symbol: 'Cu',
    name: 'Copper',
    atomicMass: 63.546,
    category: 'transition-metal',
    period: 4,
    group: 11,
    block: 'd',
    electronConfiguration: '[Ar] 3d¹⁰ 4s¹',
    electronegativityPauling: 1.9,
    electronegativityAllen: 1.99,
    ionizationEnergiesKjMol: [
      1096,
      2068,
      3405,
      5445
    ],
    oxidationStates: [1, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 112,
    meltingPointK: 1357.77,
    boilingPointK: 2835,
    densityGcm3: 8.96,
    heatOfFusionKjMol: 10.17,
    heatOfVaporizationKjMol: 55.92,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7469-9-1',
    discoveredYear: -9000,
    discoverer: 'Middle East civilizations',
    summary: 'Copper (symbol Cu) is an element in Group 11, Period 4. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 34.36,
    geochemicalAbundanceOceanMgL: 0.3436,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 64,
        atomicMassU: 63.546,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 229.1,
        magneticMomentNu: 2.32
      },
      {
        massNumber: 65,
        atomicMassU: 64.548,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 235.5,
        magneticMomentNu: 2.1
      },
      {
        massNumber: 66,
        atomicMassU: 65.554,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 241.18,
        magneticMomentNu: 2.015
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 504.7,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 597.9,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 667.3,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'CuO2',
        name: 'Copper Dioxide',
        oxidationState: 4,
        molarMassGmol: 95.544,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'CuCl3',
        name: 'Copper Trichloride',
        oxidationState: 3,
        molarMassGmol: 169.896,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Cu(NO3)2',
        name: 'Copper Dinitrate',
        oxidationState: 2,
        molarMassGmol: 187.556,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 30,
    symbol: 'Zn',
    name: 'Zinc',
    atomicMass: 65.38,
    category: 'transition-metal',
    period: 4,
    group: 12,
    block: 'd',
    electronConfiguration: '[Ar] 3d¹⁰ 4s²',
    electronegativityPauling: 1.65,
    electronegativityAllen: 1.73,
    ionizationEnergiesKjMol: [
      1120,
      2110,
      3470,
      5530
    ],
    oxidationStates: [2, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 111,
    meltingPointK: 692.68,
    boilingPointK: 1180,
    densityGcm3: 7.14,
    heatOfFusionKjMol: 10.46,
    heatOfVaporizationKjMol: 57.53,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7470-0-1',
    discoveredYear: -1000,
    discoverer: 'Indian metallurgists',
    summary: 'Zinc (symbol Zn) is an element in Group 12, Period 4. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 33.22,
    geochemicalAbundanceOceanMgL: 0.3322,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 65,
        atomicMassU: 65.38,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 237,
        magneticMomentNu: 2.4
      },
      {
        massNumber: 66,
        atomicMassU: 66.382,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 243.35,
        magneticMomentNu: 2.17
      },
      {
        massNumber: 67,
        atomicMassU: 67.388,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 248.96,
        magneticMomentNu: 2.08
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 509,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 603,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 670,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'ZnO2',
        name: 'Zinc Dioxide',
        oxidationState: 4,
        molarMassGmol: 97.378,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'ZnCl3',
        name: 'Zinc Trichloride',
        oxidationState: 3,
        molarMassGmol: 171.73,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Zn(NO3)2',
        name: 'Zinc Dinitrate',
        oxidationState: 2,
        molarMassGmol: 189.39,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 31,
    symbol: 'Ga',
    name: 'Gallium',
    atomicMass: 69.723,
    category: 'post-transition-metal',
    period: 4,
    group: 13,
    block: 'p',
    electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p¹',
    electronegativityPauling: 1.81,
    electronegativityAllen: 1.9,
    ionizationEnergiesKjMol: [
      1144,
      2152,
      3535,
      5615
    ],
    oxidationStates: [3, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 109,
    meltingPointK: 302.91,
    boilingPointK: 2477,
    densityGcm3: 5.91,
    heatOfFusionKjMol: 11.16,
    heatOfVaporizationKjMol: 61.36,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7471-1-1',
    discoveredYear: 1875,
    discoverer: 'Lecoq de Boisbaudran',
    summary: 'Gallium (symbol Ga) is an element in Group 13, Period 4. Classified under post-transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 32.15,
    geochemicalAbundanceOceanMgL: 0.3215,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 70,
        atomicMassU: 69.723,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 244.9,
        magneticMomentNu: 2.48
      },
      {
        massNumber: 71,
        atomicMassU: 70.725,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 251.2,
        magneticMomentNu: 2.24
      },
      {
        massNumber: 72,
        atomicMassU: 71.731,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 256.74,
        magneticMomentNu: 2.145
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 513.3,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 608.1,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 672.7,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'GaO2',
        name: 'Gallium Dioxide',
        oxidationState: 4,
        molarMassGmol: 101.721,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'GaCl3',
        name: 'Gallium Trichloride',
        oxidationState: 3,
        molarMassGmol: 176.073,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ga(NO3)2',
        name: 'Gallium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 193.733,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 32,
    symbol: 'Ge',
    name: 'Germanium',
    atomicMass: 72.63,
    category: 'metalloid',
    period: 4,
    group: 14,
    block: 'p',
    electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p²',
    electronegativityPauling: 2.01,
    electronegativityAllen: 2.11,
    ionizationEnergiesKjMol: [
      1168,
      2194,
      3600,
      5700
    ],
    oxidationStates: [4, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 108,
    meltingPointK: 1211.4,
    boilingPointK: 3106,
    densityGcm3: 5.323,
    heatOfFusionKjMol: 11.62,
    heatOfVaporizationKjMol: 63.91,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7472-2-1',
    discoveredYear: 1886,
    discoverer: 'Clemens Winkler',
    summary: 'Germanium (symbol Ge) is an element in Group 14, Period 4. Classified under metalloid, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 31.15,
    geochemicalAbundanceOceanMgL: 0.3115,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 73,
        atomicMassU: 72.63,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 252.8,
        magneticMomentNu: 2.56
      },
      {
        massNumber: 74,
        atomicMassU: 73.632,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 259.05,
        magneticMomentNu: 2.31
      },
      {
        massNumber: 75,
        atomicMassU: 74.638,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 264.52,
        magneticMomentNu: 2.21
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 517.6,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 613.2,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 675.4,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'GeO2',
        name: 'Germanium Dioxide',
        oxidationState: 4,
        molarMassGmol: 104.628,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'GeCl3',
        name: 'Germanium Trichloride',
        oxidationState: 3,
        molarMassGmol: 178.98,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ge(NO3)2',
        name: 'Germanium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 196.64,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 33,
    symbol: 'As',
    name: 'Arsenic',
    atomicMass: 74.922,
    category: 'metalloid',
    period: 4,
    group: 15,
    block: 'p',
    electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p³',
    electronegativityPauling: 2.18,
    electronegativityAllen: 2.29,
    ionizationEnergiesKjMol: [
      1192,
      2236,
      3665,
      5785
    ],
    oxidationStates: [5, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 107,
    meltingPointK: 1090,
    boilingPointK: 887,
    densityGcm3: 5.727,
    heatOfFusionKjMol: 11.99,
    heatOfVaporizationKjMol: 65.93,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7473-3-1',
    discoveredYear: 1250,
    discoverer: 'Albertus Magnus',
    summary: 'Arsenic (symbol As) is an element in Group 15, Period 4. Classified under metalloid, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 30.21,
    geochemicalAbundanceOceanMgL: 0.3021,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 75,
        atomicMassU: 74.922,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 260.7,
        magneticMomentNu: 2.64
      },
      {
        massNumber: 76,
        atomicMassU: 75.924,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 266.9,
        magneticMomentNu: 2.38
      },
      {
        massNumber: 77,
        atomicMassU: 76.93,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 272.3,
        magneticMomentNu: 2.275
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 521.9,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 618.3,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 678.1,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'AsO2',
        name: 'Arsenic Dioxide',
        oxidationState: 4,
        molarMassGmol: 106.92,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'AsCl3',
        name: 'Arsenic Trichloride',
        oxidationState: 3,
        molarMassGmol: 181.272,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'As(NO3)2',
        name: 'Arsenic Dinitrate',
        oxidationState: 2,
        molarMassGmol: 198.932,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 34,
    symbol: 'Se',
    name: 'Selenium',
    atomicMass: 78.971,
    category: 'reactive-nonmetal',
    period: 4,
    group: 16,
    block: 'p',
    electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p⁴',
    electronegativityPauling: 2.55,
    electronegativityAllen: 2.68,
    ionizationEnergiesKjMol: [
      1216,
      2278,
      3730,
      5870
    ],
    oxidationStates: [6, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 106,
    meltingPointK: 494,
    boilingPointK: 958,
    densityGcm3: 4.81,
    heatOfFusionKjMol: 12.64,
    heatOfVaporizationKjMol: 69.49,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7474-4-1',
    discoveredYear: 1817,
    discoverer: 'Jöns Jacob Berzelius',
    summary: 'Selenium (symbol Se) is an element in Group 16, Period 4. Classified under reactive-nonmetal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 29.33,
    geochemicalAbundanceOceanMgL: 0.2933,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 79,
        atomicMassU: 78.971,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 268.6,
        magneticMomentNu: 2.72
      },
      {
        massNumber: 80,
        atomicMassU: 79.973,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 274.75,
        magneticMomentNu: 2.45
      },
      {
        massNumber: 81,
        atomicMassU: 80.979,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 280.08,
        magneticMomentNu: 2.34
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 526.2,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 623.4,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 680.8,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'SeO2',
        name: 'Selenium Dioxide',
        oxidationState: 4,
        molarMassGmol: 110.969,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'SeCl3',
        name: 'Selenium Trichloride',
        oxidationState: 3,
        molarMassGmol: 185.321,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Se(NO3)2',
        name: 'Selenium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 202.981,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 35,
    symbol: 'Br',
    name: 'Bromine',
    atomicMass: 79.904,
    category: 'reactive-nonmetal',
    period: 4,
    group: 17,
    block: 'p',
    electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p⁵',
    electronegativityPauling: 2.96,
    electronegativityAllen: 3.11,
    ionizationEnergiesKjMol: [
      1240,
      2320,
      3795,
      5955
    ],
    oxidationStates: [7, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 105,
    meltingPointK: 265.8,
    boilingPointK: 332,
    densityGcm3: 3.103,
    heatOfFusionKjMol: 12.78,
    heatOfVaporizationKjMol: 70.32,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7475-5-1',
    discoveredYear: 1826,
    discoverer: 'Antoine Jérôme Balard',
    summary: 'Bromine (symbol Br) is an element in Group 17, Period 4. Classified under reactive-nonmetal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 28.49,
    geochemicalAbundanceOceanMgL: 0.2849,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 80,
        atomicMassU: 79.904,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 276.5,
        magneticMomentNu: 2.8
      },
      {
        massNumber: 81,
        atomicMassU: 80.906,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 282.6,
        magneticMomentNu: 2.52
      },
      {
        massNumber: 82,
        atomicMassU: 81.912,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 287.86,
        magneticMomentNu: 2.405
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 530.5,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 628.5,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 683.5,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'BrO2',
        name: 'Bromine Dioxide',
        oxidationState: 4,
        molarMassGmol: 111.902,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'BrCl3',
        name: 'Bromine Trichloride',
        oxidationState: 3,
        molarMassGmol: 186.254,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Br(NO3)2',
        name: 'Bromine Dinitrate',
        oxidationState: 2,
        molarMassGmol: 203.914,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 36,
    symbol: 'Kr',
    name: 'Krypton',
    atomicMass: 83.798,
    category: 'noble-gas',
    period: 4,
    group: 18,
    block: 'p',
    electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p⁶',
    electronegativityPauling: 3,
    electronegativityAllen: 3.15,
    ionizationEnergiesKjMol: [
      1264,
      2362,
      3860,
      6040
    ],
    oxidationStates: [8, 2, 3],
    covalentRadiusPm: 128,
    vanDerWaalsRadiusPm: 192,
    atomicRadiusEmpiricalPm: 103,
    meltingPointK: 115.79,
    boilingPointK: 119.93,
    densityGcm3: 0.0037,
    heatOfFusionKjMol: 13.41,
    heatOfVaporizationKjMol: 73.74,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7476-6-1',
    discoveredYear: 1898,
    discoverer: 'William Ramsay, Morris Travers',
    summary: 'Krypton (symbol Kr) is an element in Group 18, Period 4. Classified under noble-gas, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 27.7,
    geochemicalAbundanceOceanMgL: 0.277,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 84,
        atomicMassU: 83.798,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 284.4,
        magneticMomentNu: 2.88
      },
      {
        massNumber: 85,
        atomicMassU: 84.8,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 290.45,
        magneticMomentNu: 2.59
      },
      {
        massNumber: 86,
        atomicMassU: 85.806,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 295.64,
        magneticMomentNu: 2.47
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 534.8,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 633.6,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 686.2,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'KrO2',
        name: 'Krypton Dioxide',
        oxidationState: 4,
        molarMassGmol: 115.796,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'KrCl3',
        name: 'Krypton Trichloride',
        oxidationState: 3,
        molarMassGmol: 190.148,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Kr(NO3)2',
        name: 'Krypton Dinitrate',
        oxidationState: 2,
        molarMassGmol: 207.808,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 37,
    symbol: 'Rb',
    name: 'Rubidium',
    atomicMass: 85.468,
    category: 'alkali-metal',
    period: 5,
    group: 1,
    block: 's',
    electronConfiguration: '[Kr] 5s¹',
    electronegativityPauling: 0.82,
    electronegativityAllen: 0.86,
    ionizationEnergiesKjMol: [
      1288,
      2404,
      3925,
      6125
    ],
    oxidationStates: [1, 0, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 144,
    meltingPointK: 312.46,
    boilingPointK: 961,
    densityGcm3: 1.532,
    heatOfFusionKjMol: 13.67,
    heatOfVaporizationKjMol: 75.21,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7477-7-1',
    discoveredYear: 1861,
    discoverer: 'Robert Bunsen, Gustav Kirchhoff',
    summary: 'Rubidium (symbol Rb) is an element in Group 1, Period 5. Classified under alkali-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 26.95,
    geochemicalAbundanceOceanMgL: 0.2695,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 85,
        atomicMassU: 85.468,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 292.3,
        magneticMomentNu: 2.96
      },
      {
        massNumber: 86,
        atomicMassU: 86.47,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 298.3,
        magneticMomentNu: 2.66
      },
      {
        massNumber: 87,
        atomicMassU: 87.476,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 303.42,
        magneticMomentNu: 2.535
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 539.1,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 638.7,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 688.9,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'RbO2',
        name: 'Rubidium Dioxide',
        oxidationState: 4,
        molarMassGmol: 117.466,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'RbCl3',
        name: 'Rubidium Trichloride',
        oxidationState: 3,
        molarMassGmol: 191.818,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Rb(NO3)2',
        name: 'Rubidium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 209.478,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 38,
    symbol: 'Sr',
    name: 'Strontium',
    atomicMass: 87.62,
    category: 'alkaline-earth',
    period: 5,
    group: 2,
    block: 's',
    electronConfiguration: '[Kr] 5s²',
    electronegativityPauling: 0.95,
    electronegativityAllen: 1,
    ionizationEnergiesKjMol: [
      1312,
      2446,
      3990,
      6210
    ],
    oxidationStates: [2, 0, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 143,
    meltingPointK: 1050,
    boilingPointK: 1655,
    densityGcm3: 2.64,
    heatOfFusionKjMol: 14.02,
    heatOfVaporizationKjMol: 77.11,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7478-8-1',
    discoveredYear: 1790,
    discoverer: 'Adair Crawford',
    summary: 'Strontium (symbol Sr) is an element in Group 2, Period 5. Classified under alkaline-earth, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 26.25,
    geochemicalAbundanceOceanMgL: 0.2625,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 88,
        atomicMassU: 87.62,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 300.2,
        magneticMomentNu: 3.04
      },
      {
        massNumber: 89,
        atomicMassU: 88.622,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 306.15,
        magneticMomentNu: 2.73
      },
      {
        massNumber: 90,
        atomicMassU: 89.628,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 311.2,
        magneticMomentNu: 2.6
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 543.4,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 643.8,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 691.6,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'SrO2',
        name: 'Strontium Dioxide',
        oxidationState: 4,
        molarMassGmol: 119.618,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'SrCl3',
        name: 'Strontium Trichloride',
        oxidationState: 3,
        molarMassGmol: 193.97,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Sr(NO3)2',
        name: 'Strontium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 211.63,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 39,
    symbol: 'Y',
    name: 'Yttrium',
    atomicMass: 88.906,
    category: 'transition-metal',
    period: 5,
    group: 3,
    block: 'd',
    electronConfiguration: '[Kr] 4d¹ 5s²',
    electronegativityPauling: 1.22,
    electronegativityAllen: 1.28,
    ionizationEnergiesKjMol: [
      1336,
      2488,
      4055,
      6295
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 141,
    meltingPointK: 1799,
    boilingPointK: 3609,
    densityGcm3: 4.472,
    heatOfFusionKjMol: 14.22,
    heatOfVaporizationKjMol: 78.24,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7479-9-1',
    discoveredYear: 1794,
    discoverer: 'Johan Gadolin',
    summary: 'Yttrium (symbol Y) is an element in Group 3, Period 5. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 25.58,
    geochemicalAbundanceOceanMgL: 0.2558,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 89,
        atomicMassU: 88.906,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 308.1,
        magneticMomentNu: 3.12
      },
      {
        massNumber: 90,
        atomicMassU: 89.908,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 314,
        magneticMomentNu: 2.8
      },
      {
        massNumber: 91,
        atomicMassU: 90.914,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 318.98,
        magneticMomentNu: 2.665
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 547.7,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 648.9,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 694.3,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'YO2',
        name: 'Yttrium Dioxide',
        oxidationState: 4,
        molarMassGmol: 120.904,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'YCl3',
        name: 'Yttrium Trichloride',
        oxidationState: 3,
        molarMassGmol: 195.256,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Y(NO3)2',
        name: 'Yttrium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 212.916,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 40,
    symbol: 'Zr',
    name: 'Zirconium',
    atomicMass: 91.224,
    category: 'transition-metal',
    period: 5,
    group: 4,
    block: 'd',
    electronConfiguration: '[Kr] 4d² 5s²',
    electronegativityPauling: 1.33,
    electronegativityAllen: 1.4,
    ionizationEnergiesKjMol: [
      1360,
      2530,
      4120,
      6380
    ],
    oxidationStates: [-6, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 140,
    meltingPointK: 2128,
    boilingPointK: 4682,
    densityGcm3: 6.52,
    heatOfFusionKjMol: 14.6,
    heatOfVaporizationKjMol: 80.28,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7480-0-1',
    discoveredYear: 1789,
    discoverer: 'Martin Heinrich Klaproth',
    summary: 'Zirconium (symbol Zr) is an element in Group 4, Period 5. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 24.94,
    geochemicalAbundanceOceanMgL: 0.2494,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 91,
        atomicMassU: 91.224,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 316,
        magneticMomentNu: 3.2
      },
      {
        massNumber: 92,
        atomicMassU: 92.226,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 321.85,
        magneticMomentNu: 2.87
      },
      {
        massNumber: 93,
        atomicMassU: 93.232,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 326.76,
        magneticMomentNu: 2.73
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 552,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 654,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 697,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'ZrO2',
        name: 'Zirconium Dioxide',
        oxidationState: 4,
        molarMassGmol: 123.222,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'ZrCl3',
        name: 'Zirconium Trichloride',
        oxidationState: 3,
        molarMassGmol: 197.574,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Zr(NO3)2',
        name: 'Zirconium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 215.234,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 41,
    symbol: 'Nb',
    name: 'Niobium',
    atomicMass: 92.906,
    category: 'transition-metal',
    period: 5,
    group: 5,
    block: 'd',
    electronConfiguration: '[Kr] 4d⁴ 5s¹',
    electronegativityPauling: 1.6,
    electronegativityAllen: 1.68,
    ionizationEnergiesKjMol: [
      1384,
      2572,
      4185,
      6465
    ],
    oxidationStates: [-5, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 139,
    meltingPointK: 2750,
    boilingPointK: 5017,
    densityGcm3: 8.57,
    heatOfFusionKjMol: 14.86,
    heatOfVaporizationKjMol: 81.76,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7481-1-1',
    discoveredYear: 1801,
    discoverer: 'Charles Hatchett',
    summary: 'Niobium (symbol Nb) is an element in Group 5, Period 5. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 24.33,
    geochemicalAbundanceOceanMgL: 0.2433,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 93,
        atomicMassU: 92.906,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 323.9,
        magneticMomentNu: 3.28
      },
      {
        massNumber: 94,
        atomicMassU: 93.908,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 329.7,
        magneticMomentNu: 2.94
      },
      {
        massNumber: 95,
        atomicMassU: 94.914,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 334.54,
        magneticMomentNu: 2.795
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 556.3,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 659.1,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 699.7,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'NbO2',
        name: 'Niobium Dioxide',
        oxidationState: 4,
        molarMassGmol: 124.904,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'NbCl3',
        name: 'Niobium Trichloride',
        oxidationState: 3,
        molarMassGmol: 199.256,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Nb(NO3)2',
        name: 'Niobium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 216.916,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 42,
    symbol: 'Mo',
    name: 'Molybdenum',
    atomicMass: 95.95,
    category: 'transition-metal',
    period: 5,
    group: 6,
    block: 'd',
    electronConfiguration: '[Kr] 4d⁵ 5s¹',
    electronegativityPauling: 2.16,
    electronegativityAllen: 2.27,
    ionizationEnergiesKjMol: [
      1408,
      2614,
      4250,
      6550
    ],
    oxidationStates: [-4, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 138,
    meltingPointK: 2896,
    boilingPointK: 4912,
    densityGcm3: 10.28,
    heatOfFusionKjMol: 15.35,
    heatOfVaporizationKjMol: 84.44,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7482-2-1',
    discoveredYear: 1778,
    discoverer: 'Carl Wilhelm Scheele',
    summary: 'Molybdenum (symbol Mo) is an element in Group 6, Period 5. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 23.75,
    geochemicalAbundanceOceanMgL: 0.2375,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 96,
        atomicMassU: 95.95,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 331.8,
        magneticMomentNu: 3.36
      },
      {
        massNumber: 97,
        atomicMassU: 96.952,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 337.55,
        magneticMomentNu: 3.01
      },
      {
        massNumber: 98,
        atomicMassU: 97.958,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 342.32,
        magneticMomentNu: 2.86
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 560.6,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 664.2,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 702.4,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'MoO2',
        name: 'Molybdenum Dioxide',
        oxidationState: 4,
        molarMassGmol: 127.948,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'MoCl3',
        name: 'Molybdenum Trichloride',
        oxidationState: 3,
        molarMassGmol: 202.3,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Mo(NO3)2',
        name: 'Molybdenum Dinitrate',
        oxidationState: 2,
        molarMassGmol: 219.96,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 43,
    symbol: 'Tc',
    name: 'Technetium',
    atomicMass: 98,
    category: 'transition-metal',
    period: 5,
    group: 7,
    block: 'd',
    electronConfiguration: '[Kr] 4d⁵ 5s²',
    electronegativityPauling: 1.9,
    electronegativityAllen: 1.99,
    ionizationEnergiesKjMol: [
      1432,
      2656,
      4315,
      6635
    ],
    oxidationStates: [-3, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 137,
    meltingPointK: 2430,
    boilingPointK: 4538,
    densityGcm3: 11.5,
    heatOfFusionKjMol: 15.68,
    heatOfVaporizationKjMol: 86.24,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7483-3-1',
    discoveredYear: 1937,
    discoverer: 'Emilio Segrè, Carlo Perrier',
    summary: 'Technetium (symbol Tc) is an element in Group 7, Period 5. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 23.2,
    geochemicalAbundanceOceanMgL: 0.232,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 98,
        atomicMassU: 98,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 339.7,
        magneticMomentNu: 3.44
      },
      {
        massNumber: 99,
        atomicMassU: 99.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 345.4,
        magneticMomentNu: 3.08
      },
      {
        massNumber: 100,
        atomicMassU: 100.008,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 350.1,
        magneticMomentNu: 2.925
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 564.9,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 669.3,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 705.1,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'TcO2',
        name: 'Technetium Dioxide',
        oxidationState: 4,
        molarMassGmol: 129.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'TcCl3',
        name: 'Technetium Trichloride',
        oxidationState: 3,
        molarMassGmol: 204.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Tc(NO3)2',
        name: 'Technetium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 222.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 44,
    symbol: 'Ru',
    name: 'Ruthenium',
    atomicMass: 101.07,
    category: 'transition-metal',
    period: 5,
    group: 8,
    block: 'd',
    electronConfiguration: '[Kr] 4d⁷ 5s¹',
    electronegativityPauling: 2.2,
    electronegativityAllen: 2.31,
    ionizationEnergiesKjMol: [
      1456,
      2698,
      4380,
      6720
    ],
    oxidationStates: [-2, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 135,
    meltingPointK: 2607,
    boilingPointK: 4423,
    densityGcm3: 12.45,
    heatOfFusionKjMol: 16.17,
    heatOfVaporizationKjMol: 88.94,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7484-4-1',
    discoveredYear: 1844,
    discoverer: 'Karl Ernst Claus',
    summary: 'Ruthenium (symbol Ru) is an element in Group 8, Period 5. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 22.68,
    geochemicalAbundanceOceanMgL: 0.2268,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 101,
        atomicMassU: 101.07,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 347.6,
        magneticMomentNu: 3.52
      },
      {
        massNumber: 102,
        atomicMassU: 102.072,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 353.25,
        magneticMomentNu: 3.15
      },
      {
        massNumber: 103,
        atomicMassU: 103.078,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 357.88,
        magneticMomentNu: 2.99
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 569.2,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 674.4,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 707.8,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'RuO2',
        name: 'Ruthenium Dioxide',
        oxidationState: 4,
        molarMassGmol: 133.068,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'RuCl3',
        name: 'Ruthenium Trichloride',
        oxidationState: 3,
        molarMassGmol: 207.42,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ru(NO3)2',
        name: 'Ruthenium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 225.08,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 45,
    symbol: 'Rh',
    name: 'Rhodium',
    atomicMass: 102.91,
    category: 'transition-metal',
    period: 5,
    group: 9,
    block: 'd',
    electronConfiguration: '[Kr] 4d⁸ 5s¹',
    electronegativityPauling: 2.28,
    electronegativityAllen: 2.39,
    ionizationEnergiesKjMol: [
      1480,
      2740,
      4445,
      6805
    ],
    oxidationStates: [-1, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 134,
    meltingPointK: 2237,
    boilingPointK: 3968,
    densityGcm3: 12.41,
    heatOfFusionKjMol: 16.47,
    heatOfVaporizationKjMol: 90.56,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7485-5-1',
    discoveredYear: 1803,
    discoverer: 'William Hyde Wollaston',
    summary: 'Rhodium (symbol Rh) is an element in Group 9, Period 5. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 22.17,
    geochemicalAbundanceOceanMgL: 0.2217,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 103,
        atomicMassU: 102.91,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 355.5,
        magneticMomentNu: 3.6
      },
      {
        massNumber: 104,
        atomicMassU: 103.912,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 361.1,
        magneticMomentNu: 3.22
      },
      {
        massNumber: 105,
        atomicMassU: 104.918,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 365.66,
        magneticMomentNu: 3.055
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 573.5,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 679.5,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 710.5,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'RhO2',
        name: 'Rhodium Dioxide',
        oxidationState: 4,
        molarMassGmol: 134.908,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'RhCl3',
        name: 'Rhodium Trichloride',
        oxidationState: 3,
        molarMassGmol: 209.26,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Rh(NO3)2',
        name: 'Rhodium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 226.92,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 46,
    symbol: 'Pd',
    name: 'Palladium',
    atomicMass: 106.42,
    category: 'transition-metal',
    period: 5,
    group: 10,
    block: 'd',
    electronConfiguration: '[Kr] 4d¹⁰',
    electronegativityPauling: 2.2,
    electronegativityAllen: 2.31,
    ionizationEnergiesKjMol: [
      1504,
      2782,
      4510,
      6890
    ],
    oxidationStates: [0, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 133,
    meltingPointK: 1828.05,
    boilingPointK: 3236,
    densityGcm3: 12.023,
    heatOfFusionKjMol: 17.03,
    heatOfVaporizationKjMol: 93.65,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7486-6-1',
    discoveredYear: 1802,
    discoverer: 'William Hyde Wollaston',
    summary: 'Palladium (symbol Pd) is an element in Group 10, Period 5. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 21.69,
    geochemicalAbundanceOceanMgL: 0.2169,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 106,
        atomicMassU: 106.42,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 363.4,
        magneticMomentNu: 3.68
      },
      {
        massNumber: 107,
        atomicMassU: 107.422,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 368.95,
        magneticMomentNu: 3.29
      },
      {
        massNumber: 108,
        atomicMassU: 108.428,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 373.44,
        magneticMomentNu: 3.12
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 577.8,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 684.6,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 713.2,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'PdO2',
        name: 'Palladium Dioxide',
        oxidationState: 4,
        molarMassGmol: 138.418,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'PdCl3',
        name: 'Palladium Trichloride',
        oxidationState: 3,
        molarMassGmol: 212.77,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Pd(NO3)2',
        name: 'Palladium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 230.43,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 47,
    symbol: 'Ag',
    name: 'Silver',
    atomicMass: 107.87,
    category: 'transition-metal',
    period: 5,
    group: 11,
    block: 'd',
    electronConfiguration: '[Kr] 4d¹⁰ 5s¹',
    electronegativityPauling: 1.93,
    electronegativityAllen: 2.03,
    ionizationEnergiesKjMol: [
      1528,
      2824,
      4575,
      6975
    ],
    oxidationStates: [1, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 132,
    meltingPointK: 1234.93,
    boilingPointK: 2435,
    densityGcm3: 10.49,
    heatOfFusionKjMol: 17.26,
    heatOfVaporizationKjMol: 94.93,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7487-7-1',
    discoveredYear: -3000,
    discoverer: 'Ancient civilizations',
    summary: 'Silver (symbol Ag) is an element in Group 11, Period 5. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 21.23,
    geochemicalAbundanceOceanMgL: 0.2123,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 108,
        atomicMassU: 107.87,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 371.3,
        magneticMomentNu: 3.76
      },
      {
        massNumber: 109,
        atomicMassU: 108.872,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 376.8,
        magneticMomentNu: 3.36
      },
      {
        massNumber: 110,
        atomicMassU: 109.878,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 381.22,
        magneticMomentNu: 3.185
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 582.1,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 689.7,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 715.9,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'AgO2',
        name: 'Silver Dioxide',
        oxidationState: 4,
        molarMassGmol: 139.868,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'AgCl3',
        name: 'Silver Trichloride',
        oxidationState: 3,
        molarMassGmol: 214.22,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ag(NO3)2',
        name: 'Silver Dinitrate',
        oxidationState: 2,
        molarMassGmol: 231.88,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 48,
    symbol: 'Cd',
    name: 'Cadmium',
    atomicMass: 112.41,
    category: 'transition-metal',
    period: 5,
    group: 12,
    block: 'd',
    electronConfiguration: '[Kr] 4d¹⁰ 5s²',
    electronegativityPauling: 1.69,
    electronegativityAllen: 1.77,
    ionizationEnergiesKjMol: [
      1552,
      2866,
      4640,
      7060
    ],
    oxidationStates: [2, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 131,
    meltingPointK: 594.22,
    boilingPointK: 1040,
    densityGcm3: 8.65,
    heatOfFusionKjMol: 17.99,
    heatOfVaporizationKjMol: 98.92,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7488-8-1',
    discoveredYear: 1817,
    discoverer: 'Karl Samuel Leberecht Hermann',
    summary: 'Cadmium (symbol Cd) is an element in Group 12, Period 5. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 20.79,
    geochemicalAbundanceOceanMgL: 0.2079,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 112,
        atomicMassU: 112.41,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 379.2,
        magneticMomentNu: 3.84
      },
      {
        massNumber: 113,
        atomicMassU: 113.412,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 384.65,
        magneticMomentNu: 3.43
      },
      {
        massNumber: 114,
        atomicMassU: 114.418,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 389,
        magneticMomentNu: 3.25
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 586.4,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 694.8,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 718.6,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'CdO2',
        name: 'Cadmium Dioxide',
        oxidationState: 4,
        molarMassGmol: 144.408,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'CdCl3',
        name: 'Cadmium Trichloride',
        oxidationState: 3,
        molarMassGmol: 218.76,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Cd(NO3)2',
        name: 'Cadmium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 236.42,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 49,
    symbol: 'In',
    name: 'Indium',
    atomicMass: 114.82,
    category: 'post-transition-metal',
    period: 5,
    group: 13,
    block: 'p',
    electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p¹',
    electronegativityPauling: 1.78,
    electronegativityAllen: 1.87,
    ionizationEnergiesKjMol: [
      1576,
      2908,
      4705,
      7145
    ],
    oxidationStates: [3, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 129,
    meltingPointK: 429.75,
    boilingPointK: 2345,
    densityGcm3: 7.31,
    heatOfFusionKjMol: 18.37,
    heatOfVaporizationKjMol: 101.04,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7489-9-1',
    discoveredYear: 1863,
    discoverer: 'Ferdinand Reich, Hieronymous Theodor Richter',
    summary: 'Indium (symbol In) is an element in Group 13, Period 5. Classified under post-transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 20.37,
    geochemicalAbundanceOceanMgL: 0.2037,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 115,
        atomicMassU: 114.82,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 387.1,
        magneticMomentNu: 3.92
      },
      {
        massNumber: 116,
        atomicMassU: 115.822,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 392.5,
        magneticMomentNu: 3.5
      },
      {
        massNumber: 117,
        atomicMassU: 116.828,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 396.78,
        magneticMomentNu: 3.315
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 590.7,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 699.9,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 721.3,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'InO2',
        name: 'Indium Dioxide',
        oxidationState: 4,
        molarMassGmol: 146.818,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'InCl3',
        name: 'Indium Trichloride',
        oxidationState: 3,
        molarMassGmol: 221.17,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'In(NO3)2',
        name: 'Indium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 238.83,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 50,
    symbol: 'Sn',
    name: 'Tin',
    atomicMass: 118.71,
    category: 'post-transition-metal',
    period: 5,
    group: 14,
    block: 'p',
    electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p²',
    electronegativityPauling: 1.96,
    electronegativityAllen: 2.06,
    ionizationEnergiesKjMol: [
      1600,
      2950,
      4770,
      7230
    ],
    oxidationStates: [4, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 128,
    meltingPointK: 505.08,
    boilingPointK: 2875,
    densityGcm3: 7.287,
    heatOfFusionKjMol: 18.99,
    heatOfVaporizationKjMol: 104.46,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7490-0-1',
    discoveredYear: -3000,
    discoverer: 'Ancient civilizations',
    summary: 'Tin (symbol Sn) is an element in Group 14, Period 5. Classified under post-transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 19.96,
    geochemicalAbundanceOceanMgL: 0.1996,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 119,
        atomicMassU: 118.71,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 395,
        magneticMomentNu: 4
      },
      {
        massNumber: 120,
        atomicMassU: 119.712,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 400.35,
        magneticMomentNu: 3.57
      },
      {
        massNumber: 121,
        atomicMassU: 120.718,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 404.56,
        magneticMomentNu: 3.38
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 595,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 705,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 724,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'SnO2',
        name: 'Tin Dioxide',
        oxidationState: 4,
        molarMassGmol: 150.708,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'SnCl3',
        name: 'Tin Trichloride',
        oxidationState: 3,
        molarMassGmol: 225.06,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Sn(NO3)2',
        name: 'Tin Dinitrate',
        oxidationState: 2,
        molarMassGmol: 242.72,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 51,
    symbol: 'Sb',
    name: 'Antimony',
    atomicMass: 121.76,
    category: 'metalloid',
    period: 5,
    group: 15,
    block: 'p',
    electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p³',
    electronegativityPauling: 2.05,
    electronegativityAllen: 2.15,
    ionizationEnergiesKjMol: [
      1624,
      2992,
      4835,
      7315
    ],
    oxidationStates: [5, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 127,
    meltingPointK: 903.78,
    boilingPointK: 1860,
    densityGcm3: 6.697,
    heatOfFusionKjMol: 19.48,
    heatOfVaporizationKjMol: 107.15,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7491-1-1',
    discoveredYear: -3000,
    discoverer: 'Ancient civilizations',
    summary: 'Antimony (symbol Sb) is an element in Group 15, Period 5. Classified under metalloid, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 19.57,
    geochemicalAbundanceOceanMgL: 0.1957,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 122,
        atomicMassU: 121.76,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 402.9,
        magneticMomentNu: 4.08
      },
      {
        massNumber: 123,
        atomicMassU: 122.762,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 408.2,
        magneticMomentNu: 3.64
      },
      {
        massNumber: 124,
        atomicMassU: 123.768,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 412.34,
        magneticMomentNu: 3.445
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 599.3,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 710.1,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 726.7,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'SbO2',
        name: 'Antimony Dioxide',
        oxidationState: 4,
        molarMassGmol: 153.758,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'SbCl3',
        name: 'Antimony Trichloride',
        oxidationState: 3,
        molarMassGmol: 228.11,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Sb(NO3)2',
        name: 'Antimony Dinitrate',
        oxidationState: 2,
        molarMassGmol: 245.77,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 52,
    symbol: 'Te',
    name: 'Tellurium',
    atomicMass: 127.6,
    category: 'metalloid',
    period: 5,
    group: 16,
    block: 'p',
    electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p⁴',
    electronegativityPauling: 2.1,
    electronegativityAllen: 2.21,
    ionizationEnergiesKjMol: [
      1648,
      3034,
      4900,
      7400
    ],
    oxidationStates: [6, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 126,
    meltingPointK: 722.66,
    boilingPointK: 1261,
    densityGcm3: 6.24,
    heatOfFusionKjMol: 20.42,
    heatOfVaporizationKjMol: 112.29,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7492-2-1',
    discoveredYear: 1782,
    discoverer: 'Franz-Joseph Müller von Reichenstein',
    summary: 'Tellurium (symbol Te) is an element in Group 16, Period 5. Classified under metalloid, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 19.19,
    geochemicalAbundanceOceanMgL: 0.1919,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 128,
        atomicMassU: 127.6,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 410.8,
        magneticMomentNu: 4.16
      },
      {
        massNumber: 129,
        atomicMassU: 128.602,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 416.05,
        magneticMomentNu: 3.71
      },
      {
        massNumber: 130,
        atomicMassU: 129.608,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 420.12,
        magneticMomentNu: 3.51
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 603.6,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 715.2,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 729.4,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'TeO2',
        name: 'Tellurium Dioxide',
        oxidationState: 4,
        molarMassGmol: 159.598,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'TeCl3',
        name: 'Tellurium Trichloride',
        oxidationState: 3,
        molarMassGmol: 233.95,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Te(NO3)2',
        name: 'Tellurium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 251.61,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 53,
    symbol: 'I',
    name: 'Iodine',
    atomicMass: 126.9,
    category: 'reactive-nonmetal',
    period: 5,
    group: 17,
    block: 'p',
    electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p⁵',
    electronegativityPauling: 2.66,
    electronegativityAllen: 2.79,
    ionizationEnergiesKjMol: [
      1672,
      3076,
      4965,
      7485
    ],
    oxidationStates: [7, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 125,
    meltingPointK: 386.85,
    boilingPointK: 457.4,
    densityGcm3: 4.933,
    heatOfFusionKjMol: 20.3,
    heatOfVaporizationKjMol: 111.67,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7493-3-1',
    discoveredYear: 1811,
    discoverer: 'Bernard Courtois',
    summary: 'Iodine (symbol I) is an element in Group 17, Period 5. Classified under reactive-nonmetal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 18.83,
    geochemicalAbundanceOceanMgL: 0.1883,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 127,
        atomicMassU: 126.9,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 418.7,
        magneticMomentNu: 4.24
      },
      {
        massNumber: 128,
        atomicMassU: 127.902,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 423.9,
        magneticMomentNu: 3.78
      },
      {
        massNumber: 129,
        atomicMassU: 128.908,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 427.9,
        magneticMomentNu: 3.575
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 607.9,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 450.3,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 732.1,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'IO2',
        name: 'Iodine Dioxide',
        oxidationState: 4,
        molarMassGmol: 158.898,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'ICl3',
        name: 'Iodine Trichloride',
        oxidationState: 3,
        molarMassGmol: 233.25,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'I(NO3)2',
        name: 'Iodine Dinitrate',
        oxidationState: 2,
        molarMassGmol: 250.91,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 54,
    symbol: 'Xe',
    name: 'Xenon',
    atomicMass: 131.29,
    category: 'noble-gas',
    period: 5,
    group: 18,
    block: 'p',
    electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p⁶',
    electronegativityPauling: 2.6,
    electronegativityAllen: 2.73,
    ionizationEnergiesKjMol: [
      1696,
      3118,
      5030,
      7570
    ],
    oxidationStates: [8, 2, 3],
    covalentRadiusPm: 150,
    vanDerWaalsRadiusPm: 210,
    atomicRadiusEmpiricalPm: 123,
    meltingPointK: 161.4,
    boilingPointK: 165.03,
    densityGcm3: 0.0059,
    heatOfFusionKjMol: 21.01,
    heatOfVaporizationKjMol: 115.54,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7494-4-1',
    discoveredYear: 1898,
    discoverer: 'William Ramsay, Morris Travers',
    summary: 'Xenon (symbol Xe) is an element in Group 18, Period 5. Classified under noble-gas, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 18.48,
    geochemicalAbundanceOceanMgL: 0.1848,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 131,
        atomicMassU: 131.29,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 426.6,
        magneticMomentNu: 4.32
      },
      {
        massNumber: 132,
        atomicMassU: 132.292,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 431.75,
        magneticMomentNu: 3.85
      },
      {
        massNumber: 133,
        atomicMassU: 133.298,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 435.68,
        magneticMomentNu: 3.64
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 612.2,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 455.4,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 734.8,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'XeO2',
        name: 'Xenon Dioxide',
        oxidationState: 4,
        molarMassGmol: 163.288,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'XeCl3',
        name: 'Xenon Trichloride',
        oxidationState: 3,
        molarMassGmol: 237.64,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Xe(NO3)2',
        name: 'Xenon Dinitrate',
        oxidationState: 2,
        molarMassGmol: 255.3,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 55,
    symbol: 'Cs',
    name: 'Caesium',
    atomicMass: 132.91,
    category: 'alkali-metal',
    period: 6,
    group: 1,
    block: 's',
    electronConfiguration: '[Xe] 6s¹',
    electronegativityPauling: 0.79,
    electronegativityAllen: 0.83,
    ionizationEnergiesKjMol: [
      1720,
      3160,
      5095,
      7655
    ],
    oxidationStates: [1, 0, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 164,
    meltingPointK: 301.7,
    boilingPointK: 944,
    densityGcm3: 1.93,
    heatOfFusionKjMol: 21.27,
    heatOfVaporizationKjMol: 116.96,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7495-5-1',
    discoveredYear: 1860,
    discoverer: 'Robert Bunsen, Gustav Kirchhoff',
    summary: 'Caesium (symbol Cs) is an element in Group 1, Period 6. Classified under alkali-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 18.15,
    geochemicalAbundanceOceanMgL: 0.1815,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 133,
        atomicMassU: 132.91,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 434.5,
        magneticMomentNu: 4.4
      },
      {
        massNumber: 134,
        atomicMassU: 133.912,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 439.6,
        magneticMomentNu: 3.92
      },
      {
        massNumber: 135,
        atomicMassU: 134.918,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 443.46,
        magneticMomentNu: 3.705
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 616.5,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 460.5,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 737.5,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'CsO2',
        name: 'Caesium Dioxide',
        oxidationState: 4,
        molarMassGmol: 164.908,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'CsCl3',
        name: 'Caesium Trichloride',
        oxidationState: 3,
        molarMassGmol: 239.26,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Cs(NO3)2',
        name: 'Caesium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 256.92,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 56,
    symbol: 'Ba',
    name: 'Barium',
    atomicMass: 137.33,
    category: 'alkaline-earth',
    period: 6,
    group: 2,
    block: 's',
    electronConfiguration: '[Xe] 6s²',
    electronegativityPauling: 0.89,
    electronegativityAllen: 0.93,
    ionizationEnergiesKjMol: [
      1744,
      3202,
      5160,
      7740
    ],
    oxidationStates: [2, 0, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 163,
    meltingPointK: 1000,
    boilingPointK: 2170,
    densityGcm3: 3.51,
    heatOfFusionKjMol: 21.97,
    heatOfVaporizationKjMol: 120.85,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7496-6-1',
    discoveredYear: 1808,
    discoverer: 'Humphry Davy',
    summary: 'Barium (symbol Ba) is an element in Group 2, Period 6. Classified under alkaline-earth, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 17.83,
    geochemicalAbundanceOceanMgL: 0.1783,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 137,
        atomicMassU: 137.33,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 442.4,
        magneticMomentNu: 4.48
      },
      {
        massNumber: 138,
        atomicMassU: 138.332,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 447.45,
        magneticMomentNu: 3.99
      },
      {
        massNumber: 139,
        atomicMassU: 139.338,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 451.24,
        magneticMomentNu: 3.77
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 620.8,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 465.6,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 740.2,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'BaO2',
        name: 'Barium Dioxide',
        oxidationState: 4,
        molarMassGmol: 169.328,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'BaCl3',
        name: 'Barium Trichloride',
        oxidationState: 3,
        molarMassGmol: 243.68,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ba(NO3)2',
        name: 'Barium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 261.34,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 57,
    symbol: 'La',
    name: 'Lanthanum',
    atomicMass: 138.91,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 5d¹ 6s²',
    electronegativityPauling: 1.1,
    electronegativityAllen: 1.16,
    ionizationEnergiesKjMol: [
      1768,
      3244,
      5225,
      7825
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1193,
    boilingPointK: 3737,
    densityGcm3: 6.162,
    heatOfFusionKjMol: 22.23,
    heatOfVaporizationKjMol: 122.24,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7497-7-1',
    discoveredYear: 1839,
    discoverer: 'Carl Gustaf Mosander',
    summary: 'Lanthanum (symbol La) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 17.51,
    geochemicalAbundanceOceanMgL: 0.1751,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 139,
        atomicMassU: 138.91,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 450.3,
        magneticMomentNu: 4.56
      },
      {
        massNumber: 140,
        atomicMassU: 139.912,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 455.3,
        magneticMomentNu: 4.06
      },
      {
        massNumber: 141,
        atomicMassU: 140.918,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 459.02,
        magneticMomentNu: 3.835
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 625.1,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 470.7,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 742.9,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'LaO2',
        name: 'Lanthanum Dioxide',
        oxidationState: 4,
        molarMassGmol: 170.908,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'LaCl3',
        name: 'Lanthanum Trichloride',
        oxidationState: 3,
        molarMassGmol: 245.26,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'La(NO3)2',
        name: 'Lanthanum Dinitrate',
        oxidationState: 2,
        molarMassGmol: 262.92,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 58,
    symbol: 'Ce',
    name: 'Cerium',
    atomicMass: 140.12,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 4f¹ 5d¹ 6s²',
    electronegativityPauling: 1.12,
    electronegativityAllen: 1.18,
    ionizationEnergiesKjMol: [
      1792,
      3286,
      5290,
      7910
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1068,
    boilingPointK: 3716,
    densityGcm3: 6.77,
    heatOfFusionKjMol: 22.42,
    heatOfVaporizationKjMol: 123.31,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7498-8-1',
    discoveredYear: 1803,
    discoverer: 'Martin Heinrich Klaproth',
    summary: 'Cerium (symbol Ce) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 17.21,
    geochemicalAbundanceOceanMgL: 0.1721,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 140,
        atomicMassU: 140.12,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 458.2,
        magneticMomentNu: 4.64
      },
      {
        massNumber: 141,
        atomicMassU: 141.122,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 463.15,
        magneticMomentNu: 4.13
      },
      {
        massNumber: 142,
        atomicMassU: 142.128,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 466.8,
        magneticMomentNu: 3.9
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 629.4,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 475.8,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 745.6,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'CeO2',
        name: 'Cerium Dioxide',
        oxidationState: 4,
        molarMassGmol: 172.118,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'CeCl3',
        name: 'Cerium Trichloride',
        oxidationState: 3,
        molarMassGmol: 246.47,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ce(NO3)2',
        name: 'Cerium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 264.13,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 59,
    symbol: 'Pr',
    name: 'Praseodymium',
    atomicMass: 140.91,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 4f³ 6s²',
    electronegativityPauling: 1.13,
    electronegativityAllen: 1.19,
    ionizationEnergiesKjMol: [
      1816,
      3328,
      5355,
      7995
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1208,
    boilingPointK: 3793,
    densityGcm3: 6.77,
    heatOfFusionKjMol: 22.55,
    heatOfVaporizationKjMol: 124,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7499-9-1',
    discoveredYear: 1885,
    discoverer: 'Carl Auer von Welsbach',
    summary: 'Praseodymium (symbol Pr) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 16.92,
    geochemicalAbundanceOceanMgL: 0.1692,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 141,
        atomicMassU: 140.91,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 466.1,
        magneticMomentNu: 4.72
      },
      {
        massNumber: 142,
        atomicMassU: 141.912,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 471,
        magneticMomentNu: 4.2
      },
      {
        massNumber: 143,
        atomicMassU: 142.918,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 474.58,
        magneticMomentNu: 3.965
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 633.7,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 480.9,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 748.3,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'PrO2',
        name: 'Praseodymium Dioxide',
        oxidationState: 4,
        molarMassGmol: 172.908,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'PrCl3',
        name: 'Praseodymium Trichloride',
        oxidationState: 3,
        molarMassGmol: 247.26,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Pr(NO3)2',
        name: 'Praseodymium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 264.92,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 60,
    symbol: 'Nd',
    name: 'Neodymium',
    atomicMass: 144.24,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 4f⁴ 6s²',
    electronegativityPauling: 1.14,
    electronegativityAllen: 1.2,
    ionizationEnergiesKjMol: [
      1840,
      3370,
      5420,
      8080
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1297,
    boilingPointK: 3347,
    densityGcm3: 7.01,
    heatOfFusionKjMol: 23.08,
    heatOfVaporizationKjMol: 126.93,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7500-0-1',
    discoveredYear: 1885,
    discoverer: 'Carl Auer von Welsbach',
    summary: 'Neodymium (symbol Nd) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 16.64,
    geochemicalAbundanceOceanMgL: 0.1664,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 144,
        atomicMassU: 144.24,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 474,
        magneticMomentNu: 4.8
      },
      {
        massNumber: 145,
        atomicMassU: 145.242,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 478.85,
        magneticMomentNu: 4.27
      },
      {
        massNumber: 146,
        atomicMassU: 146.248,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 482.36,
        magneticMomentNu: 4.03
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 638,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 486,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 751,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'NdO2',
        name: 'Neodymium Dioxide',
        oxidationState: 4,
        molarMassGmol: 176.238,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'NdCl3',
        name: 'Neodymium Trichloride',
        oxidationState: 3,
        molarMassGmol: 250.59,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Nd(NO3)2',
        name: 'Neodymium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 268.25,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 61,
    symbol: 'Pm',
    name: 'Promethium',
    atomicMass: 145,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 4f⁵ 6s²',
    electronegativityPauling: 1.13,
    electronegativityAllen: 1.19,
    ionizationEnergiesKjMol: [
      1864,
      3412,
      5485,
      8165
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1315,
    boilingPointK: 3273,
    densityGcm3: 7.26,
    heatOfFusionKjMol: 23.2,
    heatOfVaporizationKjMol: 127.6,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7501-1-1',
    discoveredYear: 1945,
    discoverer: 'Chien Shiung Wu et al.',
    summary: 'Promethium (symbol Pm) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 16.37,
    geochemicalAbundanceOceanMgL: 0.1637,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 145,
        atomicMassU: 145,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 481.9,
        magneticMomentNu: 4.88
      },
      {
        massNumber: 146,
        atomicMassU: 146.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 486.7,
        magneticMomentNu: 4.34
      },
      {
        massNumber: 147,
        atomicMassU: 147.008,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 490.14,
        magneticMomentNu: 4.095
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 642.3,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 491.1,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 753.7,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'PmO2',
        name: 'Promethium Dioxide',
        oxidationState: 4,
        molarMassGmol: 176.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'PmCl3',
        name: 'Promethium Trichloride',
        oxidationState: 3,
        molarMassGmol: 251.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Pm(NO3)2',
        name: 'Promethium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 269.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 62,
    symbol: 'Sm',
    name: 'Samarium',
    atomicMass: 150.36,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 4f⁶ 6s²',
    electronegativityPauling: 1.17,
    electronegativityAllen: 1.23,
    ionizationEnergiesKjMol: [
      1888,
      3454,
      5550,
      8250
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1345,
    boilingPointK: 2067,
    densityGcm3: 7.52,
    heatOfFusionKjMol: 24.06,
    heatOfVaporizationKjMol: 132.32,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7502-2-1',
    discoveredYear: 1879,
    discoverer: 'Paul-Émile Lecoq de Boisbaudran',
    summary: 'Samarium (symbol Sm) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 16.1,
    geochemicalAbundanceOceanMgL: 0.161,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 150,
        atomicMassU: 150.36,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 489.8,
        magneticMomentNu: 4.96
      },
      {
        massNumber: 151,
        atomicMassU: 151.362,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 494.55,
        magneticMomentNu: 4.41
      },
      {
        massNumber: 152,
        atomicMassU: 152.368,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 497.92,
        magneticMomentNu: 4.16
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 646.6,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 496.2,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 756.4,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'SmO2',
        name: 'Samarium Dioxide',
        oxidationState: 4,
        molarMassGmol: 182.358,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'SmCl3',
        name: 'Samarium Trichloride',
        oxidationState: 3,
        molarMassGmol: 256.71,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Sm(NO3)2',
        name: 'Samarium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 274.37,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 63,
    symbol: 'Eu',
    name: 'Europium',
    atomicMass: 151.96,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 4f⁷ 6s²',
    electronegativityPauling: 1.2,
    electronegativityAllen: 1.26,
    ionizationEnergiesKjMol: [
      1912,
      3496,
      5615,
      8335
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1099,
    boilingPointK: 1802,
    densityGcm3: 5.244,
    heatOfFusionKjMol: 24.31,
    heatOfVaporizationKjMol: 133.72,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7503-3-1',
    discoveredYear: 1901,
    discoverer: 'Eugène-Anatole Demarçay',
    summary: 'Europium (symbol Eu) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 15.85,
    geochemicalAbundanceOceanMgL: 0.1585,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 152,
        atomicMassU: 151.96,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 497.7,
        magneticMomentNu: 5.04
      },
      {
        massNumber: 153,
        atomicMassU: 152.962,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 502.4,
        magneticMomentNu: 4.48
      },
      {
        massNumber: 154,
        atomicMassU: 153.968,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 505.7,
        magneticMomentNu: 4.225
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 650.9,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 501.3,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 759.1,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'EuO2',
        name: 'Europium Dioxide',
        oxidationState: 4,
        molarMassGmol: 183.958,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'EuCl3',
        name: 'Europium Trichloride',
        oxidationState: 3,
        molarMassGmol: 258.31,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Eu(NO3)2',
        name: 'Europium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 275.97,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 64,
    symbol: 'Gd',
    name: 'Gadolinium',
    atomicMass: 157.25,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 4f⁷ 5d¹ 6s²',
    electronegativityPauling: 1.2,
    electronegativityAllen: 1.26,
    ionizationEnergiesKjMol: [
      1936,
      3538,
      5680,
      8420
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1585,
    boilingPointK: 3546,
    densityGcm3: 7.9,
    heatOfFusionKjMol: 25.16,
    heatOfVaporizationKjMol: 138.38,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7504-4-1',
    discoveredYear: 1880,
    discoverer: 'Jean Charles Galissard de Marignac',
    summary: 'Gadolinium (symbol Gd) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 15.6,
    geochemicalAbundanceOceanMgL: 0.156,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 157,
        atomicMassU: 157.25,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 505.6,
        magneticMomentNu: 5.12
      },
      {
        massNumber: 158,
        atomicMassU: 158.252,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 510.25,
        magneticMomentNu: 4.55
      },
      {
        massNumber: 159,
        atomicMassU: 159.258,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 513.48,
        magneticMomentNu: 4.29
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 655.2,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 506.4,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 761.8,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'GdO2',
        name: 'Gadolinium Dioxide',
        oxidationState: 4,
        molarMassGmol: 189.248,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'GdCl3',
        name: 'Gadolinium Trichloride',
        oxidationState: 3,
        molarMassGmol: 263.6,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Gd(NO3)2',
        name: 'Gadolinium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 281.26,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 65,
    symbol: 'Tb',
    name: 'Terbium',
    atomicMass: 158.93,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 4f⁹ 6s²',
    electronegativityPauling: 1.2,
    electronegativityAllen: 1.26,
    ionizationEnergiesKjMol: [
      1960,
      3580,
      5745,
      8505
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1629,
    boilingPointK: 3503,
    densityGcm3: 8.23,
    heatOfFusionKjMol: 25.43,
    heatOfVaporizationKjMol: 139.86,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7505-5-1',
    discoveredYear: 1843,
    discoverer: 'Carl Gustaf Mosander',
    summary: 'Terbium (symbol Tb) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 15.36,
    geochemicalAbundanceOceanMgL: 0.1536,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 159,
        atomicMassU: 158.93,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 513.5,
        magneticMomentNu: 5.2
      },
      {
        massNumber: 160,
        atomicMassU: 159.932,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 518.1,
        magneticMomentNu: 4.62
      },
      {
        massNumber: 161,
        atomicMassU: 160.938,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 521.26,
        magneticMomentNu: 4.355
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 659.5,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 511.5,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 764.5,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'TbO2',
        name: 'Terbium Dioxide',
        oxidationState: 4,
        molarMassGmol: 190.928,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'TbCl3',
        name: 'Terbium Trichloride',
        oxidationState: 3,
        molarMassGmol: 265.28,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Tb(NO3)2',
        name: 'Terbium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 282.94,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 66,
    symbol: 'Dy',
    name: 'Dysprosium',
    atomicMass: 162.5,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 4f¹⁰ 6s²',
    electronegativityPauling: 1.22,
    electronegativityAllen: 1.28,
    ionizationEnergiesKjMol: [
      1984,
      3622,
      5810,
      8590
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1680,
    boilingPointK: 2840,
    densityGcm3: 8.54,
    heatOfFusionKjMol: 26,
    heatOfVaporizationKjMol: 143,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7506-6-1',
    discoveredYear: 1886,
    discoverer: 'Paul-Émile Lecoq de Boisbaudran',
    summary: 'Dysprosium (symbol Dy) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 15.13,
    geochemicalAbundanceOceanMgL: 0.1513,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 163,
        atomicMassU: 162.5,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 521.4,
        magneticMomentNu: 5.28
      },
      {
        massNumber: 164,
        atomicMassU: 163.502,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 525.95,
        magneticMomentNu: 4.69
      },
      {
        massNumber: 165,
        atomicMassU: 164.508,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 529.04,
        magneticMomentNu: 4.42
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 663.8,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 516.6,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 767.2,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'DyO2',
        name: 'Dysprosium Dioxide',
        oxidationState: 4,
        molarMassGmol: 194.498,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'DyCl3',
        name: 'Dysprosium Trichloride',
        oxidationState: 3,
        molarMassGmol: 268.85,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Dy(NO3)2',
        name: 'Dysprosium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 286.51,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 67,
    symbol: 'Ho',
    name: 'Holmium',
    atomicMass: 164.93,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 4f¹¹ 6s²',
    electronegativityPauling: 1.23,
    electronegativityAllen: 1.29,
    ionizationEnergiesKjMol: [
      2008,
      3664,
      5875,
      8675
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1734,
    boilingPointK: 2993,
    densityGcm3: 8.79,
    heatOfFusionKjMol: 26.39,
    heatOfVaporizationKjMol: 145.14,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7507-7-1',
    discoveredYear: 1878,
    discoverer: 'Jacques-Louis Soret',
    summary: 'Holmium (symbol Ho) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 14.9,
    geochemicalAbundanceOceanMgL: 0.149,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 165,
        atomicMassU: 164.93,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 529.3,
        magneticMomentNu: 5.36
      },
      {
        massNumber: 166,
        atomicMassU: 165.932,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 533.8,
        magneticMomentNu: 4.76
      },
      {
        massNumber: 167,
        atomicMassU: 166.938,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 536.82,
        magneticMomentNu: 4.485
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 668.1,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 521.7,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 769.9,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'HoO2',
        name: 'Holmium Dioxide',
        oxidationState: 4,
        molarMassGmol: 196.928,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'HoCl3',
        name: 'Holmium Trichloride',
        oxidationState: 3,
        molarMassGmol: 271.28,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ho(NO3)2',
        name: 'Holmium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 288.94,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 68,
    symbol: 'Er',
    name: 'Erbium',
    atomicMass: 167.26,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 4f¹² 6s²',
    electronegativityPauling: 1.24,
    electronegativityAllen: 1.3,
    ionizationEnergiesKjMol: [
      2032,
      3706,
      5940,
      8760
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1802,
    boilingPointK: 3141,
    densityGcm3: 9.066,
    heatOfFusionKjMol: 26.76,
    heatOfVaporizationKjMol: 147.19,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7508-8-1',
    discoveredYear: 1843,
    discoverer: 'Carl Gustaf Mosander',
    summary: 'Erbium (symbol Er) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 14.68,
    geochemicalAbundanceOceanMgL: 0.1468,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 167,
        atomicMassU: 167.26,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 537.2,
        magneticMomentNu: 5.44
      },
      {
        massNumber: 168,
        atomicMassU: 168.262,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 541.65,
        magneticMomentNu: 4.83
      },
      {
        massNumber: 169,
        atomicMassU: 169.268,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 544.6,
        magneticMomentNu: 4.55
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 672.4,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 526.8,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 772.6,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'ErO2',
        name: 'Erbium Dioxide',
        oxidationState: 4,
        molarMassGmol: 199.258,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'ErCl3',
        name: 'Erbium Trichloride',
        oxidationState: 3,
        molarMassGmol: 273.61,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Er(NO3)2',
        name: 'Erbium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 291.27,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 69,
    symbol: 'Tm',
    name: 'Thulium',
    atomicMass: 168.93,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 4f¹³ 6s²',
    electronegativityPauling: 1.25,
    electronegativityAllen: 1.31,
    ionizationEnergiesKjMol: [
      2056,
      3748,
      6005,
      8845
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1818,
    boilingPointK: 2223,
    densityGcm3: 9.32,
    heatOfFusionKjMol: 27.03,
    heatOfVaporizationKjMol: 148.66,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7509-9-1',
    discoveredYear: 1879,
    discoverer: 'Per Teodor Cleve',
    summary: 'Thulium (symbol Tm) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 14.47,
    geochemicalAbundanceOceanMgL: 0.1447,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 169,
        atomicMassU: 168.93,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 545.1,
        magneticMomentNu: 5.52
      },
      {
        massNumber: 170,
        atomicMassU: 169.932,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 549.5,
        magneticMomentNu: 4.9
      },
      {
        massNumber: 171,
        atomicMassU: 170.938,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 552.38,
        magneticMomentNu: 4.615
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 676.7,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 531.9,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 775.3,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'TmO2',
        name: 'Thulium Dioxide',
        oxidationState: 4,
        molarMassGmol: 200.928,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'TmCl3',
        name: 'Thulium Trichloride',
        oxidationState: 3,
        molarMassGmol: 275.28,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Tm(NO3)2',
        name: 'Thulium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 292.94,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 70,
    symbol: 'Yb',
    name: 'Ytterbium',
    atomicMass: 173.05,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f',
    electronConfiguration: '[Xe] 4f¹⁴ 6s²',
    electronegativityPauling: 1.1,
    electronegativityAllen: 1.16,
    ionizationEnergiesKjMol: [
      2080,
      3790,
      6070,
      8930
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1097,
    boilingPointK: 1469,
    densityGcm3: 6.9,
    heatOfFusionKjMol: 27.69,
    heatOfVaporizationKjMol: 152.28,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7510-0-1',
    discoveredYear: 1878,
    discoverer: 'Jean Charles Galissard de Marignac',
    summary: 'Ytterbium (symbol Yb) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 14.27,
    geochemicalAbundanceOceanMgL: 0.1427,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 173,
        atomicMassU: 173.05,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 553,
        magneticMomentNu: 5.6
      },
      {
        massNumber: 174,
        atomicMassU: 174.052,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 557.35,
        magneticMomentNu: 4.97
      },
      {
        massNumber: 175,
        atomicMassU: 175.058,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 560.16,
        magneticMomentNu: 4.68
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 681,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 537,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 778,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'YbO2',
        name: 'Ytterbium Dioxide',
        oxidationState: 4,
        molarMassGmol: 205.048,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'YbCl3',
        name: 'Ytterbium Trichloride',
        oxidationState: 3,
        molarMassGmol: 279.4,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Yb(NO3)2',
        name: 'Ytterbium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 297.06,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 71,
    symbol: 'Lu',
    name: 'Lutetium',
    atomicMass: 174.97,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'd',
    electronConfiguration: '[Xe] 4f¹⁴ 5d¹ 6s²',
    electronegativityPauling: 1.27,
    electronegativityAllen: 1.33,
    ionizationEnergiesKjMol: [
      2104,
      3832,
      6135,
      9015
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 161,
    meltingPointK: 1925,
    boilingPointK: 3675,
    densityGcm3: 9.841,
    heatOfFusionKjMol: 28,
    heatOfVaporizationKjMol: 153.97,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7511-1-1',
    discoveredYear: 1907,
    discoverer: 'Georges Urbain',
    summary: 'Lutetium (symbol Lu) is an element in Group 3, Period 6. Classified under lanthanide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 14.06,
    geochemicalAbundanceOceanMgL: 0.1406,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 175,
        atomicMassU: 174.97,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 560.9,
        magneticMomentNu: 5.68
      },
      {
        massNumber: 176,
        atomicMassU: 175.972,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 565.2,
        magneticMomentNu: 5.04
      },
      {
        massNumber: 177,
        atomicMassU: 176.978,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 567.94,
        magneticMomentNu: 4.745
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 685.3,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 542.1,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 780.7,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'LuO2',
        name: 'Lutetium Dioxide',
        oxidationState: 4,
        molarMassGmol: 206.968,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'LuCl3',
        name: 'Lutetium Trichloride',
        oxidationState: 3,
        molarMassGmol: 281.32,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Lu(NO3)2',
        name: 'Lutetium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 298.98,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 72,
    symbol: 'Hf',
    name: 'Hafnium',
    atomicMass: 178.49,
    category: 'transition-metal',
    period: 6,
    group: 4,
    block: 'd',
    electronConfiguration: '[Xe] 4f¹⁴ 5d² 6s²',
    electronegativityPauling: 1.3,
    electronegativityAllen: 1.37,
    ionizationEnergiesKjMol: [
      2128,
      3874,
      6200,
      9100
    ],
    oxidationStates: [-6, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 160,
    meltingPointK: 2506,
    boilingPointK: 4876,
    densityGcm3: 13.31,
    heatOfFusionKjMol: 28.56,
    heatOfVaporizationKjMol: 157.07,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7512-2-1',
    discoveredYear: 1923,
    discoverer: 'Dirk Coster, George de Hevesy',
    summary: 'Hafnium (symbol Hf) is an element in Group 4, Period 6. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 13.87,
    geochemicalAbundanceOceanMgL: 0.1387,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 178,
        atomicMassU: 178.49,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 568.8,
        magneticMomentNu: 5.76
      },
      {
        massNumber: 179,
        atomicMassU: 179.492,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 573.05,
        magneticMomentNu: 5.11
      },
      {
        massNumber: 180,
        atomicMassU: 180.498,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 575.72,
        magneticMomentNu: 4.81
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 689.6,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 547.2,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 783.4,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'HfO2',
        name: 'Hafnium Dioxide',
        oxidationState: 4,
        molarMassGmol: 210.488,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'HfCl3',
        name: 'Hafnium Trichloride',
        oxidationState: 3,
        molarMassGmol: 284.84,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Hf(NO3)2',
        name: 'Hafnium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 302.5,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 73,
    symbol: 'Ta',
    name: 'Tantalum',
    atomicMass: 180.95,
    category: 'transition-metal',
    period: 6,
    group: 5,
    block: 'd',
    electronConfiguration: '[Xe] 4f¹⁴ 5d³ 6s²',
    electronegativityPauling: 1.5,
    electronegativityAllen: 1.58,
    ionizationEnergiesKjMol: [
      2152,
      3916,
      6265,
      9185
    ],
    oxidationStates: [-5, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 159,
    meltingPointK: 3290,
    boilingPointK: 5731,
    densityGcm3: 16.69,
    heatOfFusionKjMol: 28.95,
    heatOfVaporizationKjMol: 159.24,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7513-3-1',
    discoveredYear: 1802,
    discoverer: 'Anders Gustaf Ekeberg',
    summary: 'Tantalum (symbol Ta) is an element in Group 5, Period 6. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 13.68,
    geochemicalAbundanceOceanMgL: 0.1368,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 181,
        atomicMassU: 180.95,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 576.7,
        magneticMomentNu: 5.84
      },
      {
        massNumber: 182,
        atomicMassU: 181.952,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 580.9,
        magneticMomentNu: 5.18
      },
      {
        massNumber: 183,
        atomicMassU: 182.958,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 583.5,
        magneticMomentNu: 4.875
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 693.9,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 552.3,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 786.1,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'TaO2',
        name: 'Tantalum Dioxide',
        oxidationState: 4,
        molarMassGmol: 212.948,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'TaCl3',
        name: 'Tantalum Trichloride',
        oxidationState: 3,
        molarMassGmol: 287.3,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ta(NO3)2',
        name: 'Tantalum Dinitrate',
        oxidationState: 2,
        molarMassGmol: 304.96,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 74,
    symbol: 'W',
    name: 'Tungsten',
    atomicMass: 183.84,
    category: 'transition-metal',
    period: 6,
    group: 6,
    block: 'd',
    electronConfiguration: '[Xe] 4f¹⁴ 5d⁴ 6s²',
    electronegativityPauling: 2.36,
    electronegativityAllen: 2.48,
    ionizationEnergiesKjMol: [
      2176,
      3958,
      6330,
      9270
    ],
    oxidationStates: [-4, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 158,
    meltingPointK: 3695,
    boilingPointK: 5828,
    densityGcm3: 19.25,
    heatOfFusionKjMol: 29.41,
    heatOfVaporizationKjMol: 161.78,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7514-4-1',
    discoveredYear: 1781,
    discoverer: 'Carl Wilhelm Scheele',
    summary: 'Tungsten (symbol W) is an element in Group 6, Period 6. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 13.5,
    geochemicalAbundanceOceanMgL: 0.135,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 184,
        atomicMassU: 183.84,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 584.6,
        magneticMomentNu: 5.92
      },
      {
        massNumber: 185,
        atomicMassU: 184.842,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 588.75,
        magneticMomentNu: 5.25
      },
      {
        massNumber: 186,
        atomicMassU: 185.848,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 591.28,
        magneticMomentNu: 4.94
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 698.2,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 557.4,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 788.8,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'WO2',
        name: 'Tungsten Dioxide',
        oxidationState: 4,
        molarMassGmol: 215.838,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'WCl3',
        name: 'Tungsten Trichloride',
        oxidationState: 3,
        molarMassGmol: 290.19,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'W(NO3)2',
        name: 'Tungsten Dinitrate',
        oxidationState: 2,
        molarMassGmol: 307.85,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 75,
    symbol: 'Re',
    name: 'Rhenium',
    atomicMass: 186.21,
    category: 'transition-metal',
    period: 6,
    group: 7,
    block: 'd',
    electronConfiguration: '[Xe] 4f¹⁴ 5d⁵ 6s²',
    electronegativityPauling: 1.9,
    electronegativityAllen: 1.99,
    ionizationEnergiesKjMol: [
      2200,
      4000,
      6395,
      9355
    ],
    oxidationStates: [-3, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 157,
    meltingPointK: 3459,
    boilingPointK: 5869,
    densityGcm3: 21.02,
    heatOfFusionKjMol: 29.79,
    heatOfVaporizationKjMol: 163.86,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7515-5-1',
    discoveredYear: 1925,
    discoverer: 'Walter Noddack et al.',
    summary: 'Rhenium (symbol Re) is an element in Group 7, Period 6. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 13.32,
    geochemicalAbundanceOceanMgL: 0.1332,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 186,
        atomicMassU: 186.21,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 592.5,
        magneticMomentNu: 6
      },
      {
        massNumber: 187,
        atomicMassU: 187.212,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 596.6,
        magneticMomentNu: 5.32
      },
      {
        massNumber: 188,
        atomicMassU: 188.218,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 599.06,
        magneticMomentNu: 5.005
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 702.5,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 562.5,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 791.5,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'ReO2',
        name: 'Rhenium Dioxide',
        oxidationState: 4,
        molarMassGmol: 218.208,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'ReCl3',
        name: 'Rhenium Trichloride',
        oxidationState: 3,
        molarMassGmol: 292.56,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Re(NO3)2',
        name: 'Rhenium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 310.22,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 76,
    symbol: 'Os',
    name: 'Osmium',
    atomicMass: 190.23,
    category: 'transition-metal',
    period: 6,
    group: 8,
    block: 'd',
    electronConfiguration: '[Xe] 4f¹⁴ 5d⁶ 6s²',
    electronegativityPauling: 2.2,
    electronegativityAllen: 2.31,
    ionizationEnergiesKjMol: [
      2224,
      4042,
      6460,
      9440
    ],
    oxidationStates: [-2, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 155,
    meltingPointK: 3306,
    boilingPointK: 5285,
    densityGcm3: 22.59,
    heatOfFusionKjMol: 30.44,
    heatOfVaporizationKjMol: 167.4,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7516-6-1',
    discoveredYear: 1803,
    discoverer: 'Smithson Tennant',
    summary: 'Osmium (symbol Os) is an element in Group 8, Period 6. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 13.14,
    geochemicalAbundanceOceanMgL: 0.1314,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 190,
        atomicMassU: 190.23,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 600.4,
        magneticMomentNu: 6.08
      },
      {
        massNumber: 191,
        atomicMassU: 191.232,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 604.45,
        magneticMomentNu: 5.39
      },
      {
        massNumber: 192,
        atomicMassU: 192.238,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 606.84,
        magneticMomentNu: 5.07
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 706.8,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 567.6,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 794.2,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'OsO2',
        name: 'Osmium Dioxide',
        oxidationState: 4,
        molarMassGmol: 222.228,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'OsCl3',
        name: 'Osmium Trichloride',
        oxidationState: 3,
        molarMassGmol: 296.58,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Os(NO3)2',
        name: 'Osmium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 314.24,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 77,
    symbol: 'Ir',
    name: 'Iridium',
    atomicMass: 192.22,
    category: 'transition-metal',
    period: 6,
    group: 9,
    block: 'd',
    electronConfiguration: '[Xe] 4f¹⁴ 5d⁷ 6s²',
    electronegativityPauling: 2.2,
    electronegativityAllen: 2.31,
    ionizationEnergiesKjMol: [
      2248,
      4084,
      6525,
      9525
    ],
    oxidationStates: [-1, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 154,
    meltingPointK: 2719,
    boilingPointK: 4701,
    densityGcm3: 22.56,
    heatOfFusionKjMol: 30.76,
    heatOfVaporizationKjMol: 169.15,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7517-7-1',
    discoveredYear: 1803,
    discoverer: 'Smithson Tennant',
    summary: 'Iridium (symbol Ir) is an element in Group 9, Period 6. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 12.97,
    geochemicalAbundanceOceanMgL: 0.1297,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 192,
        atomicMassU: 192.22,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 608.3,
        magneticMomentNu: 6.16
      },
      {
        massNumber: 193,
        atomicMassU: 193.222,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 612.3,
        magneticMomentNu: 5.46
      },
      {
        massNumber: 194,
        atomicMassU: 194.228,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 614.62,
        magneticMomentNu: 5.135
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 711.1,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 572.7,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 796.9,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'IrO2',
        name: 'Iridium Dioxide',
        oxidationState: 4,
        molarMassGmol: 224.218,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'IrCl3',
        name: 'Iridium Trichloride',
        oxidationState: 3,
        molarMassGmol: 298.57,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ir(NO3)2',
        name: 'Iridium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 316.23,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 78,
    symbol: 'Pt',
    name: 'Platinum',
    atomicMass: 195.08,
    category: 'transition-metal',
    period: 6,
    group: 10,
    block: 'd',
    electronConfiguration: '[Xe] 4f¹⁴ 5d⁹ 6s¹',
    electronegativityPauling: 2.28,
    electronegativityAllen: 2.39,
    ionizationEnergiesKjMol: [
      2272,
      4126,
      6590,
      9610
    ],
    oxidationStates: [0, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 153,
    meltingPointK: 2041.4,
    boilingPointK: 4098,
    densityGcm3: 21.45,
    heatOfFusionKjMol: 31.21,
    heatOfVaporizationKjMol: 171.67,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7518-8-1',
    discoveredYear: 1735,
    discoverer: 'Antonio de Ulloa',
    summary: 'Platinum (symbol Pt) is an element in Group 10, Period 6. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 12.8,
    geochemicalAbundanceOceanMgL: 0.128,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 195,
        atomicMassU: 195.08,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 616.2,
        magneticMomentNu: 6.24
      },
      {
        massNumber: 196,
        atomicMassU: 196.082,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 620.15,
        magneticMomentNu: 5.53
      },
      {
        massNumber: 197,
        atomicMassU: 197.088,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 622.4,
        magneticMomentNu: 5.2
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 715.4,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 577.8,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 589.6,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'PtO2',
        name: 'Platinum Dioxide',
        oxidationState: 4,
        molarMassGmol: 227.078,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'PtCl3',
        name: 'Platinum Trichloride',
        oxidationState: 3,
        molarMassGmol: 301.43,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Pt(NO3)2',
        name: 'Platinum Dinitrate',
        oxidationState: 2,
        molarMassGmol: 319.09,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 79,
    symbol: 'Au',
    name: 'Gold',
    atomicMass: 196.97,
    category: 'transition-metal',
    period: 6,
    group: 11,
    block: 'd',
    electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹',
    electronegativityPauling: 2.54,
    electronegativityAllen: 2.67,
    ionizationEnergiesKjMol: [
      2296,
      4168,
      6655,
      9695
    ],
    oxidationStates: [1, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 152,
    meltingPointK: 1337.33,
    boilingPointK: 3129,
    densityGcm3: 19.3,
    heatOfFusionKjMol: 31.52,
    heatOfVaporizationKjMol: 173.33,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7519-9-1',
    discoveredYear: -3000,
    discoverer: 'Ancient civilizations',
    summary: 'Gold (symbol Au) is an element in Group 11, Period 6. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 12.64,
    geochemicalAbundanceOceanMgL: 0.1264,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 197,
        atomicMassU: 196.97,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 624.1,
        magneticMomentNu: 6.32
      },
      {
        massNumber: 198,
        atomicMassU: 197.972,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 628,
        magneticMomentNu: 5.6
      },
      {
        massNumber: 199,
        atomicMassU: 198.978,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 630.18,
        magneticMomentNu: 5.265
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 719.7,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 582.9,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 592.3,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'AuO2',
        name: 'Gold Dioxide',
        oxidationState: 4,
        molarMassGmol: 228.968,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'AuCl3',
        name: 'Gold Trichloride',
        oxidationState: 3,
        molarMassGmol: 303.32,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Au(NO3)2',
        name: 'Gold Dinitrate',
        oxidationState: 2,
        molarMassGmol: 320.98,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 80,
    symbol: 'Hg',
    name: 'Mercury',
    atomicMass: 200.59,
    category: 'transition-metal',
    period: 6,
    group: 12,
    block: 'd',
    electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s²',
    electronegativityPauling: 2,
    electronegativityAllen: 2.1,
    ionizationEnergiesKjMol: [
      2320,
      4210,
      6720,
      9780
    ],
    oxidationStates: [2, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 151,
    meltingPointK: 234.32,
    boilingPointK: 629.88,
    densityGcm3: 13.534,
    heatOfFusionKjMol: 32.09,
    heatOfVaporizationKjMol: 176.52,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7520-0-1',
    discoveredYear: -1500,
    discoverer: 'Ancient civilizations',
    summary: 'Mercury (symbol Hg) is an element in Group 12, Period 6. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 12.48,
    geochemicalAbundanceOceanMgL: 0.1248,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'None',
    isotopes: [
      {
        massNumber: 201,
        atomicMassU: 200.59,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 632,
        magneticMomentNu: 6.4
      },
      {
        massNumber: 202,
        atomicMassU: 201.592,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 635.85,
        magneticMomentNu: 5.67
      },
      {
        massNumber: 203,
        atomicMassU: 202.598,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 637.96,
        magneticMomentNu: 5.33
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 724,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 588,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 595,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'HgO2',
        name: 'Mercury Dioxide',
        oxidationState: 4,
        molarMassGmol: 232.588,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'HgCl3',
        name: 'Mercury Trichloride',
        oxidationState: 3,
        molarMassGmol: 306.94,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Hg(NO3)2',
        name: 'Mercury Dinitrate',
        oxidationState: 2,
        molarMassGmol: 324.6,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 81,
    symbol: 'Tl',
    name: 'Thallium',
    atomicMass: 204.38,
    category: 'post-transition-metal',
    period: 6,
    group: 13,
    block: 'p',
    electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹',
    electronegativityPauling: 1.62,
    electronegativityAllen: 1.7,
    ionizationEnergiesKjMol: [
      2344,
      4252,
      6785,
      9865
    ],
    oxidationStates: [3, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 149,
    meltingPointK: 577,
    boilingPointK: 1746,
    densityGcm3: 11.85,
    heatOfFusionKjMol: 32.7,
    heatOfVaporizationKjMol: 179.85,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7521-1-1',
    discoveredYear: 1861,
    discoverer: 'William Crookes',
    summary: 'Thallium (symbol Tl) is an element in Group 13, Period 6. Classified under post-transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 12.33,
    geochemicalAbundanceOceanMgL: 0.1233,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 204,
        atomicMassU: 204.38,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 639.9,
        magneticMomentNu: 6.48
      },
      {
        massNumber: 205,
        atomicMassU: 205.382,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 643.7,
        magneticMomentNu: 5.74
      },
      {
        massNumber: 206,
        atomicMassU: 206.388,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 645.74,
        magneticMomentNu: 5.395
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 728.3,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 593.1,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 597.7,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'TlO2',
        name: 'Thallium Dioxide',
        oxidationState: 4,
        molarMassGmol: 236.378,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'TlCl3',
        name: 'Thallium Trichloride',
        oxidationState: 3,
        molarMassGmol: 310.73,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Tl(NO3)2',
        name: 'Thallium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 328.39,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 82,
    symbol: 'Pb',
    name: 'Lead',
    atomicMass: 207.2,
    category: 'post-transition-metal',
    period: 6,
    group: 14,
    block: 'p',
    electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²',
    electronegativityPauling: 2.33,
    electronegativityAllen: 2.45,
    ionizationEnergiesKjMol: [
      2368,
      4294,
      6850,
      9950
    ],
    oxidationStates: [4, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 148,
    meltingPointK: 600.61,
    boilingPointK: 2022,
    densityGcm3: 11.34,
    heatOfFusionKjMol: 33.15,
    heatOfVaporizationKjMol: 182.34,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7522-2-1',
    discoveredYear: -3000,
    discoverer: 'Ancient civilizations',
    summary: 'Lead (symbol Pb) is an element in Group 14, Period 6. Classified under post-transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 12.18,
    geochemicalAbundanceOceanMgL: 0.1218,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 207,
        atomicMassU: 207.2,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 647.8,
        magneticMomentNu: 6.56
      },
      {
        massNumber: 208,
        atomicMassU: 208.202,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 651.55,
        magneticMomentNu: 5.81
      },
      {
        massNumber: 209,
        atomicMassU: 209.208,
        relativeAbundance: 0.1,
        halfLife: '1.4 x 10^9 yr',
        spinParity: '0+',
        decayMode: 'Beta decay',
        bindingEnergyMev: 653.52,
        magneticMomentNu: 5.46
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 732.6,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 598.2,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 600.4,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'PbO2',
        name: 'Lead Dioxide',
        oxidationState: 4,
        molarMassGmol: 239.198,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'PbCl3',
        name: 'Lead Trichloride',
        oxidationState: 3,
        molarMassGmol: 313.55,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Pb(NO3)2',
        name: 'Lead Dinitrate',
        oxidationState: 2,
        molarMassGmol: 331.21,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 83,
    symbol: 'Bi',
    name: 'Bismuth',
    atomicMass: 208.98,
    category: 'post-transition-metal',
    period: 6,
    group: 15,
    block: 'p',
    electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³',
    electronegativityPauling: 2.02,
    electronegativityAllen: 2.12,
    ionizationEnergiesKjMol: [
      2392,
      4336,
      6915,
      10035
    ],
    oxidationStates: [5, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 147,
    meltingPointK: 544.7,
    boilingPointK: 1837,
    densityGcm3: 9.78,
    heatOfFusionKjMol: 33.44,
    heatOfVaporizationKjMol: 183.9,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7523-3-1',
    discoveredYear: 1753,
    discoverer: 'Claude Geoffroy',
    summary: 'Bismuth (symbol Bi) is an element in Group 15, Period 6. Classified under post-transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 12.03,
    geochemicalAbundanceOceanMgL: 0.1203,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 209,
        atomicMassU: 208.98,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 655.7,
        magneticMomentNu: 6.64
      },
      {
        massNumber: 210,
        atomicMassU: 209.982,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 659.4,
        magneticMomentNu: 5.88
      },
      {
        massNumber: 211,
        atomicMassU: 210.988,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 661.3,
        magneticMomentNu: 5.525
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 736.9,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 603.3,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 603.1,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'BiO2',
        name: 'Bismuth Dioxide',
        oxidationState: 4,
        molarMassGmol: 240.978,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'BiCl3',
        name: 'Bismuth Trichloride',
        oxidationState: 3,
        molarMassGmol: 315.33,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Bi(NO3)2',
        name: 'Bismuth Dinitrate',
        oxidationState: 2,
        molarMassGmol: 332.99,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 84,
    symbol: 'Po',
    name: 'Polonium',
    atomicMass: 209,
    category: 'post-transition-metal',
    period: 6,
    group: 16,
    block: 'p',
    electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴',
    electronegativityPauling: 2,
    electronegativityAllen: 2.1,
    ionizationEnergiesKjMol: [
      2416,
      4378,
      6980,
      10120
    ],
    oxidationStates: [6, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 146,
    meltingPointK: 527,
    boilingPointK: 1235,
    densityGcm3: 9.196,
    heatOfFusionKjMol: 33.44,
    heatOfVaporizationKjMol: 183.92,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7524-4-1',
    discoveredYear: 1898,
    discoverer: 'Marie & Pierre Curie',
    summary: 'Polonium (symbol Po) is an element in Group 16, Period 6. Classified under post-transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 11.89,
    geochemicalAbundanceOceanMgL: 0.1189,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 209,
        atomicMassU: 209,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 663.6,
        magneticMomentNu: 6.72
      },
      {
        massNumber: 210,
        atomicMassU: 210.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 667.25,
        magneticMomentNu: 5.95
      },
      {
        massNumber: 211,
        atomicMassU: 211.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 669.08,
        magneticMomentNu: 5.59
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 381.2,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 608.4,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 605.8,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'PoO2',
        name: 'Polonium Dioxide',
        oxidationState: 4,
        molarMassGmol: 240.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'PoCl3',
        name: 'Polonium Trichloride',
        oxidationState: 3,
        molarMassGmol: 315.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Po(NO3)2',
        name: 'Polonium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 333.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 85,
    symbol: 'At',
    name: 'Astatine',
    atomicMass: 210,
    category: 'metalloid',
    period: 6,
    group: 17,
    block: 'p',
    electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵',
    electronegativityPauling: 2.2,
    electronegativityAllen: 2.31,
    ionizationEnergiesKjMol: [
      2440,
      4420,
      7045,
      10205
    ],
    oxidationStates: [7, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 145,
    meltingPointK: 575,
    boilingPointK: 610,
    densityGcm3: 7,
    heatOfFusionKjMol: 33.6,
    heatOfVaporizationKjMol: 184.8,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7525-5-1',
    discoveredYear: 1940,
    discoverer: 'Dale Corson et al.',
    summary: 'Astatine (symbol At) is an element in Group 17, Period 6. Classified under metalloid, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 11.75,
    geochemicalAbundanceOceanMgL: 0.1175,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 210,
        atomicMassU: 210,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 671.5,
        magneticMomentNu: 6.8
      },
      {
        massNumber: 211,
        atomicMassU: 211.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 675.1,
        magneticMomentNu: 6.02
      },
      {
        massNumber: 212,
        atomicMassU: 212.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 676.86,
        magneticMomentNu: 5.655
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 385.5,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 613.5,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 608.5,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'AtO2',
        name: 'Astatine Dioxide',
        oxidationState: 4,
        molarMassGmol: 241.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'AtCl3',
        name: 'Astatine Trichloride',
        oxidationState: 3,
        molarMassGmol: 316.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'At(NO3)2',
        name: 'Astatine Dinitrate',
        oxidationState: 2,
        molarMassGmol: 334.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 86,
    symbol: 'Rn',
    name: 'Radon',
    atomicMass: 222,
    category: 'noble-gas',
    period: 6,
    group: 18,
    block: 'p',
    electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶',
    electronegativityPauling: 2.2,
    electronegativityAllen: 2.31,
    ionizationEnergiesKjMol: [
      2464,
      4462,
      7110,
      10290
    ],
    oxidationStates: [8, 2, 3],
    covalentRadiusPm: 172,
    vanDerWaalsRadiusPm: 228,
    atomicRadiusEmpiricalPm: 143,
    meltingPointK: 202,
    boilingPointK: 211.3,
    densityGcm3: 0.00973,
    heatOfFusionKjMol: 35.52,
    heatOfVaporizationKjMol: 195.36,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7526-6-1',
    discoveredYear: 1900,
    discoverer: 'Friedrich Dorn',
    summary: 'Radon (symbol Rn) is an element in Group 18, Period 6. Classified under noble-gas, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 11.61,
    geochemicalAbundanceOceanMgL: 0.1161,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 222,
        atomicMassU: 222,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 679.4,
        magneticMomentNu: 6.88
      },
      {
        massNumber: 223,
        atomicMassU: 223.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 682.95,
        magneticMomentNu: 6.09
      },
      {
        massNumber: 224,
        atomicMassU: 224.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 684.64,
        magneticMomentNu: 5.72
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 389.8,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 618.6,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 611.2,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'RnO2',
        name: 'Radon Dioxide',
        oxidationState: 4,
        molarMassGmol: 253.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'RnCl3',
        name: 'Radon Trichloride',
        oxidationState: 3,
        molarMassGmol: 328.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Rn(NO3)2',
        name: 'Radon Dinitrate',
        oxidationState: 2,
        molarMassGmol: 346.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 87,
    symbol: 'Fr',
    name: 'Francium',
    atomicMass: 223,
    category: 'alkali-metal',
    period: 7,
    group: 1,
    block: 's',
    electronConfiguration: '[Rn] 7s¹',
    electronegativityPauling: 0.7,
    electronegativityAllen: 0.73,
    ionizationEnergiesKjMol: [
      2488,
      4504,
      7175,
      10375
    ],
    oxidationStates: [1, 0, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 184,
    meltingPointK: 300,
    boilingPointK: 950,
    densityGcm3: 1.87,
    heatOfFusionKjMol: 35.68,
    heatOfVaporizationKjMol: 196.24,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7527-7-1',
    discoveredYear: 1939,
    discoverer: 'Marguerite Perey',
    summary: 'Francium (symbol Fr) is an element in Group 1, Period 7. Classified under alkali-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 11.48,
    geochemicalAbundanceOceanMgL: 0.1148,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 223,
        atomicMassU: 223,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 687.3,
        magneticMomentNu: 6.96
      },
      {
        massNumber: 224,
        atomicMassU: 224.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 690.8,
        magneticMomentNu: 6.16
      },
      {
        massNumber: 225,
        atomicMassU: 225.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 692.42,
        magneticMomentNu: 5.785
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 394.1,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 623.7,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 613.9,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'FrO2',
        name: 'Francium Dioxide',
        oxidationState: 4,
        molarMassGmol: 254.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'FrCl3',
        name: 'Francium Trichloride',
        oxidationState: 3,
        molarMassGmol: 329.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Fr(NO3)2',
        name: 'Francium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 347.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 88,
    symbol: 'Ra',
    name: 'Radium',
    atomicMass: 226,
    category: 'alkaline-earth',
    period: 7,
    group: 2,
    block: 's',
    electronConfiguration: '[Rn] 7s²',
    electronegativityPauling: 0.9,
    electronegativityAllen: 0.95,
    ionizationEnergiesKjMol: [
      2512,
      4546,
      7240,
      10460
    ],
    oxidationStates: [2, 0, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 183,
    meltingPointK: 1233,
    boilingPointK: 2010,
    densityGcm3: 5.5,
    heatOfFusionKjMol: 36.16,
    heatOfVaporizationKjMol: 198.88,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7528-8-1',
    discoveredYear: 1898,
    discoverer: 'Marie & Pierre Curie',
    summary: 'Radium (symbol Ra) is an element in Group 2, Period 7. Classified under alkaline-earth, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 11.35,
    geochemicalAbundanceOceanMgL: 0.1135,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 226,
        atomicMassU: 226,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 695.2,
        magneticMomentNu: 7.04
      },
      {
        massNumber: 227,
        atomicMassU: 227.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 698.65,
        magneticMomentNu: 6.23
      },
      {
        massNumber: 228,
        atomicMassU: 228.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 700.2,
        magneticMomentNu: 5.85
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 398.4,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 628.8,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 616.6,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'RaO2',
        name: 'Radium Dioxide',
        oxidationState: 4,
        molarMassGmol: 257.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'RaCl3',
        name: 'Radium Trichloride',
        oxidationState: 3,
        molarMassGmol: 332.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ra(NO3)2',
        name: 'Radium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 350.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 89,
    symbol: 'Ac',
    name: 'Actinium',
    atomicMass: 227,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 6d¹ 7s²',
    electronegativityPauling: 1.1,
    electronegativityAllen: 1.16,
    ionizationEnergiesKjMol: [
      2536,
      4588,
      7305,
      10545
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 1323,
    boilingPointK: 3471,
    densityGcm3: 10.07,
    heatOfFusionKjMol: 36.32,
    heatOfVaporizationKjMol: 199.76,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7529-9-1',
    discoveredYear: 1899,
    discoverer: 'Friedrich Giesel',
    summary: 'Actinium (symbol Ac) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 11.22,
    geochemicalAbundanceOceanMgL: 0.1122,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 227,
        atomicMassU: 227,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 703.1,
        magneticMomentNu: 7.12
      },
      {
        massNumber: 228,
        atomicMassU: 228.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 706.5,
        magneticMomentNu: 6.3
      },
      {
        massNumber: 229,
        atomicMassU: 229.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 707.98,
        magneticMomentNu: 5.915
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 402.7,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 633.9,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 619.3,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'AcO2',
        name: 'Actinium Dioxide',
        oxidationState: 4,
        molarMassGmol: 258.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'AcCl3',
        name: 'Actinium Trichloride',
        oxidationState: 3,
        molarMassGmol: 333.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ac(NO3)2',
        name: 'Actinium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 351.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 90,
    symbol: 'Th',
    name: 'Thorium',
    atomicMass: 232.04,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 6d² 7s²',
    electronegativityPauling: 1.3,
    electronegativityAllen: 1.37,
    ionizationEnergiesKjMol: [
      2560,
      4630,
      7370,
      10630
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 2115,
    boilingPointK: 5061,
    densityGcm3: 11.72,
    heatOfFusionKjMol: 37.13,
    heatOfVaporizationKjMol: 204.2,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7530-0-1',
    discoveredYear: 1829,
    discoverer: 'Jöns Jacob Berzelius',
    summary: 'Thorium (symbol Th) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 11.1,
    geochemicalAbundanceOceanMgL: 0.111,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 232,
        atomicMassU: 232.04,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 711,
        magneticMomentNu: 7.2
      },
      {
        massNumber: 233,
        atomicMassU: 233.042,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 714.35,
        magneticMomentNu: 6.37
      },
      {
        massNumber: 234,
        atomicMassU: 234.048,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 715.76,
        magneticMomentNu: 5.98
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 407,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 639,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 622,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'ThO2',
        name: 'Thorium Dioxide',
        oxidationState: 4,
        molarMassGmol: 264.038,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'ThCl3',
        name: 'Thorium Trichloride',
        oxidationState: 3,
        molarMassGmol: 338.39,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Th(NO3)2',
        name: 'Thorium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 356.05,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 91,
    symbol: 'Pa',
    name: 'Protactinium',
    atomicMass: 231.04,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 5f² 6d¹ 7s²',
    electronegativityPauling: 1.5,
    electronegativityAllen: 1.58,
    ionizationEnergiesKjMol: [
      2584,
      4672,
      7435,
      10715
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 1841,
    boilingPointK: 4300,
    densityGcm3: 15.37,
    heatOfFusionKjMol: 36.97,
    heatOfVaporizationKjMol: 203.32,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7531-1-1',
    discoveredYear: 1913,
    discoverer: 'Kasimir Fajans et al.',
    summary: 'Protactinium (symbol Pa) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 10.98,
    geochemicalAbundanceOceanMgL: 0.1098,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 231,
        atomicMassU: 231.04,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 718.9,
        magneticMomentNu: 7.28
      },
      {
        massNumber: 232,
        atomicMassU: 232.042,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 722.2,
        magneticMomentNu: 6.44
      },
      {
        massNumber: 233,
        atomicMassU: 233.048,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 723.54,
        magneticMomentNu: 6.045
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 411.3,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 644.1,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 624.7,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'PaO2',
        name: 'Protactinium Dioxide',
        oxidationState: 4,
        molarMassGmol: 263.038,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'PaCl3',
        name: 'Protactinium Trichloride',
        oxidationState: 3,
        molarMassGmol: 337.39,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Pa(NO3)2',
        name: 'Protactinium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 355.05,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 92,
    symbol: 'U',
    name: 'Uranium',
    atomicMass: 238.03,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 5f³ 6d¹ 7s²',
    electronegativityPauling: 1.38,
    electronegativityAllen: 1.45,
    ionizationEnergiesKjMol: [
      2608,
      4714,
      7500,
      10800
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 1405.3,
    boilingPointK: 4404,
    densityGcm3: 19.1,
    heatOfFusionKjMol: 38.08,
    heatOfVaporizationKjMol: 209.47,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7532-2-1',
    discoveredYear: 1789,
    discoverer: 'Martin Klaproth',
    summary: 'Uranium (symbol U) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 10.86,
    geochemicalAbundanceOceanMgL: 0.1086,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 238,
        atomicMassU: 238.03,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 726.8,
        magneticMomentNu: 7.36
      },
      {
        massNumber: 239,
        atomicMassU: 239.032,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 730.05,
        magneticMomentNu: 6.51
      },
      {
        massNumber: 240,
        atomicMassU: 240.038,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 731.32,
        magneticMomentNu: 6.11
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 415.6,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 649.2,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 627.4,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'UO2',
        name: 'Uranium Dioxide',
        oxidationState: 4,
        molarMassGmol: 270.028,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'UCl3',
        name: 'Uranium Trichloride',
        oxidationState: 3,
        molarMassGmol: 344.38,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'U(NO3)2',
        name: 'Uranium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 362.04,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 93,
    symbol: 'Np',
    name: 'Neptunium',
    atomicMass: 237,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 5f⁴ 6d¹ 7s²',
    electronegativityPauling: 1.36,
    electronegativityAllen: 1.43,
    ionizationEnergiesKjMol: [
      2632,
      4756,
      7565,
      10885
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 917,
    boilingPointK: 4273,
    densityGcm3: 20.45,
    heatOfFusionKjMol: 37.92,
    heatOfVaporizationKjMol: 208.56,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7533-3-1',
    discoveredYear: 1940,
    discoverer: 'Edwin McMillan et al.',
    summary: 'Neptunium (symbol Np) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 10.74,
    geochemicalAbundanceOceanMgL: 0.1074,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 237,
        atomicMassU: 237,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 734.7,
        magneticMomentNu: 7.44
      },
      {
        massNumber: 238,
        atomicMassU: 238.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 737.9,
        magneticMomentNu: 6.58
      },
      {
        massNumber: 239,
        atomicMassU: 239.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 739.1,
        magneticMomentNu: 6.175
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 419.9,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 654.3,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 630.1,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'NpO2',
        name: 'Neptunium Dioxide',
        oxidationState: 4,
        molarMassGmol: 268.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'NpCl3',
        name: 'Neptunium Trichloride',
        oxidationState: 3,
        molarMassGmol: 343.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Np(NO3)2',
        name: 'Neptunium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 361.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 94,
    symbol: 'Pu',
    name: 'Plutonium',
    atomicMass: 244,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 5f⁶ 7s²',
    electronegativityPauling: 1.28,
    electronegativityAllen: 1.34,
    ionizationEnergiesKjMol: [
      2656,
      4798,
      7630,
      10970
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 912.5,
    boilingPointK: 3501,
    densityGcm3: 19.86,
    heatOfFusionKjMol: 39.04,
    heatOfVaporizationKjMol: 214.72,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7534-4-1',
    discoveredYear: 1940,
    discoverer: 'Glenn Seaborg et al.',
    summary: 'Plutonium (symbol Pu) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 10.63,
    geochemicalAbundanceOceanMgL: 0.1063,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 244,
        atomicMassU: 244,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 742.6,
        magneticMomentNu: 7.52
      },
      {
        massNumber: 245,
        atomicMassU: 245.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 745.75,
        magneticMomentNu: 6.65
      },
      {
        massNumber: 246,
        atomicMassU: 246.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 746.88,
        magneticMomentNu: 6.24
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 424.2,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 659.4,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 632.8,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'PuO2',
        name: 'Plutonium Dioxide',
        oxidationState: 4,
        molarMassGmol: 275.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'PuCl3',
        name: 'Plutonium Trichloride',
        oxidationState: 3,
        molarMassGmol: 350.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Pu(NO3)2',
        name: 'Plutonium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 368.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 95,
    symbol: 'Am',
    name: 'Americium',
    atomicMass: 243,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 5f⁷ 7s²',
    electronegativityPauling: 1.3,
    electronegativityAllen: 1.37,
    ionizationEnergiesKjMol: [
      2680,
      4840,
      7695,
      11055
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 1449,
    boilingPointK: 2880,
    densityGcm3: 12,
    heatOfFusionKjMol: 38.88,
    heatOfVaporizationKjMol: 213.84,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7535-5-1',
    discoveredYear: 1944,
    discoverer: 'Glenn Seaborg et al.',
    summary: 'Americium (symbol Am) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 10.52,
    geochemicalAbundanceOceanMgL: 0.1052,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 243,
        atomicMassU: 243,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 750.5,
        magneticMomentNu: 7.6
      },
      {
        massNumber: 244,
        atomicMassU: 244.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 753.6,
        magneticMomentNu: 6.72
      },
      {
        massNumber: 245,
        atomicMassU: 245.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 754.66,
        magneticMomentNu: 6.305
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 428.5,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 664.5,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 635.5,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'AmO2',
        name: 'Americium Dioxide',
        oxidationState: 4,
        molarMassGmol: 274.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'AmCl3',
        name: 'Americium Trichloride',
        oxidationState: 3,
        molarMassGmol: 349.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Am(NO3)2',
        name: 'Americium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 367.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 96,
    symbol: 'Cm',
    name: 'Curium',
    atomicMass: 247,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 5f⁷ 6d¹ 7s²',
    electronegativityPauling: 1.3,
    electronegativityAllen: 1.37,
    ionizationEnergiesKjMol: [
      2704,
      4882,
      7760,
      11140
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 1613,
    boilingPointK: 3383,
    densityGcm3: 13.51,
    heatOfFusionKjMol: 39.52,
    heatOfVaporizationKjMol: 217.36,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7536-6-1',
    discoveredYear: 1944,
    discoverer: 'Glenn Seaborg et al.',
    summary: 'Curium (symbol Cm) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 10.41,
    geochemicalAbundanceOceanMgL: 0.1041,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 247,
        atomicMassU: 247,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 758.4,
        magneticMomentNu: 7.68
      },
      {
        massNumber: 248,
        atomicMassU: 248.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 761.45,
        magneticMomentNu: 6.79
      },
      {
        massNumber: 249,
        atomicMassU: 249.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 762.44,
        magneticMomentNu: 6.37
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 432.8,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 669.6,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 638.2,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'CmO2',
        name: 'Curium Dioxide',
        oxidationState: 4,
        molarMassGmol: 278.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'CmCl3',
        name: 'Curium Trichloride',
        oxidationState: 3,
        molarMassGmol: 353.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Cm(NO3)2',
        name: 'Curium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 371.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 97,
    symbol: 'Bk',
    name: 'Berkelium',
    atomicMass: 247,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 5f⁹ 7s²',
    electronegativityPauling: 1.3,
    electronegativityAllen: 1.37,
    ionizationEnergiesKjMol: [
      2728,
      4924,
      7825,
      11225
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 1259,
    boilingPointK: 2900,
    densityGcm3: 14.78,
    heatOfFusionKjMol: 39.52,
    heatOfVaporizationKjMol: 217.36,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7537-7-1',
    discoveredYear: 1949,
    discoverer: 'LBNL Team',
    summary: 'Berkelium (symbol Bk) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 10.3,
    geochemicalAbundanceOceanMgL: 0.103,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 247,
        atomicMassU: 247,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 766.3,
        magneticMomentNu: 7.76
      },
      {
        massNumber: 248,
        atomicMassU: 248.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 769.3,
        magneticMomentNu: 6.86
      },
      {
        massNumber: 249,
        atomicMassU: 249.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 770.22,
        magneticMomentNu: 6.435
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 437.1,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 674.7,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 640.9,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'BkO2',
        name: 'Berkelium Dioxide',
        oxidationState: 4,
        molarMassGmol: 278.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'BkCl3',
        name: 'Berkelium Trichloride',
        oxidationState: 3,
        molarMassGmol: 353.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Bk(NO3)2',
        name: 'Berkelium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 371.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 98,
    symbol: 'Cf',
    name: 'Californium',
    atomicMass: 251,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 5f¹⁰ 7s²',
    electronegativityPauling: 1.3,
    electronegativityAllen: 1.37,
    ionizationEnergiesKjMol: [
      2752,
      4966,
      7890,
      11310
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 1173,
    boilingPointK: 1743,
    densityGcm3: 15.1,
    heatOfFusionKjMol: 40.16,
    heatOfVaporizationKjMol: 220.88,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7538-8-1',
    discoveredYear: 1950,
    discoverer: 'LBNL Team',
    summary: 'Californium (symbol Cf) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 10.19,
    geochemicalAbundanceOceanMgL: 0.1019,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 251,
        atomicMassU: 251,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 774.2,
        magneticMomentNu: 7.84
      },
      {
        massNumber: 252,
        atomicMassU: 252.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 777.15,
        magneticMomentNu: 6.93
      },
      {
        massNumber: 253,
        atomicMassU: 253.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 778,
        magneticMomentNu: 6.5
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 441.4,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 679.8,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 643.6,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'CfO2',
        name: 'Californium Dioxide',
        oxidationState: 4,
        molarMassGmol: 282.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'CfCl3',
        name: 'Californium Trichloride',
        oxidationState: 3,
        molarMassGmol: 357.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Cf(NO3)2',
        name: 'Californium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 375.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 99,
    symbol: 'Es',
    name: 'Einsteinium',
    atomicMass: 252,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 5f¹¹ 7s²',
    electronegativityPauling: 1.3,
    electronegativityAllen: 1.37,
    ionizationEnergiesKjMol: [
      2776,
      5008,
      7955,
      11395
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 1133,
    boilingPointK: 1269,
    densityGcm3: 8.84,
    heatOfFusionKjMol: 40.32,
    heatOfVaporizationKjMol: 221.76,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7539-9-1',
    discoveredYear: 1952,
    discoverer: 'Albert Ghiorso et al.',
    summary: 'Einsteinium (symbol Es) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 10.09,
    geochemicalAbundanceOceanMgL: 0.1009,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 252,
        atomicMassU: 252,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 782.1,
        magneticMomentNu: 7.92
      },
      {
        massNumber: 253,
        atomicMassU: 253.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 785,
        magneticMomentNu: 7
      },
      {
        massNumber: 254,
        atomicMassU: 254.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 785.78,
        magneticMomentNu: 6.565
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 445.7,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 684.9,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 646.3,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'EsO2',
        name: 'Einsteinium Dioxide',
        oxidationState: 4,
        molarMassGmol: 283.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'EsCl3',
        name: 'Einsteinium Trichloride',
        oxidationState: 3,
        molarMassGmol: 358.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Es(NO3)2',
        name: 'Einsteinium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 376.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 100,
    symbol: 'Fm',
    name: 'Fermium',
    atomicMass: 257,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 5f¹² 7s²',
    electronegativityPauling: 1.3,
    electronegativityAllen: 1.37,
    ionizationEnergiesKjMol: [
      2800,
      5050,
      8020,
      11480
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 1800,
    boilingPointK: 1800,
    densityGcm3: 9.7,
    heatOfFusionKjMol: 41.12,
    heatOfVaporizationKjMol: 226.16,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7540-0-1',
    discoveredYear: 1952,
    discoverer: 'Albert Ghiorso et al.',
    summary: 'Fermium (symbol Fm) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 9.99,
    geochemicalAbundanceOceanMgL: 0.0999,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 257,
        atomicMassU: 257,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 790,
        magneticMomentNu: 8
      },
      {
        massNumber: 258,
        atomicMassU: 258.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 792.85,
        magneticMomentNu: 7.07
      },
      {
        massNumber: 259,
        atomicMassU: 259.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 793.56,
        magneticMomentNu: 6.63
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 450,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 690,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 649,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'FmO2',
        name: 'Fermium Dioxide',
        oxidationState: 4,
        molarMassGmol: 288.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'FmCl3',
        name: 'Fermium Trichloride',
        oxidationState: 3,
        molarMassGmol: 363.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Fm(NO3)2',
        name: 'Fermium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 381.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 101,
    symbol: 'Md',
    name: 'Mendelevium',
    atomicMass: 258,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 5f¹³ 7s²',
    electronegativityPauling: 1.3,
    electronegativityAllen: 1.37,
    ionizationEnergiesKjMol: [
      2824,
      5092,
      8085,
      11565
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 1100,
    boilingPointK: 1100,
    densityGcm3: 10.3,
    heatOfFusionKjMol: 41.28,
    heatOfVaporizationKjMol: 227.04,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7541-1-1',
    discoveredYear: 1955,
    discoverer: 'Albert Ghiorso et al.',
    summary: 'Mendelevium (symbol Md) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 9.89,
    geochemicalAbundanceOceanMgL: 0.0989,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 258,
        atomicMassU: 258,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 797.9,
        magneticMomentNu: 8.08
      },
      {
        massNumber: 259,
        atomicMassU: 259.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 800.7,
        magneticMomentNu: 7.14
      },
      {
        massNumber: 260,
        atomicMassU: 260.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 801.34,
        magneticMomentNu: 6.695
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 454.3,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 695.1,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 651.7,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'MdO2',
        name: 'Mendelevium Dioxide',
        oxidationState: 4,
        molarMassGmol: 289.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'MdCl3',
        name: 'Mendelevium Trichloride',
        oxidationState: 3,
        molarMassGmol: 364.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Md(NO3)2',
        name: 'Mendelevium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 382.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 102,
    symbol: 'No',
    name: 'Nobelium',
    atomicMass: 259,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f',
    electronConfiguration: '[Rn] 5f¹⁴ 7s²',
    electronegativityPauling: 1.3,
    electronegativityAllen: 1.37,
    ionizationEnergiesKjMol: [
      2848,
      5134,
      8150,
      11650
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 1100,
    boilingPointK: 1100,
    densityGcm3: 9.9,
    heatOfFusionKjMol: 41.44,
    heatOfVaporizationKjMol: 227.92,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7542-2-1',
    discoveredYear: 1966,
    discoverer: 'JINR Team',
    summary: 'Nobelium (symbol No) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 9.79,
    geochemicalAbundanceOceanMgL: 0.0979,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 259,
        atomicMassU: 259,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 805.8,
        magneticMomentNu: 8.16
      },
      {
        massNumber: 260,
        atomicMassU: 260.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 808.55,
        magneticMomentNu: 7.21
      },
      {
        massNumber: 261,
        atomicMassU: 261.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 809.12,
        magneticMomentNu: 6.76
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 458.6,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 700.2,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 654.4,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'NoO2',
        name: 'Nobelium Dioxide',
        oxidationState: 4,
        molarMassGmol: 290.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'NoCl3',
        name: 'Nobelium Trichloride',
        oxidationState: 3,
        molarMassGmol: 365.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'No(NO3)2',
        name: 'Nobelium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 383.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 103,
    symbol: 'Lr',
    name: 'Lawrencium',
    atomicMass: 266,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'd',
    electronConfiguration: '[Rn] 5f¹⁴ 7s² 7p¹',
    electronegativityPauling: 1.3,
    electronegativityAllen: 1.37,
    ionizationEnergiesKjMol: [
      2872,
      5176,
      8215,
      11735
    ],
    oxidationStates: [-7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 181,
    meltingPointK: 1900,
    boilingPointK: 1900,
    densityGcm3: 15.6,
    heatOfFusionKjMol: 42.56,
    heatOfVaporizationKjMol: 234.08,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7543-3-1',
    discoveredYear: 1961,
    discoverer: 'Albert Ghiorso et al.',
    summary: 'Lawrencium (symbol Lr) is an element in Group 3, Period 7. Classified under actinide, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 9.7,
    geochemicalAbundanceOceanMgL: 0.097,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 266,
        atomicMassU: 266,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 813.7,
        magneticMomentNu: 8.24
      },
      {
        massNumber: 267,
        atomicMassU: 267.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 816.4,
        magneticMomentNu: 7.28
      },
      {
        massNumber: 268,
        atomicMassU: 268.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 816.9,
        magneticMomentNu: 6.825
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 462.9,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 705.3,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 657.1,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'LrO2',
        name: 'Lawrencium Dioxide',
        oxidationState: 4,
        molarMassGmol: 297.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'LrCl3',
        name: 'Lawrencium Trichloride',
        oxidationState: 3,
        molarMassGmol: 372.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Lr(NO3)2',
        name: 'Lawrencium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 390.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 104,
    symbol: 'Rf',
    name: 'Rutherfordium',
    atomicMass: 267,
    category: 'transition-metal',
    period: 7,
    group: 4,
    block: 'd',
    electronConfiguration: '[Rn] 5f¹⁴ 6d² 7s²',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      2896,
      5218,
      8280,
      11820
    ],
    oxidationStates: [-6, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 180,
    meltingPointK: 2400,
    boilingPointK: 5800,
    densityGcm3: 23.2,
    heatOfFusionKjMol: 42.72,
    heatOfVaporizationKjMol: 234.96,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7544-4-1',
    discoveredYear: 1964,
    discoverer: 'JINR & LBNL',
    summary: 'Rutherfordium (symbol Rf) is an element in Group 4, Period 7. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 9.61,
    geochemicalAbundanceOceanMgL: 0.0961,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 267,
        atomicMassU: 267,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 821.6,
        magneticMomentNu: 8.32
      },
      {
        massNumber: 268,
        atomicMassU: 268.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 824.25,
        magneticMomentNu: 7.35
      },
      {
        massNumber: 269,
        atomicMassU: 269.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 824.68,
        magneticMomentNu: 6.89
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 467.2,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 710.4,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 659.8,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'RfO2',
        name: 'Rutherfordium Dioxide',
        oxidationState: 4,
        molarMassGmol: 298.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'RfCl3',
        name: 'Rutherfordium Trichloride',
        oxidationState: 3,
        molarMassGmol: 373.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Rf(NO3)2',
        name: 'Rutherfordium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 391.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 105,
    symbol: 'Db',
    name: 'Dubnium',
    atomicMass: 268,
    category: 'transition-metal',
    period: 7,
    group: 5,
    block: 'd',
    electronConfiguration: '[Rn] 5f¹⁴ 6d³ 7s²',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      2920,
      5260,
      8345,
      11905
    ],
    oxidationStates: [-5, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 179,
    meltingPointK: 2600,
    boilingPointK: 5500,
    densityGcm3: 29.3,
    heatOfFusionKjMol: 42.88,
    heatOfVaporizationKjMol: 235.84,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7545-5-1',
    discoveredYear: 1968,
    discoverer: 'JINR & LBNL',
    summary: 'Dubnium (symbol Db) is an element in Group 5, Period 7. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 9.51,
    geochemicalAbundanceOceanMgL: 0.0951,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 268,
        atomicMassU: 268,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 829.5,
        magneticMomentNu: 8.4
      },
      {
        massNumber: 269,
        atomicMassU: 269.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 832.1,
        magneticMomentNu: 7.42
      },
      {
        massNumber: 270,
        atomicMassU: 270.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 832.46,
        magneticMomentNu: 6.955
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 471.5,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 715.5,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 662.5,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'DbO2',
        name: 'Dubnium Dioxide',
        oxidationState: 4,
        molarMassGmol: 299.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'DbCl3',
        name: 'Dubnium Trichloride',
        oxidationState: 3,
        molarMassGmol: 374.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Db(NO3)2',
        name: 'Dubnium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 392.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 106,
    symbol: 'Sg',
    name: 'Seaborgium',
    atomicMass: 269,
    category: 'transition-metal',
    period: 7,
    group: 6,
    block: 'd',
    electronConfiguration: '[Rn] 5f¹⁴ 6d⁴ 7s²',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      2944,
      5302,
      8410,
      11990
    ],
    oxidationStates: [-4, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 178,
    meltingPointK: 2800,
    boilingPointK: 5200,
    densityGcm3: 35,
    heatOfFusionKjMol: 43.04,
    heatOfVaporizationKjMol: 236.72,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7546-6-1',
    discoveredYear: 1974,
    discoverer: 'LBNL Team',
    summary: 'Seaborgium (symbol Sg) is an element in Group 6, Period 7. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 9.43,
    geochemicalAbundanceOceanMgL: 0.0943,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 269,
        atomicMassU: 269,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 837.4,
        magneticMomentNu: 8.48
      },
      {
        massNumber: 270,
        atomicMassU: 270.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 839.95,
        magneticMomentNu: 7.49
      },
      {
        massNumber: 271,
        atomicMassU: 271.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 840.24,
        magneticMomentNu: 7.02
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 475.8,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 450.6,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 665.2,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'SgO2',
        name: 'Seaborgium Dioxide',
        oxidationState: 4,
        molarMassGmol: 300.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'SgCl3',
        name: 'Seaborgium Trichloride',
        oxidationState: 3,
        molarMassGmol: 375.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Sg(NO3)2',
        name: 'Seaborgium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 393.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 107,
    symbol: 'Bh',
    name: 'Bohrium',
    atomicMass: 270,
    category: 'transition-metal',
    period: 7,
    group: 7,
    block: 'd',
    electronConfiguration: '[Rn] 5f¹⁴ 6d⁵ 7s²',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      2968,
      5344,
      8475,
      12075
    ],
    oxidationStates: [-3, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 177,
    meltingPointK: 2900,
    boilingPointK: 5000,
    densityGcm3: 37.1,
    heatOfFusionKjMol: 43.2,
    heatOfVaporizationKjMol: 237.6,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7547-7-1',
    discoveredYear: 1981,
    discoverer: 'GSI Helmholtz',
    summary: 'Bohrium (symbol Bh) is an element in Group 7, Period 7. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 9.34,
    geochemicalAbundanceOceanMgL: 0.0934,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 270,
        atomicMassU: 270,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 845.3,
        magneticMomentNu: 8.56
      },
      {
        massNumber: 271,
        atomicMassU: 271.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 847.8,
        magneticMomentNu: 7.56
      },
      {
        massNumber: 272,
        atomicMassU: 272.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 848.02,
        magneticMomentNu: 7.085
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 480.1,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 455.7,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 667.9,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'BhO2',
        name: 'Bohrium Dioxide',
        oxidationState: 4,
        molarMassGmol: 301.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'BhCl3',
        name: 'Bohrium Trichloride',
        oxidationState: 3,
        molarMassGmol: 376.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Bh(NO3)2',
        name: 'Bohrium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 394.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 108,
    symbol: 'Hs',
    name: 'Hassium',
    atomicMass: 277,
    category: 'transition-metal',
    period: 7,
    group: 8,
    block: 'd',
    electronConfiguration: '[Rn] 5f¹⁴ 6d⁶ 7s²',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      2992,
      5386,
      8540,
      12160
    ],
    oxidationStates: [-2, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 175,
    meltingPointK: 3000,
    boilingPointK: 4800,
    densityGcm3: 40.7,
    heatOfFusionKjMol: 44.32,
    heatOfVaporizationKjMol: 243.76,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7548-8-1',
    discoveredYear: 1984,
    discoverer: 'GSI Helmholtz',
    summary: 'Hassium (symbol Hs) is an element in Group 8, Period 7. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 9.25,
    geochemicalAbundanceOceanMgL: 0.0925,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 277,
        atomicMassU: 277,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 853.2,
        magneticMomentNu: 8.64
      },
      {
        massNumber: 278,
        atomicMassU: 278.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 855.65,
        magneticMomentNu: 7.63
      },
      {
        massNumber: 279,
        atomicMassU: 279.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 855.8,
        magneticMomentNu: 7.15
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 484.4,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 460.8,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 670.6,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'HsO2',
        name: 'Hassium Dioxide',
        oxidationState: 4,
        molarMassGmol: 308.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'HsCl3',
        name: 'Hassium Trichloride',
        oxidationState: 3,
        molarMassGmol: 383.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Hs(NO3)2',
        name: 'Hassium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 401.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 109,
    symbol: 'Mt',
    name: 'Meitnerium',
    atomicMass: 278,
    category: 'transition-metal',
    period: 7,
    group: 9,
    block: 'd',
    electronConfiguration: '[Rn] 5f¹⁴ 6d⁷ 7s²',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      3016,
      5428,
      8605,
      12245
    ],
    oxidationStates: [-1, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 174,
    meltingPointK: 2900,
    boilingPointK: 4600,
    densityGcm3: 37.4,
    heatOfFusionKjMol: 44.48,
    heatOfVaporizationKjMol: 244.64,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7549-9-1',
    discoveredYear: 1982,
    discoverer: 'GSI Helmholtz',
    summary: 'Meitnerium (symbol Mt) is an element in Group 9, Period 7. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 9.17,
    geochemicalAbundanceOceanMgL: 0.0917,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 278,
        atomicMassU: 278,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 861.1,
        magneticMomentNu: 8.72
      },
      {
        massNumber: 279,
        atomicMassU: 279.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 863.5,
        magneticMomentNu: 7.7
      },
      {
        massNumber: 280,
        atomicMassU: 280.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 863.58,
        magneticMomentNu: 7.215
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 488.7,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 465.9,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 673.3,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'MtO2',
        name: 'Meitnerium Dioxide',
        oxidationState: 4,
        molarMassGmol: 309.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'MtCl3',
        name: 'Meitnerium Trichloride',
        oxidationState: 3,
        molarMassGmol: 384.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Mt(NO3)2',
        name: 'Meitnerium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 402.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 110,
    symbol: 'Ds',
    name: 'Darmstadtium',
    atomicMass: 281,
    category: 'transition-metal',
    period: 7,
    group: 10,
    block: 'd',
    electronConfiguration: '[Rn] 5f¹⁴ 6d⁸ 7s²',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      3040,
      5470,
      8670,
      12330
    ],
    oxidationStates: [0, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 173,
    meltingPointK: 2800,
    boilingPointK: 4400,
    densityGcm3: 34.8,
    heatOfFusionKjMol: 44.96,
    heatOfVaporizationKjMol: 247.28,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7550-0-1',
    discoveredYear: 1994,
    discoverer: 'GSI Helmholtz',
    summary: 'Darmstadtium (symbol Ds) is an element in Group 10, Period 7. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 9.08,
    geochemicalAbundanceOceanMgL: 0.0908,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 281,
        atomicMassU: 281,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 869,
        magneticMomentNu: 8.8
      },
      {
        massNumber: 282,
        atomicMassU: 282.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 871.35,
        magneticMomentNu: 7.77
      },
      {
        massNumber: 283,
        atomicMassU: 283.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 871.36,
        magneticMomentNu: 7.28
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 493,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 471,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 676,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'DsO2',
        name: 'Darmstadtium Dioxide',
        oxidationState: 4,
        molarMassGmol: 312.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'DsCl3',
        name: 'Darmstadtium Trichloride',
        oxidationState: 3,
        molarMassGmol: 387.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ds(NO3)2',
        name: 'Darmstadtium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 405.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 111,
    symbol: 'Rg',
    name: 'Roentgenium',
    atomicMass: 282,
    category: 'transition-metal',
    period: 7,
    group: 11,
    block: 'd',
    electronConfiguration: '[Rn] 5f¹⁴ 6d⁹ 7s²',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      3064,
      5512,
      8735,
      12415
    ],
    oxidationStates: [1, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 172,
    meltingPointK: 2600,
    boilingPointK: 4200,
    densityGcm3: 28.7,
    heatOfFusionKjMol: 45.12,
    heatOfVaporizationKjMol: 248.16,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7551-1-1',
    discoveredYear: 1994,
    discoverer: 'GSI Helmholtz',
    summary: 'Roentgenium (symbol Rg) is an element in Group 11, Period 7. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 9,
    geochemicalAbundanceOceanMgL: 0.09,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 282,
        atomicMassU: 282,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 876.9,
        magneticMomentNu: 8.88
      },
      {
        massNumber: 283,
        atomicMassU: 283.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 879.2,
        magneticMomentNu: 7.84
      },
      {
        massNumber: 284,
        atomicMassU: 284.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 879.14,
        magneticMomentNu: 7.345
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 497.3,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 476.1,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 678.7,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'RgO2',
        name: 'Roentgenium Dioxide',
        oxidationState: 4,
        molarMassGmol: 313.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'RgCl3',
        name: 'Roentgenium Trichloride',
        oxidationState: 3,
        molarMassGmol: 388.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Rg(NO3)2',
        name: 'Roentgenium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 406.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 112,
    symbol: 'Cn',
    name: 'Copernicium',
    atomicMass: 285,
    category: 'transition-metal',
    period: 7,
    group: 12,
    block: 'd',
    electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s²',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      3088,
      5554,
      8800,
      12500
    ],
    oxidationStates: [2, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 171,
    meltingPointK: 283,
    boilingPointK: 340,
    densityGcm3: 14,
    heatOfFusionKjMol: 45.6,
    heatOfVaporizationKjMol: 250.8,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7552-2-1',
    discoveredYear: 1996,
    discoverer: 'GSI Helmholtz',
    summary: 'Copernicium (symbol Cn) is an element in Group 12, Period 7. Classified under transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 8.92,
    geochemicalAbundanceOceanMgL: 0.0892,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 285,
        atomicMassU: 285,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 884.8,
        magneticMomentNu: 8.96
      },
      {
        massNumber: 286,
        atomicMassU: 286.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 887.05,
        magneticMomentNu: 7.91
      },
      {
        massNumber: 287,
        atomicMassU: 287.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 886.92,
        magneticMomentNu: 7.41
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 501.6,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 481.2,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 681.4,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'CnO2',
        name: 'Copernicium Dioxide',
        oxidationState: 4,
        molarMassGmol: 316.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'CnCl3',
        name: 'Copernicium Trichloride',
        oxidationState: 3,
        molarMassGmol: 391.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Cn(NO3)2',
        name: 'Copernicium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 409.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 113,
    symbol: 'Nh',
    name: 'Nihonium',
    atomicMass: 286,
    category: 'post-transition-metal',
    period: 7,
    group: 13,
    block: 'p',
    electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      3112,
      5596,
      8865,
      12585
    ],
    oxidationStates: [3, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 169,
    meltingPointK: 700,
    boilingPointK: 1400,
    densityGcm3: 16,
    heatOfFusionKjMol: 45.76,
    heatOfVaporizationKjMol: 251.68,
    molarHeatCapacityJmolK: 29.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7553-3-1',
    discoveredYear: 2004,
    discoverer: 'RIKEN Team',
    summary: 'Nihonium (symbol Nh) is an element in Group 13, Period 7. Classified under post-transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 8.84,
    geochemicalAbundanceOceanMgL: 0.0884,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 286,
        atomicMassU: 286,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 892.7,
        magneticMomentNu: 9.04
      },
      {
        massNumber: 287,
        atomicMassU: 287.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 894.9,
        magneticMomentNu: 7.98
      },
      {
        massNumber: 288,
        atomicMassU: 288.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 894.7,
        magneticMomentNu: 7.475
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 505.9,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 486.3,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 684.1,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'NhO2',
        name: 'Nihonium Dioxide',
        oxidationState: 4,
        molarMassGmol: 317.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'NhCl3',
        name: 'Nihonium Trichloride',
        oxidationState: 3,
        molarMassGmol: 392.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Nh(NO3)2',
        name: 'Nihonium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 410.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 114,
    symbol: 'Fl',
    name: 'Flerovium',
    atomicMass: 289,
    category: 'post-transition-metal',
    period: 7,
    group: 14,
    block: 'p',
    electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      3136,
      5638,
      8930,
      12670
    ],
    oxidationStates: [4, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 168,
    meltingPointK: 340,
    boilingPointK: 420,
    densityGcm3: 9.9,
    heatOfFusionKjMol: 46.24,
    heatOfVaporizationKjMol: 254.32,
    molarHeatCapacityJmolK: 24.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7554-4-1',
    discoveredYear: 1998,
    discoverer: 'JINR Team',
    summary: 'Flerovium (symbol Fl) is an element in Group 14, Period 7. Classified under post-transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 8.76,
    geochemicalAbundanceOceanMgL: 0.0876,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 289,
        atomicMassU: 289,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 900.6,
        magneticMomentNu: 9.12
      },
      {
        massNumber: 290,
        atomicMassU: 290.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 902.75,
        magneticMomentNu: 8.05
      },
      {
        massNumber: 291,
        atomicMassU: 291.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 902.48,
        magneticMomentNu: 7.54
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 510.2,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 491.4,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 686.8,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'FlO2',
        name: 'Flerovium Dioxide',
        oxidationState: 4,
        molarMassGmol: 320.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'FlCl3',
        name: 'Flerovium Trichloride',
        oxidationState: 3,
        molarMassGmol: 395.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Fl(NO3)2',
        name: 'Flerovium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 413.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 115,
    symbol: 'Mc',
    name: 'Moscovium',
    atomicMass: 290,
    category: 'post-transition-metal',
    period: 7,
    group: 15,
    block: 'p',
    electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      3160,
      5680,
      8995,
      12755
    ],
    oxidationStates: [5, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 167,
    meltingPointK: 670,
    boilingPointK: 1400,
    densityGcm3: 13.5,
    heatOfFusionKjMol: 46.4,
    heatOfVaporizationKjMol: 255.2,
    molarHeatCapacityJmolK: 25.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7555-5-1',
    discoveredYear: 2003,
    discoverer: 'JINR & LLNL',
    summary: 'Moscovium (symbol Mc) is an element in Group 15, Period 7. Classified under post-transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 8.69,
    geochemicalAbundanceOceanMgL: 0.0869,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 290,
        atomicMassU: 290,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 908.5,
        magneticMomentNu: 9.2
      },
      {
        massNumber: 291,
        atomicMassU: 291.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 910.6,
        magneticMomentNu: 8.12
      },
      {
        massNumber: 292,
        atomicMassU: 292.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 910.26,
        magneticMomentNu: 7.605
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 514.5,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 496.5,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 689.5,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'McO2',
        name: 'Moscovium Dioxide',
        oxidationState: 4,
        molarMassGmol: 321.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'McCl3',
        name: 'Moscovium Trichloride',
        oxidationState: 3,
        molarMassGmol: 396.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Mc(NO3)2',
        name: 'Moscovium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 414.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 116,
    symbol: 'Lv',
    name: 'Livermorium',
    atomicMass: 293,
    category: 'post-transition-metal',
    period: 7,
    group: 16,
    block: 'p',
    electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      3184,
      5722,
      9060,
      12840
    ],
    oxidationStates: [6, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 166,
    meltingPointK: 700,
    boilingPointK: 1100,
    densityGcm3: 12.9,
    heatOfFusionKjMol: 46.88,
    heatOfVaporizationKjMol: 257.84,
    molarHeatCapacityJmolK: 26.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7556-6-1',
    discoveredYear: 2000,
    discoverer: 'JINR & LLNL',
    summary: 'Livermorium (symbol Lv) is an element in Group 16, Period 7. Classified under post-transition-metal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 8.61,
    geochemicalAbundanceOceanMgL: 0.0861,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 293,
        atomicMassU: 293,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 916.4,
        magneticMomentNu: 9.28
      },
      {
        massNumber: 294,
        atomicMassU: 294.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 918.45,
        magneticMomentNu: 8.19
      },
      {
        massNumber: 295,
        atomicMassU: 295.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 918.04,
        magneticMomentNu: 7.67
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 518.8,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 501.6,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 692.2,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'LvO2',
        name: 'Livermorium Dioxide',
        oxidationState: 4,
        molarMassGmol: 324.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'LvCl3',
        name: 'Livermorium Trichloride',
        oxidationState: 3,
        molarMassGmol: 399.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Lv(NO3)2',
        name: 'Livermorium Dinitrate',
        oxidationState: 2,
        molarMassGmol: 417.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 117,
    symbol: 'Ts',
    name: 'Tennessine',
    atomicMass: 294,
    category: 'reactive-nonmetal',
    period: 7,
    group: 17,
    block: 'p',
    electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      3208,
      5764,
      9125,
      12925
    ],
    oxidationStates: [7, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 165,
    meltingPointK: 723,
    boilingPointK: 883,
    densityGcm3: 7.2,
    heatOfFusionKjMol: 47.04,
    heatOfVaporizationKjMol: 258.72,
    molarHeatCapacityJmolK: 27.2,
    crystalStructure: 'Face-centered cubic',
    spaceGroup: 'Fm-3m (No. 225)',
    casNumber: '7557-7-1',
    discoveredYear: 2010,
    discoverer: 'JINR, LLNL, ORNL',
    summary: 'Tennessine (symbol Ts) is an element in Group 17, Period 7. Classified under reactive-nonmetal, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 8.54,
    geochemicalAbundanceOceanMgL: 0.0854,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 294,
        atomicMassU: 294,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 924.3,
        magneticMomentNu: 9.36
      },
      {
        massNumber: 295,
        atomicMassU: 295.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 926.3,
        magneticMomentNu: 8.26
      },
      {
        massNumber: 296,
        atomicMassU: 296.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 925.82,
        magneticMomentNu: 7.735
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 523.1,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 506.7,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 694.9,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'TsO2',
        name: 'Tennessine Dioxide',
        oxidationState: 4,
        molarMassGmol: 325.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'TsCl3',
        name: 'Tennessine Trichloride',
        oxidationState: 3,
        molarMassGmol: 400.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Ts(NO3)2',
        name: 'Tennessine Dinitrate',
        oxidationState: 2,
        molarMassGmol: 418.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
  {
    number: 118,
    symbol: 'Og',
    name: 'Oganesson',
    atomicMass: 294,
    category: 'noble-gas',
    period: 7,
    group: 18,
    block: 'p',
    electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶',
    electronegativityPauling: 0,
    electronegativityAllen: 0,
    ionizationEnergiesKjMol: [
      3232,
      5806,
      9190,
      13010
    ],
    oxidationStates: [8, 2, 3],
    covalentRadiusPm: 194,
    vanDerWaalsRadiusPm: 246,
    atomicRadiusEmpiricalPm: 163,
    meltingPointK: 325,
    boilingPointK: 350,
    densityGcm3: 4.9,
    heatOfFusionKjMol: 47.04,
    heatOfVaporizationKjMol: 258.72,
    molarHeatCapacityJmolK: 28.2,
    crystalStructure: 'Hexagonal close-packed',
    spaceGroup: 'P6_3/mmc (No. 194)',
    casNumber: '7558-8-1',
    discoveredYear: 2002,
    discoverer: 'JINR & LLNL',
    summary: 'Oganesson (symbol Og) is an element in Group 18, Period 7. Classified under noble-gas, it plays fundamental roles in modern materials science and inorganic synthesis.',
    geochemicalAbundanceCrustMgKg: 8.47,
    geochemicalAbundanceOceanMgL: 0.0847,
    safetyGhsCodes: ['GHS07', 'GHS02'],
    safetySignalWord: 'Danger',
    isotopes: [
      {
        massNumber: 294,
        atomicMassU: 294,
        relativeAbundance: 98.2,
        halfLife: 'Stable',
        spinParity: '1/2+',
        bindingEnergyMev: 932.2,
        magneticMomentNu: 9.44
      },
      {
        massNumber: 295,
        atomicMassU: 295.002,
        relativeAbundance: 1.7,
        halfLife: 'Stable',
        spinParity: '1+',
        bindingEnergyMev: 934.15,
        magneticMomentNu: 8.33
      },
      {
        massNumber: 296,
        atomicMassU: 296.008,
        relativeAbundance: 0.1,
        halfLife: '3.82 days',
        spinParity: '0+',
        decayMode: 'Alpha decay',
        bindingEnergyMev: 933.6,
        magneticMomentNu: 7.8
      }
    ],
    spectralLines: [
      {
        wavelengthNm: 527.4,
        intensity: 890,
        airVacuum: 'air',
        transitionTerm: '3s -> 3p'
      },
      {
        wavelengthNm: 511.8,
        intensity: 640,
        airVacuum: 'air',
        transitionTerm: '3p -> 3d'
      },
      {
        wavelengthNm: 697.6,
        intensity: 950,
        airVacuum: 'air',
        transitionTerm: '4s -> 4p'
      }
    ],
    commonCompounds: [
      {
        formula: 'OgO2',
        name: 'Oganesson Dioxide',
        oxidationState: 4,
        molarMassGmol: 325.998,
        solubilityGper100ml: 'Insoluble in cold water',
        primaryUse: 'Advanced refractory ceramics and catalysis'
      },
      {
        formula: 'OgCl3',
        name: 'Oganesson Trichloride',
        oxidationState: 3,
        molarMassGmol: 400.35,
        solubilityGper100ml: '68.5 g / 100 mL (20 °C)',
        primaryUse: 'Lewis acid catalyst and precursor in vapor deposition'
      },
      {
        formula: 'Og(NO3)2',
        name: 'Oganesson Dinitrate',
        oxidationState: 2,
        molarMassGmol: 418.01,
        solubilityGper100ml: '94.2 g / 100 mL (20 °C)',
        primaryUse: 'Synthesis of nanoparticles and electrochemical plating'
      }
    ]
  },
];
