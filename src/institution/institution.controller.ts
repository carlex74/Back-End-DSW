import { InstitutionRepository } from './institution.repository.js';
import { Institution } from './institution.entity.js';
import { Request, Response, NextFunction } from 'express';

const repository = new InstitutionRepository();

function sanitizeInstitutionInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
}

function findAll(req: Request, res: Response) {
  res.status(200).json({ data: repository.findAll() });
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const institution = repository.findOne({ id });

  if (!institution) {
    res.status(404).send({ message: 'Institution not found' });
  }
  res.status(200).json({ data: institution });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const institutionInput = new Institution(input.name, input.description);
  const institution = repository.add(institutionInput);
  res.status(201).send({ message: 'Institution created', data: institution });
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  console.log(req.body.sanitizedInput);
  const institution = repository.update(req.body.sanitizedInput);

  if (!institution) {
    res.status(404).send({ message: 'Institution not found' });
  }

  res
    .status(200)
    .send({ message: 'Institution updated succesfully', data: institution });
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const institution = repository.delete({ id });

  if (!institution) {
    res.status(404).send({ message: 'Institution not found' });
  } else {
    res.status(200).send({ message: 'Institution deleted successfully' });
  }
}

export { sanitizeInstitutionInput, findAll, findOne, add, remove, update };
