"use strict";
const debug = require("debug")("core:security");

const Device = require("../Models/Device");
const User = require("../Models/User");
const authProvider = require("./authProvider");

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Valid a Device JWT content
 *
 * @param decoded
 * @param request
 * @param callback
 */
const validDeviceTokenContent = function (decoded, request, callback) {
    Device.findById(decoded.id).then(
        (device) => {
            if (device) {
                callback(null, true, {user : device._id});
            }
            else {
                callback(null, false);
            }
        },
        (err) => {
            callback(null, false);
        }
    );
};

/**
 * Valid a User JWT content
 *
 * @param decoded
 * @param request
 * @param callback
 */
const validUserTokenContent = function (decoded, request, callback) {
    User.findById(decoded.id).then(
        (user) => {
            if (user) {
                callback(null, true, {user : user._id});
            }
            else {
                callback(null, false);
            }
        },
        (err) => {
            callback(null, false);
        }
    );
};

exports.register = function (server, options, next) {
    debug("Registering...");

    server.auth.strategy("jwtDevice", "jwt", false, {
        key: JWT_SECRET,
        validateFunc: validDeviceTokenContent
    });
    server.auth.strategy("jwtUser", "jwt", false, {
        key: JWT_SECRET,
        validateFunc: validUserTokenContent
    });

    server.route({
        method: 'GET',
        path: '/auth/device',
        handler: async (request, reply) => reply(await authProvider.createDevice())
    });

    server.route({
        method: 'GET',
        path: '/auth/user',
        handler: async (request, reply) => reply(await authProvider.createUser())
    });

    debug("Complete !");
    next();
};

exports.register.attributes = {
    pkg: require("./package.json")
};
