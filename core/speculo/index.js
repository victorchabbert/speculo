"use strict";
const debug = require('debug')('core:speculo');

/**
 * Speculo intent handler
 *
 * @param server
 * @param intent
 * @param targetDevice
 * @return {*}
 */
const intentHandler = function (server, targetDevice, intent) {

    intent.parameters.forEach(({type: command, value: option}) => {
        switch (command) {
            case "target_options":
                debug({ message: "choose one", option});
                return { message: "choose one", option};
                break;
            case "authorization_missing":
                debug({ message: "authorize first", option});
                return { message: "authorize first", option};
                break;
            case "authorize":
                debug({ message: "authorized", option});
                return { message: "authorized", option};
                break;
            default :
                debug("command unknown "+command);
                break;
        }
    });
};

module.exports = intentHandler;
