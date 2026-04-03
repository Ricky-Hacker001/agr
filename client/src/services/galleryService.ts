import api from './api';
import type { GalleryImage } from '../data/adminStore';

export const fetchGallery = (): Promise<GalleryImage[]> =>
  api.get<GalleryImage[]>('/gallery');

export const createGalleryItem = (data: Omit<GalleryImage, 'id'>): Promise<GalleryImage> =>
  api.post<GalleryImage>('/gallery', data);

export const updateGalleryItem = (id: string, data: Partial<GalleryImage>): Promise<GalleryImage> =>
  api.put<GalleryImage>(`/gallery/${id}`, data);

export const deleteGalleryItem = (id: string): Promise<void> =>
  api.delete<void>(`/gallery/${id}`);
