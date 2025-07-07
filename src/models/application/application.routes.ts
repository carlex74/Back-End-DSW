import {Router} from 'express'
import { sanitizedApplicationInput, findAll, findOne, add, update, remove } from "./application.controller.js"

export const courseRouter = Router()

courseRouter.get('/', findAll)
courseRouter.get('/', findOne)
courseRouter.post('/', sanitizedApplicationInput, add)
courseRouter.put('/', sanitizedApplicationInput, update)
courseRouter.patch('/', sanitizedApplicationInput, update)
courseRouter.delete('/', remove)