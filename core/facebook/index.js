/**
 * Created by Administrator on 13/03/2017.
 */
"use strict";

const _debug = require("debug");
const debug = _debug("core:facebook");

const VERIFY_TOKEN = "zcI9G14kJo";

exports.register = function (server, options, next) {
  debug("Registering...");

  server.route({
    path: '/webhooks/facebook',
    method: 'GET',
    handler: function (request, reply) {
      if (request.query['hub.mode'] === 'subscribe' &&
        request.query['hub.verify_token'] === VERIFY_TOKEN) {
        console.log("Validating webhook");
        reply(request.query['hub.challenge']).code(200);
      } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        reply("").code(403);
      }
    }
  });

  debug("Complete !");
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
