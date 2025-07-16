
import { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { orm } from '../shared/db/orm.js';

async function register(req: Request, res: Response) {
  try {
    const authService = new AuthService(orm.em);

    const user = await authService.register(req.body);

    res.status(201).json({
      message: 'User registered successfully',
      data: user,
    });
  } catch (error: any) { // Check if error is an instance of Error <- check if this is needed
    res.status(400).json({ message: error.message });
  }
}

async function login(req: Request, res: Response) {
  try {
    const authService = new AuthService(orm.em.fork());
    const result = await authService.login(req.body);
    res.status(200).json({ message: 'Login successful', data: result });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}