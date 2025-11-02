// service/api.js
import axios from "axios";
import tokenService from "./tokenService";
import { Platform } from "react-native";

// Resolve a baseURL priorizando:
// 1) EXPO_PUBLIC_API_URL (.env / variáveis de ambiente Expo)
// 2) Meta tag (apenas web): <meta name="api-base-url" content="http://..." />
// 3) Fallback por plataforma (Android emulador usa 10.0.2.2)
function resolveBaseURL() {
  const fromEnv = process.env?.EXPO_PUBLIC_API_URL;

  let fromMeta;
  if (typeof document !== "undefined") {
    const el = document.querySelector?.('meta[name="api-base-url"]');
    fromMeta = el?.getAttribute?.("content") || undefined;
  }

  const platformFallback = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

  return fromEnv || fromMeta || platformFallback;
}

const API_BASE_URL = resolveBaseURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Unauthorized listeners to propagate 401 events to the app
const unauthorizedListeners = new Set();
export function addUnauthorizedListener(listener) {
  if (typeof listener === "function") {
    unauthorizedListeners.add(listener);
    return () => unauthorizedListeners.delete(listener);
  }
  return () => {};
}

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
      // Notify subscribers to update UI/auth state immediately
      unauthorizedListeners.forEach((fn) => {
        try { fn(); } catch {}
      });
    }
    return Promise.reject(error);
  }
);

export default api;
