<!-- version -->
# 0.1.0 intent API Reference
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

## Schema

### Structure

An intent consist in a JavaScript object containing the following keys (only). 
The keys marked with a star are required
  - `target`* the target plugin name as a `String`
  - `query` the user's request as wrote or translated as a `String`
  - `confidence` the confidence in the target resolution as a `number` between 0 and 1
  - `owner`* a valid user uuid as a `String`
  - `parameters`* an `array` of parameter

#### Parameters

Parameters are objects with the following keys:
  - `type`* `String`
  - `value`* `Any`

## Example

A minimal "hello" intent 

```json
{
    "target": "weather",
    "owner": "00000000-0000-0000-0000-000000000000",
    "parameters": []
}
```

An example using multiples parameters

```json
{
  "target": "map",
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

