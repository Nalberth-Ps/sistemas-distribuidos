# Sistemas Distribuídos

Este é um projeto para a disciplina de Sistemas Distribuídos, utilizando Rollup e TypeScript.

## Descrição

Este projeto é uma aplicação que utiliza Rollup para empacotar módulos JavaScript e TypeScript. A configuração inclui suporte para TypeScript, PostCSS, e um servidor de desenvolvimento com recarregamento ao vivo.

## Funcionalidades da Primeira Entrega

A versão para a primeira entrega do projeto realiza as seguintes funcionalidades:

  - Captura dados de um formulário.
  - Realiza uma validação simples dos dados recebidos.
  - Exibe os dados no console.
  - Reseta o formulário após a submissão.

## Pré-requisitos

Certifique-se de ter a versão correta do Node.js instalada para evitar problemas de compatibilidade:

- Node.js: `^18.18.0 || >=20.0.0`

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Nalberth-Ps/sistemas-distribuidos.git
cd sistemas-distribuidos
npm install
```

## Uso

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Para criar uma versão de produção:

```bash
npm run build
```

## Scripts

| Comando          | Descrição                                          |
| ---------------- | -------------------------------------------------- |
| `npm run dev`    | Inicia o servidor de desenvolvimento               |
| `npm run build`  | Cria uma versão de produção                        |
| `npm run serve`  | Inicia um servidor local para a versão de produção |
| `npm run lint`   | Executa o linter                                   |
| `npm run format` | Formata o código                                   |
