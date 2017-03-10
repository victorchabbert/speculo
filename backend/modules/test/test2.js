const pluginManager = require('../pluginManager');

module.exports = (server) => {
    return function (request, reply) {
        pluginManager.emit('weather', {"name": "weather"});
        reply('received');
    };
};