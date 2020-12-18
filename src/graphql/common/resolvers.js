import { GraphQLDateTime } from 'graphql-iso-date'
import { GraphQLInputInt } from 'graphql-input-number'
import GraphQLJSON from 'graphql-type-json'

export default {
  Date: GraphQLDateTime,
  JSON: GraphQLJSON,
  LimitQuery: GraphQLInputInt({
    name: 'LimitQuery',
    min: 1,
    max: 100,
  }),
}