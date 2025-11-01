import api from './api';

class AtivoService {
  async listarAtivos(filtros = {}) {
    try {
      const response = await api.get('/v1/ativos', { params: filtros });
      return response.data;
    } catch (error) {
      throw this._handleApiError(error, 'listar ativos');
    }
  }

  async listarAtivosPorCliente(clienteId) {
    return this.listarAtivos({ clienteId });
  }

  async criarAtivo(ativoData) {
    try {
      const response = await api.post('/v1/ativos', ativoData);
      return response.data;
    } catch (error) {
      throw this._handleApiError(error, 'criar ativo');
    }
  }

  _handleApiError(error, contexto) {
    const status = error.response?.status;
    switch (status) {
      case 401:
        return new Error('Sessão expirada. Faça login novamente.');
      case 403:
        return new Error('Acesso não autorizado.');
      case 404:
        return new Error(`Recurso não encontrado ao ${contexto}.`);
      case 500:
        return new Error('Erro interno do servidor.');
      default:
        const message = error.response?.data?.erro || error.response?.data?.message || `Erro ao ${contexto}`;
        return new Error(message);
    }
  }
}

export default new AtivoService();
