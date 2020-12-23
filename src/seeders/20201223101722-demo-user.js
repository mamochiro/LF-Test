'use strict'
import { encryptPassword } from '../utils/encrypt'

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@test.com',
        password: encryptPassword('111111'),
        type: 'ADMIN',
        gender: 'MALE',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
