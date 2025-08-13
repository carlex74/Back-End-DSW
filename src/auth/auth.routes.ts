import { Router } from 'express';
import { register, login, getProfile } from './auth.controller.js';
import { authMiddleware } from './auth.middleware.js';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/profile', authMiddleware, getProfile);
