// const route = require('express').Router();
const route = require('express').Router();
const { productsContoller } = require('../controllers');

route.get('/', productsContoller.getAll);
route.get('/:id', productsContoller.getById);

module.exports = route;