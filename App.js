import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ClientsProvider } from "./src/contexts/clients/ClientsContext";
import { ThemeSwitcher } from "./src/contexts/theme/ThemeSwitcher";
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/contexts/auth/AuthContext";
import { ThemeProvider } from "./src/contexts/theme/ThemeContext";
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
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
          <AuthProvider>
            <ClientsProvider>
              <ServiceOrdersProvider>
                <Routes />
              </ServiceOrdersProvider>
            </ClientsProvider>
          </AuthProvider>
        </SafeAreaView>
        <ThemeSwitcher />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
