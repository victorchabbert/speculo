"use strict";
require('babel-polyfill');

const debug = require('debug')('server');

const Glue = require('glue');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('dotenv').config();

debug('Running plugin build script');
const preBuild = require('./bin/preBuild');

const MONGODB_ADDRESS = process.env.MONGODB_ADDRESS;

preBuild((err) => {
    if (err) {
        debug(err);
        return;
    }

    debug('Loading manifest');
    const makeManifest = require('./utils/makeManifest');
    const config = require('./app.config');
    const options = {
        relativeTo: __dirname + '/core'
    };

    mongoose.connect(MONGODB_ADDRESS).then(
        () => {
            process.on('SIGINT', function () {
                mongoose.connection.close(function () {
                    debug('Mongoose default connection disconnected through app termination');
                    process.exit(0);
                });
            });

            Glue.compose(makeManifest(config), options, (err, server) => {
                if (err) {
                    debug('An error occured.');
                    throw err;
                }

                server.start(() => {
                    console.log(`Server running at: ${server.info.uri}`);
                });
            });
        }, debug);
});
