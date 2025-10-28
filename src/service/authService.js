// src/service/AuthService.js
import api from "./api";
import tokenService from "./tokenService";

class AuthService {
  // 📝 REGISTRO
  async register(userData) {
    try {
      console.log("📝 Registrando usuário:", { ...userData, password: "***" });
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("❌ Erro no registro:", error);
      throw this._handleAuthError(error);
    }
  }

  // 🔑 LOGIN
  async login(email, password) {
    try {
      console.log("🔑 Tentando login:", email);
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data || {};

      if (!token) throw new Error("Token ausente na resposta do servidor");

      await tokenService.setAuthData(token, user || { email });
      console.log("✅ Login bem-sucedido");
      return { token, user };
    } catch (error) {
      console.error("❌ Falha no login:", error);
      throw this._handleAuthError(error);
    }
  }

  // 🔄 VERIFICAR TOKEN (modo online/offline)
  async verifyToken() {
    try {
      const token = await tokenService.getToken();
      if (!token) return { valid: false };

      // 🔧 Modo offline: se não há backend, apenas valida localmente
      if (process.env.NODE_ENV === "development" && !window.navigator.onLine) {
        console.log("🧪 Modo offline: token local considerado válido");
        return { valid: true, user: await tokenService.getUserData() };
      }

      const response = await api.get("/v1/clientes");
      return { valid: true, user: response.data?.user || null };
    } catch (error) {
      await tokenService.clearAuthData();
      return { valid: false };
    }
  }

  // 🧹 LOGOUT
  async logout() {
    console.log("🚪 Logout solicitado");
    if (typeof window !== "undefined") localStorage.clear();
    await tokenService.clearAuthData();
  }

  // 🛡️ TRATAMENTO DE ERROS
  _handleAuthError(error) {
    const status = error.response?.status;
    const backendError = error.response?.data?.erro;
    const details = error.response?.data?.detalhes;

    let message = "Erro de conexão com o servidor";

    switch (status) {
      case 400: message = "Dados inválidos"; break;
      case 401: message = backendError || "Credenciais inválidas"; break;
      case 403: message = "Acesso negado"; break;
      case 404: message = "Endpoint não encontrado"; break;
      case 409: message = "E-mail já cadastrado"; break;
      case 500: message = "Erro interno do servidor"; break;
      default: message = backendError || details || message;
    }

    return new Error(message);
  }
}

export default new AuthService();
