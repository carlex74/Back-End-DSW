import { CourseTypeRepository } from './courseType.repository.js';
import { CourseType } from './courseType.entity.js';
import { NextFunction, Request, Response } from 'express';

const repository = new CourseTypeRepository();

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

const findAll = (req: Request, res: Response) => {
  res.json({
    data: repository.findAll(),
  });
};

const findOne = (req: Request, res: Response) => {
  const { id } = req.params;

  const courseType = repository.findOne({ id });

  if (!courseType) {
    return res.status(404).json({
      message: `TipoCurso con este id ${id} no encontrado`,
    });
  }

  res.json({
    data: courseType,
  });
};

const add = (req: Request, res: Response) => {
  const { sanitizedInput } = req.body;

  const courseType = new CourseType(
    sanitizedInput.name,
    sanitizedInput.description
  );

  const newCourseType = repository.add(courseType);

  res.status(201).json({
    data: newCourseType,
  });
};

const update = (req: Request, res: Response) => {
  const { id } = req.params;

  req.body.sanitizedInput.id = req.params.id;

  const updatedCourseType = repository.update(req.body.sanitizedInput);

  console.log(req.body.sanitizedInput);

  if (!updatedCourseType) {
    return res.status(404).json({
      message: `TipoCurso con este id ${id} no encontrado`,
    });
  }

  res.status(200).json({
    data: updatedCourseType,
  });
};

const remove = (req: Request, res: Response) => {
  const id = req.params.id;
  const courseType = repository.delete({ id });

  if (!courseType) {
    res.status(404).send({ message: 'CourseType not found' });
  } else {
    res.status(200).send({ message: 'CourseType deleted successfully' });
  }
};

export { sanitizedCourseTypeInput, findAll, findOne, add, update, remove };
