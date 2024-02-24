const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');

const { expect } = chai; 

describe('salesModel', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Ao chamar o método findById deve retornar as vendas relativas so Id único passado como parâmentro', async function () {
    // Arranjo
    const dateTest = '2021-09-09T04:54:29.000Z';
    sinon.stub(connection, 'execute')
      .resolves([[
        {
          date: dateTest,
          productId: 1,
          quantity: 2,
        },
        {
          date: dateTest,
          productId: 2,
          quantity: 2,
        },
      ]]);
    // Ação
    const salesFound = await salesModel.findById(1);

    // Assertiva
    expect(salesFound).to.deep.eq([
      {
        date: dateTest,
        productId: 1,
        quantity: 2,
      },
      {
        date: dateTest,
        productId: 2,
        quantity: 2,
      },
    ]);
  });

  it('Ao chamar o método create deve inserir uma nova venda e retornar o id da venda inserida', async function () {
    // Arranjo
    sinon.stub(connection, 'execute')
      .resolves([{ insertId: 1 }]);
    const saleId = 1;
    const date = '2021-09-09T04:54:29.000Z';
  
    // Ação
    const insertId = await salesModel.create(saleId, date);
  
    // Assertiva
    expect(insertId).to.equal(1);
  });

  it('Ao chamar o método createSaleProduct deve inserir um novo produto na venda e não retornar nada', async function () {
    // Arranjo
    const saleId = 1;
    const productId = 2;
    const quantity = 3;
    sinon.stub(connection, 'execute').resolves({
      saleId,
      productId,
      quantity,
    });
  
    // Ação
    await salesModel.createSaleProduct(saleId, productId, quantity);
  
    // Assertiva
    expect(connection.execute.calledOnce).to.deep.eq(true);
  });
});