// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { Platform } from "react-native";
import tokenService from "../service/tokenService";
import { addUnauthorizedListener } from "../service/api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificação inicial de autenticação
  useEffect(() => {
    console.log("[useAuth] initializing...");
    checkAuth();
  }, []);

  // Ouve eventos 401 do api para forçar logout imediato
  useEffect(() => {
    const unsubscribe = addUnauthorizedListener(async () => {
      try { await tokenService.clearAuthData(); } catch {}
      setUser(null);
      setIsAuthenticated(false);
    });
    return () => { try { unsubscribe?.(); } catch {} };
  }, []);

  // Verifica se o token é válido
  const checkAuth = async () => {
    try {
      setLoading(true);
      const token = await tokenService.getToken();
      console.log("[useAuth] token present:", !!token);

      if (!token || !token.includes(".")) {
        await tokenService.clearAuthData();
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }

      const isExpired = await tokenService.isTokenExpired(token);
      if (isExpired) {
        await tokenService.clearAuthData();
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }

      const userData = await tokenService.getUserData();
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("[useAuth] checkAuth error:", error);
      try { await tokenService.clearAuthData(); } catch {}
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login: persiste token e atualiza estado
  const login = async (token) => {
    try {
      await tokenService.setAuthData(token);
      const userData = await tokenService.getUserData();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("[useAuth] login error:", error);
    }
  };

  // Logout: limpa storage e estado
  const logout = async () => {
    try {
      if (Platform.OS === "web") {
        try { localStorage.clear(); } catch {}
      }
      await tokenService.clearAuthData();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("[useAuth] logout error:", error);
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

