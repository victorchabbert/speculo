"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        _outputDevices: [{type: Schema.Types.ObjectId, ref: 'Device'}],
        context: {
            previousIntent: Schema.Types.Mixed
        }
    }
);

module.exports = mongoose.model('User', schema);
