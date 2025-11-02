import api from './api';

function mapCliente(raw) {
  if (!raw || typeof raw !== 'object') return raw;
  return {
    id: raw.id,
    name: raw.nome,
    cnpj: raw.cnpj,
    contacts: raw.contatos,
    // manter campos originais para compatibilidade
    nome: raw.nome,
    contatos: raw.contatos,
    ativos: raw.ativos,
    servicos: raw.servicos,
  };
}

class ClienteService {
  async obterCliente(id) {
    try {
      const response = await api.get(`/v1/clientes/${id}`);
      return mapCliente(response.data);
    } catch (error) {
      throw this.handleApiError(error, 'busca de cliente');
    }
  }

  async listarClientes(filtros = {}) {
    try {
      const response = await api.get('/v1/clientes', { params: filtros });
      const data = response.data;
      return Array.isArray(data) ? data.map(mapCliente) : [];
    } catch (error) {
      throw this.handleApiError(error, 'clientes');
    }
  }

  async criarCliente(clienteData) {
    try {
      const response = await api.post('/v1/clientes', clienteData);
      return mapCliente(response.data);
    } catch (error) {
      throw this.handleApiError(error, 'criação de cliente');
    }
  }

  async atualizarCliente(id, clienteData) {
    try {
      const response = await api.put(`/v1/clientes/${id}`, clienteData);
      return mapCliente(response.data);
    } catch (error) {
      throw this.handleApiError(error, 'atualização de cliente');
    }
  }

  async excluirCliente(id) {
    try {
      const response = await api.delete(`/v1/clientes/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'exclusão de cliente');
    }
  }

  handleApiError(error, contexto) {
    const status = error.response?.status;
    switch (status) {
      case 401:
        return new Error('Sessão expirada. Faça login novamente.');
      case 403:
        return new Error('Acesso não autorizado.');
      case 404:
        return new Error(`${contexto} não encontrado.`);
      case 500:
        return new Error('Erro interno do servidor.');
      default:
        const message = error.response?.data?.erro || error.response?.data?.message || `Erro ao ${contexto}`;
        return new Error(message);
    }
  }
}

export default new ClienteService();

