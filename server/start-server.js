import express from 'express'
import dotenv from 'dotenv'
import { configOptions } from './_config/config'
import configureExpress from './_config/express'
import configureMongoose from './_config/mongoose'

dotenv.config()
const env = process.env.NODE_ENV || 'development'
const config = configOptions[env]

const app = express()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

configureExpress(app, config)

configureMongoose(config, env)

export default app
