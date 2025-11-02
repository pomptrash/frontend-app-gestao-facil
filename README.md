
# 📱 Gestão Fácil — App Mobile

[![Expo](https://img.shields.io/badge/Expo-49.0.0-1B1F23?logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB?logo=react)](https://reactnative.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Axios](https://img.shields.io/badge/Axios-HTTP-blue?logo=axios)](https://axios-http.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange)](https://jwt.io/)

> Aplicativo mobile desenvolvido com **Expo/React Native** para **gestão de clientes, ativos e ordens de serviço (OS)**.  
> Inclui **autenticação JWT**, **controle de acesso por cliente**, **navegação fluida** (tabs/stacks) e integração com o backend [Gestão Fácil API](https://github.com/EricofreitasNeto/GestaoFacil).

---

## 🚀 Funcionalidades

- 🔐 **Autenticação JWT** (login, registro e persistência de sessão)
- 🏢 **Clientes** — listagem, cadastro e vínculo com ativos e OS
- ⚙️ **Ativos** — cadastro vinculado a local e cliente
- 🧰 **Ordens de Serviço (OS)** — listagem global e por cliente/ativo, criação e conclusão
- 📍 **Locais** — seleção e associação em novos ativos
- 🌓 **Tema claro/escuro** dinâmico via Context API
- 🧭 **Navegação moderna** com React Navigation (Tabs + Stacks)
- 🔄 **Atualização automática** ao retornar às telas (`useFocusEffect`)

---

## 🧩 Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|------------|
| ⚛️ **Expo + React Native** | Base do app mobile multiplataforma |
| 🧭 **React Navigation** | Navegação em abas e pilhas |
| 🌐 **Axios** | Cliente HTTP com interceptors JWT |
| 💾 **AsyncStorage / SecureStore** | Persistência local segura |
| 🧠 **React Context API** | Controle global de autenticação, tema e dados |
| ⚙️ **dotenv** | Configuração de variáveis de ambiente (`EXPO_PUBLIC_API_URL`) |

---

## ⚙️ Requisitos

- Node.js **v18+**
- Expo CLI (`npm install -g expo-cli`)
- Backend **Gestão Fácil API** em execução (local ou remoto)

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_API_URL=https://seu-backend.exemplo.com
````

> O `src/service/api.js` resolve automaticamente a `baseURL` conforme a plataforma:
>
> * Android emulador → `http://10.0.2.2:3000`
> * iOS simulador → `http://localhost:3000`

---

## 🛠️ Como Executar

1️⃣ Instalar dependências

```bash
npm install
```

2️⃣ Iniciar o servidor de desenvolvimento

```bash
npm start
```

3️⃣ Executar o app

* **Expo Go (QR Code)**
* **Android Studio**
* **Xcode (iOS)**

> **Scripts úteis (package.json):**

```bash
npm run start
npm run android
npm run ios
npm run web
```

---

## 🧱 Estrutura do Projeto

```bash
src/
  routes/
    index.js
    stack.routes.js
    tab.routes.js
  screens/
    Auth/ (Login, SignUp)
    Clients/ (lista, ativos, OS, novo cliente)
    Clients/ClientAssets/NewAsset/
    Clients/ServiceOrders/
    Assets/
    Locations/
    ServiceTypes/
    Users/
    Home/
    Options/
  contexts/
    auth/
    clients/
    serviceOrders/
    theme/
  service/
    api.js
    tokenService.js
    authService.js
    clienteService.js
    ativoService.js
    servicoService.js
    localService.js
  components/
    Button.js
    Input.js
    ClientCard.js
    Loading.js
```

---

## 🌐 Navegação

### **Stacks e Abas**

| Stack         | Telas                                       | Descrição                |
| ------------- | ------------------------------------------- | ------------------------ |
| **AuthStack** | Login, SignUp                               | Controle de autenticação |
| **AppTabs**   | Dashboard, Clientes, Serviços, Ativos, Mais | Navegação principal      |
| **MaisStack** | Locais, Tipos de Serviço, Usuários (admin)  | Módulos adicionais       |

---

## 🔒 Autenticação e Segurança

* `AuthContext` gerencia o estado global:

  ```js
  { user, isAuthenticated, login, logout, checkAuth }
  ```
* `tokenService` armazena localmente:

  * `userToken`, `userEmail`, `userRole`, `userId`, `userClientId`
* `api.js` injeta o cabeçalho `Authorization: Bearer <token>`
* Erro **401 Unauthorized** → sessão limpa e retorno automático ao login

---

## 🧠 Escopo por Cliente

Se o token JWT contiver `clientId` (ou `clienteId`), o app restringe:

* Listagens de **Clientes, Ativos e Serviços**
* Criação de OS com vínculo automático a `clienteId`

---

## 📡 Endpoints Esperados (Backend)

| Módulo       | Método | Rota                               | Descrição              |
| ------------ | ------ | ---------------------------------- | ---------------------- |
| **Auth**     | POST   | `/auth/login`                      | Login com e-mail/senha |
|              | POST   | `/auth/register`                   | Registro de usuário    |
| **Clientes** | CRUD   | `/v1/clientes`                     | Gestão de clientes     |
| **Ativos**   | CRUD   | `/v1/ativos?clienteId=`            | Gestão de ativos       |
| **Serviços** | CRUD   | `/v1/servicos?clienteId=&ativoId=` | Ordens de serviço      |
| **Locais**   | GET    | `/v1/locais`                       | Seleção de locais      |

---

## 🔄 Fluxos Principais

### 👥 **Clientes**

* Listagem filtrada (por escopo de cliente do usuário)
* Cadastro com validação de campos obrigatórios

### ⚙️ **Ativos**

* Lista global ou por cliente
* Cadastro requer `localId` e `clienteId`

### 🧰 **Ordens de Serviço**

* Listagem global ou filtrada (cliente/ativo)
* Criação, edição e conclusão com badges de status

---

## 🧩 Convenções e Boas Práticas

* **Services** normalizam campos do backend → frontend (`numero_serie → numeroSerie`)
* Evite usar dados brutos; use campos mapeados
* Utilize `useFocusEffect` para recarregar dados ao voltar às telas
* Centralize requisições no `api.js` com interceptors e timeout

---

## 🗺️ Roadmap

* [ ] Paginação e busca **server-side**
* [ ] Telas de **detalhe** para Ativos e OS
* [ ] CRUD completo de **Tipos de Serviço** e **Usuários (admin)**
* [ ] Armazenamento seguro com **SecureStore (Expo)**
* [ ] Upload de imagens (ativos/usuários)

---

## 👨‍💻 Autor

**Érico de Freitas Neto**
📍 Líder Técnico em Sistemas Embarcados e Videomonitoramento
🔗 [GitHub – EricofreitasNeto](https://github.com/EricofreitasNeto)
📧 [Email – Erico de Freitas Neto](mailto:erico@exemplo.com)
🧠 [LinkedIn – Erico de Freitas Neto](https://www.linkedin.com/in/erico-neto-4b424473/)

---

## 🧾 Licença

Este projeto está sob a licença **MIT**.
Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 💬 Preview

<p align="esquerda">
  <img src="https://img.shields.io/badge/React%20Navigation-Tabs%20%2B%20Stacks-blue?logo=react" alt="Navegação">
  <br/>
  <img src="https://img.shields.io/badge/Theme-Claro%2FEscuro-green" alt="Tema">
  <br/>
  <img src="https://img.shields.io/badge/API-RESTful-lightgrey" alt="API">
</p>

---

> 📦 Repositório complementar:
> [👉 Gestão Fácil Backend (API REST)](https://github.com/EricofreitasNeto/GestaoFacil)

---

