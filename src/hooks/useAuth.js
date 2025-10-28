// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { Platform } from "react-native";
import tokenService from "../service/tokenService";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Verifica autenticação inicial
  useEffect(() => {
    console.log("🚀 useAuth inicializando...");
    checkAuth();
  }, []);

  // 🔍 Verifica se o token é válido
  const checkAuth = async () => {
    try {
      setLoading(true);
      const token = await tokenService.getToken();
      console.log("📦 Token encontrado:", token ? "SIM ✅" : "NÃO ❌");

      if (!token || !token.includes(".")) {
        console.log("⚠️ Token ausente ou inválido. Limpando storage...");
        await tokenService.clearAuthData();
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }

      const isExpired = await tokenService.isTokenExpired(token);
      if (isExpired) {
        console.log("⏰ Token expirado. Limpando e deslogando...");
        await tokenService.clearAuthData();
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }

      const userData = await tokenService.getUserData();
      console.log("👤 Usuário autenticado:", userData);
      setUser(userData);
      setIsAuthenticated(true);
      return true;

    } catch (error) {
      console.error("❌ Erro em checkAuth:", error);
      await tokenService.clearAuthData();
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Login
  const login = async (token) => {
    try {
      console.log("🔑 Iniciando login...");
      await tokenService.setAuthData(token);
      const userData = await tokenService.getUserData();
      setUser(userData);
      setIsAuthenticated(true);
      console.log("✅ Login concluído com sucesso:", userData);
    } catch (error) {
      console.error("❌ Erro ao realizar login:", error);
    }
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      console.log("🚪 Logout iniciado...");
      if (Platform.OS === "web") {
        console.log("🌐 Limpando localStorage...");
        localStorage.clear();
      }
      await tokenService.clearAuthData();
      setUser(null);
      setIsAuthenticated(false);
      console.log("✅ Logout finalizado. Estado limpo.");
    } catch (error) {
      console.error("❌ Erro no logout:", error);
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth,
  };
}
