import mongoose from 'mongoose'

export default function(config, env) {
  mongoose.connect(config.db, { useMongoClient: true })
  mongoose.Promise = global.Promise
  const db = mongoose.connection
  db.on('error', function(err) {
    console.log('connection error...', err)
  })
  db.once('open', function() {
    console.log('connected to database.')
  })
}
