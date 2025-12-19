class ServerestService {
  
  // Getter para recuperar a URL da API configurada no cypress.config.js
  get API_URL() {
    return Cypress.env('apiBaseUrl');
  }

  cadastrarUsuario(usuario) {
    return cy.request({
      method: 'POST',
      url: `${this.API_URL}/usuarios`,
      body: usuario,
      failOnStatusCode: false // Permite validar erros (400, 401) no teste
    });
  }

  login(email, password) {
    return cy.request({
      method: 'POST',
      url: `${this.API_URL}/login`,
      body: { email, password },
      failOnStatusCode: false
    });
  }

  cadastrarProduto(produto, token) {
    return cy.request({
      method: 'POST',
      url: `${this.API_URL}/produtos`,
      headers: { authorization: token },
      body: produto,
      failOnStatusCode: false
    });
  }

  deletarProduto(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${this.API_URL}/produtos/${id}`,
      headers: { authorization: token },
      failOnStatusCode: false
    });
  }

  deletarUsuario(id) {
    return cy.request({
      method: 'DELETE',
      url: `${this.API_URL}/usuarios/${id}`,
      failOnStatusCode: false
    });
  }
}

export default new ServerestService();