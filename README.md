# Gestão Fácil — App Mobile

Aplicativo mobile (Expo/React Native) para gestão de Clientes, Ativos e Ordens de Serviço (OS), com autenticação via JWT, controle de acesso por cliente e navegação fluida em abas/stacks.

---

## Funcionalidades

- Autenticação (Login/Registro) com persistência de sessão (JWT)
- Clientes: listagem, cadastro e navegação para ativos e OS
- Ativos: listagem (com escopo por cliente) e criação vinculada a Local
- Ordens de Serviço: listagem global/por cliente/por ativo, criação, atualização e conclusão
- Locais: listagem para seleção no cadastro de Ativo
- Navegação moderna com React Navigation (Tabs + Stacks)
- Tema claro/escuro e componentes reutilizáveis

---

## Tecnologias

- Expo + React Native
- React Navigation (stack + bottom-tabs)
- Axios (interceptors com JWT)
- AsyncStorage (persistência de token); suporte a SecureStore opcional
- React Context (Auth, Theme, Clients, ServiceOrders)

---

## Requisitos e Variáveis de Ambiente

- Node.js 18+
- Expo CLI
- Backend disponível com rotas REST (ver Endpoints)

Arquivo .env na raiz:

`
EXPO_PUBLIC_API_URL=https://seu-backend.exemplo.com
`

src/service/api.js resolve a aseURL a partir de EXPO_PUBLIC_API_URL e faz fallback por plataforma (ex.: Android emulador → 10.0.2.2:3000).

---

## Como Executar

1) Instalar dependências

`
npm install
`

2) Iniciar o app

`
npm start
`

3) Abrir em dispositivo/emulador

- Expo Go (QR code)
- Android Studio / Xcode

Scripts úteis (package.json): start, ndroid, ios, web.

---

## Estrutura do Projeto (resumo)

`
src/
  routes/
    index.js
    stack.routes.js
    tab.routes.js
  screens/
    Auth/ (Login, SignUp)
    Clients/ (lista, ativos, OS, novo cliente)
    Clients/ClientAssets/NewAsset/ (cadastro de ativo com local)
    Clients/ServicesOrders/ (lista/criar/editar OS)
    Assets/ (lista global por escopo)
    Locations/ (lista para seleção)
    ServiceTypes/ (placeholder)
    Users/ (placeholder admin)
    Home/, Options/
  contexts/
    auth/, clients/, serviceOrders/, theme/
  service/
    api.js, authService.js, tokenService.js
    clienteService.js, ativoService.js, servicoService.js, localService.js
  components/ (Button, Input, ClientCard, Loading ...)
`

---

## Navegação

- Auth Stack: Login, SignUp
- App Tabs:
  - Dashboard (Home)
  - Clientes (lista e busca)
  - Serviços (lista global; filtra por cliente/ativo quando navegada por contexto)
  - Ativos (lista por escopo do cliente do usuário)
  - Mais (submenu: Locais, Tipos de Serviço, Usuários admin)

---

## Autenticação e Segurança

- AuthContext expõe user, isAuthenticated, login, logout, checkAuth
- 	okenService persiste userToken, userEmail, userRole, userId, userClientId
- pi.js injeta Authorization: Bearer <token> e, em 401, limpa sessão e notifica listeners

Escopo por cliente: se o JWT contiver clienteId/clientId, o app restringe listagens/CRUD a esse cliente (Clientes, Ativos, Serviços).

---

## Endpoints (esperados no backend)

- Autenticação: POST /auth/login, POST /auth/register
- Clientes: GET /v1/clientes, GET /v1/clientes/:id, POST /v1/clientes, PUT /v1/clientes/:id, DELETE /v1/clientes/:id
- Ativos: GET /v1/ativos?clienteId=, POST /v1/ativos (payload com 
ome, clienteId, localId)
- Serviços: GET /v1/servicos?clienteId=&ativoId=, POST /v1/servicos, PUT /v1/servicos/:id
- Locais: GET /v1/locais

---

## Fluxos Principais

- Clientes
  - Lista filtrável; se user.clientId existir, mostra apenas o cliente do usuário
  - Cadastro com validação de nome, CNPJ e e-mail de contato (opcional)

- Ativos
  - Lista por cliente (via Clients → Ativos) ou global com escopo (aba Ativos)
  - Cadastro exige selecionar um Local (localId) e vincula clienteId

- Ordens de Serviço
  - Lista global (aba Serviços) ou filtrada por cliente/ativo quando navegada de um contexto
  - Criar/editar/concluir; badge de status e datas (agendada/conclusão)

---

## Convenções rápidas

- Services mapeiam campos de backend para o front (ex.: 
ome → 
ame), preservando originais
- Evite acessar 
ome diretamente nas telas novas; prefira 
ame (ou 
ame || nome para compatibilidade)
- Use useFocusEffect para refetch ao voltar a uma lista

---

## Roadmap

- Paginação e busca server-side em Ativos e Serviços
- Detalhes (modais) para Ativo e OS
- CRUD completo de Tipos de Serviço e Usuários (admin)
- Migração de token para SecureStore (Expo)
