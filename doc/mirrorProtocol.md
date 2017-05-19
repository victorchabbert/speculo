<!-- version -->
# 0.1.0 Mirror Protocol
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
      - [/app/{name} channel](#appname-channel)
<!-- end toc -->

# Mirror Protocol

## Description

This file describe the protocol of communication between the server and the mirrors.
The communication is based on [nes](https://github.com/hapijs/nes) webSocket adapter.
The following documentation assume that you know nes API as version 2.2.x.

### connect

The client can connect to the WS server on port 8080. 
An authorization header is required to connect. 
See [authentication](authentication.md) to obtain a DEVICE_TOKEN.

```js
var client = new Nes.Client('ws://<SERVER_ADDRESS>:8080');
client.connect({ auth: { headers: { authorization: <DEVICE_TOKEN> } } }, function (err) {
    <...>
}
```

### /system channel

The client should subscribe to /system channel to receive command on the app management.
All commands are object with the following syntax:
  - `type`* a `command` bellow
  - `payload` `any` respecting the command's specification

The attributes marked by a star are required.

#### add

Command to download and run the app described by the payload.

The payload contain:
  - `name`* the app name as `String`

#### remove

Command to remove the app from the client.

The payload contain:
  - `name`* the app name as a `String`

#### show

Command to show a app on the display.

The payload contain:
  - `name`* the app name as a `String`

#### hide

Command to hide a app from the display.

The payload contain:
  - `name`* the app name as a `String`

### /app/{name} channel

Every app receive the messages from /app/{name} channel where {name} is the name of the app.
Those message are the result of the processing of an [intent](intent.md) server side.
The content of the message is defined by the app's authors.
