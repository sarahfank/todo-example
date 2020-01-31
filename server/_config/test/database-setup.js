import { configOptions } from '../config'
import setUpMongoose from '../mongoose'

const env = 'test'
const config = configOptions[env]

setUpMongoose(config, env)
