const _debug = require("debug");
const debug = _debug("module:mirror");
const path = require('path')

const pluginManager = require('../PluginManager');
const MirrorInterface = require("./MirrorInterface");

/**
 * Filter the mirrors that will receive the intent based on the message owner
 *
 * @param path
 * @param message
 * @param options
 * @param next
 */
const recipientMirrorFilter = (path, message, options, next) => {
  next(/*options.credentials.id === message.owner*/ true);
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

  next();
};

/**
 * Configure the plugin manager to inject a MirrorInterface in the plugin's handle function
 *
 * @param server HAPI nes server
 */
const configurePluginManager = (server) => {
  pluginManager.injectedObject =
    (plugin, intentObject) => new MirrorInterface(server, plugin, intentObject);
};

// Module boostrapping
exports.register = function (server, options, next) {
  debug("Registering...");

  configurePluginManager(server);

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply.file(path.join(__dirname, '..', '..', 'build/index.html'))
    }
  })

  server.route({
    method: 'GET',
    path: '/static/{file*}',
    handler: {
      directory: {
        path: path.join(__dirname, '..', '..', 'build/static')
      }
    }
  })

  server.subscription("/system", {
    onSubscribe: sendPluginList
  });

  //allow any subscription following this syntax
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
