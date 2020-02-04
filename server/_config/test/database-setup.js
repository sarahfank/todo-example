import dotenv from 'dotenv'
import { configOptions } from '../config'
import setUpMongoose from '../mongoose'

dotenv.config()
const env = process.env.TEST_ENV || 'testDevelopment'
const config = configOptions[env]

setUpMongoose(config, env)
