"use strict";

const _debug = require("debug");
const debug = _debug("core:facebook-wit");

const VERIFY_TOKEN = "zcI9G14kJo";

exports.register = function (server, options, next) {
  debug("Registering...");

  //TODO run on https
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

  //TODO remove, test only, short circuit facebook
  server.route({
    path: '/webhooks/test',
    method: 'POST',
    handler: function (request, reply)
    {
      require("./wit")(request.payload, reply);
    }
  });

  debug("Complete !");
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
