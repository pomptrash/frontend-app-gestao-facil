import React from "react";
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/contexts/auth/AuthContext";
import { ThemeProvider } from "./src/contexts/theme/ThemeContext";
import { ClientsProvider } from "./src/contexts/clients/ClientsContext";
import * as Font from "expo-font";
import { Ionicons, Feather } from "@expo/vector-icons";
import { ServiceOrdersProvider } from "./src/contexts/serviceOrders/ServiceOrdersContext";

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    ...Ionicons.font,
    ...Feather.font,
  });

  if (!fontsLoaded) return null; // ou <Loading />

  return (
    <ThemeProvider>
      <AuthProvider>
        <ClientsProvider>
          <ServiceOrdersProvider>
            <Routes />
          </ServiceOrdersProvider>
        </ClientsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
