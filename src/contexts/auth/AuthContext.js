import React, { createContext, useContext } from "react";
import { useAuth } from "../../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  console.log("📡 [AuthProvider] Montado — expondo funções:", Object.keys(auth));
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
  return context;
};
