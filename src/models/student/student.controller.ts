import { orm } from '../../shared/db/orm.js';
import { Student } from './student.entity.js';
import { Request, Response, NextFunction } from 'express';
import { StudentService } from './student.services.js';

const studentService = new StudentService(orm.em);

function sanitizeStudentInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    surname: req.body.surname,
    mail: req.body.mail,
    profile_picture: req.body.profile_picture,
    courses: req.body.courses,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const students = await studentService.findAll();
    res.status(200).json({ message: 'Found all student', data: students });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const students = await studentService.findOne(id);
    res.status(200).json({ message: 'Found student', data: students });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const students = studentService.create(req.body.sanitizedInput);  
    res.status(201).json({ message: 'Student created', data: students });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const studentToUpdate = studentService.update(id, req.body.sanitizedInput);
    res.status(200).json({ message: 'Student updated', data: studentToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const students = studentService.remove(id);
    res.status(200).send({ message: 'Student deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeStudentInput, findAll, findOne, add, remove, update };
