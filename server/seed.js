import bcrypt from 'bcryptjs';
import Student from './src/models/Student.js';
import Parent from './src/models/Parent.js';
import Achievement from './src/models/Achievement.js';
import Gallery from './src/models/Gallery.js';
import Leadership from './src/models/Leadership.js';

/**
 * Seeds the database with demo data on first run.
 * Skips if data already exists.
 */
const seedDatabase = async () => {
  const studentCount = await Student.countDocuments();
  if (studentCount > 0) {
    console.log('📦 Database already seeded — skipping');
    return;
  }

  console.log('🌱 Seeding demo data …');

  // ── Students ────────────────────────────────────────────────────────────────
  const studentsData = [
    {
      studentId: 'S001', name: 'R. Kaviya', class: '10th Standard', section: 'A',
      rollNo: '2025-10A-012', dob: '12 April 2010', photo: null,
      results: [
        {
          examName: 'Quarterly Examination', year: '2025', percentage: 88.2, rank: 3,
          marks: [
            { subject: 'Tamil', theory: 87, practical: null, total: 87, grade: 'A+' },
            { subject: 'English', theory: 82, practical: null, total: 82, grade: 'A' },
            { subject: 'Mathematics', theory: 94, practical: null, total: 94, grade: 'A+' },
            { subject: 'Science', theory: 88, practical: 15, total: 88, grade: 'A+' },
            { subject: 'Social Science', theory: 80, practical: null, total: 80, grade: 'A' },
          ],
        },
        {
          examName: 'Half-Yearly Examination', year: '2025', percentage: 91.6, rank: 2,
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
    {
      studentId: 'S002', name: 'S. Arun Kumar', class: '12th Standard', section: 'B',
      rollNo: '2025-12B-007', dob: '22 August 2007', photo: null,
      results: [
        {
          examName: 'Quarterly Examination', year: '2025', percentage: 78.4, rank: 8,
          marks: [
            { subject: 'Tamil', theory: 74, practical: null, total: 74, grade: 'B+' },
            { subject: 'English', theory: 79, practical: null, total: 79, grade: 'A' },
            { subject: 'Physics', theory: 76, practical: 18, total: 76, grade: 'B+' },
            { subject: 'Chemistry', theory: 80, practical: 19, total: 80, grade: 'A' },
            { subject: 'Biology', theory: 83, practical: 20, total: 83, grade: 'A' },
          ],
        },
        {
          examName: 'Half-Yearly Examination', year: '2025', percentage: 82.0, rank: 6,
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
      studentId: 'S003', name: 'S. Priya', class: '7th Standard', section: 'A',
      rollNo: '2025-07A-021', dob: '05 January 2013', photo: null,
      results: [
        {
          examName: 'Quarterly Examination', year: '2025', percentage: 95.0, rank: 1,
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
  ];

  const students = await Student.insertMany(studentsData);
  console.log(`  ✅ ${students.length} students seeded`);

  // ── Parent Accounts (2 demo) ────────────────────────────────────────────────
  const salt = await bcrypt.genSalt(10);

  await Parent.insertMany([
    {
      mobile: '9876543210',
      password: await bcrypt.hash('demo123', salt),
      parentName: 'Mr. R. Murugan',
      students: [students[0]._id],
    },
    {
      mobile: '9123456789',
      password: await bcrypt.hash('demo456', salt),
      parentName: 'Mrs. S. Lakshmi',
      students: [students[1]._id, students[2]._id],
    },
  ]);
  console.log('  ✅ 2 parent demo accounts seeded');
  console.log('     Account 1: 9876543210 / demo123 (1 child)');
  console.log('     Account 2: 9123456789 / demo456 (2 children)');

  // ── Achievements ────────────────────────────────────────────────────────────
  await Achievement.insertMany([
    { category: 'academic', year: '2024', title: '100% Pass in 10th Board', description: 'All students cleared the Tamil Nadu 10th Board exam with distinction. The school maintained its 22-year unbroken record of 100% pass percentage.', award: 'School Record' },
    { category: 'academic', year: '2024', title: '100% Pass in 12th Board', description: 'All Higher Secondary students cleared the 12th Board examination. Rank holders received fee concessions up to 100%.', award: 'School Record' },
    { category: 'sports', year: '2024', title: 'National Taekwondo Championship', description: 'ARG Academy students secured state-level positions, qualifying for nationals under NSNIS-certified coaches.', studentName: 'Multiple Students', award: 'State Level' },
    { category: 'sports', year: '2023', title: 'Kho-Kho District Champions', description: 'The school Kho-Kho team won the district championship coached by an NSNIS-certified coach, qualifying for state-level competition.', studentName: 'School Team', award: 'District Champions' },
    { category: 'sports', year: '2024', title: 'Netball State Representation', description: 'Students represented Tamil Nadu in the national Netball championship, showcasing exceptional talent and team coordination.', studentName: 'School Team', award: 'State Representation' },
    { category: 'cultural', year: '2023', title: 'Hindi Prachar Sabha Exam Excellence', description: 'Multiple students cleared the Hindi Prachar Sabha examinations with high marks, demonstrating language proficiency.', award: 'Hindi Prachar Sabha' },
    { category: 'faculty', year: '2024', title: 'Best Teacher Award', description: 'Our Physical Education teacher, a national-level athlete, was recognised for outstanding contribution to sports training.', award: 'District Best Teacher' },
  ]);
  console.log('  ✅ 7 achievements seeded');

  // ── Gallery ─────────────────────────────────────────────────────────────────
  await Gallery.insertMany([
    { title: 'Annual Sports Day', category: 'sports', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500', uploadedAt: '2025-01-10' },
    { title: 'Taekwondo Training', category: 'sports', url: 'https://images.unsplash.com/photo-1638397249761-1568e6bd0f41?w=500', uploadedAt: '2025-01-15' },
    { title: 'Science Lab Session', category: 'academic', url: 'https://images.unsplash.com/photo-1532094349884-543559877f4c?w=500', uploadedAt: '2025-02-01' },
    { title: 'Cultural Programme', category: 'cultural', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500', uploadedAt: '2025-02-14' },
    { title: 'Graduation Day', category: 'general', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500', uploadedAt: '2025-03-01' },
    { title: 'Yoga Session', category: 'sports', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500', uploadedAt: '2025-03-05' },
  ]);
  console.log('  ✅ 6 gallery images seeded');

  // ── Leadership (SPL / ASPL) ─────────────────────────────────────────────────
  await Leadership.insertMany([
    {
      name: 'K. Aravind Kumar', role: 'SPL',
      class: '12th Standard – Science', photo: null,
      quote: 'Leadership is not about being in charge. It is about taking care of those in your charge. I strive every day to represent our school with pride, discipline, and humility.',
      year: '2024-25',
    },
    {
      name: 'S. Deepika', role: 'ASPL',
      class: '11th Standard – Science', photo: null,
      quote: 'A true leader sees potential in every student. My goal is to bridge the gap between students and school, ensuring every voice is heard and valued.',
      year: '2024-25',
    },
  ]);
  console.log('  ✅ 2 leaders seeded');
  console.log('🌱 Seeding complete!\n');
};

export default seedDatabase;
