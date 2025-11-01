import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../../../contexts/theme/ThemeContext";

export function NewAsset() {
  const { theme } = useTheme();
  const [assetName, setAssetName] = useState("");
  const [assetLocation, setAssetLocation] = useState("");

  function handleSaveAsset() {
    console.log("Novo ativo salvo:", { assetName, assetLocation });
    // aqui você pode integrar com POST /v1/ativos no seu backend
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Cadastrar Novo Ativo</Text>

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder="Nome do ativo"
        placeholderTextColor={theme.text}
        value={assetName}
        onChangeText={setAssetName}
      />

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder="Localização"
        placeholderTextColor={theme.text}
        value={assetLocation}
        onChangeText={setAssetLocation}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleSaveAsset}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
