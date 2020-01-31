'use strict'

const env = 'test'
const config = require('../config')[env]

require('../mongoose')(config, env)
