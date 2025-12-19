class DashboardPage {
    elements = {
        menuCadastrarUsuarios: () => cy.get('[data-testid="cadastrar-usuarios"]'),
        menuCadastrarProdutos: () => cy.get('[data-testid="cadastrar-produtos"]'),
        headerTitle: () => cy.get('h1') // Ex: Bem Vindo
    }

    validateLoginSuccess() {
        cy.url().should('include', '/admin/home');
    }

    goToUserRegistration() {
        this.elements.menuCadastrarUsuarios().click();
    }

    goToProductRegistration() {
        this.elements.menuCadastrarProdutos().click();
    }
}

export default new DashboardPage();