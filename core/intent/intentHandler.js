const _debug = require("debug");
const debug = _debug("core:intent:defaultRequestHandler");

const pluginManager = require('../PluginManager');

/**
 * Default intent request handler
 *
 * @param request
 * @param reply
 */
module.exports = function (request, reply) {

  if(pluginManager.emitIntent(request.payload))
  {
    reply("").code(201);
  }
  else { //invalid intent
    reply("").code(400);
  }
};
