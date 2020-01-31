'use strict'

const express = require('express')
const router = express.Router()

router.use(require('./todo-list'))

module.exports = router
