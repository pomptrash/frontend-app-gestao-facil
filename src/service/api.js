// service/api.js
import axios from "axios";
import tokenService from "./tokenService";

const API_BASE_URL = "http://localhost:3000"; // 🔧 ALTERAR para IP da rede local

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Adiciona token JWT automaticamente em cada requisição
api.interceptors.request.use(async (config) => {
  const token = await tokenService.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Limpa storage se o token for inválido (401)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await tokenService.clearAuthData();
    }
    return Promise.reject(error);
  }
);

export default api;
