import { View, Alert } from "react-native";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import { useClients } from "../../../contexts/clients/ClientsContext";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useState } from "react";
import { style } from "./style";
import { useNavigation } from "@react-navigation/native";
import clienteService from "../../../service/clienteService";

export function NewClient({ route }) {
  const [clientName, setClientName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [clientContact, setClientContact] = useState("");

  const { clients } = useClients();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const validate = () => {
    if (!clientName.trim()) return "Informe o nome do cliente";
    const cnpjDigits = (cnpj || "").replace(/\D/g, "");
    if (cnpjDigits.length !== 14) return "CNPJ inválido";
    if (clientContact) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(clientContact)) return "E-mail inválido";
    }
    return null;
  };

  const handleCreate = async () => {
    const error = validate();
    if (error) {
      Alert.alert("Validação", error);
      return;
    }
    try {
      const payload = {
        nome: clientName.trim(),
        cnpj: cnpj.replace(/\D/g, ""),
        contatos: clientContact ? [{ email: clientContact }] : [],
      };
      await clienteService.criarCliente(payload);
      Alert.alert("Sucesso", "Cliente criado com sucesso", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert("Erro", e?.message || "Falha ao criar cliente");
    }
  };

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
      <Input
        onChangeText={setClientName}
        value={clientName}
        placeholder={"Nome do cliente"}
        color={theme.text}
        placeHolderColor={theme.text}
      />
      <Input
        onChangeText={setCnpj}
        value={cnpj}
        placeholder={"CNPJ"}
        color={theme.text}
        placeHolderColor={theme.text}
        type={"numeric"}
      />
      <Input
        onChangeText={setClientContact}
        value={clientContact}
        placeholder={"Email"}
        color={theme.text}
        placeHolderColor={theme.text}
        type={"email"}
      />
      <Button
        btnText={"Adicionar Cliente"}
        style={[style.btn, { backgroundColor: theme.primary }]}
        textStyle={style.btnText}
        onPress={handleCreate}
      />
    </View>
  );
}
