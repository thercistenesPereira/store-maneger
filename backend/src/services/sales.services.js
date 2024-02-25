const { salesModel } = require('../models');
require('express-async-errors');

const searchById = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale || sale.length === 0) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    }; 
  }
  return sale;
};

const createId = async () => {
  const saleId = await salesModel.create();
  return saleId;
};

const createSaleProduct = async (saleId, productId, quantity) => {
  const saleProduct = await salesModel.createSaleProduct(saleId, productId, quantity);
  return saleProduct;
};

const saleBodyReponse = async (saleBody) => {
  const saleId = await createId();

  saleBody.forEach((sale) => {
    createSaleProduct(saleId, sale.productId, sale.quantity);
  });
};

module.exports = { searchById, createId, createSaleProduct, saleBodyReponse };