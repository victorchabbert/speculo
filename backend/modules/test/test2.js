/**
 * Created by GILLES Damien on 15/02/2017.
 */
"use strict";

module.exports = (server) => {
    return function (request, reply) {
        console.log("hello received");
        server.publish("/weather", "il fait bo");
        reply('Hello world2');
    };
};