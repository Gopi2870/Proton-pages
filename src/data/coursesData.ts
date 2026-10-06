import { Course } from '../types/learning';

export const COURSES_DATA: Course[] = [
  {
    id: 'chem-204',
    code: 'CHEM 204',
    title: 'Organic Chemistry Foundations',
    instructor: 'Prof. Elena Alvarez',
    institution: 'MIT Department of Chemistry',
    progressPercent: 68,
    completedLessons: 12,
    totalLessons: 18,
    activeModuleId: 'mod-3',
    activeLessonId: 'les-3-4',
    modules: [
      {
        id: 'mod-1',
        title: 'Molecular Structure & Hybridization',
        completedCount: 3,
        totalCount: 3,
        lessons: [
          { id: 'les-1-1', title: '1.1 Atomic Orbitals & Valence Bond Theory', duration: '28 min', completed: true },
          { id: 'les-1-2', title: '1.2 sp³, sp², and sp Hybridization in Hydrocarbons', duration: '35 min', completed: true },
          { id: 'les-1-3', title: '1.3 Molecular Orbital Theory & Resonance Forms', duration: '42 min', completed: true },
        ]
      },
      {
        id: 'mod-2',
        title: 'Newman Projections & Conformations',
        completedCount: 4,
        totalCount: 4,
        lessons: [
          { id: 'les-2-1', title: '2.1 Ethane & Propane Torsional Strain', duration: '22 min', completed: true },
          { id: 'les-2-2', title: '2.2 Butane Anti vs Gauche Steric Interactions', duration: '34 min', completed: true },
          { id: 'les-2-3', title: '2.3 Cyclohexane Chair-Chair Inversion Dynamics', duration: '45 min', completed: true },
          { id: 'les-2-4', title: '2.4 1,3-Diaxial Repulsions & A-values', duration: '30 min', completed: true },
        ]
      },
      {
        id: 'mod-3',
        title: 'Functional Groups & Stereochemistry',
        completedCount: 3,
        totalCount: 7,
        lessons: [
          { id: 'les-3-1', title: '3.1 Constitutional Isomers vs Stereoisomers', duration: '25 min', completed: true },
          { id: 'les-3-2', title: '3.2 Chiral Centers & Planes of Symmetry', duration: '31 min', completed: true },
          { id: 'les-3-3', title: '3.3 Cahn-Ingold-Prelog (R/S) Priority Rules', duration: '38 min', completed: true },
          { id: 'les-3-4', title: '3.4 Chirality & Optical Activity', duration: '40 min', completed: false, active: true },
          { id: 'les-3-5', title: '3.5 Enantiomeric Excess & Polarimetry', duration: '32 min', completed: false },
          { id: 'les-3-6', title: '3.6 Diastereomers and Meso Compounds', duration: '29 min', completed: false },
          { id: 'les-3-7', title: '3.7 Fischer Projections & Erythro/Threo Nomenclature', duration: '36 min', completed: false },
        ]
      },
      {
        id: 'mod-4',
        title: 'Nucleophilic Substitution & Elimination',
        completedCount: 2,
        totalCount: 4,
        lessons: [
          { id: 'les-4-1', title: '4.1 SN2 Mechanism, Kinetics & Walden Inversion', duration: '33 min', completed: true },
          { id: 'les-4-2', title: '4.2 SN1 Kinetics, Carbocation Stability & Racemization', duration: '41 min', completed: true },
          { id: 'les-4-3', title: '4.3 E2 Regioselectivity (Zaitsev vs Hofmann)', duration: '36 min', completed: false },
          { id: 'les-4-4', title: '4.4 Solvent Effects: Polar Protic vs Aprotic', duration: '30 min', completed: false },
        ]
      }
    ]
  }
];
