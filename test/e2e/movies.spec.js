'use strict';

const _ = require('lodash');
const Code = require('code');
const Lab = require('lab');
const Http = require('http-as-promised');
const Server = require('./../../src/index');
const DbSeed = require('../../src/libs/dbSeed');
const Db = require('../../src/libs/db');

const { describe, it, before, after } = exports.lab = Lab.script();
const { expect } = Code;

describe('Movies endpoints', () => {

    let server;
    let serverAddress;

    before(async () => {
        [server] = await Promise.all([Server.deployment(true), DbSeed.erase('movies')]);
        serverAddress = server.info.uri;
        return server;
    });

    describe('/movies POST', () => {

        let abstractRequestConfig;

        before(() => {
            abstractRequestConfig = {
                url: `${serverAddress}/movies`,
                method: 'POST',
                error: false,
                json: true
            };
        });

        describe('when payload does not conform REST API input validation', () => {

            it('responds with code 400', async () => {
                const config = { ...abstractRequestConfig, body: { a: 1 } };
                const [response, body] = await Http.post(config);
                expect(response.statusCode).to.be.equal(400);
                expect(body).to.be.equal({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'Invalid request payload input'
                });
            });
        });

        describe('when the movie was not found using data provider API', () => {

            it('responds with code 404', async () => {
                const config = { ...abstractRequestConfig, body: { title: 'notExistingMovie123ABC' } };
                const [response, body] = await Http.post(config);
                expect(response.statusCode).to.be.equal(404);
                expect(body).to.be.equal({
                    statusCode: 404,
                    error: 'Not Found',
                    message: 'Movie not found in data provider API'
                });
            });
        });

        describe('when the movie was found using data provider API', () => {

            describe('and it\'s not exists in local database', () => {

                it('responds with code 201', async () => {
                    const config = { ...abstractRequestConfig, body: { title: 'the matrix' } };
                    const [response, body] = await Http(config);
                    expect(response.statusCode).to.be.equal(201);
                    expect(body).to.be.undefined();
                });

                it('saves document in local database', async () => {
                    const [movies, close] = await Db.getCollection('movies');
                    const data = await movies.find({}).toArray();
                    expect(data).to.be.length(1);
                    expect(_.head(data)).to.be.an.object();
                    expect(_.get(data, '[0].Title')).to.be.equal('The Matrix');
                    expect(_.get(data, '[0].Year')).to.be.equal('1999');
                    expect(_.get(data, '[0].imdbID')).to.be.equal('tt0133093');
                    close();
                });
            });

            describe('and it\'s already exists in local database', () => {

                before(async () => {
                    await DbSeed.erase('movies');
                    await DbSeed.seed('movies', require('../fixtures/movies'));
                });

                it('responds with code 409', async () => {
                    const config = { ...abstractRequestConfig, body: { title: 'the matrix' } };
                    const [response, body] = await Http(config);
                    expect(response.statusCode).to.be.equal(409);
                    expect(body).to.be.equal({
                        statusCode: 409,
                        error: 'Conflict',
                        message: 'Movie with imdbID=tt0133093 already exists in local database.'
                    });
                });

                it('won\'t save duplicate in local database', async () => {
                    const [movies, close] = await Db.getCollection('movies');
                    const data = await movies.find({}).toArray();
                    expect(data).to.be.length(3);
                    close();
                });
            });

        });
    });

    describe('/movies GET', () => {

        let abstractRequestConfig;

        before(async () => {
            await DbSeed.erase('movies');
            await DbSeed.seed('movies', require('../fixtures/movies'));
            abstractRequestConfig = {
                url: `${serverAddress}/movies`,
                method: 'GET',
                error: false,
                json: true
            };
        });

        describe('when movies collection has 3 documents', () => {

            it('responds 200 with all movies', async () => {
                const [response, body] = await Http({ ...abstractRequestConfig });
                expect(response.statusCode).to.be.equal(200);
                expect(body).to.be.an.array();
                expect(body).to.have.length(3);
                expect(_.get(body, '[0].Title')).to.be.equal('The Matrix');
                expect(_.get(body, '[1].Year')).to.be.equal('1989');
                expect(_.get(body, '[2].imdbID')).to.be.equal('tt4896340');
            });

        });

        describe('when movies collection is empty', () => {

            before(async () => {
                await DbSeed.erase('movies');
            });

            it('responds 200 with empty array', async () => {
                const [response, body] = await Http({ ...abstractRequestConfig });
                expect(response.statusCode).to.be.equal(200);
                expect(body).to.be.an.array();
                expect(body).to.have.length(0);
            });

        });
    });

    after(async () => {
        await server.stop();
    });

});
