import { ChemicalReaction } from '../types/chemistry';

export const REACTIONS_DATA: ChemicalReaction[] = [
  {
    id: 'blast-furnace',
    title: 'Blast Furnace Hematite Reduction',
    category: 'Redox',
    phaseSystem: 'Gas-Solid Het.',
    description: 'Reduction of Hematite ore (Fe₂O₃) via carbon monoxide synthetic gas stream in high-temperature blast furnaces.',
    rawInput: 'Fe2O3 + 3CO -> 2Fe + 3CO2',
    balancedEquation: 'Fe₂O₃(s) + 3CO(g) ➔ 2Fe(s) + 3CO₂(g)',
    stoichiometryRatio: '1 : 3 ➔ 2 : 3',
    deltaH: -24.8,
    deltaS: 15.3,
    deltaG: -29.4,
    keq: '1.42 × 10⁵',
    conditions: {
      temperature: 1173,
      pressure: 2.5,
      catalyst: 'CO Syngas'
    },
    reactants: [
      { formula: 'Fe₂O₃', name: 'Iron(III) Oxide', state: 's', coefficient: 1, molarMass: 159.69 },
      { formula: 'CO', name: 'Carbon Monoxide', state: 'g', coefficient: 3, molarMass: 28.01 }
    ],
    products: [
      { formula: 'Fe', name: 'Iron Metal', state: 's', coefficient: 2, molarMass: 55.85 },
      { formula: 'CO₂', name: 'Carbon Dioxide', state: 'g', coefficient: 3, molarMass: 44.01 }
    ],
    atomBalance: [
      { element: 'Fe', reactantCount: 2, productCount: 2, balanced: true },
      { element: 'C', reactantCount: 3, productCount: 3, balanced: true },
      { element: 'O', reactantCount: 6, productCount: 6, balanced: true }
    ]
  },
  {
    id: 'haber-bosch',
    title: 'Haber-Bosch Ammonia Synthesis',
    category: 'Synthesis',
    phaseSystem: 'Gas Phase Homogeneous',
    description: 'Industrial fixation of atmospheric nitrogen and hydrogen gas over an iron-potassium oxide catalyst at high pressure.',
    rawInput: 'N2 + 3H2 -> 2NH3',
    balancedEquation: 'N₂(g) + 3H₂(g) ⇄ 2NH₃(g)',
    stoichiometryRatio: '1 : 3 ➔ 2',
    deltaH: -92.4,
    deltaS: -198.2,
    deltaG: -33.0,
    keq: '6.8 × 10⁵',
    conditions: {
      temperature: 723,
      pressure: 200,
      catalyst: 'α-Fe / K₂O / Al₂O₃'
    },
    reactants: [
      { formula: 'N₂', name: 'Dinitrogen', state: 'g', coefficient: 1, molarMass: 28.02 },
      { formula: 'H₂', name: 'Dihydrogen', state: 'g', coefficient: 3, molarMass: 2.02 }
    ],
    products: [
      { formula: 'NH₃', name: 'Ammonia', state: 'g', coefficient: 2, molarMass: 17.03 }
    ],
    atomBalance: [
      { element: 'N', reactantCount: 2, productCount: 2, balanced: true },
      { element: 'H', reactantCount: 6, productCount: 6, balanced: true }
    ]
  },
  {
    id: 'methane-combustion',
    title: 'Methane Complete Combustion',
    category: 'Combustion',
    phaseSystem: 'Gas Phase Exothermic',
    description: 'Oxidation of natural gas methane in excess oxygen yielding carbon dioxide, water vapor, and intense heat.',
    rawInput: 'CH4 + 2O2 -> CO2 + 2H2O',
    balancedEquation: 'CH₄(g) + 2O₂(g) ➔ CO₂(g) + 2H₂O(g)',
    stoichiometryRatio: '1 : 2 ➔ 1 : 2',
    deltaH: -802.3,
    deltaS: -5.2,
    deltaG: -800.7,
    keq: '1.2 × 10¹⁴⁰',
    conditions: {
      temperature: 298,
      pressure: 1.0,
      catalyst: 'Spark Ignition'
    },
    reactants: [
      { formula: 'CH₄', name: 'Methane', state: 'g', coefficient: 1, molarMass: 16.04 },
      { formula: 'O₂', name: 'Dioxygen', state: 'g', coefficient: 2, molarMass: 32.00 }
    ],
    products: [
      { formula: 'CO₂', name: 'Carbon Dioxide', state: 'g', coefficient: 1, molarMass: 44.01 },
      { formula: 'H₂O', name: 'Water Vapor', state: 'g', coefficient: 2, molarMass: 18.02 }
    ],
    atomBalance: [
      { element: 'C', reactantCount: 1, productCount: 1, balanced: true },
      { element: 'H', reactantCount: 4, productCount: 4, balanced: true },
      { element: 'O', reactantCount: 4, productCount: 4, balanced: true }
    ]
  },
  {
    id: 'esterification',
    title: 'Fischer Esterification of Ethyl Acetate',
    category: 'Esterification',
    phaseSystem: 'Liquid Phase Organic',
    description: 'Acid-catalyzed condensation between glacial acetic acid and absolute ethanol producing ethyl acetate and water.',
    rawInput: 'CH3COOH + C2H5OH -> CH3COOC2H5 + H2O',
    balancedEquation: 'CH₃COOH(l) + C₂H₅OH(l) ⇄ CH₃COOC₂H₅(l) + H₂O(l)',
    stoichiometryRatio: '1 : 1 ➔ 1 : 1',
    deltaH: -3.8,
    deltaS: 12.1,
    deltaG: -7.4,
    keq: '4.0',
    conditions: {
      temperature: 343,
      pressure: 1.0,
      catalyst: 'conc. H₂SO₄'
    },
    reactants: [
      { formula: 'CH₃COOH', name: 'Acetic Acid', state: 'l', coefficient: 1, molarMass: 60.05 },
      { formula: 'C₂H₅OH', name: 'Ethanol', state: 'l', coefficient: 1, molarMass: 46.07 }
    ],
    products: [
      { formula: 'CH₃COOC₂H₅', name: 'Ethyl Acetate', state: 'l', coefficient: 1, molarMass: 88.11 },
      { formula: 'H₂O', name: 'Water', state: 'l', coefficient: 1, molarMass: 18.02 }
    ],
    atomBalance: [
      { element: 'C', reactantCount: 4, productCount: 4, balanced: true },
      { element: 'H', reactantCount: 10, productCount: 10, balanced: true },
      { element: 'O', reactantCount: 3, productCount: 3, balanced: true }
    ]
  },
  {
    id: 'thermite',
    title: 'Aluminothermic Welding (Thermite)',
    category: 'Redox',
    phaseSystem: 'Solid-Liquid Pyrotechnic',
    description: 'Violent pyrotechnic redox reaction where aluminium powder reduces iron(III) oxide generating molten liquid iron above 2500°C.',
    rawInput: 'Fe2O3 + 2Al -> Al2O3 + 2Fe',
    balancedEquation: 'Fe₂O₃(s) + 2Al(s) ➔ Al₂O₃(s) + 2Fe(l)',
    stoichiometryRatio: '1 : 2 ➔ 1 : 2',
    deltaH: -851.5,
    deltaS: -38.4,
    deltaG: -840.1,
    keq: '1.8 × 10¹⁴⁷',
    conditions: {
      temperature: 2773,
      pressure: 1.0,
      catalyst: 'Magnesium Ribbon Fuse'
    },
    reactants: [
      { formula: 'Fe₂O₃', name: 'Iron(III) Oxide', state: 's', coefficient: 1, molarMass: 159.69 },
      { formula: 'Al', name: 'Aluminium Powder', state: 's', coefficient: 2, molarMass: 26.98 }
    ],
    products: [
      { formula: 'Al₂O₃', name: 'Aluminium Oxide', state: 's', coefficient: 1, molarMass: 101.96 },
      { formula: 'Fe', name: 'Molten Iron', state: 'l', coefficient: 2, molarMass: 55.85 }
    ],
    atomBalance: [
      { element: 'Fe', reactantCount: 2, productCount: 2, balanced: true },
      { element: 'Al', reactantCount: 2, productCount: 2, balanced: true },
      { element: 'O', reactantCount: 3, productCount: 3, balanced: true }
    ]
  }
];
