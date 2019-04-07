'use strict';

const Db = require('./db');

/**
 * Inserts data to collection. Testing purpose.
 *
 * @param collectionName String designated mongo collection
 * @param dataset Array of documents
 * @returns {Promise<void>} Boolean|Array mongo acknowledgement
 */
async function seed(collectionName, dataset) {
    const [collection, close] = await Db.getCollection(collectionName);
    const res = await collection.insertMany(dataset);
    close();
    return res;
}

/**
 * Removes all documents from collection. Testing purpose.
 *
 * @param collectionName String
 * @returns {Promise<void>} Object status
 */
async function erase(collectionName) {
    const [collection, close] = await Db.getCollection(collectionName);
    const res = await collection.deleteMany({});
    close();
    return res;
}

module.exports = {
    seed,
    erase
};
