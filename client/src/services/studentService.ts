import api from './api';
import type { Student } from '../data/adminStore';

export const fetchStudents = (): Promise<Student[]> =>
  api.get<Student[]>('/students');

export const updateStudent = (id: string, data: Partial<Student>): Promise<Student> =>
  api.put<Student>(`/students/${id}`, data);
