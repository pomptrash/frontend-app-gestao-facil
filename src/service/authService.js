import api from './api';
import tokenService from './tokenService';

class AuthService {
  // 📥 REGISTRO DE USUÁRIO
  async register(userData) {
    try {
      console.log('📝 Registrando usuário:', { 
        ...userData, 
        password: '***', 
        confirmPassword: '***' 
      });
      
      const response = await api.post('/auth/register', userData);
      console.log('✅ Registro bem-sucedido');
      
      return response.data;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // 🔑 LOGIN
  async login(email, password) {
    try {
      console.log('🔑 Tentando login:', { email });
      
      const response = await api.post('/auth/login', { email, password });
      console.log('✅ Login bem-sucedido');
      
      if (response.data.token) {
        await tokenService.setAuthData(response.data.token, { email });
      }
      
      return response.data;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // 🔄 VERIFICAR TOKEN
  async verifyToken() {
    try {
      // Usamos uma rota protegida simples para verificar o token
      const response = await api.get('/v1/clientes'); // Ou qualquer rota protegida
      return { valid: true, user: response.data.user };
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }

  // 🏥 HEALTH CHECK
  async healthCheck() {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Servidor indisponível');
    }
  }

  // 🛡️ TRATAMENTO DE ERROS DE AUTENTICAÇÃO
  handleAuthError(error) {
    const status = error.response?.status;
    const backendError = error.response?.data?.erro;
    
    switch (status) {
      case 400:
        return new Error('Dados inválidos no formulário');
      case 401:
        if (backendError === 'Usuário não encontrado') {
          return new Error('E-mail não cadastrado');
        } else if (backendError === 'Senha incorreta') {
          return new Error('Senha incorreta');
        }
        return new Error('Credenciais inválidas');
      case 409:
        return new Error('E-mail já cadastrado');
      case 500:
        return new Error('Erro interno do servidor');
      default:
        const message = error.response?.data?.erro || 
                       error.response?.data?.detalhes || 
                       'Erro de conexão com o servidor';
        return new Error(message);
    }
  }
}

export default new AuthService();