import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../../contexts/theme/ThemeContext";

export function NewLocation() {
  const { theme } = useTheme();
  const [Location, setLocation] = useState("");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Text style={[styles.title, { color: theme.text }]}>
          Cadastrar Novo Local
        </Text>

        <TextInput
          style={[
            styles.input,
            { borderColor: theme.primary, color: theme.text },
          ]}
          placeholder="Nome do Local"
          placeholderTextColor={theme.text + "99"}
          value={Location}
          onChangeText={setLocation}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
        >
          <Text style={[{ color: 'white', fontWeight: "bold" }]}>
            Criar Local
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});
