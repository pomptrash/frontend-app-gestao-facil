import { View } from "react-native";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import { useClients } from "../../../contexts/clients/ClientsContext";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useState } from "react";
import { style } from "./style";

export function NewClient({ route }) {
  const [clientName, setClientName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [clientContact, setClientContact] = useState("");

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
      />
    </View>
  );
}
