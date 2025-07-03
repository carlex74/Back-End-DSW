import { StudentRepository } from './student.repository.js';
import { Student } from './student.entity.js';
import { Request, Response, NextFunction } from 'express';

const repository = new StudentRepository();

function sanitizeStudentInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    name: req.body.name,
    surname: req.body.surname,
    mail: req.body.mail,
    profile_picture: req.body.profile_picture
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

function findAll(req: Request, res: Response) {
  res.status(200).json({ data: repository.findAll() });
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const student = repository.findOne({ id });

  if (!student) {
    res.status(404).send({ message: 'Student not found' });
  }
  res.status(200).json({ data: student });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const studentInput = new Student(input.name, input.surname, input.mail, input.profile_picture);
  const student = repository.add(studentInput);
  res.status(201).send({ message: 'Student created', data: student });
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  console.log(req.body.sanitizedInput);
  const student = repository.update(req.body.sanitizedInput);

  if (!student) {
    res.status(404).send({ message: 'Student not found' });
  }

  res
    .status(200)
    .send({ message: 'Student updated succesfully', data: student });
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const student = repository.delete({ id });

  if (!student) {
    res.status(404).send({ message: 'Student not found' });
  } else {
    res.status(200).send({ message: 'Student deleted successfully' });
  }
}

export { sanitizeStudentInput, findAll, findOne, add, remove, update };