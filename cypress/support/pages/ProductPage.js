class ProductPage {
    elements = {
        nameInput: () => cy.get('[data-testid="nome"]'),
        priceInput: () => cy.get('[data-testid="preco"]'),
        descriptionInput: () => cy.get('[data-testid="descricao"]'),
        quantityInput: () => cy.get('[data-testid="quantity"]'),
        imageInput: () => cy.get('[data-testid="imagem"]'),
        submitBtn: () => cy.get('[data-testid="cadastarProdutos"]'),
        tableRow: (name) => cy.contains('td', name)
    }

    registerProduct(product) {
        this.elements.nameInput().type(product.nome);
        this.elements.priceInput().type(product.preco);
        this.elements.descriptionInput().type(product.descricao);
        this.elements.quantityInput().type(product.quantidade);
        
        // Verifica se a imagem foi passada antes de tentar upload
        if(product.imagemPath) {
            this.elements.imageInput().selectFile(product.imagemPath);
        }

        this.elements.submitBtn().click();
    }

    validateProductInList(productName) {
        cy.url().should('include', '/admin/listarprodutos');
        this.elements.tableRow(productName).should('be.visible');
    }

    deleteProduct(productName) {
        this.elements.tableRow(productName)
            .closest('tr')
            .find('.btn-danger') // Busca botão de deletar (vermelho) na linha
            .click();
    }

    validateProductDeletion(productName) {
        this.elements.tableRow(productName).should('not.exist');
    }
}

export default new ProductPage();