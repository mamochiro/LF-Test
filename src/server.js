import app from './config/express'
import http from 'http'
import { ApolloServer } from 'apollo-server-express'
import { getClientIp } from './utils/request'
import { resolvers, typeDefs } from './graphql/schema'
import schemaDirectives from './utils/directives'
import { formatError } from './utils/errors'
import depthLimit from 'graphql-depth-limit'
import { createComplexityLimitRule } from 'graphql-validation-complexity'

// const NODE_ENV = process.env.NODE_ENV || 'development'
const NODE_PORT = parseInt(process.env.NODE_PORT, 10) || 3000
const LIMIT_QUERY_DEPT = 10
const LIMIT_QUERY_COMPLEXITY = 5000
const LIMIT_QUERY_SIZE = 2000
const IS_DEV = process.env.APP_ENV !== 'production'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  formatError,
  playground: IS_DEV,
  debug: IS_DEV,
  tracing: IS_DEV,
  validationRules: [
    depthLimit(LIMIT_QUERY_DEPT),
    createComplexityLimitRule(LIMIT_QUERY_COMPLEXITY, {
      formatErrorMessage: cost =>
        `The cost of query exceeds the complexity limit - ${cost}/${LIMIT_QUERY_COMPLEXITY}`,
    }),
  ],
  context: ({ res, req, connection }) => {
    if (connection) {
      return connection.context
    }

    const authToken = req.user || {}

    // if (
    //   (req.headers['x-locale'] && req.headers['x-locale'] === 'th') ||
    //   req.headers['x-locale'] === 'en'
    // ) {
    //   i18n.setLocale(req.headers['x-locale'])
    // }

    const { query = '' } = req.body
    if (query.length > LIMIT_QUERY_SIZE) {
      res.status(400).send('400, Bad Request')
    }

    return {
      authToken,
      // loaders,
      // userAgent: req.headers['user-agent'],
      clientIp: getClientIp(req),
      getAuthToken: () => req.user || {},
    }
  },
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)

httpServer.listen(NODE_PORT, (err) => {
  if (err) {
    throw err
  }
  console.log(`🚀 Server ready at :${NODE_PORT}${server.graphqlPath}`)
})
/**
 * Exports express
 * @public
 */
export default app
