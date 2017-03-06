'use strict';

const eventEmitter = require('events');

////private functions of pluginManager
/**
 * Attach listeners to pluginObject functions
 *
 * @param pluginObject plugin required
 * @param self pluginManager context
 */
var bindEventListeners = (pluginObject, self) => {

    for (var intentName in pluginObject) {
        if (!pluginObject.hasOwnProperty(intentName)) {
            continue;
        }

        self.on(intentName,
            //anonymous wrapper
            (function (intentName) {
                return (arg) => {
                    setImmediate(() => {
                        pluginObject[intentName](arg, self._callbackFunction);
                    });
                }
            })(intentName));
    }
};

/**
 * Manage mirror plugins with an event based interaction
 */
class pluginManager extends eventEmitter {
    /**
     * Constructor load all plugins listed in "../../plugin/manifest.json"
     * and attach listeners to the exported functions
     */
    constructor() {
        super();

        this._callbackFunction = console.log;

        const pluginsManifest = require("../../plugin/manifest.json");

        pluginsManifest.forEach((pluginDefinition) => {
            const pluginObject = require("../../plugin/" + pluginDefinition.name);

            bindEventListeners(pluginObject, this);
        });
    }

    /**
     * set the callback function called by the plugins
     * !event are call asynchronously so should not be modified during run time.
     *
     * @param callbackFunction
     */
    set callbackFunction(callbackFunction) {
        this._callbackFunction = callbackFunction;
    }

    /**
     * @returns {*}
     */
    get callbackFunction() {
        return this._callbackFunction;
    }
}

//singleton by node cache
module.exports = new pluginManager();

/* TODO remove usage exemple
 const pluginManager = require("./modules/pluginManager");

 //pluginManager1.emit("weather", ["nada"]);
 pluginManager.emit("temperature", ["nada"]);

 pluginManager.callbackFunction = (arg) => {
 console.log("from cb2", arg);
 };
 pluginManager.emit("weather", ["nada"]);
 */