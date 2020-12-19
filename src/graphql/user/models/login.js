import validator from 'validator'
import { comparePassword } from '../../../utils/encrypt'
import { createJWT } from '../../../utils/jwt'
import Users from './orm'

export const loginByEmail = async (email, password, remember) => {
  const normalizedEmail = validator.normalizeEmail(validator.trim(email))
  const user = await Users.findOne({
    where: {
      email: normalizedEmail,
    },
  })

  if (user == null) {
    return false
  }

  if (!comparePassword(password, user.password)) {
    return false
  }

  await user.save()

  // if remember, logged in them for 1 year, if not, logged them for 1 day
  const expiresIn = remember ? 31536000 : 86000

  const token = createJWT({
    data: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    expiresIn,
  })

  return token
}

