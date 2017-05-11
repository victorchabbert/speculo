"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require("node-uuid");

const Device = require('./Device');

const schema = new Schema(
    {
        uuid: {type: String, default: uuid.v4, index: true},
        createdAt: {type: Date, default: Date.now}
    },
    {discriminatorKey: 'type'}
);

module.exports = Device.discriminator('DefaultInputDevice', schema);
