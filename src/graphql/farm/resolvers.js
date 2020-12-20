import { ApolloError } from 'apollo-server'
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
