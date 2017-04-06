"use strict";

const _debug = require("debug");
const debug = _debug("core:facebook-wit:wit");

const {Wit, log} = require("node-wit");
const pluginManager = require('../PluginManager');

const client = new Wit({
  accessToken: process.env.WIT_SECRET,
  logger: new log.Logger(log.DEBUG) //TODO disable in prod
});

//TODO multiples entities per call
const witIntentAdapter = function (witIntent) {
  return {
    name : Object.keys(witIntent.entities)[0],
    query: witIntent._text,
    confidence : witIntent.entities[Object.keys(witIntent.entities)[0]][0].confidence,
    owner: "unknown",//TODO id owner
    parameters: [{
      type: Object.keys(witIntent.entities)[0],
      value: witIntent.entities[Object.keys(witIntent.entities)[0]][0].value
    }]
  };
};

module.exports = (textRequest) => client.message(textRequest, {})
  .then(
  (witIntent) => {
    //pluginManager.emitIntent(witIntentAdapter(witIntent));
    pluginManager.emit(witIntentAdapter(witIntent).name, witIntentAdapter(witIntent));
  }
)
  .catch(console.error);
