const chai = require('chai');
const sinon = require('sinon');
// const connection = require('../../../src/models/connection');
const salesServices = require('../../../src/services/sales.services');
const salesModel = require('../../../src/models/sales.model');

const { expect } = chai;

describe('salesService', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Ao chamar o método searchById na rota GET /sales/:id com um id de produto inexistente, deve retornar um objeto com status NOT_FOUND e uma mensagem de err', async function () {
    const id = 1;
    sinon.stub(salesModel, 'findById').resolves(null || undefined || []);

    const result = await salesServices.searchById(id);

    expect(result).to.deep.equal({ 
      status: 'NOT_FOUND', 
      data: { message: 'Sale not found' }, 
    });
  });

  it('Ao chamar o método update na rota GET /product/:id com um id de produto válido, deve retornar um array', async function () {
    // Arranjo
    const products = [
      {
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      },
      {
        date: '2021-09-09T04:54:54.000Z',
        productId: 2,
        quantity: 2,
      },
    ];
    sinon.stub(salesModel, 'findById').resolves(products);
  
    // Ação
    const result = await salesServices.searchById();
  
    // Assertiva
    expect(result).to.deep.equal(products);
  });

  it('Ao chamar o método createId na rota POST /sales, deve retornar um id', async function () {
    const expectedSaleId = 1;
    sinon.stub(salesModel, 'create').resolves(expectedSaleId);

    const result = await salesServices.createId();

    expect(result).to.equal(expectedSaleId);
  });
});