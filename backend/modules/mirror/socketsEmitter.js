"use strict";

/**
 * Configure pluginManager.callbackFunction to use publish from nes
 *
 * @param server HAPI server
 */
var configurePluginManagerCallback = (server) => {
    require('../pluginManager').callbackFunction = function(intentObject){
        return (response) => {
            server.publish('/intent/'+intentObject.name, response);
        }
    };
};

/**
 * Filter the mirrors that will receive the intent based on the message owner
 *
 * @param path
 * @param message
 * @param options
 * @param next
 */
var recipientMirrorFilter = (path, message, options, next) => {
    next(/*options.credentials.id === message.owner*/ true);
};

exports.register = function (server, options, next)
{
    //allow any subscription following this syntax
    server.subscription('/intent/{name}',
        {
            filter: recipientMirrorFilter,
            //auth:TODO
        });

    configurePluginManagerCallback(server);

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};