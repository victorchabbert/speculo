"use strict";
const debug = require("debug")("core:wit");

const {Wit, log} = require("node-wit");

const client = new Wit({
  accessToken: process.env.WIT_SECRET,
  logger: new log.Logger(log.DEBUG) //TODO disable in prod
});

module.exports = function (query) {
  return new Promise((resolve, reject) => {
    client.message(query, {})
      .then((responce) => resolve(Object.keys(responce.entities)))
      .catch(reject);
  })
};
