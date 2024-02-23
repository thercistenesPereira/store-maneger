const express = require('express');
require('express-async-errors');
const { productsModel, salesModel } = require('./models');

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
  const product = await productsModel.findById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(product);
});

app.get('/sales', async (req, res) => {
  const sales = await salesModel.findAll();
  res.status(200).json(sales);
});

app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await salesModel.findById(id);

  if (!sale || sale.length === 0) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(sale);
});

app.post('/products', async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  const product = await productsModel.create(name);
  res.status(201).json(product);
});

// app.post('/sales', async (req, res) => {
//   // hello
// });

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await productsModel.findById(id);
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const procuctUpdate = await productsModel.update(id, name);
  res.status(200).json(procuctUpdate);
});

module.exports = app;