"use strict";
const _debug = require("debug");
const debug = _debug("core:facebook:messageHandler");

const witSolver = require("../wit");

module.exports = function (request, reply) {
  var data = request.payload;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function (entry) {
      // Iterate over each messaging event
      entry.messaging.forEach(function (event) {
        if (event.message && event.message.text) {
          debug("Received fb msg: ", event);
          witSolver(event.message.text);
        } else {
          debug("Webhook received unknown event: ", event);
        }
      });
    });
  }

  reply("").code(200);
};
