import Garden from './orm'

export const create = async (input, farmId) => {
  const farm = await Garden.create({
    ...input,
    farmId
  })
  return farm
}

export const read = async (id) => {
  const farm = await Garden.findByPk(id)
  return farm
}

export const update = async (input) => {
  const { id, name } = input
  const update = await Garden.update(
    {
      name
    },
    { where: { id } }
  )
  return update[0]
}

export const destroy = async (id) => {
  const destroy = await Garden.destroy({ where: { id } })
  return destroy
}

// export const gardenExist = async (farmId) => {
//   const garden = await Garden.findOne({
//     where: {
//       farmId
//     }
//   })
//   return garden !== null
// }

export const gardens = async (farmId) => {
  const gardens = await Garden.findAll({
    where: {
      farmId
    }
  })
  return gardens
}
