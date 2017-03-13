<!-- version -->
# 0.0.1 intent API Reference
<!-- end version -->

<!-- toc -->
  - [Intent](#intent)
    - [Description](#description)
    - [Schema](#schema)
      - [Structure](#structure)
        - [Parameters Types](#parameters)
          - [Date](#date)
          - [Position](#position)
          - [Joker](#joker)
    - [Example](#example)
<!-- end toc -->

# Intent

## Description

Intents are objects that convey the will and the identity of a user over the application.
Every incoming message is translated into an intent and treated by the user's plugins.

## Schema

### Structure

An intent consist in a JavaScript object containing the following keys (only). 
The keys marked with a star are required
  - `name`* the intent name as a `String` without white spaces
  - `query` the user's request as wrote or translated as a `String`
  - `confidence` the confidence in the interpretation of the intent from the query as a `number` between 0 and 1
  - `owner`* a valid user uuid as a `String`
  - `parameters`* an `array` of parameter

#### Parameters Types

##### Date

  - `type`* match `"date"`
  - `value`* any `String` that can be parsed by Date

##### Position

  - `type`* match `"position"`
  - `value`*
    - `address` a `String` representing an address
    - `lat`* the latitude between -90 and 90
    - `long`* the longitude between -180 and 180
  

##### Joker

You can freely use your own parameter type convention as long they follow this syntax:
  - `type`* any `String` that does not match a previous parameter type name
  - `value`* `Any`

## Example

A minimal "hello" intent 

```json
{
    "name": "hello",
    "owner": "00000000-0000-0000-0000-000000000000",
    "parameters": []
}
```

An example using multiples parameters

```json
{
  "name": "geolocation",
  "query": "Where am i now ?",
  "confidence": 0.9,
  "owner": "00000000-0000-0000-0000-000000000000",
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

