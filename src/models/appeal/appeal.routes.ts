import {Router} from 'express'
import { sanitizedAppealInput, findAll, findOne, add, update, remove } from "./appeal.controller.js"

export const appealRouter = Router()

appealRouter.get('/', findAll)
appealRouter.get('/', findOne)
appealRouter.post('/', sanitizedAppealInput, add)
appealRouter.put('/', sanitizedAppealInput, update)
appealRouter.patch('/', sanitizedAppealInput, update)
appealRouter.delete('/', remove)