import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../contexts/theme/ThemeContext";

export function Users() {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: theme.text }}>Usuários (admin) — em breve</Text>
    </View>
  );
}

