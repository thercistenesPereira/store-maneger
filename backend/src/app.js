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
  const products = await productService.listAll();
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

  const product = await productService.updateProduct(name);
  res.status(201).json(product);
});

app.post('/sales', async (req, res) => {
  const saleBody = req.body;

  const productCheck = await productService.expectByProduct(saleBody);
  if (productCheck && productCheck.status === 'BAD_REQUEST') {
    return res.status(400).json(productCheck.data);
  }

  const promises = saleBody.map((sale) => productsModel.findById(sale.productId));

  const promisesResult = await Promise.all(promises);

  if (promisesResult.some((sale) => !sale)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (saleBody.some((sale) => !('quantity' in sale))) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (saleBody.some((sale) => sale.quantity <= 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  
  const saleId = await salesServices.saleBodyReponse(saleBody);

  res.status(201).json({ id: saleId, itemsSold: saleBody });
});

const checkNameUpdate = async (req, res, next) => {
  const { name } = req.body;

  const serviceResponse2 = await productService.updateName(name);
  if (serviceResponse2 && serviceResponse2.status === 'BAD_REQUEST') {
    return res.status(400).json({
      message: serviceResponse2.data.message,
    });
  }

  next();
};

app.put('/products/:id', checkNameUpdate, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const nameCheck = salesServices.nameLength(name);
  if (nameCheck && nameCheck.status === 'UNPROCESSABLE_ENTITY') {
    return res.status(422).json({
      message: nameCheck.data.message,
    });
  }

  const product = await salesServices.productUpdate(id);
  if (product && product.status === 'NOT_FOUND') {
    return res.status(404).json({
      message: product.data.message,
    });
  }

  const procuctUpdate = await productsModel.update(+id, name);
  res.status(200).json(procuctUpdate);
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  const result = await productService.removeById(id);
  const response = await productService.checkRemove(result);

  if (response && response.status === 'NO_CONTENT') {
    res.status(204).end();
  } else {
    res.status(404).json({ message: response.data.message }); 
  }
});

module.exports = app;
