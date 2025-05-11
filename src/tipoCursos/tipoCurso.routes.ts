import {Router} from 'express'
import { sanitizedTipoCursoInput, findAll, findOne, add, update, remove } from './tipoCurso.controller.js'

export const tipoCursoRouter = Router()

tipoCursoRouter.get('/', findAll)
tipoCursoRouter.get('/:id', findOne)
tipoCursoRouter.post('/', sanitizedTipoCursoInput, add)
tipoCursoRouter.put('/:id', sanitizedTipoCursoInput, update)
tipoCursoRouter.patch('/:id', sanitizedTipoCursoInput, update)
tipoCursoRouter.delete('/:id', remove)

