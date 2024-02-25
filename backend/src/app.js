const express = require('express');
require('express-async-errors');
const { productsModel, salesModel } = require('./models');
const { productService, salesServices } = require('./services');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (req, res) => {
  const products = await productsModel.findAll();
  res.status(200).json(products);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const serviceResponse = await productService.update(id, name);
  if (serviceResponse.status === 'NOT_FOUND') {
    return res.status(404).json({
      message: serviceResponse.data.message,
    });
  }
  return res.status(200).json(serviceResponse);
});

app.get('/sales', async (req, res) => {
  const sales = await salesModel.findAll();
  res.status(200).json(sales);
});

app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await salesServices.searchById(id);
  if (serviceResponse.status === 'NOT_FOUND') {
    return res.status(404).json({
      message: serviceResponse.data.message,
    });
  }
  return res.status(200).json(serviceResponse);
});

app.post('/products', async (req, res) => {
  const { name } = req.body;

  const serviceResponse2 = await productService.updateName(name);
  if (serviceResponse2 && serviceResponse2.status === 'BAD_REQUEST') {
    return res.status(400).json({
      message: serviceResponse2.data.message,
    });
  }
  
  const serviceResponse = await productService.updateNameLength(name);
  if (serviceResponse && serviceResponse.status === 'UNPROCESSABLE_ENTITY') {
    return res.status(422).json({
      message: serviceResponse.data.message,
    });
  }

  const product = await productsModel.create(name);
  res.status(201).json(product);
});

app.post('/sales', async (req, res) => {
  const saleBody = req.body;
  const saleId = await salesModel.create();

  saleBody.forEach((sale) => {
    salesModel.createSaleProduct(saleId, sale.productId, sale.quantity);
  });

  res.status(201).json({ id: saleId, itemsSold: saleBody });
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await productsModel.findById(id);
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length <= 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' }); 
  }
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const procuctUpdate = await productsModel.update(+id, name);
  res.status(200).json(procuctUpdate);
});

module.exports = app;
