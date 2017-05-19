<!-- version -->
# 0.0.1 Speculo Protocol
<!-- end version -->

<!-- toc -->
  - [Protocol](#protocol)
    - [Description](#description)
      - [connect](#connect)
      - [/system channel](#system-channel)
        - [add](#add)
        - [remove](#remove)
        - [show](#show)
        - [hide](#hide)
      - [/plugin/{name} channel](#pluginname-channel)
<!-- end toc -->

# Speculo Protocol

## Description

This file describe how to wrote intent to be handle by the Speculo app.
Speculo is the default app, the fallback app and the only app that can manage authorizations.

### Intents

Speculo does not compute user's query, only the parameters and only one parameter per intent can be processed.
The parameter type should match one of the following:

#### GRANT

Add the permission given as a String or Array of String to the user's permission list

parameters:
```json
{
    "type": "GRANT",
    "value": ["weather", "weather_identity"]
}
```
return:
```json
{
    code: 0,
    message: "ok"
}
```
or
```json
{
    code: 5,
    message: "unknown permission",
    option: ["weather", "weather_identity"]
}
```

#### REVOKE

Remove the permission given as a String or Array of String of the user's permission list

parameters:
```json
{
    "type": "REVOKE",
    "value": ["weather", "weather_identity"]
}
```
return:
```json
{
    code: 0,
    message: "ok"
}
```
or
```json
{
    code: 6,
    message: "ungranted permission",
    option: ["weather", "weather_identity"]
}
```

#### TARGET_APP

Change the current target app

parameters:
```json
{
    "type": "TARGET_APP",
    "value": "weather"
}
```
return:
```json
{
    code: 0,
    message: "ok"
}
```
or
```json
{
    code: 6,
    message: "ungranted permission",
    option: "weather"
}
```

#### GET_PERMISSION

Return the user's permission as an Array of string

parameters:
```json
{
    "type": "GET_PERMISSION",
    "value": <Any>
}
```
return:
```json
{
    code: 7,
    message: "granted permission",
    option: ["weather", "weather_identity"]
}
```

#### LINK

Link a mirror with the user's account. Value should match a mirror JWT.

parameters:
```json
{
    "type": "LINK",
    "value": "xxx.xxx.xxx"
}
```
return:
```json
{
    code: 0,
    message: "ok"
}
```
or
```json
{
    code: 8,
    message: "Target device does not exist",
    option: "xxx.xxx.xxx"
}
```

#### UNLINK

Unlink a mirror with the user's account. Value should match a mirror JWT.

parameters:
```json
{
    "type": "UNLINK",
    "value": "xxx.xxx.xxx" or "device_surname"
}
```
or
```json
{
    code: 9,
    message: "Target device is not linked",
    option: "xxx.xxx.xxx"
}
```

#### TARGET_DEVICE

Change the default target mirror.

parameters:
```json
{
    "type": "TARGET_DEVICE",
    "value": "xxx.xxx.xxx" or "device_surname"
}
```
or
```json
{
    code: 9,
    message: "Target device is not linked",
    option: "xxx.xxx.xxx"
}
```
