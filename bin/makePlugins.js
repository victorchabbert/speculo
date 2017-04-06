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
      const component = pluginPath.component

      if (!component) {
        console.error(p, 'Component not found in package.json')
        return
      }
      componentMapString += `"${p}": ${p}`
      requireString += `import ${p} from '${path.join('../plugins', p, component)}'\n`
  } catch(e) {
    console.log(p, 'package json not found')
  }
})

const fileTemplate = `${requireString}
export default {
  ${componentMapString}
}`

fs.writeFile(frontEndPluginConfigPath, fileTemplate, err => {
  if (err) {
    console.error(err);
  }

  console.log('file saved')
})
