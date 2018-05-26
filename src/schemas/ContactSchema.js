import Joi from 'joi';

const name = Joi.string()
  .required()
  .description('Contact Name')
  .example('Budi');

const email = Joi.string()
  .description('Contact Email')
  .example('budigemilang@gmail.com');

const phoneNumber = Joi.number()
  .required()
  .description('Contact PhoneNumber')
  .example('081908125566');

export default Joi.object().keys({
  name,
  email,
  phoneNumber,
});
