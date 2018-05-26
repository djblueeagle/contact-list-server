const Joi = require('joi');

const responseCode = Joi.number()
  .description('Response code')
  .example(200);

const message = Joi.string()
  .description('Response message')
  .example('OK');

export { responseCode, message };
