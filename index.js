/**
 * Created by GILLES Damien on 15/02/2017.
 */
const _debug = require('debug');
const debug = _debug('server');

const Glue = require('glue');
require('dotenv').config();

debug('Loading manifest');
const makeManifest = require('./utils/makeManifest');
const config = require('./app.config');
const options = {
    relativeTo: __dirname + '/core'
};

Glue.compose(makeManifest(config), options, (err, server) => {

    if (err) {
      debug('An error occured.');
        throw err;
    }

    server.start(() => {
      console.log(`Server running at: ${server.info.uri}`);
    });
});
