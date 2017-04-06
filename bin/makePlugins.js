const fs = require('fs')
const path = require('path')

const frontEndPluginConfigPath = path.join(__dirname, '../plugins/pluginsConfig.js')

if (fs.existsSync(frontEndPluginConfigPath)) {
  fs.unlink(frontEndPluginConfigPath)
}

const appConfig = require(path.join(__dirname, '../app.config.js'))
const pluginsConfig = appConfig.plugins

let requireString = ''
let componentMapString = ''

pluginsConfig.forEach(p => {
  try {
    const pluginPath = require(path.join(__dirname, '../plugins', p, 'package.json'))
      const plugin = pluginPath.speculoPlugin

      if (!plugin) {
        console.error(p, 'Plugin not found in package.json')
        return
      }

      componentMapString += `"${p}": ${p}.default`
      requireString += `const ${p} = require('${path.join('../plugins', p, plugin)}')\n`
  } catch(e) {
    console.log(p, 'package json not found')
  }
})

const fileTemplate = `${requireString}
module.exports = {
  ${componentMapString}
}`

fs.writeFile(frontEndPluginConfigPath, fileTemplate, err => {
  if (err) {
    console.error(err);
  }

  console.log('file saved')
})
