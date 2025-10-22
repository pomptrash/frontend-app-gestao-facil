// hooks/useAuth.js - VERSÃO DEBUG
import { useState, useEffect } from 'react';
import tokenService from '../service/tokenService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔄 useAuth - Iniciando verificação...');
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('🔍 useAuth - Verificando token...');
      
      // 1. Verificar se existe token
      const token = await tokenService.getToken();
      console.log('📦 useAuth - Token encontrado:', token ? 'SIM' : 'NÃO');
      
      if (!token) {
        console.log('🚫 useAuth - Nenhum token, usuário NÃO autenticado');
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      console.log('🔑 useAuth - Token:', token.substring(0, 20) + '...');

      // 2. Verificar se token é válido
      const isTokenValid = await tokenService.isTokenExpired();
      console.log('✅ useAuth - Token válido?', !isTokenValid);

      if (!isTokenValid) {
        // Token válido - usuário autenticado
        const userData = await tokenService.getUserData();
        console.log('👤 useAuth - Dados do usuário:', userData);
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        // Token inválido - fazer logout
        console.log('❌ useAuth - Token inválido/expirado, limpando...');
        await tokenService.clearAuthData();
        setIsAuthenticated(false);
        setUser(null);
      }

    } catch (error) {
      console.error('💥 useAuth - Erro na verificação:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      console.log('🏁 useAuth - Verificação finalizada. Autenticado:', isAuthenticated);
      setLoading(false);
    }
  };

  const login = async (token) => {
    console.log('🔐 useAuth - Fazendo login...');
    await tokenService.setAuthData(token);
    const userData = await tokenService.getUserData();
    setIsAuthenticated(true);
    setUser(userData);
    console.log('✅ useAuth - Login realizado');
  };

  const logout = async () => {
    console.log('🚪 useAuth - Fazendo logout...');
    await tokenService.clearAuthData();
    setIsAuthenticated(false);
    setUser(null);
    console.log('✅ useAuth - Logout realizado');
  };

  return { 
    isAuthenticated, 
    user, 
    loading, 
    checkAuth,
    login,
    logout
  };
};