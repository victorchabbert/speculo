const _debug = require("debug");
const debug = _debug("module:mirror");

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
      plugins: pluginManager.activePlugins.map(name => ({
        name: name,
        channel: `/plugin/${name}`
      }))
    },
      err => err && debug(err)
  );
};

// Module boostrapping
exports.register = function (server, options, next) {
  debug("Registering...");
  server.subscription("/system", {
    onSubscribe: sendPluginList
  });

  //allow any subscription following this syntax
  server.subscription("/plugin/{name}", {
    filter: recipientMirrorFilter
    //auth:TODO
  });

  //configure plugin manager
  require("../PluginManager").injectedObject = (plugin,
                                                intentObject) => new MirrorInterface(server, plugin, intentObject);

  next();
};

exports.register.attributes = {
  pkg: require("./package.json")
};
