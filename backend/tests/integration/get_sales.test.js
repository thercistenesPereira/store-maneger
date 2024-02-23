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
});