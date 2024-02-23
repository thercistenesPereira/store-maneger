const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../src/app');

describe('Verifica o endpoint POST /products', function () {
  async function responseGeneral() {
    const result = await chai.request(app).post('/products').send(
      {
        name: 'ProdutoX',
      },
    );
    return result;
  }

  it('Retorna status 201 em caso de sucesso da requisição', async function () {
    const response = await responseGeneral();
    expect(response.status).to.be.equal(201);
  });

  it('Verifica se o retorno do post é um objeto', async function () {
    const response = await responseGeneral();
    expect(response.body).to.be.an('object');
  });

  it('Verifica se concluída com sucesso retorna o valor "ProductX" da chave "name"', async function () {
    const response = await responseGeneral();
    expect(response.body.name).to.be.eq('ProdutoX');
  });
});