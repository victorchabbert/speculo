"use strict";
const debug = require("debug")("core:facebook:verifyToken");

module.exports = function (request, reply) {
  if (request.query['hub.mode'] === 'subscribe' && request.query['hub.verify_token'] === VERIFY_TOKEN) {
    debug("Validating webhook");
    reply(request.query['hub.challenge']).code(200);
  }
  else {
    debug("Failed validation. Make sure the validation tokens match.");
    reply("").code(403);
  }
};
