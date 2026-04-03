/**
 * adminStore.ts
 * Centralised localStorage data store for the Admin Portal.
 * All public-facing pages (Achievements, Gallery, Parent Portal) read from here.
 */

// Re-export student types so admins pages only need to import from adminStore
export type { Student, SubjectMark, ExamResult, FeeRecord } from '../types/student.types';
import type { Student } from '../types/student.types';

// ── Types ────────────────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  title: string;
  category: 'academic' | 'sports' | 'cultural' | 'faculty';
  description: string;
  year: string;
  studentName?: string;
  award?: string;
  photos?: string[];   // optional base64 or URL images
}

export interface Leader {
  id: string;
  name: string;
  role: 'SPL' | 'ASPL';
  class: string;          // e.g. "12th Standard"
  photo: string | null;   // base64 data URL or null
  quote: string;          // inspiring words
  year: string;           // academic year e.g. "2024-25"
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'sports' | 'cultural' | 'academic' | 'general';
  url: string;          // URL or base64 data URL
  uploadedAt: string;
  pdfUrl?: string;
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  parentName: string;
  contact: string;
  classApplying: string;
  address: string;
  submittedAt: string;
  read: boolean;
}

// ── Storage Keys ─────────────────────────────────────────────────────────────
const KEYS = {
  achievements: 'arg_admin_achievements',
  gallery: 'arg_admin_gallery',
  students: 'arg_admin_students',
  applications: 'arg_admin_applications',
  leaders: 'arg_admin_leaders',
};

// ── Default Seed Data ─────────────────────────────────────────────────────────

const defaultLeaders: Leader[] = [
  {
    id: 'l1',
    name: 'K. Aravind Kumar',
    role: 'SPL',
    class: '12th Standard – Science',
    photo: null,
    quote: 'Leadership is not about being in charge. It is about taking care of those in your charge. I strive every day to represent our school with pride, discipline, and humility.',
    year: '2024-25',
  },
  {
    id: 'l2',
    name: 'S. Deepika',
    role: 'ASPL',
    class: '11th Standard – Science',
    photo: null,
    quote: 'A true leader sees potential in every student. My goal is to bridge the gap between students and school, ensuring every voice is heard and valued.',
    year: '2024-25',
  },
];

const defaultAchievements: Achievement[] = [
  { id: 'a1', category: 'academic', year: '2024', title: '100% Pass in 10th Board', description: 'All students cleared the Tamil Nadu 10th Board exam with distinction. The school maintained its 22-year unbroken record of 100% pass percentage.', award: 'School Record' },
  { id: 'a2', category: 'academic', year: '2024', title: '100% Pass in 12th Board', description: 'All Higher Secondary students cleared the 12th Board examination. Rank holders received fee concessions up to 100%.', award: 'School Record' },
  { id: 'a3', category: 'sports', year: '2024', title: 'National Taekwondo Championship', description: 'ARG Academy students secured state-level positions, qualifying for nationals under NSNIS-certified coaches.', studentName: 'Multiple Students', award: 'State Level' },
  { id: 'a4', category: 'sports', year: '2023', title: 'Kho-Kho District Champions', description: 'The school Kho-Kho team won the district championship coached by an NSNIS-certified coach, qualifying for state-level competition.', studentName: 'School Team', award: 'District Champions' },
  { id: 'a5', category: 'sports', year: '2024', title: 'Netball State Representation', description: 'Students represented Tamil Nadu in the national Netball championship, showcasing exceptional talent and team coordination.', studentName: 'School Team', award: 'State Representation' },
  { id: 'a6', category: 'cultural', year: '2023', title: 'Hindi Prachar Sabha Exam Excellence', description: 'Multiple students cleared the Hindi Prachar Sabha examinations with high marks, demonstrating language proficiency.', award: 'Hindi Prachar Sabha' },
  { id: 'a7', category: 'faculty', year: '2024', title: 'Best Teacher Award', description: 'Our Physical Education teacher, a national-level athlete, was recognised for outstanding contribution to sports training.', award: 'District Best Teacher' },
];

const defaultGallery: GalleryImage[] = [
  { id: 'g1', title: 'Annual Sports Day', category: 'sports', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500', uploadedAt: '2025-01-10' },
  { id: 'g2', title: 'Taekwondo Training', category: 'sports', url: 'https://images.unsplash.com/photo-1638397249761-1568e6bd0f41?w=500', uploadedAt: '2025-01-15' },
  { id: 'g3', title: 'Science Lab Session', category: 'academic', url: 'https://images.unsplash.com/photo-1532094349884-543559877f4c?w=500', uploadedAt: '2025-02-01' },
  { id: 'g4', title: 'Cultural Programme', category: 'cultural', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500', uploadedAt: '2025-02-14' },
  { id: 'g5', title: 'Graduation Day', category: 'general', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500', uploadedAt: '2025-03-01' },
  { id: 'g6', title: 'Yoga Session', category: 'sports', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500', uploadedAt: '2025-03-05' },
];

const defaultStudents: Student[] = [
  {
    id: 'S001', name: 'R. Kaviya', class: '10th Standard', section: 'A',
    rollNo: '2025-10A-012', dob: '12 April 2010', photo: null,
    results: [
      { examName: 'Quarterly Examination', year: '2025', percentage: 88.2, rank: 3,
        marks: [
          { subject: 'Tamil', theory: 87, practical: null, total: 87, grade: 'A+' },
          { subject: 'English', theory: 82, practical: null, total: 82, grade: 'A' },
          { subject: 'Mathematics', theory: 94, practical: null, total: 94, grade: 'A+' },
          { subject: 'Science', theory: 88, practical: 15, total: 88, grade: 'A+' },
          { subject: 'Social Science', theory: 80, practical: null, total: 80, grade: 'A' },
        ]},
    ],
    fees: [
      { term: 'Term 1 – April 2025', amount: 4500, paid: true, paidOn: '05 Apr 2025' },
      { term: 'Term 2 – July 2025', amount: 4500, paid: true, paidOn: '03 Jul 2025' },
      { term: 'Term 3 – October 2025', amount: 4500, paid: false, paidOn: null },
    ],
  },
  {
    id: 'S002', name: 'S. Arun Kumar', class: '12th Standard', section: 'B',
    rollNo: '2025-12B-007', dob: '22 August 2007', photo: null,
    results: [
      { examName: 'Quarterly Examination', year: '2025', percentage: 78.4, rank: 8,
        marks: [
          { subject: 'Tamil', theory: 74, practical: null, total: 74, grade: 'B+' },
          { subject: 'English', theory: 79, practical: null, total: 79, grade: 'A' },
          { subject: 'Physics', theory: 76, practical: 18, total: 76, grade: 'B+' },
          { subject: 'Chemistry', theory: 80, practical: 19, total: 80, grade: 'A' },
          { subject: 'Biology', theory: 83, practical: 20, total: 83, grade: 'A' },
        ]},
    ],
    fees: [
      { term: 'Term 1 – April 2025', amount: 5500, paid: true, paidOn: '02 Apr 2025' },
      { term: 'Term 2 – July 2025', amount: 5500, paid: true, paidOn: '10 Jul 2025' },
      { term: 'Term 3 – October 2025', amount: 5500, paid: true, paidOn: '01 Oct 2025' },
    ],
  },
  {
    id: 'S003', name: 'S. Priya', class: '7th Standard', section: 'A',
    rollNo: '2025-07A-021', dob: '05 January 2013', photo: null,
    results: [
      { examName: 'Quarterly Examination', year: '2025', percentage: 95.0, rank: 1,
        marks: [
          { subject: 'Tamil', theory: 96, practical: null, total: 96, grade: 'A+' },
          { subject: 'English', theory: 94, practical: null, total: 94, grade: 'A+' },
          { subject: 'Mathematics', theory: 98, practical: null, total: 98, grade: 'A+' },
          { subject: 'Science', theory: 95, practical: null, total: 95, grade: 'A+' },
          { subject: 'Social Science', theory: 92, practical: null, total: 92, grade: 'A+' },
        ]},
    ],
    fees: [
      { term: 'Term 1 – April 2025', amount: 3500, paid: true, paidOn: '02 Apr 2025' },
      { term: 'Term 2 – July 2025', amount: 3500, paid: true, paidOn: '10 Jul 2025' },
      { term: 'Term 3 – October 2025', amount: 3500, paid: false, paidOn: null },
    ],
  },
];

// ── Seed once ─────────────────────────────────────────────────────────────────
const seed = () => {
  if (!localStorage.getItem(KEYS.achievements)) {
    localStorage.setItem(KEYS.achievements, JSON.stringify(defaultAchievements));
  }
  if (!localStorage.getItem(KEYS.gallery)) {
    localStorage.setItem(KEYS.gallery, JSON.stringify(defaultGallery));
  }
  if (!localStorage.getItem(KEYS.students)) {
    localStorage.setItem(KEYS.students, JSON.stringify(defaultStudents));
  }
  if (!localStorage.getItem(KEYS.leaders)) {
    localStorage.setItem(KEYS.leaders, JSON.stringify(defaultLeaders));
  }
};

// ── Achievements ──────────────────────────────────────────────────────────────
export const getAchievements = (): Achievement[] => {
  seed();
  return JSON.parse(localStorage.getItem(KEYS.achievements) || '[]');
};
export const saveAchievements = (data: Achievement[]) =>
  localStorage.setItem(KEYS.achievements, JSON.stringify(data));

// ── Leaders (SPL / ASPL) ──────────────────────────────────────────────────────
export const getLeaders = (): Leader[] => {
  seed();
  return JSON.parse(localStorage.getItem(KEYS.leaders) || '[]');
};
export const saveLeaders = (data: Leader[]) =>
  localStorage.setItem(KEYS.leaders, JSON.stringify(data));

// ── Gallery ───────────────────────────────────────────────────────────────────
export const getGallery = (): GalleryImage[] => {
  seed();
  return JSON.parse(localStorage.getItem(KEYS.gallery) || '[]');
};
export const saveGallery = (data: GalleryImage[]) =>
  localStorage.setItem(KEYS.gallery, JSON.stringify(data));

// ── Students (marks + fees) ───────────────────────────────────────────────────
export const getStudents = (): Student[] => {
  seed();
  return JSON.parse(localStorage.getItem(KEYS.students) || '[]');
};
export const saveStudents = (data: Student[]) =>
  localStorage.setItem(KEYS.students, JSON.stringify(data));

// ── Admission Applications ────────────────────────────────────────────────────
export const getApplications = (): AdmissionApplication[] =>
  JSON.parse(localStorage.getItem(KEYS.applications) || '[]');

export const saveApplications = (data: AdmissionApplication[]) =>
  localStorage.setItem(KEYS.applications, JSON.stringify(data));

export const addApplication = (app: Omit<AdmissionApplication, 'id' | 'submittedAt' | 'read'>): void => {
  const apps = getApplications();
  const newApp: AdmissionApplication = {
    ...app,
    id: generateId(),
    submittedAt: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    read: false,
  };
  saveApplications([newApp, ...apps]);
};

export const getUnreadCount = (): number =>
  getApplications().filter(a => !a.read).length;

export const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
