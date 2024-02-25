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

module.exports = { update, updateName };