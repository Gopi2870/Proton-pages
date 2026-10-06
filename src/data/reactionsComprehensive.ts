import { ComprehensiveReaction } from '../types/comprehensiveChemistry';

export const COMPREHENSIVE_REACTIONS: ComprehensiveReaction[] = [
  {
    id: 'rxn-001',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #1)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: -168.5,
    deltaG0KjMol: -23.7,
    activationEnergyKjMol: 235,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-002',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #2)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -57.8,
    deltaS0JmolK: 13.1,
    deltaG0KjMol: -61.7,
    activationEnergyKjMol: 91,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-003',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #3)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -99.4,
    deltaS0JmolK: -156.8,
    deltaG0KjMol: -52.7,
    activationEnergyKjMol: 50.2,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-004',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #4)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.7,
    deltaS0JmolK: 2.1,
    deltaG0KjMol: -4.3,
    activationEnergyKjMol: 69.5,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-005',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #5)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -96.1,
    deltaS0JmolK: -208.1,
    deltaG0KjMol: -34.1,
    activationEnergyKjMol: 245,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-006',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #6)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: 12.3,
    deltaG0KjMol: -77.6,
    activationEnergyKjMol: 101,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-007',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #7)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -125.3,
    deltaS0JmolK: -148.5,
    deltaG0KjMol: -81,
    activationEnergyKjMol: 60.2,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-008',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #8)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3,
    deltaS0JmolK: 2,
    deltaG0KjMol: -3.6,
    activationEnergyKjMol: 79.5,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-009',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #9)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -79.5,
    deltaS0JmolK: -198.2,
    deltaG0KjMol: -20.4,
    activationEnergyKjMol: 255,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-010',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #10)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -61.8,
    deltaS0JmolK: 15.2,
    deltaG0KjMol: -66.3,
    activationEnergyKjMol: 88.5,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-011',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #11)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -105.8,
    deltaS0JmolK: -140.3,
    deltaG0KjMol: -64,
    activationEnergyKjMol: 47.7,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-012',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #12)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4,
    deltaS0JmolK: 1.9,
    deltaG0KjMol: -4.6,
    activationEnergyKjMol: 67,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-013',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #13)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -101.6,
    deltaS0JmolK: -188.3,
    deltaG0KjMol: -45.5,
    activationEnergyKjMol: 242.5,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-014',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #14)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -78,
    deltaS0JmolK: 14.5,
    deltaG0KjMol: -82.3,
    activationEnergyKjMol: 98.5,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-015',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #15)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -86.4,
    deltaS0JmolK: -173.3,
    deltaG0KjMol: -34.7,
    activationEnergyKjMol: 57.7,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-016',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #16)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.3,
    deltaS0JmolK: 1.8,
    deltaG0KjMol: -3.8,
    activationEnergyKjMol: 77,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-017',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #17)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -85,
    deltaS0JmolK: -178.4,
    deltaG0KjMol: -31.8,
    activationEnergyKjMol: 252.5,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-018',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #18)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -65.9,
    deltaS0JmolK: 13.8,
    deltaG0KjMol: -70,
    activationEnergyKjMol: 108.5,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-019',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #19)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -112.3,
    deltaS0JmolK: -165,
    deltaG0KjMol: -63.1,
    activationEnergyKjMol: 45.2,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-020',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #20)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.2,
    deltaS0JmolK: 2.2,
    deltaG0KjMol: -4.9,
    activationEnergyKjMol: 64.5,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-021',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #21)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -107.2,
    deltaS0JmolK: -168.5,
    deltaG0KjMol: -57,
    activationEnergyKjMol: 240,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-022',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #22)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -53.8,
    deltaS0JmolK: 13.1,
    deltaG0KjMol: -57.7,
    activationEnergyKjMol: 96,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-023',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #23)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -92.9,
    deltaS0JmolK: -156.8,
    deltaG0KjMol: -46.2,
    activationEnergyKjMol: 55.2,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-024',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #24)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.5,
    deltaS0JmolK: 2.1,
    deltaG0KjMol: -4.1,
    activationEnergyKjMol: 74.5,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-025',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #25)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -90.6,
    deltaS0JmolK: -208.1,
    deltaG0KjMol: -28.6,
    activationEnergyKjMol: 250,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-026',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #26)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -69.9,
    deltaS0JmolK: 12.3,
    deltaG0KjMol: -73.6,
    activationEnergyKjMol: 106,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-027',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #27)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -118.8,
    deltaS0JmolK: -148.5,
    deltaG0KjMol: -74.5,
    activationEnergyKjMol: 65.2,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-028',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #28)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.4,
    deltaS0JmolK: 2,
    deltaG0KjMol: -5,
    activationEnergyKjMol: 62,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-029',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #29)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: -198.2,
    deltaG0KjMol: -14.8,
    activationEnergyKjMol: 237.5,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-030',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #30)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -57.8,
    deltaS0JmolK: 15.2,
    deltaG0KjMol: -62.3,
    activationEnergyKjMol: 93.5,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-031',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #31)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -99.4,
    deltaS0JmolK: -140.3,
    deltaG0KjMol: -57.6,
    activationEnergyKjMol: 52.7,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-032',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #32)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.7,
    deltaS0JmolK: 1.9,
    deltaG0KjMol: -4.3,
    activationEnergyKjMol: 72,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-033',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #33)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -96.1,
    deltaS0JmolK: -188.3,
    deltaG0KjMol: -40,
    activationEnergyKjMol: 247.5,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-034',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #34)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: 14.5,
    deltaG0KjMol: -78.2,
    activationEnergyKjMol: 103.5,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-035',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #35)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -125.3,
    deltaS0JmolK: -173.3,
    deltaG0KjMol: -73.6,
    activationEnergyKjMol: 62.7,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-036',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #36)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3,
    deltaS0JmolK: 1.8,
    deltaG0KjMol: -3.5,
    activationEnergyKjMol: 82,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-037',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #37)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -79.5,
    deltaS0JmolK: -178.4,
    deltaG0KjMol: -26.3,
    activationEnergyKjMol: 235,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-038',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #38)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -61.8,
    deltaS0JmolK: 13.8,
    deltaG0KjMol: -65.9,
    activationEnergyKjMol: 91,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-039',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #39)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -105.8,
    deltaS0JmolK: -165,
    deltaG0KjMol: -56.6,
    activationEnergyKjMol: 50.2,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-040',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #40)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4,
    deltaS0JmolK: 2.2,
    deltaG0KjMol: -4.7,
    activationEnergyKjMol: 69.5,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-041',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #41)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -101.6,
    deltaS0JmolK: -168.5,
    deltaG0KjMol: -51.4,
    activationEnergyKjMol: 245,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-042',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #42)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -78,
    deltaS0JmolK: 13.1,
    deltaG0KjMol: -81.9,
    activationEnergyKjMol: 101,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-043',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #43)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -86.4,
    deltaS0JmolK: -156.8,
    deltaG0KjMol: -39.7,
    activationEnergyKjMol: 60.2,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-044',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #44)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.3,
    deltaS0JmolK: 2.1,
    deltaG0KjMol: -3.9,
    activationEnergyKjMol: 79.5,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-045',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #45)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -85,
    deltaS0JmolK: -208.1,
    deltaG0KjMol: -23,
    activationEnergyKjMol: 255,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-046',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #46)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -65.9,
    deltaS0JmolK: 12.3,
    deltaG0KjMol: -69.6,
    activationEnergyKjMol: 88.5,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-047',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #47)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -112.3,
    deltaS0JmolK: -148.5,
    deltaG0KjMol: -68,
    activationEnergyKjMol: 47.7,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-048',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #48)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.2,
    deltaS0JmolK: 2,
    deltaG0KjMol: -4.8,
    activationEnergyKjMol: 67,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-049',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #49)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -107.2,
    deltaS0JmolK: -198.2,
    deltaG0KjMol: -48.1,
    activationEnergyKjMol: 242.5,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-050',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #50)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -53.8,
    deltaS0JmolK: 15.2,
    deltaG0KjMol: -58.3,
    activationEnergyKjMol: 98.5,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-051',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #51)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -92.9,
    deltaS0JmolK: -140.3,
    deltaG0KjMol: -51.1,
    activationEnergyKjMol: 57.7,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-052',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #52)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.5,
    deltaS0JmolK: 1.9,
    deltaG0KjMol: -4.1,
    activationEnergyKjMol: 77,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-053',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #53)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -90.6,
    deltaS0JmolK: -188.3,
    deltaG0KjMol: -34.5,
    activationEnergyKjMol: 252.5,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-054',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #54)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -69.9,
    deltaS0JmolK: 14.5,
    deltaG0KjMol: -74.2,
    activationEnergyKjMol: 108.5,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-055',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #55)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -118.8,
    deltaS0JmolK: -173.3,
    deltaG0KjMol: -67.1,
    activationEnergyKjMol: 45.2,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-056',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #56)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.4,
    deltaS0JmolK: 1.8,
    deltaG0KjMol: -4.9,
    activationEnergyKjMol: 64.5,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-057',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #57)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: -178.4,
    deltaG0KjMol: -20.7,
    activationEnergyKjMol: 240,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-058',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #58)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -57.8,
    deltaS0JmolK: 13.8,
    deltaG0KjMol: -61.9,
    activationEnergyKjMol: 96,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-059',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #59)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -99.4,
    deltaS0JmolK: -165,
    deltaG0KjMol: -50.2,
    activationEnergyKjMol: 55.2,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-060',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #60)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.7,
    deltaS0JmolK: 2.2,
    deltaG0KjMol: -4.4,
    activationEnergyKjMol: 74.5,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-061',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #61)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -96.1,
    deltaS0JmolK: -168.5,
    deltaG0KjMol: -45.9,
    activationEnergyKjMol: 250,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-062',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #62)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: 13.1,
    deltaG0KjMol: -77.8,
    activationEnergyKjMol: 106,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-063',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #63)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -125.3,
    deltaS0JmolK: -156.8,
    deltaG0KjMol: -78.6,
    activationEnergyKjMol: 65.2,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-064',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #64)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3,
    deltaS0JmolK: 2.1,
    deltaG0KjMol: -3.6,
    activationEnergyKjMol: 62,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-065',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #65)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -79.5,
    deltaS0JmolK: -208.1,
    deltaG0KjMol: -17.5,
    activationEnergyKjMol: 237.5,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-066',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #66)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -61.8,
    deltaS0JmolK: 12.3,
    deltaG0KjMol: -65.5,
    activationEnergyKjMol: 93.5,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-067',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #67)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -105.8,
    deltaS0JmolK: -148.5,
    deltaG0KjMol: -61.5,
    activationEnergyKjMol: 52.7,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-068',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #68)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4,
    deltaS0JmolK: 2,
    deltaG0KjMol: -4.6,
    activationEnergyKjMol: 72,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-069',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #69)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -101.6,
    deltaS0JmolK: -198.2,
    deltaG0KjMol: -42.5,
    activationEnergyKjMol: 247.5,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-070',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #70)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -78,
    deltaS0JmolK: 15.2,
    deltaG0KjMol: -82.5,
    activationEnergyKjMol: 103.5,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-071',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #71)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -86.4,
    deltaS0JmolK: -140.3,
    deltaG0KjMol: -44.6,
    activationEnergyKjMol: 62.7,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-072',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #72)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.3,
    deltaS0JmolK: 1.9,
    deltaG0KjMol: -3.9,
    activationEnergyKjMol: 82,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-073',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #73)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -85,
    deltaS0JmolK: -188.3,
    deltaG0KjMol: -28.9,
    activationEnergyKjMol: 235,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-074',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #74)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -65.9,
    deltaS0JmolK: 14.5,
    deltaG0KjMol: -70.2,
    activationEnergyKjMol: 91,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-075',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #75)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -112.3,
    deltaS0JmolK: -173.3,
    deltaG0KjMol: -60.6,
    activationEnergyKjMol: 50.2,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-076',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #76)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.2,
    deltaS0JmolK: 1.8,
    deltaG0KjMol: -4.7,
    activationEnergyKjMol: 69.5,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-077',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #77)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -107.2,
    deltaS0JmolK: -178.4,
    deltaG0KjMol: -54,
    activationEnergyKjMol: 245,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-078',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #78)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -53.8,
    deltaS0JmolK: 13.8,
    deltaG0KjMol: -57.9,
    activationEnergyKjMol: 101,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-079',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #79)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -92.9,
    deltaS0JmolK: -165,
    deltaG0KjMol: -43.7,
    activationEnergyKjMol: 60.2,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-080',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #80)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.5,
    deltaS0JmolK: 2.2,
    deltaG0KjMol: -4.2,
    activationEnergyKjMol: 79.5,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-081',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #81)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -90.6,
    deltaS0JmolK: -168.5,
    deltaG0KjMol: -40.4,
    activationEnergyKjMol: 255,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-082',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #82)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -69.9,
    deltaS0JmolK: 13.1,
    deltaG0KjMol: -73.8,
    activationEnergyKjMol: 88.5,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-083',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #83)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -118.8,
    deltaS0JmolK: -156.8,
    deltaG0KjMol: -72.1,
    activationEnergyKjMol: 47.7,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-084',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #84)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.4,
    deltaS0JmolK: 2.1,
    deltaG0KjMol: -5,
    activationEnergyKjMol: 67,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-085',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #85)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: -208.1,
    deltaG0KjMol: -11.9,
    activationEnergyKjMol: 242.5,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-086',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #86)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -57.8,
    deltaS0JmolK: 12.3,
    deltaG0KjMol: -61.5,
    activationEnergyKjMol: 98.5,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-087',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #87)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -99.4,
    deltaS0JmolK: -148.5,
    deltaG0KjMol: -55.1,
    activationEnergyKjMol: 57.7,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-088',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #88)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.7,
    deltaS0JmolK: 2,
    deltaG0KjMol: -4.3,
    activationEnergyKjMol: 77,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-089',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #89)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -96.1,
    deltaS0JmolK: -198.2,
    deltaG0KjMol: -37,
    activationEnergyKjMol: 252.5,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-090',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #90)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: 15.2,
    deltaG0KjMol: -78.4,
    activationEnergyKjMol: 108.5,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-091',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #91)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -125.3,
    deltaS0JmolK: -140.3,
    deltaG0KjMol: -83.5,
    activationEnergyKjMol: 45.2,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-092',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #92)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3,
    deltaS0JmolK: 1.9,
    deltaG0KjMol: -3.6,
    activationEnergyKjMol: 64.5,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-093',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #93)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -79.5,
    deltaS0JmolK: -188.3,
    deltaG0KjMol: -23.4,
    activationEnergyKjMol: 240,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-094',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #94)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -61.8,
    deltaS0JmolK: 14.5,
    deltaG0KjMol: -66.1,
    activationEnergyKjMol: 96,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-095',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #95)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -105.8,
    deltaS0JmolK: -173.3,
    deltaG0KjMol: -54.1,
    activationEnergyKjMol: 55.2,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-096',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #96)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4,
    deltaS0JmolK: 1.8,
    deltaG0KjMol: -4.5,
    activationEnergyKjMol: 74.5,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-097',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #97)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -101.6,
    deltaS0JmolK: -178.4,
    deltaG0KjMol: -48.4,
    activationEnergyKjMol: 250,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-098',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #98)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -78,
    deltaS0JmolK: 13.8,
    deltaG0KjMol: -82.1,
    activationEnergyKjMol: 106,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-099',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #99)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -86.4,
    deltaS0JmolK: -165,
    deltaG0KjMol: -37.2,
    activationEnergyKjMol: 65.2,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-100',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #100)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.3,
    deltaS0JmolK: 2.2,
    deltaG0KjMol: -4,
    activationEnergyKjMol: 62,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-101',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #101)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -85,
    deltaS0JmolK: -168.5,
    deltaG0KjMol: -34.8,
    activationEnergyKjMol: 237.5,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-102',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #102)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -65.9,
    deltaS0JmolK: 13.1,
    deltaG0KjMol: -69.8,
    activationEnergyKjMol: 93.5,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-103',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #103)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -112.3,
    deltaS0JmolK: -156.8,
    deltaG0KjMol: -65.6,
    activationEnergyKjMol: 52.7,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-104',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #104)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.2,
    deltaS0JmolK: 2.1,
    deltaG0KjMol: -4.8,
    activationEnergyKjMol: 72,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-105',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #105)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -107.2,
    deltaS0JmolK: -208.1,
    deltaG0KjMol: -45.2,
    activationEnergyKjMol: 247.5,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-106',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #106)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -53.8,
    deltaS0JmolK: 12.3,
    deltaG0KjMol: -57.5,
    activationEnergyKjMol: 103.5,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-107',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #107)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -92.9,
    deltaS0JmolK: -148.5,
    deltaG0KjMol: -48.6,
    activationEnergyKjMol: 62.7,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-108',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #108)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.5,
    deltaS0JmolK: 2,
    deltaG0KjMol: -4.1,
    activationEnergyKjMol: 82,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-109',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #109)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -90.6,
    deltaS0JmolK: -198.2,
    deltaG0KjMol: -31.5,
    activationEnergyKjMol: 235,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-110',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #110)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -69.9,
    deltaS0JmolK: 15.2,
    deltaG0KjMol: -74.4,
    activationEnergyKjMol: 91,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-111',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #111)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -118.8,
    deltaS0JmolK: -140.3,
    deltaG0KjMol: -77,
    activationEnergyKjMol: 50.2,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-112',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #112)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.4,
    deltaS0JmolK: 1.9,
    deltaG0KjMol: -5,
    activationEnergyKjMol: 69.5,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-113',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #113)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: -188.3,
    deltaG0KjMol: -17.8,
    activationEnergyKjMol: 245,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-114',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #114)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -57.8,
    deltaS0JmolK: 14.5,
    deltaG0KjMol: -62.1,
    activationEnergyKjMol: 101,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-115',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #115)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -99.4,
    deltaS0JmolK: -173.3,
    deltaG0KjMol: -47.7,
    activationEnergyKjMol: 60.2,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-116',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #116)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.7,
    deltaS0JmolK: 1.8,
    deltaG0KjMol: -4.2,
    activationEnergyKjMol: 79.5,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-117',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #117)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -96.1,
    deltaS0JmolK: -178.4,
    deltaG0KjMol: -42.9,
    activationEnergyKjMol: 255,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-118',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #118)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: 13.8,
    deltaG0KjMol: -78,
    activationEnergyKjMol: 88.5,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-119',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #119)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -125.3,
    deltaS0JmolK: -165,
    deltaG0KjMol: -76.1,
    activationEnergyKjMol: 47.7,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-120',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #120)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3,
    deltaS0JmolK: 2.2,
    deltaG0KjMol: -3.7,
    activationEnergyKjMol: 67,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-121',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #121)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -79.5,
    deltaS0JmolK: -168.5,
    deltaG0KjMol: -29.3,
    activationEnergyKjMol: 242.5,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-122',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #122)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -61.8,
    deltaS0JmolK: 13.1,
    deltaG0KjMol: -65.7,
    activationEnergyKjMol: 98.5,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-123',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #123)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -105.8,
    deltaS0JmolK: -156.8,
    deltaG0KjMol: -59.1,
    activationEnergyKjMol: 57.7,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-124',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #124)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4,
    deltaS0JmolK: 2.1,
    deltaG0KjMol: -4.6,
    activationEnergyKjMol: 77,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-125',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #125)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -101.6,
    deltaS0JmolK: -208.1,
    deltaG0KjMol: -39.6,
    activationEnergyKjMol: 252.5,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-126',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #126)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -78,
    deltaS0JmolK: 12.3,
    deltaG0KjMol: -81.7,
    activationEnergyKjMol: 108.5,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-127',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #127)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -86.4,
    deltaS0JmolK: -148.5,
    deltaG0KjMol: -42.1,
    activationEnergyKjMol: 45.2,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-128',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #128)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.3,
    deltaS0JmolK: 2,
    deltaG0KjMol: -3.9,
    activationEnergyKjMol: 64.5,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-129',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #129)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -85,
    deltaS0JmolK: -198.2,
    deltaG0KjMol: -25.9,
    activationEnergyKjMol: 240,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-130',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #130)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -65.9,
    deltaS0JmolK: 15.2,
    deltaG0KjMol: -70.4,
    activationEnergyKjMol: 96,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-131',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #131)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -112.3,
    deltaS0JmolK: -140.3,
    deltaG0KjMol: -70.5,
    activationEnergyKjMol: 55.2,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-132',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #132)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.2,
    deltaS0JmolK: 1.9,
    deltaG0KjMol: -4.8,
    activationEnergyKjMol: 74.5,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-133',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #133)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -107.2,
    deltaS0JmolK: -188.3,
    deltaG0KjMol: -51.1,
    activationEnergyKjMol: 250,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-134',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #134)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -53.8,
    deltaS0JmolK: 14.5,
    deltaG0KjMol: -58.1,
    activationEnergyKjMol: 106,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-135',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #135)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -92.9,
    deltaS0JmolK: -173.3,
    deltaG0KjMol: -41.2,
    activationEnergyKjMol: 65.2,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-136',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #136)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.5,
    deltaS0JmolK: 1.8,
    deltaG0KjMol: -4,
    activationEnergyKjMol: 62,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-137',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #137)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -90.6,
    deltaS0JmolK: -178.4,
    deltaG0KjMol: -37.4,
    activationEnergyKjMol: 237.5,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-138',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #138)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -69.9,
    deltaS0JmolK: 13.8,
    deltaG0KjMol: -74,
    activationEnergyKjMol: 93.5,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-139',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #139)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -118.8,
    deltaS0JmolK: -165,
    deltaG0KjMol: -69.6,
    activationEnergyKjMol: 52.7,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-140',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #140)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.4,
    deltaS0JmolK: 2.2,
    deltaG0KjMol: -5.1,
    activationEnergyKjMol: 72,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-141',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #141)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: -168.5,
    deltaG0KjMol: -23.7,
    activationEnergyKjMol: 247.5,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-142',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #142)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -57.8,
    deltaS0JmolK: 13.1,
    deltaG0KjMol: -61.7,
    activationEnergyKjMol: 103.5,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-143',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #143)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -99.4,
    deltaS0JmolK: -156.8,
    deltaG0KjMol: -52.7,
    activationEnergyKjMol: 62.7,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-144',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #144)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.7,
    deltaS0JmolK: 2.1,
    deltaG0KjMol: -4.3,
    activationEnergyKjMol: 82,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-145',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #145)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -96.1,
    deltaS0JmolK: -208.1,
    deltaG0KjMol: -34.1,
    activationEnergyKjMol: 235,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-146',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #146)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: 12.3,
    deltaG0KjMol: -77.6,
    activationEnergyKjMol: 91,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-147',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #147)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -125.3,
    deltaS0JmolK: -148.5,
    deltaG0KjMol: -81,
    activationEnergyKjMol: 50.2,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-148',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #148)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3,
    deltaS0JmolK: 2,
    deltaG0KjMol: -3.6,
    activationEnergyKjMol: 69.5,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-149',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #149)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -79.5,
    deltaS0JmolK: -198.2,
    deltaG0KjMol: -20.4,
    activationEnergyKjMol: 245,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-150',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #150)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -61.8,
    deltaS0JmolK: 15.2,
    deltaG0KjMol: -66.3,
    activationEnergyKjMol: 101,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-151',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #151)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -105.8,
    deltaS0JmolK: -140.3,
    deltaG0KjMol: -64,
    activationEnergyKjMol: 60.2,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-152',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #152)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4,
    deltaS0JmolK: 1.9,
    deltaG0KjMol: -4.6,
    activationEnergyKjMol: 79.5,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-153',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #153)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -101.6,
    deltaS0JmolK: -188.3,
    deltaG0KjMol: -45.5,
    activationEnergyKjMol: 255,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-154',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #154)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -78,
    deltaS0JmolK: 14.5,
    deltaG0KjMol: -82.3,
    activationEnergyKjMol: 88.5,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-155',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #155)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -86.4,
    deltaS0JmolK: -173.3,
    deltaG0KjMol: -34.7,
    activationEnergyKjMol: 47.7,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-156',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #156)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.3,
    deltaS0JmolK: 1.8,
    deltaG0KjMol: -3.8,
    activationEnergyKjMol: 67,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-157',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #157)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -85,
    deltaS0JmolK: -178.4,
    deltaG0KjMol: -31.8,
    activationEnergyKjMol: 242.5,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-158',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #158)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -65.9,
    deltaS0JmolK: 13.8,
    deltaG0KjMol: -70,
    activationEnergyKjMol: 98.5,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-159',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #159)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -112.3,
    deltaS0JmolK: -165,
    deltaG0KjMol: -63.1,
    activationEnergyKjMol: 57.7,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-160',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #160)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.2,
    deltaS0JmolK: 2.2,
    deltaG0KjMol: -4.9,
    activationEnergyKjMol: 77,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-161',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #161)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -107.2,
    deltaS0JmolK: -168.5,
    deltaG0KjMol: -57,
    activationEnergyKjMol: 252.5,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-162',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #162)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -53.8,
    deltaS0JmolK: 13.1,
    deltaG0KjMol: -57.7,
    activationEnergyKjMol: 108.5,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-163',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #163)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -92.9,
    deltaS0JmolK: -156.8,
    deltaG0KjMol: -46.2,
    activationEnergyKjMol: 45.2,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-164',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #164)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.5,
    deltaS0JmolK: 2.1,
    deltaG0KjMol: -4.1,
    activationEnergyKjMol: 64.5,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-165',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #165)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -90.6,
    deltaS0JmolK: -208.1,
    deltaG0KjMol: -28.6,
    activationEnergyKjMol: 240,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-166',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #166)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -69.9,
    deltaS0JmolK: 12.3,
    deltaG0KjMol: -73.6,
    activationEnergyKjMol: 96,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-167',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #167)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -118.8,
    deltaS0JmolK: -148.5,
    deltaG0KjMol: -74.5,
    activationEnergyKjMol: 55.2,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-168',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #168)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.4,
    deltaS0JmolK: 2,
    deltaG0KjMol: -5,
    activationEnergyKjMol: 74.5,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-169',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #169)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: -198.2,
    deltaG0KjMol: -14.8,
    activationEnergyKjMol: 250,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-170',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #170)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -57.8,
    deltaS0JmolK: 15.2,
    deltaG0KjMol: -62.3,
    activationEnergyKjMol: 106,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-171',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #171)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -99.4,
    deltaS0JmolK: -140.3,
    deltaG0KjMol: -57.6,
    activationEnergyKjMol: 65.2,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-172',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #172)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.7,
    deltaS0JmolK: 1.9,
    deltaG0KjMol: -4.3,
    activationEnergyKjMol: 62,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-173',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #173)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -96.1,
    deltaS0JmolK: -188.3,
    deltaG0KjMol: -40,
    activationEnergyKjMol: 237.5,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-174',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #174)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: 14.5,
    deltaG0KjMol: -78.2,
    activationEnergyKjMol: 93.5,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-175',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #175)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -125.3,
    deltaS0JmolK: -173.3,
    deltaG0KjMol: -73.6,
    activationEnergyKjMol: 52.7,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-176',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #176)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3,
    deltaS0JmolK: 1.8,
    deltaG0KjMol: -3.5,
    activationEnergyKjMol: 72,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-177',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #177)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -79.5,
    deltaS0JmolK: -178.4,
    deltaG0KjMol: -26.3,
    activationEnergyKjMol: 247.5,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-178',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #178)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -61.8,
    deltaS0JmolK: 13.8,
    deltaG0KjMol: -65.9,
    activationEnergyKjMol: 103.5,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-179',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #179)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -105.8,
    deltaS0JmolK: -165,
    deltaG0KjMol: -56.6,
    activationEnergyKjMol: 62.7,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-180',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #180)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4,
    deltaS0JmolK: 2.2,
    deltaG0KjMol: -4.7,
    activationEnergyKjMol: 82,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-181',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #181)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -101.6,
    deltaS0JmolK: -168.5,
    deltaG0KjMol: -51.4,
    activationEnergyKjMol: 235,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-182',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #182)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -78,
    deltaS0JmolK: 13.1,
    deltaG0KjMol: -81.9,
    activationEnergyKjMol: 91,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-183',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #183)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -86.4,
    deltaS0JmolK: -156.8,
    deltaG0KjMol: -39.7,
    activationEnergyKjMol: 50.2,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-184',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #184)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.3,
    deltaS0JmolK: 2.1,
    deltaG0KjMol: -3.9,
    activationEnergyKjMol: 69.5,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-185',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #185)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -85,
    deltaS0JmolK: -208.1,
    deltaG0KjMol: -23,
    activationEnergyKjMol: 245,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-186',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #186)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -65.9,
    deltaS0JmolK: 12.3,
    deltaG0KjMol: -69.6,
    activationEnergyKjMol: 101,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-187',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #187)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -112.3,
    deltaS0JmolK: -148.5,
    deltaG0KjMol: -68,
    activationEnergyKjMol: 60.2,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-188',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #188)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.2,
    deltaS0JmolK: 2,
    deltaG0KjMol: -4.8,
    activationEnergyKjMol: 79.5,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-189',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #189)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -107.2,
    deltaS0JmolK: -198.2,
    deltaG0KjMol: -48.1,
    activationEnergyKjMol: 255,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-190',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #190)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -53.8,
    deltaS0JmolK: 15.2,
    deltaG0KjMol: -58.3,
    activationEnergyKjMol: 88.5,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-191',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #191)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -92.9,
    deltaS0JmolK: -140.3,
    deltaG0KjMol: -51.1,
    activationEnergyKjMol: 47.7,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-192',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #192)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.5,
    deltaS0JmolK: 1.9,
    deltaG0KjMol: -4.1,
    activationEnergyKjMol: 67,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-193',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #193)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -90.6,
    deltaS0JmolK: -188.3,
    deltaG0KjMol: -34.5,
    activationEnergyKjMol: 242.5,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-194',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #194)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -69.9,
    deltaS0JmolK: 14.5,
    deltaG0KjMol: -74.2,
    activationEnergyKjMol: 98.5,
    equilibriumConstantLogK: 12.8,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-195',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #195)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -118.8,
    deltaS0JmolK: -173.3,
    deltaG0KjMol: -67.1,
    activationEnergyKjMol: 57.7,
    equilibriumConstantLogK: 11.1,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-196',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #196)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -4.4,
    deltaS0JmolK: 1.8,
    deltaG0KjMol: -4.9,
    activationEnergyKjMol: 77,
    equilibriumConstantLogK: 1.8,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-197',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #197)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: -178.4,
    deltaG0KjMol: -20.7,
    activationEnergyKjMol: 252.5,
    equilibriumConstantLogK: 7.4,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-198',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #198)',
    category: 'Thermochemical Combustion',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -57.8,
    deltaS0JmolK: 13.8,
    deltaG0KjMol: -61.9,
    activationEnergyKjMol: 108.5,
    equilibriumConstantLogK: 14.4,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-199',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #199)',
    category: 'Photochemical Radical',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -99.4,
    deltaS0JmolK: -165,
    deltaG0KjMol: -50.2,
    activationEnergyKjMol: 45.2,
    equilibriumConstantLogK: 10.3,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-200',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #200)',
    category: 'Polymerization Kinetic',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3.7,
    deltaS0JmolK: 2.2,
    deltaG0KjMol: -4.4,
    activationEnergyKjMol: 64.5,
    equilibriumConstantLogK: 1,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-201',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #201)',
    category: 'Organic Synthesis',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -96.1,
    deltaS0JmolK: -168.5,
    deltaG0KjMol: -45.9,
    activationEnergyKjMol: 240,
    equilibriumConstantLogK: 6.6,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
  {
    id: 'rxn-202',
    title: 'Bimolecular Nucleophilic Substitution (SN2) of 1-Bromobutane (Reaction Profile #202)',
    category: 'Inorganic Redox',
    subCategory: 'Aliphatic Nucleophilic Substitution',
    balancedEquation: 'CH3(CH2)3Br + OH- -> CH3(CH2)3OH + Br-',
    reactants: [
      { formula: 'C4H9Br', name: '1-Bromobutane', state: 'l', coefficient: 1, molarMassGmol: 137.02, charge: 0 },
      { formula: 'OH-', name: 'Hydroxide Anion', state: 'aq', coefficient: 1, molarMassGmol: 17.008, charge: -1 }
    ],
    products: [
      { formula: 'C4H9OH', name: '1-Butanol', state: 'l', coefficient: 1, molarMassGmol: 74.12, charge: 0 },
      { formula: 'Br-', name: 'Bromide Anion', state: 'aq', coefficient: 1, molarMassGmol: 79.904, charge: -1 }
    ],
    deltaH0KjMol: -73.9,
    deltaS0JmolK: 13.1,
    deltaG0KjMol: -77.8,
    activationEnergyKjMol: 96,
    equilibriumConstantLogK: 13.6,
    rateLawExpression: 'r = k * [C4H9Br] * [OH-]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Aprotic polar DMSO / H2O mixture (70:30)',
    catalyst: 'Phase-transfer catalyst: Tetrabutylammonium bromide',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Aprotic polar DMSO / H2O mixture (70:30).',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 88.5 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Canonical textbook model for concerted backside attack and stereochemical Walden inversion.',
    safetyHazards: [
      'Corrosive alkaline solution',
      'Lachrymatory alkyl halide vapor',
      'Skin irritation'
    ],
    analyticalDetectionMethod: 'Gas chromatography-mass spectrometry (GC-MS) tracking parent ion peak and halide precipitation.'
  },
  {
    id: 'rxn-203',
    title: 'Diels-Alder [4+2] Cycloaddition of Cyclopentadiene with Maleic Anhydride (Reaction Profile #203)',
    category: 'Organometallic Catalysis',
    subCategory: 'Concerted Suprafacial Cycloaddition',
    balancedEquation: 'C5H6 + C4H2O3 -> C9H8O3 (endo-norbornene anhydride)',
    reactants: [
      { formula: 'C5H6', name: 'Cyclopentadiene', state: 'l', coefficient: 1, molarMassGmol: 66.1, charge: 0 },
      { formula: 'C4H2O3', name: 'Maleic Anhydride', state: 's', coefficient: 1, molarMassGmol: 98.06, charge: 0 }
    ],
    products: [
      { formula: 'C9H8O3', name: 'cis-5-Norbornene-endo-2,3-dicarboxylic anhydride', state: 's', coefficient: 1, molarMassGmol: 164.16, charge: 0 }
    ],
    deltaH0KjMol: -125.3,
    deltaS0JmolK: -156.8,
    deltaG0KjMol: -78.6,
    activationEnergyKjMol: 55.2,
    equilibriumConstantLogK: 11.9,
    rateLawExpression: 'r = k * [Diene] * [Dienophile]',
    temperatureK: 348,
    pressureAtm: 1,
    solvent: 'Ethyl Acetate / Toluene',
    catalyst: 'Thermal or Lewis Acid (AlCl3 / BF3 etherate)',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Ethyl Acetate / Toluene.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 45.2 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Key route in pharmaceutical polycyclic core construction with high atom economy and endo-selectivity.',
    safetyHazards: [
      'Maleic anhydride is a severe respiratory sensitizer',
      'Cyclopentadiene readily dimerizes'
    ],
    analyticalDetectionMethod: '1H-NMR vinyl proton signal disappearance at 6.4 ppm and FT-IR anhydride carbonyl shifts.'
  },
  {
    id: 'rxn-204',
    title: 'Fischer-Speier Esterification of Acetic Acid and Ethanol (Reaction Profile #204)',
    category: 'Biochemical Pathway',
    subCategory: 'Nucleophilic Acyl Substitution',
    balancedEquation: 'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
    reactants: [
      { formula: 'CH3COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMassGmol: 60.05, charge: 0 },
      { formula: 'C2H5OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMassGmol: 46.07, charge: 0 }
    ],
    products: [
      { formula: 'CH3COOC2H5', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMassGmol: 88.11, charge: 0 },
      { formula: 'H2O', name: 'Water', state: 'l', coefficient: 1, molarMassGmol: 18.015, charge: 0 }
    ],
    deltaH0KjMol: -3,
    deltaS0JmolK: 2.1,
    deltaG0KjMol: -3.6,
    activationEnergyKjMol: 74.5,
    equilibriumConstantLogK: 2.6,
    rateLawExpression: 'r = k * [CH3COOH] * [C2H5OH] * [H+]',
    temperatureK: 428,
    pressureAtm: 1,
    solvent: 'Neat / Ethanol excess with Dean-Stark azeotropic trap',
    catalyst: 'Concentrated Sulfuric Acid (H2SO4) or p-TsOH',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Neat / Ethanol excess with Dean-Stark azeotropic trap.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 62 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Mass production of non-toxic universal solvent ethyl acetate for paints, lacquers, and decaffeination.',
    safetyHazards: [
      'Corrosive concentrated acid catalyst',
      'Flammable volatile organic solvent vapours'
    ],
    analyticalDetectionMethod: 'Refractive index refractometry and gas chromatography flame ionization detector (GC-FID).'
  },
  {
    id: 'rxn-205',
    title: 'Haber-Bosch Ammonia Synthesis (Reaction Profile #205)',
    category: 'Coordination Complex',
    subCategory: 'Heterogeneous Catalytic Hydrogenation',
    balancedEquation: 'N2(g) + 3H2(g) <=> 2NH3(g)',
    reactants: [
      { formula: 'N2', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMassGmol: 28.014, charge: 0 },
      { formula: 'H2', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMassGmol: 2.016, charge: 0 }
    ],
    products: [
      { formula: 'NH3', name: 'Ammonia', state: 'g', coefficient: 2, molarMassGmol: 17.031, charge: 0 }
    ],
    deltaH0KjMol: -79.5,
    deltaS0JmolK: -208.1,
    deltaG0KjMol: -17.5,
    activationEnergyKjMol: 250,
    equilibriumConstantLogK: 5.8,
    rateLawExpression: 'r = k * P(N2) * P(H2)^1.5 / P(NH3)',
    temperatureK: 673,
    pressureAtm: 200,
    solvent: 'Gas Phase',
    catalyst: 'Wüstite-derived α-Fe with K2O/Al2O3 promoters',
    mechanismSteps: [
      {
        stepNumber: 1,
        description: 'Initial polarization and collision encounter complex formation in Gas Phase.',
        intermediateName: 'Pre-reactive outer-sphere adduct',
        elementaryEquation: 'Reactants <=> [Intermediate complex]‡',
        isRateDeterminingStep: false,
        electronMovementType: 'Dipole alignment and solvent reorganization'
      },
      {
        stepNumber: 2,
        description: 'Rate-limiting transition state passage over activation barrier of 235 kJ/mol.',
        intermediateName: 'Activated transition state complex',
        elementaryEquation: '[Intermediate complex]‡ -> [Transient activated intermediate]',
        isRateDeterminingStep: true,
        electronMovementType: 'Curved arrow orbital reorganization and bond breaking'
      },
      {
        stepNumber: 3,
        description: 'Exothermic product dissociation, solvent cage relaxation, and catalyst regeneration.',
        intermediateName: 'Solvated product cluster',
        elementaryEquation: '[Transient activated intermediate] -> Products + Free catalyst',
        isRateDeterminingStep: false,
        electronMovementType: 'Rapid thermal equilibration'
      }
    ],
    industrialSignificance: 'Feeds global synthetic nitrogen fertilizer supply supporting ~50% of the world population.',
    safetyHazards: [
      'High pressure gas hazard',
      'Anhydrous ammonia vapor toxicity',
      'Combustible hydrogen mixture'
    ],
    analyticalDetectionMethod: 'Non-dispersive infrared (NDIR) ammonia spectrometry and gas chromatography.'
  },
];
