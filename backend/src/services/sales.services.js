require('express-async-errors');
const { salesModel, productsModel } = require('../models');

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

const productUpdate = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
    };
  }
  return product;
};

const nameLength = (name) => {
  if (name.length <= 5) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"name" length must be at least 5 characters long' },
    };
  }

  return {
    status: 'OK',
  };
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

  return saleId;
};

module.exports = {
  searchById,
  createId,
  createSaleProduct,
  saleBodyReponse,
  productUpdate,
  nameLength,
};