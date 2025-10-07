import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/contexts/theme/ThemeContext";
import { ThemeSwitcher } from "./src/contexts/theme/ThemeSwitcher";
import { ClientsProvider } from "./src/contexts/clients/ClientsContext";
import { PaperProvider } from "react-native-paper";
import { Routes } from "./src/routes";
export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ClientsProvider>
              <Routes />
          </ClientsProvider>
        </SafeAreaView>
        <ThemeSwitcher />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
