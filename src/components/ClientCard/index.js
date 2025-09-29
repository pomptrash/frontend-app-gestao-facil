import { TouchableOpacity, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { style } from "./style.";
import { useTheme } from "../../theme/ThemeContext";
export function ClientCard({ client, featherIcon, onPress }) {
  const { theme } = useTheme(); // // uso do themeContext (darkMode)
  return (
    <TouchableOpacity
      style={[style.clientData, { backgroundColor: theme.card }]}
      onPress={onPress}
    >
      <Text style={[style.clientDataTitle, {color: theme.primary}]}>
        <Feather name={featherIcon} size={32} /> {client.name}
      </Text>
      <Text style={[style.clientDataText,  {color: theme.text}]}>
        CNPJ: {client.cnpj}
      </Text>
      <Text style={[style.clientDataText,  {color: theme.text}]}>
        Contato: {client.email}
      </Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text style={[style.clientDataText, {color: theme.text}]}>
          Serviços: {client.services.length}
        </Text>
        <Text style={[style.clientDataText, {color: theme.text}]}>
          Ativos: {client.assets.length}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
