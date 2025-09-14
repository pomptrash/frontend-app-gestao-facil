import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from "./src/theme/ThemeContext";
import { ThemeSwitcher } from "./src/theme/ThemeSwitcher";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Routes />
          </SafeAreaView>
        <ThemeSwitcher />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
