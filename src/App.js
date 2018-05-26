import Blipp from 'blipp';
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import ContactController from './controllers/ContactController';

export default class App {
  constructor(server) {
    this._server = server;
  }

  async configure() {
    await this._server.register(Blipp);
    await this._server.register(Inert);
    await this._server.register(Vision);
    await this._server.register({
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Contact List API Documentation',
        },
        documentationPath: '/contacts/v1/docs',
      },
    });
    this._loadControllers();
  }

  routes() {
    this._server.route({
      method: 'GET',
      path: '/',
      handler: this.indexHandler(),
    });
  }

  indexHandler() {
    return () => 'API FOR CONTACT LIST Visit Swagger at: http://localhost:3000/contacts/v1/docs#!/contacts/getContacts';
  }

  _loadControllers() {
    this.routes();
    new ContactController(this._server);
  }

  async start() {
    await this.configure();
    this._server.start();
  }
}
