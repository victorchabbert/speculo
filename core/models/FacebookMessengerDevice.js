"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Device = require('./Device');

const schema = new Schema(
    {
        senderId: String
    },
    {discriminatorKey: 'type'}
);

module.exports = Device.discriminator('FacebookMessengerDevice', schema);

