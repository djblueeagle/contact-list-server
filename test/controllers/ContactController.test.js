import { expect } from 'chai';
import Hapi from 'hapi';
import App from '../../src/App';
import models from '../../src/models';
import SequelizeMock from 'sequelize-mock';

describe('ContactController', () => {
  let server = null;
  let danielContactInfo;
  beforeEach(async () => {
    server = new Hapi.Server();
    new App(server).configure();
    danielContactInfo = await models.Contact.create({
      id: 50,
      name: 'DanielP',
      email: 'danielp@yahoo.com',
      phoneNumber: +6287011706520,
    });
  });
  afterEach(async () => {
    await danielContactInfo.destroy({ where: {} });
  });

  describe('GET /contact', () => {
    it('should return all the contact list', async () => {
      const response = await server.inject({
        url: '/contacts',
        method: 'GET',
      });
      const expectedOutput = {
        responseCode: 200,
        message: 'OK',
        returnedNumberOfRecords: 1,
        contactList: [
          {
            id: 50,
            name: 'DanielP',
            email: 'danielp@yahoo.com',
            phoneNumber: '6287011706520',
          },
        ],
      };
      expect(response.statusCode).to.eq(200);
      const parsedResponse = JSON.parse(response.payload);
      expect(parsedResponse).to.deep.eq(expectedOutput);
    });

    it('should return 1 contact list if there is only 1 list with pagination params', async () => {
      const response = await server.inject({
        url: '/contacts?requestedNumberOfRecords=10&startIndex=0',
        method: 'GET',
      });
      const expectedOutput = {
        responseCode: 200,
        message: 'OK',
        returnedNumberOfRecords: 1,
        contactList: [
          {
            id: 50,
            name: 'DanielP',
            email: 'danielp@yahoo.com',
            phoneNumber: '6287011706520',
          },
        ],
      };
      expect(response.statusCode).to.eq(200);
      const parsedResponse = JSON.parse(response.payload);
      expect(parsedResponse).to.deep.eq(expectedOutput);
    });

    it('should return 1 contact list if there is only 1 list with all pagination params',
      async () => {
        const response = await server.inject({
          url: '/contacts?requestedNumberOfRecords=10&startIndex=0&search=test',
          method: 'GET',
        });
        const expectedOutput = {
          responseCode: 200,
          message: 'OK',
          returnedNumberOfRecords: 1,
          contactList: [
            {
              id: 50,
              name: 'DanielP',
              email: 'danielp@yahoo.com',
              phoneNumber: '6287011706520',
            },
          ],
        };
        expect(response.statusCode).to.eq(200);
        const parsedResponse = JSON.parse(response.payload);
        expect(parsedResponse).to.deep.eq(expectedOutput);
      });

    it('should return 1 contact list if the requestedNumberOfRecord is 1', async () => {
      const response = await server.inject({
        url: '/contacts?requestedNumberOfRecords=1',
        method: 'GET',
      });
      const expectedOutput = {
        responseCode: 200,
        message: 'OK',
        returnedNumberOfRecords: 1,
        contactList: [
          {
            id: 50,
            name: 'DanielP',
            email: 'danielp@yahoo.com',
            phoneNumber: '6287011706520',
          },
        ],
      };
      expect(response.statusCode).to.eq(200);
      const parsedResponse = JSON.parse(response.payload);
      expect(parsedResponse).to.deep.eq(expectedOutput);
    });

    it('should return 0 contact list if there is no list with pagination params', async () => {
      const response = await server.inject({
        url: '/contacts?requestedNumberOfRecords=10&startIndex=2',
        method: 'GET',
      });
      const expectedOutput = {
        responseCode: 200,
        message: 'OK',
        returnedNumberOfRecords: 0,
        contactList: [],
      };
      expect(response.statusCode).to.eq(200);
      const parsedResponse = JSON.parse(response.payload);
      expect(parsedResponse).to.deep.eq(expectedOutput);
    });

    it('should return 0 contact list if the startIndex is 100', async () => {
      const response = await server.inject({
        url: '/contacts?startIndex=100',
        method: 'GET',
      });
      const expectedOutput = {
        responseCode: 200,
        message: 'OK',
        returnedNumberOfRecords: 0,
        contactList: [],
      };
      expect(response.statusCode).to.eq(200);
      const parsedResponse = JSON.parse(response.payload);
      expect(parsedResponse).to.deep.eq(expectedOutput);
    });

    it('should throw error if the requestedNumberOfRecords is invalid', async () => {
      const response = await server.inject({
        url: '/contacts?requestedNumberOfRecords=abc&startIndex=2',
        method: 'GET',
      });
      const expectedOutput = {
        statusCode: 400,
        message: 'Invalid request query input',
        error: 'Bad Request',
      };
      expect(response.statusCode).to.eq(400);
      const parsedResponse = JSON.parse(response.payload);
      expect(parsedResponse).to.deep.eq(expectedOutput);
    });

    it('should throw error if the startindex is invalid', async () => {
      const response = await server.inject({
        url: '/contacts?requestedNumberOfRecords=10&startIndex=qw',
        method: 'GET',
      });
      const expectedOutput = {
        statusCode: 400,
        message: 'Invalid request query input',
        error: 'Bad Request',
      };
      expect(response.statusCode).to.eq(400);
      const parsedResponse = JSON.parse(response.payload);
      expect(parsedResponse).to.deep.eq(expectedOutput);
    });
  });
  describe('#sequelizeMock', () => {
    const DBConnectionMock = new SequelizeMock();
    const dbQuery = ({
      attributes: [
        'id',
        'name',
        'email',
        'phoneNumber',
      ],
      limit: 10,
      offset: 0,
      order: [['name', 'ASC']],
      logging: console.log,
    });
    it('should return data based on the query given', (done) => {
      const mockData = {
        name: 'DanielP',
        email: 'danielp@yahoo.com',
        phoneNumber: +6287011706520,
      };
      const ContactMock = DBConnectionMock.define('Contact', mockData);
      ContactMock.findAll(dbQuery).then((contact) => {
        expect(contact[0].id).to.eq(1);
        expect(contact[0].name).to.eq(mockData.name);
        expect(contact[0].email).to.eq(mockData.email);
        expect(contact[0].phoneNumber).to.eq(mockData.phoneNumber);
        done();
      });
    });
  });
});
