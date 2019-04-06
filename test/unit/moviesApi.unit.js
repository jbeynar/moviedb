'use strict';

const _ = require('lodash');
const Code = require('code');
const Lab = require('lab');
const Nock = require('nock');
const Proxyquire = require('proxyquire');
const Confidence = require('confidence');

const { describe, it, before, after } = exports.lab = Lab.script();
const { expect } = Code;

describe('MoviesApi Data Access Object provides an interface to 3rd party movies database.', () => {

    const unit = {};

    const fixturedMovies = require('../fixtures/movies');

    before(() => {
        Nock.disableNetConnect();
        const configStub = new Confidence.Store({
            moviesApi: {
                host: 'fake-unit-mock.io',
                apiKey: 'fake-unit-api-key'
            }
        });
        const stubs = {
            './../config': configStub
        };
        unit.moviesApi = Proxyquire('./../../src/DAO/moviesApi', stubs);
    });

    describe('searchOne method', () => {

        it('is a function of 1 argument', () => {
            expect(_.get(unit.moviesApi, 'searchOne')).to.be.a.function();
            expect(_.get(unit.moviesApi, 'searchOne.length')).to.be.equal(1);
        });

        describe('returns movie DTO as a JSON object', () => {

            let result;

            before(() => {
                Nock(`http://www.fake-unit-mock.io`)
                    .get(`/?t=matrix&apiKey=fake-unit-api-key`)
                    .reply(200, fixturedMovies[0]);
                result = unit.moviesApi.searchOne('matrix');
            });

            it('returns Promise object', () => {
                expect(result).to.be.an.instanceof(Promise);
            });

            it('calls Http with the provider service URL', () => {
                return result.then(() => {
                    expect(Nock.isDone()).to.be.equal(true);
                });
            });

            it('resolves with DTO from REST API', () => {
                return result.then(response => {
                    expect(response).to.be.an.object();
                    expect(_.get(response, 'Title')).to.be.equal('The Matrix');
                    expect(_.get(response, 'Year')).to.be.equal('1999');
                    expect(_.get(response, 'Type')).to.be.equal('mock');
                });
            });

            after(() => {
                Nock.cleanAll();
            });
        });
    });

    after(() => {
        Nock.enableNetConnect();
    });
});
