module.exports = function requirePkg(path) {
  const plugin = require(path)
  return plugin.default ? plugin.default : plugin
}
