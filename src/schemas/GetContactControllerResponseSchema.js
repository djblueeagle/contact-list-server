import Joi from 'joi';
import { responseCode, message } from './CommonResponseSchema';
import contactSchema from './ContactSchema';

const returnedNumberOfRecords = Joi.number()
  .description('returned Number Of Records in Pagination')
  .example(10);

export default Joi.object().keys({
  responseCode,
  message,
  returnedNumberOfRecords,
  contactList: Joi.array().items(contactSchema),
});
