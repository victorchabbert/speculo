const loadPlugin = (name) => {
  try {
    const plugin = require("../plugins/" + name + "/index.js")
    if (!plugin instanceof Object) {
      console.error(`[${name}] Not a valid plugin object`, plugin)
    }
    return plugin
  } catch (e) {
    console.error(`[${name}] Cannot find index.js`)
    return null
  }

}

export default loadPlugin
