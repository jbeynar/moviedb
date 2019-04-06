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
            validate: {
                payload: {
                    title: Joi.string().required().description('Movie title')
                }
            },
            handler: async function (req, h) {
                const query = req.payload;
                console.info(`Movie metadata request for query ${JSON.stringify(query)}`);
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
