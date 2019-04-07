'use strict';

const CommentsDAO = require('./../../DAO/comments.DAO');

module.exports = {
    saveComment: async comment => await CommentsDAO.save(comment),
    getComments: async () => await CommentsDAO.search()
};
