import {Router} from 'express'
import { findAll, findOne, add, update, remove } from "./appeal.controller.js"
import { validationMiddleware } from '../../shared/middlewares/validate.middleware.js'
import { CreateAppealSchema, UpdateAppealSchema } from './appeal.schemas.js'
import { authMiddleware } from '../../auth/auth.middleware.js'
import { uploadCvToCloudinary } from '../../shared/middlewares/file-upload.middleware.js'

export const appealRouter = Router()

appealRouter.use(authMiddleware)

appealRouter.get('/', findAll)
appealRouter.get('/:id', findOne)

appealRouter.post('/', uploadCvToCloudinary.single('document'), validationMiddleware(CreateAppealSchema), add)

appealRouter.put('/:id', validationMiddleware(UpdateAppealSchema), update)
appealRouter.patch('/:id', validationMiddleware(UpdateAppealSchema), update)

appealRouter.delete('/:id', remove)
