"use strict";
const debug = require("debug")("core:facebook:messageHandler");

const witSolver = require("../intent/witTargetSolver");
const pluginManager = require('../PluginManager');

const defaultTarget = "speculo";

const facebookAdapter = async function (event) {
  let intent = {
    target: undefined,
    query: event.message.text,
    confidence: 1,//TODO improve
    owner: "unknown",//TODO id owner
    parameters: []
  };

  //if the message is targeted @<appName> <message>
  if (intent.query[0] === "@") {
    intent.target = intent.query.match(/^@([\w]+)/);
    //@ <message> target to the default target
    if (!intent.target) {
      intent.target = "speculo";
    }
  }
  else {
    /* TODO
     if(currentTarget != "speculo") {
     return currentTarget;
     } */

    //Wit target solving
    const targets = await witSolver(intent.query);
    if(targets.length == 1) {
      intent.target = targets[0];
    } else {
      intent.target = "speculo";
      intent.parameters.push({
        type: "target_options",
        value: targets
      })
    }
  }

  debug("intentFromMessage", intent);

  return intent;
};

/** @namespace entry.messaging */
module.exports = function (request, reply) {
  var data = request.payload;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    data.entry.forEach(function (entry) {
      entry.messaging.forEach(function (event) {
        if (event.message && event.message.text) {
          facebookAdapter(event).then((intent) => {pluginManager.emitIntent(intent)}, debug);
        } else {
          debug("Webhook received unknown event: ", event);
        }
      });
    });
  }

  reply("").code(200);
};
