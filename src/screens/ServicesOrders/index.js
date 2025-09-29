import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { style } from "./style";
import { Feather } from "@expo/vector-icons";

export function ServicesOrders({ route }) {
  const { theme } = useTheme();

  // array de teste
  const { client } = route.params;
  const services = client.services;
  return (
    <View style={[style.container, { backgroundColor: theme.background }]}>
      {services.length <= 0 ? (
        <Text
          style={[
            {
              textAlign: "center",
              fontSize: 24,
              fontWeight: "bold",
              padding: 8,
              color: theme.text,
            },
          ]}
        >
          Cliente não possui serviços associados
        </Text>
      ) : (
        <FlatList
          style={style.services}
          data={services}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[style.servicesData, { backgroundColor: theme.card }]}
            >
              <Text style={[style.serviceDataTitle, { color: theme.text }]}>
                <Feather name="tool" size={24} /> - {item.description}
              </Text>
              <Text style={[style.serviceDataText, { color: theme.text }]}>
                {item.status}
              </Text>
              <Text style={[style.serviceDataText, { color: theme.text }]}>
                Ativo:{" "}
                {item.clientAssetId
                  ? client.assets.find(
                      (asset) => asset.id == item.clientAssetId
                    )?.name
                  : "Nenhum ativo associdado"}
              </Text>
              <Text style={[style.serviceDataText, { color: theme.primary }]}>
                Cliente: {client.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(service) => service.id}
        />
      )}
    </View>
  );
}
