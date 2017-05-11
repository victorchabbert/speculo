"use strict";
const debug = require("debug")("module:mirror");

const path = require('path');
const pluginManager = require('../PluginManager');
const MirrorInterface = require("./MirrorInterface");
const MirrorDevice = require("../Models/MirrorDevice");

/**
 * Filter the mirrors that will receive the intent based on the message owner
 *
 * @param path
 * @param message
 * @param options
 * @param next
 */
const recipientMirrorFilter = (path, message, options, next) => {
  next(options.internal.outputDevice === options.credentialstrue);
};

/**
 * Send the plugin list to a newly subscribing mirror
 *
 * @param socket
 * @param path
 * @param params
 * @param next
 */
const sendPluginList = (socket, path, params, next) => {
  const pluginManager = require("../PluginManager");
  socket.publish(
    path,
    {
      type: "list",
      payload: pluginManager.activePlugins.map(name => ({
        name: name,
        channel: `/plugin/${name}`
      }))
    },
      err => err && debug(err)
  );

  const device = new MirrorDevice();
  device.save();
  socket.publish(
    path,
    {
      type: "authentication",
      payload: {
        uuid: device.uuid
      }
    }
  );

  next();
};

// Module boostrapping
exports.register = function (server, options, next) {
  debug("Registering...");

  pluginManager.server = server;//configure plugin manager

  server.onConnection = function (socket) {
    debug('0 %o', socket);
  };

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file(path.join(__dirname, '..', '..', 'build/index.html'))
    }
  });

  server.route({
    method: 'GET',
    path: '/static/{file*}',
    handler: {
      directory: {
        path: path.join(__dirname, '..', '..', 'build/static')
      }
    }
  });

  server.subscription("/system", {
    onSubscribe: sendPluginList
  });

  server.subscription("/plugin/{name}", {
    filter: recipientMirrorFilter
    //auth:TODO
  });

  debug("Complete !");
  next();
};

exports.register.attributes = {
  pkg: require("./package.json")
};
