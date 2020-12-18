import ExampleModel from '../models/Example'

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
export const getExample = async (req, res) => {
  try {
    const examples = await ExampleModel.findAll()
    res.status(200).json(examples)
  } catch (err) {
    res.status(500).json({
      message: err.message || 'ERROR!!',
    })
  }
}
export const createExample = async (req, res) => {
  try {
    const create = await ExampleModel.create({ ...req.body })
    res.status(201).json(create)
  } catch (err) {
    res.status(500).json({
      message: err.message || 'ERROR!!',
    })
  }
}

export default {
  getExample,
  createExample,
}
