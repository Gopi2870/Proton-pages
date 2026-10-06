import { StudentProgressRecord, TeacherPortalMetrics } from '../types/teacher';

export const TEACHER_PORTAL_METRICS: TeacherPortalMetrics = {
  enrolledStudents: 86,
  activeStudentsToday: 84,
  averageMastery: 79.4,
  percentileRank: 'Top 12% National ACS Benchmark',
  simulatedLabHours: 342.5,
  topLabModules: ['Acid-Base Titration Rig #2', 'Reaction Balancer & Stoichiometry', 'Grignard Stereocenter Engine'],
  interventionQueueCount: 7
};

export const STUDENT_ROSTER_DATA: StudentProgressRecord[] = [
  {
    id: 'stu-1',
    name: 'Elena Rostova',
    email: 'e.rostova@university.edu',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChKSj7fI-Bz8bA3XtvzyDasZouiZIX9BB8tuEbNQqkeh_r9cdDLNJ_VdS2lyvEcOeHn0gjfbq0J6zOzwsS8VDsUBu43BD1OU_MOJgbREb-VtoIL12bA_2sW88s-SZRl9bgOoFdC2EMQqanaxUSYL6Qe_XnoIDOvgtHTJrY1aQiglNAkyx7xZm11ApBLOpNZNUf01kvQvut8M5_Bw-7GiRpdOc8WaIK1rPP1EhLN92UIe4AhamROij1',
    course: 'CHEM 204: Organic Foundations',
    masteryScore: 94.2,
    labHours: 48.5,
    lastActive: '12 min ago',
    status: 'Proficient',
    weakTopics: ['None (Honor Roll)']
  },
  {
    id: 'stu-2',
    name: 'Marcus Vance',
    email: 'm.vance@university.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    course: 'CHEM 204: Organic Foundations',
    masteryScore: 54.8,
    labHours: 12.0,
    lastActive: '4 days ago',
    status: 'Intervention Required',
    weakTopics: ['Walden Inversion Stereochemistry', 'Acid-Base Titration Endpoints']
  },
  {
    id: 'stu-3',
    name: 'Aria Takahashi',
    email: 'a.takahashi@university.edu',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    course: 'CHEM 204: Organic Foundations',
    masteryScore: 88.5,
    labHours: 36.2,
    lastActive: '2 hrs ago',
    status: 'Proficient',
    weakTopics: ['Newman Anti vs Gauche Energies']
  },
  {
    id: 'stu-4',
    name: 'David Miller',
    email: 'd.miller@university.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    course: 'CHEM 204: Organic Foundations',
    masteryScore: 61.3,
    labHours: 18.5,
    lastActive: 'Yesterday',
    status: 'Review Needed',
    weakTopics: ['Gibbs Free Energy Calculations', 'Matrix Balancing']
  },
  {
    id: 'stu-5',
    name: 'Sophia Williams',
    email: 's.williams@university.edu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    course: 'CHEM 204: Organic Foundations',
    masteryScore: 78.4,
    labHours: 29.8,
    lastActive: '3 hrs ago',
    status: 'On Track',
    weakTopics: ['Polarimetry Optical Rotation']
  },
  {
    id: 'stu-6',
    name: 'Julian Thorne',
    email: 'j.thorne@university.edu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    course: 'CHEM 204: Organic Foundations',
    masteryScore: 91.0,
    labHours: 42.1,
    lastActive: '5 hrs ago',
    status: 'Proficient',
    weakTopics: ['None']
  }
];
