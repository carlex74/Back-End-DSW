import {Router} from 'express'
import { findAll, findOne, add, update, remove } from "./appeal.controller.js"
import { validationMiddleware } from '../../shared/middlewares/validate.middleware.js'
import { CreateAppealSchema, UpdateAppealSchema } from './appeal.schemas.js'

export const appealRouter = Router()

appealRouter.get('/', findAll)
appealRouter.get('/:id', findOne)
appealRouter.post('/', validationMiddleware(CreateAppealSchema), add)
appealRouter.put('/:id', validationMiddleware(UpdateAppealSchema), update)
appealRouter.patch('/:id', validationMiddleware(UpdateAppealSchema), update)
appealRouter.delete('/:id', remove)
