'use strict'

const express = require('express')
const router = express.Router()

router.use(require('./middleware/user-middleware'))

router.use(require('./todo-list'))

module.exports = router
