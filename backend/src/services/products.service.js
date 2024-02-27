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

const checkRemove = async (result) => {
  if (result.affectedRows > 0) {
    return {
      status: 'NO_CONTENT',
    };
  } 
  return {
    data: { message: 'Product not found' },
  };
};

const listAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const updateProduct = async (name) => {
  const product = await productsModel.create(name);
  return product;
};

const removeById = async (id) => {
  const [result] = await productsModel.remove(id);
  return result;
};

const expectByProduct = async (saleBody) => {
  if (saleBody.some((sale) => !('productId' in sale))) {
    return {
      status: 'BAD_REQUEST',
      data: { message: '"productId" is required' },
    };
  }
};

module.exports = {
  update,
  listAll,
  updateProduct,
  removeById,
  checkRemove,
  expectByProduct,
};