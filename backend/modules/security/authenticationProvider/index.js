'use strict';

const authenticationException = require("authenticationException");

/**
 * Provide authentication to the mirrors
 */
class AuthenticationProvider {

    /**
     * TODO
     *
     * @param authenticationObject
     */
    authenticate (authenticationObject)
    {
        if(!this.support(authenticationObject))
        {
            throw new authenticationException("Invalid authentication object", authenticationException.INVALID_AUTHENTICATION_OBJECT);
        }


    }

    /**
     * TODO
     *
     * @param authenticationObject
     * @returns {boolean}
     */
    support (authenticationObject)
    {
        return true;
    }
}

module.exports = AuthenticationProvider;