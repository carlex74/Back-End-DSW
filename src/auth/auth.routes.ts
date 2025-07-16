import { Router } from 'express';
import { register, login } from "./auth.controller.js"

export const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
