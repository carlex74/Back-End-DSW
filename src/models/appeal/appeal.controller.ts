import { NextFunction, Request, Response } from 'express';
import { orm } from '../../shared/db/orm.js';
import { AppealService } from './appeal.service.js';

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
      ...req.body,
      state: 'pending',
      date: new Date(),
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
      req.body
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

export { findAll, findOne, add, update, remove };
