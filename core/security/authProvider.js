"use strict";
const debug = require("debug")("core:security");

const Device = require("../Models/Device");
const User = require("../Models/User");
const JWT = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.createDevice = async function () {
    const device = new Device();
    await device.save();

    return JWT.sign({id: device._id}, JWT_SECRET);
};

exports.createUser = async function () {
    const user = new User();
    await user.save();

    return JWT.sign({id: user._id}, JWT_SECRET);
};
