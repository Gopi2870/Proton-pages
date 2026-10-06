import { LabReagent } from '../types/chemistry';

export const LAB_REAGENTS: LabReagent[] = [
  {
    id: 'naoh',
    name: 'Sodium Hydroxide',
    formula: 'NaOH (aq)',
    concentration: 0.1,
    unit: 'M',
    ph: 13.0,
    color: '#0891b2',
    colorName: 'Clear / Aqueous',
    category: 'Reagents',
    volumeAvailable: 50.0,
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'W' },
    details: 'Primary titrant standardized against potassium hydrogen phthalate (KHP).'
  },
  {
    id: 'hcl',
    name: 'Hydrochloric Acid',
    formula: 'HCl (aq)',
    concentration: 0.1,
    unit: 'M',
    ph: 1.0,
    color: '#ef4444',
    colorName: 'Clear / Pungent',
    category: 'Reagents',
    volumeAvailable: 100.0,
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'COR' },
    details: 'Monoprotic strong mineral acid used as analyte in acid-base volumetric titrations.'
  },
  {
    id: 'phenolphthalein',
    name: 'Phenolphthalein Indicator',
    formula: 'C₂₀H₁₄O₄',
    concentration: 0.001,
    unit: 'M',
    ph: 7.0,
    color: '#ec4899',
    colorName: 'Pale Pink in Base (pH > 8.2)',
    category: 'Reagents',
    volumeAvailable: 15.0,
    nfpa: { health: 1, flammability: 2, instability: 0 },
    details: 'Triarylmethane dye acid-base indicator with transition range between pH 8.2 and 10.0.'
  },
  {
    id: 'di-water',
    name: 'Deionized Distilled H₂O',
    formula: 'H₂O (l)',
    concentration: 55.5,
    unit: 'M',
    ph: 7.0,
    color: '#3b82f6',
    colorName: 'Crystal Clear',
    category: 'Reagents',
    volumeAvailable: 500.0,
    nfpa: { health: 0, flammability: 0, instability: 0 },
    details: 'Ultra-pure analytical grade solvent with electrical conductivity < 0.055 µS/cm.'
  },
  {
    id: 'cuso4',
    name: 'Copper(II) Sulfate',
    formula: 'CuSO₄ (aq)',
    concentration: 0.5,
    unit: 'M',
    ph: 4.5,
    color: '#0284c7',
    colorName: 'Vibrant Azure Blue',
    category: 'Reagents',
    volumeAvailable: 250.0,
    nfpa: { health: 2, flammability: 0, instability: 0 },
    details: 'Inorganic salt displaying deep azure octahedral hexaaquacopper(II) complex ions.'
  },
  {
    id: 'ch3cooh',
    name: 'Acetic Acid',
    formula: 'CH₃COOH (aq)',
    concentration: 0.1,
    unit: 'M',
    ph: 2.88,
    color: '#f59e0b',
    colorName: 'Clear / Vinegary',
    category: 'Reagents',
    volumeAvailable: 120.0,
    nfpa: { health: 3, flammability: 2, instability: 1 },
    details: 'Weak organic carboxylic acid with pKa = 4.76, ideal for buffer equilibrium studies.'
  }
];

export const LAB_EQUIPMENT_ITEMS = [
  { id: 'eq-burette', name: 'Class-A 50mL Burette', category: 'Glass', status: 'Mounted', tolerance: '±0.05 mL' },
  { id: 'eq-flask', name: '250mL Erlenmeyer Flask', category: 'Glass', status: 'On Stage', tolerance: '±5%' },
  { id: 'eq-pipette', name: '25.00mL Volumetric Pipette', category: 'Glass', status: 'Cleaned', tolerance: '±0.03 mL' },
  { id: 'eq-ph-meter', name: 'Digital Glass Combination pH Electrode', category: 'Probes', status: 'Calibrated', tolerance: '±0.01 pH' },
  { id: 'eq-cond-meter', name: 'Conductivity Dip Cell', category: 'Probes', status: 'Standby', tolerance: '±0.1 µS' },
  { id: 'eq-thermocouple', name: 'PT100 Temperature Probe', category: 'Probes', status: 'Logging', tolerance: '±0.05 °C' },
  { id: 'eq-stirrer', name: 'Magnetic Micro-Stirrer Platform', category: 'Heat/Stir', status: 'Ready', speedRange: '100-1500 RPM' },
  { id: 'eq-mantle', name: 'Heating Mantle & PID Controller', category: 'Heat/Stir', status: 'Cool', tempRange: '20-300 °C' },
];
