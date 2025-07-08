import {Router} from 'express'
import { sanitizedCourseInput, findAll, findOne, add, update, remove } from "./course.controller.js"

export const courseRouter = Router()

courseRouter.get('/', findAll)
courseRouter.get('/:id', findOne)
courseRouter.post('/', sanitizedCourseInput, add)
courseRouter.put('/:id', sanitizedCourseInput, update);
courseRouter.patch('/:id', sanitizedCourseInput, update);
courseRouter.delete('/:id', remove);