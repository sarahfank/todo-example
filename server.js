'use strict'

const express = require('express')

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const app = express()

const config = require('./server/_config/config')[env]

require('./server/_config/express')(app, config)

require('./server/_config/mongoose')(config, env)

module.exports = app