const checkRequiredKeys = (pluginKeys, requiredKeys, logger) => {
  const checked = requiredKeys.map(({ name }) => pluginKeys.indexOf(name) >= 0)
  const missing = requiredKeys.filter((val, i) => !checked[i])
  if (missing.length > 0) {
    missing.map(field => logger(`Missing "${field.name}" field of type ${field.type}.`))
    logger('See documentation for more information')
    return false
  }
  return true
}

const checkKeyTypes = (plugin, requiredKeys, logger) => {
  const faulty = requiredKeys.filter(({ type, name }) => {
    if (type === "array") {
      return !Array.isArray(plugin[name])
    }
    return typeof plugin[name] !== type
  })
  if (faulty.length > 0) {
    faulty.map(field => logger(`"${field.name}" is not of type ${field.type}. Check plugin definition.`))
    return false
  }
  return true
}

const checkPluginRequirements = (plugin, logger) => {
  const pluginKeys = Object.keys(plugin)
  const requiredKeys = [
    { name: "name", type: "string" },
    { name: "handle", type: "function" },
    { name: "intents", type: "array" },
    { name: "component", type: "function"}
  ]

  return checkRequiredKeys(pluginKeys, requiredKeys, logger) &&
    checkKeyTypes(plugin, requiredKeys, logger)
}

module.exports = checkPluginRequirements
