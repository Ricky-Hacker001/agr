import api from './api';
import type { Achievement } from '../data/adminStore';

export const fetchAchievements = (): Promise<Achievement[]> =>
  api.get<Achievement[]>('/achievements');

export const createAchievement = (data: Omit<Achievement, 'id'>): Promise<Achievement> =>
  api.post<Achievement>('/achievements', data);

export const updateAchievement = (id: string, data: Partial<Achievement>): Promise<Achievement> =>
  api.put<Achievement>(`/achievements/${id}`, data);

export const deleteAchievement = (id: string): Promise<void> =>
  api.delete<void>(`/achievements/${id}`);
