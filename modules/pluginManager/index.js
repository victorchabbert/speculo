const eventEmitter = require('events');

////private functions of pluginManager
/**
 * Attach listeners to pluginObject functions
 *
 * @param handler plugin handler
 * @param intentsHandled by the plugin
 * @param pluginName
 * @param self pluginManager context
 */
var bindEventListeners = (handler, intentsHandled, pluginName, self) => {

    intentsHandled.forEach((intent) => {
        self.on(intent,
            (intentObject) => {
                setImmediate(() => {
                    handler(intentObject, self._callbackFunction(pluginName));
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

        const pluginsManifest = require("../../plugins/manifest.json");

        pluginsManifest.forEach((pluginDefinition) => {
            const pluginHandler = require("../../plugins/" + pluginDefinition.name).handle;

            bindEventListeners(pluginHandler, pluginDefinition.intentsHandled, pluginDefinition.name, this);
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
