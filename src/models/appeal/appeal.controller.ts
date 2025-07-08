import { NextFunction, Request, Response } from 'express';
import { Appeal } from './appeal.entity.js';
import { orm } from '../../shared/db/orm.js';

// em : EntityManager
const em = orm.em;

const sanitizedAppealInput = (
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
    const appeals = await em.find(
      Appeal,
      {},
      {
        populate: ['professor'],
      }
    );
    res.status(200).json({
      message: 'Application found',
      data: appeals,
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
    const appeals = await em.findOneOrFail(
      Appeal,
      { id },
      {
        populate: ['professor'],
      }
    );
    res.status(200).json({
      message: 'Application found',
      data: appeals,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function add(req: Request, res: Response) {
  try {
    
    const appealData = {
      ...req.body.sanitizedInput,
      state: 'pending',
    };

    const appeals = em.create(Appeal, appealData);
    await em.flush();
    res.status(201).json({
      message: 'Application created',
      data: appeals,
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
    const appealToUpdate = await em.findOneOrFail(Appeal, { id });
    em.assign(appealToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({
      message: 'Application updated',
      data: appealToUpdate,
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
    const appeals = em.getReference(Appeal, id);
    await em.removeAndFlush(appeals);
    res.status(200).json({
      message: 'Application deleted',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedAppealInput, findAll, findOne, add, update, remove };
