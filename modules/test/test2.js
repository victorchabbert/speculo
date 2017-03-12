const pluginManager = require('../utils/PluginManager');

module.exports = (server) => {
    return function (request, reply) {
        pluginManager.emit('weather', {"name": "weather"});
        reply('received');
    };
};