import { View, Text, FlatList, ScrollView } from "react-native";
import { Input } from "../../components/Input";
import { useTheme } from "../../theme/ThemeContext";
import { getGlobalStyles } from "../../theme/themeStyles";
import { style } from "./style";
import { useState } from "react";
import { ClientCard } from "../../components/ClientCard";
import { useNavigation } from "@react-navigation/native";

export function Clients() {
  const navigation = useNavigation();
  // array de teste
  const clients = [
    {
      id: "1",
      name: "TechSolutions Ltda",
      cnpj: "12.345.678/0001-95",
      email: "contato@techsolutions.com.br",
      phone: "(11) 91111-1111",
      address: "Rua Fictícia, 1, São Paulo, SP",
      assets: [
        {
          id: "5",
          name: "Sistema de Refrigeração Central",
          description: "Unidade de ar condicionado central do data center",
          serialNumber: "REFRIG-SYS-005",
        },
      ],
      services: [
        {
          id: "os-id-1",
          description:
            "Manutenção Preventiva do Sistema de Refrigeração. Realizada limpeza dos filtros, verificação do gás refrigerante e calibração dos termostatos.",
          status: "Concluído",
          createdAt: "2025-09-10T08:00:00.000Z",
          clientId: "1",
          clientAssetId: "5",
        },
      ],
    },
    {
      id: "2",
      name: "InovaComércio S.A.",
      cnpj: "98.765.432/0001-10",
      email: "vendas@inovacommercio.com",
      phone: "(21) 92222-2222",
      address: "Rua Fictícia, 2, Rio de Janeiro, RJ",
      assets: [
        {
          id: "8",
          name: "Servidor Dell PowerEdge R750",
          description: "Novo servidor para a plataforma de e-commerce",
          serialNumber: "DELL-PER-008",
        },
      ],
      services: [
        {
          id: "os-id-2",
          description:
            "Instalação de Novo Servidor. Instalação física do servidor Dell PowerEdge R750, configuração de RAID e instalação do sistema operacional.",
          status: "Em Andamento",
          createdAt: "2025-09-15T09:00:00.000Z",
          clientId: "2",
          clientAssetId: "8",
        },
      ],
    },
    {
      id: "3",
      name: "Logística Rápida Express",
      cnpj: "55.123.789/0001-66",
      email: "suporte@logisticarapida.com.br",
      phone: "(31) 93333-3333",
      address: "Rua Fictícia, 3, Belo Horizonte, MG",
      assets: [
        {
          id: "3",
          name: "Nobreak APC Smart-UPS 3000VA",
          description:
            "Nobreak principal que atende os servidores de logística",
          serialNumber: "APC-SMART-003",
        },
      ],
      services: [
        {
          id: "os-id-3",
          description:
            "Troca de Baterias do Nobreak. Substituição das baterias do nobreak APC Smart-UPS 3000VA modelo SMX3000RM2U.",
          status: "Agendado",
          createdAt: "2025-09-18T14:00:00.000Z",
          clientId: "3",
          clientAssetId: "3",
        },
      ],
    },
    {
      id: "4",
      name: "AgroFértil Brasil",
      cnpj: "33.987.123/0001-44",
      email: "vendas@agrofertil.com.br",
      phone: "(62) 94444-4444",
      address: "Rua Fictícia, 4, Goiânia, GO",
      assets: [
        {
          id: "12",
          name: "Estação de Trabalho Meteorológica",
          description: "Computador que processa dados de clima e solo",
          serialNumber: "AGRO-WS-012",
        },
      ],
      services: [
        {
          id: "os-id-4",
          description:
            "Atualização de Software de Segurança. Atualização do antivírus para versão 5.7.3 e aplicação de patches de segurança críticos.",
          status: "Concluído",
          createdAt: "2025-09-05T10:00:00.000Z",
          clientId: "4",
          clientAssetId: "12",
        },
      ],
    },
    {
      id: "5",
      name: "ConstruMax Materiais",
      cnpj: "77.456.789/0001-22",
      email: "orcamento@construmax.com.br",
      phone: "(41) 95555-5555",
      address: "Rua Fictícia, 5, Curitiba, PR",
      assets: [
        {
          id: "7",
          name: "Servidor de Arquivos Principal",
          description: "Servidor onde ficam os projetos e orçamentos",
          serialNumber: "SVR-FILES-007",
        },
      ],
      services: [
        {
          id: "os-id-5",
          description:
            "Migração para Nova Plataforma Cloud. Migração dos serviços de email e armazenamento para AWS - projeto cancelado por solicitação do cliente.",
          status: "Cancelado",
          createdAt: "2025-09-20T08:00:00.000Z",
          clientId: "5",
          clientAssetId: "7",
        },
      ],
    },
    {
      id: "6",
      name: "HealthPlus Clinic",
      cnpj: "66.321.987/0001-88",
      email: "agendamento@healthplus.clinic",
      phone: "(71) 96666-6666",
      address: "Rua Fictícia, 6, Salvador, BA",
      assets: [],
      services: [],
    },
    {
      id: "7",
      name: "EcoEnergy Soluções",
      cnpj: "44.555.666/0001-33",
      email: "projetos@ecoenergy.com.br",
      phone: "(85) 97777-7777",
      address: "Rua Fictícia, 7, Fortaleza, CE",
      assets: [],
      services: [],
    },
  ];
  const { theme } = useTheme(); // // uso do themeContext (darkMode)
  const globalStyles = getGlobalStyles(theme); // // estilo global do themeContext (darkMode)

  const [searchClient, setSearchClient] = useState("");

  const filteredClient = clients.filter((client) =>
    client.name.toLowerCase().includes(searchClient.toLowerCase())
  ); // vasculha os clientes no array e filtra se o valor do input existir dentro do array

  return (
    <View style={[style.container, globalStyles.background]}>
      <Text></Text>
      <View style={style.header}>
        <Text style={[style.title, globalStyles.text]}>
          Gerenciamento de Clientes
        </Text>
        <Input
          value={searchClient}
          onChangeText={setSearchClient}
          placeholder={"Buscar Cliente"}
          color={theme.text}
          placeHolderColor={theme.text}
        />
      </View>
      {/* Renderiza todos os clientes, caso seja feita uma pesquisa, atualiza o valor de 'filteredClient' e renderiza conforme foi pesquisado */}
      <FlatList
        data={filteredClient}
        renderItem={({ item }) => (
          <ClientCard
            client={item}
            featherIcon={"user"}
            onPress={() =>
              navigation.navigate("ServicesOrders", { client: item })
            }
          />
        )}
        keyExtractor={(client) => client.id}
      />
      {/* caso o valor do input não exista no array, o 'filteredClient' não recebe nada e renderizaa mensagem de not found */}
      {filteredClient.length === 0 && (
        <Text style={[globalStyles.text, style.notFoundText]}>
          Nenhum cliente localizado
        </Text>
      )}
      <Text></Text>
    </View>
  );
}
