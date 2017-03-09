'use strict';

const eventEmitter = require('events');

////private functions of pluginManager
/**
 * Attach listeners to pluginObject functions
 *
 * @param handler plugin handler
 * @param intents Array[String]
 * @param self pluginManager context
 */
var bindEventListeners = (handler, intents, self) => {

    intents.forEach((intentName) =>
    {
        self.on(intentName,
            (arg) => {
                setImmediate(() => {
                    handler(arg, self._callbackFunction);
                });
            });
    });
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
            const pluginHandler = require("../../plugin/" + pluginDefinition.name).handle;

            bindEventListeners(pluginHandler, pluginDefinition.intentsHandled, this);
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
 pluginManager.emit("temperature", {name : "temperature"});

 pluginManager.callbackFunction = (arg) => {
 console.log("from cb2", arg);
 };
 pluginManager.emit("weather", {name : "weather"});
 */