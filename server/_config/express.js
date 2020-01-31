import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import routes from '../api'

export default function(app, config) {
  app.set('port', config.port)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use('/api', routes)

  app.listen(app.get('port'), function() {
    console.log('Listening on port %s...', app.get('port'))
  })
}
