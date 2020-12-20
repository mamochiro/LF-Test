import * as register from './register'
import * as login from './login'
import * as crud from './crud'

export default {
  ...register,
  ...login,
  ...crud
}
