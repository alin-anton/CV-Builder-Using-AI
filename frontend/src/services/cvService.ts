import api from './api';
import type { CvModel } from '../types';

export const cvService = {
  getPreviewUrl: async (cvData: CvModel): Promise<string> => {
    const response = await api.post('/cv/generate-pdf', cvData, {
      responseType: 'blob' 
    });
    
    const blob = new Blob([response.data], { type: 'application/pdf' });
    return window.URL.createObjectURL(blob);
  },

  saveCv: async (cvData: CvModel): Promise<CvModel> => {
    const response = await api.post('/cv/save', cvData);
    return response.data;
  }
};