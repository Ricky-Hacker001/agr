import api from './api';
import type { Leader } from '../data/adminStore';

export const fetchLeaders = (): Promise<Leader[]> =>
  api.get<Leader[]>('/leadership');

export const createLeader = (data: Omit<Leader, 'id'>): Promise<Leader> =>
  api.post<Leader>('/leadership', data);

export const updateLeader = (id: string, data: Partial<Leader>): Promise<Leader> =>
  api.put<Leader>(`/leadership/${id}`, data);

export const deleteLeader = (id: string): Promise<void> =>
  api.delete<void>(`/leadership/${id}`);
