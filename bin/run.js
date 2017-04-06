#!/usr/bin/env node

require('./preBuild')(err => err ? console.error(err) : console.log('Plugin Manifest created.'))
