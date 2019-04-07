'use strict';

const CommentsDAO = require('./../../DAO/comments.DAO');

module.exports = {
    saveComment: async comment => {
        comment.createTime = new Date();
        await CommentsDAO.save(comment);
    },
    getComments: async () => await CommentsDAO.search()
};
