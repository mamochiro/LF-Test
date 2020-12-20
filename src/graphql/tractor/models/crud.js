import Tractor from './orm'

export const create = async (name, farmId) => {
  const tractor = await Tractor.create({
    name: name,
    farmId: farmId
  })
  return tractor
}

export const read = async (id) => {
  const tractor = await Tractor.findByPk(id)
  return tractor
}

export const update = async (id, name) => {
  const update = await Tractor.update(
    {
      name: name
    },
    { where: { id } }
  )
  return update[0]
}

export const tractorExist = async (farmId) => {
  const tractor = await Tractor.findOne({
    where: {
      farmId
    }
  })
  return tractor !== null
}

export const destroy = async (id) => {
  const destroy = await Tractor.destroy({ where: { id } })
  return destroy
}
