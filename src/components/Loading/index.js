import React from "react";
import { View, ActivityIndicator, Text, Platform } from "react-native";
import { useTheme } from "../../contexts/theme/ThemeContext";
import { MotiView } from "moti"; // 💫 animação leve (opcional, se usar moti)

export const Loading = ({ message = "Carregando..." }) => {
  const { theme } = useTheme();

  const containerStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.background,
    paddingBottom: Platform.OS === "ios" ? 60 : 40,
  };

  const textStyle = {
    color: theme.text,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 12,
    letterSpacing: 0.3,
  };

  return (
    <View style={containerStyle}>
      {/* Animação leve */}
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 400 }}
      >
        <ActivityIndicator size="large" color={theme.text} />
        <Text style={textStyle}>{message}</Text>
      </MotiView>
    </View>
  );
};
