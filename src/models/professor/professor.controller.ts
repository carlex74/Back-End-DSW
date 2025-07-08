import { Professor } from './professor.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../../shared/db/orm.js';

const em = orm.em;

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
    const professor = await em.find(
      Professor,
      {},
      {
        populate: ['institution', 'courses'],
      }
    );
    res.status(200).json({ message: 'Found all professors', data: professor });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const professor = await em.findOneOrFail(
      Professor,
      { id },
      {
        populate: ['institution', 'courses'],
      }
    );
    res.status(200).json({ message: 'Found professor', data: professor });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const professor = em.create(Professor, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Professor created', data: professor });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const professor = em.getReference(Professor, id);
    em.assign(professor, req.body);
    await em.flush();
    res.status(200).json({ message: 'Professor updated' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const professor = em.getReference(Professor, id);
    await em.removeAndFlush(professor);
    res.status(200).send({ message: 'Professor deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeProfessorInput, findAll, findOne, add, remove, update };
