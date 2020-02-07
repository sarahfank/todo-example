import { configOptions } from '../../_config/config'
import dotenv from 'dotenv'

dotenv.config()
const env = process.env.NODE_ENV || 'development'
const config = configOptions[env]

export default function(req, res, next) {
  if (req.path.includes('/auth')) return next()

  // const userIdCookie = req.cookies[config.userCookieName]
  const userIdCookie = req.cookies[config.userCookieName] || 'patrik-drean' // Hardcoded for simplicity's sake

  if (!userIdCookie) {
    return res.sendStatus(401)
  }

  req.userId = userIdCookie
  next()
}
