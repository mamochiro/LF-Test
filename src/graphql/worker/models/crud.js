import Worker from './orm'

export const create = async (farmId, userId) => {
  const worker = await Worker.create({
    farmId,
    userId
  })
  return worker
}

export const read = async (id) => {
  const worker = await Worker.findByPk(id)
  return worker
}

export const update = async (id, userId) => {
  const update = await Worker.update(
    {
      userId
    },
    { where: { id } }
  )
  return update[0]
}

export const workerExist = async (userId) => {
  const worker = await Worker.findOne({
    where: {
      userId
    }
  })
  return worker !== null
}

export const destroy = async (id) => {
  const destroy = await Worker.destroy({ where: { id } })
  return destroy
}
