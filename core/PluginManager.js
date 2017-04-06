const eventEmitter = require("events");
const intentValidator = require('./intent/intentValidator');
const _debug = require('debug');
const debug = _debug('core:pluginManager');


////private functions of pluginManager
/**
 * Attach listeners to pluginObject functions
 *
 * @param plugin
 * @param self pluginManager context
 */
var bindEventListeners = (plugin, self) => {
  plugin.intents.forEach(name => {

    self.on(name, (intent) => {
      //make events handling asynchronous
      setImmediate(() => {
        plugin.handle(
          intent,
          self._injectedObject(plugin, intent)//return a MirrorInterface instance
        );
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
    this.loadPlugins();
  }

  loadPlugins() {
    try {
      const manifest = require('../plugins/pluginsManifest')
      this._activePlugins = manifest.pluginList
      this._activePlugins.forEach(name => {
        const bound = bindEventListeners(manifest.plugins[name].main.default, this)
        _debug(`core:pluginManager::${name}`)('activated')
        return bound
      })
    } catch(e) {
      console.log(e)
    }
  }

  emitIntent(intent) {
    const err = intentValidator(intent).error;

    if(err) {
      debug("WARN invalid intent: %o", intent);
      debug(err.details);
      return false;
    }
    else {
      debug("received intent: %o", intent);
      this.emit(intent.name, intent);
      return true;
    }
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

  get activePlugins() {
    return this._activePlugins;
  }
}

//singleton by node cache
module.exports = new PluginManager();
