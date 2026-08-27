// src/services/cvService.ts
import api from './api';
import type { CvModel } from '../types/CvModel';

export const cvService = {
    // Salvează CV-ul în baza de date
    saveCv: async (cvData: CvModel): Promise<CvModel> => {
        const response = await api.post<CvModel>('/cv/save', cvData);
        return response.data;
    },

    // Cere AI-ului să genereze sumarul (trimite un string, primește un string)
    generateAiSummary: async (jobTitle: string): Promise<string> => {
        const response = await api.post<{ summary: string }>('/cv/generate-summary', { jobTitle });
        return response.data.summary;
    },

    // Cere backend-ului să genereze PDF-ul și îl descarcă în browser
    generatePdf: async (cvData: CvModel): Promise<void> => {
        const response = await api.post('/cv/generate-pdf', cvData, {
            responseType: 'blob' // Obligatoriu pentru fișiere
        });
        
        // Logica standard de descărcare fișiere în React
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'CV_Generat.pdf');
        document.body.appendChild(link);
        link.click();
        
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
};