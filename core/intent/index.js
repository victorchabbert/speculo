/**
 * Created by Administrator on 13/03/2017.
 */
"use strict";

const _debug = require("debug");
const debug = _debug("core:intent");

exports.register = function (server, options, next) {
  debug("Registering...");

  server.route({
    path: '/intent',
    method: 'POST',
    handler: require("./defaultRequestHandler")
  });

  debug("Complete !");
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
