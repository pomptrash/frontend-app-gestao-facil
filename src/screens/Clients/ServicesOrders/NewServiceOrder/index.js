import { View, Text } from "react-native";
import { useTheme } from "../../../../contexts/theme/ThemeContext";
import { useClients } from "../../../../contexts/clients/ClientsContext";
import { useState } from "react";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "react-native-paper-dates";
import { style } from "./style";
export function NewServiceOrder({ route }) {
  const [description, setDescription] = useState();
  const [inputDate, setInputDate] = useState();
  const { asset } = route.params;
  const { clients } = useClients();
  const { theme } = useTheme();

  const client = clients.find((client) => client.assets.includes(asset));
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
      <Text
        style={{
          color: theme.text,
          fontSize: 24,
          fontWeight: "bold",
          width: 300,
          marginBottom: 16,
          gap: 8
        }}
      >
        Cliente: {client.name} {""}
        / Ativo: {asset.name}
      </Text>
      <Input
        onChangeText={setDescription}
        value={description}
        placeholder={"Descrição"}
        color={theme.text}
        placeHolderColor={theme.text}
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          width: 300,
          margin: 8,
          borderRadius: 8,
        }}
      >
        <DatePickerInput
          locale="pt-BR"
          label="Data Agendada"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
          presentationStyle="fullScreen"
          style={{
            backgroundColor: theme.background,
            borderColor: theme.border,
          }}
          color={theme.text}
          minimunDate={new Date()}
        />
      </View>
      <Button
        btnText={"Criar Serviço"}
        style={[style.btn, { backgroundColor: theme.primary }]}
        textStyle={style.btnText}
      />
    </View>
  );
}
