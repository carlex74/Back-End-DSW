import { ProfessorRepository } from './professor.repository.js';
import { Professor } from './professor.entity.js';
import { Request, Response, NextFunction } from 'express';

const repository = new ProfessorRepository();

function sanitizeProfessorInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    name: req.body.name,
    surname: req.body.surname,
    mail: req.body.mail,
    state: req.body.state,
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
  const professor = repository.findOne({ id });

  if (!professor) {
    res.status(404).send({ message: 'Professor not found' });
  }
  res.status(200).json({ data: professor });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const professorInput = new Professor(
    input.name,
    input.surname,
    input.mail,
    input.state,
    input.profile_picture
  );
  const professor = repository.add(professorInput);
  res.status(201).send({ message: 'Professor created', data: professor });
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  console.log(req.body.sanitizedInput);
  const professor = repository.update(req.body.sanitizedInput);

  if (!professor) {
    res.status(404).send({ message: 'Professor not found' });
  }

  res
    .status(200)
    .send({ message: 'Professor updated succesfully', data: professor });
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const professor = repository.delete({ id });

  if (!professor) {
    res.status(404).send({ message: 'Professor not found' });
  } else {
    res.status(200).send({ message: 'Professor deleted successfully' });
  }
}

export { sanitizeProfessorInput, findAll, findOne, add, remove, update };
