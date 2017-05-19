<!-- version -->
# 0.1.0 Speculo protocol
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

# Protocol

## Description

This file describe the protocol of communication between the server and the mirrors.
The communication is based on [nes](https://github.com/hapijs/nes) webSocket adapter.
The following documentation assume that you know nes API as version 2.2.x.

### connect

The client can connect to the WS server on port 8080. 
No authentication is required (currently as 0.0.1).

### /system channel

The client should subscribe to /system channel to receive command on the plugin management.
All commands are object with the following syntax:
  - `type`* a `command` bellow
  - `payload` `any` respecting the command's specification

The attributes marked by a star are required.

#### add

Command to download and run the plugin described by the payload.

The payload contain:
  - `name`* the plugin name as `String`

#### remove

Command to remove the plugin from the client.

The payload contain:
  - `name`* the plugin name as a `String`

#### show

Command to show a plugin on the display.

The payload contain:
  - `name`* the plugin name as a `String`

#### hide

Command to hide a plugin from the display.

The payload contain:
  - `name`* the plugin name as a `String`

### /plugin/{name} channel

Every plugin receive the messages from /plugin/{name} channel where {name} is the name of the plugin.
Those message are the result of the processing of an [intent](intent.md) server side.
The content of the message is defined by the plugin's authors.
