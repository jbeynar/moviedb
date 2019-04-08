'use strict';

const Code = require('code');
const Lab = require('lab');
const Server = require('../../src');
const Package = require('../../package.json');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('Server', () => {

    describe('deployment function', () => {

        describe('when invoked to return ready to run server instance', () => {

            it('registers the main plugin.', async () => {
                const server = await Server.deployment();
                expect(server.registrations[Package.name]).to.exist();
            });
        });
    });
});
