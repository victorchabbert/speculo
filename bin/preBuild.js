const _debug = require('debug');
const debug = _debug('preBuild');

const fs = require('fs')
const path = require('path')
const validatePlugins = require('./validatePlugins')
const PLUGIN_MANIFEST = path.join(__dirname, '..', 'plugins', 'pluginsManifest.js')

function makePluginManifest(plugins) {
  const pluginsMap = plugins.map(p => {
    const plugin = require(path.join(__dirname, '..', 'plugins', p, 'package.json'))
    const mainPath = path.join('..', 'plugins', p, plugin.main)
    const frontendPath = path.join('..', 'plugins', p, plugin.speculoFrontend)
    console.log(mainPath, frontendPath)
    return `${p}: {
      main: require('${mainPath.replace(/\\/g,"\\")}'),
      frontend: require('${frontendPath.replace(/\\/g,"\\")}')
    }`
  })

  const template = `// DO NOT MODIFY THIS FILE.
const pluginList = ${JSON.stringify(plugins)};

const plugins = {
  ${pluginsMap.join(',\n')}
}

module.exports = {
  plugins: plugins,
  pluginList: pluginList
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
