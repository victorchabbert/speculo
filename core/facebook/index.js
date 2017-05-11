"use strict";
const debug = require("debug")("core:facebook");

const messageHandler = require("./messageHandler");
const verifyTokenHandler = require("./verifyTokenHandler");

exports.register = function (server, options, next) {
    debug("Registering...");

    //server owner auth
    server.route({
        path: '/webhooks/facebook',
        method: 'GET',
        handler: verifyTokenHandler
    });

    //messages endpoint
    server.route({
        path: '/webhooks/facebook',
        method: 'POST',
        handler: messageHandler
    });

    debug("Complete !");
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
