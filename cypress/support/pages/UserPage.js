class UserPage {
    elements = {
        nameInput: () => cy.get('[data-testid="nome"]'),
        emailInput: () => cy.get('[data-testid="email"]'),
        passwordInput: () => cy.get('[data-testid="password"]'),
        submitBtn: () => cy.get('[data-testid="cadastrarUsuario"]'),
        tableRow: (email) => cy.contains('td', email)
    }

    registerUser(user) {
        this.elements.nameInput().type(user.nome);
        this.elements.emailInput().type(user.email);
        this.elements.passwordInput().type(user.senha);
        this.elements.submitBtn().click();
    }

    validateUserInList(email) {
        cy.url().should('include', '/admin/listarusuarios');
        this.elements.tableRow(email).should('be.visible');
    }

    deleteUser(email) {
        // Lógica robusta: Encontra a linha do email e busca o botão excluir daquela linha
        this.elements.tableRow(email)
            .closest('tr')
            .contains('button', 'Excluir')
            .click();
    }

    validateUserDeletion(email) {
        this.elements.tableRow(email).should('not.exist');
    }
}

export default new UserPage();