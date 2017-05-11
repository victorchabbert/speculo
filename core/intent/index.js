"use strict";
const debug = require("debug")("core:intent");

const intentHandler = require("./intentHandler");

exports.register = function (server, options, next) {
    debug("Registering...");

    server.route({
        path: '/intent',
        method: 'POST',
        handler: intentHandler
    });

    debug("Complete !");
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
