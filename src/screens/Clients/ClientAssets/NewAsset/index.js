import React, { useEffect, useState } from "react";
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
import localService from "../../../../service/localService";

export function NewAsset() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { client } = route.params || {};

  const [assetName, setAssetName] = useState("");
  const [assetLocation, setAssetLocation] = useState("");
  const [locais, setLocais] = useState([]);
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const data = await localService.listarLocais();
        setLocais(Array.isArray(data) ? data : []);
      } catch (e) {}
    })();
  }, []);

  async function handleSaveAsset() {
    if (!assetName.trim() || !selectedLocal?.id) {
      Alert.alert("Campos obrigatórios", "Informe nome e selecione o Local do ativo.");
      return;
    }

    try {
      setLoading(true);
      await ativoService.criarAtivo({
        nome: assetName.trim(),
        localId: selectedLocal.id,
        clienteId: client?.id,
      });

      Alert.alert("Sucesso", "Ativo criado com sucesso.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Erro ao criar ativo:", error);
      Alert.alert("Erro", error?.message || "Falha ao criar ativo.");
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

        <View>
          <TouchableOpacity
            style={[styles.input, { borderColor: theme.primary, flexDirection: 'row', alignItems: 'center' }]}
            onPress={() => setSelectOpen((v) => !v)}
            disabled={loading}
          >
            <Text style={{ color: theme.text }}>
              {selectedLocal ? `${selectedLocal.name || selectedLocal.nome} (ID ${selectedLocal.id})` : 'Selecione o Local'}
            </Text>
          </TouchableOpacity>
          {selectOpen && (
            <View style={{ borderWidth: 1, borderColor: theme.border, borderRadius: 8, marginTop: 6, maxHeight: 180 }}>
              <ScrollView>
                {locais.map((loc) => (
                  <TouchableOpacity
                    key={loc.id}
                    style={{ padding: 12, backgroundColor: theme.card, borderBottomWidth: 1, borderBottomColor: theme.border }}
                    onPress={() => { setSelectedLocal(loc); setSelectOpen(false); }}
                  >
                    <Text style={{ color: theme.text }}>{loc.name || loc.nome} (ID {loc.id})</Text>
                  </TouchableOpacity>
                ))}
                {locais.length === 0 && (
                  <View style={{ padding: 12 }}>
                    <Text style={{ color: theme.text }}>Nenhum local encontrado</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </View>

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

