import { NextFunction, Request, Response } from 'express';
import { orm } from '../../shared/db/orm.js';
import { CourseTypeService } from './courseType.services.js';

const courseTypeService = new CourseTypeService(orm.em);

const sanitizedCourseTypeInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.sanitizedInput = {
    name: req.body.name,
    description: req.body.description,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
};

async function findAll(req: Request, res: Response) {
  try {
    const courseType = await courseTypeService.findAll();
    res
      .status(200)
      .json({ message: 'found all course types', data: courseType });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const courseType = await courseTypeService.findOne(id);
    res.status(200).json({ message: 'found course type', data: courseType });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const courseType = courseTypeService.create(req.body.sanitizedInput);
    res.status(201).json({ message: 'course type created', data: courseType });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const courseType = await courseTypeService.update(id, req.body.sanitizedInput);
    res.status(200).json({ message: 'course type updated', data: courseType });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await courseTypeService.remove(id);
   
    res.status(200).send({ message: 'course type deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedCourseTypeInput, findAll, findOne, add, update, remove };
