"use strict";
const debug = require("debug")("core:facebook:messageHandler");

const witSolver = require("../intent/witTargetSolver");
const pluginManager = require('../PluginManager');
const User = require("../models/User");
const FacebookMessengerDevice = require("../models/FacebookMessengerDevice");
const processIntent = require("../intent/processIntent");

const DEFAULT_TARGET = "speculo";

/**
 * Resolve the owner from the userFbId, if it does not exist create it
 *
 * @returns User
 * @param senderId
 */
const resolveOwner = async function (senderId) {
    let userInputDevice = await FacebookMessengerDevice.findOne({senderId: senderId}).populate("_owner");
    //if user is known
    if (userInputDevice) {
        return userInputDevice._owner;
    }
    else {
        userInputDevice = new FacebookMessengerDevice({senderId: senderId});
        const user = new User({_inputDevices: [userInputDevice]});
        userInputDevice._owner = user._id;

        await Promise.all([user.save(), userInputDevice.save()]);

        return user;
    }
};

/**
 * Extract the target plugin from a message and user.context.target
 *
 * @param query String the user query as text
 * @param user User the query's owner
 * @returns {String , [], Number}
 */
const resolveQuery = async function (query, user) {
    debug(user);
    //Targeted message @<appName> <message>
    if (query[0] === "@") {
        return [query.match(/^@([\w]+)/) | DEFAULT_TARGET, [], 1];
    } else if (query[0] === "!") {
        return [DEFAULT_TARGET, {
            type: query.substring(1, query.find(/\s+/) - 1),
            value: query.substring(query.find(/\s+/) + 1)
        }, 1];
    }
    //As current target
    else if (user.context.target && user.context.target !== DEFAULT_TARGET) {
        return [user.context.target, [], 1];
    }
    //WIT solving
    else {
        const [targets, confidence] = await witSolver(query);

        if (targets.length == 1) {
            return [targets[0], parameters, confidence];
        }
        //unsolved
        else {
            return [DEFAULT_TARGET, [{
                type: "target_options",
                value: targets
            }], confidence];
        }
    }
};

/**
 * Build an Intent from a test message
 *
 * @param event facebook message received event
 * @returns {{target: *, query: *, confidence: *, ownerId: string, parameters: *}}
 */
const facebookAdapter = async function (event) {
    const owner = await resolveOwner(event.sender.id);
    const [target, parameters, confidence] = await resolveQuery(event.message.text, owner);

    return {
        target: target,
        query: event.message.text,
        confidence: confidence,
        ownerId: String(owner._id),
        parameters: parameters
    };
};

/**
 * Handle facebook messaging webHook, interpret messages and emitIntents
 *
 * @param server
 * @return {function}
 */
module.exports = (server) =>
    async function (request, reply) {
        var data = request.payload;

        // Make sure this is a page subscription
        if (data.object === 'page') {
            data.entry.forEach(
                /**
                 * @param entry {{messaging: []}}
                 */
                function (entry) {
                    entry.messaging.forEach(
                        () => setImmediate(
                            async function (event) {
                                if (event.message && event.message.text) {
                                    await processIntent(server, await facebookAdapter(event));
                                } else {
                                    debug("Webhook received unknown event: ", event);
                                }
                            }
                        )
                    );
                });
        }

        reply("").code(200);
    };
