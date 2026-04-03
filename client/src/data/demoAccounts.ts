import type { ParentAccount } from '../types/student.types';

// ── Demo Parent Accounts ───────────────────────────────────────────────────
// Account 1: 1 child
// Account 2: 2 children

export const demoAccounts: ParentAccount[] = [
  // ── Parent 1: One Child ─────────────────────────────────────────────────
  {
    mobile: '9876543210',
    password: 'demo123',
    parentName: 'Mr. R. Murugan',
    students: [
      {
        id: 'S001',
        name: 'R. Kaviya',
        class: '10th Standard',
        section: 'A',
        rollNo: '2025-10A-012',
        dob: '12 April 2010',
        photo: null,
        results: [
          {
            examName: 'Quarterly Examination',
            year: '2025',
            percentage: 88.2,
            rank: 3,
            marks: [
              { subject: 'Tamil', theory: 87, practical: null, total: 87, grade: 'A+' },
              { subject: 'English', theory: 82, practical: null, total: 82, grade: 'A' },
              { subject: 'Mathematics', theory: 94, practical: null, total: 94, grade: 'A+' },
              { subject: 'Science', theory: 88, practical: 15, total: 88, grade: 'A+' },
              { subject: 'Social Science', theory: 80, practical: null, total: 80, grade: 'A' },
            ],
          },
          {
            examName: 'Half-Yearly Examination',
            year: '2025',
            percentage: 91.6,
            rank: 2,
            marks: [
              { subject: 'Tamil', theory: 90, practical: null, total: 90, grade: 'A+' },
              { subject: 'English', theory: 88, practical: null, total: 88, grade: 'A+' },
              { subject: 'Mathematics', theory: 97, practical: null, total: 97, grade: 'A+' },
              { subject: 'Science', theory: 92, practical: 18, total: 92, grade: 'A+' },
              { subject: 'Social Science', theory: 91, practical: null, total: 91, grade: 'A+' },
            ],
          },
        ],
        fees: [
          { term: 'Term 1 – April 2025', amount: 4500, paid: true, paidOn: '05 Apr 2025' },
          { term: 'Term 2 – July 2025', amount: 4500, paid: true, paidOn: '03 Jul 2025' },
          { term: 'Term 3 – October 2025', amount: 4500, paid: false, paidOn: null },
        ],
      },
    ],
  },

  // ── Parent 2: Two Children ───────────────────────────────────────────────
  {
    mobile: '9123456789',
    password: 'demo456',
    parentName: 'Mrs. S. Lakshmi',
    students: [
      {
        id: 'S002',
        name: 'S. Arun Kumar',
        class: '12th Standard',
        section: 'B',
        rollNo: '2025-12B-007',
        dob: '22 August 2007',
        photo: null,
        results: [
          {
            examName: 'Quarterly Examination',
            year: '2025',
            percentage: 78.4,
            rank: 8,
            marks: [
              { subject: 'Tamil', theory: 74, practical: null, total: 74, grade: 'B+' },
              { subject: 'English', theory: 79, practical: null, total: 79, grade: 'A' },
              { subject: 'Physics', theory: 76, practical: 18, total: 76, grade: 'B+' },
              { subject: 'Chemistry', theory: 80, practical: 19, total: 80, grade: 'A' },
              { subject: 'Biology', theory: 83, practical: 20, total: 83, grade: 'A' },
            ],
          },
          {
            examName: 'Half-Yearly Examination',
            year: '2025',
            percentage: 82.0,
            rank: 6,
            marks: [
              { subject: 'Tamil', theory: 78, practical: null, total: 78, grade: 'A' },
              { subject: 'English', theory: 83, practical: null, total: 83, grade: 'A' },
              { subject: 'Physics', theory: 80, practical: 19, total: 80, grade: 'A' },
              { subject: 'Chemistry', theory: 85, practical: 20, total: 85, grade: 'A' },
              { subject: 'Biology', theory: 84, practical: 20, total: 84, grade: 'A' },
            ],
          },
        ],
        fees: [
          { term: 'Term 1 – April 2025', amount: 5500, paid: true, paidOn: '02 Apr 2025' },
          { term: 'Term 2 – July 2025', amount: 5500, paid: true, paidOn: '10 Jul 2025' },
          { term: 'Term 3 – October 2025', amount: 5500, paid: true, paidOn: '01 Oct 2025' },
        ],
      },
      {
        id: 'S003',
        name: 'S. Priya',
        class: '7th Standard',
        section: 'A',
        rollNo: '2025-07A-021',
        dob: '05 January 2013',
        photo: null,
        results: [
          {
            examName: 'Quarterly Examination',
            year: '2025',
            percentage: 95.0,
            rank: 1,
            marks: [
              { subject: 'Tamil', theory: 96, practical: null, total: 96, grade: 'A+' },
              { subject: 'English', theory: 94, practical: null, total: 94, grade: 'A+' },
              { subject: 'Mathematics', theory: 98, practical: null, total: 98, grade: 'A+' },
              { subject: 'Science', theory: 95, practical: null, total: 95, grade: 'A+' },
              { subject: 'Social Science', theory: 92, practical: null, total: 92, grade: 'A+' },
            ],
          },
        ],
        fees: [
          { term: 'Term 1 – April 2025', amount: 3500, paid: true, paidOn: '02 Apr 2025' },
          { term: 'Term 2 – July 2025', amount: 3500, paid: true, paidOn: '10 Jul 2025' },
          { term: 'Term 3 – October 2025', amount: 3500, paid: false, paidOn: null },
        ],
      },
    ],
  },
];
