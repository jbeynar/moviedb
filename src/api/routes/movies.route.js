'use strict';

const MoviesManager = require('../managers/movies.manager');
const Joi = require('Joi');
const Boom = require('Boom');

module.exports = [
    {
        method: 'GET',
        path: '/movies',
        options: {
            handler: function () {
                throw Boom.notImplemented('Not implemented yet');
            }
        }
    },
    {
        method: 'POST',
        path: '/movies',
        options: {
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: {
                            description: 'Movie has been found in data provider API and saved in local database'
                        },
                        400: {
                            description: 'Request payload does not match expected format'
                        },
                        404: {
                            description: 'Movie not found in data provider API'
                        },
                        409: {
                            description: 'Movie already exists in local database'
                        },
                        503: {
                            description: 'Movies data provider API service unavailable'
                        }
                    },
                    payloadType: 'form'
                }
            },
            validate: {
                payload: {
                    title: Joi.string().required().description('Movie title')
                }
            },
            handler: async function (req, h) {
                const query = req.payload;
                try {
                    await MoviesManager.fetchAndSaveMovie(query.title);
                } catch (err) {
                    if (!(err instanceof Boom)) {
                        throw Boom.serverUnavailable(`Can not fetch or save movie in local database due to: ${err.toString()}`);
                    }
                    throw err;
                }
                return h.response().code(201);
            }
        }
    }
];
