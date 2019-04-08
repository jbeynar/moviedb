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

describe('Comments endpoints', () => {

    let server;
    let serverAddress;

    before(async () => {
        [server] = await Promise.all([Server.deployment(true), DbSeed.erase('comments')]);
        serverAddress = server.info.uri;
        return server;
    });

    describe('/comment POST', () => {

        describe('when the payload is valid', () => {

            it('responds with code 201', async () => {
                const config = {
                    url: `${serverAddress}/comments`,
                    method: 'POST',
                    error: false,
                    json: true,
                    body: { author: 'labUser', body: 'This is comment text' }
                };
                const [response, body] = await Http(config);
                expect(response.statusCode).to.be.equal(201);
                expect(body).to.be.undefined();
            });

            it('saves document in mongo comments collection', async () => {
                const [comments, close] = await Db.getCollection('comments');
                const data = await comments.find({}).toArray();
                close();
                expect(data).to.be.length(1);
                expect(_.head(data)).to.be.an.object();
                expect(_.get(data, '[0].author')).to.be.equal('labUser');
                expect(_.get(data, '[0].body')).to.be.equal('This is comment text');
            });
        });
    });

    describe('/comments GET', () => {


        before(async () => {
            await DbSeed.erase('comments');
            await DbSeed.seed('comments', require('../fixtures/comments'));
        });

        describe('when comments collection has 3 documents', () => {

            it('responds 200 with all comments', async () => {
                const config = {
                    url: `${serverAddress}/comments`,
                    method: 'GET',
                    error: false,
                    json: true
                };
                const [response, body] = await Http(config);
                expect(response.statusCode).to.be.equal(200);
                expect(body).to.be.an.array();
                expect(body).to.have.length(3);
                expect(_.get(body, '[0].author')).to.be.equal('user');
                expect(_.get(body, '[1].body')).to.be.equal('Nulla in purus erat');
                expect(_.get(body, '[2].createTime')).to.be.equal('2019-04-08T19:44:00.242Z');
            });
        });

        describe('when comments collection is empty', () => {

            before(async () => {
                await DbSeed.erase('comments');
            });

            it('responds 200 with empty array', async () => {
                const config = {
                    url: `${serverAddress}/comments`,
                    method: 'GET',
                    error: false,
                    json: true
                };
                const [response, body] = await Http(config);
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
