import { ApolloError, UserInputError } from 'apollo-server'
import { e } from '../../utils/localize'
import { INTERNAL_SERVER_ERROR } from '../../utils/errors'
import models from './models'
// import farmModels from '../farm/models'
import workerModels from '../worker/models'
import gardenModels from '../garden/models'

export default {
  Query: {},
  Mutation: {
    async registerEvent(_, { input }, { authToken }) {
      const { data } = authToken

      let garden, worker, event

      // find worker
      try {
        worker = await workerModels.read(data.id)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[registerGarden.readWorker]: unable to find a worker',
          error
        })
      }

      if (!worker) {
        throw new UserInputError(e('Bad Request'), {
          messages: [
            {
              key: '_error',
              message: e(`This worker does not exist`)
            }
          ]
        })
      }

      // find garden
      try {
        garden = await gardenModels.read(input.gardenId)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[registerGarden.readGarden]: unable to find a garden',
          error
        })
      }

      if (!garden) {
        throw new UserInputError(e('Bad Request'), {
          messages: [
            {
              key: '_error',
              message: e(`This garden does not exist`)
            }
          ]
        })
      }

      // create event
      try {
        event = await models.create(input)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[registerGarden.readGarden]: unable to find a garden',
          error
        })
      }

      return {
        id: event.id,
        name: event.name,
        cosr: event.cost,
        garden
      }
    },
    async updateEvent(_, { input }) {
      let update, garden

      // find garden
      try {
        garden = await gardenModels.read(input.gardenId)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[registerGarden.readGarden]: unable to find a garden',
          error
        })
      }

      if (!garden) {
        throw new UserInputError(e('Bad Request'), {
          messages: [
            {
              key: '_error',
              message: e(`This garden does not exist`)
            }
          ]
        })
      }

      // update event
      try {
        update = await models.update(input)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[updateEvent.update]: unable to update a event',
          error
        })
      }

      return update
    },
    async destroyEvent(_, { input }) {
      const { id } = input

      let destroy
      try {
        destroy = await models.destroy(id)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[destroyEvent.destroy]: unable to destroy a event',
          error
        })
      }

      return destroy
    }
  }
}
