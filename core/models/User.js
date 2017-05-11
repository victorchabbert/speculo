"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    _outputDevices: [{ type: Schema.Types.ObjectId, ref: 'Device' }],
    _inputDevices: [{ type: Schema.Types.ObjectId, ref: 'Device' }],
    context: {
      target: String
    }
  }
);

module.exports = mongoose.model('User', schema);
