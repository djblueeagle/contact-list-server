import Hapi from 'hapi';
import App from '../src/App';

const server = new Hapi.Server({
  port: process.env.PORT,
  routes: {
    cors: true,
  },
});
const app = new App(server);
app.start();
