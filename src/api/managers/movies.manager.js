'use strict';

const MoviesApi = require('./../../DAO/moviesApi');
const MoviesDAO = require('./../../DAO/movies.DAO');
const Boom = require('Boom');
const _ = require('lodash');

module.exports = {
    fetchAndSaveMovie: async function (title) {
        const movie = await MoviesApi.searchOne(title);
        if (_.get(movie, 'Error') === 'Movie not found!') {
            throw Boom.notFound();
        }

        const localMovie = await MoviesDAO.get(_.get(movie, 'imdbID'));
        if (_.has(localMovie, 'imdbID') && localMovie.imdbID === movie.imdbID) {
            throw Boom.conflict(`Movie with imdbID=${movie.imdbID} already exists in local database.`);
        }
        return await MoviesDAO.save(movie);
    }
};