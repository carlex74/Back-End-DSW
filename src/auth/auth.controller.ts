import { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { orm } from '../shared/db/orm.js';
import { HttpResponse } from '../shared/response/http.response.js';

// Registers a new user
async function register(req: Request, res: Response) {
  try {
    const authService = new AuthService(orm.em.fork());
    const user = await authService.register(req.body);
    return HttpResponse.Created(res, user);
  } catch (error: any) {
    return HttpResponse.BadRequest(res, error.message);
  }
}

// Logs in a user
async function login(req: Request, res: Response) {
  try {
    const authService = new AuthService(orm.em.fork());
    const result = await authService.login(req.body);
    return HttpResponse.Ok(res, result);
  } catch (error: any) {
    return HttpResponse.Unauthorized(res, error.message);
  }
}

// Gets the profile of the logged-in user
async function getProfile(req: Request, res: Response) {
  try {
    // Get user ID from request, set by authentication middleware
    const userId = (req as Request & { user?: { id: string } }).user?.id;
    if (!userId) {
      // If user ID is missing, user is not authenticated
      return HttpResponse.Unauthorized(
        res,
        'No se pudo verificar la identidad del usuario.'
      );
    }

    const authService = new AuthService(orm.em.fork());
    // Get profile info from database
    const userProfile = await authService.getProfile(userId);

    if (!userProfile) {
      // If profile not found, send not found response
      return HttpResponse.NotFound(res, 'Perfil de usuario no encontrado.');
    }

    return HttpResponse.Ok(res, userProfile);
  } catch (error: any) {
    return HttpResponse.InternalServerError(res, error.message);
  }
}

export { register, login, getProfile };
