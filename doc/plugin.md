<!-- version -->
# 0.0.1 plugin API Reference
<!-- end version -->

<!-- toc -->
  - [Plugin](#plugin)
    - [Description](#description)
    - [ServerSide](#serverside)
    - [ClientSide](#clientside)
<!-- end toc -->

# Plugin

## Description

Plugins compute the intents received by the server and display their results client side.
Plugins must contain two part following the client side and server side API.

## ServerSide

The root of a plugin must contain an index.js exporting the following object.

  - `name`* the name of the plugin as an alphanumeric `String`
  - `handle`* a function taking two parameters, `func([intent](intent.md), [mirrorInterface](mirrorInterface.md))`
  - `intents`* an `Array` of [intent](intent.md) name

## ClientSide

TODO client side doc
