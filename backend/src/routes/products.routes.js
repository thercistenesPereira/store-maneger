const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.getAll);
route.get('/:id', productsController.getById);

module.exports = route;