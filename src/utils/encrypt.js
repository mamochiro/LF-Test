import bcrypt from 'bcryptjs'

export const encryptPassword = password => bcrypt.hashSync(password, 10)

export const comparePassword = (password, encryptedPassword) =>
  bcrypt.compareSync(password, encryptedPassword)
