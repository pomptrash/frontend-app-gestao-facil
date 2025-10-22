// service/tokenService.js - VERSÃO DEBUG
import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenService {
  async getToken() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('🔑 tokenService - Token no storage:', token ? `EXISTE (${token.length} chars)` : 'NÃO EXISTE');
      return token;
    } catch (error) {
      console.error('❌ tokenService - Erro ao obter token:', error);
      return null;
    }
  }

  decodeToken(token) {
    try {
      console.log('🔓 tokenService - Decodificando token...');
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('📋 tokenService - Payload decodificado:', {
        id: payload.id,
        email: payload.email,
        cargo: payload.cargo,
        exp: payload.exp,
        expiracao: new Date(payload.exp * 1000).toLocaleString('pt-BR')
      });
      return payload;
    } catch (error) {
      console.error('❌ tokenService - Erro ao decodificar token:', error);
      return null;
    }
  }

  async isTokenExpired() {
    try {
      console.log('⏰ tokenService - Verificando expiração do token...');
      const token = await this.getToken();
      
      if (!token) {
        console.log('⏰ tokenService - Sem token, considerado expirado');
        return true;
      }

      const payload = this.decodeToken(token);
      
      if (!payload || !payload.exp) {
        console.log('⏰ tokenService - Payload inválido, considerado expirado');
        return true;
      }

      const now = Date.now() / 1000;
      const isExpired = payload.exp < now;
      
      console.log('⏰ tokenService - Verificação de expiração:', {
        expiraEm: new Date(payload.exp * 1000).toLocaleString('pt-BR'),
        agora: new Date().toLocaleString('pt-BR'),
        expirado: isExpired,
        segundosRestantes: Math.floor(payload.exp - now)
      });

      return isExpired;

    } catch (error) {
      console.error('❌ tokenService - Erro ao verificar expiração:', error);
      return true;
    }
  }

  async setAuthData(token, userData = {}) {
    try {
      console.log('💾 tokenService - Salvando dados de autenticação...');
      await AsyncStorage.setItem('userToken', token);
      
      const payload = this.decodeToken(token);
      if (payload) {
        await AsyncStorage.setItem('userEmail', payload.email || userData.email || '');
        await AsyncStorage.setItem('userRole', payload.cargo || '');
        await AsyncStorage.setItem('userId', payload.id?.toString() || '');
      }
      
      console.log('✅ tokenService - Dados salvos com sucesso');
    } catch (error) {
      console.error('❌ tokenService - Erro ao salvar dados:', error);
      throw error;
    }
  }

  async clearAuthData() {
    try {
      console.log('🗑️ tokenService - LIMPANDO todos os dados de autenticação...');
      await AsyncStorage.multiRemove([
        'userToken', 
        'userEmail', 
        'userRole', 
        'userId'
      ]);
      console.log('✅ tokenService - Dados limpos com sucesso');
    } catch (error) {
      console.error('❌ tokenService - Erro ao limpar dados:', error);
      throw error;
    }
  }

  async isAuthenticated() {
    const token = await this.getToken();
    if (!token) {
      console.log('🔐 tokenService - isAuthenticated: false (sem token)');
      return false;
    }
    
    const isExpired = await this.isTokenExpired();
    console.log('🔐 tokenService - isAuthenticated:', !isExpired);
    return !isExpired;
  }
}

export default new TokenService();