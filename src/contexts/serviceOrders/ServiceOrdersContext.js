import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../auth/AuthContext";
import servicoService from "../../service/servicoService";

const ServiceOrdersContext = createContext();

export function ServiceOrdersProvider({ children }) {
  const { isAuthenticated } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastFiltersRef = useRef({});

  const fetchOrders = async (filters = {}) => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    lastFiltersRef.current = filters || {};
    try {
      const data = await servicoService.listarServicos(filters);
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "Falha ao carregar serviços.");
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const created = await servicoService.criarServico(payload);
      await fetchOrders(lastFiltersRef.current);
      return created;
    } catch (err) {
      setError(err?.message || "Falha ao criar serviço.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id, payload) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await servicoService.atualizarServico(id, payload);
      await fetchOrders(lastFiltersRef.current);
      return updated;
    } catch (err) {
      setError(err?.message || "Falha ao atualizar serviço.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setOrders([]);
      setError(null);
    }
  }, [isAuthenticated]);

  return (
    <ServiceOrdersContext.Provider
      value={{ orders, loading, error, fetchOrders, createOrder, updateOrder }}
    >
      {children}
    </ServiceOrdersContext.Provider>
  );
}

export function useServiceOrders() {
  const ctx = useContext(ServiceOrdersContext);
  if (!ctx) throw new Error("useServiceOrders deve ser usado dentro de um ServiceOrdersProvider");
  return ctx;
}

