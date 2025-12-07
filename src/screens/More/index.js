import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/theme/ThemeContext";
import { useAuthContext } from "../../contexts/auth/AuthContext";
import { useNavigation } from "@react-navigation/native";

export function More() {
  const { theme } = useTheme();
  const { user } = useAuthContext();
  const navigation = useNavigation();

  const Item = ({ title, onPress }) => (
    <TouchableOpacity
      style={{
        backgroundColor: theme.card,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.border,
        marginVertical: 6,
      }}
      onPress={onPress}
    >
      <Text style={{ color: theme.text, fontSize: 16, fontWeight: "600" }}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: theme.background }}>
      <Item title="Locais" onPress={() => navigation.navigate('Locations')} />
      <Item title="Opções" onPress={() => navigation.navigate('Options')} />

      {/* <Item title="Tipos de Serviço" onPress={() => navigation.navigate('ServiceTypes')} /> */}
      {user?.role === 'admin' && (
        <Item title="Usuários" onPress={() => navigation.navigate('Users')} />
      )}
    </View>
  );
}

