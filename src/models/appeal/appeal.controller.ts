import { NextFunction, Request, Response } from 'express';
import { orm } from '../../shared/db/orm.js';
import { AppealService } from './appeal.service.js';

const sanitizedAppealInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.sanitizedInput = {
    date: req.body.date,
    text: req.body.text,
    state: req.body.state,
    student: req.body.student,
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
    const appealService = new AppealService(orm.em.fork());
    const appeals = await appealService.findAll();
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
    const appealService = new AppealService(orm.em.fork());
    const id = req.params.id;
    const appeal = await appealService.findOne(id);
    res.status(200).json({
      message: 'Application found',
      data: appeal,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function add(req: Request, res: Response) {
  try {
    const appealService = new AppealService(orm.em.fork());
    const appealData = {
      ...req.body.sanitizedInput,
      state: 'pending',
    };

    const appeal = await appealService.create(appealData);
    res.status(201).json({
      message: 'Application created',
      data: appeal,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function update(req: Request, res: Response) {
  try {
    const appealService = new AppealService(orm.em.fork());
    const id = req.params.id;
    const appealToUpdate = await appealService.update(
      id,
      req.body.sanitizedInput
    );
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
    const appealService = new AppealService(orm.em.fork());
    const id = req.params.id;
    await appealService.remove(id);
    res.status(200).json({
      message: 'Application deleted',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedAppealInput, findAll, findOne, add, update, remove };
