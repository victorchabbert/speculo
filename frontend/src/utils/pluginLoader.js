const loadPlugin = (name) => {
  try {
    const plugin = require("../plugins/" + name + "/index.js")
    /* TODO: better check if the plugin is valid
        Either do after loading or statically check on server run time and maintain a list
    */ 
    if (!plugin instanceof Object) {
      console.error(`[${name}] Not a valid plugin object`, plugin)
    }
    return plugin
  } catch (e) {
    console.error(`[${name}] Cannot find index.js`)
    return null
  }

}

const loadPlugins = plugins => plugins.map(loadPlugin).filter(p => p !== null)

export default loadPlugins
