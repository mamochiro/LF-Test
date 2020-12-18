import jwt from 'jsonwebtoken'

export const createJWT = (payload, expiresIn = 86000) => {
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn,
  })

  return {
    id: token,
    expiresIn,
  }
}

export const getJWT = token =>
  jwt.verify(token, process.env.JWT_KEY, (error, payload) => {
    if (error) return {}
    return payload
  })

export const refresh = (token, refreshOptions) => {
  const payload = jwt.verify(token, process.env.JWT_KEY, refreshOptions)
  delete payload.id
  delete payload.email
  delete payload.firstName
  delete payload.lastName
  delete payload.role
  const jwtSignOptions = { ...{ secret: process.env.JWT_KEY }, ...{ jwtid: refreshOptions.jwtid } }
  return jwt.sign(payload, process.env.JWT_KEY, jwtSignOptions)
}

export const getPayload = token =>
  jwt.verify(token, process.env.JWT_KEY, (error, payload) => {
    if (error) return {}

    return payload
  })
