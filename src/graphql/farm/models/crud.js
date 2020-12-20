import Farm from './orm'

export const create = async (input, auth) => {
  const farm = await Farm.create({
    name: input.name,
    location: input.location,
    ownerId: auth.id
  })
  return farm
}

export const read = async (auth) => {
  const farm = await Farm.findOne({
    where: {
      ownerId: auth.id
    }
  })

  return farm
}

export const update = async (input, auth) => {
  const update = await Farm.update(
    {
      name: input.name,
      location: input.location,
    },
    { where: { ownerId: auth.id } }
  )
  return update[0]
}
