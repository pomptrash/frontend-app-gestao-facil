import { View, Text } from "react-native";
import { useTheme } from "../../../../contexts/theme/ThemeContext";
import { useClients } from "../../../../contexts/clients/ClientsContext";
import { useState } from "react";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";

import { style } from "./style";

export function NewAsset({ route }) {
  const [assetName, setAssetName] = useState("");
  const [assetCode, setAssetCode] = useState("");
  const [assetType, setAssetType] = useState("");

  const { client } = route.params;
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
      <Text
        style={{
          color: theme.text,
          fontSize: 24,
          fontWeight: "bold",
          width: 300,
          marginBottom: 16,
          gap: 8,
        }}
      >
        Cliente: {client.name} {""}
      </Text>
      <Input
        onChangeText={setAssetCode}
        value={assetCode}
        placeholder={"Código do Ativo"}
        color={theme.text}
        placeHolderColor={theme.text}
      />
      <Input
        onChangeText={setAssetName}
        value={assetName}
        placeholder={"Nome do Ativo"}
        color={theme.text}
        placeHolderColor={theme.text}
      />
      <Input
        onChangeText={setAssetType}
        value={assetType}
        placeholder={"Tipo do Ativo"}
        color={theme.text}
        placeHolderColor={theme.text}
      />
      <Button
        btnText={"Criar Ativo"}
        style={[style.btn, { backgroundColor: theme.primary }]}
        textStyle={style.btnText}
      />
    </View>
  );
}
