import { Professor } from './professor.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../../shared/db/orm.js';
import { ProfessorSevice } from './professor.services.js';


const professorService = new ProfessorSevice(orm.em);

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
    profile_picture: req.body.profile_picture,
    courses: req.body.courses,
    instution: req.body.institution,
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
    const professor = await professorService.findAll();
    res.status(200).json({ message: 'Found all professors', data: professor });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const professor = await professorService.findOne(id);
    res.status(200).json({ message: 'Found professor', data: professor });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const professor = professorService.create(req.body.sanitizedInput);
    res.status(201).json({ message: 'Professor created', data: professor });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const professor = professorService.update(id, req.body.sanitizedInput);

    res.status(200).json({ message: 'Professor updated',data: professor });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const professor = professorService.remove(id);
    res.status(200).send({ message: 'Professor deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeProfessorInput, findAll, findOne, add, remove, update };
