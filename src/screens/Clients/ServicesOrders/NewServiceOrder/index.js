import { View, Text, Alert } from "react-native";
import { useTheme } from "../../../../contexts/theme/ThemeContext";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "react-native-paper-dates";
import { style } from "./style";
import { useServiceOrders } from "../../../../contexts/serviceOrders/ServiceOrdersContext";

export function NewServiceOrder({ route }) {
  const [description, setDescription] = useState("");
  const [inputDate, setInputDate] = useState(null);
  const navigation = useNavigation();
  const { asset, client, order } = route.params || {};
  const { theme } = useTheme();
  const { createOrder, updateOrder, completeOrder, loading } = useServiceOrders();

  useEffect(() => {
    if (order?.id) {
      setDescription(order.descricao || "");
      setInputDate(order.dataAgendada ? new Date(order.dataAgendada) : null);
    }
  }, [order?.id]);

  const handleSave = async () => {
    if (!description || !inputDate) {
      Alert.alert("Campos obrigatórios", "Informe descrição e data.");
      return;
    }
    try {
      if (order?.id) {
        await updateOrder(order.id, { descricao: description, dataAgendada: inputDate });
      } else {
        await createOrder({
          descricao: description,
          dataAgendada: inputDate,
          ativoId: asset?.id,
          clienteId: client?.id,
        });
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erro", e?.message || (order?.id ? "Falha ao atualizar serviço" : "Falha ao criar serviço"));
    }
  };

  const handleComplete = async () => {
    if (!order?.id) return;
    try {
      await completeOrder(order.id);
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erro", e?.message || "Falha ao concluir serviço");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        backgroundColor: theme.background,
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 24,
          fontWeight: "bold",
          width: 300,
          marginBottom: 16,
        }}
      >
        {client?.nome || client?.name ? `Cliente: ${client?.nome || client?.name}` : "Novo Serviço"} {" "}
        {asset?.nome || asset?.name ? `/ Ativo: ${asset?.nome || asset?.name}` : ""}
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
          style={{ backgroundColor: theme.background, borderColor: theme.border }}
          color={theme.text}
          minimunDate={new Date()}
        />
      </View>

      <Button
        btnText={loading ? (order?.id ? "Salvando..." : "Criando...") : (order?.id ? "Salvar alterações" : "Criar Serviço")}
        style={[style.btn, { backgroundColor: theme.primary }]}
        textStyle={style.btnText}
        onPress={handleSave}
        disabled={loading}
      />

      {order?.id && order?.status !== 'Concluído' && (
        <Button
          btnText={loading ? "Concluindo..." : "Concluir Serviço"}
          style={[style.btn, { backgroundColor: theme.success || theme.primary }]}
          textStyle={style.btnText}
          onPress={handleComplete}
          disabled={loading}
        />
      )}
    </View>
  );
}

