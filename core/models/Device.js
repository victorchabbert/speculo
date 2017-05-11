"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    _owner: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { discriminatorKey: 'type' }
);

try {
  module.exports = mongoose.model('Device');
} catch(e) {
  module.exports = mongoose.model('Device', schema);
}
