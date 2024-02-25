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

  it('Ao chamar o método createSaleProduct na rota POST /sales, deve retornar um objeto', async function () {
    const expectedSaleProduct = { saleId: 1, productId: 2, quantity: 3 };
    sinon.stub(salesModel, 'createSaleProduct').resolves(expectedSaleProduct);

    const result = await salesServices.createSaleProduct(1, 2, 3);

    expect(result).to.deep.equal(expectedSaleProduct);
  });

  // it('Ao chamar o método saleBodyResponse, este deve interagir com os métodos createId e createSaleProduct', async function () {
  //   const saleBody = [
  //     { product1: 1, quantity: 2 },
  //     { product2: 3, quantity: 4 },
  //   ];

  //   const expectSaleId = 1;

  //   const createIdStub = sinon.stub(salesServices, 'createId').resolves(expectSaleId);
  //   const createSaleProductStub = sinon.stub(salesServices, 'createSaleProduct').resolves();

  //   await salesServices.saleBodyReponse(saleBody);

  //   sinon.assert.calledOnce(createIdStub);
  //   sinon.assert.calledTwice(createSaleProductStub);
  //   expect(createSaleProductStub.firstCall.args).to.eql([expectSaleId, 1, 2]);
  //   expect(createSaleProductStub.secondCall.args).to.eql([expectSaleId, 3, 4]);
  // });
});