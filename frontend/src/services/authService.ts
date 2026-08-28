import api from './api';

export const authService = {
  // Login - trimite username și password
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    
    // Presupunem că backend-ul returnează un obiect { token: "ey..." }
    if (response.data && response.data.token) {
      localStorage.setItem('jwt_token', response.data.token);
    }
    return response.data;
  },

  // Register - trimite datele pentru creare cont
  register: async (data: { username: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Logout - șterge token-ul
  logout: () => {
    localStorage.removeItem('jwt_token');
  },

  // Verifică dacă user-ul este logat (are token)
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('jwt_token');
  },

  // Preia token-ul (dacă ai nevoie de el manual)
  getToken: () => {
    return localStorage.getItem('jwt_token');
  }
};