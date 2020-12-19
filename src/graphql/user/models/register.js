import validator from 'validator'
import { encryptPassword } from '../../../utils/encrypt'
import Users from './orm'

export const registerUserWithEmail = async (input) => {
  const normalizedEmail = validator.normalizeEmail(validator.trim(input.email))

  const user = await Users.create({
    email: normalizedEmail,
    password: encryptPassword(validator.trim(input.password)),
    firstName: validator.trim(input.firstName),
    lastName: validator.trim(input.lastName),
    type: validator.trim(input.type)
  })

  return user
}

export const emailExist = async (email) => {
  const normalizedEmail = validator.normalizeEmail(validator.trim(email))

  const user = await Users.findOne({
    where: {
      email: normalizedEmail
    }
  })

  return user !== null
}

export const registerUserWithFacebook = () => null
