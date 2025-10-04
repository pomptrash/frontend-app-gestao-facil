import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import { style } from "./style";
import { Feather } from "@expo/vector-icons";
import { serviceStatusColors } from "./style";

export function ServicesOrders({ route }) {
  const { theme } = useTheme();

  // array de teste
  const { client } = route.params;  // listagem de clientes passada através da prop
  const { asset } = route.params; // asset específico que chamou a navegação
  // se a navegação foi através de um asset específico, realiza a filtragem. caso contrário, mostra todos os serviços.
  const services = asset? client.services.filter(service => service.clientAssetId === asset.id) : client.services
  return (
    <View style={[style.container, { backgroundColor: theme.background }]}>
      {services?.length <= 0 ? (
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
              <Text style={[style.serviceDataText, { color: serviceStatusColors[item.status]}]}>
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
            </TouchableOpacity>
          )}
          keyExtractor={(service) => service.id}
        />
      )}
    </View>
  );
}
