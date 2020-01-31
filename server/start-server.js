'use strict'

const express = require('express')

const env = (process.env.NODE_ENV = process.env.NODE_ENV || 'development')

const app = express()

const config = require('./_config/config')[env]

require('./_config/express')(app, config)

require('./_config/mongoose')(config, env)

module.exports = app
