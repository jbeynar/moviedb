'use strict';

const Db = require('../libs/db');
const _ = require('lodash');

module.exports = {
    save: async function (comment) {
        const [comments, close] = await Db.getCollection('comments');
        const result = await comments.insertOne(comment);
        close();
        return _.get(result, 'result.ok') === 1;
    },
    search: async function () {
        const [comments, close] = await Db.getCollection('comments');
        const result = await comments.find({}).toArray();
        close();
        return result;
    }
};
