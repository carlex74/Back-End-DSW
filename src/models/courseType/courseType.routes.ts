import {Router} from 'express'
import { sanitizedCourseTypeInput, findAll, findOne, add, update, remove } from './courseType.controller.js'

export const courseTypeRouter = Router()

courseTypeRouter.get('/', findAll)
courseTypeRouter.get('/:id', findOne)
courseTypeRouter.post('/', sanitizedCourseTypeInput, add)
courseTypeRouter.put('/:id', sanitizedCourseTypeInput, update)
courseTypeRouter.patch('/:id', sanitizedCourseTypeInput, update)
courseTypeRouter.delete('/:id', remove)

