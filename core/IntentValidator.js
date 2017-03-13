"use strict";

const Joi = require('joi');

////JOI SCHEMA OF INTENT AS 0.0.1
const position = Joi.object().keys({
  "type": Joi.string().equal("position").required(),
  "value" : Joi.object().keys({
    "address" : Joi.string(),
    "lat": Joi.number().min(-90).max(90).required(),
    "long": Joi.number().min(-180).max(180).required()
  }).required()
});

const date = Joi.object().keys({
  "type": Joi.string().equal("date").required(),
  "value": Joi.date().required()
});

const intentSchema = Joi.object().keys({
  "name": Joi.string().token().required(),
  "query": Joi.string(),
  "confidence": Joi.number().min(0).max(1),
  "owner": Joi.string().token().required(),
  "parameters": Joi.array().items([
    position,
    date
  ]).required()
});

class IntentValidator {
  /**
   * Valid intents
   *
   * @param object to valid
   * @returns {error, value} error is null if the object is valid
   */
  static validate(object) {
    return Joi.validate(object, intentSchema);
  }
}

module.exports = IntentValidator;
