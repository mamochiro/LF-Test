import { UserInputError, ApolloError } from 'apollo-server'
import { e } from '../../utils/localize'
import { INTERNAL_SERVER_ERROR } from '../../utils/errors'
import models from './models'
// import { isEmpty } from 'lodash'

export default {
  Query: {
    async farm() {
      return null
    }
  },
  Mutation: {
    async createFarm(_, { input }, { authToken }) {
      const { data } = authToken

      // check farm exist
      let exist
      try {
        exist = await models.read(data)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[createFarm.read]: unable to check read',
          error
        })
      }

      if (exist) {
        throw new UserInputError(e('Bad Request'), {
          messages: [
            {
              key: 'farm',
              message: e(`This user already have a farm`)
            }
          ]
        })
      }

      // create farm
      let farm
      try {
        farm = await models.create(input, data)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[farm.createFarm]: unable to create a farm',
          error
        })
      }

      return farm
    },
    async updateFarm(_, { input }, { authToken }) {
      const { data } = authToken

      let farm
      try {
        farm = await models.update(input, data)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[farm.updateFarm]: unable to update a farm',
          error
        })
      }

      return farm
    }
  }
}
