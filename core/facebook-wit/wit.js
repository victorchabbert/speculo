"use strict";

const _debug = require("debug");
const debug = _debug("core:facebook-wit:wit");

const {Wit, log} = require("node-wit");

const client = new Wit({
  accessToken: process.env.WIT_SERCRET,
  logger: new log.Logger(log.DEBUG) //TODO disable in prod
});

module.exports = (textRequest, callback) => client.message(textRequest, {})
  .then(callback)
  .catch(console.error);
