class LoginPage {
    // Seletores encapsulados
    elements = {
        emailInput: () => cy.get('[data-testid="email"]'),
        passwordInput: () => cy.get('[data-testid="senha"]'),
        loginBtn: () => cy.get('[data-testid="entrar"]'),
        alertMessage: () => cy.contains('Email e/ou senha inválidos')
    }

    visit() {
        cy.visit('/login');
    }

    submitLogin(email, password) {
        this.elements.emailInput().type(email);
        this.elements.passwordInput().type(password);
        this.elements.loginBtn().click();
    }

    verifyErrorMessage() {
        this.elements.alertMessage().should('be.visible');
    }
}

export default new LoginPage();