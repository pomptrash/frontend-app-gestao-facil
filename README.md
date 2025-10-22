# 📱 Gestão Fácil App

Aplicativo móvel desenvolvido em **React Native**, focado na **gestão de clientes, ativos e ordens de serviço (OS)**.
O projeto integra autenticação de usuários, cadastro de clientes e serviços, e comunicação com uma API backend.

---

## 🚀 Funcionalidades Principais

* **Autenticação** de usuários (login e cadastro)
* **Gerenciamento de clientes** (listagem, cadastro, edição)
* **Gestão de ativos** por cliente
* **Criação e acompanhamento de ordens de serviço (OS)**
* **Navegação moderna** com rotas em abas e pilha (`react-navigation`)
* **Temas dinâmicos** (modo claro/escuro)
* **Feedback visual** com componentes reutilizáveis
* **Integração com API REST**

---

## 🧩 Estrutura de Pastas (Diagrama)

```text
estrutura_projeto_app/
├── App.js
├── index.js
├── app.json
├── package.json
├── package-lock.json
├── .gitignore
└── src/
    ├── components/
    │   ├── Button/
    │   ├── ClientCard/
    │   ├── Input/
    │   └── Loading/
    │
    ├── contexts/
    │   ├── clients/
    │   └── theme/
    │
    ├── hooks/
    │   └── useAuth.js
    │
    ├── routes/
    │   ├── index.js
    │   ├── stack.routes.js
    │   └── tab.routes.js
    │
    ├── screens/
    │   ├── Auth/
    │   ├── Home/
    │   ├── Clients/
    │   │   ├── ClientAssets/
    │   │   ├── NewClient/
    │   │   └── ServicesOrders/
    │   └── Options/
    │
    └── service/
        ├── api.js
        ├── authService.js
        ├── clienteService.js
        ├── servicoService.js
        └── tokenService.js
```

---

## 🧠 Contextos e Hooks

| Contexto           | Descrição                                          |
| ------------------ | -------------------------------------------------- |
| **ClientsContext** | Armazena e gerencia os dados de clientes e ativos. |
| **ThemeContext**   | Controla modo claro/escuro.                        |
| **useAuth**        | Gerencia sessão, login, logout e tokens.           |

---

## ⚙️ Integração com API

O app utiliza serviços em `src/service/` para se comunicar com o backend via **Axios**.

Endpoints esperados:

* `/auth/login`
* `/auth/register`
* `/clientes`
* `/servicos`
* `/ordens`

---

## 🛠️ Tecnologias Utilizadas

| Categoria                   | Tecnologias                     |
| --------------------------- | ------------------------------- |
| **Framework principal**     | React Native                    |
| **Navegação**               | React Navigation (Stack / Tabs) |
| **Gerenciamento de estado** | Context API                     |
| **Estilização**             | Styled Components               |
| **Requisições HTTP**        | Axios                           |
| **Autenticação**            | JWT                             |
| **Temas**                   | Context API + Styled Components |

---

## ▶️ Como Executar

1. **Instale as dependências**

   ```bash
   npm install
   ```
2. **Configure a API**

   ```js
   // src/service/api.js
   export const api = axios.create({
     baseURL: "http://<seu-servidor>:<porta>/api",
   });
   ```
3. **Inicie o app**

   ```bash
   npm start
   ```
4. **Execute em um emulador ou dispositivo físico**

   * via Expo Go (caso projeto use Expo)
   * ou via Android Studio / Xcode

---

## 🧪 Scripts Disponíveis

| Comando           | Descrição            |
| ----------------- | -------------------- |
| `npm start`       | Inicia o app         |
| `npm run android` | Executa no Android   |
| `npm run ios`     | Executa no iOS       |
| `npm run web`     | Executa no navegador |

---

## 📦 Dependências Principais

* react
* react-native
* react-navigation
* styled-components
* axios
* @react-navigation/native
* @react-navigation/stack
* @react-navigation/bottom-tabs

---

## 👨‍💻 Autores

**João**

Preencher aui joão
**Érico Freitas Neto**
Desenvolvedor Full Stack | Backend Flask e Node.js | Integrações IoT e Sistemas de Gestão

---

## 📝 Licença

Este projeto está licenciado sob a **MIT License**.
