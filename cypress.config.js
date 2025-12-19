const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // URL principal para testes de interface (cy.visit)
    baseUrl: 'https://front.serverest.dev', 
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
    env: {
      // Credenciais do Admin (se necessário)
      adminEmail: 'doug@outlook.com', 
      adminPassword: 'douglas123',
      
      // NOVA VARIÁVEL: URL específica para os serviços da API
      apiBaseUrl: 'https://serverest.dev' 
    }
  },
});