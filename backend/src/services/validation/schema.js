const Joi = require('joi');

const addSchemaProduct = Joi.object({
  name: Joi.string().min(4).required()
    .messages({
      'string.required': '"name" is required',
      'string.min': '"name" length must be at least 5 characters long',
    }),
});

module.exports = { addSchemaProduct };