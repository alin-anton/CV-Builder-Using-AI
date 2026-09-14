import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
});

// Interceptor care lipește token-ul proaspăt în mod dinamic
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token'); // Folosește cheia ta exactă din localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor pentru răspunsuri: dacă token-ul este expirat/invalid (401), curăță starea
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('jwt_token');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;