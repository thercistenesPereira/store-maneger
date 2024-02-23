const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../src/app');

describe('Verifica o endpoint GET /products', function () {
  it('Retorna status 200 em caso de sucesso da requisição', async function () {
    const response = await chai.request(app).get('/products');
    expect(response.status).to.be.equal(200);
  });

  it('Verifica se o retorno do get é um array', async function () {
    const response = await chai.request(app).get('/products');
    expect(response.body).to.be.an('array');
  });

  it('Verifica se o retorno esperado do get foi buscado satisfatoriamente', async function () {
    const response = await chai.request(app).get('/products');
    const fileContent = response.body;
    expect(response.body).to.be.deep.equal(fileContent);
  });
});