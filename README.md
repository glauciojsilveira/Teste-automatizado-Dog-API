# 🐶 Testes de Qualidade de API - Dog API (Cypress)

Este projeto contém um conjunto de testes automatizados desenvolvido em Cypress para validar a integração com a Dog API

## 🎯 Objetivos do Teste

Garantir que os endpoints retornem o **Status Code 200** para requisições válidas.
Validar que a estrutura JSON da resposta (`status: success` e `message` como objeto/array/string) está correta.
Testar cenários negativos (ex: pesquisa de raça inexistente).
Validar a integridade das URLs de imagem retornadas.

## 🛠️ Requisitos de Configuração

Você precisa ter o **Node.js** (versão LTS recomendada) instalado em seu ambiente.

## 💻 Configuração e Instalação

Passo 1 - Instale o Node.Js
Siga os passos abaixo para configurar o ambiente de automação.
Certifique-se de que o Node.js está instalado.
Passo 2 - No terminal digite:
npm init -y
Passo 3 - Instale o Cypress como uma dependência de desenvolvimento:
npm install cypress --save-dev
Passo 4 - Execute o comando abaixo para abrir o Test Runner do Cypress:
npx cypress open
Passo 5 - Selecione E2E Testing.
Passo 6 - Escolha o navegador desejado.Selecione E2E Testing. de preferencia ao Electron
Passo 7 - Outra oppção Se desejar executar todos os testes no modo silencioso sem interface grafica:
no prompt digite npx cypress run --spec "cypress/e2e/dog_api.cy.js"

## By Glaucio José Silveira
