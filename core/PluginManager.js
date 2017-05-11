"use strict";
const debug = require('debug')('core:pluginManager');

const eventEmitter = require("events");
const intentValidator = require('./intent/intentValidator');
const MirrorInterface = require("./Mirror/MirrorInterface");
const speculo = require("./speculo");

////private functions of pluginManager
/**
 * Attach listeners to plugins to handle incoming intents
 *
 * @param that PluginManager instance
 * @param plugin BackendPlugin
 */
var bindEventListeners = (that, plugin) => {
  that.on(plugin.name, (intent) => {
    //make events handling asynchronous
    setImmediate(() => {
        plugin.handle(intent, new MirrorInterface(that.server, plugin, intent));
      }
    );
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
    this.server = null;
    this.loadPlugins();

    this.on("speculo", (intent) => {
      setImmediate(() => {
          speculo(intent);
        }
      );
    });
  }

  loadPlugins() {
    try {
      const manifest = require('../plugins/pluginsManifest');
      this._activePlugins = manifest.pluginList;
      this._activePlugins.forEach(name => {
        let backendPlugin = manifest.plugins[name].main;
        backendPlugin = backendPlugin.default ? backendPlugin.default : backendPlugin;
        const bound = bindEventListeners(this, backendPlugin);
        debug(`${name} activated`);
        return bound;
      })
    } catch (e) {
      console.log(e)
    }
  }

  emitIntent(intent) {
    const err = intentValidator(intent).error;

    if (err) {
      debug("WARN invalid intent: %o", intent);
      debug(err.details);
      return Promise.reject();
    }
    else {
      debug("received intent: %o", intent);
      this.emit(intent.target, intent);
      return Promise.resolve();
    }
  }

  get activePlugins() {
    return this._activePlugins;
  }
}

//singleton by node cache
module.exports = new PluginManager();
