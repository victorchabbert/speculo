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

Intents are objects that convey the user's query through the system.
Every incoming message is translated into an or multiple intents and treated by the user's apps.
The intent end point require an authentication see (authentication)[authentication.md]. 
The initiator must have the required permissions to be satisfied see (permissions)[permissions.md]

## Schema

### Structure

An intent consist in a JavaScript object containing the following keys (only). 
The keys marked with a star are required
  - `target`* the target app name as a `String`
  - `query` the user's request as wrote or translated as a `String`
  - `confidence` the confidence in the target resolution as a `number` between 0 and 1
  - `parameters`* an `array` of parameter for the target app

#### Parameters

Parameters are objects with the following keys:
  - `type`* `String`
  - `value`* `Any`

## Example

A minimal intent 

```json
{
    "target": "hello"
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

