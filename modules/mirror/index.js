const _debug = require('debug');
const debug = _debug('server:modules:mirror');

const MirrorInterface = require("./MirrorInterface");
const pluginsManifest = require('../../plugins/manifest');

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
    socket.publish(path, {
        "plugins" : pluginsManifest.map(p => Object.assign(p, { channel: `/plugin/${p.name}`}))
    }, (err) => err && debug(err));
};

exports.register = function (server, options, next) {
    debug('Registering mirror module.');
    server.subscription('/system',
        {
            onSubscribe: sendPluginList
        });

    //allow any subscription following this syntax
    server.subscription('/plugin/{name}',
        {
            filter: recipientMirrorFilter
            //auth:TODO
        });

    //configure plugin manager
    require('../utils/PluginManager').injectedObject =
        (pluginDefinition, intentObject) => (new MirrorInterface(server, pluginDefinition, intentObject));

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
