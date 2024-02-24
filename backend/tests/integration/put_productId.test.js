const chai = require('chai');
const app = require('../../src/app');

const { expect } = chai; 

describe('PUT /products/:id', function () {
  it('Ao tentat cadastrar um produdo que não existe que não existe retorna um status 404 e uma mensagem de erro', async function () {
    // Arranjo
    const product = {
      name: 'ProdutoX',
    };

    // Ação
    const response = await chai.request(app)
      .put('/products/-9999')
      .send(product);

    // Assertiva
    expect(response.status).to.be.equal(404);
    expect(response.body).to.deep.equal({ message: 'Product not found' });
  });
});