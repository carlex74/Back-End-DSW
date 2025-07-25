// src/course/course.routes.ts

import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './course.controller.js';
import { validationMiddleware } from '../../shared/middlewares/validate.middleware.js';
import {
  CreateCourseSchema,
  UpdateCourseSchema,
} from './schemas/course.schemas.js';

export const courseRouter = Router();

courseRouter.get('/', findAll);
courseRouter.get('/:id', findOne);
courseRouter.delete('/:id', remove);
courseRouter.post('/', validationMiddleware(CreateCourseSchema), add);
courseRouter.put('/:id', validationMiddleware(UpdateCourseSchema), update);
courseRouter.patch('/:id', validationMiddleware(UpdateCourseSchema), update);
