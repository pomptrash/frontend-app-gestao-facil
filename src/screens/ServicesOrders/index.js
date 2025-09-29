import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { getGlobalStyles } from "../../theme/themeStyles";
import { style } from "./style";
import { Feather } from "@expo/vector-icons";

export function ServicesOrders({ route }) {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  // array de teste
  const { client } = route.params;
  const services = client.services;

  console.log(services);
  return (
    <View style={[style.container, globalStyles.background]}>
      {services.length <= 0 ? (
        <Text
          style={[
            globalStyles.text,
            {
              textAlign: "center",
              fontSize: 24,
              fontWeight: "bold",
              padding: 8,
            },
          ]}
        >
          Cliente não possui serviços associados
        </Text>
      ) : (
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[style.servicesData, { backgroundColor: theme.card }]}
            >
              <Text style={[style.serviceDataTitle, globalStyles.text]}>
                <Feather name="tool" size={24} /> - {item.description}
              </Text>
              <Text style={[style.serviceDataText, globalStyles.text]}>
                {item.status}
              </Text>
              <Text style={globalStyles.text}>
                Ativo:{" "}
                {
                  client.assets.find((asset) => asset.id == item.clientAssetId)
                    .name
                }
              </Text>
              <Text style={[style.serviceDataText, globalStyles.text]}>
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
