import React from "react";
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/contexts/auth/AuthContext";
import { ThemeProvider } from "./src/contexts/theme/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
