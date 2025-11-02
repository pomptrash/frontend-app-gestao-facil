import api from './api';

function mapLocal(raw) {
  if (!raw || typeof raw !== 'object') return raw;
  return {
    id: raw.id,
    name: raw.nome || raw.name,
    nome: raw.nome,
  };
}

class LocalService {
  async listarLocais(filtros = {}) {
    const res = await api.get('/v1/locais', { params: filtros });
    const data = res.data;
    return Array.isArray(data) ? data.map(mapLocal) : [];
  }
}

export default new LocalService();

