export default {
  gerarUsuario() {
    const randomId = Date.now();
    return {
      nome: 'QA Tester Full',
      email: `qa_full_${randomId}@email.com`,
      password: 'teste',
      administrador: 'true'
    };
  },

  gerarProduto() {
    const randomId = Date.now();
    return {
      nome: `Produto Teste ${randomId}`,
      preco: 200,
      descricao: 'Teclado Mecânico Gamer',
      quantidade: 5
    };
  }
};