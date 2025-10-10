import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Input } from "../../components/Input";
import { useTheme } from "../../contexts/theme/ThemeContext";
import { useClients } from "../../contexts/clients/ClientsContext";
import { style } from "./style";
import { useState } from "react";
import { ClientCard } from "../../components/ClientCard";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export function Clients() {
  const navigation = useNavigation();
  // array de teste
  const { clients } = useClients(); // array de clientes definido no ClientsContext
  const { theme } = useTheme(); // // uso do themeContext (darkMode)

  const [searchClient, setSearchClient] = useState("");

  const filteredClient = clients.filter((client) =>
    client.name.toLowerCase().includes(searchClient.toLowerCase())
  ); // vasculha os clientes no array e filtra se o valor do input existir dentro do array

  return (
    <View style={[style.container, { backgroundColor: theme.background }]}>
      <Text></Text>
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
      {/* Renderiza todos os clientes, caso seja feita uma pesquisa, atualiza o valor de 'filteredClient' e renderiza conforme foi pesquisado */}

      {/* caso o valor do input não exista no array, o 'filteredClient' não recebe nada e renderizaa mensagem de not found */}
      {filteredClient.length === 0 ? (
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
        />
      )}
      <Text></Text>
    </View>
  );
}
