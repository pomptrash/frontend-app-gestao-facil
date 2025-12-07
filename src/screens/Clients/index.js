import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Input } from "../../components/Input";
import { useTheme } from "../../contexts/theme/ThemeContext";
import { useAuthContext } from "../../contexts/auth/AuthContext";
import { useClients } from "../../contexts/clients/ClientsContext";
import { style } from "./style";
import { ClientCard } from "../../components/ClientCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export function Clients() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { logout, user } = useAuthContext();
  const { clients, loading, error, fetchClients } = useClients();

  const [searchClient, setSearchClient] = useState("");

  // Se o erro do contexto indicar sessão expirada, efetua logout
  useEffect(() => {
    if (error && typeof error === "string" && error.toLowerCase().includes("expir")) {
      logout();
    }
  }, [error]);

  // Refetch ao focar
  useFocusEffect(
    React.useCallback(() => {
      fetchClients({ q: searchClient, page: 1, limit: 20 });
    }, [searchClient])
  );

  const filteredClient = clients.filter((client) =>
    client.name.toLowerCase().includes(searchClient.toLowerCase())
  );

  return (
    <View style={[style.container, { backgroundColor: theme.background }]}>
      {/* BOTÃO NOVO CLIENTE */}
      {!(user?.clientId || user?.clienteId) && (
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
        onPress={() => navigation.navigate("NewClient")}
      >
        <Feather name="plus" size={32} color={"white"} />
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Adicionar Cliente
        </Text>
      </TouchableOpacity>
      )}

      {/* CABEÇALHO */}
      <View style={style.header}>
        <Text style={[style.title, { color: theme.text }]}>
          Gerenciamento de Clientes
        </Text>
        <Input
          value={searchClient}
          onChangeText={setSearchClient}
          placeholder={"Buscar Cliente"}
          color={theme.text}
          placeHolderColor={theme.text}
        />
      </View>

      {/* LOADING / ERRO */}
      {loading && (
        <ActivityIndicator
          size="large"
          color={theme.primary}
          style={{ marginTop: 40 }}
        />
      )}
      {error && (
        <Text style={{ color: "red", textAlign: "center", marginVertical: 10 }}>
          {error}
        </Text>
      )}

      {/* LISTA */}
      {!loading && clients.length === 0 ? (
        <Text style={[style.notFoundText, { color: theme.text }]}>
          Nenhum cliente localizado
        </Text>
      ) : (
        <FlatList
          style={style.clients}
          data={filteredClient}
          renderItem={({ item }) => (
            <ClientCard
              client={item}
              featherIcon={"user"}
              onPress={() =>
                navigation.navigate("ClientAssets", { client: item })
              }
            />
          )}
          keyExtractor={(client) => client.id}
          onRefresh={fetchClients}
          refreshing={loading}
        />
      )}
    </View>
  );
}
