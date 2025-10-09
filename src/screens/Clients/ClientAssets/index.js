import { View, TouchableOpacity, Text } from "react-native";
import { List } from "react-native-paper";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../../components/Input";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

export function ClientAssets({ route }) {
  const navigation = useNavigation();
  const [searchAsset, setSearchAsset] = useState("");

  const { theme } = useTheme();
  const { client } = route.params; // lista de clientes passada através da navegação
  const filteredAssets = client.assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchAsset.toLowerCase())
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
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
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Adicionar Ativo
        </Text>
      </TouchableOpacity>
      <List.Accordion
        title="Listar serviços por ativos"
        titleStyle={{ color: theme.text, fontWeight: "bold", fontSize: 24 }}
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          padding: 8,
        }}
      >
        <View style={{ margin: "auto", padding: 8 }}>
          <Input
            value={searchAsset}
            onChangeText={setSearchAsset}
            placeholder={"Buscar Ativo"}
            color={theme.text}
            placeHolderColor={theme.text}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ServicesOrders", {
              client,
              assets: client.assets,
              AllServices: true,
            })
          }
        >
          <List.Item
            title="Todos os serviços"
            titleStyle={{
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderColor: theme.border,
              padding: 8,
              width: 300,
              margin: "auto",
            }}
          />
        </TouchableOpacity>
        <FlatList
          data={filteredAssets}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ServicesOrders", { client, asset: item })
              }
            >
              <List.Item
                title={item.name}
                titleStyle={{
                  fontWeight: "bold",
                  borderBottomWidth: 1,
                  borderColor: theme.border,
                  padding: 8,
                  width: 300,
                  margin: "auto",
                }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(asset) => asset.id}
        />
      </List.Accordion>
    </View>
  );
}
