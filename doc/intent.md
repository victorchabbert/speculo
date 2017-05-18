<!-- version -->
# 0.2.0 intent API Reference
<!-- end version -->

<!-- toc -->
  - [Intent](#intent)
    - [Description](#description)
    - [Schema](#schema)
      - [Structure](#structure)
        - [Parameters](#parameters)
    - [Example](#example)
<!-- end toc -->

# Intent

## Description

Intents are objects that convey the query and the identity of a user in the system.
Every incoming message is translated into an intent and treated by the user's applications.

TODOC: require authorization header

## Schema

### Structure

An intent consist in a JavaScript object containing the following keys (only). 
The keys marked with a star are required
  - `target`* the target plugin name as a `String`
  - `query` the user's request as wrote or translated as a `String`
  - `confidence` the confidence in the target resolution as a `number` between 0 and 1
  - `parameters`* an `array` of parameter
<!--  - `authToken` a valid jwt user token as a `String`, if not provided the request must be send with an Authorization header containing the token-->

#### Parameters

Parameters are objects with the following keys:
  - `type`* `String`
  - `value`* `Any`

## Example

A minimal "hello" intent 

```json
{
    "target": "weather"
    "parameters": []
}
```

An example using multiples parameters

```json
{
  "target": "map",
  "query": "Where am i now ?",
  "confidence": 0.9,
  "parameters": [
    {
      "type": "date",
      "value": "Mon Mar 13 2017 20:18:03 GMT+0100 (Romance Standard Time)"
    },
    {
      "type": "position",
      "value": {
        "address": "Pacific Ocean",
        "lat": 0.5684354,
        "long": -128.65465
      }
    }
  ]
}
```

