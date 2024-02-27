const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (req, res) => {
  const products = await productService.listAll();
  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const serviceResponse = await productService.update(id, name);
  const httpStatus = mapStatusHTTP(serviceResponse.status);

  if (httpStatus === 404) {
    return res.status(httpStatus).json({
      message: serviceResponse.data.message,  
    });
  }
  // if (serviceResponse.status === 'NOT_FOUND') {
  //   return res.status(404).json({
  //     message: serviceResponse.data.message,
  //   });

  return res.status(200).json(serviceResponse);
};

module.exports = {
  getAll,
  getById,
};