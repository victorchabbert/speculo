"use strict";
const debug = require('debug')('core:speculo');

/**
 *
 * @param intent
 */
const intentHandler = function (intent) {
    if (!intent.parameters.type) {
        debug("speculo require explicit parameter command");
    } else {
        switch (intent.parameters.type) {
            case "target_options":

                break;
            case "":
                break;
            default :
                debug("command unknown");
                break;
        }
    }


    debug("speculo received an intent");
};

module.exports = intentHandler;
