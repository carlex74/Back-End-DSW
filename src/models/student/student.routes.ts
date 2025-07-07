import { Router } from 'express';
import {
  sanitizeStudentInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './student.controller.js';

export const studentRouter = Router();

studentRouter.get('/', findAll);
studentRouter.get('/:id', findOne);
studentRouter.post('/', sanitizeStudentInput, add);
studentRouter.put('/:id', sanitizeStudentInput, update);
studentRouter.put('/:id', sanitizeStudentInput, update);
studentRouter.delete('/:id', remove);
