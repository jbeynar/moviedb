'use strict';

const MoviesApi = require('./../../DAO/movies.API');
const MoviesDAO = require('./../../DAO/movies.DAO');
const Boom = require('boom');
const _ = require('lodash');

module.exports = {
    fetchAndSaveMovie: async (title) => {
        const movie = await MoviesApi.searchOne(title);
        if (_.get(movie, 'Error') === 'Movie not found!') {
            throw Boom.notFound('Movie not found in data provider API');
        }

        const localMovie = await MoviesDAO.get(_.get(movie, 'imdbID'));
        if (_.has(localMovie, 'imdbID') && localMovie.imdbID === movie.imdbID) {
            throw Boom.conflict(`Movie with imdbID=${movie.imdbID} already exists in local database.`);
        }
        return await MoviesDAO.save(movie);
    },
    getMovies: async () => await MoviesDAO.search()
};
