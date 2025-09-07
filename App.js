import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { Login } from "./src/screens/Login";

import { ThemeProvider } from "./src/theme/ThemeContext";
import { ThemeSwitcher } from "./src/theme/ThemeSwitcher";

export default function App() {

  return (
    <ThemeProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={{ flex: 1}}>
          <Login />
        </SafeAreaView>
      </KeyboardAvoidingView>
      <ThemeSwitcher/>
    </ThemeProvider>
  );
}
