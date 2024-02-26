const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long',
    'string.required': '"name" is required',
  }),
});

module.exports = { productSchema };