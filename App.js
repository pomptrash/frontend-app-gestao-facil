import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { ThemeProvider } from "./src/theme/ThemeContext";
import { ThemeSwitcher } from "./src/theme/ThemeSwitcher";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <ThemeProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Routes />
        </SafeAreaView>
      </KeyboardAvoidingView>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
