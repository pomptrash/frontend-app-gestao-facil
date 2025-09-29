import { TouchableOpacity, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { style } from "./style.";
import { getGlobalStyles } from "../../theme/themeStyles";
import { useTheme } from "../../theme/ThemeContext";
export function ClientCard({ client, featherIcon, onPress }) {
  const { theme } = useTheme(); // // uso do themeContext (darkMode)
  const globalStyles = getGlobalStyles(theme); // // estilo global do themeContext (darkMode)

  return (
    <TouchableOpacity
      style={[style.clientData, { backgroundColor: theme.card }]}
      onPress={onPress}
    >
      <Text style={[style.clientDataTitle, globalStyles.text]}>
        <Feather name={featherIcon} size={32} /> {client.name}
      </Text>
      <Text style={[style.clientDataText, globalStyles.text]}>
        CNPJ: {client.cnpj}
      </Text>
      <Text style={[style.clientDataText, globalStyles.text]}>
        Contato: {client.email}
      </Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text style={[globalStyles.text, { fontSize: 16 }]}>
          Serviços: {client.services.length}
        </Text>
        <Text style={[globalStyles.text, { fontSize: 16 }]}>
          Ativos: {client.assets.length}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
