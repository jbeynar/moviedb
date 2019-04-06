'use strict';

const Glue = require('glue');
const Config = require('./config');

exports.deployment = async (start) => {
    const configuration = Config.get('/');
    const server = await Glue.compose(configuration, {relativeTo: __dirname});
    await server.initialize();
    if (!start) {
        return server;
    }
    await server.start();
    console.log(`Server started at ${server.info.uri}`);
    return server;
};

// bootstrap server if not loaded from tests
if (!module.parent) {
    exports.deployment(true);
    process.on('unhandledRejection', (err) => {
        console.error('Unhandled rejection detected');
        throw err;
    });
}
