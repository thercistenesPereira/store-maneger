const chai = require('chai');
const sinon = require('sinon');
// const connection = require('../../../src/models/connection');
const productServices = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');

const { expect } = chai;

describe('productsService', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Ao chamar o método update na rota GET /product/:id com um id de produto inexistente, deve retornar um objeto com status NOT_FOUND e uma mensagem de erro', async function () {
  // Arranjo
    const id = 1;
    sinon.stub(productsModel, 'findById').resolves(null);

    // Ação
    const result = await productServices.update(id);

    // Assertiva
    expect(result).to.deep.equal({ 
      status: 'NOT_FOUND', 
      data: { message: 'Product not found' }, 
    });
  });

  it('Ao chamar o método update na rota GET /product/:id com um id de produto válido, deve retornar um array', async function () {
    // Arranjo
    const products = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
    ];
    sinon.stub(productsModel, 'findById').resolves(products);
  
    // Ação
    const result = await productServices.update();
  
    // Assertiva
    expect(result).to.deep.equal(products);
  });

  it('Função updateName deve retornar um objeto com status BAD_REQUEST e uma mensagem de erro quando o nome do produto não for informado', async function () {
    const result = await productServices.updateName(null);
    expect(result).to.deep.equal({
      status: 'BAD_REQUEST',
      data: { message: '"name" is required' },
    });
  });
});