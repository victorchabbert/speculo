"use strict";
const debug = require("debug")("core:intent:intentHandler");

const intentEmitter = require('../PluginManager').emitIntent;

/**
 * Default intent request handler
 *
 * @param request
 * @param reply
 */
module.exports = function (request, reply) {

  if (intentEmitter(request.payload)) {
    reply("").code(201);
  }
  else { //invalid intent
    reply("").code(400);
  }
};
