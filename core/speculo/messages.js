"use strict";
const messagesDefinition = require("./messageDefinition");

let messages = {};

Object.keys(messagesDefinition).forEach((messageName, i) => {
    messages[messageName] = (option) =>
        ({code: i, message: messagesDefinition[messageName], option: option});
});

module.exports = messages;
