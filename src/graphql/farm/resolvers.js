export default {
  Query: {
    async farm() {
      return null
    }
  },
  Mutation: {
    async createFarm(_, { input }, { authToken }) {
      console.log(input, authToken)
      return null
    }
  }
}
