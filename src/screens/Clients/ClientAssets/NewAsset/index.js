import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useTheme } from "../../../../contexts/theme/ThemeContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import ativoService from "../../../../service/ativoService";

export function NewAsset() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { client } = route.params || {};

  const [assetName, setAssetName] = useState("");
  const [assetLocation, setAssetLocation] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSaveAsset() {
    if (!assetName.trim() || !assetLocation.trim()) {
      Alert.alert("Campos obrigatórios", "Informe nome e localização do ativo.");
      return;
    }

    try {
      setLoading(true);
      await ativoService.criarAtivo({
        nome: assetName.trim(),
        localizacao: assetLocation.trim(),
        clienteId: client?.id,
      });

      Alert.alert("✅ Sucesso", "Ativo criado com sucesso.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Erro ao criar ativo:", error);
      Alert.alert("❌ Erro", error?.message || "Falha ao criar ativo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
        <Text style={[styles.title, { color: theme.text }]}>Cadastrar Novo Ativo</Text>

        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder="Nome do ativo"
          placeholderTextColor={theme.text + "99"}
          value={assetName}
          onChangeText={setAssetName}
          editable={!loading}
        />

        <TextInput
          style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
          placeholder="Localização"
          placeholderTextColor={theme.text + "99"}
          value={assetLocation}
          onChangeText={setAssetLocation}
          editable={!loading}
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: loading ? theme.disabled : theme.primary },
          ]}
          onPress={handleSaveAsset}
          disabled={loading}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {loading ? "Salvando..." : "Salvar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});
