"use strict";
const debug = require('debug')('core:speculo');

const Messages = require("./messages");

/**
 * Speculo intent handler
 *
 * @param server
 * @param intent
 * @param targetDevice
 * @return {*}
 */
const intentHandler = async function (server, targetDevice, intent) {
    return new Promise(function (resolve, reject) {
        intent.parameters.forEach(({type: command, value: option}) => {
            debug(command, option);

            switch (command) {
                case "UNKNOWN_TARGET_APPLICATION":
                    debug(Messages.UNKNOWN_TARGET_APPLICATION(option));
                    resolve(Messages.UNKNOWN_TARGET_APPLICATION(option));
                    break;
                case "TARGET_OPTIONS":
                    resolve(Messages.TARGET_OPTIONS(option));
                    break;
                case "AUTHORIZATION_MISSING":
                    resolve(Messages.AUTHORIZATION_MISSING(option));
                    break;
                case "AUTHORIZE":
                    //TODO
                    break;
                default :
                    resolve(Messages.OK());
                    break;
            }
        });
    });
};

module.exports = intentHandler;
