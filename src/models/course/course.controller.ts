import { NextFunction, Request, Response } from 'express';
import { Course } from './course.entity.js';
import { orm } from '../../shared/db/orm.js';

// em : EntityManager
const em = orm.em;

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
    const courses = await em.find(
      Course,
      {},
      {
        populate: ['courseType', 'professor', 'students'],
      }
    );
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
    const course = await em.findOneOrFail(
      Course,
      { id },
      {
        populate: ['courseType', 'professor', 'students'],
      }
    );
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
    const course = em.create(Course, req.body.sanitizedInput);
    await em.flush();
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
    const courseToUpdate = await em.findOneOrFail(Course, { id });
    em.assign(courseToUpdate, req.body.sanitizedInput);
    await em.flush();
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
    const course = em.getReference(Course, id);
    await em.removeAndFlush(course);
    res.status(200).json({
      message: 'Course deleted',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedCourseInput, findAll, findOne, add, update, remove };
