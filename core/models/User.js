"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _outputDevices: [{type: Schema.Types.ObjectId, ref: 'Device'}],
    context: {
        previousTarget: String,
        previousQuery: String,
        _defaultTargetDevice: {type: Schema.Types.ObjectId, ref: 'Device'}
    },
    authorizedApps: [String]
});

try {
    module.exports = mongoose.model('User');
} catch (e) {
    module.exports = mongoose.model('User', schema);
}
