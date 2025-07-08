import {Router} from 'express'
import { sanitizedAppealInput, findAll, findOne, add, update, remove } from "./appeal.controller.js"

export const appealRouter = Router()

appealRouter.get('/', findAll)
appealRouter.get('/:id', findOne);
appealRouter.post('/', sanitizedAppealInput, add)
appealRouter.put('/:id', sanitizedAppealInput, update);
appealRouter.patch('/:id', sanitizedAppealInput, update);
appealRouter.delete('/:id', remove);