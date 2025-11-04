# Bionic CodeChallenge

Este projeto é uma solução completa para o **Bionic CodeChallenge**, consistindo em uma **API Node.js** e uma **interface Vue.js** para exibir e filtrar alarmes gerados por dispositivos simulados.  
Os dados são salvos em **MongoDB** e exibidos em tempo real na interface.

---

## Desafio

Crie uma aplicação web capaz de:

- Receber dados de dispositivos (via API).
- Salvar os dados em um banco **MongoDB**.
- Exibir os alarmes recebidos em uma interface web.
- Permitir filtros por tipo de alarme e tipo de dispositivo.
- Atualizar automaticamente a interface conforme novos dados chegam.

### Dados recebidos pela API

Os dados são enviados via `POST` para o endpoint:

```
http://localhost:8082/alarm/
```

Formato do corpo (`body`):

```json
{
  "serial": "123456789",
  "type": 1,
  "checked": false,
  "deviceType": 5
}
```
---
### Estrutura do Projeto
```bash
bionic-codechallenge/
├─ backend/          # API Node.js + Express + Mongoose + Socket.IO
│  ├─ src/
│  │  ├─ models/     # Modelos do MongoDB
│  │  ├─ routes/     # Rotas da API
│  │  ├─ config.js   # Configurações gerais
│  │  └─ index.js    # Ponto de entrada da API
│  └─ package.json
│
├─ frontend/         # Aplicação Vue.js (Vite + socket.io-client)
│  ├─ src/
│  │  ├─ components/ # Componentes Vue
│  │  ├─ services/   # Comunicação com API e WebSocket
│  │  ├─ App.vue
│  │  └─ main.js
│  └─ package.json
│
└─ docker-compose.yml
```
---
### Tecnologias Utilizadas

#### Backend

- Node.js

- Express

- MongoDB + Mongoose

- Socket.IO (atualização em tempo real)

- CORS e Body-parser

#### Frontend

- Vue 3 (Composition API)

- Vite

- Axios

- Socket.IO Client
---
## Executando o Projeto

### Pré-requisitos
- Node.js (>= 18)

- npm

- MongoDB local ou via Docker

### Clonando o repositório

```bash
git clone https://github.com/p4tit0/bionic-codechallenge.git
cd bionic-codechallenge
```
---
### Subindo o MongoDB com Docker

```bash
docker compose up -d
```
---
### Executando o Backend

```bash
cd backend
npm install
npm run dev
```
---
### Executando o Frontend

```bash
cd frontend
npm install
npm run dev
```
---
## Testando com o Gerador de Alarmes
Na pasta `AlarmGenerator` fornecida pelo desafio:
```bash
cd AlarmGenerator
npm install
node index.js
```