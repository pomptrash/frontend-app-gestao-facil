import { TouchableOpacity, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Badge } from "react-native-paper";
import { style } from "./style.";
import { useTheme } from "../../contexts/theme/ThemeContext";
export function ClientCard({ client, featherIcon, onPress }) {
  const { theme } = useTheme(); // // uso do themeContext (darkMode)
  return (
    <TouchableOpacity
      style={[style.clientData, { backgroundColor: theme.card }]}
      onPress={onPress}
    >
      {/* badge para contagem do serviços 'em andamento' */}
      {client.services.filter((service) => service.status === "Em Andamento")
        .length > 0 && (
        <Badge style={{position:'absolute', top: 15, right: 10, backgroundColor: theme.primary, color: "#fff"}} >
          {
            client.services.filter(
              (service) => service.status === "Em Andamento"
            ).length
          }
        </Badge>
      )}
      <Text style={[style.clientDataTitle, { color: theme.primary }]}>
        <Feather name={featherIcon} size={32} /> {client.name}
      </Text>
      <Text style={[style.clientDataText, { color: theme.text }]}>
        CNPJ: {client.cnpj}
      </Text>
      <Text style={[style.clientDataText, { color: theme.text }]}>
        Contato: {client.email}
      </Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text style={[style.clientDataText, { color: theme.text }]}>
          Serviços: {client.services.length}
        </Text>
        <Text style={[style.clientDataText, { color: theme.text }]}>
          Ativos: {client.assets.length}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
