// ── TypeScript types for the Parent Portal ────────────────────────────────

export interface SubjectMark {
  subject: string;
  theory: number;
  practical: number | null;
  total: number;
  grade: string;
}

export interface ExamResult {
  examName: string;    // e.g. "Term 1 Mid-Term Exam"
  year: string;
  marks: SubjectMark[];
  percentage: number;
  rank: number | null;
}

export interface FeeRecord {
  term: string;        // e.g. "Term 1 – 2025"
  amount: number;
  paid: boolean;
  paidOn: string | null;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  dob: string;
  photo: string | null;
  results: ExamResult[];
  fees: FeeRecord[];
}

export interface ParentAccount {
  mobile: string;
  password: string;
  parentName: string;
  students: Student[];
}
