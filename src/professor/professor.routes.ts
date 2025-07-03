import { Router } from 'express';
import {
  sanitizeProfessorInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './professor.controller.js';

export const professorRouter = Router();

professorRouter.get('/', findAll);
professorRouter.get('/:id', findOne);
professorRouter.post('/', sanitizeProfessorInput, add);
professorRouter.put('/:id', sanitizeProfessorInput, update);
professorRouter.patch('/:id', sanitizeProfessorInput, update);
professorRouter.delete('/:id', remove);
