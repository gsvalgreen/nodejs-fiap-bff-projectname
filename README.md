# FIAP BFF (Node.js + Express)

Este projeto é um Backend For Frontend (BFF) construído com Node.js e Express, com integração a modelo generativo, CORS, rate limit e observabilidade com New Relic.

## Como executar localmente

### 1) Pré-requisitos

- Node.js instalado (recomendado: versão 24, mesma versão do workflow de deploy)
- npm

### 2) Instalação

```bash
npm install
```

### 3) Configuração de ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo.

```env
GEMINI_API_KEY=seu_token
PORT=3000
NEW_RELIC_APP_NAME=fiap-bff-local
NEW_RELIC_LICENSE_KEY=sua_chave_new_relic
```

### 4) Subir aplicação

```bash
npm start
```

## ENVs necessárias

- `GEMINI_API_KEY` (obrigatória): token para autenticação nas chamadas do serviço generativo.
- `PORT` (opcional): porta do servidor local. Valor padrão: `3000`.
- `NEW_RELIC_APP_NAME` (recomendada): nome da aplicação no painel do New Relic.
- `NEW_RELIC_LICENSE_KEY` (necessária para envio de telemetria): chave de licença do New Relic.

## URLs de acesso local

Considerando `PORT=3000`:

- API base: `http://localhost:3000`
- Health check: `http://localhost:3000/health`
- Endpoint principal: `http://localhost:3000/ask`

## New Relic

O projeto já possui a dependência e configuração base do New Relic:

- Dependência instalada: `newrelic`
- Inicialização no bootstrap da aplicação em `src/app.js` com `require('newrelic')`
- Arquivo de configuração na raiz: `newrelic.js`
- Captura de erro customizada no endpoint `/ask` com `newrelic.noticeError(...)`

## Ambiente onde a aplicação está rodando

- Ambiente de produção: [**Render**](https://render.com)
- Pipeline de deploy: **GitHub Actions** (`.github/workflows/deploy.yml`)
- Gatilho de deploy: push na branch `main`

## URL de acesso no Render

- URL base: `https://nodejs-fiap-bff-projectname.onrender.com`
- Health check público: `https://nodejs-fiap-bff-projectname.onrender.com/health`
- Endpoint principal no render: `https://nodejs-fiap-bff-projectname.onrender.com/ask`