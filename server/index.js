/* eslint consistent-return:0 import/order:0 */
require('dotenv').config()
const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const { resolve } = require('path')
const cookieSession = require('cookie-session')

const mongoUtil = require('./services/mongoUtil')
const logger = require('./logger')
const argv = require('./argv')
const port = require('./port')
const setup = require('./middlewares/frontendMiddleware')
const isDev = process.env.NODE_ENV !== 'production'
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false
const apollo = require('./graphql')
const initPassport = require('./services/initPassport')
const authRoutes = require('./auth/route')

mongoUtil.connectToDB(err => {
  const app = express()

  app.use(bodyParser.json())

  app.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_KEYS]
    })
  );

  app.use(passport.initialize())
  app.use(passport.session())
  initPassport(passport, mongoUtil.getDB())

  // app.use(cors())
  app.use('/auth', authRoutes)

  // If you need a backend, e.g. an API, add your custom backend-specific middleware here
  const api = require('./api/index')
  app.use('/api', api)

  // Setup apollo as middleware for express app
  apollo(app, port)

  // In production we need to pass these values in instead of relying on webpack
  setup(app, {
    outputPath: resolve(process.cwd(), 'build'),
    publicPath: '/',
  })

  // get the intended host and port number, use localhost and port 3000 if not provided
  const customHost = argv.host || process.env.HOST
  const host = customHost || null // Let http.Server use its default IPv6/4 host
  const prettyHost = customHost || 'localhost'

  // use the gzipped bundle
  app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz' // eslint-disable-line
    res.set('Content-Encoding', 'gzip')
    next()
  })

  // Start your app.
  app.listen(port, host, async err => {
    if (err) {
      return logger.error(err.message)
    }

    // Connect to ngrok in dev mode
    if (ngrok) {
      let url
      try {
        url = await ngrok.connect(port)
      } catch (e) {
        return logger.error(e)
      }
      logger.appStarted(port, prettyHost, url)
    } else {
      logger.appStarted(port, prettyHost)
    }
  })
})
