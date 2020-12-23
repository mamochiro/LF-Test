import Event from './orm'

export const create = async (input) => {
  const event = await Event.create({
    ...input
  })
  return event
}

export const read = async (id) => {
  const event = await Event.findByPk(id)
  return event
}

export const update = async (input) => {
  const { id, gardenId, name, area, cost } = input
  const update = await Event.update(
    {
      gardenId,
      name,
      area,
      cost
    },
    { where: { id } }
  )
  return update[0]
}

export const destroy = async (id) => {
  const destroy = await Event.destroy({ where: { id } })
  return destroy
}

export const expenditure = async (ids) => {
  const expenditure = await Event.sum('cost', {
    where: {
      gardenId: ids
    }
  })
  return expenditure
}
