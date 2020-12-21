import { ApolloError, UserInputError } from 'apollo-server'
import models from './models'
import { e } from '../../utils/localize'
import { INTERNAL_SERVER_ERROR } from '../../utils/errors'
import farmModels from '../farm/models'

export default {
  Query: {},
  Mutation: {
    async registerGarden(_, { input }, { authToken }) {
      const { data } = authToken

      let garden, farm

      // find farm
      try {
        farm = await farmModels.read(data)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[registerGarden.readFarm]: unable to register a garden',
          error
        })
      }

      if (!farm) {
        throw new UserInputError(e('Bad Request'), {
          messages: [
            {
              key: '_error',
              message: e(`This owner does not have a farm`)
            }
          ]
        })
      }

      // create tractor
      try {
        garden = await models.create(input, farm.id)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[registerGarden.create]: unable to register a garden',
          error
        })
      }

      return {
        id: garden.id,
        name: garden.name,
        farm
      }
    },
    async updateGarden(_, { input }) {
      let update
      // update tractor
      try {
        update = await models.update(input)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[updateGarden.update]: unable to update a garden',
          error
        })
      }

      return update
    },
    async destroyGarden(_, { input }) {
      const { id } = input

      let destroy
      try {
        destroy = await models.destroy(id)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[destroyGarden.destroy]: unable to destroy a garden',
          error
        })
      }

      return destroy
    }
  }
}
