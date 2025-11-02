import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import { style, serviceStatusColors } from "./style";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo } from "react";
import { useServiceOrders } from "../../../contexts/serviceOrders/ServiceOrdersContext";
import { useAuthContext } from "../../../contexts/auth/AuthContext";

export function ServicesOrders({ route }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { orders, loading, error, fetchOrders } = useServiceOrders();
  const { user } = useAuthContext();

  const client = route?.params?.client;
  const asset = route?.params?.asset;
  const AllServices = route?.params?.AllServices;

  useEffect(() => {
    if (asset?.id) {
      fetchOrders({ ativoId: asset.id });
    } else if (client?.id) {
      fetchOrders({ clienteId: client.id });
    } else if (user?.clientId || user?.clienteId) {
      // Sem contexto explícito, restringe aos serviços do cliente do usuário
      fetchOrders({ clienteId: user.clientId || user.clienteId });
    } else {
      fetchOrders();
    }
  }, [asset?.id, client?.id, user?.clientId]);

  const data = useMemo(() => orders, [orders]);

  return (
    <View style={[style.container, { backgroundColor: theme.background }]}>
      {!AllServices && asset?.id && (
        <TouchableOpacity
          style={{
            backgroundColor: theme.primary,
            borderRadius: 25,
            height: 50,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 25,
            right: 25,
            zIndex: 10,
            padding: 8,
            gap: 8,
          }}
          onPress={() => navigation.navigate("NewServiceOrder", { asset, client })}
        >
          <Feather name="plus" size={32} color={"white"} />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Criar Serviço</Text>
        </TouchableOpacity>
      )}

      {error && (
        <Text style={{ color: "red", textAlign: "center", margin: 10 }}>{error}</Text>
      )}

      {!loading && (!data || data.length === 0) ? (
        <Text
          style={[
            { textAlign: "center", fontSize: 24, fontWeight: "bold", padding: 8, color: theme.text },
          ]}
        >
          {asset?.name || asset?.nome
            ? `Nenhum serviço associado ao ativo: ${asset.name || asset.nome}`
            : "Nenhum serviço encontrado"}
        </Text>
      ) : (
        <FlatList
          style={style.services}
          data={data}
          onRefresh={() => {
            if (asset?.id) return fetchOrders({ ativoId: asset.id });
            if (client?.id) return fetchOrders({ clienteId: client.id });
            if (user?.clientId || user?.clienteId) return fetchOrders({ clienteId: user.clientId || user.clienteId });
            return fetchOrders();
          }}
          refreshing={loading}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[style.servicesData, { backgroundColor: theme.card }]}
              onPress={() => navigation.navigate("NewServiceOrder", { asset, client, order: item })}
            > 
              <Text style={[style.serviceDataTitle, { color: theme.text }]}>
                <Feather name="tool" size={24} /> - {item.descricao}
              </Text>
              <Text style={[style.serviceDataText, { color: serviceStatusColors[item.status] || theme.text }]}>
                {item.status}
              </Text>
              {!!item.createdAt && (
                <Text style={[style.serviceDataText, { color: theme.text }]}>
                  Criado em {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                </Text>
              )}
              {!!item.dataAgendada && (
                <Text style={[style.serviceDataText, { color: theme.text }]}>
                  Agendado para {new Date(item.dataAgendada).toLocaleDateString("pt-BR")}
                </Text>
              )}
              {!!item.dataConclusao && (
                <Text style={[style.serviceDataText, { color: theme.text }]}>
                  Concluído em {new Date(item.dataConclusao).toLocaleDateString("pt-BR")}
                </Text>
              )}
              <Text style={[style.serviceDataText, { color: theme.text }]}>
                Cliente: {item.cliente?.nome || client?.nome || client?.name || "-"}
              </Text>
              <Text style={[style.serviceDataText, { color: theme.text }]}>
                Ativo: {item.ativo?.nome || asset?.nome || asset?.name || "-"}
              </Text>
              <Text style={[style.serviceDataText, { color: theme.text }]}>
                Tipo: {item.tipoServico?.nome || "-"}
              </Text>
              {!!item.responsavel?.nome && (
                <Text style={[style.serviceDataText, { color: theme.text }]}>
                  Responsável: {item.responsavel.nome}
                </Text>
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(service) => (service.id ? String(service.id) : Math.random().toString(36))}
        />
      )}
    </View>
  );
}
