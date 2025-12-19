import ServerestService from '../support/services/ServerestService';
import DataFactory from '../support/factories/DataFactory';

describe('Fluxo E2E Completo de API - Serverest', () => {

  const usuarioData = DataFactory.gerarUsuario();
  const produtoData = DataFactory.gerarProduto();

  it('Deve percorrer o ciclo de vida: Cadastro -> Login -> Produto -> Exclusão', function () {
    
    // ----------------------------------------------------------------
    // PASSO 1: Cadastrar Usuário
    // ----------------------------------------------------------------
    cy.log('1. Cadastrando novo usuário...');
    // CORREÇÃO: Trocamos .should() por .then()
    ServerestService.cadastrarUsuario(usuarioData).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Cadastro realizado com sucesso');
      
      // Agora o cy.wrap funciona corretamente pois está dentro de um .then()
      cy.wrap(response.body._id).as('usuarioId');
    });

    // ----------------------------------------------------------------
    // PASSO 2: Realizar Login
    // ----------------------------------------------------------------
    cy.log('2. Realizando login...');
    ServerestService.login(usuarioData.email, usuarioData.password).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Login realizado com sucesso');
      expect(response.body.authorization).to.exist;
      
      cy.wrap(response.body.authorization).as('authToken');
    });

    // ----------------------------------------------------------------
    // PASSO 3: Cadastrar Produto (Requer Token)
    // ----------------------------------------------------------------
    cy.get('@authToken').then((token) => {
      cy.log('3. Cadastrando produto...');
      
      ServerestService.cadastrarProduto(produtoData, token).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Cadastro realizado com sucesso');
        
        cy.wrap(response.body._id).as('produtoId');
      });
    });

    // ----------------------------------------------------------------
    // PASSO 4: Excluir Produto (Limpeza)
    // ----------------------------------------------------------------
    cy.get('@authToken').then((token) => {
      cy.get('@produtoId').then((produtoId) => {
        cy.log('4. Excluindo produto...');
        
        ServerestService.deletarProduto(produtoId, token).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Registro excluído com sucesso');
        });
      });
    });

    // ----------------------------------------------------------------
    // PASSO 5: Excluir Usuário (Limpeza Final)
    // ----------------------------------------------------------------
    cy.get('@usuarioId').then((usuarioId) => {
      cy.log('5. Excluindo usuário...');
      
      ServerestService.deletarUsuario(usuarioId).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Registro excluído com sucesso');
      });
    });

  });
});