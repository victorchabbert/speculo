const eventEmitter = require('events');

////private functions of pluginManager
/**
 * Attach listeners to pluginObject functions
 *
 * @param handler plugin handler
 * @param pluginDefinition from pluginsManifest
 * @param self pluginManager context
 */
var bindEventListeners = (handler, pluginDefinition, self) => {

    pluginDefinition.intentsHandled.forEach((intent) => {
        self.on(intent,
            (intentObject) => {
                setImmediate(() => {
                    handler(intentObject, self._injectedObject(pluginDefinition, intentObject));
                });
            });
    });

};

/**
 * Manage mirror plugins with an event based interaction
 */
class PluginManager extends eventEmitter {
    /**
     * Constructor load all plugins listed in "../../plugin/manifest.json"
     * and attach listeners to the exported functions
     */
    constructor() {
        super();

        this._injectedObject = console.log;

        const pluginsManifest = require("../plugins/manifest.json");

        pluginsManifest.forEach((pluginDefinition) => {
            const pluginHandler = require("../plugins/" + pluginDefinition.name).handle;

            bindEventListeners(pluginHandler, pluginDefinition, this);
        });
    }

    /**
     * set the callback function called by the plugins
     * !event are call asynchronously so should not be modified during run time.
     *
     * @param injectedObject
     */
    set injectedObject(injectedObject) {
        this._injectedObject = injectedObject;
    }

    /**
     * @returns {*}
     */
    get injectedObject() {
        return this._injectedObject;
    }
}

//singleton by node cache
module.exports = new PluginManager();
