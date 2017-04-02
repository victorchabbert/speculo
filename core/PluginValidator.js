"use strict";

const Joi = require('joi');

////JOI SCHEMA OF PLUGINS AS 0.0.1
// @see doc/plugin.md

const pluginSchema = Joi.object().keys({
  "name": Joi.string().alphanum().required(),
  "handle": Joi.func().arity(2).required(),
  "intents": Joi.array().items(Joi.string().token()).required()
}).required();


/**
 * Valid intents
 *
 * @param object to valid
 * @returns {error, value} error is null if the object is valid
 */
const validate = function (object) {
  return Joi.validate(object, pluginSchema);
};


module.exports = validate;
