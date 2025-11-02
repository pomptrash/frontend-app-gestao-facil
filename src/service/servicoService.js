import api from './api';

class ServicoService {
  async listarServicos(filtros = {}) {
    try {
      const response = await api.get('/v1/servicos', { params: filtros });
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'serviços');
    }
  }

  async criarServico(servicoData) {
    try {
      const response = await api.post('/v1/servicos', servicoData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'criação de serviço');
    }
  }

  async atualizarServico(id, servicoData) {
    try {
      const response = await api.put(`/v1/servicos/${id}`, servicoData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'atualização de serviço');
    }
  }

  async concluirServico(id, extra = {}) {
    try {
      const payload = {
        status: 'Concluído',
        dataConclusao: new Date().toISOString(),
        ...extra,
      };
      const response = await api.put(`/v1/servicos/${id}`, payload);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'conclusão de serviço');
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
        const message = error.response?.data?.erro || error.response?.data?.message || `Erro ao ${contexto}`;
        return new Error(message);
    }
  }
}

export default new ServicoService();

