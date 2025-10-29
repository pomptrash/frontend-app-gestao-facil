import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ClientsProvider } from "./src/contexts/clients/ClientsContext";
import { ThemeSwitcher } from "./src/contexts/theme/ThemeSwitcher";
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/contexts/auth/AuthContext";
import { ThemeProvider } from "./src/contexts/theme/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
          <AuthProvider>
            <ClientsProvider>
              <Routes />
            </ClientsProvider>
          </AuthProvider>
        </SafeAreaView>
        <ThemeSwitcher />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
