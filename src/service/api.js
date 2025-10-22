import axios from 'axios';
import tokenService from './tokenService';

const API_BASE_URL = 'http://localhost:3000'; // Altere para seu IP local

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health check utility
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Servidor indisponível');
  }
};

// Request interceptor - Adiciona token automaticamente
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await tokenService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Erro ao adicionar token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Trata erros globais
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await tokenService.clearAuthData();
      // Opcional: emitir evento para redirecionar para login
    }
    return Promise.reject(error);
  }
);

export default api;