import models from './models'
import userModels from '../user/models'
import farmModels from '../farm/models'
import { ApolloError, UserInputError } from 'apollo-server'
import { e } from '../../utils/localize'
import { INTERNAL_SERVER_ERROR } from '../../utils/errors'

export default {
  Query: {},
  Mutation: {
    async registerWorker(_, { input }, { authToken }) {
      const { userId } = input
      const { data } = authToken

      let user, farm, worker
      // find user
      try {
        user = await userModels.read(userId)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[registerWorker.readUser]: unable to register a worker',
          error
        })
      }

      if (!user) {
        throw new UserInputError(e('Bad Request'), {
          messages: [
            {
              key: 'userId',
              message: e(`User Id does not exist`)
            }
          ]
        })
      }

      // find farm
      try {
        farm = await farmModels.read(data)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[registerWorker.readFarm]: unable to register a worker',
          error
        })
      }

      // check worker exist
      let exist
      try {
        exist = await models.read(user.id)
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
              key: 'userId',
              message: e(`This user already have in farm`)
            }
          ]
        })
      }

      // create worker
      try {
        worker = await models.create(farm.id, user.id)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[worker.registerWorker]: unable to register a worker',
          error
        })
      }

      return {
        id: worker.id,
        user: user,
        farm: farm
      }
    },
    async updateWorker(_, { input }) {
      const { id, userId } = input

      let user, update
      // find user
      try {
        user = await userModels.read(userId)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[updateWorker.readUser]: unable to register a worker',
          error
        })
      }

      if (!user) {
        throw new UserInputError(e('Bad Request'), {
          messages: [
            {
              key: 'userId',
              message: e(`User Id does not exist`)
            }
          ]
        })
      }

      // check worker exist
      let exist
      try {
        exist = await models.read(user.id)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[updateWorker.read]: unable to check read',
          error
        })
      }

      if (exist) {
        throw new UserInputError(e('Bad Request'), {
          messages: [
            {
              key: 'userId',
              message: e(`This user already have in farm`)
            }
          ]
        })
      }

      // update worker
      try {
        update = await models.update(id, user.id)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[updateWorker.update]: unable to register a worker',
          error
        })
      }

      return update
    },
    async destroyWorker(_, { input }) {
      const { id } = input

      let destroy
      try {
        destroy = await models.destroy(id)
      } catch (error) {
        throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
          ctx: '[destroyWorker.destroy]: unable to destroy a worker',
          error
        })
      }

      return destroy
    }
  }
}
