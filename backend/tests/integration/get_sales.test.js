const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../src/app');

describe('Verifica o endpoint GET /sales', function () {
  it('Retorna status 200 em caso de sucesso da requisição', async function () {
    const response = await chai.request(app).get('/sales');
    expect(response.status).to.be.equal(200);
  });

  it('Verifica se o retorno do GET /sales é um Array', async function () {
    const response = await chai.request(app).get('/sales');
    expect(response.body).to.be.an('array');
  });

  it('Verifica se o retorno esperado do GET /sales foi buscado satisfatoriamente', async function () {
    const response = await chai.request(app).get('/sales');
    const fileContent = response.body;
    expect(response.body).to.be.deep.equal(fileContent);
  });
});