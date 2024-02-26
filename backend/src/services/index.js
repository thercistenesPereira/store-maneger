const productService = require('./products.service');
const salesServices = require('./sales.services');
const validateInputProducts = require('./validations/validateInputProducts');

module.exports = { productService, salesServices, validateInputProducts };