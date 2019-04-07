'use strict';

const Http = require('http-as-promised');
const Config = require('./../config');
const Boom = require('boom');

module.exports = {
    searchOne: async function (title) {
        const config = Config.get('/moviesApi');
        const params = [`t=${title}`, `apiKey=${config.apiKey}`].join('&');
        const url = `http://www.${config.host}/?${params}`;
        try {
            return await Http(url, { resolve: 'response', json: true }).then(response => response.body);
        } catch (e) {
            if (!(e instanceof Boom)) {
                throw Boom.serverUnavailable(`Movies provider API service unavailable due to: ${e.toString()}`);
            }
            throw e;
        }
    }
};
