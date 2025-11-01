import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "../auth/AuthContext";
import clienteService from "../../service/clienteService";

const ClientsContext = createContext();

export function ClientsProvider({ children }) {
  const { isAuthenticated } = useAuthContext();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClients = async (filtros = {}) => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const data = await clienteService.listarClientes(filtros);
      setClients(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "Falha ao carregar clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchClients();
    } else {
      setClients([]);
      setError(null);
    }
  }, [isAuthenticated]);

  return (
    <ClientsContext.Provider value={{ clients, loading, error, fetchClients }}>
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  const ctx = useContext(ClientsContext);
  if (!ctx) throw new Error("useClients deve ser usado dentro de um ClientsProvider");
  return ctx;
}

