import api from './api';

class ServicoService {
  // 📋 LISTAR SERVIÇOS
  async listarServicos(filtros = {}) {
    try {
      const response = await api.get('/v1/servicos', { params: filtros });
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'serviços');
    }
  }

  // ➕ CRIAR SERVIÇO
  async criarServico(servicoData) {
    try {
      const response = await api.post('/v1/servicos', servicoData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'criação de serviço');
    }
  }

  // ✏️ ATUALIZAR SERVIÇO
  async atualizarServico(id, servicoData) {
    try {
      const response = await api.put(`/v1/servicos/${id}`, servicoData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'atualização de serviço');
    }
  }

  handleApiError(error, contexto) {
    const status = error.response?.status;
    
    switch (status) {
      case 401:
        return new Error('Sessão expirada. Faça login novamente.');
      case 403:
        return new Error('Acesso não autorizado.');
      default:
        const message = error.response?.data?.erro || 
                       `Erro ao ${contexto}`;
        return new Error(message);
    }
  }
}

export default new ServicoService();