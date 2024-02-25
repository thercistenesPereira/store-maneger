const { productsModel } = require('../models');

const update = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) {
    return { 
      status: 'NOT_FOUND',
      data: { message: 'Product not found' }, 
    }; 
  }
  return product;
};

const updateName = async (name) => {
  if (!name) {
    return {
      status: 'BAD_REQUEST',
      data: { message: '"name" is required' },
    };
  }
};

const updateNameLength = async (name) => {
  if (name.length < 5) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"name" length must be at least 5 characters long' },
    };
  }
};

const listAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const updateProduct = async (name) => {
  const product = await productsModel.create(name);
  return product;
};

module.exports = { update, updateName, updateNameLength, listAll, updateProduct };