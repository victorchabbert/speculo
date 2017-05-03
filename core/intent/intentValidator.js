"use strict";
const debug = require("debug")("core:intent:intentValidator");

const Joi = require('joi');

////JOI SCHEMA OF INTENTS AS 0.0.1
// @see doc/intent.md
const position = Joi.object().keys({
  "type": Joi.string().equal("position").required(),
  "value": Joi.object().keys({
    "address": Joi.string(),
    "lat": Joi.number().min(-90).max(90).required(),
    "long": Joi.number().min(-180).max(180).required()
  }).required()
});

const date = Joi.object().keys({
  "type": Joi.string().equal("date").required(),
  "value": Joi.date().required()
});

//Allow plugin to follow their own convention with the "external" type
const joker = Joi.object().keys({
  "type": Joi.string().not("position", "date").required(),
  "value": Joi.any().required()
});

const intentSchema = Joi.object().keys({
  "name": Joi.string().token().required(),
  "query": Joi.string(),
  "confidence": Joi.number().min(0).max(1),
  "owner": Joi.string().token().required(),
  "parameters": Joi.array().items([
    position,
    date,
    joker
  ]).required()
}).required();


/**
 * Valid intents
 *
 * @param object to valid
 * @returns {error, value} error is null if the object is valid
 */
module.exports = (object) => Joi.validate(object, intentSchema);
