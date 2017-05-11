"use strict";
const debug = require("debug")("core:intent:intentValidator");

const Joi = require('joi');

////JOI SCHEMA OF INTENTS AS 0.1.0
// @see doc/intent.md
const intentSchema = Joi.object().keys({
  "target": Joi.string().token().required(),
  "query": Joi.string(),
  "confidence": Joi.number().min(0).max(1),
  "ownerId": Joi.string().token().required(),
  "parameters": Joi.array().items(
    Joi.object().keys({
      "type": Joi.string().required(),
      "value": Joi.any().required()
    })).required()
}).required();

/**
 * Valid intents
 *
 * @param object to valid
 * @returns {error, value} error is null if the object is valid
 */
module.exports = (object) => Joi.validate(object, intentSchema);
