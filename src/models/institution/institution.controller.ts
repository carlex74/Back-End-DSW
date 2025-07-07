import { orm } from '../../shared/db/orm.js';
import { Institution } from './institution.entity.js';
import { Request, Response, NextFunction } from 'express';


const em = orm.em;

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

async function findAll(req: Request, res: Response) {
  try {
    const institutions = await em.find(Institution, {});
    res.status(200).json({ message: 'Found all institutions', data: institutions });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const institutions = await em.findOneOrFail(Institution, { id });
    res.status(200).json({ message: 'Found institution', data: institutions });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const institutions = em.create(Institution, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Institution created', data: institutions });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const institution = await em.findOneOrFail(Institution, id);
    em.assign(institution, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Institution updated', data: institution });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const institution = em.getReference(Institution, id);
    await em.removeAndFlush(institution);
    res.status(200).send({ message: 'Institution deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeInstitutionInput, findAll, findOne, add, remove, update };
