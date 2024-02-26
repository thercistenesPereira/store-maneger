const { validateInputProducts } = require('../services');

const validateProductName = (req, res, next) => {
  const { name } = req.body;

  const validateName = validateInputProducts.validateProductName(name);
  if (validateName) {
    const statusCode = {
      BAD_REQUEST: 400,
      UNPROCESSABLE_ENTITY: 422,
    };

    return res.status(statusCode[validateName.status]).json(validateName.data);
  }

  next();
};

module.exports = { validateProductName };