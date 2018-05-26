import { expect } from 'chai';
import Hapi from 'hapi';
import App from '../src/App';

describe('App', () => {
  let server = null;
  beforeEach((done) => {
    server = new Hapi.Server();
    new App(server).configure().then(() => done());
  });
  describe('GET /', () => {
    it('responds with hello', (done) => {
      server.inject('/')
        .then((response) => {
          expect(response.payload).to.eq('hello');
          done();
        }).catch(done);
    });
  });
});
