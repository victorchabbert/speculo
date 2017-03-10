/**
 * Created by GILLES Damien on 15/02/2017.
 */
const _debug = require('debug');
const debug = _debug('server');

const Glue = require('glue');
require('./modules/pluginManager');

debug('Loading manifest');
const manifest = require('./modules/manifest');
const options = {
    relativeTo: __dirname + '/modules'
};

Glue.compose(manifest, options, (err, server) => {

    if (err) {
      debug('An error occured.');
        throw err;
    }

    server.start(() => {
        debug('Started server');
    });
});
