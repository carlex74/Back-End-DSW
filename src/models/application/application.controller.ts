import { application, NextFunction, Request, Response } from 'express';
import { Application } from './application.entity.js';
import { orm } from '../../shared/db/orm.js';

// em : EntityManager
const em = orm.em;

const sanitizedApplicationInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.sanitizedInput = {
    date: req.body.date,
    text: req.body.text,
    professor: req.body.professor,
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
    const applications = await em.find(
      Application,
      {},
      {
        populate: ['professor'],
      }
    );
    res.status(200).json({
      message: 'Application found',
      data: applications,
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
    const applications = await em.findOneOrFail(
      Application,
      { id },
      {
        populate: ['professor'],
      }
    );
    res.status(200).json({
      message: 'Application found',
      data: applications,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function add(req: Request, res: Response) {
  try {
    const applications = em.create(Application, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({
      message: 'Application created',
      data: applications,
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
    const applicationToUpdate = await em.findOneOrFail(Application, { id });
    em.assign(applicationToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({
      message: 'Application updated',
      data: applicationToUpdate,
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
    const applications = em.getReference(Application, id);
    await em.removeAndFlush(applications);
    res.status(200).json({
      message: 'Application deleted',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedApplicationInput, findAll, findOne, add, update, remove };
