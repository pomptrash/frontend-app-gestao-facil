import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../contexts/theme/ThemeContext";

// Placeholder para Tipos de Serviço: estrutura básica para evoluir
export function ServiceTypes() {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: theme.text }}>Tipos de Serviço (em breve)</Text>
    </View>
  );
}

