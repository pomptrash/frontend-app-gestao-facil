import { View, Text } from "react-native";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import { useClients } from "../../../contexts/clients/ClientsContext";

export function NewClient({ route }) {
  const { clients } = useClients();
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          backgroundColor: theme.background,
        },
      ]}
    >
      <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
        New Client
      </Text>
    </View>
  );
}
