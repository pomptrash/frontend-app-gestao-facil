import { View, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import { useTheme } from "../../contexts/theme/ThemeContext";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function ClientAssets({ route }) {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { client } = route.params; // lista de clientes passada através da navegação
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <List.Accordion
        title="Listar serviços por ativos"
        titleStyle={{ color: theme.text, fontWeight: "bold", fontSize: 24 }}
        style={{
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border,
          padding: 8,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ServicesOrders", {
              client,
              assets: client.assets,
            })
          }
        >
          <List.Item
            title="Todos os serviços"
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
            }}
            titleStyle={{ color: theme.text, fontWeight: "bold", textAlign:'center'}}
          />
        </TouchableOpacity>
        <FlatList
          data={client.assets}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ServicesOrders", { client, asset: item })
              }
            >
              <List.Item
                title={item.name}
                style={{
                  backgroundColor: theme.card,
                  borderWidth: 1,
                  borderColor: theme.border,
                }}
                titleStyle={{ color: theme.text, fontWeight: "bold", textAlign:'center' }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(asset) => asset.id}
        />
      </List.Accordion>
    </View>
  );
}
