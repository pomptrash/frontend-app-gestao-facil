import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useTheme } from '../../theme/ThemeContext'
import { getGlobalStyles } from '../../theme/themeStyles'
import { useState } from 'react'
import { style } from './style'
import { Input } from '../../components/Input'
import { Feather } from '@expo/vector-icons'

export function Services(){
    const { theme } = useTheme()
    const globalStyles = getGlobalStyles(theme)

    // array de teste
    const services = [
      {
        descricao: "Manutenção Preventiva do Sistema de Refrigeração",
        status: "Concluído",
        dataAgendada: "2025-09-10T08:00:00.000Z",
        dataConclusao: "2025-09-10T12:30:00.000Z",
        detalhes:
          "Realizada limpeza dos filtros, verificação do gás refrigerante e calibração dos termostatos",
        clienteId: 1,
        clienteNome: "TechSolutions Ltda",
        usuarioId: 3,
        ativoId: 5,
        tipoServicoId: 2,
      },
      {
        descricao: "Instalação de Novo Servidor",
        status: "Em Andamento",
        dataAgendada: "2025-09-15T09:00:00.000Z",
        dataConclusao: null,
        detalhes:
          "Instalação física do servidor Dell PowerEdge R750, configuração de RAID e instalação do sistema operacional",
        clienteId: 2,
        clienteNome: "InovaComércio S.A.",
        usuarioId: 1,
        ativoId: 8,
        tipoServicoId: 1,
      },
      {
        descricao: "Troca de Baterias do Nobreak",
        status: "Agendado",
        dataAgendada: "2025-09-18T14:00:00.000Z",
        dataConclusao: null,
        detalhes:
          "Substituição das baterias do nobreak APC Smart-UPS 3000VA modelo SMX3000RM2U",
        clienteId: 3,
        clienteNome: "Logística Rápida Express",
        usuarioId: 2,
        ativoId: 3,
        tipoServicoId: 4,
      },
      {
        descricao: "Atualização de Software de Segurança",
        status: "Concluído",
        dataAgendada: "2025-09-05T10:00:00.000Z",
        dataConclusao: "2025-09-05T11:45:00.000Z",
        detalhes:
          "Atualização do antivírus para versão 5.7.3 e aplicação de patches de segurança críticos",
        clienteId: 4,
        clienteNome: "AgroFértil Brasil",
        usuarioId: 4,
        ativoId: 12,
        tipoServicoId: 3,
      },
      {
        descricao: "Migração para Nova Plataforma Cloud",
        status: "Cancelado",
        dataAgendada: "2025-09-20T08:00:00.000Z",
        dataConclusao: null,
        detalhes:
          "Migração dos serviços de email e armazenamento para AWS - projeto cancelado por solicitação do cliente",
        clienteId: 5,
        clienteNome: "ConstruMax Materiais",
        usuarioId: 5,
        ativoId: 7,
        tipoServicoId: 5,
      },
    ];

    const [searchService, setSearchService] = useState('')

    const filteredService = services.filter(service => service.descricao.toLowerCase().includes(searchService.toLocaleLowerCase()))

    return (
      <View style={[style.container, globalStyles.background]}>
        <Text></Text>
        <View style={style.header}>
          <Text style={[style.title, globalStyles.text]}>
            Gerenciamento de Serviços
          </Text>
          <Input
            value={searchService}
            onChangeText={setSearchService}
            placeholder={"Buscar Serviço"}
            color={theme.text}
            placeHolderColor={theme.text}
          />
        </View>

        <ScrollView style={style.services}>
          {filteredService.map((service) => (
            <TouchableOpacity
              key={service.tipoServicoId}
              style={style.servicesData}
            >
              <Text style={[style.serviceDataTitle, globalStyles.text]}>
                <Feather name="tool" size={24} /> - {service.descricao}
              </Text>
              <Text style={[style.serviceDataText, globalStyles.text]}>
                {service.detalhes}
              </Text>
              <Text style={[style.serviceDataText, globalStyles.text]}>
                Cliente: {service.clienteNome}
              </Text>
            </TouchableOpacity>
          ))}

          {filteredService.length === 0 && (
            <Text style={[globalStyles.text, style.notFoundText]}>Nenhum serviço encontrado</Text>
          )}
        </ScrollView>
      </View>
    );
}