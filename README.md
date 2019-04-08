[![Build Status](https://travis-ci.org/jbeynar/moviedb.svg?branch=develop)](https://travis-ci.org/jbeynar/moviedb)
&nbsp; [![Coverage Status](https://coveralls.io/repos/github/jbeynar/moviedb/badge.svg?branch=develop)](https://coveralls.io/github/jbeynar/moviedb?branch=develop)

# Movies DB

https://jbeynar.github.io/moviedb/

The package provide a facade REST interface for local mongodb instance and vendor movies metadata provider - OMDb API.

In order to run this project on local environment you need to have a OMDb API key.

Read more about metadata provider [The Open Movie Database](http://www.omdbapi.com/).

See API docs on [swagger](https://simple-movies-api.herokuapp.com/documentation).

## Requirements

Environment dependencies with recommended versions:

- node 10.15.3
- npm 6.4.1
- docker 18.03.1-ce
- docker-compose 1.21.1

## Live demo

Running demo is avaliable online: https://simple-movies-api.herokuapp.com

[API Documentation](https://simple-movies-api.herokuapp.com/documentation)


## Setup

1. Clone repository and run node modules installation:
    ```
    npm install
    ```
2. Set OMDB API key as a environment variable. Check http://www.omdbapi.com/apikey.aspx for a OMDB API KEY
    ```
    export OMDB_API_KEY=xxxxxxxxx
    ``` 
3. Bootstrap docker containers.
    ```
    docker-compose up
    ```
    This will get up two mongodb instances: one for development and second for the integration tests (see docker-compose.yml).
4. Validate project integrity with automated tests (in case of issues make sure docker containers are up and running with `docker ps`):
    ```
    npm run test
    ```
5. Once the docker containers are up and ready you can start server with default settings:
    ```
    npm start
    ```

Open browser on http://localhost:3000/documentation to see API documentation.

## Auotmated tests

Unit tests:
```
npm run unit
```
Integration testing:
```
npm run e2e
```
All tests with coverage report:
```
npm run test
```
Static code analysis:
```
npm run lint
```

## Documentation

Swagger is available. Start server in normal or develop mode and browse to http://localhost:3000/documentation

Online Swagger documentation is avaliable [here](https://simple-movies-api.herokuapp.com/documentation).

## Development

Run server in watch mode with nodemon:
```
npm run develop
```
NOTE: this mode requires nodemon installed on the environment.

## Coverage

https://coveralls.io/github/jbeynar/moviedb

## CI

https://travis-ci.org/jbeynar/moviedb

## TODO
- Authentication and authorization
- Logs handling and application monitoring
- Tests in docker container
