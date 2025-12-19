import Login from '../support/pages/LoginPage';
import Dashboard from '../support/pages/DashboardPage';
import UserPage from '../support/pages/UserPage';
import ProductPage from '../support/pages/ProductPage';

describe('Fluxos de Autenticação e Administração', () => {

    // Helper para dados dinâmicos
    const timestamp = Date.now();

    context('Autenticação', () => {
        it('Não deve permitir login com credenciais inválidas', () => {
            Login.visit();
            Login.submitLogin(`errado_${timestamp}@teste.com`, 'senha_errada');
            
            Login.verifyErrorMessage();
            cy.url().should('not.include', '/home');
        });
    });

    context('Administração (Requer Login)', () => {
        
        // Hook: Executa antes de CADA teste deste contexto
        beforeEach(() => {
            // Recupera credenciais do cypress.config.js ou env
            const adminEmail = Cypress.env('adminEmail');
            const adminPass = Cypress.env('adminPassword');

            Login.visit();
            Login.submitLogin(adminEmail, adminPass);
            Dashboard.validateLoginSuccess();
            
            // Define viewport padrão para desktop
            cy.viewport(1280, 720);
        });

        it('Deve criar um usuário via admin e excluir em seguida', () => {
            const userData = {
                nome: `User Teste ${timestamp}`,
                email: `user.${timestamp}@qa.com`,
                senha: '123'
            };

            Dashboard.goToUserRegistration();
            
            UserPage.registerUser(userData);
            UserPage.validateUserInList(userData.email);
            
            UserPage.deleteUser(userData.email);
            UserPage.validateUserDeletion(userData.email);
        });

        it('Deve criar um produto com imagem e excluir em seguida', () => {
            const productData = {
                nome: `Notebook Pro ${timestamp}`,
                preco: '5000',
                descricao: 'Notebook de Alta Performance',
                quantidade: '5',
                imagemPath: 'cypress/fixtures/produto.jpg' // Certifique-se que o arquivo existe
            };

            Dashboard.goToProductRegistration();

            ProductPage.registerProduct(productData);
            ProductPage.validateProductInList(productData.nome);

            ProductPage.deleteProduct(productData.nome);
            ProductPage.validateProductDeletion(productData.nome);
        });
    });
});


