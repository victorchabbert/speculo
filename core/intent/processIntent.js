"use strict";
const debug = require('debug')('core:pluginManager');

const speculo = require("../speculo");
const User = require("../models/User");
const Messages = require("../speculo/messages");

/**
 * Return pluginManifest (nocache)
 *
 * @return {*}
 */
const getPluginManifest = function () {
    delete require.cache["../../plugins/pluginsManifest"];
    return require("../../plugins/pluginsManifest");
};

/**
 * Synchronously retrieve an user, throw an error if fail
 *
 * @param id
 * @returns {User}
 */
const resolveUser = async function (id) {
    const user = await User.findById(id);

    if (!user) {
        throw new Error("JWT Token contains an invalid user._id");
    }

    return user;
};

/**
 * Return an intent with valid existing target
 *
 * @param intent {Intent}
 * @param user {User}
 * @return intentCopy {Intent}
 */
const revolveTargetApp = function (intent, user) {
    const intentCopy = Object.assign({}, intent);//copy

    if (getPluginManifest().pluginList.includes(intentCopy.target)) {//target exist
        if (user.authorizedApps.includes(intentCopy.target)) {//target authorised
            return intentCopy;
        }
        else { //target must be authorized first
            intentCopy.parameters.push({
                type: "AUTHORIZATION_MISSING",
                value: intentCopy.target
            });
            intentCopy.target = "speculo";

            return intentCopy;
        }
    }

    else {//target does not exist
        intentCopy.parameters.push({
            type: "UNKNOWN_TARGET_APPLICATION",
            value: intentCopy.target
        });
        intentCopy.target = "speculo";

        return intentCopy;
    }
};

/**
 * Resolve the target device id of the intent
 *
 * @param intent {Intent}
 * @param user {User}
 * @return {Number}
 */
const resolveTargetDevice = function(intent, user) {
    if(user.context._defaultTargetDevice) {
        return Number(user.context._defaultTargetDevice);
    }
    else if (user._outputDevices.length > 0) {
        return Number(user._outputDevices[0]);
    }
};

/**
 * Updat user context
 *
 * @param user {User}
 * @param intent {Intent}
 * @param targetDevice {Number}
 */
const updateUserContext = function(user, intent, targetDevice) {
    user.context.previousTarget = intent.target;
    user.context.previousQuery = intent.query;
    user.context._defaultTargetDevice = targetDevice;

    user.save();
};

const processIntent = async function (server, intent) {
    if (intent.valid()) {
        debug("process intent: %o", intent);

        const user = await resolveUser(intent.userId);
        const intentWithValidTarget = revolveTargetApp(intent, user);
        const targetDevice = resolveTargetDevice(intentWithValidTarget, user);
        updateUserContext(user, intentWithValidTarget, targetDevice);

        if (intentWithValidTarget.target === "speculo") {
            return await speculo(server, targetDevice, intent);
        }
        else if (targetDevice) {
            server.publish(`app/${intent.name}`, intent, {user: targetDevice._id});
        }
        else {
            return Messages.NO_TARGET_DEVICE();
        }
    }
    else {
        return Promise.reject("Invalid intent");
    }
};

module.exports = processIntent;
