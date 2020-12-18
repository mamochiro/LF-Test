import express from 'express'
import {
  getExample,
  createExample,
} from '../../controllers/exampleController'

const router = express.Router()

router
  .route('/')
  .get(getExample)

router
  .route('/')
  .post(createExample)

export default router
