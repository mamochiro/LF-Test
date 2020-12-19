import { UserInputError, ApolloError } from 'apollo-server'
import { e } from '../../utils/localize'
import { INTERNAL_SERVER_ERROR } from '../../utils/errors'
import models from './models'
import validate from './validations'

export default {
  User: {
    password() {
      return null
    },
  },
  Query: {
    async user() {
      // const user = await models.getUser(id)
      // return user
      return null
    },
    // async users(_, args) {
    //   const users = await models.getUserLists(args)
    //   return users
    // },
  },
  Mutation: {
    async registerUserWithEmail(_, { input }) {
      validate.registerByEmail(input)

      let exist
      try {
        exist = await models.emailExist(input.email)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[user.registerUserWithEmail]: unable to check email existing',
          error,
        })
      }

      if (exist) {
        throw new UserInputError(e('Bad Request'), {
          messages: [
            {
              key: 'email',
              message: e(`The email %s already existed in the system`, input.email),
            },
          ],
        })
      }

      let user
      try {
        user = await models.registerUserWithEmail(input)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[user.registerUserWithEmail]: unable to create a user',
          error,
        })
      }
      return user
    },
    async loginWithEmail(_, { input }) {
      // Validate inputs from the user
      validate.loginByEmail(input)

      let token
      try {
        token = await models.loginByEmail(input.email, input.password)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[user.loginByEmail]: unable logged in for the user',
          error,
        })
      }

      if (!token) {
        throw new UserInputError(e('Bad Request'), {
          messages: [
            {
              key: '_error',
              message: e(`The email or password is not correct`),
            },
          ],
        })
      }

      return token
    },
  },
}
