//TODO do you agree Victor ? (replace pluginChecker pls)
"use strict";

const Joi = require('joi');

////JOI SCHEMA OF PLUGINS AS 0.0.1
// //TODO @see doc/plugin.md

const pluginSchema = Joi.object().keys({
  "name": Joi.string().alphanum().required(),
  "handle": Joi.func().arity(2).required(),
  "intents": Joi.array().items(Joi.string().token()).required()
}).required();

class PluginValidator {
  /**
   * Valid intents
   *
   * @param object to valid
   * @returns {error, value} error is null if the object is valid
   */
  static validate(object) {
    return Joi.validate(object, pluginSchema);
  }
}

module.exports = PluginValidator;
