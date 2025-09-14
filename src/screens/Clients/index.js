import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Input } from '../../components/Input';
import { useTheme } from '../../theme/ThemeContext'
import { getGlobalStyles } from '../../theme/themeStyles'
import { style } from './style';
import { Feather } from '@expo/vector-icons'
import { useState } from 'react';

export function Clients(){
    // array de teste
    const clients = [
      {
        id: 1,
        nome: "TechSolutions Ltda",
        cnpj: "12.345.678/0001-95",
        contatos: "contato@techsolutions.com.br",
      },
      {
        id: 2,
        nome: "InovaComércio S.A.",
        cnpj: "98.765.432/0001-10",
        contatos: "vendas@inovacommercio.com",
      },
      {
        id: 3,
        nome: "Logística Rápida Express",
        cnpj: "55.123.789/0001-66",
        contatos: "suporte@logisticarapida.com.br",
      },
      {
        id: 4,
        nome: "AgroFértil Brasil",
        cnpj: "33.987.123/0001-44",
        contatos: "vendas@agrofertil.com.br",
      },
      {
        id: 5,
        nome: "ConstruMax Materiais",
        cnpj: "77.456.789/0001-22",
        contatos: "orcamento@construmax.com.br",
      },
      {
        id: 6,
        nome: "HealthPlus Clinic",
        cnpj: "66.321.987/0001-88",
        contatos: "agendamento@healthplus.clinic",
      },
      {
        id: 7,
        nome: "EcoEnergy Soluções",
        cnpj: "44.555.666/0001-33",
        contatos: "projetos@ecoenergy.com.br",
      },
    ];
    const { theme } = useTheme() // // uso do themeContext (darkMode)
    const globalStyles = getGlobalStyles(theme) // // estilo global do themeContext (darkMode)

    const [searchClient, setSearchClient] = useState('')

    const filteredClient = clients.filter(client => client.nome.toLowerCase().includes(searchClient.toLowerCase())) // vasculha os clientes no array e filtra se o valor do input existir dentro do array

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
        <ScrollView style={style.clients}>
            {/* Renderiza todos os clientes, caso seja feita uma pesquisa, atualiza o valor de 'filteredClient' e renderiza conforme foi pesquisado */}
          {filteredClient.map((client) => (
            <TouchableOpacity key={client.cnpj} style={style.clientData}>
              <Text style={[style.clientDataTitle, globalStyles.text]}>
                <Feather name="user" size={32} /> {client.nome}
              </Text>
              <Text style={[style.clientDataText, globalStyles.text]}>
                CNPJ: {client.cnpj}
              </Text>
              <Text style={[style.clientDataText, globalStyles.text]}>
                Contato: {client.contatos}
              </Text>
            </TouchableOpacity>
          ))}

          {/* caso o valor do input não exista no array, o 'filteredClient' não recebe nada e renderizaa mensagem de not found */}
          {filteredClient.length === 0 && (
            <Text style={[globalStyles.text, style.notFoundText]}>
              Nenhum cliente localizado
            </Text>
          )}
        </ScrollView>
        <Text></Text>
      </View>
    );
}