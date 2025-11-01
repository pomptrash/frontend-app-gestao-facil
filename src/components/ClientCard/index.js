import { TouchableOpacity, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Badge } from "react-native-paper";
import { style } from "./style";
import { useTheme } from "../../contexts/theme/ThemeContext";

export function ClientCard({ client, featherIcon, onPress }) {
  const { theme } = useTheme();
  const services = Array.isArray(client?.services) ? client.services : [];
  const assets = Array.isArray(client?.assets) ? client.assets : [];
  const contatoEmail = client?.email || client?.contatos?.[0]?.email || "";

  const emAndamento = services.filter((s) => s.status === "Em Andamento");

  return (
    <TouchableOpacity
      style={[style.clientData, { backgroundColor: theme.card }]}
      onPress={onPress}
    >
      {emAndamento.length > 0 && (
        <Badge
          style={{
            position: "absolute",
            top: 15,
            right: 10,
            backgroundColor: theme.primary,
            color: "#fff",
          }}
        >
          {emAndamento.length}
        </Badge>
      )}

      <Text style={[style.clientDataTitle, { color: theme.primary }]}>
        <Feather name={featherIcon} size={32} /> {client.name}
      </Text>
      <Text style={[style.clientDataText, { color: theme.text }]}>CNPJ: {client.cnpj}</Text>
      <Text style={[style.clientDataText, { color: theme.text }]}>Contato: {contatoEmail}</Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text style={[style.clientDataText, { color: theme.text }]}>Serviços: {services.length}</Text>
        <Text style={[style.clientDataText, { color: theme.text }]}>Ativos: {assets.length}</Text>
      </View>
    </TouchableOpacity>
  );
}

