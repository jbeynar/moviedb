'use strict';

const Confidence = require('confidence');

module.exports = new Confidence.Store({
    hapi: {
        server: {
            host: '0.0.0.0',
            port: {
                $env: 'PORT',
                $coerce: 'number',
                $default: 3000
            }
        },
        register: {
            plugins: [
                {
                    plugin: './api',
                    options: {}
                },
                {
                    plugin: './plugins/swagger'
                }
            ]
        }
    },
    moviesApi: {
        host: 'omdbapi.com',
        apiKey: {
            $env: 'OMDB_API_KEY'
        }
    },
    database: {
        $filter: 'env',
        testing: {
            url: 'mongodb://localhost:27017',
            port: 27017,
            user: 'testmdb',
            password: 'testchangeme',
            database: 'testmoviedb'
        },
        development: {
            url: 'mongodb://localhost:27017',
            port: 27017,
            user: 'mdb',
            password: 'changeme',
            database: 'moviedb'
        },
        production: {
            url: { $env: 'MONGODB_HOST' },
            port: { $env: 'MONGODB_PORT' },
            user: { $env: 'MONGODB_USER' },
            password: { $env: 'MONGODB_PASSWORD' },
            database: { $env: 'MONGODB_DATABASE' }
        }
    }
});
