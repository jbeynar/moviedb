'use strict';

const Inert = require('inert');
const Vision = require('vision');
const Handlebars = require('handlebars');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../../package.json');

module.exports = {
    name: 'app-swagger',
    async register(server) {

        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: {
                    documentationPage: false,
                    validatorUrl: null,
                    info: {
                        title: 'Movie DB API documentation',
                        description: 'JSON REST API build on nodejs stack.',
                        version: Package.version,
                        contact: {
                            name: 'Jakub Bejnarowicz',
                            email: 'jakub.bejnarowicz@gmail.com'
                        }
                    }
                }
            }
        ]);

        server.views({
            engines: { html: Handlebars },
            path: __dirname
        });

        server.route({
            method: 'get',
            path: '/documentation',
            handler: { view: { template: 'swagger' } }
        });
    }
};
