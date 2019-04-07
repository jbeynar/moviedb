'use strict';

const MongoClient = require('mongodb').MongoClient;
const Config = require('./../config');
const _ = require('lodash');

/**
 * Returns array where first element is mongodb collection instance and the second is connection close callback.
 * Call close callback once finish querying database.
 *
 * @param collectionName
 * @returns {Promise<*[]>}
 */
async function getCollection(collectionName) {
    const config = Config.get('/database', { env: _.get(process, 'env.ENV', 'development') });
    const options = {
        auth: {
            user: config.user,
            password: config.password
        }
    };
    const client = await MongoClient.connect(config.url, options);
    const db = client.db(config.database);
    return [db.collection(collectionName), () => client.close()];
}

module.exports = {
    getCollection
};
