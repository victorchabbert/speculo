"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require("node-uuid");

const schema = new Schema(
    {
        _owner: {type: Schema.Types.ObjectId, ref: 'User'},
        uuid: {type: String, default: uuid.v4, index: true}
    },
    {discriminatorKey: 'type'}
);

try {
    module.exports = mongoose.model('Device');
} catch (e) {
    module.exports = mongoose.model('Device', schema);
}
