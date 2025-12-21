# 🚀 Execução dos Testes Automatizados (GitHub Actions)

Este projeto utiliza GitHub Actions para executar os testes automatizados com Cypress de forma manual, permitindo que qualquer pessoa rode a pipeline.

## ▶️ Como executar os testes manualmente

Acesse o repositório no GitHub

Clique na aba Actions

Selecione o workflow “Cypress - Execução Manual”

Clique no botão Run workflow

Escolha a branch desejada

Clique novamente em Run workflow

A execução iniciará automaticamente e você poderá acompanhar os logs em tempo real.

## Sobre automação e os cenários.

### 1. Resumo dos Cenários (Escopo de Teste)
A automação cobre três fluxos críticos da aplicação ServerRest, focando em Sanidade (Sanity) e Regressão:

Login Negativo (Segurança/UX): Valida se o sistema bloqueia o acesso com credenciais inexistentes e exibe a mensagem de erro correta ("Email e/ou senha inválidos"), garantindo que o usuário permaneça na tela de login.

Ciclo de Vida de Usuário (CRUD): Simula um administrador logado que cadastra um novo usuário comum, valida sua presença na listagem e, em seguida, o exclui para manter a base limpa. Garante que o fluxo administrativo de gestão de pessoas está funcional.

Ciclo de Vida de Produto (CRUD + Upload): Simula o cadastro de um produto com upload de imagem, validação de dados na tabela e exclusão subsequente. Testa a integração de formulários complexos e manipulação de arquivos.

### 2. Destaques da Implementação Técnica
A solução foi evoluída de um script simples para uma arquitetura robusta e escalável:

Design Pattern (POM): Aplicação do Page Object Model. A lógica de interação com a UI (cliques, 'types') foi separada da lógica de teste (assertivas), facilitando a manutenção caso os seletores mudem.

Independência de Dados: Uso de geração dinâmica de massa (Date.now()) para garantir que os testes nunca falhem por conflito de registros duplicados (ex: email já cadastrado).

Segurança: Credenciais sensíveis (usuário/senha do Admin) foram movidas para cypress.config.js (Variáveis de Ambiente), retirando dados críticos do código-fonte dos testes.

Robustez: Implementação de seletores inteligentes (ex: buscar o botão "Excluir" relativo à linha exata do usuário criado) para evitar falsos positivos ou exclusão de registros errados.
