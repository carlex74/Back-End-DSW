import { NextFunction, Request, Response } from 'express';
import { Course } from './course.entity.js';
import { orm } from '../../shared/db/orm.js';
import { CourseService } from './course.services.js';

// em : EntityManager
const em = orm.em;
const courseService = new CourseService(orm.em);

const sanitizedCourseInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.sanitizedInput = {
    name: req.body.name,
    description: req.body.description,
    password: req.body.password,
    courseType: req.body.courseType,
    professor: req.body.professor,
    students: req.body.students,
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
    const courses = await courseService.findAll();

    res.status(200).json({
      message: 'Courses found',
      data: courses,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const course = await courseService.findOne(id);
    res.status(200).json({
      message: 'Course found',
      data: course,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function add(req: Request, res: Response) {
  try {
    const course = await courseService.create(req.body.sanitizedInput);
    res.status(201).json({
      message: 'Course created',
      data: course,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const courseToUpdate = await courseService.update(
      id,
      req.body.sanitizedInput
    );
    res.status(200).json({
      message: 'Course updated',
      data: courseToUpdate,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const course = await courseService.remove(id);
    res.status(200).json({
      message: 'Course deleted',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedCourseInput, findAll, findOne, add, update, remove };
