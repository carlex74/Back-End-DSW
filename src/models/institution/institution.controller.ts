import { orm } from '../../shared/db/orm.js';
import { Request, Response, NextFunction } from 'express';
import { InstitutionService } from './institution.services.js';

const institutionService = new InstitutionService(orm.em);

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
    const institutions = await institutionService.findAll();
    res
      .status(200)
      .json({ message: 'Found all institutions', data: institutions });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const institutions = await institutionService.findOne(id);
    res.status(200).json({ message: 'Found institution', data: institutions });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const institutions = institutionService.create(req.body.sanitizedInput);
    res
      .status(201)
      .json({ message: 'Institution created', data: institutions });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const institution = institutionService.update(id, req.body.sanitizedInput);
    res.status(200).json({ message: 'Institution updated', data: institution });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await institutionService.remove(id);
    res.status(200).send({ message: 'Institution deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeInstitutionInput, findAll, findOne, add, remove, update };
