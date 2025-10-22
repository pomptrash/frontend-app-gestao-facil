import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "./src/contexts/theme/ThemeContext";
import { ThemeSwitcher } from "./src/contexts/theme/ThemeSwitcher";
import { ClientsProvider } from "./src/contexts/clients/ClientsContext";
import { Routes } from "./src/routes";

function DebugTheme() {
  const themeContext = useTheme();
  
  console.log('Theme Context:', themeContext);
  console.log('Theme:', themeContext.theme);
  console.log('isDarkMode:', themeContext.isDarkMode);

  return (
    <View style={{ padding: 20 }}>
      <Text>Theme Context: {JSON.stringify(themeContext, null, 2)}</Text>
    </View>
  );
}

function MainApp() {
  const { theme, isDarkMode } = useTheme();

  // Debug: descomente a linha abaixo para ver o que tem no theme
  // return <DebugTheme />;

  if (!theme) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando tema...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <ClientsProvider>
          <Routes />
        </ClientsProvider>
      </SafeAreaView>
      <ThemeSwitcher />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <MainApp />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}