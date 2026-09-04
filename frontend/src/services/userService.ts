// src/services/userService.ts
import api from './api';
import type { UserDtoResponse } from '../types/UserDtoResponse';

export const userService = {
    // Preia datele utilizatorului logat pe baza token-ului JWT din header
    getCurrentUser: async (): Promise<UserDtoResponse> => {
        const response = await api.get<UserDtoResponse>('/user/me');
        return response.data;
    },

    // (Opțional) Actualizează profilul
    updateProfile: async (id: number, userData: Partial<UserDtoResponse>): Promise<UserDtoResponse> => {
        const response = await api.put<UserDtoResponse>(`/user/${id}`, userData);
        return response.data;
    }
};