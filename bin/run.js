#!/usr/bin/env node
require('babel-polyfill')

require('./preBuild')(err => err ? console.error(err) : console.log('Plugin Manifest created.'))
