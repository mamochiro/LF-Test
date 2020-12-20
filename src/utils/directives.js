import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server'
import { defaultFieldResolver } from 'graphql'
// import {  } from 'graphql-tools'
import { get, includes } from 'lodash'
import { e } from './localize'

/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
class AuthDirective extends SchemaDirectiveVisitor {
  static ensureFieldsWrapped(objectType) {
    if (objectType._authFieldsWrapped) return
    objectType._authFieldsWrapped = true

    const fields = objectType.getFields()

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName]
      const { resolve = defaultFieldResolver } = field
      field.resolve = async function (...args) {
        const requiredRole = field._requiredAuthRole || objectType._requiredAuthRole

        if (!requiredRole) {
          return resolve.apply(this, args)
        }

        const context = args[2]
        const role = get(context.authToken, 'data.type', false)

        if (!role) {
          throw new AuthenticationError(e('You are not allowed to access this data'))
        }

        if (!includes(requiredRole, role)) {
          throw new AuthenticationError(e('You are not allowed to access this data'))
        }

        return resolve.apply(this, args)
      }
    })
  }

  visitObject(type) {
    AuthDirective.ensureFieldsWrapped(type)
    type._requiredAuthRole = this.args.requires
  }

  visitFieldDefinition(field, details) {
    AuthDirective.ensureFieldsWrapped(details.objectType)
    field._requiredAuthRole = this.args.requires
  }
}

export default {
  auth: AuthDirective
}
