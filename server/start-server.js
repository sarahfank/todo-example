import express from 'express'
import dotenv from 'dotenv'
import { configOptions } from './_config/config'
import configureExpress from './_config/express'
import configureMongoose from './_config/mongoose'

dotenv.config()
const env = process.env.NODE_ENV || 'development'
const config = configOptions[env]

const app = express()

configureExpress(app, config)

configureMongoose(config, env)

export default app
