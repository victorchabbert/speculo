const _debug = require("debug");
const debug = _debug("core:intent:defaultRequestHandler");

const pluginManager = require('../PluginManager');
const IntentValidator = require('./IntentValidator');

/**
 * Default intent request handler
 *
 * @param request
 * @param reply
 */
module.exports = function (request, reply) {

  const err = IntentValidator.validate(request.payload).error;

  if(err) {
    debug("WARN invalid intent: %o", request.payload);
    debug(err.details);
    reply("").code(400);
  }
  else {
    pluginManager.emit(request.payload);
    reply("").code(201);
  }
};
