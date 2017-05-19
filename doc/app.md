<!-- version -->
# 0.0.1 app API Reference
<!-- end version -->

<!-- toc -->
  - [App](#app)
    - [Description](#description)
    - [ServerSide](#serverside)
    - [ClientSide](#clientside)
<!-- end toc -->

# App

## Description

Apps compute the intents received by the server and display their results client side.
Apps must contain two part following the client side and server side API.

## ServerSide

The root of a app must contain an index.js exporting the following object.

  - `name`* the name of the app as an alphanumeric `String`
  - `handle`* a function taking two parameters, `func([intent](intent.md), [mirrorInterface](mirrorInterface.md))`

## ClientSide

TODO client side doc
