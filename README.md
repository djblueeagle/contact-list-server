#Contact-List-Server

Contact list server backend service. This README contains the necessary steps to
get your application up and running.

## How do I get set up?

###### Dependencies

1. [NodeJS (9.7.1 or Latest LTS)](nodejs.org)
2. [Postgres 10 or above](https://www.postgresql.org/)

###### Getting started

```shell
$ git clone https://github.com/djblueeagle/contact-list-server.git
$ cd contact-list-server
$ npm install
```

###### Setup environment variables

```shell
$ cp config/database.example.json config/database.json
```

###### Creating ENV database

Create the database ENV based on the config database 
```
CREATE DATABASE contact_list_development;
```

###### Migration Files

```
npm run sequelize -- db:migrate
```

###### Seeder Files (If Needed)

```
npm run sequelize -- db:seed:all
```

###### Start server

```shell
$ npm start
```

## Testing guide

### Unit Tests

The unit tests are all kept in the `test/unit` folder.

To manually run the in-proc unit tests, run:

```shell
npm test
```

This will run `mocha`, executing tests in the `test/` folder.

### Code Coverage

Code coverage reports can be generated with:

```shell
npm run coverage
```

Reports are written to the screen and to the `artifacts/coverage` directory.
