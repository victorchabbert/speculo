"use strict";
const debug = require("debug")("core:intent:intentHandler");

const pluginManager = require('../PluginManager');
const Intent = require('../intent/intent');
const DefaultInputDevice = require("../models/DefaultInputDevice");
const User = require("../models/User");

/**
 * Default intent request handler
 *
 * @param request
 * @param reply
 */
module.exports = async function (request, reply) {
    const intent = new Intent(request.payload);

    if (request.headers["authorization"]) {
        intent.authToken = request.headers["authorization"];
    }

    pluginManager.emitIntent(intent).then(
        () => {
            reply("").code(200);
        },
        () => {
            reply("Invalid intent").code(400);
        }
    );
};
