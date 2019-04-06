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
        url: {
            $env: 'MONGODB_HOST',
            $default: 'mongodb://localhost:27017'
        },
        port: {
            $env: 'MONGODB_PORT',
            $coerce: 'number',
            $default: 27017
        },
        user: {
            $env: 'MONGODB_USER',
            $default: 'mdb'
        },
        password: {
            $env: 'MONGODB_PASSWORD',
            $default: 'changeme'
        },
        database: {
            $env: 'MONGODB_DATABASE',
            $default: 'moviedb'
        }
    }
});
