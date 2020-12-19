import validator from 'validator'
import { UserInputError } from 'apollo-server'
import { e } from '../../../utils/localize'

export const loginByEmail = args => {
  const errors = []

  if (!validator.isEmail(args.email)) {
    errors.push({ key: 'email', message: e('Please provide the right pattern of email') })
  }

  if (!validator.isLength(validator.trim(args.password), { min: 6, max: 20 })) {
    errors.push({
      key: 'password',
      message: e('Please provide the password at least %s-%s charactors', 6, 20),
    })
  }

  if (errors.length) {
    throw new UserInputError(e('Bad Request'), {
      messages: errors,
    })
  }
}

export const loginByFacebook = () => null
