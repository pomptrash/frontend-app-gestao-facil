import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import { style } from "./style";
import { Feather } from "@expo/vector-icons";
import { serviceStatusColors } from "./style";
import { useNavigation } from "@react-navigation/native";

export function ServicesOrders({ route }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  // array de teste
  const { client } = route.params; // listagem de clientes passada através da prop
  const { asset } = route.params; // asset específico que chamou a navegação
  // se a navegação foi através de um asset específico, realiza a filtragem. caso contrário, mostra todos os serviços.
  const services = asset
    ? client.services.filter((service) => service.clientAssetId === asset.id)
    : client.services;
  return (
    <View style={[style.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        style={{
          backgroundColor: theme.primary,
          borderRadius: 25,
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 25,
          right: 25,
          zIndex: 10,
        }}
        onPress={() => navigation.navigate("NewServiceOrder")}
      >
        <Feather name="plus" size={32} color={"white"} />
      </TouchableOpacity>
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
              <Text
                style={[
                  style.serviceDataText,
                  { color: serviceStatusColors[item.status] },
                ]}
              >
                {item.status}
              </Text>
              <Text style={[style.serviceDataText, { color: theme.text }]}>
                Criado em {new Date(item.createdAt).toLocaleDateString("pt-BR")}
              </Text>

              <Text style={[style.serviceDataText, { color: theme.text }]}>
                {item.status === "Concluído" ? "Concluído em" : "Agendado para"}{" "}
                {new Date(item.scheduledDate).toLocaleDateString("pt-BR")}
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
