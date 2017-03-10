/**
 * Created by GILLES Damien on 15/02/2017.
 */
exports.register = function (server, options, next) {

    server.route({
        path: '/',
        method: 'GET',
        handler: require('./test')
    });

    server.route({
        path: '/soc',
        method: 'GET',
        config: {
            id: 'hello',
            handler: require('./test2')(server)
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};