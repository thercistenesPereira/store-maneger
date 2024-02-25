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

module.exports = { searchById, createId };