import User from './orm'

export const read = async (id) => {
  const user = await User.findByPk(id)
  return user
}
