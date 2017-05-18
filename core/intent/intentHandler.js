"use strict";
const debug = require("debug")("core:intent:intentHandler");

const processIntent = require('./processIntent');
const Intent = require('../intent/intent');
const Boom = require("boom");

/**
 * Default intent request handler
 *
 * @param server
 */
module.exports = (server) =>
    async function (request, reply) {

    const intent = new Intent(request.payload);

    if (request.headers["authorization"]) {
        intent.authToken = request.headers["authorization"];
    }

    processIntent(server, intent).then(
        (response) => {
            reply(response);
        },
        (err) => {
            debug(err);
            reply(Boom.badRequest());
        }
    );
};
