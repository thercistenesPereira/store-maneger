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

module.exports = { update };