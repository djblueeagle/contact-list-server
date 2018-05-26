import Joi from 'joi';

const requestedNumberOfRecords = Joi.number()
  .description('contact list service pagination Info')
  .example(10);

const startIndex = Joi.number()
  .description('contact list service pagination start index')
  .example(10);

const search = Joi.string()
  .description('contact list service search keyword')
  .example('David');

export default Joi.object().keys({
  requestedNumberOfRecords,
  startIndex,
  search,
});
