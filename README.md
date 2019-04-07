# Movies DB

[![Build Status](https://travis-ci.org/jbeynar/moviedb.svg?branch=develop)](https://travis-ci.org/jbeynar/moviedb)

[![Coverage Status](https://coveralls.io/repos/github/jbeynar/moviedb/badge.svg?branch=develop)](https://coveralls.io/github/jbeynar/moviedb?branch=develop)

## Requirements

Required system depenedecies with recommended versions:

- node 10.15.3
- npm 6.4.1
- docker 18.03.1-ce
- docker-compose 1.21.1


## Setup
Clone repository and run node modules installation:

```
npm install
```

Bootstrap docker containers.
```
docker-compose up
```
This will get up two mongodb instances: one for development and second for the integration tests (see docker-compose.yml).

Validate project integrity with automated tests (in case of issues make sure docker containers are up and running with `docker ps`):
```
npm run test
```

Once the docker containers are up and ready you can start server with default settings:
```
npm start
```

Open browser on http://localhost:3000/documentation to see API documentation.

## Testing

Unit tests:
```
npm run unit
```

Integration testing:
```
npm run e2e
```
Note that docker-compose 

All tests with coverage report:
```
npm run test
```

Static code analysis:
```
npm run lint
```

## Documentation

Swagger is avaliable. Start server in normal or develop mode and browse to http://localhost:3000/documentation

## Development

Run server in watch mode with nodemon:
```
npm run develop
```
NOTE: This mode require nodemon installed on development environment.
