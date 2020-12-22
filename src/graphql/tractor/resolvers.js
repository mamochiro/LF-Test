import { ApolloError, UserInputError } from 'apollo-server'
import models from './models'
import { e } from '../../utils/localize'
import { INTERNAL_SERVER_ERROR } from '../../utils/errors'
import farmModels from '../farm/models'

export default {
  Tractor: {
    async farm({ farmId }) {
      let farm

      try {
        farm = await farmModels.farm(farmId)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[farm.read]: unable to query a farm',
          error
        })
      }

      return farm
    }
  },
  Query: {
    async tractor(_, { id }) {
      let tractor

      try {
        tractor = await models.read(id)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[query.tractor]: unable to query a tractor',
          error
        })
      }

      return tractor
    }
  },
  Mutation: {
    async registerTractor(_, { input }, { authToken }) {
      const { name } = input
      const { data } = authToken

      let tractor, farm

      // find farm
      try {
        farm = await farmModels.read(data)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[registerTractor.readFarm]: unable to register a tractor',
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
        tractor = await models.create(name, farm.id)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[registerTractor.create]: unable to register a tractor',
          error
        })
      }

      return {
        id: tractor.id,
        name: tractor.name,
        farm
      }
    },
    async updateTractor(_, { input }) {
      const { id, name } = input
      let update
      // update tractor
      try {
        update = await models.update(id, name)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[updateWorker.update]: unable to register a worker',
          error
        })
      }

      return update
    },
    async destroyTractor(_, { input }) {
      const { id } = input

      let destroy
      try {
        destroy = await models.destroy(id)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[destroyTractor.destroy]: unable to destroy a tractor',
          error
        })
      }

      return destroy
    }
  }
}
