"use strict";
const debug = require("debug")("core:wit:wit");

const {Wit, log} = require("node-wit");
const intentEmitter = require('../PluginManager').emit;

const client = new Wit({
  accessToken: process.env.WIT_SECRET,
  logger: new log.Logger(log.DEBUG) //TODO disable in prod
});

//TODO multiples entities per call
const witIntentAdapter = function (witIntent) {
  let intent = {
    name: Object.keys(witIntent.entities)[0],
    query: witIntent._text,
    confidence: witIntent.entities[Object.keys(witIntent.entities)[0]][0].confidence,
    owner: "unknown",//TODO id owner
    parameters: []
  };

  for (let i = 0; i < Object.keys(witIntent.entities).length; i++) {
    let type = Object.keys(witIntent.entities)[i];
    let value = witIntent.entities[Object.keys(witIntent.entities)[i]][0].value;

    switch (Object.keys(witIntent.entities)[i]) {
      case "location":
        type = "position";
        value = {"address": value};
        break;
      case "datetime":
        type = "date";
        value = new Date(value);
        break;
      default :
        break;
    }

    intent.parameters.push({
      type: type,
      value: value
    });
  }

  return intent;
};

module.exports = (textRequest) => client.message(textRequest, {})
  .then(
  (witIntent) => {
    //pluginManager.emitIntent(witIntentAdapter(witIntent));
    intentEmitter(witIntentAdapter(witIntent).name, witIntentAdapter(witIntent));
  }
)
  .catch(console.error);
