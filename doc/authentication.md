<!-- version -->
# 0.1.0 Authentication protocol
<!-- end version -->

<!-- toc -->
  - [Authentication Protocol](#authentication)
    - [Description](#description)
    - [Obtain a new token](#obtain)
    - [Authenticate](#authenticate)
<!-- end toc -->

# Authentication Protocol

## Description

This file describe how to properly authenticate to the server.
The authentication system is based on Json Web Tokens.
First you should request a new authentication and then use it by providing you JWT token.

## Obtain a new token

Every token represent an unique user id.
If the token is lost, the account is definitively lost.
You can obtain different token on those end points

    - GET /auth/device return a new mirror authentication
    - GET /auth/user return a new user authentication
    
## Authenticate

The end points starting by /intent requires a valid user JWT to be provided as authorization header
Connection to the ws server require to respect the [nes](https://github.com/hapijs/nes) protocol
and to provide a device JWT.
