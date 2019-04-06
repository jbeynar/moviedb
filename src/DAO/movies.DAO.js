'use strict';

const Db = require('../libs/db');
const _ = require('lodash');

module.exports = {
    save: async function (movie) {
        const [movies, close] = await Db.getCollection('movies');
        const result = await movies.insertOne(movie);
        close();
        return _.get(result, 'result.ok') === 1;
    },
    get: async function (imdbID) {
        const [movies, close] = await Db.getCollection('movies');
        const result = await movies.findOne({ imdbID });
        close();
        return result;
    }
};
