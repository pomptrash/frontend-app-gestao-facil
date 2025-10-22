import api from './api';

class ClienteService {
  // 📋 LISTAR CLIENTES
  async listarClientes(filtros = {}) {
    try {
      const response = await api.get('/v1/clientes', { params: filtros });
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'clientes');
    }
  }

  // ➕ CRIAR CLIENTE
  async criarCliente(clienteData) {
    try {
      const response = await api.post('/v1/clientes', clienteData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'criação de cliente');
    }
  }

  // ✏️ ATUALIZAR CLIENTE
  async atualizarCliente(id, clienteData) {
    try {
      const response = await api.put(`/v1/clientes/${id}`, clienteData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'atualização de cliente');
    }
  }

  // 🗑️ EXCLUIR CLIENTE
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
        const message = error.response?.data?.erro || 
                       error.response?.data?.message || 
                       `Erro ao ${contexto}`;
        return new Error(message);
    }
  }
}

export default new ClienteService();