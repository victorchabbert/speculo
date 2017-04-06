const _debug = require('debug');
const debug = _debug('preBuild');

const fs = require('fs')
const path = require('path')
const validatePlugins = require('./validatePlugins')
const PLUGIN_MANIFEST = path.join(__dirname, '..', 'plugins', 'pluginsManifest.js')

function makePluginManifest(plugins) {
  const pluginsMap = plugins.map(p => {
    const plugin = require(path.join(__dirname, '../plugins', p, 'package.json')).speculoFrontend
    return `${p}: requirePkg('${path.join('../plugins', p, plugin)}')\n`
  })

  const template = `// DO NOT MODIFY THIS FILE.
const requirePkg = require('../utils/requirePkg')
module.pluginList = ${JSON.stringify(plugins)};

module.plugins = {
  ${pluginsMap}
}`

  return template
}

module.exports = function run(cb) {
  const validatedPlugins = validatePlugins()

  if (fs.existsSync(PLUGIN_MANIFEST)) {
    fs.unlink(PLUGIN_MANIFEST)
  }

  fs.writeFile(PLUGIN_MANIFEST, makePluginManifest(validatedPlugins), cb)
}
