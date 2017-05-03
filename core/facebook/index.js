"use strict";
const _debug = require("debug");
const debug = _debug("core:facebook");

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

const messageHandler = require("./messageHandler");

exports.register = function (server, options, next) {
  debug("Registering...");

  //server owner auth
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
