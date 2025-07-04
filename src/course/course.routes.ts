import {Router} from 'express'
import { sanitizedCourseInput, findAll, findOne, add, update, remove } from "./course.controller.js"

export const courseRouter = Router()

courseRouter.get('/', findAll)
courseRouter.get('/', findOne)
courseRouter.post('/', sanitizedCourseInput, add)
courseRouter.put('/', sanitizedCourseInput, update)
courseRouter.patch('/', sanitizedCourseInput, update)
courseRouter.delete('/', remove)