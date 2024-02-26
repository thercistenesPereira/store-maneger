const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/products.model');
const { productService } = require('../../../src/services');

const { expect } = chai;

describe('ProductModel', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Ao chamar o método create deve inserir uma nova venda e retornar o id da venda inserida', async function () {
    sinon.stub(connection, 'execute')
      .resolves([{ insertId: 1 }]);
    const saleId = 1;
    const name = 'ProductoX';

    const insertId = await productModel.create(saleId, name);

    expect(insertId.id).to.equal(1);
  });

  it('Ao chamar o método findById deve retornar oproduto relativas so Id único passado como parâmentro', async function () {
    sinon.stub(connection, 'execute')
      .resolves([[
        {
          id: 1,
          name: 'Martelo de Thor',
        },
      ]]);

    const productFound = await productModel.findById(1);

    expect(productFound).to.deep.eq({
      id: 1,
      name: 'Martelo de Thor',
    });
  });

  it('Atualiza nome de producto na tabela products do banco de dados', async function () {
    const id = 1;
    const name = 'ProdutoX';
    sinon.stub(connection, 'execute')
      .resolves({
        id,
        name,
      });

    const result = await productModel.update(id, name);

    expect(result).to.deep.equal({ id, name });
  });

  it('Retorna um status de erro e uma mensagem caso o produto não seja encontrado na tabela products', async function () {
    const saleBody = [
      { productId: 1, quantity: 2 },
      { quantity: 3 },
    ];

    const result = await productService.expectByProduct(saleBody);

    expect(result).to.deep.equal({
      status: 'BAD_REQUEST',
      data: { message: '"productId" is required' },
    });
  });
});