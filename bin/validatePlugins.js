const path = require('path')
const invariant = require('invariant')
const warning = require('warning')
const conformsTo = require('lodash/conformsTo')
const isFunction = require('lodash/isFunction')
const isString = require('lodash/isString')
const isArray = require('lodash/isArray')
const isEmpty = require('lodash/isEmpty')
const every = require('lodash/every')
const requirePkg = require('../utils/requirePkg')


const CONFIG_PATH = path.join(__dirname, '..', 'app.config')
const PLUGIN_PATH = path.join(__dirname, '..', 'plugins')

function getPluginPackage(name) {
  return require(path.join(PLUGIN_PATH, name, 'package.json'))
}

function loadBackendPlugin(name, pluginPackage) {
  const backendPlugin = pluginPackage.main

  invariant(
    !!backendPlugin,
    `[${name}] Can not find main script in package.json`
  )

  const plugin = requirePkg(path.join(PLUGIN_PATH, name, backendPlugin))
  validateBackendPlugin(name, plugin)
  return true
}

function validateBackendPlugin(name, plugin) {
  const shape = {
    name: isString,
    handle: isFunction,
    intents: isArray
  }

  invariant(
    conformsTo(plugin, shape),
    `[${name}] Expected a valid backend plugin object`
  )

  invariant(
    plugin.handle.length === 2,
    `[${name}] Expected \`handle\` function to have 2 arguments (intent & response)`
  )

  invariant(
    isEmpty(plugin.intents) || (every(plugin.intents, isString) && !every(plugin.intents, isFunction)),
    `[${name}] Expected \`intents\` array to have String items`
  )
}

function loadFrontendPlugin(name, pluginPackage) {
  const frontendPlugin = pluginPackage.speculoFrontend

  warning(
    !!frontendPlugin,
    `[${name}] No frontend plugin found. Check in package.json for \`speculoFrontend\`.`
  )
  if (!frontendPlugin) return false

  const plugin = requirePkg(path.join(PLUGIN_PATH, name, frontendPlugin))
  validateFrontendPlugin(name, plugin)
  return true
}

function validateFrontendPlugin(name, plugin) {
  const shape = {
    component: isFunction,
    reducer: isFunction,
    sagas: isArray
  }

  invariant(
    conformsTo(plugin, shape),
    `[${name}] Expected a valid frontend plugin object`
  )

  invariant(
    isEmpty(plugin.sagas) || every(plugin.sagas, isFunction),
    `[${name}] Expected \`sagas\` array to have generator functions as items`
  )
}

module.exports = function validatePlugins() {
  const config = require(CONFIG_PATH)
  const pluginList = config.plugins

  invariant(
    isArray(pluginList) && every(pluginList, isString),
    `(bin/activatePlugins) Expected \`plugins\` to be an array of string`
  )

  return pluginList.filter(name => {
    const pluginPackage = getPluginPackage(name)
    return loadBackendPlugin(name, pluginPackage) && loadFrontendPlugin(name, pluginPackage)
  })
}
