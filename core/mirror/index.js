"use strict";
const debug = require("debug")("module:mirror");

const path = require('path');

exports.register = function (server, options, next) {
    debug("Registering...");

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file(path.join(__dirname, '..', '..', 'build/index.html'))
        }
    });

    server.route({
        method: 'GET',
        path: '/static/{file*}',
        handler: {
            directory: {
                path: path.join(__dirname, '..', '..', 'build/static')
            }
        }
    });

    server.subscription("/app/{name}", {auth : {index : true}});

    debug("Complete !");
    next();
};

exports.register.attributes = {
    pkg: require("./package.json")
};
