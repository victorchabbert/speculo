"use strict";
const debug = require("debug")("core:intent:intent");

const Joi = require('joi');
const JWT = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Schema validating an Intent where authToken is provided
 */
const intentSchema = Joi.object().keys({
    "target": Joi.string().token().required(),
    "query": Joi.string(),
    "confidence": Joi.number().min(0).max(1),
    "authToken": Joi.string().required(),
    "parameters": Joi.array().items(
        Joi.object().keys({
            "type": Joi.string().required(),
            "value": Joi.any().required()
        })).required()
}).required();

/**
 * Schema validating an authToken content
 */
const authTokenSchema = Joi.object().keys({
    "id": Joi.string().required(),
    "iat": Joi.number()
}).required();

/**
 * Verify the authenticity and valid an authToken content
 *
 * @param authToken token to be validated
 * @param secret JWT secret
 * @param authTokenSchema schema validating the token content
 * @returns {boolean}
 */
const validAuthToken = function(authToken, secret, authTokenSchema) {
    try {
        const {error} = Joi.validate(JWT.verify(authToken, secret), authTokenSchema);

        if(error) debug(error);

        return !error;
    } catch(e) {
        debug("authToken unverified");
        return false;
    }
};

/**
 * Intent as v0.2.0
 */
class Intent {
    /**
     * constructor take an intent or (target, query, confidence, parameters, authToken) as parameter
     *
     * @param intent Intent
     */
    constructor(intent) {
        if (arguments.length === 1) {
            this.target = intent.target;
            this.query = intent.query;
            this.confidence = intent.confidence;
            this.parameters = intent.parameters;
            this.authToken = intent.authToken;
        } else {
            this.target = arguments[0];
            this.query = arguments[1];
            this.confidence = arguments[2];
            this.parameters = arguments[3];
            this.authToken = arguments[3];
        }
    }

    /**
     * Valid an intent where authToken is provided and valid
     *
     * @returns {boolean}
     */
    valid() {
        const {error}= Joi.validate(this, intentSchema);

        if(error) debug(error);

        return !error && validAuthToken(this.authToken, JWT_SECRET, authTokenSchema);
    }

    /**
     * Return authToken content if valid or null
     *
     * @returns String|null
     */
    get ownerId() {
        if(validAuthToken(this.authToken, JWT_SECRET, authTokenSchema)) {
            return JWT.decode(this.authToken).id;
        } else {
            return null;
        }
    }
}

module.exports = Intent;
