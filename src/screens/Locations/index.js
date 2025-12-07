import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useTheme } from "../../contexts/theme/ThemeContext";
import localService from "../../service/localService";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function Locations() {
  const { theme } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const fetchLocals = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await localService.listarLocais();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || "Falha ao carregar locais");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocals();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 12 }}>
      {loading && (
        <ActivityIndicator
          size="large"
          color={theme.primary}
          style={{ marginTop: 40 }}
        />
      )}
      {!!error && (
        <Text style={{ color: "red", textAlign: "center", marginVertical: 10 }}>
          {error}
        </Text>
      )}
      {!loading && items.length === 0 ? (
        <Text style={{ color: theme.text, textAlign: "center", marginTop: 16 }}>
          Nenhum local encontrado
        </Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => String(i.id)}
          onRefresh={fetchLocals}
          refreshing={loading}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                marginVertical: 6,
              }}
            >
              <Text
                style={{ color: theme.text, fontSize: 16, fontWeight: "600" }}
              >
                {item.name || item.nome}
              </Text>
              <Text style={{ color: theme.textSecondary || theme.text }}>
                ID: {item.id}
              </Text>
            </View>
          )}
        />
      )}

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
        onPress={() => navigation.navigate("NewLocation")}
      >
        <Feather name="plus" size={32} color={"white"} />
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Adicionar Local
        </Text>
      </TouchableOpacity>
    </View>
  );
}
