import { createContext, useContext } from "react";

const ClientsContext = createContext();

export function ClientsProvider({children}) {
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
        {
          id: "6",
          name: "Gerador de Energia Cummins",
          description: "Gerador de backup para o prédio",
          serialNumber: "CUMMINS-GEN-006",
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
        {
          id: "os-id-1-2",
          description:
            "Teste de Carga do Gerador. Verificação de performance sob carga total para simulação de falha de energia.",
          status: "Agendado",
          createdAt: "2025-09-25T10:00:00.000Z",
          clientId: "1",
          clientAssetId: "6",
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
        {
          id: "9",
          name: "Switch Cisco Catalyst 9300",
          description: "Switch de rede principal",
          serialNumber: "CISCO-C9300-009",
        },
        {
          id: "10",
          name: "Firewall FortiGate 60F",
          description: "Equipamento de segurança de borda",
          serialNumber: "FTG-60F-010",
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
        {
          id: "os-id-2-2",
          description:
            "Configuração Inicial do Firewall. Setup das regras de NAT, VPN e políticas de acesso para ambiente de e-commerce.",
          status: "Em Andamento",
          createdAt: "2025-09-16T11:30:00.000Z",
          clientId: "2",
          clientAssetId: "10",
        },
        {
          id: "os-id-2-3",
          description:
            "Auditoria de Rede. Mapeamento da infraestrutura de rede e análise de gargalos de tráfego.",
          status: "Agendado",
          createdAt: "2025-09-28T14:00:00.000Z",
          clientId: "2",
          clientAssetId: "9",
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
        {
          id: "os-id-3-2",
          description:
            "Configuração de Backup de Rota. Criação de rotina de backup em nuvem para dados críticos de rastreamento.",
          status: "Concluído",
          createdAt: "2025-09-01T10:00:00.000Z",
          clientId: "3",
          clientAssetId: null,
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
        {
          id: "15",
          name: "Impressora 3D de Grande Formato",
          description: "Utilizada para prototipagem de projetos de construção",
          serialNumber: "3D-PRINT-015",
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
      assets: [
        {
          id: "11",
          name: "Servidor de Prontuários Eletrônicos",
          description:
            "Servidor principal para o sistema de prontuários médicos",
          serialNumber: "HP-PE-011",
        },
        {
          id: "14",
          name: "Equipamento de Diagnóstico Siemens",
          description: "Equipamento para exames de imagem",
          serialNumber: "SIEMENS-DX-014",
        },
        {
          id: "16",
          name: "Estação de Trabalho da Recepção",
          description: "Computador para agendamentos e cadastro",
          serialNumber: "RECEP-PC-016",
        },
      ],
      services: [
        {
          id: "os-id-6-1",
          description:
            "Manutenção Corretiva no Sistema de Prontuários. Correção de falha no banco de dados e otimização de consultas.",
          status: "Concluído",
          createdAt: "2025-09-12T09:00:00.000Z",
          clientId: "6",
          clientAssetId: "11",
        },
        {
          id: "os-id-6-2",
          description:
            "Atualização de Firmware do Equipamento Siemens. Aplicação de patch de segurança e atualização de drivers.",
          status: "Agendado",
          createdAt: "2025-09-29T16:00:00.000Z",
          clientId: "6",
          clientAssetId: "14",
        },
        {
          id: "os-id-6-3",
          description:
            "Instalação de Novo Monitor na Recepção. Instalação de um monitor de 32 polegadas para melhor visualização.",
          status: "Em Andamento",
          createdAt: "2025-09-27T10:00:00.000Z",
          clientId: "6",
          clientAssetId: "16",
        },
      ],
    },
    {
      id: "7",
      name: "EcoEnergy Soluções",
      cnpj: "44.555.666/0001-33",
      email: "projetos@ecoenergy.com.br",
      phone: "(85) 97777-7777",
      address: "Rua Fictícia, 7, Fortaleza, CE",
      assets: [
        {
          id: "13",
          name: "Drone DJI Phantom 4 Pro",
          description: "Utilizado para inspeção de painéis solares em campo",
          serialNumber: "DJI-PH4-013",
        },
      ],
      services: [],
    },
    {
      id: "8",
      name: "Estúdio Criativo Pixel",
      cnpj: "21.000.500/0001-05",
      email: "contato@estudiopixel.com",
      phone: "(11) 98888-8888",
      address: "Rua Fictícia, 8, São Paulo, SP",
      assets: [
        {
          id: "17",
          name: "Workstation Dell Precision",
          description:
            "Máquina principal para edição de vídeo e renderização 3D",
          serialNumber: "DELL-PR-017",
        },
        {
          id: "18",
          name: "Storage NAS Synology",
          description:
            "Armazenamento compartilhado de alta velocidade para projetos",
          serialNumber: "SYN-NAS-018",
        },
      ],
      services: [
        {
          id: "os-id-8-1",
          description:
            "Otimização de Workstation. Upgrade de memória RAM e instalação de placa de vídeo NVIDIA RTX A6000.",
          status: "Concluído",
          createdAt: "2025-09-08T15:00:00.000Z",
          clientId: "8",
          clientAssetId: "17",
        },
        {
          id: "os-id-8-2",
          description:
            "Configuração de Backup Automático. Criação de rotina de backup semanal do NAS para storage externo.",
          status: "Agendado",
          createdAt: "2025-09-30T10:00:00.000Z",
          clientId: "8",
          clientAssetId: "18",
        },
        {
          id: "os-id-8-3",
          description:
            "Suporte Técnico Remoto. Resolução de problemas de licença de software de edição.",
          status: "Concluído",
          createdAt: "2025-09-22T11:00:00.000Z",
          clientId: "8",
          clientAssetId: null,
        },
      ],
    },
    {
      id: "9",
      name: "Rede Supermercados Bom Preço",
      cnpj: "10.101.101/0001-50",
      email: "ti@superbompreco.com.br",
      phone: "(81) 99999-9999",
      address: "Rua Fictícia, 9, Recife, PE",
      assets: [
        {
          id: "19",
          name: "Servidor de PDV Principal",
          description:
            "Servidor que gerencia todas as caixas registradoras (PDVs)",
          serialNumber: "PDV-SVR-019",
        },
        {
          id: "20",
          name: "Sistema de CFTV",
          description:
            "Gravador de vídeo digital (DVR) para câmeras de segurança",
          serialNumber: "DVR-SEC-020",
        },
        {
          id: "21",
          name: "Impressora Fiscal Epson TM-T88V",
          description: "Impressora de cupom fiscal da loja 1",
          serialNumber: "EPSON-FIS-021",
        },
        {
          id: "22",
          name: "Ponto de Acesso Wi-Fi Cisco Meraki",
          description: "Ponto de acesso para rede de funcionários",
          serialNumber: "MERAKI-AP-022",
        },
      ],
      services: [
        {
          id: "os-id-9-1",
          description:
            "Manutenção Preventiva nos PDVs. Limpeza de hardware e verificação de software em todas as caixas.",
          status: "Em Andamento",
          createdAt: "2025-09-25T08:00:00.000Z",
          clientId: "9",
          clientAssetId: "19",
        },
        {
          id: "os-id-9-2",
          description:
            "Ajuste e Calibração de Câmeras de Segurança. Reajuste de ângulo e foco em 10 câmeras no setor de hortifruti.",
          status: "Agendado",
          createdAt: "2025-10-01T14:00:00.000Z",
          clientId: "9",
          clientAssetId: "20",
        },
      ],
    },
    {
      id: "10",
      name: "Fintech Ágil Pagamentos",
      cnpj: "88.777.666/0001-11",
      email: "contato@agilpag.com",
      phone: "(51) 90000-0000",
      address: "Rua Fictícia, 10, Porto Alegre, RS",
      assets: [
        {
          id: "23",
          name: "Cluster de Servidores Virtuais",
          description:
            "Conjunto de hosts ESXi para virtualização crítica de serviços bancários",
          serialNumber: "VMW-ESX-023",
        },
        {
          id: "24",
          name: "Unidade de Fita LTO-8",
          description: "Equipamento para backup de longo prazo",
          serialNumber: "LTO-UNIT-024",
        },
        {
          id: "25",
          name: "Switch Core Juniper EX9200",
          description: "Switch de núcleo da rede",
          serialNumber: "JUNIPER-EX-025",
        },
      ],
      services: [
        {
          id: "os-id-10-1",
          description:
            "Expansão de Storage do Cluster. Adição de mais 5TB de armazenamento no SAN para o cluster de virtualização.",
          status: "Em Andamento",
          createdAt: "2025-09-28T09:00:00.000Z",
          clientId: "10",
          clientAssetId: "23",
        },
        {
          id: "os-id-10-2",
          description:
            "Auditoria de Segurança (Pentest). Teste de penetração externo na API de pagamentos.",
          status: "Agendado",
          createdAt: "2025-10-05T10:00:00.000Z",
          clientId: "10",
          clientAssetId: null,
        },
        {
          id: "os-id-10-3",
          description:
            "Manutenção na Unidade de Fita. Limpeza do cabeçote e testes de leitura/escrita.",
          status: "Concluído",
          createdAt: "2025-09-19T14:00:00.000Z",
          clientId: "10",
          clientAssetId: "24",
        },
        {
          id: "os-id-10-4",
          description:
            "Atualização de Firmware do Switch Core. Aplicação de patch de segurança no switch Juniper.",
          status: "Concluído",
          createdAt: "2025-09-02T16:00:00.000Z",
          clientId: "10",
          clientAssetId: "25",
        },
      ],
    },
  ];

  return (
    <ClientsContext.Provider value={{clients}}>
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients(){
    return useContext(ClientsContext)
}