"use strict";

const _debug = require("debug");
const debug = _debug("core:facebook-wit");

const VERIFY_TOKEN = "zcI9G14kJo";

exports.register = function (server, options, next) {
  debug("Registering...");

  //server owner validation
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
    handler: function (request, reply) {
      var data = request.payload;

      // Make sure this is a page subscription
      if (data.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        data.entry.forEach(function (entry) {
          var pageID = entry.id;
          var timeOfEvent = entry.time;

          // Iterate over each messaging event
          entry.messaging.forEach(function (event) {
            if (event.message && event.message.text) {
              debug("Received fb msg: ", event);
              require("./wit")(event.message.text);
            } else {
              debug("Webhook received unknown event: ", event);
            }
          });
        });

        reply("").code(200);
      }
    }
  });

  debug("Complete !");
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
