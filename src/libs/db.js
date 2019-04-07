'use strict';

const MongoClient = require('mongodb').MongoClient;
const Config = require('./../config');
const _ = require('lodash');

function getCollection(collectionName) {
    return new Promise((resolve, reject) => {
        const config = Config.get('/database', { env: _.get(process, 'env.ENV', 'development') });
        const options = {
            useNewUrlParser: true,
            auth: {
                user: config.user,
                password: config.password
            }
        };
        MongoClient.connect(config.url, options).then(client => {
            const db = client.db(config.database);
            resolve([db.collection(collectionName), () => client.close()]);
        }).catch(reject);
    });
}

module.exports = {
    getCollection
};
