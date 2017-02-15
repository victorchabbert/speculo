/**
 * Created by GILLES Damien on 15/02/2017.
 */
'use strict';

const Glue = require('glue');

const manifest = require('./modules/manifest');
const options = {
    relativeTo: __dirname + '/modules'
};

Glue.compose(manifest, options, (err, server) => {

    if (err) {
        throw err;
    }

    server.start(() => {
        console.log('server started');
    });
});