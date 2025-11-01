import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import ativoService from "../../../service/ativoService";
import { Feather } from "@expo/vector-icons";

export function ClientAssets({ route, navigation }) {
  const { client } = route.params;
  const { theme } = useTheme();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAssets = async () => {
    if (!client?.id) return;
    setLoading(true);
    setError("");
    try {
      const data = await ativoService.listarAtivosPorCliente(client.id);
      setAssets(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || "Falha ao carregar ativos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [client?.id]);

  const header = useMemo(() => (
    <View style={{ padding: 16 }}>
      <Text style={{ color: theme.text, fontSize: 20, fontWeight: "bold" }}>
        Ativos do cliente: {client?.nome || client?.name}
      </Text>
    </View>
  ), [client, theme]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <TouchableOpacity
        style={{
          backgroundColor: theme.primary,
          borderRadius: 25,
          height: 50,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 25,
          right: 25,
          zIndex: 10,
          padding: 8,
          gap: 8,
        }}
        onPress={() => navigation.navigate("NewAsset", { client })}
      >
        <Feather name="plus" size={32} color={"white"} />
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Adicionar Ativo</Text>
      </TouchableOpacity>

      {header}

      {loading && (
        <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 40 }} />
      )}
      {!!error && (
        <Text style={{ color: "red", textAlign: "center", marginVertical: 10 }}>{error}</Text>
      )}

      {!loading && assets.length === 0 ? (
        <Text style={{ color: theme.text, textAlign: "center", marginTop: 16 }}>
          Nenhum ativo encontrado
        </Text>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 90 }}
          data={assets}
          keyExtractor={(item) => String(item.id)}
          onRefresh={fetchAssets}
          refreshing={loading}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                marginVertical: 6,
              }}
              onPress={() => navigation.navigate("ServicesOrders", { client, asset: item })}
            >
              <Text style={{ color: theme.text, fontSize: 18, fontWeight: "bold" }}>{item.nome}</Text>
              {!!item.numeroSerie && (
                <Text style={{ color: theme.text }}>Nº de Série: {item.numeroSerie}</Text>
              )}
              {!!item.status && (
                <Text style={{ color: theme.text }}>Status: {item.status}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
