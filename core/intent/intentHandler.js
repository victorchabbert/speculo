"use strict";
const debug = require("debug")("core:intent:intentHandler");

const pluginManager = require('../PluginManager');
const DefaultInputDevice = require("../models/DefaultInputDevice");
const User = require("../models/User");

/**
 * Default intent request handler
 *
 * @param request
 * @param reply
 */
module.exports = async function (request, reply) {

  if (request.payload.ownerId) {
    const userId = await DefaultInputDevice.findOne({uuid: request.payload.ownerId}).populate("_owner");

    if (userId) {//auth succeed
      request.payload.ownerId = String(userId._owner._id);

      pluginManager.emitIntent(request.payload).then(
        () => {reply("").code(200);},
        () => {reply("Invalid intent").code(400);}
      )
    } else {
      reply("Invalid uuid").code(401);
    }
  }
  //new user
  else {
    let user = new User();
    const userDevice = new DefaultInputDevice({_owner: user._id});
    user._inputDevices = [userDevice._id];

    await Promise.all([user.save(), userDevice.save()]);

    request.payload.ownerId = String(user._id);

    pluginManager.emitIntent(request.payload).then(
      () => {reply(userDevice.uuid).code(201);},
      () => {reply("Invalid intent").code(400);}
    );
  }
};
