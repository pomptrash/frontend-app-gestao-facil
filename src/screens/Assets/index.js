import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "../../contexts/theme/ThemeContext";
import { useAuthContext } from "../../contexts/auth/AuthContext";
import { useNavigation } from "@react-navigation/native";
import ativoService from "../../service/ativoService";

export function Assets() {
  const { theme } = useTheme();
  const { user } = useAuthContext();
  const navigation = useNavigation();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAssets = async () => {
    setLoading(true);
    setError("");
    try {
      const filters = {};
      if (user?.clientId || user?.clienteId) filters.clienteId = user.clientId || user.clienteId;
      const data = await ativoService.listarAtivos(filters);
      setAssets(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || "Falha ao carregar ativos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [user?.clientId]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
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
              onPress={() => navigation.navigate("ServicesOrders", { asset: item, AllServices: false })}
            >
              <Text style={{ color: theme.text, fontSize: 18, fontWeight: "bold" }}>{item.name || item.nome}</Text>
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

