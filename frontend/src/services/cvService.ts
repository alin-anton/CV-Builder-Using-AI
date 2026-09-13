import api from './api';
import type { CvModel } from '../types';

export const cvService = {
  getPreviewUrl: async (cvData: CvModel): Promise<string> => {
    const response = await api.post('/cv/generate-pdf', cvData);
    return response.data;
  },

  enhanceWithAi: async (cvData: CvModel): Promise<CvModel> => {
    const response = await api.post<CvModel>('/cv/ai-enhance', cvData);
    return response.data;
  },

  getMyCvs: async (): Promise<CvModel[]> => {
    const response = await api.get<CvModel[]>('/cv/user/my-cvs');
    return response.data;
  },

  getCvById: async (id: string): Promise<CvModel> => {
    const response = await api.get<CvModel>(`/cv/${id}`);
    return response.data;
  },

  deleteCv: async (id: string): Promise<void> => {
    await api.delete(`/cv/${id}`);
  },

  getAllByEmail: async (email: string) => {
    const response = await api.get(`/cv/email/${email}`);
    return response.data;
  },

  saveCv: async (cvData: CvModel): Promise<CvModel> => {
    // Dacă CV-ul are deja un ID alocat de Mongo, facem update
    if (cvData.id) {
      const response = await api.put<CvModel>(`/cv/${cvData.id}`, cvData);
      return response.data;
    } 
    // Dacă nu are ID, creăm un document nou
    else {
      const response = await api.post<CvModel>('/cv', cvData);
      return response.data;
    }
  },
};