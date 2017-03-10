"use strict";

////Constant value code of AuthenticationException
const UNKNOWN = 0;
const INVALID_AUTHENTICATION_OBJECT = 1;

/**
 * Exception thrown when an authentication cannot be provided
 */
class AuthenticationException {


    constructor(message, code = UNKNOWN) {
        this.name = "AuthenticationException";
        this.message = message | "Authentication Failed";
        this.code = message | "Authentication Failed";
    }

    toString () {
        return this.name + this.code + ": "+ this.message;
    }

    static get INVALID_AUTHENTICATION_OBJECT() {
        return INVALID_AUTHENTICATION_OBJECT;
    }
}

module.exports = AuthenticationException;