import { get } from 'lodash'
import { e } from './localize'

const BAD_USER_INPUT = 'BAD_USER_INPUT'
const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
const GRAPHQL_VALIDATION_FAILED = 'GRAPHQL_VALIDATION_FAILED'
const UNAUTHENTICATED = 'UNAUTHENTICATED'

export const formatError = err => {
  const code = get(err, 'extensions.code')

  switch (code) {
    case INTERNAL_SERVER_ERROR: {
      console.error(err)
      if (process.env.APP_ENV !== 'production') {
        const stacktrace = get(err, 'extensions.exception.stacktrace')
        const exceptionError = get(err, 'extensions.exception.error')
        console.log('stacktrace:', stacktrace)
        console.log('exceptionError:', exceptionError)
      }
      return {
        message: e(`Internal Server Error`),
      }
    }

    case GRAPHQL_VALIDATION_FAILED: {
      return {
        message: err.message,
      }
    }

    case UNAUTHENTICATED: {
      return {
        message: err.message,
      }
    }

    case BAD_USER_INPUT: {
      const states = get(err, 'extensions.exception.messages')
      return {
        message: e(`Bad Request`),
        states,
      }
    }

    default:
      return err
  }
}

export default {
  formatError,
}
