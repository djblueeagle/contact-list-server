import Boom from 'boom';
import models from '../models/index';
import SwaggerResponses from '../commons/index';
import getContactControllerResponseSchema from '../schemas/GetContactControllerResponseSchema';
import getContactControllerQuerySchema from '../schemas/GetContactControllerQuerySchema';

const swaggerResponses = new SwaggerResponses(200, {
  description: 'OK',
  schema: getContactControllerResponseSchema,
});

const DEFAULT_INDEX = 0;
const DEFAULT_LIMIT = 999;

export default class ContactController {
  constructor(server) {
    server.route({
      method: 'GET',
      path: '/contacts',
      config: {
        auth: false,
        tags: ['api', 'docs'],
        description: 'Get Contact List',
        notes: 'Get All Contact List data',
        plugins: {
          'hapi-swagger': {
            responses: swaggerResponses.getValue(),
          },
        },
        validate: {
          query: getContactControllerQuerySchema,
        },
      },
      handler: this._getContactList,
    });
  }

  async _getContactList(request, h) {
    let offset = DEFAULT_INDEX;
    let limit = DEFAULT_LIMIT;
    const { requestedNumberOfRecords, startIndex } = request.query;
    let { search } = request.query;

    if (requestedNumberOfRecords) {
      limit = requestedNumberOfRecords;
    }

    if (startIndex) {
      offset = startIndex;
    }

    if (search === undefined) {
      search = '';
    }

    try {
      const contactList = await models.Contact.findAll({
        attributes: [
          'id',
          'name',
          'email',
          'phoneNumber',
        ],
        limit,
        offset,
        order: [['name', 'ASC']],
        logging: console.log,
      });

      const result = {
        responseCode: 200,
        message: 'OK',
        returnedNumberOfRecords: contactList.length,
        contactList,
      };

      return h.response(result).code(200);
    } catch (err) {
      throw Boom.badImplementation(err);
    }
  }
}
