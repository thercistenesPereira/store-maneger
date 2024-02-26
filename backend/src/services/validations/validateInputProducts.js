const { productSchema } = require('./schemas');

const validateProductName = (name) => {
  const { error } = productSchema.validate(name);
  const errorStatusMap = {
    '"name" length must be at least 5 characters long': 'UNPROCESSABLE_ENTITY',
    '"name" is required': 'BAD_REQUEST',
  };

  if (error) {
    const errorMessage = error.message;
    const status = errorStatusMap[errorMessage];
    if (status) {
      return { status, data: { message: errorMessage } };
    }
  }
};

module.exports = { validateProductName };
