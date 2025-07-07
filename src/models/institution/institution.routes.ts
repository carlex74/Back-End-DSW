import { Router } from 'express';
import {
  sanitizeInstitutionInput,
  add,
  findAll,
  findOne,
  remove,
  update,
} from './institution.controller.js';

export const institutionRouter = Router();

institutionRouter.get('/', findAll);
institutionRouter.get('/:id', findOne);
institutionRouter.post('/', sanitizeInstitutionInput, add);
institutionRouter.put('/:id', sanitizeInstitutionInput, update);
institutionRouter.patch('/:id', sanitizeInstitutionInput, update);
institutionRouter.delete('/:id', remove);

