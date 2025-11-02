import React, { createContext, useContext } from "react";
import { useAuth } from "../../hooks/useAuth";

// 🔒 Cria o contexto global de autenticação
const AuthContext = createContext(null);

/**
 * Provedor de autenticação global
 * Expõe o estado e funções retornadas por useAuth()
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  // Log opcional de depuração (evita erros se 'auth' for undefined)
  if (auth && typeof auth === "object") {
    console.log("📡 [AuthProvider] Inicializado — funções disponíveis:", Object.keys(auth));
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para acessar o contexto de autenticação
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("❗ useAuthContext deve ser usado dentro de um <AuthProvider>.");
  }
  return context;
};
