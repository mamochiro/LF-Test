import express from 'express'
// import morgan from 'morgan'
import bodyParser from 'body-parser'
import compress from 'compression'
import methodOverride from 'method-override'
import cors from 'cors'
import helmet from 'helmet'
import routes from '../routes/v1'
import jwt from 'express-jwt'
import { e } from '../utils/localize'

/**
 * Express instance
 * @public
 */
const app = express()

app.enable('trust proxy')

// request logging. dev: console | production: file
// app.use(
//   morgan(
//     ':method :url :status :res[content-length] - :response-time ms :user-agent :referrer :remote-addr'
//   )
// )

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// gzip compression
app.use(compress())

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(
  helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false })
)

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// mount api v1 routes
app.use('/api/v1', routes)

app.get('/healthz', (req, res) => res.status(200).send('OK'))

app.use(
  jwt({
    secret: process.env.JWT_KEY,
    algorithms: ['HS256'],
    credentialsRequired: false
  })
)

// app.use((_, res) => {
//   res.status(404).send("404, This path doesn't exist!")
// })

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      message: e('Authentication token is wrong'),
    })
  }
})

export default app
